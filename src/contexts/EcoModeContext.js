import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for eco mode management
const EcoModeContext = createContext();

// Custom hook to use the eco mode context
export const useEcoMode = () => useContext(EcoModeContext);

export const EcoModeProvider = ({ children }) => {
  // Get initial eco mode state from localStorage or default to false
  const getInitialState = () => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('ecoModeActive');
      return savedState ? JSON.parse(savedState) : false;
    }
    return false;
  };

  const [isEcoModeActive, setIsEcoModeActive] = useState(getInitialState);
  
  // Update localStorage when eco mode state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ecoModeActive', JSON.stringify(isEcoModeActive));
    }
  }, [isEcoModeActive]);
  
  // Toggle eco mode state
  const toggleEcoMode = () => {
    setIsEcoModeActive(prevState => !prevState);
  };

  return (
    <EcoModeContext.Provider value={{ 
      isEcoModeActive, 
      toggleEcoMode
    }}>
      {children}
    </EcoModeContext.Provider>
  );
};
