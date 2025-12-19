import React, { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, MapPin, User, CreditCard, Hash, CheckCircle, Clock, Ticket, QrCode, ExternalLink } from 'lucide-react'
import StatCard from '../../components/common/StatCard'

const TicketDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Sample ticket data - in real app this would come from API
  const ticket = useMemo(() => ({
    id,
    ticketNo: 'EVN-RE-0987884',
    status: 'Active',
    type: 'VIP',
    typeBg: 'bg-yellow-100',
    typeColor: 'text-yellow-800',
    quantity: 4,
    purchaseDate: '28-02-2024',
    purchaseTime: '14:30 EAT',
    totalAmount: 32000,
    pricePerTicket: 8000,
    paymentMethod: 'Card',
    paymentStatus: 'Completed',
    validationStatus: 'Valid',
    checkInStatus: 'Not Checked In',
    buyer: {
      id: 1,
      name: '@Shaul',
      handle: 'IGU0JHF@91H0H18230',
      email: 'shaul@example.com',
      phone: '+254 712 345 678',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
      country: 'Kenya'
    },
    event: {
      id: 1,
      name: 'Shang Mulan',
      date: '28-02-2025',
      startTime: '9:00 AM',
      endTime: '08:00 PM',
      location: 'Anniversary Towers, Nairobi 5th Floor',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      organizer: {
        name: 'Bruam Halaberry',
        verified: true
      }
    },
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EVN-RE-0987884',
    notes: 'VIP access includes backstage pass and meet & greet'
  }), [id])

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Left Section - Ticket Details */}
        <div className="lg:col-span-7">
          {/* Ticket Header */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Ticket className="w-5 h-5 text-gray-600" />
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">{ticket.ticketNo}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-3 py-1 rounded-full ${ticket.typeBg} ${ticket.typeColor} font-medium`}>
                    {ticket.type}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    ticket.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  } font-medium`}>
                    {ticket.status}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Total Amount</div>
                <div className="text-2xl font-bold text-gray-900">KES {ticket.totalAmount.toLocaleString()}</div>
              </div>
            </div>

            {/* Purchase Details */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Purchase Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Purchase Date</div>
                  <div className="text-sm font-medium text-gray-900">{ticket.purchaseDate} at {ticket.purchaseTime}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Quantity</div>
                  <div className="text-sm font-medium text-gray-900">{ticket.quantity} ticket(s)</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Price per Ticket</div>
                  <div className="text-sm font-medium text-gray-900">KES {ticket.pricePerTicket.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Payment Method</div>
                  <div className="text-sm font-medium text-gray-900">{ticket.paymentMethod}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Payment Status</div>
                  <div className="text-sm font-medium text-green-600">{ticket.paymentStatus}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Check-in Status</div>
                  <div className="text-sm font-medium text-gray-900">{ticket.checkInStatus}</div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {ticket.notes && (
              <div className="border-t mt-4 pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Notes</h3>
                <p className="text-sm text-gray-600">{ticket.notes}</p>
              </div>
            )}
          </div>

          {/* Event Information */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Event Information</h2>
              <button
                onClick={() => navigate(`/events/detail/${ticket.event.id}`)}
                className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                View Event
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* Event Image */}
            <div className="mb-4">
              <img
                src={ticket.event.image}
                alt={ticket.event.name}
                className="w-full h-48 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => navigate(`/events/detail/${ticket.event.id}`)}
              />
            </div>

            {/* Event Details */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{ticket.event.name}</h3>

              <div className="space-y-3">
                {/* Date & Time */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Date & Time</div>
                    <div className="font-medium text-gray-900 text-sm">{ticket.event.date}</div>
                    <div className="text-xs text-gray-600">{ticket.event.startTime} - {ticket.event.endTime}</div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Location</div>
                    <div className="font-medium text-gray-900 text-sm">{ticket.event.location}</div>
                  </div>
                </div>

                {/* Organizer */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <User className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Organizer</div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 text-sm">{ticket.event.organizer.name}</span>
                      {ticket.event.organizer.verified && (
                        <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buyer Information */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Buyer Information</h2>
              <button
                onClick={() => navigate(`/profile/${encodeURIComponent(ticket.buyer.name)}`)}
                className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                View Profile
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-start gap-4">
              <img
                src={ticket.buyer.avatar}
                alt={ticket.buyer.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">{ticket.buyer.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{ticket.buyer.handle}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Email</div>
                    <div className="text-sm font-medium text-gray-900">{ticket.buyer.email}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Phone</div>
                    <div className="text-sm font-medium text-gray-900">{ticket.buyer.phone}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Country</div>
                    <div className="text-sm font-medium text-gray-900">{ticket.buyer.country}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Stats and QR Code */}
        <div className="lg:col-span-5 space-y-4 md:space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <StatCard
              title="Validation"
              value={ticket.validationStatus}
              icon={CheckCircle}
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
            />
            <StatCard
              title="Tickets"
              value={ticket.quantity.toString()}
              icon={Ticket}
              iconBgColor="bg-purple-100"
              iconColor="text-purple-600"
            />
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Ticket QR Code</h2>
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 p-4 rounded-lg mb-3">
                <img
                  src={ticket.qrCode}
                  alt="Ticket QR Code"
                  className="w-48 h-48"
                />
              </div>
              <p className="text-xs text-gray-600 text-center">
                Scan this code at the event entrance for check-in
              </p>
              <div className="mt-4 w-full">
                <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium">
                  Download QR Code
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Actions</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                Send to Email
              </button>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium">
                Mark as Checked In
              </button>
              <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors font-medium">
                Transfer Ticket
              </button>
              <button className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium">
                Cancel Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail
