import React from 'react';

const GrowthLeaders = () => {
  const categories = [
    { rank: 1, name: 'Music', growth: '+20%', color: 'bg-green-500' },
    { rank: 2, name: 'Sports', growth: '+20%', color: 'bg-orange-500' },
    { rank: 3, name: 'Business', growth: '+20%', color: 'bg-blue-500' },
    { rank: 4, name: 'Entertainment', growth: '+20%', color: 'bg-yellow-500' },
    { rank: 5, name: 'Food & Beverage', growth: '+20%', color: 'bg-red-500' },
    { rank: 6, name: 'Social & Charity', growth: '+20%', color: 'bg-yellow-400' },
    { rank: 7, name: 'Education', growth: '+20%', color: 'bg-green-400' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Leaders</h3>
      
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center text-white font-bold text-sm`}>
                #{category.rank}
              </div>
              <span className="text-sm font-medium text-gray-900">{category.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-sm font-bold text-green-600">{category.growth}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrowthLeaders;








