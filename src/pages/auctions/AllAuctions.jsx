import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gavel, TrendingUp, Clock, CheckCircle, XCircle, DollarSign } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import StandardTable from '../../components/common/StandardTable'

const AllAuctions = () => {
  const navigate = useNavigate()
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data for auctions
  const auctions = [
    {
      id: 1,
      type: 'Video Shout Out',
      memberName: 'Braun Hallabery',
      memberId: 'user1',
      askPrice: 'KSh 12',
      dueDate: '18th January 2026',
      delivery: '1 Week',
      totalBids: 4,
      highestBid: 'KSh 250',
      status: 'Active',
      description: 'Need a personalized video shout out for my birthday celebration',
      createdAt: '2026-01-10'
    },
    {
      id: 2,
      type: 'Live Video Call',
      memberName: 'Braun Hallabery',
      memberId: 'user1',
      askPrice: 'KSh 50',
      dueDate: '19th January 2026',
      delivery: '1 Week',
      totalBids: 7,
      highestBid: 'KSh 500',
      status: 'Active',
      description: 'Looking for a live video call session',
      createdAt: '2026-01-11'
    },
    {
      id: 3,
      type: 'Social Media Shoutout',
      memberName: 'Braun Hallabery',
      memberId: 'user1',
      askPrice: 'KSh 25',
      dueDate: '19th January 2026',
      delivery: '1 Week',
      totalBids: 5,
      highestBid: 'KSh 254',
      status: 'Closed',
      description: 'video shout out',
      winningBid: 'KSh 254',
      winningCelebrity: 'RuffTone',
      createdAt: '2026-01-09'
    },
    {
      id: 4,
      type: 'Virtual Meet & Greet',
      memberName: 'John Doe',
      memberId: 'user2',
      askPrice: 'KSh 100',
      dueDate: '20th January 2026',
      delivery: '2 Weeks',
      totalBids: 3,
      highestBid: 'KSh 150',
      status: 'Active',
      description: 'Virtual meet and greet session for my community',
      createdAt: '2026-01-12'
    },
    {
      id: 5,
      type: 'Birthday Message',
      memberName: 'Jane Smith',
      memberId: 'user3',
      askPrice: 'KSh 30',
      dueDate: '20th January 2026',
      delivery: '3 Days',
      totalBids: 6,
      highestBid: 'KSh 75',
      status: 'Closed',
      description: 'Personalized birthday message for my daughter',
      winningBid: 'KSh 75',
      winningCelebrity: 'Sarah Johnson',
      createdAt: '2026-01-08'
    },
    {
      id: 6,
      type: 'Corporate Event Appearance',
      memberName: 'Jane Smith',
      memberId: 'user3',
      askPrice: 'KSh 500',
      dueDate: '27th January 2026',
      delivery: '2 Weeks',
      totalBids: 8,
      highestBid: 'KSh 850',
      status: 'Active',
      description: 'Looking for celebrity appearance at corporate event',
      createdAt: '2026-01-13'
    },
    {
      id: 7,
      type: 'Personal Video Message',
      memberName: 'Mike Anderson',
      memberId: 'user4',
      askPrice: 'KSh 20',
      dueDate: '22nd January 2026',
      delivery: '5 Days',
      totalBids: 0,
      highestBid: '-',
      status: 'Pending',
      description: 'Personal video message for anniversary',
      createdAt: '2026-01-13'
    }
  ]

  const filteredAuctions = filterStatus === 'all'
    ? auctions
    : auctions.filter(a => a.status.toLowerCase() === filterStatus.toLowerCase())

  // Stats calculations
  const totalAuctions = auctions.length
  const activeAuctions = auctions.filter(a => a.status === 'Active').length
  const closedAuctions = auctions.filter(a => a.status === 'Closed').length
  const pendingAuctions = auctions.filter(a => a.status === 'Pending').length
  const totalBidsCount = auctions.reduce((sum, a) => sum + a.totalBids, 0)
  const avgBidsPerAuction = totalAuctions > 0 ? (totalBidsCount / totalAuctions).toFixed(1) : 0

  const columns = ['Type', 'Member', 'Ask Price', 'Due Date', 'Bids', 'Highest Bid', 'Status', 'Actions']

  const getStatusBadge = (status) => {
    const statusColors = {
      'Active': 'bg-green-100 text-green-700',
      'Closed': 'bg-gray-100 text-gray-700',
      'Pending': 'bg-yellow-100 text-yellow-700'
    }
    return statusColors[status] || 'bg-gray-100 text-gray-700'
  }

  const renderRow = (auction) => (
    <tr key={auction.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/auction/${auction.id}`)}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <Gavel className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-medium text-gray-900">{auction.type}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{auction.memberName}</div>
        <div className="text-xs text-gray-500">ID: {auction.memberId}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{auction.askPrice}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{auction.dueDate}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{auction.totalBids}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{auction.highestBid}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(auction.status)}`}>
          {auction.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm" onClick={(e) => e.stopPropagation()}>
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          onClick={() => navigate(`/auction/${auction.id}`)}
        >
          View Details
        </button>
      </td>
    </tr>
  )

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Content Auction Management</h1>
        <p className="text-gray-600 mt-1">Monitor and manage all auction requests from members and celebrity bids</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard
          title="Total Auctions"
          value={totalAuctions}
          icon={Gavel}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />
        <StatCard
          title="Active Auctions"
          value={activeAuctions}
          icon={TrendingUp}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          title="Closed Auctions"
          value={closedAuctions}
          icon={CheckCircle}
          iconBgColor="bg-gray-100"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Pending"
          value={pendingAuctions}
          icon={Clock}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />
        <StatCard
          title="Total Bids"
          value={totalBidsCount}
          icon={DollarSign}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Avg Bids/Auction"
          value={avgBidsPerAuction}
          icon={TrendingUp}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      {/* Filter Tabs */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
        {['all', 'active', 'closed', 'pending'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              filterStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <StandardTable
        title={`${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Auctions`}
        columns={columns}
        data={filteredAuctions}
        renderRow={renderRow}
        showFilter={true}
        columnWidths={["18%", "15%", "10%", "12%", "8%", "10%", "10%", "12%"]}
      />
    </div>
  )
}

export default AllAuctions
