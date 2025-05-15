import React from 'react';
import { UsageType } from '../../types';

interface CalculatorFormProps {
  landSize: number;
  setLandSize: (size: number) => void;
  usageType: UsageType;
  setUsageType: (type: UsageType) => void;
  onCalculate: (e: React.FormEvent) => void;
  isDisabled: boolean;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  landSize,
  setLandSize,
  usageType,
  setUsageType,
  onCalculate,
  isDisabled
}) => {
  return (
    <form onSubmit={onCalculate} className="space-y-6">
      <div>
        <label htmlFor="landSize" className="block text-sm font-medium text-gray-700 mb-1">
          Available Land Area (m²)
        </label>
        <input
          type="number"
          id="landSize"
          value={landSize}
          onChange={(e) => setLandSize(parseFloat(e.target.value) || 0)}
          min="1"
          step="0.1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Intended Usage
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {Object.entries({
            residential: 'Residential',
            school: 'School',
            office: 'Small Office'
          }).map(([key, label]) => (
            <div 
              key={key}
              className={`
                border rounded-lg p-4 cursor-pointer transition-colors
                ${usageType === key 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
              onClick={() => setUsageType(key as UsageType)}
            >
              <div className="font-medium">{label}</div>
              <div className="text-xs text-gray-500 mt-1">
                {key === 'residential' && 'For homes and apartments'}
                {key === 'school' && 'For educational institutions'}
                {key === 'office' && 'For small business spaces'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isDisabled}
          className={`
            w-full py-2 px-4 rounded-md text-white font-medium text-sm
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            ${isDisabled 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'}
          `}
        >
          Calculate Solar Potential
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;