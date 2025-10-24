import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActiveEscrowsTable = ({ escrows }) => {
  const navigate = useNavigate();
  const columns = [
    '',
    'Escrow Id',
    'Buyer',
    'Seller',
    'Product',
    'Amount',
    'Status',
    'Age',
    'Release In'
  ];

  // Sample data matching the image
  const sampleEscrows = escrows && escrows.length > 0 ? escrows : [
    {
      id: 1,
      escrowId: "ESC-2025-0987684",
      date: "Sep 29, 2025",
      buyer: {
        name: "Tank Harm",
        handle: "@Tank",
        avatar: "T"
      },
      seller: {
        name: "Braum Hallabery",
        handle: "@braum",
        avatar: "B"
      },
      product: {
        name: "Celebrity Shoutout",
        image: null
      },
      amount: 500,
      status: {
        text: "Payment confirmed",
        type: "confirmed"
      },
      age: "1d",
      releaseIn: "5d"
    },
    {
      id: 2,
      escrowId: "ESC-2025-0987684",
      date: "Sep 29, 2025",
      buyer: {
        name: "Tank Harm",
        handle: "@Tank",
        avatar: "T"
      },
      seller: {
        name: "Braum Hallabery",
        handle: "@braum",
        avatar: "B"
      },
      product: {
        name: "Toda Headphones",
        image: "headphones.jpg"
      },
      amount: 500,
      status: {
        text: "Disputed",
        type: "disputed"
      },
      age: "2d",
      releaseIn: "3d"
    },
    {
      id: 3,
      escrowId: "ESC-2025-0987684",
      date: "Sep 29, 2025",
      buyer: {
        name: "Tank Harm",
        handle: "@Tank",
        avatar: "T"
      },
      seller: {
        name: "Braum Hallabery",
        handle: "@braum",
        avatar: "B"
      },
      product: {
        name: "Celebrity Shoutout",
        image: null
      },
      amount: 500,
      status: {
        text: "Pending Release",
        type: "pending"
      },
      age: "2d",
      releaseIn: "3d"
    }
  ];

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    switch (status.type) {
      case 'confirmed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'disputed':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'pending':
        return `${baseClasses} bg-gray-100 text-gray-800 flex items-center space-x-1`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Active Escrows List</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Escrow..."
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
            {sampleEscrows.map((escrow, index) => (
              <tr key={escrow.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{escrow.escrowId}</div>
                    <div className="text-sm text-gray-700">{escrow.date}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <div className="h-8 w-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {escrow.buyer.avatar}
                      </div>
                    </div>
                    <div className="ml-3 cursor-pointer" onClick={() => navigate(`/profile/${encodeURIComponent(escrow.buyer.handle)}`, { state: { role: 'member' } })}>
                      <div className="text-sm font-medium text-gray-900">{escrow.buyer.name}</div>
                      <div className="text-sm text-gray-700">{escrow.buyer.handle}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <div className="h-8 w-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {escrow.seller.avatar}
                      </div>
                    </div>
                    <div className="ml-3 cursor-pointer" onClick={() => navigate(`/profile/${encodeURIComponent(escrow.seller.handle)}`, { state: { role: 'celebrity' } })}>
                      <div className="text-sm font-medium text-gray-900">{escrow.seller.name}</div>
                      <div className="text-sm text-gray-700">{escrow.seller.handle}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {escrow.product.image ? (
                      <div className="flex-shrink-0 h-8 w-8">
                        <img className="h-8 w-8 rounded object-cover" src={escrow.product.image} alt="" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center">
                          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{escrow.product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${escrow.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(escrow.status)}>
                    {escrow.status.type === 'pending' && (
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {escrow.status.text}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {escrow.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {escrow.releaseIn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Priority Legend */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-end space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-xs text-gray-600">High Priority</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-xs text-gray-600">Urgent</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="text-xs text-gray-600">Critical</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveEscrowsTable;
