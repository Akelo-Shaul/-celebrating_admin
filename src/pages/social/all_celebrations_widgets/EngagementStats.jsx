import React from 'react';

const EngagementStats = () => {
  const engagementData = [
    {
      label: 'Salutes',
      value: '1,209',
      change: '+ 2.54%'
    },
    {
      label: 'Ratings',
      value: '1,209',
      change: '+ 2.54%'
    },
    {
      label: 'Comments',
      value: '1,209',
      change: '+ 2.54%'
    },
    {
      label: 'Recelebrations',
      value: '1,209',
      change: '+ 2.54%'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="text-orange-500 text-xl flex-shrink-0">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h2 className="text-gray-600 font-medium text-sm">Engagement Rates</h2>
        </div>
        <select className="text-xs bg-gray-100 border border-gray-200 rounded px-2 py-1 flex-shrink-0">
          <option>This Week</option>
        </select>
      </div>
      
      {/* Horizontal Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {engagementData.map((stat, index) => (
          <div key={index} className="flex flex-col items-start">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                {stat.change}
              </span>
            </div>
            <span className="text-gray-600 text-sm">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngagementStats;