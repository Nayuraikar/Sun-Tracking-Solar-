import React from 'react';
import { Sun } from 'lucide-react';

interface ArduinoDataProps {
  ldr1Value: number;
  ldr2Value: number;
  servoPosition: number;
}

const ArduinoData: React.FC<ArduinoDataProps> = ({ 
  ldr1Value, 
  ldr2Value, 
  servoPosition 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-gray-500">LDR Sensor 1</p>
          <p className="text-xl font-semibold">{ldr1Value}</p>
        </div>
        <div className="w-24 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-yellow-400" 
            style={{ width: `${Math.min((ldr1Value / 1023) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-gray-500">LDR Sensor 2</p>
          <p className="text-xl font-semibold">{ldr2Value}</p>
        </div>
        <div className="w-24 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-yellow-400" 
            style={{ width: `${Math.min((ldr2Value / 1023) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center mb-2">
          <p className="text-sm text-gray-600">Solar Panel Position</p>
        </div>
        <div className="flex items-center justify-center">
          <div 
            className="relative h-24 w-24 flex items-center justify-center"
            style={{ transform: `rotate(${servoPosition - 90}deg)` }}
          >
            <Sun size={64} className="text-yellow-500" />
            <div className="absolute w-6 h-1 bg-blue-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -ml-3"></div>
          </div>
        </div>
        <div className="text-center mt-2">
          <p className="text-xs text-gray-500">Servo Angle</p>
          <p className="text-lg font-semibold">{servoPosition}°</p>
        </div>
      </div>
    </div>
  );
};

export default ArduinoData;