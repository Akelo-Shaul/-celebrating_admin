import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ban, MessageSquare, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react'

// Context Menu Component
const ContextMenu = ({ x, y, shop, onClose, onAction }) => {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const menuItems = [
    { icon: Ban, label: 'Suspend Shop', action: 'suspend', color: 'text-red-600' },
    { icon: MessageSquare, label: 'Message Owner', action: 'message', color: 'text-blue-600' },
  ]

  // Add "Approve Shop" if status is pending
  if (shop.status === 'pending') {
    menuItems.push({
      icon: CheckCircle,
      label: 'Approve Shop',
      action: 'approve',
      color: 'text-green-600'
    })
  }

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[180px]"
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action, shop)
            onClose()
          }}
          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${item.color}`}
        >
          <item.icon className="w-4 h-4" />
          {item.label}
        </button>
      ))}
    </div>
  )
}

const ShopRankings = ({ shops = [] }) => {
  const navigate = useNavigate()
  const [contextMenu, setContextMenu] = useState(null)

  const handleContextMenu = (e, shop) => {
    e.preventDefault()
    e.stopPropagation()
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      shop
    })
  }

  const closeContextMenu = () => {
    setContextMenu(null)
  }

  const handleAction = (action, shop) => {
    console.log(`Action: ${action} on shop:`, shop.name)
    // Handle the action here
    switch (action) {
      case 'suspend':
        alert(`Suspending shop: ${shop.name}`)
        break
      case 'message':
        alert(`Messaging owner: ${shop.owner}`)
        break
      case 'approve':
        alert(`Approving shop: ${shop.name}`)
        break
      default:
        break
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header Section */}
      <div className="px-6 py-4 border-b border-gray-200">
        {/* Mobile Layout: 2 rows */}
        <div className="md:hidden space-y-3">
          {/* Top Row: Title + Filter Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Shop Rankings</h2>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md flex items-center space-x-1 hover:bg-gray-200 transition-colors">
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

          {/* Bottom Row: Search Field (Full Width) */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search Shop..."
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        </div>

        {/* Desktop Layout: Title left, Search and Filter right */}
        <div className="hidden md:flex items-center justify-between">
          {/* Title */}
          <h2 className="text-lg font-bold text-gray-900 whitespace-nowrap">Shop Rankings</h2>

          {/* Search and Filter Group */}
          <div className="flex items-center gap-4">
            {/* Search Field */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search Shop..."
                className="pl-8 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

            {/* Filter Button */}
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md flex items-center space-x-1 hover:bg-gray-200 transition-colors whitespace-nowrap">
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sales Volume ($)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Followers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Trend</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shops.map((s, idx) => (
              <tr 
                key={idx} 
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => navigate(`/store/${encodeURIComponent(s.name)}`)}
                onContextMenu={(e) => handleContextMenu(e, s)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{s.name}</div>
                  <div className="text-sm text-gray-500">{s.posts} posts</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {s.country}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {s.sales.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {s.followers.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {s.rating}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <div className="flex items-center justify-center">
                    {s.trend === 'up' ? (
                      <TrendingUp size={18} className="text-green-600" />
                    ) : (
                      <TrendingDown size={18} className="text-red-600" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          shop={contextMenu.shop}
          onClose={closeContextMenu}
          onAction={handleAction}
        />
      )}
    </div>
  )
}

export default ShopRankings
