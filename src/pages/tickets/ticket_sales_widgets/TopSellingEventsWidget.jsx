import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Users, DollarSign } from 'lucide-react'

const TopSellingEventsWidget = () => {
  const navigate = useNavigate()

  const topEvents = [
    {
      id: 1,
      name: 'Tech Innovation Conference 2024',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=300&q=80',
      ticketsSold: 8542,
      revenue: 256260,
      growth: 23.5,
      category: 'Conference'
    },
    {
      id: 2,
      name: 'Music Festival Summer 2024',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80',
      ticketsSold: 7328,
      revenue: 219840,
      growth: 18.2,
      category: 'Music'
    },
    {
      id: 3,
      name: 'Sports Championship Finals',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=300&q=80',
      ticketsSold: 6891,
      revenue: 206730,
      growth: 15.8,
      category: 'Sports'
    },
    {
      id: 4,
      name: 'Art Exhibition Opening',
      image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?auto=format&fit=crop&w=300&q=80',
      ticketsSold: 5234,
      revenue: 157020,
      growth: 12.3,
      category: 'Art'
    },
    {
      id: 5,
      name: 'Food & Wine Expo',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=300&q=80',
      ticketsSold: 4567,
      revenue: 136010,
      growth: 9.7,
      category: 'Food'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Top Selling Events</h2>
        <p className="text-sm text-gray-500 mt-1">Highest performing events</p>
      </div>

      <div className="divide-y divide-gray-200">
        {topEvents.map((event, index) => (
          <div
            key={event.id}
            onClick={() => navigate(`/event/${encodeURIComponent(event.name)}`)}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-start space-x-3">
              {/* Rank Badge */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                index === 0 ? 'bg-yellow-100 text-yellow-800' :
                index === 1 ? 'bg-gray-100 text-gray-700' :
                index === 2 ? 'bg-orange-100 text-orange-800' :
                'bg-gray-50 text-gray-600'
              }`}>
                {index + 1}
              </div>

              {/* Event Image */}
              <img
                src={event.image}
                alt={event.name}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />

              {/* Event Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {event.name}
                </h3>
                <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded mt-1">
                  {event.category}
                </span>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-xs text-gray-600">{event.ticketsSold.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-xs text-gray-900 font-semibold">${(event.revenue / 1000).toFixed(1)}k</span>
                  </div>
                </div>

                {/* Growth Indicator */}
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">+{event.growth}%</span>
                  <span className="text-xs text-gray-500">vs last period</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <button className="w-full text-sm text-orange-600 hover:text-orange-700 font-medium">
          View All Events →
        </button>
      </div>
    </div>
  )
}

export default TopSellingEventsWidget

