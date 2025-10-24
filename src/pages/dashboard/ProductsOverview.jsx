import React from 'react'
import BestSellersTable from './products_widgets/BestSellersTable'
import TopKeywords from './products_widgets/TopKeywords'
import ProductsGrowth from './products_widgets/ProductsGrowth'
import SalesVolume from './products_widgets/SalesVolume'

export default function ProductsOverview() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products Overview</h1>
        <p className="text-gray-600 mt-1">Track product sales, best sellers, and market trends</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left column: Best Sellers (span 8) */}
        <div className="lg:col-span-8">
          <BestSellersTable />
        </div>

        {/* Right column: Top Keywords (span 4) */}
        <div className="lg:col-span-4">
          <TopKeywords />
        </div>

        {/* Bottom left: Products Growth */}
        <div className="lg:col-span-8">
          <ProductsGrowth />
        </div>

        {/* Bottom right: Sales Volume */}
        <div className="lg:col-span-4">
          <SalesVolume />
        </div>
      </div>
    </div>
  )
}
