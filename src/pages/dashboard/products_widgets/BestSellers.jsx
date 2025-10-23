import React from 'react'
import * as Flags from 'country-flag-icons/react/3x2'
import { countryToCode } from '../shop_widgets/countryUtils'

const SellerRow = ({ product, owner, country, sales, productsCount = 54 }) => {
  const initials = owner ? owner.split(' ').map(n => n[0]).slice(0,2).join('') : 'BH'
  const Flag = Flags[countryToCode(country)]
  return (
    <div className="grid grid-cols-4 items-center gap-4 bg-gray-200 px-4 py-3 border-b border-gray-400">
      <div>
        <div className="font-semibold text-gray-900">{product}</div>
        <div className="mt-2 inline-flex items-center text-xs text-gray-700 bg-gray-300 rounded-full px-2 py-1">
          <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2" />
          <span>{productsCount} products</span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center text-sm font-semibold text-gray-700">
          {initials}
        </div>
      </div>
      <div className="flex items-center justify-center">
        {Flag ? <Flag className="w-6 h-4" /> : <div className="w-6 h-4 bg-gray-400" />}
      </div>
      <div className="text-right font-medium text-gray-900">{sales.toLocaleString()}</div>
    </div>
  )
}

export default function BestSellers({ sellers }) {
  const rows = sellers && sellers.length ? sellers : Array.from({ length: 4 }).map(() => ({ product: 'Mtumba Connect', owner: 'Bungii Halamu', country: 'Kenya', sales: 32000 }))

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="flex items-center gap-4 mb-3">
        <div className="text-lg font-semibold">Best Sellers</div>
        <div className="flex-1">
          <div className="relative">
            <input placeholder="Search Product..." className="w-full rounded-full bg-gray-300 px-4 py-2 text-sm placeholder-gray-600" />
            {/* optional icon could go here */}
          </div>
        </div>
        <div>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-300 rounded">Filter</button>
        </div>
      </div>

      {/* column headers */}
      <div className="grid grid-cols-4 items-center gap-4 bg-gray-300 px-4 py-2 rounded-t text-sm font-medium text-gray-700 mb-1">
        <div>Product Name</div>
        <div className="text-center">Owner</div>
        <div className="text-center">Country</div>
        <div className="text-right">Sales Volume ($)</div>
      </div>

      <div className="rounded-b overflow-hidden">
        {rows.map((r, i) => (
          <SellerRow key={i} {...r} />
        ))}
      </div>
    </div>
  )
}
