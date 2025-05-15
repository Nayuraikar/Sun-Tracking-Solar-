import React from 'react';
import { MapPin, Sun, Cloud } from 'lucide-react';
import { Location } from '../../types';

interface LocationInfoProps {
  location: Location;
  solarIrradiance: number | null;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ location, solarIrradiance }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start">
        <MapPin className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
        <div>
          <p className="font-medium">Selected Coordinates</p>
          <p className="text-gray-600 text-sm">
            Latitude: {location.lat.toFixed(6)}, Longitude: {location.lon.toFixed(6)}
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <Sun className="w-5 h-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
        <div>
          <p className="font-medium">Solar Irradiance</p>
          {solarIrradiance !== null ? (
            <>
              <p className="text-gray-800 text-xl font-semibold">
                {solarIrradiance.toFixed(0)} W/m²
              </p>
              <p className="text-gray-600 text-sm">
                {getSolarIrradianceCategory(solarIrradiance)}
              </p>
            </>
          ) : (
            <p className="text-gray-600 text-sm italic">Loading solar data...</p>
          )}
        </div>
      </div>

      <div className="flex items-start">
        <Cloud className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
        <div>
          <p className="font-medium">Weather Data Source</p>
          <p className="text-gray-600 text-sm">
            Powered by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Open-Meteo</a> API
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper function to categorize solar irradiance
function getSolarIrradianceCategory(irradiance: number): string {
  if (irradiance > 800) return 'Excellent - Ideal for solar energy';
  if (irradiance > 600) return 'Very Good - High solar potential';
  if (irradiance > 400) return 'Good - Suitable for solar panels';
  if (irradiance > 200) return 'Moderate - Acceptable solar conditions';
  return 'Low - Limited solar potential';
}

export default LocationInfo;