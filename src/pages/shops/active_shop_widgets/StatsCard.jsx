import React from 'react';

const StatsCard = ({ title, value, trend, category, timeframe }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <h2 className="text-gray-600">{title}</h2>
          {category && (
            <select className="bg-gray-100 border border-gray-200 rounded px-2 py-1 text-sm text-gray-600">
              <option value={category}>{category}</option>
            </select>
          )}
        </div>
        {timeframe && (
          <select className="bg-gray-100 border border-gray-200 rounded px-2 py-1 text-sm text-gray-600">
            <option value={timeframe}>{timeframe}</option>
          </select>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <h3 className="text-2xl font-semibold">{value}</h3>
        {trend && (
          <span className={`text-sm ${trend.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
            {trend}
          </span>
        )}
      </div>
      {trend && (
        <p className="text-sm text-gray-500 mt-1">compared to last week</p>
      )}
    </div>
  );
};

export default StatsCard;