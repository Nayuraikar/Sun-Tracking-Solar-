import React from 'react';
import { useSolarCalculation } from '../../contexts/SolarCalculationContext';
import { Battery, Calendar, IndianRupee, PanelTop } from 'lucide-react';

const CalculatorResults: React.FC = () => {
  const { 
    numberOfPanels, 
    dailyEnergy, 
    monthlyEnergy, 
    annualEnergy, 
    costSavingsPerYear,
    batterySuggestion
  } = useSolarCalculation();

  const panelCost = numberOfPanels * 25000; // ₹25,000 per panel

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-start">
            <PanelTop className="w-10 h-10 text-blue-500 mr-3" />
            <div>
              <h3 className="text-blue-800 font-medium">Solar Panel System</h3>
              <p className="text-2xl font-bold text-gray-800">{numberOfPanels} panels</p>
              <p className="text-sm text-gray-600 mt-1">
                350W panels, ₹{panelCost.toLocaleString('en-IN')} total cost
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
          <div className="flex items-start">
            <Battery className="w-10 h-10 text-green-500 mr-3" />
            <div>
              <h3 className="text-green-800 font-medium">Battery Storage</h3>
              <p className="text-2xl font-bold text-gray-800">{batterySuggestion.capacityKWh} kWh</p>
              <p className="text-sm text-gray-600 mt-1">
                {batterySuggestion.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Energy Production</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-10 bg-yellow-400 rounded-full mr-3"></div>
              <span className="text-gray-600">Daily Energy</span>
            </div>
            <span className="font-semibold">{dailyEnergy.toFixed(1)} kWh</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-10 bg-orange-400 rounded-full mr-3"></div>
              <span className="text-gray-600">Monthly Energy</span>
            </div>
            <span className="font-semibold">{monthlyEnergy.toFixed(1)} kWh</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-10 bg-red-400 rounded-full mr-3"></div>
              <span className="text-gray-600">Annual Energy</span>
            </div>
            <span className="font-semibold">{annualEnergy.toFixed(1)} kWh</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center">
          <IndianRupee className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-800">Financial Analysis</h3>
        </div>
        
        <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Annual Savings</span>
            <span className="text-xl font-bold text-green-600">
              ₹{costSavingsPerYear.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    Return on Investment
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {Math.round(panelCost / costSavingsPerYear)} years
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-blue-200">
                <div 
                  style={{ width: `${Math.min((costSavingsPerYear / panelCost) * 100, 100)}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorResults;