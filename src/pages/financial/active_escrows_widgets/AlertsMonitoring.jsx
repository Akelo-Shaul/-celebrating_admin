import React from 'react';

const AlertsMonitoring = () => {
  const alerts = [
    {
      id: 1,
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      title: "High Value Disputes",
      description: "2 Disputes over $10,000 require immediate attention.",
      buttonText: "Review Now"
    },
    {
      id: 2,
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      title: "Payment Failures",
      description: "3 Transactions have failed payment confirmations.",
      buttonText: "Investigate"
    },
    {
      id: 3,
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Approaching Auto Release",
      description: "12 Escrows will auto release in the next 24 hours.",
      buttonText: "View List"
    },
    {
      id: 4,
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Extended Period Escrows",
      description: "8 escrows have been active for over 30 days.",
      buttonText: "Review"
    },
    {
      id: 5,
      icon: (
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        </svg>
      ),
      title: "Celebrity Non Response",
      description: "4 celebrities haven't responded to buyer messages in 48 h.",
      buttonText: "Send Reminder"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 md:px-6 py-4 border-b border-gray-200">
        <h2 className="text-base md:text-lg font-semibold text-gray-900">Alerts & Monitoring</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {alerts.map((alert) => (
          <div key={alert.id} className="px-4 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                {alert.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900">{alert.title}</h3>
                <p className="text-sm text-gray-600 mt-0.5">{alert.description}</p>
              </div>
            </div>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors whitespace-nowrap self-start sm:self-auto">
              {alert.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsMonitoring;










