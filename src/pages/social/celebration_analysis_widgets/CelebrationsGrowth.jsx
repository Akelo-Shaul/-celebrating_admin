import React from 'react';

const CelebrationsGrowth = () => {
  // Sample data for the line chart
  const data = [
    { month: 'Jan', value: 1700 },
    { month: 'Feb', value: 1500 },
    { month: 'Mar', value: 4900 },
    { month: 'Apr', value: 4900 },
    { month: 'May', value: 4200 },
    { month: 'Jun', value: 5500 },
    { month: 'Jul', value: 6000 },
    { month: 'Aug', value: 6000 }
  ];

  const maxValue = 6000;
  const minValue = 1000;
  const chartHeight = 200;
  const chartWidth = 300;

  // Calculate SVG path for the line
  const getPath = () => {
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * chartWidth;
      const y = chartHeight - ((point.value - minValue) / (maxValue - minValue)) * chartHeight;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Celebrations Growth</h2>
      </div>
      
      <div className="relative">
        <svg width={chartWidth} height={chartHeight} className="w-full h-full">
          {/* Grid lines */}
          {[1000, 2000, 3000, 4000, 5000, 6000].map((value, index) => {
            const y = chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
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
                  ${value.toLocaleString()}
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
          
          {/* Data line */}
          <path
            d={getPath()}
            stroke="#f97316"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * chartWidth;
            const y = chartHeight - ((point.value - minValue) / (maxValue - minValue)) * chartHeight;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={4}
                fill="#f97316"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default CelebrationsGrowth;

