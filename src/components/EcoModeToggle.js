import React from 'react';
import { useEcoMode } from '../contexts/EcoModeContext';
import leafIcon from '../images/leaf-icon.svg';

const EcoModeToggle = () => {
  const { isEcoModeActive, toggleEcoMode } = useEcoMode();

  return (
    <button
      onClick={toggleEcoMode}
      className={`p-2 rounded-full transition-colors duration-300 ${
        isEcoModeActive ? 'text-green-600 hover:bg-green-100' : 'text-gray-500 hover:bg-gray-100'
      }`}
      title={isEcoModeActive ? 'EcoMode Active' : 'Activate EcoMode'}
      aria-label={isEcoModeActive ? 'Disable EcoMode' : 'Enable EcoMode'}
    >
      <img
        src={leafIcon}
        alt="EcoMode"
        width="24"
        height="24"
        className={`transition-transform duration-300 ${isEcoModeActive ? 'rotate-12 filter-green' : 'filter-black'}`}
        style={{
          filter: isEcoModeActive ? 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(90%) contrast(80%)' : 'none'
        }}
      />
    </button>
  );
};

export default EcoModeToggle;
