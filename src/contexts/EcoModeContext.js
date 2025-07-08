import React, { createContext, useContext, useState, useEffect } from 'react';
import EcoModeConfirmationModal from '../components/EcoModeConfirmationModal';

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
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  
  // Update localStorage when eco mode state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ecoModeActive', JSON.stringify(isEcoModeActive));
    }
  }, [isEcoModeActive]);
  
  // Handle eco mode toggle
  const toggleEcoMode = () => {
    // If eco mode is currently active and user wants to turn it off, show confirmation
    if (isEcoModeActive) {
      setShowConfirmationModal(true);
    } else {
      // If turning on eco mode, no confirmation needed
      setIsEcoModeActive(true);
    }
  };
  
  // Confirm turning off eco mode
  const confirmTurnOffEcoMode = () => {
    setIsEcoModeActive(false);
    setShowConfirmationModal(false);
  };
  
  // Cancel turning off eco mode
  const cancelTurnOffEcoMode = () => {
    setShowConfirmationModal(false);
  };

  return (
    <EcoModeContext.Provider value={{ 
      isEcoModeActive, 
      toggleEcoMode
    }}>
      {children}
      <EcoModeConfirmationModal 
        isOpen={showConfirmationModal}
        onKeepEcoMode={cancelTurnOffEcoMode}
        onTurnOff={confirmTurnOffEcoMode}
      />
    </EcoModeContext.Provider>
  );
};
