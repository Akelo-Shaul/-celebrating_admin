import React from 'react'

const RecentTransactions = () => {
  const transactions = [
    {
      id: 'TXN-45678',
      type: 'Shop Commission',
      user: 'Mtumba Connect',
      amount: '$234.50',
      status: 'completed',
      date: '2 min ago',
      badge: 'Commission'
    },
    {
      id: 'TXN-45677',
      type: 'Event Ticket',
      user: 'Music Festival 2024',
      amount: '$1,250.00',
      status: 'completed',
      date: '5 min ago',
      badge: 'Ticket'
    },
    {
      id: 'TXN-45676',
      type: 'Transaction Fee',
      user: 'John Doe',
      amount: '$12.75',
      status: 'completed',
      date: '8 min ago',
      badge: 'Fee'
    },
    {
      id: 'TXN-45675',
      type: 'Gift/Tip',
      user: 'Braum Halaberry',
      amount: '$50.00',
      status: 'pending',
      date: '12 min ago',
      badge: 'Gift'
    },
    {
      id: 'TXN-45674',
      type: 'Subscription',
      user: 'Premium User',
      amount: '$9.99',
      status: 'completed',
      date: '15 min ago',
      badge: 'Subscription'
    }
  ]

  const getBadgeColor = (badge) => {
    const colors = {
      'Commission': 'bg-blue-100 text-blue-800',
      'Ticket': 'bg-orange-100 text-orange-800',
      'Fee': 'bg-green-100 text-green-800',
      'Gift': 'bg-red-100 text-red-800',
      'Subscription': 'bg-purple-100 text-purple-800'
    }
    return colors[badge] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Transaction ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User/Source</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Amount</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{transaction.id}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getBadgeColor(transaction.badge)}`}>
                    {transaction.badge}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{transaction.user}</td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">{transaction.amount}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                    transaction.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 text-right">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentTransactions





