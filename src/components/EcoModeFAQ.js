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
              <h1 className="text-2xl font-bold">EcoMode FAQ</h1>
            </div>
          </div>
          
          {/* Subtitle */}
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Learn more about how EcoMode can help us save energy and reduce environmental impact
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
                    How EcoMode works
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('enable-disable').scrollIntoView({ behavior: 'smooth' })}
                    className="text-blue-600 dark:text-blue-400 hover:underline text-left"
                  >
                    How do I enable or disable EcoMode?
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
                  <h3 className="font-medium mb-2 text-lg">Electricity Consumption & Carbon Emissions</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Each query typically uses between 0.3-0.4 watt-hours (Wh) of electricity</li>
                    <li>According to OpenAI CEO Sam Altman, the average query uses about 0.34 Wh<sup><strong>1</strong></sup></li>
                    <li>According to a scientific source, a single short GPT-4o query consumes approximately 0.42 Wh<sup><strong>2</strong></sup></li>
                    <li>With over 1 billion queries processed daily, this adds up to substantial energy usage</li>
                    <li>Based on the global average carbon intensity (445g CO₂/kWh)<sup><strong>3</strong></sup>, electricity used for a single query (0.42 Wh) equates to 0.19g of CO₂ per query</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-lg">Water Usage</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>GPT-3 consumes approximately 500 ml of water for 10-50 medium-length responses<sup><strong>4</strong></sup></li>
                    <li>Water usage can be significantly higher in certain regions depending on weather conditions and operational resources of each data center</li>
                    <li>In the U.S., hot and arid regions like Arizona require more evaporative cooling than cool and dry regions like Wyoming with better water efficiency<sup><strong>4</strong></sup></li>
                    <li>On a global scale, processing a 10-page report in GPT-4o in data centers from certain African countries can go up to 60 liters of water consumption<sup><strong>5</strong></sup></li>
                    <li>Water is primarily used for cooling data center infrastructure</li>
                  </ul>
                </div>
                

                
                <p className="text-gray-700 dark:text-gray-300">
                  Data centers running these AI models can consume as much electricity as small towns, highlighting the importance of energy efficiency measures like EcoMode.
                </p>
                

              </div>
            </div>
            
            <div id="how-it-works" className="scroll-mt-4">
              <h2 className="text-xl font-medium mb-3">How EcoMode works</h2>
              <p className="text-gray-700 dark:text-gray-300">
              When local, real-time energy demands are high, EcoMode selects better alternatives such as batching similar requests for latent mass-processing, rerouting prompts to energy-efficient data centers and regions, and selecting more energy-efficient models for different prompt types.
              </p>
            </div>
            
            <div id="enable-disable" className="scroll-mt-4">
              <h2 className="text-xl font-medium mb-3">How do I enable or disable EcoMode?</h2>
              
              <div className="space-y-6">
                <p className="text-gray-700 dark:text-gray-300">
                  Enabling or disabling EcoMode is simple. Follow these steps:
                </p>
                
                <div className="space-y-8">
                  {/* Option 1 */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b">
                      <h3 className="font-medium">Option 1: Find the EcoMode icon</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Look for the leaf icon in the top-right corner of the interface, next to the settings icon.
                      </p>
                      <div className="flex justify-center">
                        <div className="border rounded-lg overflow-hidden shadow-sm max-w-md">
                          <img 
                            src="/images/leaf-image.png" 
                            alt="EcoMode Leaf Icon" 
                            className="w-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Option 2 */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b">
                      <h3 className="font-medium">Option 2: Access Settings and Toggle EcoMode</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Click on the settings icon to open the Settings menu. In the settings panel, you'll find the EcoMode toggle switch. Click the switch to turn EcoMode on (green) or off.
                      </p>
                      <div className="flex justify-center">
                        <div className="border rounded-lg overflow-hidden shadow-sm max-w-md">
                          <img 
                            src="/images/setting-image.png" 
                            alt="EcoMode Settings Toggle" 
                            className="w-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Option 3 */}
                  <div className="border rounded-lg overflow-hidden mt-8">
                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b">
                      <h3 className="font-medium">Option 3: Click the Leaf Icon in Welcome Message</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        If EcoMode is turned off, you'll see a welcome message with a leaf icon. Simply click on the leaf icon in the welcome message to turn on EcoMode instantly.
                      </p>
                      <div className="flex justify-center">
                        <div className="border rounded-lg overflow-hidden shadow-sm max-w-md">
                          <img 
                            src="/images/welcome-message.png" 
                            alt="Welcome Message with EcoMode Leaf Icon" 
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
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                  <strong>Sources:</strong><br />
                  <sup><strong>1</strong></sup> <a href="https://blog.samaltman.com/the-gentle-singularity" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://blog.samaltman.com/the-gentle-singularity</a><br />
                  <sup><strong>2</strong></sup> <a href="https://arxiv.org/abs/2505.09598" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://arxiv.org/abs/2505.09598</a><br />
                  <sup><strong>3</strong></sup> <a href="https://www.iea.org/reports/electricity-2025/emissions" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://www.iea.org/reports/electricity-2025/emissions</a><br />
                  <sup><strong>4</strong></sup> <a href="https://arxiv.org/abs/2304.03271" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://arxiv.org/abs/2304.03271</a><br />
                  <sup><strong>5</strong></sup> <a href="https://arxiv.org/abs/2412.03716" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://arxiv.org/abs/2412.03716</a>
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
