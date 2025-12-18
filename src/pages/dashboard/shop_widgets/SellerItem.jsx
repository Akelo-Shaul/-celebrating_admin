import React from 'react'
import * as Flags from 'country-flag-icons/react/3x2'
import { countryToCode } from './countryUtils'

const SellerItem = ({ product, orders, owner, country, sales, onProductClick, onProductContextMenu }) => {
  const productData = { product, orders, owner, country, sales }
  
  const handleProductClick = (e) => {
    e.stopPropagation()
    if (onProductClick) {
      onProductClick(productData)
    }
  }

  const handleContextMenu = (e) => {
    if (onProductContextMenu) {
      onProductContextMenu(e, productData)
    }
  }

  const handleOwnerClick = (e) => {
    e.stopPropagation()
    window.location.assign(`/profile/${encodeURIComponent(owner)}`)
  }

  return (
    <div className="py-2">
      <div 
        className="bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors cursor-pointer"
        onClick={handleProductClick}
        onContextMenu={handleContextMenu}
      >
        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-[minmax(200px,1fr)_80px_80px_140px] items-center gap-4">
          {/* Product Name Column */}
          <div>
            <div className="font-semibold text-gray-800 truncate">{product}</div>
            <div className="mt-2 inline-flex items-center text-xs text-gray-600 bg-gray-200 rounded-full px-2 py-1">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
              <span>{orders} orders</span>
            </div>
          </div>

          {/* Owner Column - Centered */}
          <div className="flex items-center justify-center">
            <div
              className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-700 font-medium cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleOwnerClick}
            >
              {owner.split(' ').map(n=>n[0]).slice(0,2).join('')}
            </div>
          </div>

          {/* Country Column - Centered */}
          <div className="flex items-center justify-center">
            {country && React.createElement(Flags[countryToCode(country)], { className: 'w-8 h-5' })}
          </div>

          {/* Sales Volume Column - Right Aligned */}
          <div className="text-right font-medium text-gray-800 pr-2">{sales.toLocaleString()}</div>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden">
          {/* Product Name and Orders */}
          <div className="mb-3">
            <div className="font-semibold text-gray-900 text-base mb-1">{product}</div>
            <div className="inline-flex items-center text-xs text-gray-600 bg-gray-200 rounded-full px-2 py-1">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
              <span>{orders} orders</span>
            </div>
          </div>

          {/* Owner and Country Section */}
          <div className="mb-3 pb-3 border-b border-gray-200">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-gray-500 font-medium min-w-[50px]">Owner</span>
                <div
                  className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-700 font-medium cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={handleOwnerClick}
                >
                  {owner.split(' ').map(n=>n[0]).slice(0,2).join('')}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-xs text-gray-500 font-medium min-w-[50px]">Country</span>
                <div className="flex items-center gap-2">
                  {country && React.createElement(Flags[countryToCode(country)], { className: 'w-7 h-5' })}
                  <span className="text-sm text-gray-700">{country}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Volume */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Sales Volume</span>
            <span className="text-base font-semibold text-gray-900">${sales.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerItem
