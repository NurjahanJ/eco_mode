import React from 'react';
import ModelSelector from './ModelSelector';
import EcoModeToggle from './EcoModeToggle';
import { useEcoMode } from '../contexts/EcoModeContext';

const Header = ({ hasMessages }) => {
  const { isEcoModeActive } = useEcoMode();
  
  return (
    <header className="py-3 px-4 bg-white">
      <div className="max-w-5xl mx-auto flex items-center">
        <div className="w-1/3 flex justify-start">
          <ModelSelector />
        </div>
        <div className="w-1/3 flex justify-center">
          {isEcoModeActive && hasMessages && (
            <div className="font-medium">
              Eco Mode Chat
            </div>
          )}
        </div>
        <div className="w-1/3 flex justify-end">
          <EcoModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
