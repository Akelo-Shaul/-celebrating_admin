import React from 'react';

const CategoryListTable = ({ categories }) => {
  const columns = [
    'Category',
    'Celebrations',
    'Trend',
    'Engagements',
    'Top Contributors',
    'Followers',
    'Average Rating'
  ];

  // Sample data matching the image
  const sampleCategories = categories && categories.length > 0 ? categories : [
    {
      id: 1,
      name: "Music",
      description: "Great rhythms form top artists",
      celebrations: "20,000",
      trend: { direction: "up", value: "20%" },
      engagements: "32,000",
      followers: "32,000",
      rating: "4.5"
    },
    {
      id: 2,
      name: "Travel And Adventure",
      description: "Great rhythms form top artists",
      celebrations: "50,000",
      trend: { direction: "down", value: "20%" },
      engagements: "23,000",
      followers: "23,000",
      rating: "4.3"
    },
    {
      id: 3,
      name: "Paward Chung",
      description: "Great rhythms form top artists",
      celebrations: "10,000",
      trend: { direction: "down", value: "20%" },
      engagements: "23,000",
      followers: "23,000",
      rating: "4.3"
    },
    {
      id: 4,
      name: "Hang Turm",
      description: "Great rhythms form top artists",
      celebrations: "4,000",
      trend: { direction: "up", value: "20%" },
      engagements: "23,000",
      followers: "23,000",
      rating: "4.3"
    },
    {
      id: 5,
      name: "Hankue Hue",
      description: "Great rhythms form top artists",
      celebrations: "3,089",
      trend: { direction: "down", value: "20%" },
      engagements: "23,000",
      followers: "23,000",
      rating: "4.3"
    },
    {
      id: 6,
      name: "Hankue Hue",
      description: "Great rhythms form top artists",
      celebrations: "50,000",
      trend: { direction: "down", value: "20%" },
      engagements: "23,000",
      followers: "23,000",
      rating: "4.3"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Category List</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Shop..."
                className="pl-8 pr-4 py-1.5 border rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
              <svg
                className="w-4 h-4 text-gray-500 absolute left-2.5 top-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-md flex items-center space-x-1 hover:bg-gray-200">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y divide-gray-200">
            {sampleCategories.map((category, index) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    <div className="text-sm text-gray-500">{category.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.celebrations}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-1">
                    {category.trend.direction === 'up' ? (
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
                      </svg>
                    )}
                    <span className={category.trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
                      {category.trend.value}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.engagements}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <div className="h-8 w-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        U
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.followers}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryListTable;






