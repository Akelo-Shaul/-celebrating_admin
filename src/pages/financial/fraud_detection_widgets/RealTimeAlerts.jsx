import React from 'react';

const RealTimeAlerts = () => {
  const alerts = [
    {
      id: 1,
      severity: "High",
      severityColor: "bg-red-500",
      label: "Unusual Withdrawal Pattern",
      description: "Multiple failed withdrawal attempts fom new location",
      details: "5 failed attempts, IP: 185.220.123.x (Eldoret)",
      timestamp: "15 minutes ago"
    },
    {
      id: 2,
      severity: "Medium",
      severityColor: "bg-yellow-500",
      label: "Large Transaction",
      description: "Transaction amount exceeds typical behaviour",
      details: "$12,000 transfer - 3x average transaction",
      timestamp: "24 minutes ago"
    },
    {
      id: 3,
      severity: "Low",
      severityColor: "bg-green-500",
      label: "Unusual Withdrawal Pattern",
      description: "Login from unrecognized device",
      details: "SM-AG1243, IP: 185.220.123.x (Eldoret)",
      timestamp: "1 hr ago"
    },
    {
      id: 4,
      severity: "High",
      severityColor: "bg-red-500",
      label: "Unusual Withdrawal Pattern",
      description: "Multiple failed withdrawal attempts fom new location",
      details: "5 failed attempts, IP: 185.220.123.x (Eldoret)",
      timestamp: "2 hrs ago"
    }
  ];

  const getSeverityBadgeColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Real Time Alerts</h2>
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

      {/* Alerts List */}
      <div className="p-6 space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className={`${alert.severityColor} rounded-lg p-4 flex items-center justify-between`}>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-10 w-10">
                <div className="h-10 w-10 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  B
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityBadgeColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{alert.label}</span>
                </div>
                <div className="text-sm text-gray-700 mb-1">{alert.description}</div>
                <div className="text-xs text-gray-600">{alert.details}</div>
                <div className="text-xs text-gray-500 mt-1">{alert.timestamp}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 bg-white text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50">
                Review
              </button>
              <button className="px-3 py-1.5 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-900">
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeAlerts;







