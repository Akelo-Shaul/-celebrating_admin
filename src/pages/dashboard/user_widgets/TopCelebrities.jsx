import React, { useMemo, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import data, { celebrities as celebData, members as memberData } from '../data/topCelebritiesData'
import { Search, SlidersHorizontal, X, UserCog, Ban, Edit, CheckCircle, Bell, MessageCircle } from 'lucide-react'
import Flags from 'country-flag-icons/react/3x2'
import { countryToFlag } from '../../../utils/countryToFlag'
import { useMessaging } from '../../../contexts/MessagingContext'
import { useNotification } from '../../../contexts/NotificationContext'

const FilterModal = ({ isOpen, onClose, country, onCountryChange, range, onRangeChange }) => {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow-xl z-50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Filter Options</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <select 
              value={country} 
              onChange={e => onCountryChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-white"
            >
              <option value="All">All Countries</option>
              {data.countries.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Follower Range</label>
            <select 
              value={range} 
              onChange={e => onRangeChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-white"
            >
              {data.followerRanges.map(r => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-yellow-100 text-gray-900 rounded-md hover:bg-yellow-200"
          >
            Done
          </button>
        </div>
      </div>
    </>
  )
}

const ContextMenu = ({ isOpen, position, onClose, user, userType, onAction }) => {
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

  if (!isOpen || !user) return null

  const isRestricted = user.status === 'Inactive' || user.status === 'Restricted'
  
  const menuItems = [
    {
      icon: MessageCircle,
      label: 'Message User',
      action: 'message',
      color: 'text-blue-600'
    },
    {
      icon: UserCog,
      label: userType === 'celebrities' ? 'Change to Member' : 'Change to Celebrity',
      action: 'changeRole',
      color: 'text-blue-600'
    },
    {
      icon: Edit,
      label: 'Update User',
      action: 'update',
      color: 'text-gray-700'
    },
    ...(!isRestricted ? [{
      icon: Ban,
      label: 'Disable Account',
      action: 'disable',
      color: 'text-red-600'
    }] : [{
      icon: CheckCircle,
      label: 'Activate Account',
      action: 'activate',
      color: 'text-green-600'
    }]),
    {
      icon: Bell,
      label: 'Send Notification',
      action: 'notify',
      color: 'text-purple-600'
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
        <div className="font-semibold text-sm text-gray-900">{user.name}</div>
        <div className="text-xs text-gray-500">{userType === 'celebrities' ? 'Celebrity' : 'Member'}</div>
      </div>
      
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action, user)
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


const TopCelebrities = () => {
  const navigate = useNavigate()
  const { openMessage } = useMessaging()
  const { openNotification } = useNotification()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [tab, setTab] = useState('celebrities')
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState('All')
  const [range, setRange] = useState('all')
  const [contextMenu, setContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, user: null })
  
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen)

  const handleContextMenu = (e, user) => {
    e.preventDefault()
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      user
    })
  }

  const closeContextMenu = () => {
    setContextMenu({ isOpen: false, position: { x: 0, y: 0 }, user: null })
  }

  const handleAction = (action, user) => {
    // Handle different actions
    switch (action) {
      case 'message':
        openMessage(user)
        break
      case 'notify':
        openNotification(user)
        break
      case 'changeRole':
        console.log(`Changing ${user.name} to ${tab === 'celebrities' ? 'Member' : 'Celebrity'}`)
        alert(`Changed ${user.name} to ${tab === 'celebrities' ? 'Member' : 'Celebrity'}`)
        break
      case 'update':
        console.log(`Updating user: ${user.name}`)
        alert(`Opening update dialog for ${user.name}`)
        break
      case 'disable':
        console.log(`Disabling account: ${user.name}`)
        alert(`Disabled account for ${user.name}`)
        break
      case 'activate':
        console.log(`Activating account: ${user.name}`)
        alert(`Activated account for ${user.name}`)
        break
      default:
        break
    }
  }

  const source = tab === 'celebrities' ? celebData : memberData

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const rangeDef = data.followerRanges.find(r => r.id === range)
    return source.filter(item => {
      if (q && !item.name.toLowerCase().includes(q)) return false
      if (country !== 'All' && item.country !== country) return false
      if (rangeDef && rangeDef.id !== 'all') {
        const min = rangeDef.min || 0
        const max = rangeDef.max || Infinity
        if (item.followers < min || item.followers > max) return false
      }
      return true
    })
  }, [source, query, country, range])

  return (
    <div className="bg-white rounded p-4 h-full flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <div className="flex gap-1 bg-gray-100 rounded">
            <button
              className={`px-3 py-1 rounded ${tab === 'celebrities' ? 'bg-white font-semibold' : 'text-gray-600'}`}
              onClick={() => setTab('celebrities')}
            >
              Celebrities
            </button>
            <button
              className={`px-3 py-1 rounded ${tab === 'members' ? 'bg-white font-semibold' : 'text-gray-600'}`}
              onClick={() => setTab('members')}
            >
              Members
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={`Search ${tab}...`}
              className="pl-9 pr-4 py-2 w-full bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <button
            onClick={toggleFilter}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <SlidersHorizontal  className="h-4 w-4 text-gray-600"/>
          </button>
          
          <FilterModal
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            country={country}
            onCountryChange={setCountry}
            range={range}
            onRangeChange={setRange}
          />
        </div>
      </div>

      <div className="text-sm text-gray-600 bg-gray-50 rounded-t px-3 py-2 grid gap-2 items-center font-medium" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr auto' }}>
        <div className="col-span-1">Name</div>
        <div>Country</div>
        <div>Followers</div>
        <div>Rating</div>
        <div className="text-right">Trend</div>
      </div>

      <div className="max-h-64 overflow-auto">
        {filtered.length === 0 && (
          <div className="p-4 text-center text-gray-500">No results</div>
        )}
        {filtered.map(item => (
          <div 
            key={item.id} 
            className="grid gap-2 items-center border-b last:border-b-0 px-3 py-3 hover:bg-gray-50 transition-colors" 
            style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr auto' }}
            onContextMenu={(e) => handleContextMenu(e, item)}
          >
            <div
              className="flex items-center gap-3 min-w-0 cursor-pointer"
              onClick={() => navigate(`/profile/${encodeURIComponent(item.name)}`, { state: { role: tab === 'celebrities' ? 'celebrity' : 'member' } })}
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-600 flex-shrink-0">{item.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
              <div className="min-w-0">
                <div className="font-medium text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis block">{item.name}</div>
                <div className="text-xs text-gray-500 truncate">{item.posts ? `${item.posts} posts` : ''}</div>
              </div>
            </div>
            <div className='flex flex-row gap-2 items-center'>
                {React.createElement(Flags[countryToFlag(item.country)], { 
                    className: "w-4 h-4"
                })}
                <div className="text-sm">{item.country}</div>
            </div>
            <div className="text-sm">{item.followers.toLocaleString()}</div>
            <div className="text-sm">{item.rating ?? '-'}</div>
            <div className="text-right text-green-500">▴</div>
          </div>
        ))}
      </div>

      <ContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={closeContextMenu}
        user={contextMenu.user}
        userType={tab}
        onAction={handleAction}
      />
    </div>
  )
}

export default TopCelebrities