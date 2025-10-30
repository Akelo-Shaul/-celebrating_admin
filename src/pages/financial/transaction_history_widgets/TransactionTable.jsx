import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, AlertCircle, Ban, FileText, RefreshCw, Clock, Trash2, Flag } from 'lucide-react'

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
      case 'Completed':
        baseItems.push(
          { icon: Ban, label: 'Cancel Transaction', action: 'cancel', color: 'text-red-600' },
          { icon: Clock, label: 'Hold Transaction', action: 'hold', color: 'text-yellow-600' },
          { icon: FileText, label: 'View Details', action: 'viewDetails', color: 'text-blue-600' }
        )
        break
      case 'Manual Review':
      case 'Failed':
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

const TransactionTable = ({ transactions, showType = false }) => {
  const navigate = useNavigate()
  const [selectAll, setSelectAll] = useState(false)
  const [selectedTransactions, setSelectedTransactions] = useState([])
  const [transactionContextMenu, setTransactionContextMenu] = useState({
    isOpen: false,
    position: { x: 0, y: 0 },
    transaction: null
  })

  const handleSelectAll = () => {
    setSelectAll(!selectAll)
    if (!selectAll) {
      setSelectedTransactions(transactions.map((_, idx) => idx))
    } else {
      setSelectedTransactions([])
    }
  }

  const handleSelectTransaction = (index) => {
    if (selectedTransactions.includes(index)) {
      setSelectedTransactions(selectedTransactions.filter(i => i !== index))
    } else {
      setSelectedTransactions([...selectedTransactions, index])
    }
  }

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
    // Handle the action here
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-600 text-white'
      case 'Pending Review':
        return 'bg-yellow-500 text-black'
      case 'Approving':
        return 'bg-blue-600 text-white'
      case 'Manual Review':
        return 'bg-red-600 text-white'
      case 'Failed':
        return 'bg-red-700 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low':
        return 'bg-cyan-400 text-black'
      case 'Medium':
      case 'Med':
        return 'bg-yellow-400 text-black'
      case 'High':
        return 'bg-red-400 text-black'
      default:
        return 'bg-gray-400 text-black'
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                <input 
                  type="checkbox" 
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="mr-3"
                />
                Transaction ID
              </th>
              {showType && (
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Risk Level</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Method</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction, idx) => (
              <tr 
                key={idx}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onContextMenu={(e) => handleTransactionContextMenu(e, transaction)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input 
                    type="checkbox" 
                    checked={selectedTransactions.includes(idx)}
                    onChange={() => handleSelectTransaction(idx)}
                    className="mr-3" 
                  />
                  <span className="font-medium text-gray-900">{transaction.id}</span>
                </td>
                {showType && (
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded font-semibold text-sm ${
                      transaction.type === 'Deposit' ? 'bg-green-100 text-green-800' :
                      transaction.type === 'Withdrawal' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                )}
                <td className="px-6 py-4">
                  <div 
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => navigate(`/profile/${transaction.user.id}`)}
                  >
                    <img 
                      src={transaction.user.avatar} 
                      alt={transaction.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{transaction.user.name}</div>
                      <div className="text-sm text-gray-500">{transaction.user.username}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center font-semibold text-gray-900">
                  ${transaction.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">
                  {transaction.timestamp}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded font-semibold text-sm whitespace-nowrap ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded font-semibold text-sm ${getRiskColor(transaction.risk)}`}>
                    {transaction.risk}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">
                  {transaction.method}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Context Menu */}
      <TransactionContextMenu
        isOpen={transactionContextMenu.isOpen}
        position={transactionContextMenu.position}
        transaction={transactionContextMenu.transaction}
        onClose={() => setTransactionContextMenu({ ...transactionContextMenu, isOpen: false })}
        onAction={handleTransactionAction}
      />
    </>
  )
}

export default TransactionTable





