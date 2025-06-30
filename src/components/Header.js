import React from 'react';
import ModelSelector from './ModelSelector';
import EcoModeToggle from './EcoModeToggle';

const Header = () => {
  return (
    <header className="py-3 px-4 bg-white">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <ModelSelector />
        </div>
        <div className="flex items-center">
          <EcoModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
