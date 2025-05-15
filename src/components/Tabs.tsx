import React from 'react';
import { Cpu, MapPin, Calculator, BarChart } from 'lucide-react';

interface TabsNavigationProps {
  tabs: { name: string; icon: string }[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export const TabsNavigation: React.FC<TabsNavigationProps> = ({ tabs, activeTab, setActiveTab }) => {
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'MapPin': return <MapPin className="w-5 h-5" />;
      case 'Calculator': return <Calculator className="w-5 h-5" />;
      case 'BarChart': return <BarChart className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab, index) => (
          <button
            key={tab.name}
            className={`
              ${activeTab === index
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2
              transition-colors duration-200
            `}
            onClick={() => setActiveTab(index)}
          >
            {getIcon(tab.icon)}
            <span>{tab.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

interface TabPanelProps {
  children: React.ReactNode;
  activeTab: number;
  index: number;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children, activeTab, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={activeTab !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {activeTab === index && children}
    </div>
  );
};