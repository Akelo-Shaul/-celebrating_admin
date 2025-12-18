import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, CheckCircle, XCircle, User, MessageCircle, FileText, BarChart2, Trash2 } from 'lucide-react';
import { useMessaging } from '../../../contexts/MessagingContext';

// Context Menu Component
const ShopContextMenu = ({ isOpen, position, onClose, shop, onAction }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !shop) return null;

  const menuItems = [
    {
      icon: Eye,
      label: 'View Shop',
      action: 'view',
      color: 'text-blue-600'
    },
    {
      icon: CheckCircle,
      label: 'Approve Shop',
      action: 'approve',
      color: 'text-green-600'
    },
    {
      icon: XCircle,
      label: 'Reject Shop',
      action: 'reject',
      color: 'text-red-600'
    },
    {
      icon: User,
      label: 'View Creator Profile',
      action: 'viewCreator',
      color: 'text-purple-600'
    },
    {
      icon: MessageCircle,
      label: 'Message Creator',
      action: 'message',
      color: 'text-blue-500'
    },
    {
      icon: FileText,
      label: 'Request More Info',
      action: 'requestInfo',
      color: 'text-orange-600'
    },
    {
      icon: BarChart2,
      label: 'View Analytics',
      action: 'analytics',
      color: 'text-indigo-600'
    },
    {
      icon: Trash2,
      label: 'Delete Request',
      action: 'delete',
      color: 'text-red-700'
    }
  ];

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="font-semibold text-sm text-gray-900">{shop.name}</div>
        <div className="text-xs text-gray-500">Wait time: {shop.waitTime}</div>
      </div>
      
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action, shop);
            onClose();
          }}
          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
        >
          <item.icon size={16} className={item.color} />
          <span className={`text-sm ${item.color}`}>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

const ShopTable = ({ shops }) => {
  const navigate = useNavigate();
  const { openMessage } = useMessaging();
  const [contextMenu, setContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, shop: null });

  const handleContextMenu = (e, shop) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      shop
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ isOpen: false, position: { x: 0, y: 0 }, shop: null });
  };

  const handleAction = (action, shop) => {
    switch (action) {
      case 'view':
        console.log(`Viewing shop: ${shop.name}`);
        navigate(`/store/${encodeURIComponent(shop.name)}`);
        break;
      case 'approve':
        console.log(`Approving shop: ${shop.name}`);
        if (confirm(`Approve shop "${shop.name}"?`)) {
          alert(`Shop "${shop.name}" has been approved!`);
        }
        break;
      case 'reject':
        console.log(`Rejecting shop: ${shop.name}`);
        if (confirm(`Reject shop "${shop.name}"? The creator will be notified.`)) {
          alert(`Shop "${shop.name}" has been rejected.`);
        }
        break;
      case 'viewCreator':
        console.log(`Viewing creator profile for shop: ${shop.name}`);
        navigate(`/profile/${encodeURIComponent(shop.name)}`);
        break;
      case 'message':
        console.log(`Messaging creator of shop: ${shop.name}`);
        openMessage({ name: shop.name, username: `@${shop.name}` });
        break;
      case 'requestInfo':
        console.log(`Requesting more info for shop: ${shop.name}`);
        alert(`Requesting additional information from creator of "${shop.name}"`);
        break;
      case 'analytics':
        console.log(`Viewing analytics for shop: ${shop.name}`);
        alert(`Opening analytics for shop "${shop.name}"`);
        break;
      case 'delete':
        console.log(`Deleting shop request: ${shop.name}`);
        if (confirm(`Delete shop request "${shop.name}"? This action cannot be undone.`)) {
          alert(`Shop request "${shop.name}" has been deleted.`);
        }
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header Section */}
      <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
        {/* Mobile Layout: 2 rows */}
        <div className="md:hidden space-y-3">
          {/* Top Row: Title + Filter Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Shops</h2>
            <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
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

          {/* Bottom Row: Search Field (Full Width) */}
          <div className="relative w-full">
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10"
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
            <input
              type="text"
              placeholder="Search Shop..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Desktop Layout: Single row */}
        <div className="hidden md:flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Shops</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg
                className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10"
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
              <input
                type="text"
                placeholder="Search Shop..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
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
                onContextMenu={(e) => handleContextMenu(e, shop)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center">
                    <img src={`https://flagcdn.com/w20/${shop.country.toLowerCase()}.png`} alt={shop.country} className="h-4" />
                  </div>
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

      {/* Context Menu */}
      <ShopContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={closeContextMenu}
        shop={contextMenu.shop}
        onAction={handleAction}
      />
    </div>
  );
};

export default ShopTable;