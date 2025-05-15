import React, { useState } from 'react';
import { TabsNavigation, TabPanel } from './Tabs';
import ArduinoPanel from './arduino/ArduinoPanel';
import LocationPanel from './location/LocationPanel';
import CalculatorPanel from './calculator/CalculatorPanel';
import VisualizationPanel from './visualization/VisualizationPanel';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Arduino Data', icon: 'Cpu' },
    { name: 'Location', icon: 'MapPin' },
    { name: 'Calculator', icon: 'Calculator' },
    { name: 'Visualizations', icon: 'BarChart' },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <TabsNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="mt-6">
        <TabPanel activeTab={activeTab} index={0}>
          <ArduinoPanel />
        </TabPanel>
        <TabPanel activeTab={activeTab} index={1}>
          <LocationPanel />
        </TabPanel>
        <TabPanel activeTab={activeTab} index={2}>
          <CalculatorPanel />
        </TabPanel>
        <TabPanel activeTab={activeTab} index={3}>
          <VisualizationPanel />
        </TabPanel>
      </div>
    </div>
  );
};

export default Dashboard;