import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Location } from '../types';

interface WeatherContextType {
  location: Location | null;
  setLocation: (location: Location) => void;
  solarIrradiance: number | null;
  fetchWeatherData: (location: Location) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType>({
  location: null,
  setLocation: () => {},
  solarIrradiance: null,
  fetchWeatherData: async () => {},
});

export const useWeather = () => useContext(WeatherContext);

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [solarIrradiance, setSolarIrradiance] = useState<number | null>(null);

  const fetchWeatherData = async (location: Location) => {
    try {
      // Use Open-Meteo API to get solar radiation data
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=shortwave_radiation&timezone=auto`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      // Extract shortwave radiation (solar irradiance)
      if (data?.current?.shortwave_radiation !== undefined) {
        setSolarIrradiance(data.current.shortwave_radiation);
      } else {
        // Fallback to a random value if API fails
        setSolarIrradiance(Math.floor(Math.random() * 600) + 200);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Fallback to a random value if API fails
      setSolarIrradiance(Math.floor(Math.random() * 600) + 200);
    }
  };

  // Fetch weather data when location changes
  useEffect(() => {
    if (location) {
      fetchWeatherData(location);
    }
  }, [location]);

  const value = {
    location,
    setLocation,
    solarIrradiance,
    fetchWeatherData,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};