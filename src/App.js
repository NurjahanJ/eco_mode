import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { sendConversation, createUserMessage, createAssistantMessage } from './services/api';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import Header from './components/Header';
import { useEcoMode } from './contexts/EcoModeContext';
import EcoModeFAQ from './components/EcoModeFAQ';
import leafIcon from './images/leaf-icon.svg';
import Sidebar from './components/Sidebar';
import { useStoreConversation, useGetUserId } from './services/convexService';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { isEcoModeActive, toggleEcoMode } = useEcoMode();
  
  // Convex hooks for data collection
  const storeConversation = useStoreConversation();
  const getUserId = useGetUserId();

  useEffect(() => {
    scrollToBottom();
    
    // Check if user ID exists on component mount
    const checkUserId = () => {
      const userId = getUserId();
      if (!userId) {
        // Generate a temporary ID if none exists
        const tempId = Math.random().toString(36).substring(2, 12);
        localStorage.setItem('userId', tempId);
      }
    };
    checkUserId();
  }, [messages, getUserId]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = async (message, modelId = 'gpt-4o') => {
    if (!message.trim()) return;

    // Check if the message is the special 'GREENERAI' command
    if (message.trim().toUpperCase() === 'GREENERAI') {
      // Get the user ID from localStorage
      const userId = localStorage.getItem('userId') || 'User ID not found';
      
      // Create user message
      const userMessage = createUserMessage(message);
      // Using Convex's built-in _creationTime instead of custom timestamp
      
      // Create system response with user ID
      const systemResponse = createAssistantMessage(`Your User ID is: ${userId}`);
      // Using Convex's built-in _creationTime instead of custom timestamp
      
      // Update messages with both user message and system response
      setMessages([...messages, userMessage, systemResponse]);
      
      // Store this interaction in Convex
      storeConversation(message, `Your User ID is: ${userId}`, isEcoModeActive);
      
      return; // Exit early, no need to process further
    }

    const userMessage = createUserMessage(message);
    // Using Convex's built-in _creationTime instead of custom timestamp

    const newPromptCount = messages.filter(m => m.role === 'user').length + 1;
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    if (isEcoModeActive && newPromptCount === 1) {
      sendActualResponse([...updatedMessages], modelId);
    } else if (isEcoModeActive && (newPromptCount === 3 || newPromptCount === 6 || newPromptCount === 9)) {
      const reroutingMessage = {
        role: 'assistant',
        content: `🟡 **Processing query**\n\nLots of people are making queries in your region right now, so please hang tight for about 10~45 seconds! We are trying to reroute your prompt to more energy-efficient data centers or aggregate similar responses to process in batch.`,
        isEcoNotice: true,
        timestamp: Date.now() // Add timestamp to fix the Invalid Date issue
      };

      setMessages(prev => [...prev, reroutingMessage]);
      setLoading(true);

      setTimeout(() => {
        sendActualResponse([...updatedMessages], modelId);
      }, 15000);
    } else {
      sendActualResponse([...updatedMessages], modelId);
    }
  };

  const sendActualResponse = async (messagesToSend, modelId) => {
    const loadingMessage = {
      role: 'assistant',
      content: '',
      isLoading: true,
      timestamp: new Date().toISOString() // Add timestamp for proper date display
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
      // Using Convex's built-in _creationTime instead of custom timestamp

      setMessages(prev =>
        [...prev.filter(m => !m.isLoading && !m.isEcoNotice), assistantMessage]
      );
      
      // Store conversation in Convex
      const lastUserMessage = messagesToSend.filter(m => m.role === 'user').pop();
      if (lastUserMessage) {
        storeConversation(lastUserMessage.content, assistantContent, isEcoModeActive);
      }
    } catch (err) {
      console.error('Error during sendActualResponse:', err);
      const errorMessage = createAssistantMessage("Sorry, something went wrong.");
      // Using Convex's built-in _creationTime instead of custom timestamp
      errorMessage.isError = true;
      setMessages(prev =>
        [...prev.filter(m => !m.isLoading), errorMessage]
      );
    } finally {
      setLoading(false);
    }
  };

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
              <img 
                src="/images/sidebar_toggle.svg" 
                alt="Toggle Sidebar" 
                width="24" 
                height="24" 
              />
            </button>
          )}

          {sidebarOpen && <Sidebar setMessages={setMessages} setSidebarOpen={setSidebarOpen} />}

          <div className="flex flex-col flex-1 overflow-hidden">
            <Header hasMessages={messages.length > 0} />
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center max-w-xl mb-6">
                  <h2 className="text-3xl mb-10">
                    {isEcoModeActive ? (
                      <>
                        <div className="text-2xl font-medium text-green-600 mb-3">EcoMode</div>
                        <div className="text-base text-gray-600">
                          Based on current energy demands, we may process your request with more energy-efficient models, or through energy-efficient data centers and regions.
                        </div>
                      </>
                    ) : (
                      <>Do you have the <span className="text-green-600">EcoMode</span> on? Click on <img 
                        src={leafIcon} 
                        alt="EcoMode Icon" 
                        className="inline-block w-6 h-6 cursor-pointer" 
                        onClick={() => !isEcoModeActive && toggleEcoMode()}
                      /> to turn it on!</>
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
}

export default App;
