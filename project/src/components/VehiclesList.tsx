import React, { useState } from 'react';
import { Search, Truck, MapPin, Wrench, Users } from 'lucide-react';
import { vehicles, teams } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

const VehiclesList: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || vehicle.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'in_use': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fire_truck': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'rescue_vehicle': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'support_vehicle': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getAssignedTeam = (teamId?: string) => {
    return teamId ? teams.find(team => team.id === teamId) : null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('nav.vehicles')}
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
            <option value="available">{t('status.available')}</option>
            <option value="in_use">{t('status.inUse')}</option>
            <option value="maintenance">{t('status.maintenance')}</option>
          </select>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVehicles.map((vehicle) => {
          const assignedTeam = getAssignedTeam(vehicle.teamId);
          
          return (
            <div key={vehicle.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                    <Truck className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {vehicle.plateNumber}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vehicle.status)}`}>
                    {t(`status.${vehicle.status === 'in_use' ? 'inUse' : vehicle.status}`)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(vehicle.type)}`}>
                    {vehicle.type.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{vehicle.location.address}</span>
              </div>

              {/* Status Details */}
              <div className="space-y-3">
                {vehicle.status === 'maintenance' && (
                  <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Wrench className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="text-sm text-yellow-800 dark:text-yellow-200">
                      Vehicle under maintenance
                    </span>
                  </div>
                )}

                {assignedTeam && (
                  <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <span className="text-sm text-blue-800 dark:text-blue-200">
                        Assigned to: {assignedTeam.name}
                      </span>
                      <p className="text-xs text-blue-600 dark:text-blue-300">
                        {assignedTeam.shift} shift - {assignedTeam.members.length} members
                      </p>
                    </div>
                  </div>
                )}

                {vehicle.status === 'available' && (
                  <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-green-800 dark:text-green-200">
                      Ready for deployment
                    </span>
                  </div>
                )}
              </div>

              {/* Vehicle Specifications */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Type:</span>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">
                      {vehicle.type.replace('_', ' ')}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Coordinates:</span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {vehicle.location.lat.toFixed(4)}, {vehicle.location.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">{t('common.noData')}</p>
        </div>
      )}
    </div>
  );
};

export default VehiclesList;