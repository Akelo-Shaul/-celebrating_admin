import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Ban, User, MessageCircle, BarChart2, Archive, Trash2, TrendingUp } from 'lucide-react';
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
      icon: Edit,
      label: 'Edit Shop',
      action: 'edit',
      color: 'text-indigo-600'
    },
    {
      icon: User,
      label: 'View Owner Profile',
      action: 'viewOwner',
      color: 'text-purple-600'
    },
    {
      icon: MessageCircle,
      label: 'Message Owner',
      action: 'message',
      color: 'text-blue-500'
    },
    {
      icon: BarChart2,
      label: 'View Analytics',
      action: 'analytics',
      color: 'text-green-600'
    },
    {
      icon: TrendingUp,
      label: 'Boost Shop',
      action: 'boost',
      color: 'text-orange-600'
    },
    {
      icon: Ban,
      label: 'Suspend Shop',
      action: 'suspend',
      color: 'text-yellow-600'
    },
    {
      icon: Archive,
      label: 'Archive Shop',
      action: 'archive',
      color: 'text-gray-600'
    },
    {
      icon: Trash2,
      label: 'Delete Shop',
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
        <div className="text-xs text-gray-500">Rating: {shop.rating} • {shop.followers} followers</div>
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

const ShopTable = ({ shops, category }) => {
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
      case 'edit':
        console.log(`Editing shop: ${shop.name}`);
        alert(`Opening edit dialog for shop "${shop.name}"`);
        break;
      case 'viewOwner':
        console.log(`Viewing owner profile for shop: ${shop.name}`);
        navigate(`/profile/${encodeURIComponent(shop.name)}`);
        break;
      case 'message':
        console.log(`Messaging owner of shop: ${shop.name}`);
        openMessage({ name: shop.name, username: `@${shop.name}` });
        break;
      case 'analytics':
        console.log(`Viewing analytics for shop: ${shop.name}`);
        alert(`Opening analytics for shop "${shop.name}"`);
        break;
      case 'boost':
        console.log(`Boosting shop: ${shop.name}`);
        alert(`Boosting shop "${shop.name}" for increased visibility`);
        break;
      case 'suspend':
        console.log(`Suspending shop: ${shop.name}`);
        if (confirm(`Suspend shop "${shop.name}"? The shop will be temporarily unavailable.`)) {
          alert(`Shop "${shop.name}" has been suspended.`);
        }
        break;
      case 'archive':
        console.log(`Archiving shop: ${shop.name}`);
        if (confirm(`Archive shop "${shop.name}"?`)) {
          alert(`Shop "${shop.name}" has been archived.`);
        }
        break;
      case 'delete':
        console.log(`Deleting shop: ${shop.name}`);
        if (confirm(`Delete shop "${shop.name}"? This action cannot be undone.`)) {
          alert(`Shop "${shop.name}" has been deleted.`);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow mt-6">
      {/* Header Section */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">{category} Shops</h2>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sales Volume ($)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Order Volume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Followers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Trend</th>
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
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">{shop.name}</div>
                    <div className="mt-1 text-xs text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md inline-block">
                      {shop.products} products
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <div 
                    className="flex items-center cursor-pointer" 
                    onClick={() => navigate(`/profile/${encodeURIComponent(shop.name)}`)}
                  >
                    <img className="h-8 w-8 rounded-full" src={shop.ownerImage} alt="" />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{shop.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center">
                    <img src={`https://flagcdn.com/w20/${shop.country.toLowerCase()}.png`} alt={shop.country} className="h-4" />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{shop.salesVolume}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{shop.orderVolume}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{shop.followers}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{shop.rating}</td>
                <td className="px-6 py-4">
                  {shop.trend === 'up' ? (
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                    </svg>
                  )}
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