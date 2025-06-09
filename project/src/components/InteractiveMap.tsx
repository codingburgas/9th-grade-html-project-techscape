import React, { useEffect, useRef } from 'react';
import { MapPin, Truck, Users, AlertTriangle, Navigation, Zap } from 'lucide-react';
import { incidents, vehicles, fireCenter } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

declare global {
  interface Window {
    L: any;
  }
}

const InteractiveMap: React.FC = () => {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = window.L.map(mapRef.current).setView([42.6977, 23.3219], 12);

    // Add tile layer
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Fire center marker
    const fireCenterIcon = window.L.divIcon({
      html: `<div class="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full shadow-lg border-2 border-white animate-pulse-gentle">
               <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
               </svg>
             </div>`,
      className: 'leaflet-marker-icon',
      iconSize: [48, 48],
      iconAnchor: [24, 24]
    });

    window.L.marker([fireCenter.location.lat, fireCenter.location.lng], { icon: fireCenterIcon })
      .addTo(map)
      .bindPopup(`
        <div class="p-3 min-w-[200px]">
          <h3 class="font-bold text-lg text-gray-900 mb-2">${fireCenter.name}</h3>
          <p class="text-sm text-gray-600 mb-2">${fireCenter.address}</p>
          <div class="flex items-center text-xs text-red-600 font-medium">
            <div class="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            Fire Station Headquarters
          </div>
        </div>
      `);

    // Vehicle markers
    vehicles.forEach(vehicle => {
      const isAvailable = vehicle.status === 'available';
      const isInUse = vehicle.status === 'in_use';
      const isMaintenance = vehicle.status === 'maintenance';
      
      const statusColor = isAvailable ? 'green' : isInUse ? 'red' : 'yellow';
      const statusText = isAvailable ? 'Available' : isInUse ? 'In Use' : 'Maintenance';
      
      const vehicleIcon = window.L.divIcon({
        html: `<div class="flex items-center justify-center w-10 h-10 bg-${statusColor}-600 text-white rounded-full shadow-lg border-2 border-white ${isInUse ? 'animate-pulse' : ''}">
                 <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M5 11l1.5-4.5h11L19 11v8h-2c0-1.1-.9-2-2-2s-2 .9-2 2H9c0-1.1-.9-2-2-2s-2 .9-2 2H3v-8z"/>
                 </svg>
               </div>`,
        className: 'leaflet-marker-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      window.L.marker([vehicle.location.lat, vehicle.location.lng], { icon: vehicleIcon })
        .addTo(map)
        .bindPopup(`
          <div class="p-3 min-w-[200px]">
            <h3 class="font-bold text-gray-900 mb-1">${vehicle.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${vehicle.plateNumber}</p>
            <div class="flex items-center mb-2">
              <span class="text-xs px-2 py-1 rounded-full font-medium ${
                isAvailable ? 'bg-green-100 text-green-800' :
                isInUse ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
              }">${statusText}</span>
            </div>
            <p class="text-xs text-gray-500">${vehicle.location.address}</p>
          </div>
        `);
    });

    // Incident markers
    incidents.forEach(incident => {
      const isActive = incident.status !== 'resolved';
      const severityColor = 
        incident.severity === 'critical' ? 'red' :
        incident.severity === 'high' ? 'orange' :
        incident.severity === 'medium' ? 'yellow' : 'blue';

      const incidentIcon = window.L.divIcon({
        html: `<div class="flex items-center justify-center w-10 h-10 bg-${severityColor}-600 text-white rounded-full shadow-lg border-2 border-white ${isActive ? 'animate-pulse' : 'opacity-70'}">
                 <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                 </svg>
               </div>`,
        className: 'leaflet-marker-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      window.L.marker([incident.location.lat, incident.location.lng], { icon: incidentIcon })
        .addTo(map)
        .bindPopup(`
          <div class="p-3 min-w-[200px]">
            <h3 class="font-bold text-gray-900 mb-1">${incident.type.toUpperCase()} #${incident.id}</h3>
            <p class="text-sm text-gray-700 mb-2">${incident.description}</p>
            <p class="text-xs text-gray-600 mb-2">${incident.location.address}</p>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs px-2 py-1 rounded-full font-medium ${
                incident.severity === 'critical' ? 'bg-red-100 text-red-800' :
                incident.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }">${incident.severity}</span>
              <span class="text-xs px-2 py-1 rounded-full font-medium ${
                incident.status === 'resolved' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }">${incident.status}</span>
            </div>
            <p class="text-xs text-gray-500">
              ${incident.reportedAt.toLocaleString()}
            </p>
          </div>
        `);
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center animate-slide-in-left">
          <Navigation className="h-7 w-7 mr-3 text-red-600 animate-bounce-gentle" />
          {t('nav.map')}
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600 animate-slide-in-right">
          <Zap className="h-4 w-4 text-green-500 animate-pulse" />
          <span>Live Updates</span>
        </div>
      </div>

      {/* Enhanced Map Legend */}
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 animate-slide-in-up">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-blue-600" />
          Map Legend
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-300">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center shadow-md animate-pulse-gentle">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Fire Station</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-300">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center shadow-md">
              <Truck className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Available Vehicle</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-300">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center shadow-md animate-pulse">
              <Truck className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Deployed Vehicle</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-300">
            <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center shadow-md animate-pulse">
              <AlertTriangle className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Active Incident</span>
          </div>
        </div>
        
        {/* Additional Legend Info */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Incident Severity</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Critical</span>
            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">High</span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Medium</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Low</span>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 animate-slide-in-up" style={{animationDelay: '200ms'}}>
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              Live Emergency Map
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Real-time</span>
            </div>
          </div>
        </div>
        <div 
          ref={mapRef} 
          style={{ height: '600px', width: '100%' }}
          className="leaflet-map-container"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-slide-in-up" style={{animationDelay: '300ms'}}>
          <div className="p-2 bg-red-100 rounded-lg mx-auto w-fit mb-3 hover:bg-red-200 transition-colors duration-300">
            <MapPin className="h-8 w-8 text-red-600 animate-bounce-gentle" />
          </div>
          <p className="text-2xl font-bold text-gray-900 animate-number-count">1</p>
          <p className="text-sm text-gray-600">Fire Stations</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-slide-in-up" style={{animationDelay: '400ms'}}>
          <div className="p-2 bg-green-100 rounded-lg mx-auto w-fit mb-3 hover:bg-green-200 transition-colors duration-300">
            <Truck className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 animate-number-count">
            {vehicles.filter(v => v.status === 'available').length}
          </p>
          <p className="text-sm text-gray-600">Available Vehicles</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-slide-in-up" style={{animationDelay: '500ms'}}>
          <div className="p-2 bg-orange-100 rounded-lg mx-auto w-fit mb-3 hover:bg-orange-200 transition-colors duration-300">
            <AlertTriangle className="h-8 w-8 text-orange-600 animate-pulse-gentle" />
          </div>
          <p className="text-2xl font-bold text-gray-900 animate-number-count">
            {incidents.filter(i => i.status !== 'resolved').length}
          </p>
          <p className="text-sm text-gray-600">Active Incidents</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-slide-in-up" style={{animationDelay: '600ms'}}>
          <div className="p-2 bg-blue-100 rounded-lg mx-auto w-fit mb-3 hover:bg-blue-200 transition-colors duration-300">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 animate-number-count">24/7</p>
          <p className="text-sm text-gray-600">Emergency Response</p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;