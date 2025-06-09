import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'bg';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.incidents': 'Incidents',
    'nav.teams': 'Teams',
    'nav.vehicles': 'Vehicles',
    'nav.employees': 'Employees',
    'nav.map': 'Map',
    'nav.statistics': 'Statistics',
    
    // Dashboard
    'dashboard.title': 'Fire Safety Management System',
    'dashboard.activeIncidents': 'Active Incidents',
    'dashboard.totalTeams': 'Total Teams',
    'dashboard.availableVehicles': 'Available Vehicles',
    'dashboard.employeesOnDuty': 'Employees on Duty',
    
    // Status
    'status.free': 'Free',
    'status.busy': 'Busy',
    'status.standby': 'Standby',
    'status.available': 'Available',
    'status.inUse': 'In Use',
    'status.maintenance': 'Maintenance',
    'status.reported': 'Reported',
    'status.responding': 'Responding',
    'status.onScene': 'On Scene',
    'status.resolved': 'Resolved',
    
    // Incidents
    'incident.type.fire': 'Fire',
    'incident.type.accident': 'Accident',
    'incident.type.rescue': 'Rescue',
    'incident.type.other': 'Other',
    'incident.severity.low': 'Low',
    'incident.severity.medium': 'Medium',
    'incident.severity.high': 'High',
    'incident.severity.critical': 'Critical',
    
    // Forms
    'form.search': 'Search...',
    'form.filter': 'Filter',
    'form.all': 'All',
    'form.reportIncident': 'Report Incident',
    
    // Common
    'common.loading': 'Loading...',
    'common.noData': 'No data available',
    'common.location': 'Location',
    'common.time': 'Time',
    'common.team': 'Team',
    'common.vehicle': 'Vehicle',
    'common.details': 'Details'
  },
  bg: {
    // Navigation
    'nav.dashboard': 'Табло',
    'nav.incidents': 'Произшествия',
    'nav.teams': 'Екипи',
    'nav.vehicles': 'Автомобили',
    'nav.employees': 'Служители',
    'nav.map': 'Карта',
    'nav.statistics': 'Статистика',
    
    // Dashboard
    'dashboard.title': 'Система за управление на пожарна безопасност',
    'dashboard.activeIncidents': 'Активни произшествия',
    'dashboard.totalTeams': 'Общо екипи',
    'dashboard.availableVehicles': 'Налични автомобили',
    'dashboard.employeesOnDuty': 'Служители на дежурство',
    
    // Status
    'status.free': 'Свободен',
    'status.busy': 'Зает', 
    'status.standby': 'В очакване',
    'status.available': 'Наличен',
    'status.inUse': 'В употреба',
    'status.maintenance': 'Поддръжка',
    'status.reported': 'Докладван',
    'status.responding': 'Реагиране',
    'status.onScene': 'На място',
    'status.resolved': 'Разрешен',
    
    // Incidents
    'incident.type.fire': 'Пожар',
    'incident.type.accident': 'Катастрофа',
    'incident.type.rescue': 'Спасяване',
    'incident.type.other': 'Друго',
    'incident.severity.low': 'Нисък',
    'incident.severity.medium': 'Среден',
    'incident.severity.high': 'Висок',
    'incident.severity.critical': 'Критичен',
    
    // Forms
    'form.search': 'Търсене...',
    'form.filter': 'Филтър',
    'form.all': 'Всички',
    'form.reportIncident': 'Докладвай произшествие',
    
    // Common
    'common.loading': 'Зареждане...',
    'common.noData': 'Няма данни',
    'common.location': 'Местоположение',
    'common.time': 'Време',
    'common.team': 'Екип',
    'common.vehicle': 'Автомобил',
    'common.details': 'Детайли'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};