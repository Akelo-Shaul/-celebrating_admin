import React from 'react';

const AlertsList = () => {
  const alerts = [
    {
      id: 1,
      type: 'Event Cancelations',
      icon: 'warning',
      iconColor: 'text-red-500',
      bgColor: 'bg-red-500',
      message: 'Summer Music Festival Has been cancelled. Process 1,200 refunds.',
      timestamp: '3 days ago'
    },
    {
      id: 2,
      type: 'Sold Out',
      icon: 'warning',
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-500',
      message: 'Braum Hallabery Concert has reached capacity.',
      timestamp: '3 days ago'
    },
    {
      id: 3,
      type: 'Poor Sales',
      icon: 'warning',
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-500',
      message: 'Tech Conference 2025 has sold only 15% with 2 weeks left.',
      timestamp: '3 days ago'
    },
    {
      id: 4,
      type: 'New Event Pending',
      icon: 'info',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-500',
      message: 'Live Dance Event awaiting approval.',
      timestamp: '3 days ago'
    }
  ];

  const getIcon = (iconType) => {
    if (iconType === 'warning') {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l9 18H3L12 2zm0 3.5L6.5 19h11L12 5.5zM12 8v4h2V8h-2zm0 6v2h2v-2h-2z"/>
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Alerts</h3>
        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
          3
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start space-x-3">
            <div className={`flex-shrink-0 w-6 h-6 ${alert.bgColor} rounded-full flex items-center justify-center ${alert.iconColor}`}>
              {getIcon(alert.icon)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-sm font-medium text-gray-900">{alert.type}</h4>
                <span className="text-xs text-gray-500">{alert.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsList;







