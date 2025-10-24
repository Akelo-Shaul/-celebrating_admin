import React, { useState, useRef, useEffect } from 'react'
import { Menu, Search, Bell, ChevronDown, Mail, Edit2, HelpCircle, Lock, LogOut, MessageSquare, User } from 'lucide-react'
import { findSubItems, isMainMenuItem, findParentMenuItem } from '../../config/menuItems'
import { useMessaging } from '../../contexts/MessagingContext'

const Header = ({ isCollapsed, onToggleMenu, title, onItemSelect }) => {
  const { openMessage } = useMessaging()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const profilePanelRef = useRef(null)
  const isMain = isMainMenuItem(title)
  const parentItem = findParentMenuItem(title)
  // If the current title is a main item show it, otherwise prefer its parent (if any).
  const displayTitle = isMain ? title : (parentItem || title || 'Dashboard')
  const subItems = findSubItems(displayTitle)

  // Mock messages data - using same users as in AllMessages for consistency
  const messages = [
    {
      id: 1,
      sender: { name: 'Shaul Akelo', username: '@Shaul', avatar: null },
      preview: 'You sent an attachment.',
      time: '7h',
      unread: false
    },
    {
      id: 2,
      sender: { name: 'La DUKE', username: '@LaDuke', avatar: null },
      preview: '🤣🤣 shit not new to me',
      time: '9h',
      unread: true
    },
    {
      id: 3,
      sender: { name: 'Phoebe', username: '@Phoebe', avatar: null },
      preview: 'You sent an attachment.',
      time: '17h',
      unread: true
    }
  ]

  const unreadCount = messages.filter(msg => msg.unread).length

  const handleMessageClick = (e, message) => {
    e.stopPropagation() // Prevent event from bubbling
    console.log('Opening message for:', message.sender)
    openMessage(message.sender)
    setIsProfileOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
      // close profile panel when clicking outside both the button and the panel
      if (
        profileRef.current && 
        !profileRef.current.contains(event.target) &&
        profilePanelRef.current &&
        !profilePanelRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  return (
    <header className="bg-white border-b flex flex-wrap">
      {/* Main header content */}
      <div className="w-full px-4 py-3 flex items-start md:items-center justify-between">
        <div className="flex items-start md:items-center gap-4">
          <button
            onClick={onToggleMenu}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-700"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu size={20} />
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2" ref={dropdownRef}>
            <h1 className='text-lg font-medium text-gray-800'>
              {displayTitle}
            </h1>
            {subItems && (
              <div className="relative mt-2 sm:mt-0">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 text-sm rounded px-2 py-1 text-gray-600 hover:text-gray-900 bg-gray-50"
                >
                  <span>{title}</span>
                  <ChevronDown 
                    size={16}
                    className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50">
                    {subItems.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          onItemSelect(item);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          title === item
                            ? 'text-gray-900 font-medium bg-gray-50'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Search - desktop only */}
          <div className="relative max-w-xl flex-1 hidden md:block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Anything Here..."
              className="w-full pl-10 pr-4 py-1.5 bg-gray-100 rounded-md text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>

          {/* Notifications */}
          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-700 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div
            ref={profileRef}
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setIsProfileOpen(true)}
            role="button"
            aria-haspopup="true"
            aria-expanded={isProfileOpen}
          >
            <img
              src="https://ui-avatars.com/api/?name=Elisha+Abade&background=fde047&color=000"
              alt="Elisha Abade"
              className="w-8 h-8 rounded-full"
            />
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-800">Elisha Abade</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>

          {/* Profile slide-in panel and overlay */}
          {/* Overlay */}
          {isProfileOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setIsProfileOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Panel */}
          <div
            ref={profilePanelRef}
            className={`fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
              isProfileOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            aria-hidden={!isProfileOpen}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://ui-avatars.com/api/?name=Elisha+Abade&background=fde047&color=000&size=128"
                    alt="Elisha Avatar"
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <div className="text-lg font-semibold text-gray-800">Elisha Abade</div>
                    <div className="text-sm text-gray-500">Admin</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded"
                  aria-label="Close profile panel"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-2 text-sm text-gray-700">
                <div>
                  <div className="text-xs text-gray-500">Admin ID</div>
                  <div className="font-medium">#ADM-1023</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Position</div>
                  <div className="font-medium">Super Admin</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="font-medium">elisha.abade@example.com</div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => { /* placeholder for edit profile action */ }}
                  className="w-full bg-yellow-100 text-gray-900 px-4 py-2 rounded-md font-medium"
                >
                  Edit Profile
                </button>
              </div>

              <div className="mt-6 flex-1 overflow-auto">
                {/* Messages section */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase">Messages</div>
                    {unreadCount > 0 && (
                      <div className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                        {unreadCount}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    {messages.map((message) => (
                      <button
                        key={message.id}
                        onClick={(e) => handleMessageClick(e, message)}
                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 active:bg-gray-200 flex items-start gap-3 transition-all cursor-pointer border border-transparent hover:border-gray-200"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-600 flex-shrink-0">
                          <MessageSquare size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div className="text-sm font-medium text-gray-800 truncate">
                              {message.sender.name}
                            </div>
                            <div className="text-xs text-gray-400 flex-shrink-0">{message.time}</div>
                          </div>
                          <div className="text-xs text-gray-500 truncate">{message.preview}</div>
                        </div>
                        {message.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <ul className="space-y-2 text-sm">
                  <li>
                    <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-3">
                      <Bell size={16} className="text-gray-600" />
                      <span>Notifications</span>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-3">
                      <HelpCircle size={16} className="text-gray-600" />
                      <span>Help & Support</span>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-3">
                      <Lock size={16} className="text-gray-600" />
                      <span>Change Password</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        // placeholder logout behavior
                        setIsProfileOpen(false)
                        // you can call a logout handler here
                      }}
                      className="w-full text-left px-3 py-2 rounded text-red-600 hover:bg-gray-50 flex items-center gap-3"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="w-full md:hidden px-4 pb-3">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Anything Here..."
            className="w-full pl-10 pr-4 py-1.5 bg-gray-100 rounded-md text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
      </div>
    </header>
  )
}

export default Header