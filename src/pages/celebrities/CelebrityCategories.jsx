import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { TrendingUp, TrendingDown } from 'lucide-react'
import * as Flags from 'country-flag-icons/react/3x2'
import { countryToCode } from '../dashboard/shop_widgets/countryUtils'
import CategoryList from './celebrity_management_widgets/CategoryList';

const CelebrityCategories = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('Music');
  
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
  
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">All Categories</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Celebrity/Category..."
              className="w-96 px-4 py-2 pl-10 pr-4 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:border-gray-300"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center border border-gray-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
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
                <tr key={celebrity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      {/* Circular avatar with orange border for celebrities */}
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center border-4 border-orange-500 bg-gray-100 text-gray-700 font-semibold cursor-pointer"
                        onClick={() => navigate(`/profile/${encodeURIComponent(celebrity.handle)}`, { state: { role: celebrity.type } })}
                      >
                        {celebrity.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                      </div>
                      <div className="cursor-pointer" onClick={() => navigate(`/profile/${encodeURIComponent(celebrity.handle)}`, { state: { role: celebrity.type } })}>
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
      </div>
    </div>
  );
};

export default CelebrityCategories;
