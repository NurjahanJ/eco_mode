import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import EcoModeNotification from './EcoModeNotification';
import { useEcoMode } from '../contexts/EcoModeContext';

const ChatHistory = ({ messages, messagesEndRef }) => {
  const historyRef = useRef(null);
  const { isEcoModeActive } = useEcoMode();

  useEffect(() => {
    if (historyRef.current?.parentElement) {
      historyRef.current.parentElement.style.overflowY = 'auto';
    }
  }, [messages]);

  // We show the Eco Mode notification after the first assistant response (index 1)

  return (
    <div className="w-full max-w-[850px] mx-auto px-4" ref={historyRef}>
      <div className="py-4">
        {messages.map((message, index) => {
          // Render the message
          const messageBubble = <MessageBubble key={index} message={message} />;
          
          // If this is the first assistant response and Eco Mode is active, show notification after it
          if (index === 1 && message.role === 'assistant' && isEcoModeActive) {
            return (
              <React.Fragment key={index}>
                {messageBubble}
                <div className="flex justify-start mt-2 mb-4">
                  <EcoModeNotification isVisible={!message.isLoading} />
                </div>
              </React.Fragment>
            );
          }
          
          return messageBubble;
        })}
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </div>
  );
};

export default ChatHistory;
