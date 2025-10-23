import React from 'react';

const ScheduledCelebrationsTable = ({ celebrations }) => {
  const columns = [
    'Celebration',
    'Member',
    'Date',
    'Time',
    'Platform',
    'Action'
  ];

  // Sample data matching the image
  const sampleCelebrations = celebrations && celebrations.length > 0 ? celebrations : [
    {
      id: 1,
      celebration: "Can't believe this is how it is supposed to be..",
      member: "Shaul Akelo",
      date: "28-02-2000",
      time: "10:00",
      platform: "Celebrating",
      status: "Scheduled"
    },
    {
      id: 2,
      celebration: "Can't believe this is how it is supposed to be..",
      member: "Hankue Hue",
      date: "28-02-2000",
      time: "10:00",
      platform: "Celebrating",
      status: "Scheduled"
    },
    {
      id: 3,
      celebration: "Can't believe this is how it is supposed to be..",
      member: "Shaul Akelo",
      date: "28-02-2000",
      time: "10:00",
      platform: "Celebrating",
      status: "Scheduled"
    },
    {
      id: 4,
      celebration: "Can't believe this is how it is supposed to be..",
      member: "Hankue Hue",
      date: "28-02-2000",
      time: "10:00",
      platform: "Celebrating",
      status: "Scheduled"
    },
    {
      id: 5,
      celebration: "Can't believe this is how it is supposed to be..",
      member: "Shaul Akelo",
      date: "28-02-2000",
      time: "10:00",
      platform: "Celebrating",
      status: "Scheduled"
    },
    {
      id: 6,
      celebration: "Can't believe this is how it is supposed to be..",
      member: "Hankue Hue",
      date: "28-02-2000",
      time: "10:00",
      platform: "Celebrating",
      status: "Scheduled"
    },
    {
      id: 7,
      celebration: "Can't believe this is how it is supposed to be..",
      member: "Shaul Akelo",
      date: "28-02-2000",
      time: "10:00",
      platform: "Celebrating",
      status: "Scheduled"
    },
    {
      id: 8,
      celebration: "Can't believe this is how it is supposed to be..",
      member: "Hankue Hue",
      date: "28-02-2000",
      time: "10:00",
      platform: "Celebrating",
      status: "Scheduled"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Scheduled Celebrations</h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">1</span> of <span className="font-medium">8</span> pages
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sampleCelebrations.map((celebration, index) => (
              <tr key={celebration.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                        {celebration.celebration}
                      </div>
                      <div className="text-sm text-gray-500">
                        {celebration.status}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <div className="h-8 w-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {celebration.member.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{celebration.member}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {celebration.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {celebration.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {celebration.platform}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-orange-600 hover:text-orange-900">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{' '}
            <span className="font-medium">8</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduledCelebrationsTable;

