import React, { useState } from 'react';
import { useSolarCalculation } from '../../contexts/SolarCalculationContext';
import { useWeather } from '../../contexts/WeatherContext';
import CalculatorForm from './CalculatorForm';
import CalculatorResults from './CalculatorResults';

const CalculatorPanel: React.FC = () => {
  const [hasCalculated, setHasCalculated] = useState(false);
  const { location, solarIrradiance } = useWeather();
  const { 
    landSize, 
    setLandSize,
    usageType,
    setUsageType,
    calculateSolarOutput
  } = useSolarCalculation();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (location && solarIrradiance !== null) {
      calculateSolarOutput(location, solarIrradiance);
      setHasCalculated(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Solar Panel Calculator</h2>
        
        {!location && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
            <p className="text-amber-800 text-sm">
              Please select a location first to calculate solar potential.
            </p>
          </div>
        )}
        
        <CalculatorForm
          landSize={landSize}
          setLandSize={setLandSize}
          usageType={usageType}
          setUsageType={setUsageType}
          onCalculate={handleCalculate}
          isDisabled={!location || solarIrradiance === null}
        />
      </div>

      {hasCalculated && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Solar System Results</h2>
          <CalculatorResults />
        </div>
      )}
    </div>
  );
};

export default CalculatorPanel;