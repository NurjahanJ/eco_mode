import React, { useState, useRef, useEffect } from 'react';
import { usePromptCount } from '../contexts/PromptCountContext';
import { useModel } from '../contexts/ModelContext';
import { Paintbrush, Globe, PencilLine, Binoculars } from 'lucide-react';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false);
  const [toolsMenuPosition, setToolsMenuPosition] = useState({ top: 0, left: 0 });
  const textareaRef = useRef(null);
  const toolsMenuRef = useRef(null);
  const toolsButtonRef = useRef(null);
  const { hasReachedLimit } = usePromptCount();
  const { selectedModel } = useModel();

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [message]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isToolsMenuOpen &&
        toolsMenuRef.current &&
        !toolsMenuRef.current.contains(event.target) &&
        toolsButtonRef.current &&
        !toolsButtonRef.current.contains(event.target)
      ) {
        setIsToolsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isToolsMenuOpen]);

  const handlePlaceholderClick = () => {
    if (!disabled && !hasReachedLimit) {
      setIsInputActive(true);
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled && !hasReachedLimit) {
      onSendMessage(message, selectedModel.id);
      setMessage('');
    }
  };







  const handleToolsButtonClick = () => {
    if (!isToolsMenuOpen && toolsButtonRef.current) {
      const rect = toolsButtonRef.current.getBoundingClientRect();
      setToolsMenuPosition({ top: window.scrollY + rect.top - 10, left: rect.left });
    }
    setIsToolsMenuOpen(!isToolsMenuOpen);

  };



  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="pt-2 px-4 pb-4 bg-white">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="relative rounded-3xl border bg-white border-gray-200 shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-3 cursor-text" onClick={handlePlaceholderClick}>
            {message || isInputActive ? (
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsInputActive(true)}
                onBlur={() => setIsInputActive(message.length > 0)}
                disabled={disabled || hasReachedLimit}
                className="w-full resize-none bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-900 p-0 m-0"
                rows="1"
                style={{ minHeight: '28px' }}
                autoFocus
              />
            ) : (
              <div className="text-sm text-gray-500 py-1">
                {hasReachedLimit ? "You've reached your daily limit of prompts" : "Ask anything"}
              </div>
            )}
          </div>

          <div className="flex items-center px-2 py-3">
            <div className="relative">
              <button
                type="button"
                ref={toolsButtonRef}
                onClick={handleToolsButtonClick}
                className="flex items-center ml-2 text-gray-500 hover:text-gray-700"
                disabled={disabled || hasReachedLimit}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                <span className="ml-1 text-sm"></span>
              </button>
              {isToolsMenuOpen && (
                <div ref={toolsMenuRef} className="fixed w-64 rounded-2xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50" style={{ top: `${toolsMenuPosition.top}px`, left: `${toolsMenuPosition.left}px`, transform: 'translateY(-100%)', marginTop: '-10px' }}>
                  <div className="py-2">
                    <button className="flex items-center w-full px-4 py-3 text-sm text-left text-gray-800 hover:bg-gray-100">
                      <img src="/images/clip.png" alt="Clip" className="mr-3 h-5 w-5" /> Add photos & files
                    </button>
                    <div className="mx-4 my-1 border-t border-gray-200"></div>
                    <button className="flex items-center w-full px-4 py-3 text-sm text-left text-gray-800 hover:bg-gray-100">
                      <Paintbrush className="mr-3 h-5 w-5" /> Create Image
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-sm text-left text-gray-800 hover:bg-gray-100">
                      <Globe className="mr-3 h-5 w-5" /> Web Search
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-sm text-left text-gray-800 hover:bg-gray-100">
                      <PencilLine className="mr-3 h-5 w-5" /> Canvas
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-sm text-left text-gray-800 hover:bg-gray-100">
                      <Binoculars className="mr-3 h-5 w-5" /> Deep Search <span className="ml-auto text-gray-400 text-xs">24 left</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-grow px-2"></div>

            <button
              type="submit"
              disabled={!message.trim() || disabled || hasReachedLimit}
              className={`p-2 ml-1 mr-2 rounded-full ${!message.trim() || disabled || hasReachedLimit ? 'opacity-50 cursor-not-allowed' : ''} bg-gray-200 text-gray-600 hover:bg-gray-300`}
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
