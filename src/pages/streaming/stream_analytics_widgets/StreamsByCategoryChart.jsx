import React from 'react';

const StreamsByCategoryChart = () => {
  const data = [
    { month: 'Jan', streams: 2000, viewers: 4500 },
    { month: 'Feb', streams: 2500, viewers: 5000 },
    { month: 'Mar', streams: 3000, viewers: 5500 },
    { month: 'Apr', streams: 2800, viewers: 5200 },
    { month: 'May', streams: 3200, viewers: 5800 },
    { month: 'Jun', streams: 3500, viewers: 6000 },
    { month: 'Jul', streams: 3800, viewers: 6200 },
    { month: 'Aug', streams: 4000, viewers: 6500 }
  ];

  const maxValue = Math.max(...data.map(d => Math.max(d.streams, d.viewers)));
  const scale = 200 / maxValue; // Scale for 200px height

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Streams by Category</h3>
      
      {/* Chart */}
      <div className="relative h-60 mb-4">
        <svg width="100%" height="200" className="overflow-visible">
          {/* Y-axis labels */}
          {[6000, 5000, 4000, 3000, 2000, 1000].map((value, index) => (
            <g key={value}>
              <line x1="40" y1={index * 40} x2="100%" y2={index * 40} stroke="#f3f4f6" />
            </g>
          ))}
          
          {/* Bars */}
          {data.map((item, index) => {
            const x = 60 + (index * 60);
            const streamsHeight = item.streams * scale;
            const viewersHeight = item.viewers * scale;
            
            return (
              <g key={item.month}>
                {/* Streams bar (orange) */}
                <rect
                  x={x - 15}
                  y={200 - streamsHeight}
                  width="12"
                  height={streamsHeight}
                  fill="#f97316"
                  rx="2"
                />
                {/* Viewers bar (green) */}
                <rect
                  x={x + 3}
                  y={200 - viewersHeight}
                  width="12"
                  height={viewersHeight}
                  fill="#10b981"
                  rx="2"
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
          <span className="text-sm text-gray-600">Viewers</span>
        </div>
      </div>
    </div>
  );
};

export default StreamsByCategoryChart;
