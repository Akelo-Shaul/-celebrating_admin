import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Edit, BarChart2, Archive, AlertTriangle, Trash2 } from 'lucide-react'
import SellerItem from './SellerItem'

// Product Context Menu Component
const ProductContextMenu = ({ isOpen, position, onClose, product, onAction }) => {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !product) return null

  const menuItems = [
    {
      icon: Eye,
      label: 'View Details',
      action: 'view',
      color: 'text-blue-600'
    },
    {
      icon: Edit,
      label: 'Edit Product',
      action: 'edit',
      color: 'text-gray-700'
    },
    {
      icon: BarChart2,
      label: 'View Analytics',
      action: 'analytics',
      color: 'text-purple-600'
    },
    {
      icon: Archive,
      label: 'Archive Product',
      action: 'archive',
      color: 'text-orange-600'
    },
    {
      icon: AlertTriangle,
      label: 'Mark as Out of Stock',
      action: 'outOfStock',
      color: 'text-yellow-600'
    },
    {
      icon: Trash2,
      label: 'Delete Product',
      action: 'delete',
      color: 'text-red-600'
    }
  ]

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="font-semibold text-sm text-gray-900">{product.product}</div>
        <div className="text-xs text-gray-500">{product.orders} orders</div>
      </div>
      
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action, product)
            onClose()
          }}
          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
        >
          <item.icon size={16} className={item.color} />
          <span className={`text-sm ${item.color}`}>{item.label}</span>
        </button>
      ))}
    </div>
  )
}

const BestSellers = ({ sellers = [] }) => {
  const navigate = useNavigate()
  const [productContextMenu, setProductContextMenu] = useState({ 
    isOpen: false, 
    position: { x: 0, y: 0 }, 
    product: null 
  })

  const handleProductContextMenu = (e, product) => {
    e.preventDefault()
    e.stopPropagation()
    setProductContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      product
    })
  }

  const closeProductContextMenu = () => {
    setProductContextMenu({ isOpen: false, position: { x: 0, y: 0 }, product: null })
  }

  const handleProductAction = (action, product) => {
    switch (action) {
      case 'view':
        console.log(`Viewing product: ${product.product}`)
        navigate(`/product/${encodeURIComponent(product.product)}`)
        break
      case 'edit':
        console.log(`Editing product: ${product.product}`)
        alert(`Editing product: ${product.product}`)
        break
      case 'analytics':
        console.log(`Viewing analytics for: ${product.product}`)
        alert(`Viewing analytics for: ${product.product}`)
        break
      case 'archive':
        console.log(`Archiving product: ${product.product}`)
        alert(`Product ${product.product} has been archived`)
        break
      case 'outOfStock':
        console.log(`Marking as out of stock: ${product.product}`)
        alert(`${product.product} marked as out of stock`)
        break
      case 'delete':
        console.log(`Deleting product: ${product.product}`)
        if (window.confirm(`Are you sure you want to delete ${product.product}? This action cannot be undone.`)) {
          alert(`Product ${product.product} deleted`)
        }
        break
      default:
        break
    }
  }

  const handleProductClick = (product) => {
    navigate(`/product/${encodeURIComponent(product.product)}`)
  }

  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      {/* Mobile Layout: 2 rows */}
      <div className="md:hidden space-y-3 mb-4">
        {/* Top Row: Title + Filter Icon */}
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900">Best Sellers</h4>
          <button className="p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>

        {/* Bottom Row: Search Field (Full Width) */}
        <div className="relative w-full">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Desktop Layout: Title and Filter on top, Search below */}
      <div className="hidden md:block mb-4 space-y-3">
        {/* Top Row: Title + Filter Button */}
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900">Best Sellers</h4>
          <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>

        {/* Bottom Row: Search Field */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Table Header */}
          <div className="bg-gray-100 rounded-md px-3 py-2 text-xs text-gray-600 font-medium mb-3">
            <div className="grid grid-cols-[minmax(200px,1fr)_80px_80px_140px] gap-4 items-center">
              <div>Product Name</div>
              <div className="text-center">Owner</div>
              <div className="text-center">Country</div>
              <div className="text-right">Sales Volume ($)</div>
            </div>
          </div>

          {/* Scrollable Content (Vertical) */}
          <div className="max-h-60 overflow-y-auto pb-4 space-y-2">
            {sellers.map((it, i) => (
              <SellerItem
                key={i}
                {...it}
                onProductClick={handleProductClick}
                onProductContextMenu={handleProductContextMenu}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {sellers.map((it, i) => (
          <SellerItem
            key={i}
            {...it}
            onProductClick={handleProductClick}
            onProductContextMenu={handleProductContextMenu}
          />
        ))}
      </div>

      <ProductContextMenu
        isOpen={productContextMenu.isOpen}
        position={productContextMenu.position}
        onClose={closeProductContextMenu}
        product={productContextMenu.product}
        onAction={handleProductAction}
      />
    </div>
  )
}

export default BestSellers
