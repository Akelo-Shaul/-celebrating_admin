import React from 'react';

const RevenueOverviewChart = () => {
  const data = [
    { time: '00:00', revenue: 1000, tickets: 20000 },
    { time: '03:00', revenue: 3000, tickets: 45000 },
    { time: '06:00', revenue: 2000, tickets: 30000 },
    { time: '09:00', revenue: 4000, tickets: 35000 },
    { time: '12:00', revenue: 4500, tickets: 40000 },
    { time: '15:00', revenue: 5200, tickets: 42000 },
    { time: '18:00', revenue: 5800, tickets: 65000 },
    { time: '21:00', revenue: 4800, tickets: 55000 },
    { time: '00:00', revenue: 1000, tickets: 20000 }
  ];

  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const maxTickets = Math.max(...data.map(d => d.tickets));
  const revenueScale = 200 / maxRevenue;
  const ticketsScale = 200 / maxTickets;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
      
      {/* Chart */}
      <div className="relative h-60 mb-4">
        <svg width="100%" height="200" className="overflow-visible">
          {/* Y-axis labels - Left (Revenue) */}
          {[6000, 5000, 4000, 3000, 2000, 1000].map((value, index) => (
            <g key={value}>
              <line x1="40" y1={index * 40} x2="100%" y2={index * 40} stroke="#f3f4f6" />
              <text x="35" y={index * 40 + 5} textAnchor="end" className="text-xs text-gray-500">
                {value.toLocaleString()}
              </text>
            </g>
          ))}
          
          {/* Y-axis labels - Right (Tickets) */}
          {[70000, 60000, 50000, 40000, 30000, 20000].map((value, index) => (
            <text key={value} x="100%" y={index * 40 + 5} textAnchor="start" className="text-xs text-gray-500">
              {value.toLocaleString()}
            </text>
          ))}
          
          {/* Lines */}
          {data.map((item, index) => {
            const x = 60 + (index * 80);
            const revenueY = 200 - (item.revenue * revenueScale);
            const ticketsY = 200 - (item.tickets * ticketsScale);
            
            if (index === 0) return null;
            
            const prevItem = data[index - 1];
            const prevX = 60 + ((index - 1) * 80);
            const prevRevenueY = 200 - (prevItem.revenue * revenueScale);
            const prevTicketsY = 200 - (prevItem.tickets * ticketsScale);
            
            return (
              <g key={item.time}>
                {/* Revenue line (orange) */}
                <line
                  x1={prevX}
                  y1={prevRevenueY}
                  x2={x}
                  y2={revenueY}
                  stroke="#f97316"
                  strokeWidth="2"
                />
                {/* Tickets line (green) */}
                <line
                  x1={prevX}
                  y1={prevTicketsY}
                  x2={x}
                  y2={ticketsY}
                  stroke="#10b981"
                  strokeWidth="2"
                />
              </g>
            );
          })}
          
          {/* Time labels */}
          {data.slice(0, -1).map((item, index) => {
            const x = 60 + (index * 80);
            return (
              <text key={item.time} x={x} y="220" textAnchor="middle" className="text-xs text-gray-600">
                {item.time}
              </text>
            );
          })}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span className="text-sm text-gray-600">Revenue</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600">Tickets Sold</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverviewChart;
