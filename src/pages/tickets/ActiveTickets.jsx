import React from 'react'
import { useNavigate } from 'react-router-dom'
import StandardTable from '../../components/common/StandardTable'

const ActiveTickets = () => {
  const navigate = useNavigate()

  const events = [
    { id: 1, title: 'Summer Music Fest — Main Stage', venue: 'Greenfield Arena', start: 'Today · 18:30', ticketsSold: 5234, status: 'Live' },
    { id: 2, title: 'Tech Conference 2025 — Keynote', venue: 'Convention Center Hall A', start: 'Today · 14:00', ticketsSold: 1842, status: 'Ongoing' },
    { id: 3, title: 'Food Carnival — Street Stage', venue: 'Harbor Promenade', start: 'Today · 12:00', ticketsSold: 912, status: 'Live' },
    { id: 4, title: 'Charity Marathon Expo', venue: 'Riverside Park', start: 'Today · 09:00', ticketsSold: 302, status: 'Ongoing' }
  ]

  const columns = ['Event', 'Venue', 'Start', 'Tickets Sold', 'Status', 'Actions']

  const renderRow = (ev) => (
    <tr key={ev.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/event-tickets/${ev.id}`)}>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ev.title}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ev.venue}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ev.start}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{ev.ticketsSold.toLocaleString()}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${ev.status === 'Live' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {ev.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm" onClick={() => navigate(`/event-tickets/${ev.id}`)}>View</button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">Manage</button>
        </div>
      </td>
    </tr>
  )

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Active Tickets</h1>
        <p className="text-gray-600">Ongoing and currently active ticketed events. Use this view to monitor events in progress.</p>
      </div>

      <StandardTable
        title="Active Ticketed Events"
        columns={columns}
        data={events}
        renderRow={(item) => renderRow(item)}
        showFilter={false}
        columnWidths={["35%","20%","15%","10%","10%","10%"]}
      />
    </div>
  )
}

export default ActiveTickets
