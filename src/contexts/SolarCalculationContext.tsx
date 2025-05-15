import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UsageType, Location, BatterySuggestion } from '../types';

interface SolarCalculationContextType {
  landSize: number;
  setLandSize: (size: number) => void;
  usageType: UsageType;
  setUsageType: (type: UsageType) => void;
  numberOfPanels: number;
  dailyEnergy: number;
  monthlyEnergy: number;
  annualEnergy: number;
  costSavingsPerYear: number;
  batterySuggestion: BatterySuggestion;
  calculateSolarOutput: (location: Location, solarIrradiance: number) => void;
}

const SolarCalculationContext = createContext<SolarCalculationContextType>({
  landSize: 50,
  setLandSize: () => {},
  usageType: 'residential',
  setUsageType: () => {},
  numberOfPanels: 0,
  dailyEnergy: 0,
  monthlyEnergy: 0,
  annualEnergy: 0,
  costSavingsPerYear: 0,
  batterySuggestion: { capacityKWh: 0, description: '' },
  calculateSolarOutput: () => {},
});

export const useSolarCalculation = () => useContext(SolarCalculationContext);

interface SolarCalculationProviderProps {
  children: ReactNode;
}

export const SolarCalculationProvider: React.FC<SolarCalculationProviderProps> = ({ children }) => {
  const [landSize, setLandSize] = useState<number>(50);
  const [usageType, setUsageType] = useState<UsageType>('residential');
  const [numberOfPanels, setNumberOfPanels] = useState<number>(0);
  const [dailyEnergy, setDailyEnergy] = useState<number>(0);
  const [monthlyEnergy, setMonthlyEnergy] = useState<number>(0);
  const [annualEnergy, setAnnualEnergy] = useState<number>(0);
  const [costSavingsPerYear, setCostSavingsPerYear] = useState<number>(0);
  const [batterySuggestion, setBatterySuggestion] = useState<BatterySuggestion>({
    capacityKWh: 0,
    description: ''
  });

  const calculateSolarOutput = (location: Location, solarIrradiance: number) => {
    // Constants
    const panelArea = 1.7; // m² per panel
    const panelEfficiency = 0.20; // 20% efficiency for a good solar panel
    const panelWattage = 350; // Watts per panel
    const panelCostINR = 25000; // Cost per panel in Rupees
    
    // Calculate number of panels that can fit in the land area
    // We allow space between panels, so use 80% of the theoretical maximum
    const maxPanels = Math.floor((landSize * 0.8) / panelArea);
    
    // Adjust number of panels based on usage type
    let actualPanels = maxPanels;
    switch (usageType) {
      case 'residential':
        actualPanels = Math.min(maxPanels, 20);
        break;
      case 'school':
        actualPanels = Math.min(maxPanels, 50);
        break;
      case 'office':
        actualPanels = Math.min(maxPanels, 30);
        break;
    }
    
    // Calculate energy production based on solar irradiance
    const hoursSunlight = 5; // Effective full-sun hours per day (average)
    const locationFactor = getLocationFactor(location.lat);
    
    // Daily energy in kWh
    const daily = (panelWattage * actualPanels * hoursSunlight * locationFactor * (solarIrradiance / 1000)) / 1000;
    
    // Monthly and annual energy
    const monthly = daily * 30;
    const annual = daily * 365;
    
    // Cost savings (using average electricity price of ₹8 per kWh)
    const electricityPriceINR = 8; // ₹ per kWh
    const savings = annual * electricityPriceINR;
    
    // Battery suggestion based on usage type and daily production
    const battery = getBatterySuggestion(usageType, daily);
    
    // Update state
    setNumberOfPanels(actualPanels);
    setDailyEnergy(daily);
    setMonthlyEnergy(monthly);
    setAnnualEnergy(annual);
    setCostSavingsPerYear(savings);
    setBatterySuggestion(battery);
  };

  const getLocationFactor = (latitude: number): number => {
    const absLat = Math.abs(latitude);
    if (absLat < 20) return 1.1;
    if (absLat < 40) return 1.0;
    if (absLat < 60) return 0.8;
    return 0.6;
  };

  const getBatterySuggestion = (usageType: UsageType, dailyEnergyKWh: number): BatterySuggestion => {
    const batteryPricePerKWh = 50000; // ₹ per kWh of battery capacity
    
    switch (usageType) {
      case 'residential':
        const homeCapacity = Math.max(5, Math.round(dailyEnergyKWh * 0.7));
        return {
          capacityKWh: homeCapacity,
          description: `Recommended battery capacity for home use. Estimated cost: ₹${(homeCapacity * batteryPricePerKWh).toLocaleString('en-IN')}`
        };
        
      case 'school':
        const schoolCapacity = Math.max(10, Math.round(dailyEnergyKWh * 0.5));
        return {
          capacityKWh: schoolCapacity,
          description: `Optimal for school operations. Estimated cost: ₹${(schoolCapacity * batteryPricePerKWh).toLocaleString('en-IN')}`
        };
        
      case 'office':
        const officeCapacity = Math.max(7, Math.round(dailyEnergyKWh * 0.6));
        return {
          capacityKWh: officeCapacity,
          description: `Suitable for office hours. Estimated cost: ₹${(officeCapacity * batteryPricePerKWh).toLocaleString('en-IN')}`
        };
        
      default:
        const defaultCapacity = Math.round(dailyEnergyKWh * 0.5);
        return {
          capacityKWh: defaultCapacity,
          description: `Standard battery configuration. Estimated cost: ₹${(defaultCapacity * batteryPricePerKWh).toLocaleString('en-IN')}`
        };
    }
  };

  const value = {
    landSize,
    setLandSize,
    usageType,
    setUsageType,
    numberOfPanels,
    dailyEnergy,
    monthlyEnergy,
    annualEnergy,
    costSavingsPerYear,
    batterySuggestion,
    calculateSolarOutput,
  };

  return (
    <SolarCalculationContext.Provider value={value}>
      {children}
    </SolarCalculationContext.Provider>
  );
};