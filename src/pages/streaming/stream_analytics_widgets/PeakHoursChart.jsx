import React from 'react';

const PeakHoursChart = () => {
  const data = [
    { time: '00:00', streams: 1000, viewers: 20000 },
    { time: '03:00', streams: 800, viewers: 15000 },
    { time: '06:00', streams: 1200, viewers: 25000 },
    { time: '09:00', streams: 2000, viewers: 40000 },
    { time: '12:00', streams: 3000, viewers: 55000 },
    { time: '15:00', streams: 3500, viewers: 60000 },
    { time: '18:00', streams: 4000, viewers: 65000 },
    { time: '21:00', streams: 3800, viewers: 62000 },
    { time: '00:00', streams: 1000, viewers: 20000 }
  ];

  const maxStreams = Math.max(...data.map(d => d.streams));
  const maxViewers = Math.max(...data.map(d => d.viewers));
  const streamsScale = 200 / maxStreams;
  const viewersScale = 200 / maxViewers;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Peak Hours</h3>
      
      {/* Chart */}
      <div className="relative h-60 mb-4">
        <svg width="100%" height="200" className="overflow-visible">
          {/* Y-axis labels - Left (Streams) */}
          {[6000, 5000, 4000, 3000, 2000, 1000].map((value, index) => (
            <g key={value}>
              <line x1="40" y1={index * 40} x2="100%" y2={index * 40} stroke="#f3f4f6" />
            </g>
          ))}
          
          {/* Lines */}
          {data.map((item, index) => {
            const x = 60 + (index * 80);
            const streamsY = 200 - (item.streams * streamsScale);
            const viewersY = 200 - (item.viewers * viewersScale);
            
            if (index === 0) return null;
            
            const prevItem = data[index - 1];
            const prevX = 60 + ((index - 1) * 80);
            const prevStreamsY = 200 - (prevItem.streams * streamsScale);
            const prevViewersY = 200 - (prevItem.viewers * viewersScale);
            
            return (
              <g key={item.time}>
                {/* Streams line (orange) */}
                <line
                  x1={prevX}
                  y1={prevStreamsY}
                  x2={x}
                  y2={streamsY}
                  stroke="#f97316"
                  strokeWidth="2"
                />
                {/* Viewers line (green) */}
                <line
                  x1={prevX}
                  y1={prevViewersY}
                  x2={x}
                  y2={viewersY}
                  stroke="#10b981"
                  strokeWidth="2"
                />
              </g>
            );
          })}
          
        </svg>
        
        {/* Y-axis labels - Left (Streams) */}
        <div className="absolute left-0 top-0 h-full">
          {[6000, 5000, 4000, 3000, 2000, 1000].map((value, index) => (
            <div key={value} className="absolute text-xs text-gray-500" style={{ top: `${index * 40}px`, right: '5px' }}>
              {value.toLocaleString()}
            </div>
          ))}
        </div>
        
        {/* Y-axis labels - Right (Viewers) */}
        <div className="absolute right-0 top-0 h-full">
          {[70000, 60000, 50000, 40000, 30000, 20000].map((value, index) => (
            <div key={value} className="absolute text-xs text-gray-500" style={{ top: `${index * 40}px`, left: '5px' }}>
              {value.toLocaleString()}
            </div>
          ))}
        </div>
        
        {/* Time labels */}
        <div className="absolute bottom-0 left-0 w-full">
          {data.slice(0, -1).map((item, index) => {
            const x = 60 + (index * 80);
            return (
              <div key={item.time} className="absolute text-xs text-gray-600 text-center" style={{ left: `${x - 15}px`, bottom: '-20px' }}>
                {item.time}
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

export default PeakHoursChart;
