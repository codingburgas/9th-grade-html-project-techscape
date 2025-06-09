import React, { useState } from 'react';
import { Search, Filter, Plus, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { incidents } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';
import { Incident } from '../types';
import IncidentReportForm from './IncidentReportForm';

const IncidentsList: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [incidentsList, setIncidentsList] = useState(incidents);

  const filteredIncidents = incidentsList.filter(incident => {
    const matchesSearch = incident.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || incident.type === filterType;
    const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleNewIncident = (newIncident: Incident) => {
    setIncidentsList(prev => [newIncident, ...prev]);
    
    // Show success message
    alert('Incident reported successfully! Emergency services have been notified.');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-800 bg-red-200 dark:bg-red-900 dark:text-red-200';
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      case 'low': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'responding': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      case 'on_scene': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'resolved': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('nav.incidents')}
        </h2>
        <button 
          onClick={() => setIsReportFormOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus className="h-5 w-5" />
          <span>{t('form.reportIncident')}</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={t('form.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">{t('form.all')} Types</option>
            <option value="fire">{t('incident.type.fire')}</option>
            <option value="accident">{t('incident.type.accident')}</option>
            <option value="rescue">{t('incident.type.rescue')}</option>
            <option value="other">{t('incident.type.other')}</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">{t('form.all')} Status</option>
            <option value="reported">{t('status.reported')}</option>
            <option value="responding">{t('status.responding')}</option>
            <option value="on_scene">{t('status.onScene')}</option>
            <option value="resolved">{t('status.resolved')}</option>
          </select>
        </div>
      </div>

      {/* Incidents List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredIncidents.map((incident) => (
          <div key={incident.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t(`incident.type.${incident.type}`)} - #{incident.id}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                      {t(`incident.severity.${incident.severity}`)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                      {t(`status.${incident.status}`)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{incident.location.address}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-2" />
                <span>
                  {incident.reportedAt.toLocaleDateString()} {incident.reportedAt.toLocaleTimeString()}
                </span>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {incident.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Teams: {incident.assignedTeams.length} | Vehicles: {incident.assignedVehicles.length}
              </div>
              {incident.resolvedAt && (
                <div className="text-sm text-green-600 dark:text-green-400">
                  Resolved: {incident.resolvedAt.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredIncidents.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">{t('common.noData')}</p>
        </div>
      )}

      {/* Incident Report Form Modal */}
      <IncidentReportForm
        isOpen={isReportFormOpen}
        onClose={() => setIsReportFormOpen(false)}
        onSubmit={handleNewIncident}
      />
    </div>
  );
};

export default IncidentsList;