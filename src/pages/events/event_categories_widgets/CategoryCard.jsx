import React from 'react';

const CategoryCard = ({ category, onEdit, onDelete }) => {
  const getHeaderColor = (index) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-orange-500',
      'bg-red-500',
      'bg-pink-500',
      'bg-purple-500',
      'bg-teal-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className={`${getHeaderColor(category.index)} p-4 text-white`}>
        <div className="flex items-center justify-between mb-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span className="bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full">
            {category.activeEvents} active
          </span>
        </div>
        <h3 className="text-lg font-bold">{category.name}</h3>
        <p className="text-sm opacity-90">{category.description}</p>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Total Events:</span> {category.totalEvents}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Revenue:</span> {category.revenue}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Avg Ticket:</span> {category.avgTicket}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Growth:</span> {category.growth}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-3 border-t">
          <button
            onClick={() => onEdit(category)}
            className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(category)}
            className="flex items-center space-x-1 px-3 py-1.5 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;








