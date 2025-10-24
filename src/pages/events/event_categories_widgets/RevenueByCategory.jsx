import React from 'react';

const RevenueByCategory = () => {
  const categories = [
    { rank: 1, name: 'Music', revenue: '$534,876', color: 'bg-green-500' },
    { rank: 2, name: 'Sports', revenue: '$134,876', color: 'bg-orange-500' },
    { rank: 3, name: 'Business', revenue: '$114,876', color: 'bg-blue-500' },
    { rank: 4, name: 'Entertainment', revenue: '$114,876', color: 'bg-yellow-500' },
    { rank: 5, name: 'Food & Beverage', revenue: '$114,876', color: 'bg-red-500' },
    { rank: 6, name: 'Social & Charity', revenue: '$114,876', color: 'bg-yellow-400' },
    { rank: 7, name: 'Education', revenue: '$114,876', color: 'bg-green-400' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue By Category</h3>
      
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center text-white font-bold text-sm`}>
                #{category.rank}
              </div>
              <span className="text-sm font-medium text-gray-900">{category.name}</span>
            </div>
            <span className="text-sm font-bold text-gray-900">{category.revenue}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueByCategory;








