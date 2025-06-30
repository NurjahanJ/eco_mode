import React from 'react';
import { useEcoMode } from '../contexts/EcoModeContext';

const EcoModeToggle = () => {
  const { isEcoModeActive, toggleEcoMode } = useEcoMode();

  return (
    <button
      onClick={toggleEcoMode}
      className={`p-2 rounded-full transition-colors duration-300 ${
        isEcoModeActive ? 'text-green-600 hover:bg-green-100' : 'text-gray-500 hover:bg-gray-100'
      }`}
      title={isEcoModeActive ? 'Eco Mode Active' : 'Activate Eco Mode'}
      aria-label={isEcoModeActive ? 'Disable Eco Mode' : 'Enable Eco Mode'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${isEcoModeActive ? 'rotate-12' : ''}`}
      >
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
        <path d="M12 2c0 5.5 4.5 10 10 10-5.5 0-10 4.5-10 10 0-5.5-4.5-10-10-10 5.5 0 10-4.5 10-10z" />
      </svg>
    </button>
  );
};

export default EcoModeToggle;
