import React from 'react';

const RankingStatsCard = ({ title, value, details, growthIndicator, additionalInfo }) => {
  const getGrowthColor = (indicator) => {
    if (!indicator) return '';
    if (indicator.includes('+') || indicator.includes('growth') || indicator.includes('spike')) {
      return 'bg-green-100 text-green-800';
    }
    if (indicator.includes('-')) {
      return 'bg-yellow-100 text-yellow-800';
    }
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 h-full">
      <div className="flex items-center space-x-3">
        <div className="text-orange-500 text-xl flex-shrink-0">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-gray-600 font-medium text-sm mb-1">{title}</h2>
          <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{value}</h3>
          {details && (
            <p className="text-sm text-gray-500 mb-1">{details}</p>
          )}
          {additionalInfo && (
            <p className="text-xs text-gray-400 mb-2">{additionalInfo}</p>
          )}
          {growthIndicator && (
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getGrowthColor(growthIndicator)}`}>
              {growthIndicator}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RankingStatsCard;










