import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Trash2 } from 'lucide-react'

const AlertsSidebar = () => {
  const navigate = useNavigate()
  
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'Violation',
      severity: 'Critical',
      timestamp: '07:23:15',
      message: 'Stream STR_002 has received multiple violation reports for inappropriate content',
      hasViewAction: true,
      streamName: 'Wall of Fame Nairobi carnivore lit'
    },
    {
      id: 2,
      type: 'Server',
      severity: 'Critical',
      timestamp: '07:23:06',
      message: 'CDN Server Nairobi-East experiencing high latency (>5s)',
      hasViewAction: false
    },
    {
      id: 3,
      type: 'Copyright',
      severity: 'High',
      timestamp: '07:22:45',
      message: 'Potential copyright content detected in stream STR_005',
      hasViewAction: true,
      streamName: 'Tech Conference Live'
    }
  ])

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'Critical':
        return {
          badge: 'bg-red-100 text-red-700',
          border: 'border-red-200'
        }
      case 'High':
        return {
          badge: 'bg-orange-100 text-orange-700',
          border: 'border-orange-200'
        }
      case 'Medium':
        return {
          badge: 'bg-yellow-100 text-yellow-700',
          border: 'border-yellow-200'
        }
      default:
        return {
          badge: 'bg-blue-100 text-blue-700',
          border: 'border-blue-200'
        }
    }
  }

  const getTypeStyles = (type) => {
    switch (type) {
      case 'Violation':
        return 'bg-red-100 text-red-700'
      case 'Server':
        return 'bg-orange-100 text-orange-700'
      case 'Copyright':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const handleDismiss = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId))
  }

  const handleViewStream = (alert) => {
    if (alert.streamName) {
      navigate(`/stream/${encodeURIComponent(alert.streamName)}`)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow h-fit">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Alerts</h3>
        <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full min-w-[24px] text-center">
          {alerts.length}
        </span>
      </div>

      {/* Alerts List */}
      <div className="p-4 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No active alerts</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const severityStyles = getSeverityStyles(alert.severity)
            const typeStyles = getTypeStyles(alert.type)
            
            return (
              <div 
                key={alert.id} 
                className={`bg-white rounded-lg border-2 ${severityStyles.border} p-4 hover:shadow-md transition-shadow`}
              >
                {/* Alert Header */}
                <div className="flex items-start gap-3 mb-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">A</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Badges Row */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded ${typeStyles}`}>
                        {alert.type}
                      </span>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded ${severityStyles.badge}`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        {alert.timestamp}
                      </span>
                    </div>

                    {/* Message */}
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {alert.message}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                  {alert.hasViewAction && (
                    <button
                      onClick={() => handleViewStream(alert)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Stream</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDismiss(alert.id)}
                    className="ml-auto p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Dismiss alert"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default AlertsSidebar
