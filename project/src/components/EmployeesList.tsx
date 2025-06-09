import React, { useState } from 'react';
import { Search, User, Shield, Users } from 'lucide-react';
import { employees, teams } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

const EmployeesList: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.individualNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.rank.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'free': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'busy': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'standby': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'captain': return 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300';
      case 'lieutenant': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'sergeant': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      case 'firefighter': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getEmployeeTeam = (teamId: string) => {
    return teams.find(team => team.id === teamId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('nav.employees')}
        </h2>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">{t('form.all')} Status</option>
            <option value="free">{t('status.free')}</option>
            <option value="busy">{t('status.busy')}</option>
            <option value="standby">{t('status.standby')}</option>
          </select>
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => {
          const team = getEmployeeTeam(employee.teamId);
          
          return (
            <div key={employee.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {employee.firstName} {employee.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ID: {employee.individualNumber}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(employee.status)}`}>
                  {t(`status.${employee.status}`)}
                </span>
              </div>

              {/* Rank */}
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-4 w-4 text-gray-500" />
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getRankColor(employee.rank)}`}>
                  {employee.rank}
                </span>
              </div>

              {/* Team Assignment */}
              {team && (
                <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
                  <Users className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {team.name}
                    </span>
                    <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                      {team.shift} shift - {t(`status.${team.status}`)}
                    </p>
                  </div>
                </div>
              )}

              {/* Status Details */}
              <div className="space-y-2">
                {employee.status === 'busy' && (
                  <div className="flex items-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm text-red-800 dark:text-red-200">
                      Currently on emergency call
                    </span>
                  </div>
                )}

                {employee.status === 'standby' && (
                  <div className="flex items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-sm text-yellow-800 dark:text-yellow-200">
                      On standby - ready for deployment
                    </span>
                  </div>
                )}

                {employee.status === 'free' && (
                  <div className="flex items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-green-800 dark:text-green-200">
                      Available for assignment
                    </span>
                  </div>
                )}
              </div>

              {/* Contact Information (placeholder) */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Years of Service:</span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {Math.floor(Math.random() * 15) + 1} years
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">{t('common.noData')}</p>
        </div>
      )}
    </div>
  );
};

export default EmployeesList;