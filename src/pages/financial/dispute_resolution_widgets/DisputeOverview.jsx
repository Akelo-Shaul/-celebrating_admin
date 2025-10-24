import React from 'react';

const DisputeOverview = () => {
  const data = [
    { month: 'Jan', pending: 1.0, resolved: 3.8 },
    { month: 'Feb', pending: 1.5, resolved: 3.2 },
    { month: 'Mar', pending: 2.0, resolved: 4.5 },
    { month: 'Apr', pending: 2.5, resolved: 4.0 },
    { month: 'May', pending: 3.0, resolved: 4.8 },
    { month: 'Jun', pending: 3.5, resolved: 5.2 },
    { month: 'Jul', pending: 1.5, resolved: 5.5 },
    { month: 'Aug', pending: 2.0, resolved: 5.0 }
  ];

  const maxValue = 6.0;
  const chartHeight = 200;
  const chartWidth = 400;

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Dispute Overview</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-sm text-gray-600">Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Resolved</span>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <svg width={chartWidth} height={chartHeight} className="w-full h-full">
          {/* Grid lines */}
          {[1, 2, 3, 4, 5, 6].map((value) => {
            const y = chartHeight - ((value / maxValue) * chartHeight);
            return (
              <g key={value}>
                <line
                  x1={0}
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke="#f3f4f6"
                  strokeWidth={1}
                />
                <text
                  x={-10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-xs fill-gray-500"
                >
                  {value}.0
                </text>
              </g>
            );
          })}
          
          {/* Month labels */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * chartWidth;
            return (
              <text
                key={point.month}
                x={x}
                y={chartHeight + 20}
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                {point.month}
              </text>
            );
          })}
          
          {/* Bars for Pending */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * chartWidth;
            const barWidth = chartWidth / (data.length * 2.5);
            const height = (point.pending / maxValue) * chartHeight;
            const y = chartHeight - height;
            
            return (
              <rect
                key={`pending-${index}`}
                x={x - barWidth / 2}
                y={y}
                width={barWidth}
                height={height}
                fill="#f97316"
              />
            );
          })}
          
          {/* Bars for Resolved */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * chartWidth;
            const barWidth = chartWidth / (data.length * 2.5);
            const height = (point.resolved / maxValue) * chartHeight;
            const y = chartHeight - height;
            
            return (
              <rect
                key={`resolved-${index}`}
                x={x + barWidth / 2}
                y={y}
                width={barWidth}
                height={height}
                fill="#22c55e"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default DisputeOverview;







