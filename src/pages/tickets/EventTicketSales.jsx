import React, { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Ticket, DollarSign, TrendingUp, Users, Calendar, ExternalLink } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import StandardTable from '../../components/common/StandardTable'

const EventTicketSales = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Sample event data - in real app this would come from API
  const event = useMemo(() => ({
    id,
    name: 'Summer Music Fest — Main Stage',
    venue: 'Greenfield Arena',
    date: '2025-03-15',
    startTime: '18:30',
    status: 'Live',
    totalTickets: 5234,
    totalRevenue: 125610,
    avgTicketPrice: 24,
    ticketsSoldToday: 342,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
  }), [id])

  // Sample ticket sales data
  const ticketSales = [
    {
      id: 1,
      ticketNo: 'EVN-RE-0987884',
      buyer: '@Shaul',
      buyerId: 'user1',
      type: 'VIP',
      quantity: 4,
      amount: 320,
      purchaseDate: 'Today · 14:30',
      status: 'Confirmed'
    },
    {
      id: 2,
      ticketNo: 'EVN-RE-0987885',
      buyer: '@Jordan',
      buyerId: 'user2',
      type: 'Early Bird',
      quantity: 2,
      amount: 40,
      purchaseDate: 'Today · 13:15',
      status: 'Confirmed'
    },
    {
      id: 3,
      ticketNo: 'EVN-RE-0987886',
      buyer: '@Alex',
      buyerId: 'user3',
      type: 'General',
      quantity: 1,
      amount: 25,
      purchaseDate: 'Today · 12:00',
      status: 'Confirmed'
    },
    {
      id: 4,
      ticketNo: 'EVN-RE-0987887',
      buyer: '@Maria',
      buyerId: 'user4',
      type: 'VIP',
      quantity: 2,
      amount: 160,
      purchaseDate: 'Today · 11:45',
      status: 'Pending'
    },
    {
      id: 5,
      ticketNo: 'EVN-RE-0987888',
      buyer: '@Chris',
      buyerId: 'user5',
      type: 'General',
      quantity: 3,
      amount: 75,
      purchaseDate: 'Today · 10:20',
      status: 'Confirmed'
    }
  ]

  const columns = ['Ticket No', 'Buyer', 'Type', 'Quantity', 'Amount', 'Purchase Date', 'Status', 'Actions']

  const renderRow = (sale) => (
    <tr key={sale.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/ticket/${sale.id}`)}>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-medium text-blue-600 hover:text-blue-800">{sale.ticketNo}</span>
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap cursor-pointer"
        onClick={(e) => {
          e.stopPropagation()
          navigate(`/profile/${encodeURIComponent(sale.buyer)}`)
        }}
      >
        <span className="text-sm text-gray-900 hover:text-orange-600">{sale.buyer}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
          sale.type === 'VIP' ? 'bg-yellow-100 text-yellow-800' :
          sale.type === 'Early Bird' ? 'bg-green-100 text-green-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {sale.type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.quantity}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${sale.amount}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{sale.purchaseDate}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
          sale.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
          sale.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {sale.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm" onClick={(e) => e.stopPropagation()}>
        <button
          className="text-orange-600 hover:text-orange-800 font-medium"
          onClick={() => navigate(`/ticket/${sale.id}`)}
        >
          View
        </button>
      </td>
    </tr>
  )

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      {/* Event Header */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{event.name}</h1>
            <p className="text-sm md:text-base text-gray-600">{event.venue} · {event.date} · {event.startTime}</p>
          </div>
          <button
            onClick={() => navigate(`/events/detail/${event.id}`)}
            className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            View Event
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="mb-4 md:mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <StatCard
            title="Total Tickets Sold"
            value={event.totalTickets.toLocaleString()}
            icon={Ticket}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Total Revenue"
            value={`$${event.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            title="Avg Ticket Price"
            value={`$${event.avgTicketPrice}`}
            icon={TrendingUp}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatCard
            title="Sold Today"
            value={event.ticketsSoldToday.toString()}
            icon={Users}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
          />
        </div>
      </div>

      {/* Ticket Sales Table */}
      <StandardTable
        title="Ticket Sales"
        columns={columns}
        data={ticketSales}
        renderRow={(item) => renderRow(item)}
        showFilter={true}
        searchPlaceholder="Search tickets..."
      />
    </div>
  )
}

export default EventTicketSales
