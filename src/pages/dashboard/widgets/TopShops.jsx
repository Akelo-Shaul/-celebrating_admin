import React, { useState } from 'react'
import { Search, Filter, SlidersHorizontalIcon } from 'lucide-react'
import * as Flags from 'country-flag-icons/react/3x2'
import { topShopsData } from '../data/topShopsData'

const TopShops = () => {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter shops based on search query
  const filteredShops = topShopsData.filter(shop =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-white rounded-lg p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Top Shops</h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Shop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-full bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <SlidersHorizontalIcon className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600">
        <div>Shop Name</div>
        <div>Owner</div>
        <div>Country</div>
        <div className="text-right">Sales Volume ($)</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto">
        {filteredShops.map((shop) => (
          <div
            key={shop.id}
            className="grid grid-cols-4 gap-4 px-4 py-3 border-b last:border-b-0 items-center"
          >
            <div className="flex flex-col">
              <div className="font-medium">{shop.name}</div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <div className="text-green-600 text-xs">✓</div>
                <span>{shop.productsCount} products</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <img
                src={shop.owner.avatar}
                alt={shop.owner.name}
                className="w-6 h-6 rounded-full bg-gray-200"
              />
              <span className="text-sm text-gray-600">{shop.owner.name}</span>
            </div>

            <div className="flex items-center gap-1">
              {React.createElement(Flags[shop.country], {
                className: "w-6 h-4 rounded"
              })}
            </div>

            <div className="text-right">{shop.salesVolume.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopShops