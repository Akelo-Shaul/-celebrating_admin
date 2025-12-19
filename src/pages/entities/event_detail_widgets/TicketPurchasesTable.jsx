import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter } from 'lucide-react'
import * as Flags from 'country-flag-icons/react/3x2'

const TicketPurchasesTable = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  // Sample ticket purchase data
  const purchases = [
    {
      id: 1,
      ticketNo: 'EVN-RE-0987884',
      user: {
        name: '@Shaul',
        handle: 'IGU0JHF@91H0H18230',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
      },
      amount: 32000,
      quantity: 4,
      country: 'KE',
      timestamp: '28-02-2000',
      type: 'VIP',
      typeBg: 'bg-yellow-100',
      typeColor: 'text-yellow-800'
    },
    {
      id: 2,
      ticketNo: 'EVN-RE-0987884',
      user: {
        name: '@Shaul',
        handle: 'IGU0JHF@91H0H18230',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80'
      },
      amount: 23000,
      quantity: 10,
      country: 'KE',
      timestamp: '28-02-2000',
      type: 'Early Bird',
      typeBg: 'bg-green-100',
      typeColor: 'text-green-800'
    },
    {
      id: 3,
      ticketNo: 'EVN-RE-0987884',
      user: {
        name: '@Shaul',
        handle: 'IGU0JHF@91H0H18230',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
      },
      amount: 23000,
      quantity: 12,
      country: 'KE',
      timestamp: '28-02-2000',
      type: 'General',
      typeBg: 'bg-gray-100',
      typeColor: 'text-gray-800'
    },
    {
      id: 4,
      ticketNo: 'EVN-RE-0987884',
      user: {
        name: '@Shaul',
        handle: 'IGU0JHF@91H0H18230',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
      },
      amount: 23000,
      quantity: 12,
      country: 'KE',
      timestamp: '28-02-2000',
      type: 'Early Bird',
      typeBg: 'bg-green-100',
      typeColor: 'text-green-800'
    },
    {
      id: 5,
      ticketNo: 'EVN-RE-0987884',
      user: {
        name: '@Shaul',
        handle: 'IGU0JHF@91H0H18230',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'
      },
      amount: 23000,
      quantity: 32,
      country: 'KE',
      timestamp: '28-02-2000',
      type: 'Early Bird',
      typeBg: 'bg-green-100',
      typeColor: 'text-green-800'
    },
    {
      id: 6,
      ticketNo: 'EVN-RE-0987884',
      user: {
        name: '@Shaul',
        handle: 'IGU0JHF@91H0H18230',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80'
      },
      amount: 23000,
      quantity: 11,
      country: 'KE',
      timestamp: '28-02-2000',
      type: 'Early Bird',
      typeBg: 'bg-green-100',
      typeColor: 'text-green-800'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h2 className="text-base md:text-lg font-bold text-gray-900">Ticket Purchases</h2>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative flex-1 md:flex-initial">
              <input
                type="text"
                placeholder="Search Ticket, User..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-4 py-2 border rounded-md w-full md:w-64 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
              <Search className="w-4 h-4 text-gray-500 absolute left-2.5 top-2.5" />
            </div>
            <button className="px-3 md:px-4 py-2 bg-gray-200 text-gray-700 rounded-md flex items-center space-x-2 hover:bg-gray-300 flex-shrink-0 text-sm">
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
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {purchases.map((purchase) => (
              <tr key={purchase.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/ticket/${purchase.id}`)}>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-blue-600 hover:text-blue-800">{purchase.ticketNo}</span>
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/profile/${encodeURIComponent(purchase.user.name)}`)
                  }}
                >
                  <div className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                    <img 
                      src={purchase.user.avatar} 
                      alt={purchase.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-bold text-gray-900">{purchase.user.name}</div>
                      <div className="text-xs text-gray-500">{purchase.user.handle}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{purchase.amount.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{purchase.quantity}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center">
                    {React.createElement(Flags[purchase.country], { 
                      className: "w-8 h-6 rounded shadow-sm"
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{purchase.timestamp}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-xs px-3 py-1 rounded-full ${purchase.typeBg} ${purchase.typeColor} font-medium`}>
                    {purchase.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TicketPurchasesTable

