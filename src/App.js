import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { sendConversation, createUserMessage, createAssistantMessage } from './services/api';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import Header from './components/Header';
import { useEcoMode } from './contexts/EcoModeContext';
import EcoModeFAQ from './components/EcoModeFAQ';
import logo from './images/logo.png';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // No longer need these state variables as notification is handled in ChatHistory component
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { isEcoModeActive } = useEcoMode();
  const navigate = useNavigate();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = async (message, modelId = 'gpt-4o') => {
    if (!message.trim()) return;

    const userMessage = createUserMessage(message);
    userMessage.timestamp = new Date().toISOString();

    const newPromptCount = messages.filter(m => m.role === 'user').length + 1;
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    if (isEcoModeActive && newPromptCount === 1) {
      // First prompt with Eco Mode active - notification will be shown in ChatHistory
      sendActualResponse([...updatedMessages], modelId);
    } else if (isEcoModeActive && newPromptCount === 3) {
      const reroutingMessage = {
        role: 'assistant',
        content: `🟡 **Processing query**\n\nLots of people are making queries in your region right now, so please hang tight for about 30 seconds! We are trying to reroute your prompt to more energy-efficient data centers or aggregate similar responses to process in batch.`,
        isEcoNotice: true,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, reroutingMessage]);
      setLoading(true);

      setTimeout(() => {
        sendActualResponse([...updatedMessages], modelId);
      }, 5000);
    } else {
      sendActualResponse([...updatedMessages], modelId);
    }
  };

  const sendActualResponse = async (messagesToSend, modelId) => {
    const loadingMessage = {
      role: 'assistant',
      content: '',
      isLoading: true,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, loadingMessage]);
    setLoading(true);

    try {
      const fullMessageList =
        messagesToSend.length > 0
          ? messagesToSend
          : [{ role: 'system', content: 'You are a helpful assistant.' }];

      const response = await sendConversation(fullMessageList, modelId);

      const assistantContent =
        response.choices?.[0]?.message?.content ||
        "I apologize, but I couldn't generate a response.";

      const assistantMessage = createAssistantMessage(assistantContent);
      assistantMessage.timestamp = new Date().toISOString();

      setMessages(prev =>
        [...prev.filter(m => !m.isLoading && !m.isEcoNotice), assistantMessage]
      );
    } catch (err) {
      console.error('Error during sendActualResponse:', err);
      const errorMessage = createAssistantMessage("Sorry, something went wrong.");
      errorMessage.timestamp = new Date().toISOString();
      errorMessage.isError = true;
      setMessages(prev =>
        [...prev.filter(m => !m.isLoading), errorMessage]
      );
    } finally {
      setLoading(false);
    }
  };

  const location = useLocation();
  
  return (
    <Routes>
      <Route path="/eco-mode-faq" element={<EcoModeFAQ />} />
      <Route path="*" element={
        <div className="flex h-screen bg-white text-gray-900">
          {!sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(true)}
              className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-md"
              aria-label="Open sidebar"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="#8e8ea0" strokeWidth="1.5" />
              </svg>
            </button>
          )}

          {/* Sidebar */}
          <div className={`flex flex-col h-full ${sidebarOpen ? 'w-[260px] min-w-[260px]' : 'w-0 min-w-0 overflow-hidden'} bg-gray-50 border-r border-gray-200 overflow-y-auto transition-all duration-300`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
                <span className="font-medium">ChatGPT</span>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-md"
                aria-label="Close sidebar"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="16" height="16" rx="3" stroke="#8e8ea0" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            <div className="px-2 py-4 space-y-4">
              <button
                onClick={() => setMessages([])}
                className="w-full flex items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-gray-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                New chat
              </button>
              
              <button className="w-full flex items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-gray-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Search chats
              </button>
              
              <button className="w-full flex items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-gray-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 9H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 13H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 17H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Library
              </button>
            </div>
            
            <div className="px-2 py-4 space-y-4">
              <button className="w-full flex items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-gray-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Codex
              </button>
              
              <button className="w-full flex items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-gray-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M15 12L10 15V9L15 12Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sora
              </button>
              
              <button className="w-full flex items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-gray-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                GPTs
              </button>
            </div>

            <div className="flex-1"></div>

            <div className="border-t border-gray-200 p-2">
              <button className="w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-200">
                View plans
              </button>
              <div className="text-xs text-gray-500 mt-1 ml-2">Unlimited access, team features, and more</div>
            </div>
          </div>

          <div className="flex flex-col flex-1 overflow-hidden">
            <Header hasMessages={messages.length > 0} />
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center max-w-xl mb-6">
                  <h2 className="text-3xl mb-10">
                    {isEcoModeActive ? (
                      <>
                        <div className="text-2xl font-medium text-green-600 mb-3">Eco Mode Chat: Greener AI</div>
                        <div className="text-base text-gray-600">
                          This chat won't appear in history, use or update ChatGPT's memory, or be used to train our models.
                        </div>
                      </>
                    ) : (
                      <>Welcome! Do you have <span className="text-green-600">Eco Mode</span> on?</>
                    )}
                  </h2>
                </div>
                <div className="w-full max-w-[850px]">
                  <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 w-full overflow-hidden" style={{ height: 'calc(100vh - 140px)' }}>
                  <div
                    className="h-full overflow-y-auto scroll-smooth pb-4 px-4"
                    ref={chatContainerRef}
                  >
                    <ChatHistory
                      messages={messages}
                      loading={loading}
                      messagesEndRef={messagesEndRef}
                    />
                  </div>
                </div>
                <div className="p-4 bg-white flex justify-center">
                  <div className="w-full max-w-[850px]">
                    <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      } />
    </Routes>
  );
};

export default App;
