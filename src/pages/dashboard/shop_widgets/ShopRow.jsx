import React from 'react'
import * as Flags from 'country-flag-icons/react/3x2'
import { countryToCode } from './countryUtils'

const ShopRow = ({ name, posts, country, sales, followers, rating, trend }) => (
  <div className="py-3 border-b border-gray-200">
    {/* Desktop row */}
    <div className="hidden md:flex items-center gap-4">
      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">{name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-800">{name}</div>
        <div className="text-xs text-gray-500">{posts} posts</div>
      </div>
      <div className="w-24 text-sm text-gray-700 flex items-center gap-2">
        {country && React.createElement(Flags[countryToCode(country)], { className: 'w-5 h-4' })}
        <div className="text-sm text-gray-700 ml-2">{country}</div>
      </div>
      <div className="w-28 text-sm text-gray-700">{sales.toLocaleString()}</div>
      <div className="w-28 text-sm text-gray-700">{followers.toLocaleString()}</div>
      <div className="w-20 text-sm text-gray-700">{rating}</div>
      <div className={`w-8 text-right ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>{trend === 'up' ? '▲' : '▼'}</div>
    </div>

    {/* Mobile stacked card */}
    <div className="md:hidden bg-white rounded-lg p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">{name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
          <div>
            <div className="font-medium text-gray-800">{name}</div>
            <div className="text-xs text-gray-500">{posts} posts • {country}</div>
          </div>
        </div>
        <div className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>{trend === 'up' ? '▲' : '▼'}</div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-sm text-gray-700">
        <div>
          <div className="text-xs text-gray-500">Sales</div>
          <div className="font-medium">{sales.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Followers</div>
          <div className="font-medium">{followers.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Rating</div>
          <div className="font-medium">{rating}</div>
        </div>
      </div>
    </div>
  </div>
)

export default ShopRow
