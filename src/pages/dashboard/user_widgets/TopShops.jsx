import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, SlidersHorizontalIcon, Ban, MessageSquare, CheckCircle } from 'lucide-react'
import * as Flags from 'country-flag-icons/react/3x2'
import { topShopsData } from '../data/topShopsData'

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

const TopShops = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [contextMenu, setContextMenu] = useState(null)

  // Filter shops based on search query
  const filteredShops = topShopsData.filter(shop =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
        alert(`Messaging owner: ${shop.owner.name}`)
        break
      case 'approve':
        alert(`Approving shop: ${shop.name}`)
        break
      default:
        break
    }
  }

  return (
    <div className="bg-white rounded-lg p-4 h-full flex flex-col shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Top Shops</h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Shop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-full bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <SlidersHorizontalIcon className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600">
        <div>Shop Name</div>
        <div>Owner</div>
        <div>Country</div>
        <div className="text-right">Sales Volume ($)</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto">
        {filteredShops.map((shop) => (
          <div
            key={shop.id}
            className="grid grid-cols-4 gap-4 px-4 py-3 border-b last:border-b-0 items-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => navigate(`/store/${encodeURIComponent(shop.name)}`)}
            onContextMenu={(e) => handleContextMenu(e, shop)}
          >
            <div className="flex flex-col">
              <div className="font-medium">{shop.name}</div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <div className="text-green-600 text-xs">✓</div>
                <span>{shop.productsCount} products</span>
              </div>
            </div>
            
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/profile/${encodeURIComponent(shop.owner.name)}`)
              }}
            >
              <img
                src={shop.owner.avatar}
                alt={shop.owner.name}
                className="w-6 h-6 rounded-full bg-gray-200"
              />
              <span className="text-sm text-gray-600">{shop.owner.name}</span>
            </div>

            <div className="flex items-center gap-1">
              {React.createElement(Flags[shop.country], {
                className: "w-6 h-4 rounded"
              })}
            </div>

            <div className="text-right">{shop.salesVolume.toLocaleString()}</div>
          </div>
        ))}
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

export default TopShops