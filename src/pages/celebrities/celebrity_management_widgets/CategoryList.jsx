import React from 'react';

const CategoryButton = ({ category, icon, isSelected, onClick }) => {
  return (
    <button
      onClick={() => onClick(category)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors
        ${isSelected 
          ? 'bg-orange-400 text-white' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
    >
      <span className="text-xl">{icon}</span>
      <span>{category}</span>
    </button>
  );
};

const CategoryList = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { name: 'Music', icon: '🎵' },
    { name: 'Art', icon: '🎨' },
    { name: 'Production', icon: '🎬' },
    { name: 'Content Creation', icon: '📱' },
    { name: 'FootBall', icon: '⚽' },
    { name: 'Basketball', icon: '🏀' },
    { name: 'Rugby', icon: '🏉' },
    { name: 'Photography', icon: '📸' },
    { name: 'Fashion', icon: '👗' },
    { name: 'Cooking', icon: '🍳' },
    { name: 'Gaming', icon: '🎮' },
    { name: 'Education', icon: '📚' },
    { name: 'Fitness', icon: '💪' },
    { name: 'Dance', icon: '💃' },
    { name: 'Comedy', icon: '🎭' },
    { name: 'Technology', icon: '💻' },
    { name: 'Beauty', icon: '💄' },
    { name: 'Lifestyle', icon: '🌟' },
    { name: 'Travel', icon: '✈️' },
    { name: 'Writing', icon: '✍️' },
    { name: 'Acting', icon: '🎭' },
    { name: 'Martial Arts', icon: '🥋' },
    { name: 'Boxing', icon: '🥊' }
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <CategoryButton
          key={category.name}
          category={category.name}
          icon={category.icon}
          isSelected={selectedCategory === category.name}
          onClick={onCategoryChange}
        />
      ))}
    </div>
  );
};

export default CategoryList;