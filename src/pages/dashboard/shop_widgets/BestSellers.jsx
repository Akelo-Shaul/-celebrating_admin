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
