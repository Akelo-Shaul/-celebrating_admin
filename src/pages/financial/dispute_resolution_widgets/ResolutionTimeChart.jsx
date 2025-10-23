import React from 'react';

const ResolutionTimeChart = () => {
  const data = [
    { month: 'Jan', days: 2.0 },
    { month: 'Feb', days: 1.8 },
    { month: 'Mar', days: 5.0 },
    { month: 'Apr', days: 4.2 },
    { month: 'May', days: 5.5 },
    { month: 'Jun', days: 6.0 },
    { month: 'Jul', days: 6.0 },
    { month: 'Aug', days: 6.0 }
  ];

  const maxValue = 6.0;
  const chartHeight = 200;
  const chartWidth = 400;

  // Calculate SVG path for the line
  const getPath = () => {
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * chartWidth;
      const y = chartHeight - ((point.days / maxValue) * chartHeight);
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Average Resolution Time</h2>
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
                  {value}
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
          
          {/* Y-axis label */}
          <text
            x={-30}
            y={chartHeight / 2}
            textAnchor="middle"
            className="text-xs fill-gray-500 transform -rotate-90"
          >
            Days
          </text>
          
          {/* Data line */}
          <path
            d={getPath()}
            stroke="#3b82f6"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * chartWidth;
            const y = chartHeight - ((point.days / maxValue) * chartHeight);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={4}
                fill="#3b82f6"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default ResolutionTimeChart;






