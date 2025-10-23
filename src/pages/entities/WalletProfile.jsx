import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, Mail, Phone, BadgeCheck, ChevronDown, Search, SlidersHorizontal, ArrowDown, ArrowUp, Eye, EyeOff, CheckCircle, XCircle, AlertCircle, Ban, FileText, RefreshCw, Clock, Trash2, Flag } from 'lucide-react'
import * as Flags from 'country-flag-icons/react/3x2'

// Transaction Context Menu Component
const TransactionContextMenu = ({ isOpen, position, onClose, transaction, onAction }) => {
  useEffect(() => {
    const handleClickOutside = () => onClose()
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !transaction) return null

  const getMenuItems = () => {
    const baseItems = []
    
    switch (transaction.status) {
      case 'Pending Review':
        baseItems.push(
          { icon: CheckCircle, label: 'Approve Transaction', action: 'approve', color: 'text-green-600' },
          { icon: XCircle, label: 'Reject Transaction', action: 'reject', color: 'text-red-600' },
          { icon: Clock, label: 'Request More Info', action: 'requestInfo', color: 'text-blue-600' },
          { icon: Flag, label: 'Flag as Suspicious', action: 'flag', color: 'text-orange-600' }
        )
        break
      case 'Approving':
        baseItems.push(
          { icon: Ban, label: 'Cancel Transaction', action: 'cancel', color: 'text-red-600' },
          { icon: Clock, label: 'Hold Transaction', action: 'hold', color: 'text-yellow-600' },
          { icon: FileText, label: 'View Details', action: 'viewDetails', color: 'text-blue-600' }
        )
        break
      case 'Manual Review':
        baseItems.push(
          { icon: CheckCircle, label: 'Approve After Review', action: 'approve', color: 'text-green-600' },
          { icon: XCircle, label: 'Reject & Refund', action: 'rejectRefund', color: 'text-red-600' },
          { icon: AlertCircle, label: 'Escalate to Senior', action: 'escalate', color: 'text-purple-600' },
          { icon: Ban, label: 'Block User', action: 'blockUser', color: 'text-red-700' }
        )
        break
      default:
        baseItems.push(
          { icon: FileText, label: 'View Details', action: 'viewDetails', color: 'text-blue-600' },
          { icon: RefreshCw, label: 'Retry Transaction', action: 'retry', color: 'text-green-600' }
        )
    }

    baseItems.push(
      { icon: FileText, label: 'Download Receipt', action: 'download', color: 'text-gray-700' },
      { icon: Trash2, label: 'Delete Transaction', action: 'delete', color: 'text-red-600' }
    )

    return baseItems
  }

  const menuItems = getMenuItems()

  return (
    <div 
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 min-w-[200px]"
      style={{ 
        top: `${position.y}px`, 
        left: `${position.x}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action, transaction)
            onClose()
          }}
          className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 transition-colors"
        >
          <item.icon size={16} className={item.color} />
          <span className={`text-sm ${item.color}`}>{item.label}</span>
        </button>
      ))}
    </div>
  )
}

const WalletProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All Transactions')
  const [showMpesa, setShowMpesa] = useState(false)
  const [showBank, setShowBank] = useState(false)
  const [showBinance, setShowBinance] = useState(false)
  const [transactionContextMenu, setTransactionContextMenu] = useState({
    isOpen: false,
    position: { x: 0, y: 0 },
    transaction: null
  })

  // Mock data for the wallet
  const walletData = {
    user: {
      name: 'Braum Halaberry',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 3,
      verified: true,
      nationality: 'Kenyan',
      country: 'KE',
      location: 'Kenya',
      email: 'braum.h@gmail.com',
      phone: '+254 708 045 985'
    },
    balance: {
      active: 456246.32,
      pending: 456246.32,
      escrow: 456246.32,
      deposits: 456246.32,
      withdrawals: 456246.32
    },
    stats: {
      transactions: 134975,
      activeOn: '12-07-24 11:45'
    },
    paymentMethods: {
      mpesa: { masked: '070*******87', full: '0701234567' },
      bank: { masked: '76** - **** - **** - *793', full: '7612 - 3456 - 7890 - 1793' },
      binance: { masked: 'thumbran@gmail.com', full: 'thumbran@gmail.com' }
    },
    transactions: [
      {
        id: 'DEP-RE-0987684',
        to: { name: 'Braum Hallabery', username: '@braum', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', ringColor: 'green' },
        amount: 23500,
        timestamp: '30/09/25 14:00:32',
        status: 'Pending Review',
        statusColor: 'yellow',
        risk: 'Low',
        riskColor: 'cyan'
      },
      {
        id: 'DEP-RE-0987684',
        to: { name: 'Braum Hallabery', username: '@braum', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', ringColor: 'orange' },
        amount: 15000,
        timestamp: '30/09/25 14:00:32',
        status: 'Approving',
        statusColor: 'green',
        risk: 'Med',
        riskColor: 'yellow'
      },
      {
        id: 'DEP-RE-0987684',
        to: { name: 'Braum Hallabery', username: '@braum', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', ringColor: 'orange' },
        amount: 100000,
        timestamp: '30/09/25 14:00:32',
        status: 'Manual Review',
        statusColor: 'red',
        risk: 'High',
        riskColor: 'red'
      }
    ]
  }

  const tabs = ['All Transactions', 'Deposits', 'Withdrawals', 'Escrow']

  const handleTransactionContextMenu = (e, transaction) => {
    e.preventDefault()
    setTransactionContextMenu({
      isOpen: true,
      position: { x: e.pageX, y: e.pageY },
      transaction
    })
  }

  const handleTransactionAction = (action, transaction) => {
    console.log(`Action: ${action}`, transaction)
    // Handle the action here (e.g., API calls, state updates, etc.)
    switch (action) {
      case 'approve':
        console.log('Approving transaction:', transaction.id)
        break
      case 'reject':
        console.log('Rejecting transaction:', transaction.id)
        break
      case 'flag':
        console.log('Flagging transaction:', transaction.id)
        break
      case 'delete':
        console.log('Deleting transaction:', transaction.id)
        break
      default:
        console.log('Unknown action:', action)
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Top Section */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Left - User Profile */}
        <div className="col-span-3">
          <div className="p-3">
            {/* Profile Image */}
            <div className="mb-4">
              <img 
                src={walletData.user.avatar} 
                alt={walletData.user.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            {/* Star Rating */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-6 h-6 ${star <= walletData.user.rating ? 'text-orange-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Name */}
            <h2 className="text-2xl font-bold mb-4">{walletData.user.name}</h2>

            {/* Verified Badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-yellow-400 px-3 py-1 rounded-full flex items-center gap-1">
                <BadgeCheck className="w-4 h-4 text-orange-500" fill="currentColor" />
                <span className="text-sm font-semibold">Verified</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded">
                {React.createElement(Flags[walletData.user.country], { className: 'w-5 h-3' })}
                <span className="text-sm font-medium">{walletData.user.nationality}</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{walletData.user.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>{walletData.user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>{walletData.user.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Balance Section */}
        <div className="col-span-6">
          <div className="bg-gray-300 rounded-lg p-6">
            {/* Balance Header */}
            <h3 className="text-xl font-bold mb-2">Balance</h3>
            
            {/* Active Balance */}
            <div className="mb-6">
              <div className="text-sm text-green-600 font-semibold mb-1">Active Balance</div>
              <div className="text-6xl font-bold mb-4">$ {walletData.balance.active.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>

            {/* Pending and Escrow Balance */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm text-orange-600 font-semibold mb-1">Pending Balance</div>
                <div className="text-3xl font-bold">$ {walletData.balance.pending.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
              <div>
                <div className="text-sm text-blue-600 font-semibold mb-1">Escrow Balance</div>
                <div className="text-3xl font-bold">$ {walletData.balance.escrow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
            </div>

            {/* Deposits and Withdrawals */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-400 rounded-lg p-4 flex items-center gap-3">
                <div className="bg-blue-500 rounded-full p-2">
                  <ArrowDown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold">$ {walletData.balance.deposits.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className="text-sm">Deposits</div>
                </div>
              </div>
              <div className="bg-pink-300 rounded-lg p-4 flex items-center gap-3">
                <div className="bg-pink-400 rounded-full p-2">
                  <ArrowUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold">$ {walletData.balance.withdrawals.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className="text-sm">Withdrawals</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-4xl font-bold">{walletData.stats.transactions.toLocaleString()}</span>
                <span className="text-sm ml-2">Transactions</span>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-600">Active On</div>
                <div className="text-lg font-bold">{walletData.stats.activeOn}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Payment Methods */}
        <div className="col-span-3">
          <div className="bg-rose-300 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6">Payment Methods</h3>
            
            <div className="space-y-4">
              {/* Mpesa */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-semibold">Mpesa</div>
                  <button
                    onClick={() => setShowMpesa(!showMpesa)}
                    className="p-1 hover:bg-rose-400 rounded transition-colors"
                  >
                    {showMpesa ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="text-2xl font-bold">
                  {showMpesa ? walletData.paymentMethods.mpesa.full : walletData.paymentMethods.mpesa.masked}
                </div>
              </div>

              {/* Bank */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-semibold">Bank</div>
                  <button
                    onClick={() => setShowBank(!showBank)}
                    className="p-1 hover:bg-rose-400 rounded transition-colors"
                  >
                    {showBank ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="text-xl font-bold">
                  {showBank ? walletData.paymentMethods.bank.full : walletData.paymentMethods.bank.masked}
                </div>
              </div>

              {/* Binance */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-semibold">Binance</div>
                  <button
                    onClick={() => setShowBinance(!showBinance)}
                    className="p-1 hover:bg-rose-400 rounded transition-colors"
                  >
                    {showBinance ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="text-xl font-bold break-all">
                  {showBinance ? walletData.paymentMethods.binance.full : walletData.paymentMethods.binance.masked}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Transaction List</h2>

          {/* Tabs */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-semibold ${
                    activeTab === tab
                      ? 'text-yellow-500 border-b-3 border-yellow-500'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Transaction ..."
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm w-80"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold">
                <SlidersHorizontal className="w-5 h-5" />
                Filter
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-400">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" className="w-4 h-4" />
                  </th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Transaction ID</th>
                  <th className="px-4 py-3 text-left font-semibold">To</th>
                  <th className="px-4 py-3 text-left font-semibold">Amount ($)</th>
                  <th className="px-4 py-3 text-left font-semibold">Timestamp</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">Risk</th>
                </tr>
              </thead>
              <tbody>
                {walletData.transactions.map((transaction, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors"
                    onContextMenu={(e) => handleTransactionContextMenu(e, transaction)}
                  >
                    <td className="px-4 py-4">
                      <input type="checkbox" className="w-4 h-4" />
                    </td>
                    <td className="px-4 py-4 font-semibold whitespace-nowrap">{transaction.id}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full border-4 ${
                          transaction.to.ringColor === 'green' ? 'border-green-500' : 'border-orange-500'
                        } overflow-hidden`}>
                          <img 
                            src={transaction.to.avatar} 
                            alt={transaction.to.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold">{transaction.to.name}</div>
                          <div className="text-sm text-gray-600">{transaction.to.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-semibold">{transaction.amount.toLocaleString()}</td>
                    <td className="px-4 py-4">{transaction.timestamp}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-block px-3 py-1 rounded font-semibold text-sm whitespace-nowrap ${
                        transaction.statusColor === 'yellow' ? 'bg-yellow-500 text-black' :
                        transaction.statusColor === 'green' ? 'bg-green-600 text-white' :
                        'bg-red-600 text-white'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded font-semibold text-sm ${
                        transaction.riskColor === 'cyan' ? 'bg-cyan-400 text-black' :
                        transaction.riskColor === 'yellow' ? 'bg-yellow-400 text-black' :
                        'bg-red-300 text-black'
                      }`}>
                        {transaction.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Transaction Context Menu */}
      <TransactionContextMenu
        isOpen={transactionContextMenu.isOpen}
        position={transactionContextMenu.position}
        transaction={transactionContextMenu.transaction}
        onClose={() => setTransactionContextMenu({ ...transactionContextMenu, isOpen: false })}
        onAction={handleTransactionAction}
      />
    </div>
  )
}

export default WalletProfile

