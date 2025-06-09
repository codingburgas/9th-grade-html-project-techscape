import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import IncidentsList from './components/IncidentsList';
import TeamsList from './components/TeamsList';
import VehiclesList from './components/VehiclesList';
import EmployeesList from './components/EmployeesList';
import InteractiveMap from './components/InteractiveMap';
import Statistics from './components/Statistics';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'incidents':
        return <IncidentsList />;
      case 'teams':
        return <TeamsList />;
      case 'vehicles':
        return <VehiclesList />;
      case 'employees':
        return <EmployeesList />;
      case 'map':
        return <InteractiveMap />;
      case 'statistics':
        return <Statistics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Header 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderActiveSection()}
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;