import React from 'react';

const CategoryDetailsTable = () => {
  const categories = [
    {
      id: 1,
      name: 'Music',
      icon: '♪',
      description: 'Concerts, festivals and live music performance ...',
      totalEvents: 312,
      activeEvents: 24,
      totalRevenue: '$114,876',
      avgTicketPrice: '$43',
      growth: '+20%'
    },
    {
      id: 2,
      name: 'Business',
      icon: '🏢',
      description: 'Conferences, seminars and networking events ...',
      totalEvents: 123,
      activeEvents: 13,
      totalRevenue: '$114,876',
      avgTicketPrice: '$43',
      growth: '+20%'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Table Header */}
      <div className="bg-gray-700 px-6 py-4 rounded-t-lg">
        <div className="grid grid-cols-6 gap-4 text-white text-sm font-medium">
          <div>Category</div>
          <div>Total Events</div>
          <div>Active Events</div>
          <div>Total Revenue</div>
          <div>Avg Ticket Price</div>
          <div>Growth</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {categories.map((category) => (
          <div key={category.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="grid grid-cols-6 gap-4 items-center">
              {/* Category */}
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center text-white text-sm">
                  {category.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{category.name}</div>
                  <div className="text-xs text-gray-500">{category.description}</div>
                </div>
              </div>

              {/* Total Events */}
              <div className="text-sm text-gray-900">{category.totalEvents}</div>

              {/* Active Events */}
              <div className="text-sm text-gray-900">{category.activeEvents}</div>

              {/* Total Revenue */}
              <div className="text-sm font-bold text-gray-900">{category.totalRevenue}</div>

              {/* Avg Ticket Price */}
              <div className="text-sm text-gray-900">{category.avgTicketPrice}</div>

              {/* Growth */}
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-sm font-bold text-green-600">{category.growth}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetailsTable;








