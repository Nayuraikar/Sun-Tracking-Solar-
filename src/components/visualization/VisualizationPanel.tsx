import React, { useState } from 'react';
import { useArduino } from '../../contexts/ArduinoContext';
import LightIntensityChart from './LightIntensityChart';

const VisualizationPanel: React.FC = () => {
  const { connected, data } = useArduino();
  const [chart, setChart] = useState<'light'>('light');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Data Visualization</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setChart('light')}
              className={`px-3 py-1 rounded-md text-sm ${
                chart === 'light' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Light Intensity
            </button>
          </div>
        </div>

        <div className="h-80">
          {chart === 'light' && (
            connected ? (
              <LightIntensityChart data={data} />
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">Connect to Arduino to see light intensity data</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualizationPanel;