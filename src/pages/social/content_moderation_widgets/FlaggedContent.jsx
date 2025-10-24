import React from 'react'
import { Flag, CheckCircle, XCircle, Eye, MoreVertical } from 'lucide-react'

const FlaggedContent = () => {
  const flaggedItems = [
    {
      id: 'POST-12459',
      user: 'John Doe',
      type: 'Celebration Post',
      content: 'Inappropriate content example that was flagged by multiple users...',
      flagReason: 'Inappropriate Content',
      reports: 12,
      reporters: ['User1', 'User2', 'User3', '+9 more'],
      priority: 'High',
      timestamp: '2 hours ago',
      status: 'Under Review'
    },
    {
      id: 'POST-12458',
      user: 'Anonymous User',
      type: 'Comment',
      content: 'Spam content with suspicious links and promotional material...',
      flagReason: 'Spam',
      reports: 8,
      reporters: ['User4', 'User5', '+6 more'],
      priority: 'High',
      timestamp: '3 hours ago',
      status: 'Under Review'
    },
    {
      id: 'POST-12457',
      user: 'Fake Account',
      type: 'Celebration Post',
      content: 'Potentially misleading information about products and services...',
      flagReason: 'Misleading Information',
      reports: 5,
      reporters: ['User6', 'User7', '+3 more'],
      priority: 'Medium',
      timestamp: '5 hours ago',
      status: 'Pending'
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-orange-100 text-orange-800'
      case 'Low': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      {flaggedItems.map((item) => (
        <div key={item.id} className="border-2 border-red-200 rounded-lg p-4 bg-red-50/30">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-4 flex-1">
              {/* Warning Icon */}
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Flag className="w-5 h-5 text-red-600" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{item.user}</span>
                  <span className="text-xs text-gray-500">• {item.timestamp}</span>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                  <span className="px-2 py-0.5 text-xs font-semibold rounded bg-yellow-100 text-yellow-800">
                    {item.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                    {item.type}
                  </span>
                  <span className="text-xs text-gray-500">{item.id}</span>
                </div>
                
                <p className="text-sm text-gray-700 mb-3">{item.content}</p>
                
                {/* Flag Details */}
                <div className="bg-white rounded-lg p-3 mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Flag className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-semibold text-gray-900">Flag Reason: {item.flagReason}</span>
                    </div>
                    <span className="text-sm font-bold text-red-600">{item.reports} reports</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Reported by: {item.reporters.join(', ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button 
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Approve (Dismiss Reports)"
              >
                <CheckCircle className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove Content"
              >
                <XCircle className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="View Details"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                title="More Actions"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FlaggedContent




