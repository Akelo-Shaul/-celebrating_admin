import React from 'react';

const CategoryChip = ({ icon, label, isActive }) => {
  return (
    <button
      className={`flex items-center space-x-2 px-4 py-2 rounded-md w-full ${
        isActive ? 'bg-yellow-300 text-black' : 'bg-gray-100 text-gray-700'
      } hover:bg-opacity-90 transition-colors duration-200 cursor-pointer`}
    >
      <span className="flex items-center justify-center w-6 h-6 bg-white bg-opacity-50 rounded">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 9a1 1 0 011-1h6a1 1 0 110 2H9a1 1 0 01-1-1z" />
        </svg>
      </span>
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default CategoryChip;