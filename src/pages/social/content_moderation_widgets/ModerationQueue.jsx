import React from 'react'
import { CheckCircle, XCircle, Eye, AlertTriangle, MoreVertical } from 'lucide-react'

const ModerationQueue = () => {
  const queueItems = [
    {
      id: 'POST-12456',
      user: 'Braum Halaberry',
      type: 'Celebration Post',
      content: 'Check out my new music video! Link in bio 🎵',
      image: true,
      flagReason: 'Pending Review',
      priority: 'Medium',
      timestamp: '5 minutes ago',
      reports: 0
    },
    {
      id: 'POST-12455',
      user: 'Sarah Influencer',
      type: 'Comment',
      content: 'This is absolutely amazing! Can\'t wait for more content like this...',
      image: false,
      flagReason: 'Spam Detection',
      priority: 'Low',
      timestamp: '12 minutes ago',
      reports: 1
    },
    {
      id: 'POST-12454',
      user: 'Tech Guru',
      type: 'Celebration Post',
      content: 'New product launch announcement! Revolutionary technology that will change everything!',
      image: true,
      flagReason: 'Potential Spam',
      priority: 'High',
      timestamp: '15 minutes ago',
      reports: 3
    },
    {
      id: 'POST-12453',
      user: 'Fashion Icon',
      type: 'Image Post',
      content: 'Summer collection preview 2024 ☀️ #fashion #style',
      image: true,
      flagReason: 'Pending Review',
      priority: 'Low',
      timestamp: '25 minutes ago',
      reports: 0
    },
    {
      id: 'POST-12452',
      user: 'Music Star',
      type: 'Comment',
      content: 'Thanks for all the support! You guys are the best! 🙏',
      image: false,
      flagReason: 'Auto-flagged',
      priority: 'Medium',
      timestamp: '32 minutes ago',
      reports: 2
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
      {queueItems.map((item) => (
        <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-yellow-300 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-4 flex-1">
              {/* User Avatar Placeholder */}
              <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-semibold">
                {item.user.charAt(0)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{item.user}</span>
                  <span className="text-xs text-gray-500">• {item.timestamp}</span>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                    {item.type}
                  </span>
                  <span className="text-xs text-gray-500">{item.id}</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{item.content}</p>
                
                {/* Metadata */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Reason: {item.flagReason}</span>
                  </div>
                  {item.reports > 0 && (
                    <div>
                      <span className="font-semibold text-red-600">{item.reports} reports</span>
                    </div>
                  )}
                  {item.image && (
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded">Has Media</span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button 
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Approve"
              >
                <CheckCircle className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Reject"
              >
                <XCircle className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
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

      {/* Load More */}
      <div className="text-center pt-4">
        <button className="px-6 py-2 text-sm font-medium text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50">
          Load More Items
        </button>
      </div>
    </div>
  )
}

export default ModerationQueue




