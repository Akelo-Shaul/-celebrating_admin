import React from 'react';

const PatternAnalytics = () => {
  const columns = [
    'Top Repeat Disputers',
    'Dispute Number',
    'Common Reason',
    'Problem Categories'
  ];

  const analyticsData = [
    {
      id: 1,
      name: "Marika Haloga",
      disputeNumber: 10,
      commonReason: "Did Not Appear",
      reasonPercentage: "48%",
      problemCategories: "Did Not Appear",
      categoryPercentage: "48%"
    },
    {
      id: 2,
      name: "Marika Haloga",
      disputeNumber: 8,
      commonReason: "Product Not Delivered",
      reasonPercentage: "20%",
      problemCategories: "Product Not Delivered",
      categoryPercentage: "20%"
    },
    {
      id: 3,
      name: "Marika Haloga",
      disputeNumber: 7,
      commonReason: "Canceled On site",
      reasonPercentage: "25%",
      problemCategories: "Canceled On site",
      categoryPercentage: "25%"
    },
    {
      id: 4,
      name: "Marika Haloga",
      disputeNumber: 7,
      commonReason: "Did Not Appear",
      reasonPercentage: "40%",
      problemCategories: "Did Not Appear",
      categoryPercentage: "40%"
    },
    {
      id: 5,
      name: "Marika Haloga",
      disputeNumber: 5,
      commonReason: "Did Not Appear",
      reasonPercentage: "70%",
      problemCategories: "Did Not Appear",
      categoryPercentage: "70%"
    },
    {
      id: 6,
      name: "Marika Haloga",
      disputeNumber: 3,
      commonReason: "Did Not Appear",
      reasonPercentage: "14%",
      problemCategories: "Did Not Appear",
      categoryPercentage: "14%"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Pattern Analytis</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Disputer..."
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
            {analyticsData.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.disputeNumber} disputes
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <div>{item.commonReason}</div>
                    <div className="text-xs text-gray-500">({item.reasonPercentage})</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <div>{item.problemCategories}</div>
                    <div className="text-xs text-gray-500">({item.categoryPercentage})</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatternAnalytics;








