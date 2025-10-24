import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Eye, Download, Ban, RefreshCw, AlertTriangle, Mail } from 'lucide-react'

// Context Menu Component
const TicketContextMenu = ({ isOpen, position, onClose, ticket, onAction }) => {
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

  if (!isOpen || !ticket) return null

  const menuItems = [
    {
      icon: Eye,
      label: 'View Details',
      action: 'view',
      color: 'text-blue-600'
    },
    {
      icon: Download,
      label: 'Download Ticket',
      action: 'download',
      color: 'text-green-600'
    },
    {
      icon: Mail,
      label: 'Resend Ticket',
      action: 'resend',
      color: 'text-purple-600'
    },
    {
      icon: RefreshCw,
      label: 'Refund Ticket',
      action: 'refund',
      color: 'text-orange-600'
    },
    {
      icon: AlertTriangle,
      label: 'Flag as Suspicious',
      action: 'flag',
      color: 'text-yellow-600'
    },
    {
      icon: Ban,
      label: 'Cancel Ticket',
      action: 'cancel',
      color: 'text-red-600'
    }
  ]

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="font-semibold text-sm text-gray-900">{ticket.ticketNo}</div>
        <div className="text-xs text-gray-500">{ticket.event}</div>
      </div>
      
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action, ticket)
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

const TicketSalesTable = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [contextMenu, setContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, ticket: null })

  // Sample ticket data
  const tickets = [
    {
      id: 1,
      ticketNo: 'TKT-2024-001234',
      event: 'Tech Innovation Conference 2024',
      buyer: {
        name: '@Shaul',
        email: 'shaul@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
      },
      type: 'VIP',
      quantity: 2,
      price: 150.00,
      totalAmount: 300.00,
      purchaseDate: '2024-01-15',
      eventDate: '2024-03-20',
      status: 'confirmed',
      paymentMethod: 'Credit Card'
    },
    {
      id: 2,
      ticketNo: 'TKT-2024-001235',
      event: 'Music Festival Summer 2024',
      buyer: {
        name: '@Maria',
        email: 'maria@example.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80'
      },
      type: 'General',
      quantity: 4,
      price: 75.00,
      totalAmount: 300.00,
      purchaseDate: '2024-01-14',
      eventDate: '2024-06-15',
      status: 'confirmed',
      paymentMethod: 'PayPal'
    },
    {
      id: 3,
      ticketNo: 'TKT-2024-001236',
      event: 'Art Exhibition Opening',
      buyer: {
        name: '@John',
        email: 'john@example.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
      },
      type: 'Early Bird',
      quantity: 1,
      price: 45.00,
      totalAmount: 45.00,
      purchaseDate: '2024-01-13',
      eventDate: '2024-02-10',
      status: 'pending',
      paymentMethod: 'Credit Card'
    },
    {
      id: 4,
      ticketNo: 'TKT-2024-001237',
      event: 'Sports Championship Finals',
      buyer: {
        name: '@Lisa',
        email: 'lisa@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
      },
      type: 'VIP',
      quantity: 2,
      price: 200.00,
      totalAmount: 400.00,
      purchaseDate: '2024-01-12',
      eventDate: '2024-04-05',
      status: 'refunded',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 5,
      ticketNo: 'TKT-2024-001238',
      event: 'Comedy Night Live',
      buyer: {
        name: '@Ahmed',
        email: 'ahmed@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
      },
      type: 'General',
      quantity: 3,
      price: 35.00,
      totalAmount: 105.00,
      purchaseDate: '2024-01-11',
      eventDate: '2024-02-28',
      status: 'confirmed',
      paymentMethod: 'Mobile Money'
    }
  ]

  const handleContextMenu = (e, ticket) => {
    e.preventDefault()
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      ticket
    })
  }

  const closeContextMenu = () => {
    setContextMenu({ isOpen: false, position: { x: 0, y: 0 }, ticket: null })
  }

  const handleAction = (action, ticket) => {
    switch (action) {
      case 'view':
        console.log(`Viewing ticket: ${ticket.ticketNo}`)
        navigate(`/event/${encodeURIComponent(ticket.event)}`)
        break
      case 'download':
        console.log(`Downloading ticket: ${ticket.ticketNo}`)
        alert(`Downloading ticket ${ticket.ticketNo}`)
        break
      case 'resend':
        console.log(`Resending ticket: ${ticket.ticketNo}`)
        alert(`Ticket ${ticket.ticketNo} has been resent to ${ticket.buyer.email}`)
        break
      case 'refund':
        console.log(`Refunding ticket: ${ticket.ticketNo}`)
        if (confirm(`Are you sure you want to refund ${ticket.ticketNo}?`)) {
          alert(`Refund processed for ${ticket.ticketNo}`)
        }
        break
      case 'flag':
        console.log(`Flagging ticket: ${ticket.ticketNo}`)
        alert(`Ticket ${ticket.ticketNo} has been flagged for review`)
        break
      case 'cancel':
        console.log(`Canceling ticket: ${ticket.ticketNo}`)
        if (confirm(`Are you sure you want to cancel ${ticket.ticketNo}?`)) {
          alert(`Ticket ${ticket.ticketNo} has been cancelled`)
        }
        break
      default:
        break
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Confirmed' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      refunded: { bg: 'bg-red-100', text: 'text-red-800', label: 'Refunded' },
      cancelled: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Cancelled' }
    }
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`text-xs px-3 py-1 rounded-full ${config.bg} ${config.text} font-medium`}>
        {config.label}
      </span>
    )
  }

  const getTypeBadge = (type) => {
    const typeConfig = {
      VIP: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      'Early Bird': { bg: 'bg-green-100', text: 'text-green-800' },
      General: { bg: 'bg-gray-100', text: 'text-gray-800' }
    }
    const config = typeConfig[type] || typeConfig.General
    return (
      <span className={`text-xs px-3 py-1 rounded-full ${config.bg} ${config.text} font-medium`}>
        {type}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Recent Ticket Sales</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Search className="w-4 h-4 text-gray-500 absolute left-2.5 top-2.5" />
            </div>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md flex items-center space-x-2 hover:bg-gray-300">
              <Filter className="w-4 h-4" />
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
              <th className="px-6 py-3 text-left">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Ticket No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Buyer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Purchase Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <tr 
                key={ticket.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/event/${encodeURIComponent(ticket.event)}`)}
                onContextMenu={(e) => handleContextMenu(e, ticket)}
              >
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{ticket.ticketNo}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                    {ticket.event}
                  </div>
                  <div className="text-xs text-gray-500">Event: {ticket.eventDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div 
                    className="flex items-center space-x-3"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/profile/${encodeURIComponent(ticket.buyer.name)}`)
                    }}
                  >
                    <img 
                      src={ticket.buyer.avatar} 
                      alt={ticket.buyer.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-bold text-gray-900">{ticket.buyer.name}</div>
                      <div className="text-xs text-gray-500">{ticket.buyer.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getTypeBadge(ticket.type)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-sm text-gray-900">{ticket.quantity}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-bold text-gray-900">${ticket.totalAmount.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{ticket.purchaseDate}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(ticket.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TicketContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={closeContextMenu}
        ticket={contextMenu.ticket}
        onAction={handleAction}
      />
    </div>
  )
}

export default TicketSalesTable

