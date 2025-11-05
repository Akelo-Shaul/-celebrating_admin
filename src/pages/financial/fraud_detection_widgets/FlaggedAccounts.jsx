import React from 'react';

const FlaggedAccounts = () => {
  const flaggedAccounts = [
    {
      id: 1,
      user: {
        name: "Braum Hallabery",
        handle: "@braum",
        avatar: "B",
        avatarColor: "bg-blue-400"
      },
      fraudScore: "75/100",
      issuesDetected: [
        "High Velocity Transactions",
        "Geographic anomaly",
        "3 failed auth attempts"
      ],
      recommendation: "Recommendation: Immediate freeze recommended"
    },
    {
      id: 2,
      user: {
        name: "Braum Hallabery",
        handle: "@braum",
        avatar: "B",
        avatarColor: "bg-blue-400"
      },
      fraudScore: "47/100",
      issuesDetected: [
        "Spending Spike (200% Increase)",
        "New Payment Method Added"
      ],
      recommendation: "Recommendation: Monitor Closely"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Flagged Accounts</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Transaction..."
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

      {/* Flagged Accounts List */}
      <div className="p-6 space-y-4">
        {flaggedAccounts.map((account) => (
          <div key={account.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-10 w-10">
                  <div className={`h-10 w-10 ${account.user.avatarColor} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
                    {account.user.avatar}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{account.user.name}</div>
                      <div className="text-sm text-gray-500">{account.user.handle}</div>
                    </div>
                    <div className="text-sm font-bold text-gray-900">Fraud Score: {account.fraudScore}</div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {account.issuesDetected.map((issue, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                        {issue}
                      </span>
                    ))}
                  </div>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {account.recommendation}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Freeze Account</span>
                </button>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Verify</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlaggedAccounts;










