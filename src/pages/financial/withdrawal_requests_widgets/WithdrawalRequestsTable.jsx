import React, { useState, useRef, useEffect } from 'react'
import { CheckCircle, XCircle, Eye, Clock, AlertTriangle, Ban, FileText, RefreshCw, Flag } from 'lucide-react'

// Withdrawal Context Menu Component
const WithdrawalContextMenu = ({ isOpen, position, onClose, request, onAction }) => {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !request) return null

  const menuItems = [
    {
      icon: Eye,
      label: 'View Details',
      action: 'view',
      color: 'text-blue-600'
    },
    {
      icon: CheckCircle,
      label: 'Approve Request',
      action: 'approve',
      color: 'text-green-600'
    },
    {
      icon: XCircle,
      label: 'Reject Request',
      action: 'reject',
      color: 'text-red-600'
    },
    {
      icon: Clock,
      label: 'Mark as Processing',
      action: 'processing',
      color: 'text-blue-600'
    },
    {
      icon: AlertTriangle,
      label: 'Request More Info',
      action: 'requestInfo',
      color: 'text-orange-600'
    },
    {
      icon: Flag,
      label: 'Flag as Suspicious',
      action: 'flag',
      color: 'text-red-600'
    },
    {
      icon: Ban,
      label: 'Hold Request',
      action: 'hold',
      color: 'text-gray-600'
    },
    {
      icon: FileText,
      label: 'View Transaction History',
      action: 'history',
      color: 'text-purple-600'
    }
  ]

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[220px] z-50"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="font-semibold text-sm text-gray-900">{request.id}</div>
        <div className="text-xs text-gray-500">Amount: {request.amount}</div>
      </div>
      
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action, request)
            onClose()
          }}
          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
        >
          <item.icon size={16} className={item.color} />
          <span className={`text-sm ${item.color}`}>{item.label}</span>
        </button>
      ))}
    </div>
  )
}

const WithdrawalRequestsTable = ({ navigate }) => {
  const [contextMenu, setContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, request: null })

  const requests = [
    {
      id: 'WD-12456',
      user: 'Braum Halaberry',
      userId: 'I9U0JHF29HI9H8230',
      userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      amount: '$5,240',
      method: 'Bank Transfer',
      bankDetails: 'Equity Bank - ****4532',
      requestDate: '2024-06-20',
      status: 'Pending',
      priority: 'High'
    },
    {
      id: 'WD-12455',
      user: 'Sarah Influencer',
      userId: 'K8L3MNP45QR6S789',
      userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      amount: '$3,750',
      method: 'M-Pesa',
      bankDetails: '+254 708 123 456',
      requestDate: '2024-06-20',
      status: 'Pending',
      priority: 'Medium'
    },
    {
      id: 'WD-12454',
      user: 'Tech Guru',
      userId: 'T9U2VWX78YZ0A123',
      userAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      amount: '$8,920',
      method: 'Bank Transfer',
      bankDetails: 'KCB Bank - ****7821',
      requestDate: '2024-06-19',
      status: 'Processing',
      priority: 'High'
    },
    {
      id: 'WD-12453',
      user: 'Fashion Icon',
      userId: 'B4C5DEF67GHI8901',
      userAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      amount: '$2,100',
      method: 'PayPal',
      bankDetails: 'fashionicon@email.com',
      requestDate: '2024-06-19',
      status: 'Approved',
      priority: 'Low'
    },
    {
      id: 'WD-12452',
      user: 'Music Star',
      userId: 'J2K3LMN45OPQ6789',
      userAvatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      amount: '$15,500',
      method: 'Bank Transfer',
      bankDetails: 'Stanbic Bank - ****3421',
      requestDate: '2024-06-18',
      status: 'Pending',
      priority: 'High'
    },
    {
      id: 'WD-12451',
      user: 'John Doe',
      userId: 'R7S8TUV90WXY1234',
      userAvatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      amount: '$1,250',
      method: 'M-Pesa',
      bankDetails: '+254 712 987 654',
      requestDate: '2024-06-18',
      status: 'Rejected',
      priority: 'Low'
    }
  ]

  const handleContextMenu = (e, request) => {
    e.preventDefault()
    e.stopPropagation()
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      request
    })
  }

  const closeContextMenu = () => {
    setContextMenu({ isOpen: false, position: { x: 0, y: 0 }, request: null })
  }

  const handleAction = (action, request) => {
    switch (action) {
      case 'view':
        console.log(`Viewing request ${request.id}`)
        alert(`Viewing details for ${request.id}`)
        break
      case 'approve':
        console.log(`Approving request ${request.id}`)
        if (confirm(`Approve withdrawal request ${request.id} for ${request.amount}?`)) {
          alert(`Request ${request.id} approved`)
        }
        break
      case 'reject':
        console.log(`Rejecting request ${request.id}`)
        const reason = prompt(`Enter rejection reason for ${request.id}:`)
        if (reason) {
          alert(`Request ${request.id} rejected. Reason: ${reason}`)
        }
        break
      case 'processing':
        console.log(`Marking request ${request.id} as processing`)
        alert(`Request ${request.id} marked as processing`)
        break
      case 'requestInfo':
        console.log(`Requesting more info for ${request.id}`)
        alert(`Information request sent for ${request.id}`)
        break
      case 'flag':
        console.log(`Flagging request ${request.id}`)
        if (confirm(`Flag ${request.id} as suspicious?`)) {
          alert(`Request ${request.id} flagged for review`)
        }
        break
      case 'hold':
        console.log(`Holding request ${request.id}`)
        alert(`Request ${request.id} placed on hold`)
        break
      case 'history':
        console.log(`Viewing history for ${request.user}`)
        alert(`Opening transaction history for ${request.user}`)
        break
      default:
        break
    }
  }

  const handleApprove = (e, request) => {
    e.stopPropagation()
    if (confirm(`Approve withdrawal request ${request.id} for ${request.amount}?`)) {
      alert(`Request ${request.id} approved successfully!`)
    }
  }

  const handleReject = (e, request) => {
    e.stopPropagation()
    const reason = prompt(`Enter rejection reason for ${request.id}:`)
    if (reason) {
      alert(`Request ${request.id} rejected. Reason: ${reason}`)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Processing':
        return 'bg-blue-100 text-blue-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800'
      case 'Medium':
        return 'bg-orange-100 text-orange-800'
      case 'Low':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Withdrawal Requests</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search requests..."
                className="pl-8 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
              <svg
                className="w-4 h-4 text-gray-500 absolute left-2.5 top-2.5"
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
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md flex items-center space-x-1 hover:bg-gray-200">
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

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Request ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">User</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Bank Details</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Request Date</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Priority</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Status</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request, idx) => (
              <tr 
                key={request.id} 
                className="hover:bg-gray-50 cursor-context-menu"
                onContextMenu={(e) => handleContextMenu(e, request)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-900">{request.id}</span>
                </td>
                <td 
                  className="px-6 py-4 cursor-pointer hover:opacity-80"
                  onClick={() => navigate(`/profile/${encodeURIComponent(request.user)}`)}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={request.userAvatar} 
                      alt={request.user}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{request.user}</span>
                      <span className="text-xs text-gray-500">{request.userId}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-bold text-gray-900">{request.amount}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{request.method}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{request.bankDetails}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-sm text-gray-600">{request.requestDate}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(request.priority)}`}>
                    {request.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => handleApprove(e, request)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                      disabled={request.status === 'Approved' || request.status === 'Rejected'}
                    >
                      <CheckCircle className="w-3 h-3" />
                      Approve
                    </button>
                    <button
                      onClick={(e) => handleReject(e, request)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                      disabled={request.status === 'Approved' || request.status === 'Rejected'}
                    >
                      <XCircle className="w-3 h-3" />
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Context Menu */}
      <WithdrawalContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={closeContextMenu}
        request={contextMenu.request}
        onAction={handleAction}
      />
    </div>
  )
}

export default WithdrawalRequestsTable




