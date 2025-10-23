import React from 'react';

const DisputesTypesChart = () => {
  const data = [
    { label: 'Did Not Appear', value: 42, color: '#22c55e' },
    { label: 'Bad Behaviour', value: 20, color: '#fbbf24' },
    { label: 'Overdue', value: 28, color: '#eab308' },
    { label: 'Not Received', value: 10, color: '#f97316' },
    { label: 'Not As Expected', value: 0, color: '#6b7280' }
  ];

  // Calculate SVG path for pie chart
  const radius = 60;
  const centerX = 80;
  const centerY = 80;
  let currentAngle = 0;

  const getArcPath = (value, color) => {
    if (value === 0) return null;
    const angle = (value / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;

    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Disputes Types Distribution</h2>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="relative">
          <svg width={160} height={160} className="transform -rotate-90">
            {/* Pie chart slices */}
            {data.map((item, index) => {
              if (item.value === 0) return null;
              const path = getArcPath(item.value, item.color);
              return (
                <path
                  key={index}
                  d={path}
                  fill={item.color}
                  stroke="white"
                  strokeWidth={2}
                />
              );
            })}
          </svg>
        </div>
        
        {/* Legend */}
        <div className="ml-6 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-700">{item.label}</span>
              <span className="text-sm font-medium text-gray-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisputesTypesChart;






