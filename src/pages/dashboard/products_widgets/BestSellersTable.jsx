import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Edit, BarChart2, Archive, AlertTriangle, Trash2 } from 'lucide-react'

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
        <div className="font-semibold text-sm text-gray-900">{product.name}</div>
        <div className="text-xs text-gray-500">By {product.owner}</div>
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

export default function BestSellersTable({ sellers = [] }) {
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
        console.log(`Viewing product: ${product.name}`)
        navigate(`/product/${encodeURIComponent(product.name)}`)
        break
      case 'edit':
        console.log(`Editing product: ${product.name}`)
        alert(`Editing product: ${product.name}`)
        break
      case 'analytics':
        console.log(`Viewing analytics for: ${product.name}`)
        alert(`Viewing analytics for: ${product.name}`)
        break
      case 'archive':
        console.log(`Archiving product: ${product.name}`)
        alert(`Product ${product.name} has been archived`)
        break
      case 'outOfStock':
        console.log(`Marking as out of stock: ${product.name}`)
        alert(`${product.name} marked as out of stock`)
        break
      case 'delete':
        console.log(`Deleting product: ${product.name}`)
        if (window.confirm(`Are you sure you want to delete ${product.name}? This action cannot be undone.`)) {
          alert(`Product ${product.name} deleted`)
        }
        break
      default:
        break
    }
  }

  const handleProductClick = (product) => {
    navigate(`/product/${encodeURIComponent(product.name)}`)
  }

  // Create default products if no sellers provided
  const defaultProducts = Array.from({ length: 6 }).map((_, i) => ({
    name: 'Marika Halaga',
    owner: 'Bungii Halamu',
    sales: 32000,
    orders: 32000,
    rating: 4.5
  }))

  const products = sellers.length ? sellers.map(s => ({
    name: s.product,
    owner: s.owner,
    sales: s.sales,
    orders: s.orders,
    rating: 4.5
  })) : defaultProducts

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header Section */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Best Sellers</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Product..."
                className="pl-8 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
              <svg
                className="w-4 h-4 text-gray-500 absolute left-2.5 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md flex items-center space-x-1 hover:bg-gray-200">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sales Volume ($)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Rating</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, i) => (
              <tr 
                key={i} 
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleProductClick(product)}
                onContextMenu={(e) => handleProductContextMenu(e, product)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">By {product.owner}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.sales.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.orders.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
