import React from 'react'
import { Bot, CheckCircle, XCircle, Eye, RefreshCw } from 'lucide-react'

const AutoModActions = () => {
  const autoModItems = [
    {
      id: 'AUTO-789',
      user: 'Suspicious Account',
      type: 'Comment',
      content: 'Buy cheap products now! Click here for amazing deals!!! 💰💰💰',
      aiReason: 'Spam Pattern Detected',
      confidence: 95,
      action: 'Auto-Hidden',
      timestamp: '10 minutes ago',
      keywords: ['buy', 'cheap', 'click here', 'deals']
    },
    {
      id: 'AUTO-788',
      user: 'New User',
      type: 'Celebration Post',
      content: 'Check out this link for free money and prizes! Limited time offer!',
      aiReason: 'Suspicious Links',
      confidence: 88,
      action: 'Auto-Blocked',
      timestamp: '25 minutes ago',
      keywords: ['free money', 'prizes', 'limited time']
    },
    {
      id: 'AUTO-787',
      user: 'Bot Account',
      type: 'Comment',
      content: 'Great post! Check my profile for similar content! Follow for follow!',
      aiReason: 'Bot-like Behavior',
      confidence: 92,
      action: 'Auto-Hidden',
      timestamp: '1 hour ago',
      keywords: ['follow for follow', 'check my profile']
    }
  ]

  const getActionColor = (action) => {
    switch (action) {
      case 'Auto-Blocked': return 'bg-red-100 text-red-800'
      case 'Auto-Hidden': return 'bg-orange-100 text-orange-800'
      case 'Flagged for Review': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      {autoModItems.map((item) => (
        <div key={item.id} className="border border-purple-200 rounded-lg p-4 bg-purple-50/20">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-4 flex-1">
              {/* AI Icon */}
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-purple-600" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{item.user}</span>
                  <span className="text-xs text-gray-500">• {item.timestamp}</span>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded ${getActionColor(item.action)}`}>
                    {item.action}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                    {item.type}
                  </span>
                  <span className="text-xs text-gray-500">{item.id}</span>
                </div>
                
                <p className="text-sm text-gray-700 mb-3">{item.content}</p>
                
                {/* AI Detection Details */}
                <div className="bg-white rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-semibold text-gray-900">AI Detection: {item.aiReason}</span>
                    </div>
                    <span className="text-sm font-bold text-purple-600">{item.confidence}% confidence</span>
                  </div>
                  
                  {/* Confidence Bar */}
                  <div className="mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${item.confidence}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-500">Detected keywords:</span>
                    {item.keywords.map((keyword, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button 
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Approve (Override AI)"
              >
                <CheckCircle className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Confirm Removal"
              >
                <XCircle className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Review in Detail"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                title="Re-analyze"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* AI Settings */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">AI Moderation Settings</h4>
            <p className="text-sm text-gray-600">Configure automatic content filtering rules</p>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
            Configure Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default AutoModActions






