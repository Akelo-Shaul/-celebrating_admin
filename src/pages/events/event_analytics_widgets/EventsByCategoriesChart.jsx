import React from 'react';

const EventsByCategoriesChart = () => {
  const data = [
    { label: 'Music', value: 42, color: '#10b981' },
    { label: 'Launch', value: 10, color: '#fb923c' },
    { label: 'Business', value: 28, color: '#eab308' },
    { label: 'Food', value: 12, color: '#f97316' },
    { label: 'Entertainment', value: 8, color: '#ef4444' }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Events By Categories</h3>
      
      {/* Pie Chart */}
      <div className="flex justify-center mb-6">
        <svg width="200" height="200" className="transform -rotate-90">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="40" />
          {data.map((item, index) => {
            const percentage = item.value;
            const angle = (percentage / total) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            
            const startAngleRad = (startAngle * Math.PI) / 180;
            const endAngleRad = (endAngle * Math.PI) / 180;
            
            const x1 = 100 + 80 * Math.cos(startAngleRad);
            const y1 = 100 + 80 * Math.sin(startAngleRad);
            const x2 = 100 + 80 * Math.cos(endAngleRad);
            const y2 = 100 + 80 * Math.sin(endAngleRad);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M 100 100`,
              `L ${x1} ${y1}`,
              `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            currentAngle += angle;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsByCategoriesChart;






