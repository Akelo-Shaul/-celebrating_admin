import React from 'react';

const AlertsSidebar = () => {
  const alerts = [
    {
      id: 1,
      type: 'Violation',
      severity: 'Critical',
      icon: 'warning',
      timestamp: '07:23:15',
      message: 'Stream STR_002 has received multiple violation reports for inappropriate content',
      actions: ['View Stream', 'Dismiss']
    },
    {
      id: 2,
      type: 'Server',
      severity: 'Critical',
      icon: 'warning',
      timestamp: '07:23:06',
      message: 'CDN Server Nairobi-East experiencing high latency (>5s)',
      actions: ['Dismiss']
    },
    {
      id: 3,
      type: 'Copyright',
      severity: 'High',
      icon: 'info',
      timestamp: '07:23:15',
      message: 'Potential copyright content detected in stream STR_005',
      actions: ['View Stream', 'Dismiss']
    },
    {
      id: 4,
      type: 'Reminder',
      severity: 'Standard',
      icon: 'info',
      timestamp: '07:23:15',
      message: '43 streams scheduled for today - 12 awaiting approval',
      actions: ['Dismiss']
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Standard':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIcon = (iconType, severity) => {
    if (iconType === 'warning') {
      return (
        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l9 18H3L12 2zm0 3.5L6.5 19h11L12 5.5zM12 8v4h2V8h-2zm0 6v2h2v-2h-2z"/>
        </svg>
      );
    }
    return (
      <svg className={`w-4 h-4 ${severity === 'Standard' ? 'text-blue-500' : 'text-red-500'}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Alerts</h3>
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
          3
        </span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(alert.icon, alert.severity)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-0.5 rounded">{alert.type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs text-gray-500">{alert.timestamp}</span>
                </div>
                
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">{alert.message}</p>
                
                <div className="flex items-center space-x-2">
                  {alert.actions.includes('View Stream') && (
                    <button className="flex items-center space-x-1 text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition-colors">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>View Stream</span>
                    </button>
                  )}
                  <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsSidebar;
