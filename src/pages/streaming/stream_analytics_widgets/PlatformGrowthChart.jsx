import React, { useState } from 'react';

const PlatformGrowthChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6m');
  
  const data = [
    { month: 'Jan', streams: 2000, revenue: 3000, viewers: 4500 },
    { month: 'Feb', streams: 2500, revenue: 3500, viewers: 5000 },
    { month: 'Mar', streams: 3000, revenue: 4000, viewers: 5500 },
    { month: 'Apr', streams: 2800, revenue: 3800, viewers: 5200 },
    { month: 'May', streams: 3200, revenue: 4200, viewers: 5800 },
    { month: 'Jun', streams: 3500, revenue: 4500, viewers: 6000 },
    { month: 'Jul', streams: 3800, revenue: 4800, viewers: 6200 },
    { month: 'Aug', streams: 4000, revenue: 5000, viewers: 6500 }
  ];

  const maxValue = Math.max(...data.map(d => Math.max(d.streams, d.revenue, d.viewers)));
  const scale = 200 / maxValue;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Platform Growth (6 Months)</h3>
        <div className="flex space-x-1">
          {['1d', '1w', '1m', '6m', '1Y'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 text-xs rounded ${
                selectedPeriod === period
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      
      {/* Chart */}
      <div className="relative h-60 mb-4">
        <svg width="100%" height="200" className="overflow-visible">
          {/* Y-axis labels */}
          {[6000, 5000, 4000, 3000, 2000, 1000].map((value, index) => (
            <g key={value}>
              <line x1="40" y1={index * 40} x2="100%" y2={index * 40} stroke="#f3f4f6" />
            </g>
          ))}
          
          {/* Lines */}
          {data.map((item, index) => {
            const x = 60 + (index * 60);
            const streamsY = 200 - (item.streams * scale);
            const revenueY = 200 - (item.revenue * scale);
            const viewersY = 200 - (item.viewers * scale);
            
            if (index === 0) return null;
            
            const prevItem = data[index - 1];
            const prevX = 60 + ((index - 1) * 60);
            const prevStreamsY = 200 - (prevItem.streams * scale);
            const prevRevenueY = 200 - (prevItem.revenue * scale);
            const prevViewersY = 200 - (prevItem.viewers * scale);
            
            return (
              <g key={item.month}>
                {/* Streams line (orange) */}
                <line
                  x1={prevX}
                  y1={prevStreamsY}
                  x2={x}
                  y2={streamsY}
                  stroke="#f97316"
                  strokeWidth="2"
                />
                {/* Revenue line (green) */}
                <line
                  x1={prevX}
                  y1={prevRevenueY}
                  x2={x}
                  y2={revenueY}
                  stroke="#10b981"
                  strokeWidth="2"
                />
                {/* Viewers line (gold/yellow) */}
                <line
                  x1={prevX}
                  y1={prevViewersY}
                  x2={x}
                  y2={viewersY}
                  stroke="#eab308"
                  strokeWidth="2"
                />
              </g>
            );
          })}
          
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full">
          {[6000, 5000, 4000, 3000, 2000, 1000].map((value, index) => (
            <div key={value} className="absolute text-xs text-gray-500" style={{ top: `${index * 40}px`, right: '5px' }}>
              {value.toLocaleString()}
            </div>
          ))}
        </div>
        
        {/* Month labels */}
        <div className="absolute bottom-0 left-0 w-full">
          {data.map((item, index) => {
            const x = 60 + (index * 60);
            return (
              <div key={item.month} className="absolute text-xs text-gray-600 text-center" style={{ left: `${x - 15}px`, bottom: '-20px' }}>
                {item.month}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span className="text-sm text-gray-600">Streams</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600">Revenue</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span className="text-sm text-gray-600">Viewers</span>
        </div>
      </div>
    </div>
  );
};

export default PlatformGrowthChart;
