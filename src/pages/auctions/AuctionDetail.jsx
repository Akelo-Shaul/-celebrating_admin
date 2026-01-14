import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Gavel, Calendar, DollarSign, Clock, User, Star, TrendingUp, ArrowLeft, CheckCircle, XCircle } from 'lucide-react'

const AuctionDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  // Mock auction data (in real app, fetch by id)
  const auction = {
    id: parseInt(id),
    type: 'Video Shout Out',
    memberName: 'Braun Hallabery',
    memberId: 'user1',
    memberAvatar: 'https://i.pravatar.cc/150?img=1',
    askPrice: 12,
    currency: 'KSh',
    dueDate: '18th January 2026',
    delivery: '1 Week',
    totalBids: 4,
    status: 'Active',
    description: 'Need a personalized video shout out for my birthday celebration',
    additionalInfo: 'Duration: 30-60 seconds',
    createdAt: '10th January 2026',
    bids: [
      {
        id: 1,
        celebrityName: 'RuffTone',
        celebrityId: 'celeb123',
        celebrityAvatar: 'https://i.pravatar.cc/150?img=10',
        rating: 4.5,
        completionRate: 99.6,
        bidAmount: 23,
        currency: 'KSh',
        message: 'Fast delivery',
        bidDate: '11th January 2026',
        verified: true
      },
      {
        id: 2,
        celebrityName: 'Sarah Johnson',
        celebrityId: 'celeb124',
        celebrityAvatar: 'https://i.pravatar.cc/150?img=11',
        rating: 4.8,
        completionRate: 98.5,
        bidAmount: 25,
        currency: 'KSh',
        message: 'Will make it extra special!',
        bidDate: '11th January 2026',
        verified: true
      },
      {
        id: 3,
        celebrityName: 'Mike Davis',
        celebrityId: 'celeb125',
        celebrityAvatar: 'https://i.pravatar.cc/150?img=12',
        rating: 4.2,
        completionRate: 95.0,
        bidAmount: 20,
        currency: 'KSh',
        message: '',
        bidDate: '12th January 2026',
        verified: false
      },
      {
        id: 4,
        celebrityName: 'Emma Wilson',
        celebrityId: 'celeb126',
        celebrityAvatar: 'https://i.pravatar.cc/150?img=13',
        rating: 4.9,
        completionRate: 99.8,
        bidAmount: 30,
        currency: 'KSh',
        message: 'Professional quality guaranteed',
        bidDate: '12th January 2026',
        verified: true
      }
    ]
  }

  const filteredBids = auction.bids.filter(bid =>
    bid.celebrityName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAcceptBid = (bidId) => {
    console.log(`Admin viewing bid acceptance for bid ${bidId}`)
    // In real app, this would be admin view only, no actual action
  }

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      {/* Header with back button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/all-auctions')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to All Auctions</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Auction Details</h1>
        <p className="text-gray-600 mt-1">View auction information and all celebrity bids</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Auction Details */}
        <div className="lg:col-span-1 space-y-4">
          {/* Auction Info Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Gavel className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{auction.type}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <User className="w-3 h-3 text-gray-500" />
                  <span className="text-sm text-gray-600">By {auction.memberName}</span>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mb-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  auction.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : auction.status === 'Closed'
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {auction.status}
              </span>
            </div>

            {/* Key Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Ask Price</div>
                  <div className="text-lg font-bold text-yellow-600">{auction.currency} {auction.askPrice}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Due Date</div>
                  <div className="text-sm font-medium text-green-600">{auction.dueDate}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Delivery</div>
                  <div className="text-sm font-medium text-blue-600">{auction.delivery}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Gavel className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Total Bids</div>
                  <div className="text-sm font-medium text-gray-900">{auction.totalBids} bids</div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-sm text-gray-700 mb-4">{auction.description}</p>

            {auction.additionalInfo && (
              <>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Additional Information</h3>
                <p className="text-sm text-gray-600 italic">{auction.additionalInfo}</p>
              </>
            )}
          </div>

          {/* Member Info Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Member Information</h3>
            <div className="flex items-center gap-3">
              <img
                src={auction.memberAvatar}
                alt={auction.memberName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-gray-900">{auction.memberName}</div>
                <div className="text-xs text-gray-500">ID: {auction.memberId}</div>
                <button
                  onClick={() => navigate(`/profile/${auction.memberId}`)}
                  className="text-xs text-blue-600 hover:text-blue-700 mt-1"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Bids List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {/* Header with Search */}
            <div className="p-6 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Celebrity Bids</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {auction.totalBids} {auction.totalBids === 1 ? 'bid' : 'bids'} received
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by celebrity..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Bids List */}
            <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
              {filteredBids.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm ? 'No bids match your search' : 'No bids yet'}
                </div>
              ) : (
                filteredBids.map((bid) => (
                  <div
                    key={bid.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Celebrity Info */}
                      <div className="flex items-start gap-3 flex-1">
                        <img
                          src={bid.celebrityAvatar}
                          alt={bid.celebrityName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{bid.celebrityName}</h3>
                            {bid.verified && (
                              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mb-2">#{bid.celebrityId}</div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                              <span>{bid.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3 text-green-500" />
                              <span>{bid.completionRate}% Completion Rate</span>
                            </div>
                          </div>
                          {bid.message && (
                            <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-2 rounded">
                              {bid.message}
                            </div>
                          )}
                          <div className="text-xs text-gray-400 mt-2">Bid placed: {bid.bidDate}</div>
                        </div>
                      </div>

                      {/* Bid Amount and Action */}
                      <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                        <div className="text-right">
                          <div className="text-xs text-gray-500 mb-1">Bid Amount</div>
                          <div className="text-xl font-bold text-green-600">
                            {bid.currency}{bid.bidAmount}
                          </div>
                        </div>
                        <button
                          onClick={() => navigate(`/profile/${bid.celebrityId}`)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 whitespace-nowrap"
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuctionDetail
