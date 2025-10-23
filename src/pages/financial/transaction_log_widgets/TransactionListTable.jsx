import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TransactionListTable = ({ transactions }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('deposits');
  
  const columns = [
    '',
    'Transaction ID',
    'User',
    'Amount ($)',
    'Timestamp',
    'Status',
    'Risk',
    'Actions'
  ];

  const tabs = [
    { id: 'deposits', label: 'Deposits' },
    { id: 'withdrawals', label: 'Withdrawals' },
    { id: 'pending-deposits', label: 'Pending Deposits' },
    { id: 'pending-withdrawals', label: 'Pending Withdrawals' }
  ];

  // Sample data matching the image
  const sampleTransactions = transactions && transactions.length > 0 ? transactions : [
    {
      id: 1,
      transactionId: "DEP-RE-0987684",
      user: {
        name: "Braum Hallabery",
        handle: "@braum",
        avatar: "B",
        avatarColor: "bg-orange-400"
      },
      amount: "23,500",
      timestamp: "30/09/25 14:00:32",
      status: {
        text: "Pending Review",
        color: "bg-yellow-100 text-yellow-800"
      },
      risk: {
        text: "Low",
        color: "bg-blue-100 text-blue-800"
      }
    },
    {
      id: 2,
      transactionId: "DEP-RE-0987684",
      user: {
        name: "Braum Hallabery",
        handle: "@braum",
        avatar: "B",
        avatarColor: "bg-orange-400"
      },
      amount: "15,000",
      timestamp: "30/09/25 14:00:32",
      status: {
        text: "Approving",
        color: "bg-green-100 text-green-800"
      },
      risk: {
        text: "Mid",
        color: "bg-yellow-100 text-yellow-800"
      }
    },
    {
      id: 3,
      transactionId: "DEP-RE-0987684",
      user: {
        name: "Braum Hallabery",
        handle: "@braum",
        avatar: "B",
        avatarColor: "bg-orange-400"
      },
      amount: "100,000",
      timestamp: "30/09/25 14:00:32",
      status: {
        text: "Manual Review",
        color: "bg-red-100 text-red-800"
      },
      risk: {
        text: "High",
        color: "bg-red-100 text-red-800"
      }
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header with Tabs */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h2 className="text-lg font-bold text-gray-900">Transaction List</h2>
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-yellow-500 text-gray-900 font-bold'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Transaction..."
                className="pl-8 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
              <svg
                className="w-4 h-4 text-gray-500 absolute left-2.5 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md flex items-center space-x-1 hover:bg-gray-200">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sampleTransactions.map((transaction, index) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.transactionId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <div className={`h-8 w-8 ${transaction.user.avatarColor} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
                        {transaction.user.avatar}
                      </div>
                    </div>
                    <div className="ml-3 cursor-pointer" onClick={() => navigate(`/profile/${encodeURIComponent(transaction.user.handle)}`, { state: { role: 'member' } })}>
                      <div className="text-sm font-medium text-gray-900">{transaction.user.name}</div>
                      <div className="text-sm text-gray-500">{transaction.user.handle}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.timestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.status.color}`}>
                    {transaction.status.text}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.risk.color}`}>
                    {transaction.risk.text}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionListTable;
