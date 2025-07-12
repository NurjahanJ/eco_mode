import React from 'react';
import { useNavigate } from 'react-router-dom';

const EcoModeFAQ = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl mx-auto shadow-lg overflow-hidden">
        <div className="p-6">
          {/* Header with back button */}
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full mr-2"
              aria-label="Go back"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Eco Mode FAQ</h1>
            </div>
          </div>
          
          {/* Subtitle */}
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Learn more about how Eco Mode can help us save energy and reduce environmental impact
          </p>
          
          {/* Table of Contents */}
          <div className="mb-8 border rounded-lg overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b">
              <h2 className="font-medium">Table of Contents</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                <li>
                  <a href="#energy-consumption" className="text-blue-600 dark:text-blue-400 hover:underline">
                    How much energy does ChatGPT consume?
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-blue-600 dark:text-blue-400 hover:underline">
                    How Eco Mode works
                  </a>
                </li>
                <li>
                  <a href="#enable-disable" className="text-blue-600 dark:text-blue-400 hover:underline">
                    How do I enable or disable Eco Mode?
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* FAQ Content */}
          <div className="space-y-8">
            <div id="energy-consumption" className="scroll-mt-4">
              <h2 className="text-xl font-medium mb-3">How much energy does ChatGPT consume?</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Large language models like ChatGPT require significant computational resources. Each query processed by ChatGPT consumes approximately 0.1-0.2 kWh of electricity, equivalent to charging a smartphone 3-5 times. With millions of queries daily, this adds up to substantial energy usage and associated carbon emissions. Data centers running these AI models can consume as much electricity as small towns, highlighting the importance of energy efficiency measures.
              </p>
            </div>
            
            <div id="how-it-works" className="scroll-mt-4">
              <h2 className="text-xl font-medium mb-3">How Eco Mode works</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Eco Mode optimizes energy usage by intelligently managing query processing. When activated, it implements several strategies: batching similar queries to process them together, routing requests to data centers powered by renewable energy when possible, and slightly delaying non-urgent queries to optimize server load. This smart resource allocation can reduce energy consumption by up to 30% while maintaining response quality, with only minimal impact on response times for non-critical queries.
              </p>
            </div>
            
            <div id="enable-disable" className="scroll-mt-4">
              <h2 className="text-xl font-medium mb-3">How do I enable or disable Eco Mode?</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Enabling or disabling Eco Mode is simple. Click on the settings icon in the top-right corner of the interface to open the Settings menu. In the settings panel, you'll find the Eco Mode toggle switch. Click the switch to turn Eco Mode on (green) or off. Your preference will be saved automatically and applied to all your future interactions. You can toggle this setting at any time based on your needs, switching between maximum performance and energy-efficient operation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoModeFAQ;
