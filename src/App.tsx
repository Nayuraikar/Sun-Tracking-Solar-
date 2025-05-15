import React from 'react';
import { Sun } from 'lucide-react';
import Dashboard from './components/Dashboard';
import { ArduinoProvider } from './contexts/ArduinoContext';
import { WeatherProvider } from './contexts/WeatherContext';
import { SolarCalculationProvider } from './contexts/SolarCalculationContext';

function App() {
  return (
    <ArduinoProvider>
      <WeatherProvider>
        <SolarCalculationProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <nav className="bg-white shadow-sm">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center">
                  <Sun className="h-8 w-8 text-yellow-500 mr-2" />
                  <h1 className="text-xl font-bold text-gray-800">Sun Tracking Solar Panel</h1>
                </div>
              </div>
            </nav>
            <Dashboard />
          </div>
        </SolarCalculationProvider>
      </WeatherProvider>
    </ArduinoProvider>
  );
}

export default App;