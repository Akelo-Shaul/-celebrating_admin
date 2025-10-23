import React from 'react';

const StatsCard = ({ title, value, subtitle, change, period, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center space-x-2 mb-3">
          <div className="text-orange-500 text-xl flex-shrink-0">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h2 className="text-gray-600 font-medium text-sm truncate">{title}</h2>
        </div>
        
        <div className="flex-1 flex flex-col justify-between">
          <div className="mb-3">
            <div className="flex items-baseline space-x-2 mb-2">
              <h3 className="text-3xl font-bold text-gray-900 leading-tight">{value}</h3>
              {subtitle && (
                <span className="text-gray-500 text-sm flex-shrink-0">{subtitle}</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 flex-1 mr-2">{period}</p>
            {change && (
              <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${change.includes('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {change}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;