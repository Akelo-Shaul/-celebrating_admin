import React, { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Users, Globe, Star, ShoppingBag, DollarSign, MessageSquare, TrendingUp } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import TicketPurchaseDistributionMap from './event_detail_widgets/TicketPurchaseDistributionMap'
import TicketPurchasesTable from './event_detail_widgets/TicketPurchasesTable'
import EventReviewsTable from './event_detail_widgets/EventReviewsTable'
import EventSalesChart from './event_detail_widgets/EventSalesChart'
import EventAnalytics from './event_detail_widgets/EventAnalytics'

const EventDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Sample event data - in real app this would come from API
  const event = useMemo(() => ({
    id,
    name: 'Shang Mulan',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    organizer: {
      name: 'Bruam Halaberry',
      verified: true,
      avatar: 'B'
    },
    rating: 3.5,
    ticketPurchases: 100,
    salesVolume: 124209,
    reviews: 14,
    percentageSales: 95,
    date: '28-02-2000',
    startTime: '9:00 AM',
    endTime: '08:00 PM',
    location: 'Anniversary Towers, Nairobi 5th Floor',
    isPhysical: true,
    capacity: 500,
    description: 'Join us for the largest technology innovation conference of the year. Connect with industry leaders, explore cutting-edge technologies, and network with fellow innovators',
    ticketsSold: 475,
    ticketsAvailable: 25
  }), [id])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Section - Event Header */}
        <div className="col-span-5">
          {/* Event Image */}
          <div className="w-full h-48 mb-4">
            <img 
              src={event.image} 
              alt={event.name}
              className="w-full h-full rounded-lg object-cover"
            />
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-4 bg-gray-300 px-4 py-2 rounded-full w-fit">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`w-5 h-5 ${star <= Math.floor(event.rating) ? 'fill-orange-500 text-orange-500' : 'fill-gray-400 text-gray-400'}`}
              />
            ))}
          </div>

          {/* Event Name */}
          <h1 className="text-4xl font-bold mb-4">{event.name}</h1>

          {/* Organizer Info */}
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity mb-6"
            onClick={() => navigate(`/profile/${encodeURIComponent(event.organizer.name)}`)}
          >
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden">
              <span className="text-white font-bold">{event.organizer.avatar}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-600">Organizer</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{event.organizer.name}</span>
                {event.organizer.verified && (
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">About Event</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Key Metrics - StatCards */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="Ticket Purchases"
              value={event.ticketPurchases.toString()}
              icon={ShoppingBag}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
            />
            <StatCard
              title="Sales Volume"
              value={`$ ${event.salesVolume.toLocaleString()}`}
              icon={DollarSign}
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
            />
            <StatCard
              title="Reviews"
              value={event.reviews.toString()}
              icon={MessageSquare}
              iconBgColor="bg-purple-100"
              iconColor="text-purple-600"
            />
            <StatCard
              title="Percentage Sales"
              value={`${event.percentageSales}%`}
              icon={TrendingUp}
              iconBgColor="bg-orange-100"
              iconColor="text-orange-600"
            />
          </div>
        </div>

        {/* Right Section - Event Details and Map */}
        <div className="col-span-7 space-y-6">
          {/* Event Info Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              {/* Date & Time */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-gray-700" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">Date & Time</div>
                  <div className="font-bold text-gray-900">{event.date}</div>
                  <div className="text-sm text-gray-600">{event.startTime} - {event.endTime}</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {event.isPhysical ? (
                    <MapPin className="w-6 h-6 text-gray-700" />
                  ) : (
                    <Globe className="w-6 h-6 text-gray-700" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">Location</div>
                  <div className="font-bold text-gray-900">{event.location}</div>
                  <div className="text-sm text-gray-600">
                    {event.isPhysical ? 'Physical Event' : 'Online Event'}
                  </div>
                </div>
              </div>

              {/* Capacity */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Users className="w-6 h-6 text-gray-700" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">Capacity</div>
                  <div className="font-bold text-gray-900">{event.capacity} Attendees</div>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Purchase Distribution Map */}
          <TicketPurchaseDistributionMap />
        </div>

        {/* Full Width Sections */}
        <div className="col-span-12">
          {/* Ticket Purchases Table */}
          <div className="mb-6">
            <TicketPurchasesTable />
          </div>

          {/* Reviews and Sales Report */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-5">
              <EventReviewsTable />
            </div>
            <div className="col-span-7">
              <EventSalesChart />
            </div>
          </div>

          {/* Additional Analytics */}
          <EventAnalytics />
        </div>
      </div>
    </div>
  )
}

export default EventDetail

