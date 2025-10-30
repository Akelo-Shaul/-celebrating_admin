import React from 'react';

const AdminPerformance = () => {
  const admins = [
    {
      name: "Braum Hallabery",
      avgTime: "3.2 days",
      satisfaction: "98%",
      cases: "35 Cases"
    },
    {
      name: "Braum Hallabery",
      avgTime: "3.2 days",
      satisfaction: "98%",
      cases: "35 Cases"
    },
    {
      name: "Braum Hallabery",
      avgTime: "3.2 days",
      satisfaction: "98%",
      cases: "35 Cases"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Admin Performance</h2>
      </div>
      
      <div className="space-y-4">
        {admins.map((admin, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 h-8 w-8">
                <div className="h-8 w-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {admin.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                <div className="text-xs text-gray-500">
                  Avg Time: {admin.avgTime} • Satisfaction: {admin.satisfaction}
                </div>
              </div>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              {admin.cases}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPerformance;









