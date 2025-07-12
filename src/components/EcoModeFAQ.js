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
              onClick={() => navigate('/')}
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
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3">
              <h2 className="font-medium">Table of Contents</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => document.getElementById('energy-consumption').scrollIntoView({ behavior: 'smooth' })}
                    className="text-blue-600 dark:text-blue-400 hover:underline text-left"
                  >
                    How much energy does ChatGPT consume?
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                    className="text-blue-600 dark:text-blue-400 hover:underline text-left"
                  >
                    How Eco Mode works
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('enable-disable').scrollIntoView({ behavior: 'smooth' })}
                    className="text-blue-600 dark:text-blue-400 hover:underline text-left"
                  >
                    How do I enable or disable Eco Mode?
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          {/* FAQ Content */}
          <div className="space-y-8">
            <div id="energy-consumption" className="scroll-mt-4">
              <h2 className="text-xl font-medium mb-3">How much energy does ChatGPT consume?</h2>
              
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Large language models like ChatGPT require significant computational resources. Recent research provides detailed insights into their environmental impact:
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-lg">Electricity Consumption</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Each query typically uses between 0.3-0.4 watt-hours (Wh) of electricity</li>
                    <li>A single short GPT-4o query consumes approximately 0.43 Wh</li>
                    <li>According to OpenAI CEO Sam Altman, the average query uses about 0.34 Wh</li>
                    <li>With approximately 700 million queries processed daily, this adds up to substantial energy usage</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-lg">Water Usage</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>GPT-3 consumes approximately 500ml of water for 10-50 medium-length responses</li>
                    <li>Water usage can be significantly higher in certain regions, with recent studies in Africa showing up to 60 liters of water consumption</li>
                    <li>Water is primarily used for cooling data center infrastructure</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-lg">Carbon Emissions</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>A single query (0.43 Wh) equates to approximately 0.00043 kWh</li>
                    <li>Using the global average carbon intensity (400g CO₂/kWh), this results in about 0.17g of CO₂ per query</li>
                    <li>Interestingly, research suggests that AI-generated writing may emit less carbon compared to human writing processes</li>
                  </ul>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300">
                  Data centers running these AI models can consume as much electricity as small towns, highlighting the importance of energy efficiency measures like Eco Mode.
                </p>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  Sources: <a href="https://arxiv.org/abs/2505.09598" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">arXiv:2505.09598</a>, 
                  <a href="https://blog.samaltman.com/the-gentle-singularity" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Sam Altman's Blog</a>, 
                  <a href="https://arxiv.org/abs/2304.03271" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">arXiv:2304.03271</a>, 
                  <a href="https://arxiv.org/abs/2412.03716" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">arXiv:2412.03716</a>, 
                  <a href="https://www.nature.com/articles/s41598-024-54271-x" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Nature Scientific Reports</a>
                </p>
              </div>
            </div>
            
            <div id="how-it-works" className="scroll-mt-4">
              <h2 className="text-xl font-medium mb-3">How Eco Mode works</h2>
              <p className="text-gray-700 dark:text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            
            <div id="enable-disable" className="scroll-mt-4">
              <h2 className="text-xl font-medium mb-3">How do I enable or disable Eco Mode?</h2>
              
              <div className="space-y-6">
                <p className="text-gray-700 dark:text-gray-300">
                  Enabling or disabling Eco Mode is simple. Follow these steps:
                </p>
                
                <div className="space-y-8">
                  {/* Option 1 */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b">
                      <h3 className="font-medium">Option 1: Find the Eco Mode icon</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Look for the leaf icon in the top-right corner of the interface, next to the settings icon.
                      </p>
                      <div className="flex justify-center">
                        <div className="border rounded-lg overflow-hidden shadow-sm max-w-md">
                          <img 
                            src="/images/leaf-image.png" 
                            alt="Eco Mode Leaf Icon" 
                            className="w-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Option 2 */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b">
                      <h3 className="font-medium">Option 2: Access Settings and Toggle Eco Mode</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Click on the settings icon to open the Settings menu. In the settings panel, you'll find the Eco Mode toggle switch. Click the switch to turn Eco Mode on (green) or off.
                      </p>
                      <div className="flex justify-center">
                        <div className="border rounded-lg overflow-hidden shadow-sm max-w-md">
                          <img 
                            src="/images/setting-image.png" 
                            alt="Eco Mode Settings Toggle" 
                            className="w-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300">
                  Your preference will be saved automatically and applied to all your future interactions. You can toggle this setting at any time based on your needs, switching between maximum performance and energy-efficient operation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoModeFAQ;
