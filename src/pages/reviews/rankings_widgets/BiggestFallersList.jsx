import React from 'react';

const BiggestFallersList = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Biggest Fallers (30 Days)</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">@Shaul</div>
            <div className="text-xs text-gray-500">Shaul</div>
          </div>
          <div className="text-sm text-gray-900">
            <div>#8 → #5</div>
            <div className="text-xs text-red-600">-3 Positions</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">@Shaul</div>
            <div className="text-xs text-gray-500">Shaul</div>
          </div>
          <div className="text-sm text-gray-900">
            <div>#8 → #5</div>
            <div className="text-xs text-red-600">-3 Positions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiggestFallersList;










