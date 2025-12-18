import React from 'react';

const FastestGrowingTable = () => {
  const growthFactors = ["Viral Content", "Major Collab", "Product Launch"];

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Fastest Growing</h3>

      <div className="space-y-3 md:space-y-4">
        {/* Table Header - Hide on mobile */}
        <div className="hidden md:grid grid-cols-4 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div>User</div>
          <div>Growth Rate</div>
          <div>Rank Change</div>
          <div>Growth Factors</div>
        </div>

        {/* Table Row */}
        <div className="flex flex-col md:grid md:grid-cols-4 gap-3 md:gap-4 md:items-center border md:border-0 border-gray-200 rounded-lg p-3 md:p-0">
          {/* User */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div>
              <div className="text-xs md:text-sm font-medium text-gray-900">@Shaul</div>
              <div className="text-xs text-gray-500">Shaul</div>
            </div>
          </div>

          {/* Growth Rate */}
          <div className="flex items-center space-x-2">
            <span className="text-xs md:hidden text-gray-500 uppercase">Growth Rate:</span>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-xs md:text-sm font-bold text-green-600">+20%</span>
            </div>
          </div>

          {/* Rank Change */}
          <div className="flex items-baseline space-x-2">
            <span className="text-xs md:hidden text-gray-500 uppercase">Rank Change:</span>
            <div className="text-xs md:text-sm text-gray-900">
              <div>#8 → #5</div>
              <div className="text-xs text-green-600">+3 Positions</div>
            </div>
          </div>

          {/* Growth Factors */}
          <div>
            <div className="text-xs md:hidden text-gray-500 uppercase mb-1">Growth Factors:</div>
            <div className="flex flex-wrap gap-1">
              {growthFactors.map((factor, index) => (
                <span key={index} className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {factor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastestGrowingTable;










