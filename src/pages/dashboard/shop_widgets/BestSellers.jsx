import React from 'react'
import SellerItem from './SellerItem'

const BestSellers = ({ sellers = [] }) => (
  <div className="bg-white rounded-md shadow-sm p-4">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-3">
      <h4 className="font-semibold">Best Sellers</h4>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <input className="rounded-full border px-4 py-1 text-sm w-full sm:w-60 placeholder-gray-500" placeholder="Search Product..." />
        <button className="px-3 py-1 bg-gray-100 rounded">Filter</button>
      </div>
    </div>

    <div className="bg-gray-100 rounded-md px-3 py-2 text-xs text-gray-600 font-medium mb-3">
      <div className="grid grid-cols-[1fr_72px_56px_96px] gap-4 items-center">
        <div>Product Name</div>
        <div className="text-center">Owner</div>
        <div className="text-center">Country</div>
        <div className="text-right">Sales Volume ($)</div>
      </div>
    </div>
    <div className="max-h-40 overflow-y-auto pb-4 space-y-2">
      {sellers.map((it, i) => (
        <SellerItem key={i} {...it} />
      ))}
    </div>
  </div>
)

export default BestSellers
