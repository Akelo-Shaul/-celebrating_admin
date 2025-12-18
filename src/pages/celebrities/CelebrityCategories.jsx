import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { TrendingUp, TrendingDown, UserCog, Ban, Edit, CheckCircle, Bell, MessageCircle, Search, Filter } from 'lucide-react'
import { useMessaging } from '../../contexts/MessagingContext'
import { useNotification } from '../../contexts/NotificationContext'
import * as Flags from 'country-flag-icons/react/3x2'
import { countryToCode } from '../dashboard/shop_widgets/countryUtils'
import CategoryList from './celebrity_management_widgets/CategoryList';

const CelebrityCategories = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('Music');
  const [searchTerm, setSearchTerm] = useState('');
  
  const countries = ['Kenya', 'Nigeria', 'Ghana', 'Tanzania', 'Uganda', 'South Africa'];
  
  const generateMockData = (category, count = 10) => {
    return Array.from({ length: count }, (_, index) => ({
      id: `${category}-${index + 1}`,
      name: `${category} Star ${index + 1}`,
      username: `@${category.toLowerCase()}${index + 1}`,
      handle: `${category.toLowerCase()}${index + 1}`,
      uniqueId: `${Math.random().toString(36).substring(2, 15).toUpperCase()}`,
      posts: Math.floor(Math.random() * 100),
      followers: `${Math.floor(Math.random() * 100000).toLocaleString()}`,
      following: `${Math.floor(Math.random() * 10000).toLocaleString()}`,
      connections: `${Math.floor(Math.random() * 50000).toLocaleString()}`,
      category,
      rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
      country: countries[Math.floor(Math.random() * countries.length)],
      trendType: Math.random() > 0.3 ? 'up' : 'down',
      email: `${category.toLowerCase()}${index + 1}@example.com`,
      type: 'celebrity'
    }));
  };

  const celebritiesByCategory = {
    Music: generateMockData('Music', 15),
    Art: generateMockData('Art', 12),
    Production: generateMockData('Production', 8),
    'Content Creation': generateMockData('Content Creation', 20),
    FootBall: generateMockData('FootBall', 10),
    Acting: generateMockData('Acting', 18),
    Comedy: generateMockData('Comedy', 14),
    Dance: generateMockData('Dance', 9),
    Fashion: generateMockData('Fashion', 16),
    Photography: generateMockData('Photography', 11),
    Gaming: generateMockData('Gaming', 13),
    Fitness: generateMockData('Fitness', 17),
    Cooking: generateMockData('Cooking', 8),
    Education: generateMockData('Education', 12),
    Technology: generateMockData('Technology', 15),
    Basketball: generateMockData('Basketball', 10),
    Rugby: generateMockData('Rugby', 9),
    Boxing: generateMockData('Boxing', 7),
    'Martial Arts': generateMockData('Martial Arts', 11),
    Writing: generateMockData('Writing', 13),
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const currentCelebrities = celebritiesByCategory[selectedCategory] || [];

  // Context menu state and handlers (same behaviour as UsersTable)
  const [contextMenu, setContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, celebrity: null })
  const menuRef = useRef(null)
  const { openMessage } = useMessaging()
  const { openNotification } = useNotification()

  const handleContextMenu = (e, celebrity) => {
    e.preventDefault()
    setContextMenu({ isOpen: true, position: { x: e.clientX, y: e.clientY }, celebrity })
  }

  const closeContextMenu = () => setContextMenu({ isOpen: false, position: { x: 0, y: 0 }, celebrity: null })

  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (menuRef.current && !menuRef.current.contains(ev.target)) closeContextMenu()
    }
    if (contextMenu.isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [contextMenu.isOpen])

  const handleAction = (action, celeb) => {
    switch(action) {
      case 'message':
        openMessage && openMessage(celeb)
        break
      case 'notify':
        openNotification && openNotification(celeb)
        break
      case 'changeRole':
        alert(`Toggling role for ${celeb.name}`)
        break
      case 'update':
        alert(`Open update for ${celeb.name}`)
        break
      case 'disable':
        alert(`Disabled ${celeb.name}`)
        break
      case 'activate':
        alert(`Activated ${celeb.name}`)
        break
      default:
        break
    }
  }
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Celebrity Categories</h1>
        <p className="text-gray-600 mt-1">Browse celebrities organized by their categories and specializations</p>
      </div>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="px-4 md:px-6 py-3 md:py-4">
          {/* Mobile Layout: 2 rows */}
          <div className="md:hidden space-y-3">
            {/* Top Row: Title + Filter Button */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">All Categories</h2>
              <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
                <Filter size={18} />
                <span>Filter</span>
              </button>
            </div>

            {/* Bottom Row: Search Field (Full Width) */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={18} />
              <input
                type="text"
                placeholder="Search Celebrity/Category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Desktop Layout: Single row */}
          <div className="hidden md:flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">All Categories</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={18} />
                <input
                  type="text"
                  placeholder="Search Celebrity/Category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
                <Filter size={18} />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category List */}
      <div className="bg-white rounded-lg shadow p-6">
        <CategoryList 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Celebrity List Table */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="max-h-[calc(100vh-380px)] overflow-auto">
          <table className="min-w-full">
            <thead className="bg-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Profile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Followers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Following</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Connections</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Trend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCelebrities.map((celebrity) => (
                <tr 
                  key={celebrity.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onContextMenu={(e) => handleContextMenu(e, celebrity)}
                  onClick={() => navigate(`/profile/${encodeURIComponent(celebrity.handle)}`, { state: { role: celebrity.type } })}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      {/* Circular avatar with orange border for celebrities */}
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center border-4 border-orange-500 bg-gray-100 text-gray-700 font-semibold"
                      >
                        {celebrity.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{celebrity.username}</div>
                        <div className="text-sm text-gray-500">{celebrity.uniqueId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{celebrity.followers}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{celebrity.following}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{celebrity.connections}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{celebrity.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{celebrity.rating}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      {(() => {
                        const Flag = Flags[countryToCode(celebrity.country)];
                        return Flag ? <Flag className="w-6 h-4" /> : null;
                      })()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    <div className="flex items-center justify-center">
                      {celebrity.trendType === 'up' ? (
                        <TrendingUp size={18} className="text-green-600" />
                      ) : (
                        <TrendingDown size={18} className="text-red-600" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{celebrity.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Legend/Indicator */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-sm text-gray-700">Celebrities</span>
            </div>
          </div>
        </div>
        
        {/* Context Menu (copied behaviour from UsersTable) */}
        {contextMenu.isOpen && contextMenu.celebrity && (
          <div
            ref={menuRef}
            className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50"
            style={{ top: `${contextMenu.position.y}px`, left: `${contextMenu.position.x}px` }}
          >
            <div className="px-3 py-2 border-b border-gray-100">
              <div className="font-semibold text-sm text-gray-900">{contextMenu.celebrity.name}</div>
              <div className="text-xs text-gray-500">Celebrity</div>
            </div>
            <button onClick={() => { handleAction('message', contextMenu.celebrity); closeContextMenu() }} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"><MessageCircle size={16} className="text-blue-600" /> <span className="text-sm text-blue-600">Message</span></button>
            <button onClick={() => { handleAction('changeRole', contextMenu.celebrity); closeContextMenu() }} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"><UserCog size={16} className="text-blue-600" /> <span className="text-sm text-blue-600">Change Role</span></button>
            <button onClick={() => { handleAction('update', contextMenu.celebrity); closeContextMenu() }} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"><Edit size={16} className="text-gray-700" /> <span className="text-sm text-gray-700">Update</span></button>
            <button onClick={() => { handleAction('disable', contextMenu.celebrity); closeContextMenu() }} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"><Ban size={16} className="text-red-600" /> <span className="text-sm text-red-600">Disable</span></button>
            <button onClick={() => { handleAction('notify', contextMenu.celebrity); closeContextMenu() }} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"><Bell size={16} className="text-purple-600" /> <span className="text-sm text-purple-600">Send Notification</span></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CelebrityCategories;
