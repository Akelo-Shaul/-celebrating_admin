import React from 'react';

const AverageRatingByCategory = () => {
  const categories = [
    { rank: 1, name: 'Music', rating: '4.5', color: 'bg-green-500' },
    { rank: 2, name: 'Sports', rating: '4', color: 'bg-orange-500' },
    { rank: 3, name: 'Business', rating: '3', color: 'bg-blue-500' },
    { rank: 4, name: 'Entertainment', rating: '3', color: 'bg-yellow-500' },
    { rank: 5, name: 'Food & Beverage', rating: '2.7', color: 'bg-red-500' },
    { rank: 6, name: 'Social & Charity', rating: '2.5', color: 'bg-yellow-400' },
    { rank: 7, name: 'Education', rating: '2', color: 'bg-teal-500' }
  ];

  return (
    <div className="bg-red-800 rounded-lg shadow p-6 h-fit">
      <h3 className="text-lg font-semibold text-white mb-4">Average Rating By Category</h3>
      
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center text-white font-bold text-sm`}>
                #{category.rank}
              </div>
              <span className="text-sm font-medium text-white">{category.name}</span>
            </div>
            <span className="text-sm font-bold text-white">{category.rating}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AverageRatingByCategory;







