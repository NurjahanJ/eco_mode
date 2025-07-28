import React, { createContext, useContext, useState, useEffect } from 'react';
import EcoModeConfirmationModal from '../components/EcoModeConfirmationModal';

// Create a context for EcoMode management
const EcoModeContext = createContext();

// Custom hook to use the EcoMode context
export const useEcoMode = () => useContext(EcoModeContext);

export const EcoModeProvider = ({ children }) => {
  // Get initial EcoMode state from localStorage or default to false
  const getInitialState = () => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('ecoModeActive');
      return savedState ? JSON.parse(savedState) : false;
    }
    return false;
  };

  const [isEcoModeActive, setIsEcoModeActive] = useState(getInitialState);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  
  // Update localStorage when EcoMode state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ecoModeActive', JSON.stringify(isEcoModeActive));
    }
  }, [isEcoModeActive]);
  
  // Handle EcoMode toggle
  const toggleEcoMode = () => {
    // If EcoMode is currently active and user wants to turn it off, show confirmation
    if (isEcoModeActive) {
      setShowConfirmationModal(true);
    } else {
      // If turning on EcoMode, no confirmation needed
      setIsEcoModeActive(true);
    }
  };
  
  // Confirm turning off EcoMode
  const confirmTurnOffEcoMode = () => {
    setIsEcoModeActive(false);
    setShowConfirmationModal(false);
  };
  
  // Cancel turning off EcoMode
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
