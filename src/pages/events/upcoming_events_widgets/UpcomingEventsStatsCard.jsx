import React from 'react';

const UpcomingEventsStatsCard = ({ title, value, subtitle, change }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-orange-500 text-xl flex-shrink-0">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-gray-600 font-medium text-sm mb-1">{title}</h2>
            <h3 className="text-3xl font-bold text-gray-900 leading-tight">{value}</h3>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {change && (
          <span className="text-xs px-2 py-1 rounded-full flex-shrink-0 bg-green-100 text-green-800">
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

export default UpcomingEventsStatsCard;






