import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Flags from 'country-flag-icons/react/3x2'
import { countryToCode } from '../shop_widgets/countryUtils'
import { Eye, Lock, Unlock, AlertTriangle, Ban, TrendingUp, FileText, DollarSign } from 'lucide-react'

// Wallet Context Menu Component
const WalletContextMenu = ({ isOpen, position, onClose, wallet, onAction }) => {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !wallet) return null

  const menuItems = [
    {
      icon: Eye,
      label: 'View Wallet Details',
      action: 'view',
      color: 'text-blue-600'
    },
    {
      icon: FileText,
      label: 'View Transactions',
      action: 'transactions',
      color: 'text-purple-600'
    },
    {
      icon: TrendingUp,
      label: 'View Analytics',
      action: 'analytics',
      color: 'text-green-600'
    },
    {
      icon: Lock,
      label: 'Freeze Wallet',
      action: 'freeze',
      color: 'text-orange-600'
    },
    {
      icon: Unlock,
      label: 'Unfreeze Wallet',
      action: 'unfreeze',
      color: 'text-green-600'
    },
    {
      icon: AlertTriangle,
      label: 'Flag for Review',
      action: 'flag',
      color: 'text-yellow-600'
    },
    {
      icon: DollarSign,
      label: 'Adjust Balance',
      action: 'adjustBalance',
      color: 'text-gray-700'
    },
    {
      icon: Ban,
      label: 'Suspend Wallet',
      action: 'suspend',
      color: 'text-red-600'
    }
  ]

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="font-semibold text-sm text-gray-900">{wallet.owner}</div>
        <div className="text-xs text-gray-500">{wallet.handle} • ${wallet.balance.toLocaleString()}</div>
      </div>
      
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action, wallet)
            onClose()
          }}
          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
        >
          <item.icon size={16} className={item.color} />
          <span className={`text-sm ${item.color}`}>{item.label}</span>
        </button>
      ))}
    </div>
  )
}

// Wallets Overview (Largest Wallets)
// Columns: Owner, Country, Wallet Balance ($), Tx Volume
const LargestWallets = ({ wallets = [] }) => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [walletContextMenu, setWalletContextMenu] = useState({ 
    isOpen: false, 
    position: { x: 0, y: 0 }, 
    wallet: null 
  })

  const rows = (wallets.length ? wallets : [
    { owner: 'Braum Hallabery', handle: '@braum', country: 'Kenya', balance: 1134452.54, txVolume: 34500 },
    { owner: 'Shaul Akelo', handle: '@shaul', country: 'Kenya', balance: 834452.54, txVolume: 24500 },
    { owner: 'Hankue Hue', handle: '@hankue', country: 'Kenya', balance: 624452.54, txVolume: 19500 },
    { owner: 'Paward Chung', handle: '@paward', country: 'Kenya', balance: 504452.54, txVolume: 16500 },
    { owner: 'Hang Turm', handle: '@hang', country: 'Kenya', balance: 404452.54, txVolume: 12500 },
  ]).filter(r => r.owner.toLowerCase().includes(query.trim().toLowerCase()))

  const handleWalletContextMenu = (e, wallet) => {
    e.preventDefault()
    e.stopPropagation()
    setWalletContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      wallet
    })
  }

  const closeWalletContextMenu = () => {
    setWalletContextMenu({ isOpen: false, position: { x: 0, y: 0 }, wallet: null })
  }

  const handleWalletAction = (action, wallet) => {
    switch (action) {
      case 'view':
        console.log(`Viewing wallet: ${wallet.owner}`)
        navigate(`/wallet/${encodeURIComponent(wallet.owner)}`)
        break
      case 'transactions':
        console.log(`Viewing transactions for: ${wallet.owner}`)
        alert(`Opening transaction history for ${wallet.owner}`)
        break
      case 'analytics':
        console.log(`Viewing analytics for: ${wallet.owner}`)
        alert(`Opening analytics dashboard for ${wallet.owner}'s wallet`)
        break
      case 'freeze':
        console.log(`Freezing wallet: ${wallet.owner}`)
        if (window.confirm(`Are you sure you want to freeze ${wallet.owner}'s wallet?`)) {
          alert(`Wallet frozen for ${wallet.owner}`)
        }
        break
      case 'unfreeze':
        console.log(`Unfreezing wallet: ${wallet.owner}`)
        alert(`Wallet unfrozen for ${wallet.owner}`)
        break
      case 'flag':
        console.log(`Flagging wallet for review: ${wallet.owner}`)
        alert(`Wallet flagged for review: ${wallet.owner}`)
        break
      case 'adjustBalance':
        console.log(`Adjusting balance for: ${wallet.owner}`)
        alert(`Opening balance adjustment dialog for ${wallet.owner}`)
        break
      case 'suspend':
        console.log(`Suspending wallet: ${wallet.owner}`)
        if (window.confirm(`Are you sure you want to suspend ${wallet.owner}'s wallet? This action requires admin approval.`)) {
          alert(`Wallet suspension initiated for ${wallet.owner}`)
        }
        break
      default:
        break
    }
  }

  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      {/* Mobile Layout: 2 rows */}
      <div className="md:hidden space-y-3 mb-3">
        {/* Top Row: Title + Filter Button */}
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Largest Wallets</h4>
          <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>

        {/* Bottom Row: Search Field (Full Width) */}
        <div className="relative w-full">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search Owner..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Desktop Layout: Title and Filter on top, Search below */}
      <div className="hidden md:block mb-3 space-y-3">
        {/* Top Row: Title + Filter Button */}
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Largest Wallets</h4>
          <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>

        {/* Bottom Row: Search Field */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search Owner..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table with horizontal scroll */}
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="bg-gray-100 rounded-md px-3 py-2 text-xs text-gray-600 font-medium mb-3 grid grid-cols-[1fr_90px_120px_120px] gap-4 items-center">
            <div>Owner</div>
            <div className="text-center">Country</div>
            <div className="text-right">Wallet Balance ($)</div>
            <div className="text-right">Tx Volume</div>
          </div>

          <div className="max-h-56 overflow-y-auto space-y-2">
        {rows.map((w, i) => (
          <div 
            key={i} 
            className="bg-gray-50 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => navigate(`/wallet/${encodeURIComponent(w.owner)}`)}
            onContextMenu={(e) => handleWalletContextMenu(e, w)}
          >
            <div className="grid grid-cols-[1fr_90px_120px_120px] items-center gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-700">{w.owner.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                <div className="min-w-0">
                  <div className="font-medium text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis block">{w.owner}</div>
                  <div className="text-xs text-gray-500 truncate">{w.handle}</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                {React.createElement(Flags[countryToCode(w.country)], { className: 'w-5 h-3' })}
                <span>{w.country}</span>
              </div>
              <div className="text-right font-medium text-gray-800">{w.balance.toLocaleString()}</div>
              <div className="text-right text-gray-700">{w.txVolume.toLocaleString()}</div>
            </div>
          </div>
        ))}
          </div>
        </div>
      </div>

      <WalletContextMenu
        isOpen={walletContextMenu.isOpen}
        position={walletContextMenu.position}
        onClose={closeWalletContextMenu}
        wallet={walletContextMenu.wallet}
        onAction={handleWalletAction}
      />
    </div>
  )
}

export default LargestWallets






