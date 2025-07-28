import React from 'react';

const EcoModeConfirmationModal = ({ isOpen, onKeepEcoMode, onTurnOff }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <div className="text-left">
          <h2 className="text-xl font-medium mb-6 text-left">
            Switching off EcoMode could increase your environmental impact.
            <br />
            Still wish to proceed?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={onKeepEcoMode}
              className="px-6 py-3 bg-green-700 text-white font-medium rounded hover:bg-green-800 transition-colors"
            >
              Keep EcoMode On
            </button>
            
            <button
              onClick={onTurnOff}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded hover:bg-gray-300 transition-colors"
            >
              Yes, Turn Off
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoModeConfirmationModal;
