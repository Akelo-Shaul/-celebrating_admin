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
        <div className="hidden md:grid grid-cols-[1fr_72px_56px_96px] items-center gap-4">
          <div>
            <div className="font-semibold text-gray-800 truncate">{product}</div>
            <div className="mt-2 inline-flex items-center text-xs text-gray-600 bg-gray-200 rounded-full px-2 py-1">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
              <span>{orders} orders</span>
            </div>
          </div>
          <div 
            className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={handleOwnerClick}
          >
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-700">
              {owner.split(' ').map(n=>n[0]).slice(0,2).join('')}
            </div>
          </div>
          <div className="flex items-center justify-center">
            {country && React.createElement(Flags[countryToCode(country)], { className: 'w-6 h-4' })}
          </div>
          <div className="text-right font-medium text-gray-800">{sales.toLocaleString()}</div>
        </div>

        {/* Mobile stacked layout */}
        <div className="md:hidden">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-semibold text-gray-800">{product}</div>
              <div className="text-xs text-gray-500">{orders} orders</div>
            </div>
            <div className="text-sm font-medium text-gray-800">{sales.toLocaleString()}</div>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-700 cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={handleOwnerClick}
            >
              {owner.split(' ').map(n=>n[0]).slice(0,2).join('')}
            </div>
            <div className="text-xs text-gray-600 flex items-center gap-2">
              {country && React.createElement(Flags[countryToCode(country)], { className: 'w-4 h-3' })}
              <span>{country}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerItem
