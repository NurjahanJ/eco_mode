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
        strokeWidth="1"
        strokeDasharray={isEcoModeActive ? "0" : "2"}
        className={`transition-transform duration-300 ${isEcoModeActive ? 'rotate-12' : ''}`}
      >
        {/* Leaf path that resembles the dotted outline in the image */}
        <path d="M6 3C7.5 3.5 10.5 6.5 12 8C14.5 10.5 15.5 14.5 15 18C14.5 21.5 12 22 10.5 22C9 22 7 21 6 18.5C5 16 5.5 13 7 11C8.5 9 11 8 14 8C17 8 20 10 21 12" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    </button>
  );
};

export default EcoModeToggle;
