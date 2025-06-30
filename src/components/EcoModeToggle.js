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
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isEcoModeActive ? "rgba(22, 163, 74, 0.2)" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray={isEcoModeActive ? "0" : "2"}
        className={`transition-transform duration-300 ${isEcoModeActive ? 'rotate-12' : ''}`}
      >
        {/* Simple leaf path matching the provided image */}
        <path 
          d="M6 21c4-2 8-5 9-9c1-4-2-8-6-9c-4 1-7 4-8 8c-1 4 1 8 5 10zM6 21v-4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    </button>
  );
};

export default EcoModeToggle;
