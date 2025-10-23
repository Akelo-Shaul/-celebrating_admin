import React from 'react';

const WalletListTable = ({ wallets }) => {
  const columns = [
    '',
    'User',
    'Wallet ID',
    'Balance',
    'Status',
    'Last Transaction',
    'Risk'
  ];

  // Sample data matching the image
  const sampleWallets = wallets && wallets.length > 0 ? wallets : [
    {
      id: 1,
      user: {
        name: "Braum Hallabery",
        handle: "@braum",
        avatar: "B",
        avatarColor: "bg-green-400"
      },
      userTag: {
        text: "Celebrity",
        color: "bg-orange-100 text-orange-800"
      },
      walletId: "WAL-RE-0987684",
      balance: {
        total: "$1,134,452.54",
        available: "$934,452.54",
        pending: "$200,797"
      },
      status: {
        text: "High Value",
        color: "bg-yellow-100 text-yellow-800"
      },
      lastTransaction: {
        time: "2 Hours Ago",
        total: "1234 Total"
      },
      risk: {
        text: "Low",
        color: "bg-blue-100 text-blue-800"
      }
    },
    {
      id: 2,
      user: {
        name: "Braum Hallabery",
        handle: "@braum",
        avatar: "B",
        avatarColor: "bg-orange-400"
      },
      userTag: {
        text: "High Value Individual",
        color: "bg-green-100 text-green-800"
      },
      walletId: "WAL-RE-0987684",
      balance: {
        total: "$1,134,452.54",
        available: "$934,452.54",
        pending: null
      },
      status: {
        text: "Active",
        color: "bg-green-100 text-green-800"
      },
      lastTransaction: {
        time: "2 Hours Ago",
        total: "1234 Total"
      },
      risk: {
        text: "Mid",
        color: "bg-yellow-100 text-yellow-800"
      }
    },
    {
      id: 3,
      user: {
        name: "Braum Hallabery",
        handle: "@braum",
        avatar: "B",
        avatarColor: "bg-orange-400"
      },
      userTag: {
        text: "Verified Member",
        color: "bg-gray-100 text-gray-800"
      },
      walletId: "WAL-RE-0987684",
      balance: {
        total: "$1,134,452.54",
        available: "$934,452.54",
        pending: null
      },
      status: {
        text: "Frozen",
        color: "bg-red-100 text-red-800"
      },
      lastTransaction: {
        time: "2 Hours Ago",
        total: "1234 Total"
      },
      risk: {
        text: "High",
        color: "bg-pink-100 text-pink-800"
      }
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Wallet List</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Wallet ..."
                className="pl-8 pr-4 py-1.5 border rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
              <svg
                className="w-4 h-4 text-gray-700 absolute left-2.5 top-2"
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
            <button className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-md flex items-center space-x-1 hover:bg-gray-200">
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
          <tbody className="bg-gray-100 divide-y divide-gray-200">
            {sampleWallets.map((wallet, index) => (
              <tr key={wallet.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className={`h-10 w-10 ${wallet.user.avatarColor} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
                        {wallet.user.avatar}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm font-medium text-gray-900">{wallet.user.name}</div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${wallet.userTag.color}`}>
                          {wallet.userTag.text}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700">{wallet.user.handle}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {wallet.walletId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{wallet.balance.total}</div>
                    <div className="text-xs text-gray-700">Available {wallet.balance.available}</div>
                    {wallet.balance.pending && (
                      <div className="text-xs text-gray-700">Pending {wallet.balance.pending}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${wallet.status.color}`}>
                    {wallet.status.text}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm text-gray-900">{wallet.lastTransaction.time}</div>
                    <div className="text-xs text-gray-700">{wallet.lastTransaction.total}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${wallet.risk.color}`}>
                    {wallet.risk.text}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WalletListTable;
