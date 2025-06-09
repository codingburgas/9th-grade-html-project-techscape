import React, { useState } from 'react';
import { X, MapPin, Clock, AlertTriangle, Phone, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { teams, vehicles } from '../data/mockData';

interface IncidentReportFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (incident: any) => void;
}

const IncidentReportForm: React.FC<IncidentReportFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    type: 'fire',
    severity: 'medium',
    location: {
      address: '',
      lat: '',
      lng: ''
    },
    description: '',
    reporterName: '',
    reporterPhone: '',
    assignedTeam: '',
    assignedVehicle: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.type) newErrors.type = 'Incident type is required';
    if (!formData.severity) newErrors.severity = 'Severity is required';
    if (!formData.location.address) newErrors['location.address'] = 'Address is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.reporterName) newErrors.reporterName = 'Reporter name is required';
    if (!formData.reporterPhone) newErrors.reporterPhone = 'Phone number is required';

    // Validate coordinates if provided
    if (formData.location.lat && isNaN(Number(formData.location.lat))) {
      newErrors['location.lat'] = 'Invalid latitude';
    }
    if (formData.location.lng && isNaN(Number(formData.location.lng))) {
      newErrors['location.lng'] = 'Invalid longitude';
    }

    // Validate phone number format
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
    if (formData.reporterPhone && !phoneRegex.test(formData.reporterPhone)) {
      newErrors.reporterPhone = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newIncident = {
      id: Date.now().toString(),
      type: formData.type,
      severity: formData.severity,
      location: {
        address: formData.location.address,
        lat: formData.location.lat ? Number(formData.location.lat) : 42.6977 + (Math.random() - 0.5) * 0.1,
        lng: formData.location.lng ? Number(formData.location.lng) : 23.3219 + (Math.random() - 0.5) * 0.1
      },
      description: formData.description,
      reportedAt: new Date(),
      status: 'reported',
      assignedTeams: formData.assignedTeam ? [formData.assignedTeam] : [],
      assignedVehicles: formData.assignedVehicle ? [formData.assignedVehicle] : [],
      reporter: {
        name: formData.reporterName,
        phone: formData.reporterPhone
      }
    };

    onSubmit(newIncident);
    
    // Reset form
    setFormData({
      type: 'fire',
      severity: 'medium',
      location: { address: '', lat: '', lng: '' },
      description: '',
      reporterName: '',
      reporterPhone: '',
      assignedTeam: '',
      assignedVehicle: ''
    });
    setErrors({});
    onClose();
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              lat: position.coords.latitude.toString(),
              lng: position.coords.longitude.toString()
            }
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get current location. Please enter coordinates manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('form.reportIncident')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Reporter Information */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Reporter Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.reporterName}
                  onChange={(e) => handleInputChange('reporterName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.reporterName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.reporterName && (
                  <p className="text-red-500 text-sm mt-1">{errors.reporterName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.reporterPhone}
                  onChange={(e) => handleInputChange('reporterPhone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.reporterPhone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="+359 888 123 456"
                />
                {errors.reporterPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.reporterPhone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Incident Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Incident Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="fire">{t('incident.type.fire')}</option>
                <option value="accident">{t('incident.type.accident')}</option>
                <option value="rescue">{t('incident.type.rescue')}</option>
                <option value="other">{t('incident.type.other')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Severity *
              </label>
              <select
                value={formData.severity}
                onChange={(e) => handleInputChange('severity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="low">{t('incident.severity.low')}</option>
                <option value="medium">{t('incident.severity.medium')}</option>
                <option value="high">{t('incident.severity.high')}</option>
                <option value="critical">{t('incident.severity.critical')}</option>
              </select>
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Location Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  value={formData.location.address}
                  onChange={(e) => handleInputChange('location.address', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors['location.address'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Enter the incident address"
                />
                {errors['location.address'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['location.address']}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={formData.location.lat}
                    onChange={(e) => handleInputChange('location.lat', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors['location.lat'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="42.6977"
                  />
                  {errors['location.lat'] && (
                    <p className="text-red-500 text-sm mt-1">{errors['location.lat']}</p>
                  )}
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={formData.location.lng}
                    onChange={(e) => handleInputChange('location.lng', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors['location.lng'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="23.3219"
                  />
                  {errors['location.lng'] && (
                    <p className="text-red-500 text-sm mt-1">{errors['location.lng']}</p>
                  )}
                </div>
                <div className="md:col-span-1 flex items-end">
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Get Current Location
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Provide detailed description of the incident..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Assignment (Optional) */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Assignment (Optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assign Team
                </label>
                <select
                  value={formData.assignedTeam}
                  onChange={(e) => handleInputChange('assignedTeam', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select a team...</option>
                  {teams.filter(team => team.status === 'free').map(team => (
                    <option key={team.id} value={team.id}>
                      {team.name} ({team.shift} shift)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assign Vehicle
                </label>
                <select
                  value={formData.assignedVehicle}
                  onChange={(e) => handleInputChange('assignedVehicle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select a vehicle...</option>
                  {vehicles.filter(vehicle => vehicle.status === 'available').map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name} ({vehicle.plateNumber})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Emergency Notice */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-red-800 dark:text-red-200">
                  Emergency Notice
                </h4>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  For immediate life-threatening emergencies, call <strong>112</strong> directly. 
                  This form is for reporting incidents that require fire department response but are not immediate emergencies.
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Submit Report</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentReportForm;