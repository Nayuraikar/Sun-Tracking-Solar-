import React from 'react';
import MapComponent from './MapComponent';
import LocationInfo from './LocationInfo';
import { useWeather } from '../../contexts/WeatherContext';

const LocationPanel: React.FC = () => {
  const { 
    location, 
    solarIrradiance 
  } = useWeather();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Location</h2>
        
        <div className="h-96 rounded-md overflow-hidden">
          <MapComponent />
        </div>
      </div>

      {location && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Location Information</h2>
          <LocationInfo location={location} solarIrradiance={solarIrradiance} />
        </div>
      )}
    </div>
  );
};

export default LocationPanel;