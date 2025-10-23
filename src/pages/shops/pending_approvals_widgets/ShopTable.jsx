import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShopTable = ({ shops }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header Section */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Shops</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Shop..."
                className="pl-8 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
              <svg
                className="w-4 h-4 text-gray-700 absolute left-2.5 top-2.5"
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
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Creator</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Wait Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Creator Followers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Creator Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shops.map((shop) => (
              <tr 
                key={shop.name} 
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => navigate(`/store/${encodeURIComponent(shop.name)}`)}
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{shop.name}</div>
                </td>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <div 
                    className="flex items-center cursor-pointer" 
                    onClick={() => navigate(`/profile/${encodeURIComponent(shop.name)}`)}
                  >
                    <img className="h-8 w-8 rounded-full" src={shop.creatorImage} alt="" />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{shop.createdAt}</td>
                <td className="px-6 py-4">
                  <img src={`https://flagcdn.com/w20/${shop.country.toLowerCase()}.png`} alt={shop.country} className="h-4" />
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{shop.waitTime}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{shop.followers}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{shop.category}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{shop.rating}</td>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-4 py-1 rounded-md hover:bg-yellow-200"
                    onClick={() => alert('Approve shop: ' + shop.name)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Approve</span>
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

export default ShopTable;