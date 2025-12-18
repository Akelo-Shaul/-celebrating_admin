import React from 'react';

const CategoryButton = ({ category, icon, isSelected, onClick }) => {
  return (
    <button
      onClick={() => onClick(category)}
      className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-colors text-sm md:text-base
        ${isSelected
          ? 'bg-orange-400 text-white'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
    >
      <span className="text-base md:text-xl">{icon}</span>
      <span className="whitespace-nowrap">{category}</span>
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
    <div className="flex flex-wrap gap-2 md:gap-3">
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