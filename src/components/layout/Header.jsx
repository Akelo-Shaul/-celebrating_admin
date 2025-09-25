import React, { useState, useRef, useEffect } from 'react'
import { Menu, Search, Bell, ChevronDown, X } from 'lucide-react'
import { findSubItems, isMainMenuItem, findParentMenuItem } from '../../config/menuItems'

const Header = ({ isCollapsed, onToggleMenu, title, onItemSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const dropdownRef = useRef(null)
  const profileRef = useRef(null)
  const isMain = isMainMenuItem(title)
  const parentItem = findParentMenuItem(title)
  // If the current title is a main item show it, otherwise prefer its parent (if any).
  const displayTitle = isMain ? title : (parentItem || title || 'Dashboard')
  const subItems = findSubItems(displayTitle)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close profile panel when clicking outside or pressing Escape
  useEffect(() => {
    const handleOutside = (e) => {
      if (isProfileOpen && profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false)
      }
    }
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsProfileOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [isProfileOpen])
  return (
    <>
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
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-3 focus:outline-none"
              title="Open profile"
            >
              <img 
                src="https://ui-avatars.com/api/?name=Elisha+Abade&background=fde047&color=000" 
                alt="Elisha Abade" 
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-800">Elisha Abade</div>
                <div className="text-xs text-gray-500">Admin</div>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
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

    {/* Profile Drawer Overlay */}
    {isProfileOpen && (
      <div className="fixed inset-0 z-50 flex">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/40" onClick={() => setIsProfileOpen(false)} />

        {/* Drawer */}
        <aside ref={profileRef} className="ml-auto w-full max-w-md bg-white h-full shadow-xl p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Profile Settings</h2>
            <button onClick={() => setIsProfileOpen(false)} className="p-2 rounded hover:bg-gray-100">
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img src="https://ui-avatars.com/api/?name=Elisha+Abade&background=fde047&color=000" alt="avatar" className="w-12 h-12 rounded-full" />
              <div>
                <div className="font-medium">Elisha Abade</div>
                <div className="text-sm text-gray-500">Admin</div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Full name</label>
              <input className="w-full border rounded px-3 py-2" defaultValue="Elisha Abade" />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input className="w-full border rounded px-3 py-2" defaultValue="elisha@example.com" />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Role</label>
              <input className="w-full border rounded px-3 py-2" defaultValue="Admin" />
            </div>

            <div className="pt-4">
              <button className="bg-yellow-200 text-gray-900 px-4 py-2 rounded mr-2">Save changes</button>
              <button onClick={() => setIsProfileOpen(false)} className="px-4 py-2 rounded border">Cancel</button>
            </div>
          </div>
        </aside>
      </div>
    )}
    </>
  )
}

export default Header