import React from 'react';
import { AlertTriangle, Users, Truck, UserCheck, Clock, MapPin, Phone, TrendingUp, Shield, Activity } from 'lucide-react';
import { incidents, teams, vehicles, employees } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  const activeIncidents = incidents.filter(i => i.status !== 'resolved').length;
  const availableVehicles = vehicles.filter(v => v.status === 'available').length;
  const employeesOnDuty = employees.length;
  const totalTeams = teams.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'free': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-red-600 bg-red-100';
      case 'standby': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-800 bg-red-200';
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-orange-600 rounded-2xl shadow-xl p-8 text-white transform hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="animate-slide-in-left">
            <h2 className="text-3xl font-bold mb-2 flex items-center">
              <Activity className="h-8 w-8 mr-3 animate-pulse" />
              Emergency Response Center
            </h2>
            <p className="text-red-100 text-lg mb-4">
              Real-time monitoring and coordination system
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 animate-bounce-gentle">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-slow"></div>
                <span className="text-sm">System Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 animate-pulse" />
                <span className="text-sm">24/7 Protection</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block animate-slide-in-right">
            <div className="text-right">
              <p className="text-5xl font-bold animate-number-count">112</p>
              <p className="text-red-100">Emergency Hotline</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-slide-in-up" style={{animationDelay: '100ms'}}>
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-xl transition-all duration-300 hover:bg-red-200 hover:scale-110">
              <AlertTriangle className="h-8 w-8 text-red-600 animate-pulse-gentle" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {t('dashboard.activeIncidents')}
              </p>
              <p className="text-3xl font-bold text-gray-900 animate-number-count">{activeIncidents}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-red-500 mr-1 animate-bounce-gentle" />
                <span className="text-xs text-red-600">Active now</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-slide-in-up" style={{animationDelay: '200ms'}}>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-xl transition-all duration-300 hover:bg-blue-200 hover:scale-110">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {t('dashboard.totalTeams')}
              </p>
              <p className="text-3xl font-bold text-gray-900 animate-number-count">{totalTeams}</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs text-green-600">All operational</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-slide-in-up" style={{animationDelay: '300ms'}}>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-xl transition-all duration-300 hover:bg-green-200 hover:scale-110">
              <Truck className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {t('dashboard.availableVehicles')}
              </p>
              <p className="text-3xl font-bold text-gray-900 animate-number-count">{availableVehicles}</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs text-green-600">Ready to deploy</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-slide-in-up" style={{animationDelay: '400ms'}}>
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-xl transition-all duration-300 hover:bg-orange-200 hover:scale-110">
              <UserCheck className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {t('dashboard.employeesOnDuty')}
              </p>
              <p className="text-3xl font-bold text-gray-900 animate-number-count">{employeesOnDuty}</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs text-orange-600">On duty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Incidents */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 animate-slide-in-left">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-600 animate-pulse-gentle" />
              Active Incidents
            </h3>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto custom-scrollbar">
            <div className="space-y-4">
              {incidents.filter(i => i.status !== 'resolved').map((incident, index) => (
                <div 
                  key={incident.id} 
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md animate-slide-in-up"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)} animate-pulse-gentle`}>
                        {t(`incident.severity.${incident.severity}`)}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {t(`incident.type.${incident.type}`)}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                      {t(`status.${incident.status}`)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-2 animate-bounce-gentle" />
                    {incident.location.address}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {incident.reportedAt.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Status */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 animate-slide-in-right">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Team Status
            </h3>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto custom-scrollbar">
            <div className="space-y-4">
              {teams.map((team, index) => (
                <div 
                  key={team.id} 
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md animate-slide-in-up"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{team.name}</h4>
                    <p className="text-sm text-gray-600 capitalize">{team.shift} Shift</p>
                    <p className="text-xs text-gray-500">{team.members.length} members</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(team.status)}`}>
                      {t(`status.${team.status}`)}
                    </span>
                    {team.status === 'busy' && (
                      <div className="flex items-center mt-1 justify-end">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></div>
                        <span className="text-xs text-red-600">On call</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] animate-slide-in-up">
        <div className="flex items-center justify-between">
          <div className="animate-slide-in-left">
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <Phone className="h-6 w-6 mr-2 animate-bounce-gentle" />
              Emergency Hotline
            </h3>
            <p className="text-red-100">24/7 Emergency Response Center</p>
            <p className="text-sm text-red-100 mt-1">
              For immediate life-threatening emergencies
            </p>
          </div>
          <div className="text-right animate-slide-in-right">
            <p className="text-4xl font-bold animate-pulse-gentle">112</p>
            <p className="text-sm text-red-100">Emergency</p>
            <div className="flex items-center justify-end mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-xs">Available 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;