import React, { useState } from 'react';
import { useArduino } from '../../contexts/ArduinoContext';
import { HelpCircle } from 'lucide-react';

const ArduinoConnection: React.FC = () => {
  const { connected, connect, disconnect } = useArduino();
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className={`h-3 w-3 rounded-full mr-2 ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <p className="text-gray-700">Status: {connected ? 'Connected' : 'Disconnected'}</p>
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="ml-auto text-gray-400 hover:text-gray-600"
        >
          <HelpCircle size={18} />
        </button>
      </div>

      {showHelp && (
        <div className="bg-blue-50 p-4 rounded-md mb-4 text-sm">
          <p className="font-medium text-blue-800 mb-2">Connection Help</p>
          <ol className="list-decimal list-inside space-y-1 text-blue-700">
            <li>Connect your Arduino to your computer via USB</li>
            <li>Upload the sun tracking code to your Arduino</li>
            <li>Make sure Arduino app is not using the serial port</li>
            <li>Click "Connect to Arduino" button below</li>
            <li>Select the appropriate COM port in the popup</li>
          </ol>
        </div>
      )}

      <div className="flex flex-col space-y-3">
        <div className="flex items-center">
          <span className="text-sm text-gray-600 w-24">Device:</span>
          <span className="text-sm font-medium">Arduino Uno</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 w-24">Baud Rate:</span>
          <span className="text-sm font-medium">9600</span>
        </div>

        <div className="mt-4">
          {!connected ? (
            <button
              onClick={connect}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Connect to Arduino
            </button>
          ) : (
            <button
              onClick={disconnect}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArduinoConnection;