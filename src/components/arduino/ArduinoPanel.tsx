import React, { useState } from 'react';
import { useArduino } from '../../contexts/ArduinoContext';
import ArduinoConnection from './ArduinoConnection';
import ArduinoData from './ArduinoData';
import ArduinoCodeDisplay from './ArduinoCodeDisplay';

const ArduinoPanel: React.FC = () => {
  const { connected, ldr1Value, ldr2Value, servoPosition } = useArduino();
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Arduino Connection</h2>
        <ArduinoConnection />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Live Data</h2>
        {connected ? (
          <ArduinoData
            ldr1Value={ldr1Value}
            ldr2Value={ldr2Value}
            servoPosition={servoPosition}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            Connect to Arduino to see live data
          </div>
        )}
      </div>

      <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Arduino Code</h2>
          <button 
            onClick={() => setShowCode(!showCode)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
        </div>
        
        {showCode && <ArduinoCodeDisplay />}
      </div>
    </div>
  );
};

export default ArduinoPanel;