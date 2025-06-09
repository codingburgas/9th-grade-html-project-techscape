import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { incidents } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Statistics: React.FC = () => {
  const { t } = useLanguage();

  // Incident types distribution
  const incidentTypesData = {
    labels: ['Fire', 'Accident', 'Rescue', 'Other'],
    datasets: [
      {
        label: 'Incidents by Type',
        data: [
          incidents.filter(i => i.type === 'fire').length,
          incidents.filter(i => i.type === 'accident').length,
          incidents.filter(i => i.type === 'rescue').length,
          incidents.filter(i => i.type === 'other').length,
        ],
        backgroundColor: [
          'rgba(220, 38, 38, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderColor: [
          'rgba(220, 38, 38, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(107, 114, 128, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Monthly incidents trend
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Fire Incidents',
        data: [12, 8, 15, 10, 6, 9],
        borderColor: 'rgba(220, 38, 38, 1)',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Other Incidents',
        data: [5, 7, 3, 8, 4, 6],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // Response time statistics
  const responseTimeData = {
    labels: ['< 5 min', '5-10 min', '10-15 min', '15-20 min', '> 20 min'],
    datasets: [
      {
        label: 'Response Times',
        data: [25, 35, 20, 15, 5],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(220, 38, 38, 0.8)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
      },
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t('nav.statistics')}
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">{incidents.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Incidents</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">
              {incidents.filter(i => i.status === 'resolved').length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Resolved</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">
              {incidents.filter(i => i.status !== 'resolved').length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">8.5</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response (min)</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incident Types Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Incidents by Type
          </h3>
          <div style={{ height: '300px' }}>
            <Doughnut data={incidentTypesData} options={doughnutOptions} />
          </div>
        </div>

        {/* Response Time Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Response Time Distribution
          </h3>
          <div style={{ height: '300px' }}>
            <Bar data={responseTimeData} options={chartOptions} />
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Monthly Incidents Trend
          </h3>
          <div style={{ height: '300px' }}>
            <Line data={monthlyData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Additional Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Severity Breakdown
          </h3>
          <div className="space-y-3">
            {['critical', 'high', 'medium', 'low'].map((severity) => {
              const count = incidents.filter(i => i.severity === severity).length;
              const percentage = (count / incidents.length) * 100;
              return (
                <div key={severity} className="flex items-center justify-between">
                  <span className="capitalize text-gray-700 dark:text-gray-300">{severity}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          severity === 'critical' ? 'bg-red-600' :
                          severity === 'high' ? 'bg-red-500' :
                          severity === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Success Rate</span>
              <span className="text-green-600 font-semibold">95.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Avg Resolution Time</span>
              <span className="text-blue-600 font-semibold">45 min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Team Efficiency</span>
              <span className="text-orange-600 font-semibold">88.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Equipment Uptime</span>
              <span className="text-purple-600 font-semibold">92.1%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;