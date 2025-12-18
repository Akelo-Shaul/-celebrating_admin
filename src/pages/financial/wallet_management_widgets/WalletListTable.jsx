import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Lock, Unlock, User, MessageCircle, DollarSign, BarChart2, AlertTriangle, FileText, TrendingUp } from 'lucide-react';
import { useMessaging } from '../../../contexts/MessagingContext';

// Context Menu Component
const WalletContextMenu = ({ isOpen, position, onClose, wallet, onAction }) => {
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

  if (!isOpen || !wallet) return null;

  const isFrozen = wallet.status.text === 'Frozen';

  const menuItems = [
    {
      icon: Eye,
      label: 'View Wallet',
      action: 'view',
      color: 'text-blue-600'
    },
    {
      icon: User,
      label: 'View User Profile',
      action: 'viewUser',
      color: 'text-purple-600'
    },
    {
      icon: MessageCircle,
      label: 'Message User',
      action: 'message',
      color: 'text-blue-500'
    },
    {
      icon: FileText,
      label: 'View Transactions',
      action: 'viewTransactions',
      color: 'text-indigo-600'
    },
    {
      icon: BarChart2,
      label: 'View Analytics',
      action: 'analytics',
      color: 'text-green-600'
    },
    {
      icon: DollarSign,
      label: 'Adjust Balance',
      action: 'adjustBalance',
      color: 'text-emerald-600'
    },
    {
      icon: isFrozen ? Unlock : Lock,
      label: isFrozen ? 'Unfreeze Wallet' : 'Freeze Wallet',
      action: isFrozen ? 'unfreeze' : 'freeze',
      color: isFrozen ? 'text-green-600' : 'text-yellow-600'
    },
    {
      icon: AlertTriangle,
      label: 'Flag for Review',
      action: 'flag',
      color: 'text-orange-600'
    },
    {
      icon: TrendingUp,
      label: 'Transaction History',
      action: 'history',
      color: 'text-cyan-600'
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
        <div className="font-semibold text-sm text-gray-900">{wallet.user.name}</div>
        <div className="text-xs text-gray-500">{wallet.walletId}</div>
        <div className="text-xs text-gray-500 mt-1">Balance: {wallet.balance.total}</div>
      </div>
      
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action, wallet);
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

const WalletListTable = ({ wallets }) => {
  const navigate = useNavigate();
  const { openMessage } = useMessaging();
  const [contextMenu, setContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, wallet: null });

  const handleContextMenu = (e, wallet) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      wallet
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ isOpen: false, position: { x: 0, y: 0 }, wallet: null });
  };

  const handleAction = (action, wallet) => {
    switch (action) {
      case 'view':
        console.log(`Viewing wallet: ${wallet.user.name}`);
        navigate(`/wallet/${encodeURIComponent(wallet.user.name)}`);
        break;
      case 'viewUser':
        console.log(`Viewing user profile: ${wallet.user.name}`);
        navigate(`/profile/${encodeURIComponent(wallet.user.name)}`);
        break;
      case 'message':
        console.log(`Messaging user: ${wallet.user.name}`);
        openMessage({ name: wallet.user.name, username: wallet.user.handle });
        break;
      case 'viewTransactions':
        console.log(`Viewing transactions for wallet: ${wallet.walletId}`);
        alert(`Opening transactions for wallet ${wallet.walletId}`);
        break;
      case 'analytics':
        console.log(`Viewing analytics for wallet: ${wallet.walletId}`);
        alert(`Opening analytics for wallet ${wallet.walletId}`);
        break;
      case 'adjustBalance':
        console.log(`Adjusting balance for wallet: ${wallet.walletId}`);
        alert(`Opening balance adjustment dialog for wallet ${wallet.walletId}\nCurrent balance: ${wallet.balance.total}`);
        break;
      case 'freeze':
        console.log(`Freezing wallet: ${wallet.walletId}`);
        if (confirm(`Freeze wallet ${wallet.walletId} for ${wallet.user.name}? This will prevent all transactions.`)) {
          alert(`Wallet ${wallet.walletId} has been frozen.`);
        }
        break;
      case 'unfreeze':
        console.log(`Unfreezing wallet: ${wallet.walletId}`);
        if (confirm(`Unfreeze wallet ${wallet.walletId} for ${wallet.user.name}?`)) {
          alert(`Wallet ${wallet.walletId} has been unfrozen.`);
        }
        break;
      case 'flag':
        console.log(`Flagging wallet for review: ${wallet.walletId}`);
        alert(`Wallet ${wallet.walletId} has been flagged for review`);
        break;
      case 'history':
        console.log(`Viewing transaction history for: ${wallet.walletId}`);
        alert(`Opening transaction history for wallet ${wallet.walletId}`);
        break;
      default:
        break;
    }
  };

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
      <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
        {/* Mobile Layout: 2 rows */}
        <div className="md:hidden space-y-3">
          {/* Top Row: Title + Filter Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Wallet List</h2>
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
              placeholder="Search Wallet..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Desktop Layout: Single row */}
        <div className="hidden md:flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Wallet List</h2>
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
                placeholder="Search Wallet..."
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
              <tr 
                key={wallet.id} 
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => navigate(`/wallet/${encodeURIComponent(wallet.user.name)}`)}
                onContextMenu={(e) => handleContextMenu(e, wallet)}
              >
                <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
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

      {/* Context Menu */}
      <WalletContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={closeContextMenu}
        wallet={contextMenu.wallet}
        onAction={handleAction}
      />
    </div>
  );
};

export default WalletListTable;
