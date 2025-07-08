import React from 'react';
import leafIcon from '../images/leaf-icon.svg';

const EcoModeNotification = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="bg-gray-800 text-white rounded-lg p-4 mb-4 flex items-center shadow-md max-w-md">
      <img 
        src={leafIcon} 
        alt="Eco Mode" 
        className="w-6 h-6 mr-3" 
        style={{ filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)' }} 
      />
      <div>
        <p className="text-base">
          The response will be processed in Eco Mode
        </p>
        <p className="text-sm text-gray-300">
          for energy efficiency
        </p>
      </div>
    </div>
  );
};

export default EcoModeNotification;
