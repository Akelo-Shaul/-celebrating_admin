import React, { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, Calendar, Clock, Users, Eye, DollarSign, TrendingUp, MessageSquare, Gift } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import StreamChatWidget from './live_stream_widgets/StreamChatWidget'
import StreamRevenueWidget from './live_stream_widgets/StreamRevenueWidget'
import StreamAnalyticsWidget from './live_stream_widgets/StreamAnalyticsWidget'
import ViewersListWidget from './live_stream_widgets/ViewersListWidget'
import ViewerDistributionMap from './live_stream_widgets/ViewerDistributionMap'
import StreamGiftsWidget from './live_stream_widgets/StreamGiftsWidget'

const LiveStreamDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Sample live stream data
  const stream = useMemo(() => ({
    id,
    title: decodeURIComponent(id || 'A Day in A Life'),
    thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    host: {
      name: 'Braum Halaberry',
      verified: true,
      avatar: 'B'
    },
    rating: 4.5,
    isLive: true,
    startTime: '9:00 AM',
    duration: '2hr 15m',
    streamedOn: '28-02-2000',
    category: 'Music',
    totalViews: 74243,
    peakViewers: 12500,
    currentViewers: 8943,
    averageViewers: 9200,
    uniqueViewers: 45623,
    totalRevenue: 36987.76,
    superChats: 15240.50,
    gifts: 18547.26,
    subscriptions: 3200.00,
    totalGiftsReceived: 542,
    totalMessages: 15847,
    sentiment: 94,
    likes: 32000,
    shares: 1250,
    description: 'Join me for an exclusive behind-the-scenes look at my daily routine, including studio sessions, creative process, and special surprises!',
    tags: ['Music', 'Live', 'Exclusive']
  }), [id])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-12 gap-6">
        {/* Full Width Metrics */}
        <div className="col-span-12">
          <div className="grid grid-cols-4 gap-4">
            <StatCard
              title="Total Views"
              value={stream.totalViews.toLocaleString()}
              icon={Eye}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
            />
            <StatCard
              title="Current Viewers"
              value={stream.currentViewers.toLocaleString()}
              icon={Users}
              iconBgColor="bg-purple-100"
              iconColor="text-purple-600"
            />
            <StatCard
              title="Total Revenue"
              value={`$${stream.totalRevenue.toLocaleString()}`}
              icon={DollarSign}
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
            />
            <StatCard
              title="Gifts Received"
              value={stream.totalGiftsReceived.toString()}
              icon={Gift}
              iconBgColor="bg-pink-100"
              iconColor="text-pink-600"
            />
          </div>
        </div>

        {/* Left Section - Stream Info */}
        <div className="col-span-5">
          {/* Stream Thumbnail */}
          <div className="w-full h-64 mb-4 relative">
            <img 
              src={stream.thumbnail} 
              alt={stream.title}
              className="w-full h-full rounded-lg object-cover"
            />
            {stream.isLive && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm font-bold">LIVE</span>
              </div>
            )}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-bold">{stream.currentViewers.toLocaleString()}</span>
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-4 bg-gray-300 px-4 py-2 rounded-full w-fit">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`w-5 h-5 ${star <= Math.floor(stream.rating) ? 'fill-orange-500 text-orange-500' : 'fill-gray-400 text-gray-400'}`}
              />
            ))}
          </div>

          {/* Stream Title */}
          <h1 className="text-4xl font-bold mb-4">{stream.title}</h1>

          {/* Host Info */}
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity mb-6"
            onClick={() => navigate(`/profile/${encodeURIComponent(stream.host.name)}`)}
          >
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden">
              <span className="text-white font-bold">{stream.host.avatar}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-600">Host</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{stream.host.name}</span>
                {stream.host.verified && (
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Stream Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">About Stream</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {stream.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-6">
            {stream.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>
    </div>

        {/* Right Section - Stream Details */}
        <div className="col-span-7 space-y-6">
          {/* Stream Info Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Start Time */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Clock className="w-6 h-6 text-gray-700" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">Started At</div>
                  <div className="font-bold text-gray-900">{stream.startTime}</div>
                  <div className="text-sm text-gray-600">Duration: {stream.duration}</div>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-gray-700" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">Date</div>
                  <div className="font-bold text-gray-900">{stream.streamedOn}</div>
                </div>
              </div>

              {/* Peak Viewers */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-gray-700" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">Peak Viewers</div>
                  <div className="font-bold text-gray-900">{stream.peakViewers.toLocaleString()}</div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-gray-700" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-600 mb-1">Total Messages</div>
                  <div className="font-bold text-gray-900">{stream.totalMessages.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Viewer Distribution Map */}
          <ViewerDistributionMap />
        </div>

        {/* Full Width Sections */}
        <div className="col-span-12">
          {/* Revenue and Analytics Row */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-4">
              <StreamRevenueWidget stream={stream} />
            </div>
            <div className="col-span-8">
              <StreamAnalyticsWidget stream={stream} />
            </div>
          </div>

          {/* Chat, Viewers, and Gifts Row */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-4">
              <StreamChatWidget />
            </div>
            <div className="col-span-4">
              <ViewersListWidget />
            </div>
            <div className="col-span-4">
              <StreamGiftsWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveStreamDetail

