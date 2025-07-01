import React, { useState, useEffect, useRef } from 'react';
import { sendConversation, createUserMessage, createAssistantMessage } from './services/api';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import Header from './components/Header';
import logo from './images/logo.png';
import { useEcoMode } from './contexts/EcoModeContext';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState('1');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { isEcoModeActive } = useEcoMode();

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

    if (isEcoModeActive && newPromptCount === 3) {
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

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {!sidebarOpen && (
        <button 
          onClick={() => setSidebarOpen(true)} 
          className="fixed top-3 left-3 z-10 p-2 rounded-md hover:bg-gray-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="16" height="16" rx="3" stroke="#8e8ea0" strokeWidth="1.5" />
          </svg>
        </button>
      )}

      {/* Sidebar and main layout omitted for brevity (same as your current code) */}

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
  );
}

export default App;
