import React from 'react';

const CategoryDistribution = () => {
  const categories = [
    { name: 'Music', color: 'bg-green-500', events: 340, percentage: 23.6 },
    { name: 'Art', color: 'bg-orange-500', events: 340, percentage: 23.6 },
    { name: 'Entertainment', color: 'bg-blue-500', events: 340, percentage: 23.6 },
    { name: 'Sports', color: 'bg-yellow-500', events: 340, percentage: 23.6 },
    { name: 'Educational', color: 'bg-red-500', events: 340, percentage: 23.6 },
    { name: 'Food & Beverage', color: 'bg-yellow-400', events: 340, percentage: 23.6 },
    { name: 'Fashion', color: 'bg-green-400', events: 340, percentage: 23.6 }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
      
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
              <span className="text-sm font-medium text-gray-900">{category.name}</span>
            </div>
            
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-400 h-2 rounded-full" 
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 w-20 text-right">
                {category.events} Events
              </div>
              <div className="text-sm text-gray-600 w-12 text-right">
                {category.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDistribution;








