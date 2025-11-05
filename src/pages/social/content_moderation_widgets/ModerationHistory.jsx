import React from 'react'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

const ModerationHistory = () => {
  const historyItems = [
    {
      id: 'MOD-9876',
      postId: 'POST-12450',
      user: 'Braum Halaberry',
      content: 'Amazing concert last night! Thanks everyone...',
      action: 'Approved',
      moderator: 'Admin John',
      reason: 'No violations found',
      timestamp: '2 hours ago',
      processingTime: '3 minutes'
    },
    {
      id: 'MOD-9875',
      postId: 'POST-12449',
      user: 'Spam Account',
      content: 'Buy now! Limited offer!',
      action: 'Rejected',
      moderator: 'Admin Sarah',
      reason: 'Spam content',
      timestamp: '3 hours ago',
      processingTime: '1 minute'
    },
    {
      id: 'MOD-9874',
      postId: 'POST-12448',
      user: 'Fashion Icon',
      content: 'New collection preview...',
      action: 'Approved',
      moderator: 'Admin Mike',
      reason: 'Passed review',
      timestamp: '5 hours ago',
      processingTime: '5 minutes'
    },
    {
      id: 'MOD-9873',
      postId: 'POST-12447',
      user: 'Inappropriate User',
      content: 'Inappropriate content...',
      action: 'Rejected',
      moderator: 'Admin John',
      reason: 'Violates community guidelines',
      timestamp: '6 hours ago',
      processingTime: '2 minutes'
    },
    {
      id: 'MOD-9872',
      postId: 'POST-12446',
      user: 'Tech Guru',
      content: 'Product announcement...',
      action: 'Approved',
      moderator: 'Admin Sarah',
      reason: 'Legitimate content',
      timestamp: '8 hours ago',
      processingTime: '4 minutes'
    }
  ]

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mod ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Post / User</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Content</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Action</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Moderator</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Reason</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Processing Time</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {historyItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.id}</td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{item.user}</div>
                    <div className="text-gray-500">{item.postId}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">{item.content}</div>
                </td>
                <td className="px-6 py-4 text-center">
                  {item.action === 'Approved' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3" />
                      Approved
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">
                      <XCircle className="w-3 h-3" />
                      Rejected
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.moderator}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.reason}</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                    <Clock className="w-3 h-3" />
                    {item.processingTime}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 text-right">{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Showing 1 to 5 of 1,234 results
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">
            1
          </button>
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModerationHistory






