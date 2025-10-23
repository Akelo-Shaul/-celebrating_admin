import { BadgeCheck, ShoppingCart, Star, Package, Eye, CheckCircle, XCircle, Clock, Truck, RotateCcw, Archive, AlertTriangle, ThumbsUp, MessageSquare, Flag, EyeOff, Trash2 } from 'lucide-react'
import React, { useMemo, useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import StandardTable from '../../components/common/StandardTable'
import OrderDistributionMap from '../../components/common/OrderDistributionMap'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

// Sales Report Chart Component
const SalesReportChart = ({ salesData }) => {
  const chartRef = useRef(null)

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#e5e7eb',
        titleFont: { size: 13, weight: '500' },
        bodyFont: { size: 12 },
        padding: 10,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: (context) => context[0].label,
          label: (context) => `Sales: $${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.1)',
          drawBorder: true,
        },
        ticks: {
          font: { size: 11 },
          color: '#374151',
          padding: 8,
        },
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.1)',
        },
        ticks: {
          font: { size: 11 },
          color: '#374151',
          padding: 8,
          callback: (value) => `$${value >= 1000 ? `${value/1000}k` : value}`,
        },
      },
    },
  }

  const buildChartData = () => {
    const ctx = chartRef.current?.ctx
    const height = chartRef.current?.height || 300

    let gradient
    if (ctx) {
      gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, 'rgba(241, 149, 52, 0.3)')
      gradient.addColorStop(0.5, 'rgba(241, 149, 52, 0.15)')
      gradient.addColorStop(1, 'rgba(241, 149, 52, 0)')
    }

    return {
      labels: salesData.map(d => d.month),
      datasets: [
        {
          label: 'Sales',
          data: salesData.map(d => d.sales),
          borderColor: '#F19534',
          backgroundColor: gradient || 'rgba(241, 149, 52, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#F19534',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
        },
      ],
    }
  }

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update()
    }
  }, [salesData])

  return (
    <div className="col-span-6 bg-gray-200 rounded-lg p-6 shadow">
      <h2 className="text-xl font-bold mb-4">Sales Report</h2>
      <div style={{ height: '350px' }}>
        <Line
          ref={chartRef}
          options={options}
          data={buildChartData()}
        />
      </div>
    </div>
  )
}

// Order Context Menu Component
const OrderContextMenu = ({ isOpen, position, onClose, order, onAction }) => {
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

  if (!isOpen || !order) return null

  // Define menu items based on current status
  const getMenuItems = () => {
    const baseItems = []
    
    switch (order.status) {
      case 'Awaiting payment':
        baseItems.push(
          {
            icon: CheckCircle,
            label: 'Mark as Paid',
            action: 'markPaid',
            color: 'text-green-600'
          },
          {
            icon: Clock,
            label: 'Extend Payment Deadline',
            action: 'extendDeadline',
            color: 'text-blue-600'
          },
          {
            icon: XCircle,
            label: 'Cancel Order',
            action: 'cancel',
            color: 'text-red-600'
          }
        )
        break
      
      case 'Delivered':
        baseItems.push(
          {
            icon: RotateCcw,
            label: 'Process Return',
            action: 'processReturn',
            color: 'text-orange-600'
          },
          {
            icon: AlertTriangle,
            label: 'Report Issue',
            action: 'reportIssue',
            color: 'text-yellow-600'
          },
          {
            icon: Archive,
            label: 'Archive Order',
            action: 'archive',
            color: 'text-gray-600'
          }
        )
        break
      
      case 'Overdue':
        baseItems.push(
          {
            icon: CheckCircle,
            label: 'Mark as Paid',
            action: 'markPaid',
            color: 'text-green-600'
          },
          {
            icon: AlertTriangle,
            label: 'Send Payment Reminder',
            action: 'sendReminder',
            color: 'text-orange-600'
          },
          {
            icon: XCircle,
            label: 'Cancel Order',
            action: 'cancel',
            color: 'text-red-600'
          }
        )
        break
      
      default:
        baseItems.push(
          {
            icon: Truck,
            label: 'Mark as In Transit',
            action: 'inTransit',
            color: 'text-blue-600'
          },
          {
            icon: CheckCircle,
            label: 'Mark as Delivered',
            action: 'markDelivered',
            color: 'text-green-600'
          },
          {
            icon: XCircle,
            label: 'Cancel Order',
            action: 'cancel',
            color: 'text-red-600'
          }
        )
    }

    return baseItems
  }

  const menuItems = getMenuItems()

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[220px] z-50"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="font-semibold text-sm text-gray-900">Order: {order.id}</div>
        <div className="text-xs text-gray-500">Current Status: {order.status}</div>
      </div>
      
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action, order)
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

// Review Context Menu Component
const ReviewContextMenu = ({ isOpen, position, onClose, review, onAction }) => {
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

  if (!isOpen || !review) return null

  const menuItems = [
    {
      icon: Eye,
      label: 'View Full Review',
      action: 'view',
      color: 'text-blue-600'
    },
    {
      icon: ThumbsUp,
      label: 'Feature Review',
      action: 'feature',
      color: 'text-green-600'
    },
    {
      icon: MessageSquare,
      label: 'Reply to Review',
      action: 'reply',
      color: 'text-purple-600'
    },
    {
      icon: Flag,
      label: 'Flag as Inappropriate',
      action: 'flag',
      color: 'text-orange-600'
    },
    {
      icon: EyeOff,
      label: 'Hide Review',
      action: 'hide',
      color: 'text-gray-600'
    },
    {
      icon: Trash2,
      label: 'Delete Review',
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
        <div className="font-semibold text-sm text-gray-900">Review Actions</div>
        <div className="text-xs text-gray-500">Rating: {review.rating}/5</div>
      </div>
      
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action, review)
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

const ProductProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedOrders, setSelectedOrders] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  const product = useMemo(() => ({
    id,
    name: decodeURIComponent(id || 'Shang Mulan'),
    shop: 'Braum Halaberry',
    shopVerified: true,
    productImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    rating: 3,
    orders: '12,087',
    amountSold: '123',
    reviews: '123',
    salesVolume: '$ 124,209',
    salesGrowth: '+2.54',
    createdAt: '28-02-2000',
    productViews: '200',
    distribution: {
      above10k: 3,
      above30k: 5,
      above50k: 2
    },
    ordersList: [
      { 
        id: 'ORD-RE-0987684', 
        user: '@Shaul', 
        userId: 'I9U0JHF29HI9H8230',
        userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        amount: 32000, 
        quantity: 4, 
        country: 'KE',
        totalShopOrders: 123, 
        status: 'Awaiting payment' 
      },
      { 
        id: 'ORD-RE-0987684', 
        user: '@Shaul', 
        userId: 'I9U0JHF29HI9H8230',
        userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        amount: 23000, 
        quantity: 10, 
        country: 'KE',
        totalShopOrders: 124, 
        status: 'Delivered' 
      },
      { 
        id: 'ORD-RE-0987684', 
        user: '@Shaul', 
        userId: 'I9U0JHF29HI9H8230',
        userAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        amount: 23000, 
        quantity: 12, 
        country: 'KE',
        totalShopOrders: 2, 
        status: 'Overdue' 
      },
      { 
        id: 'ORD-RE-0987684', 
        user: '@Shaul', 
        userId: 'I9U0JHF29HI9H8230',
        userAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        amount: 23000, 
        quantity: 12, 
        country: 'KE',
        totalShopOrders: 23, 
        status: 'Delivered' 
      },
      { 
        id: 'ORD-RE-0987684', 
        user: '@Shaul', 
        userId: 'I9U0JHF29HI9H8230',
        userAvatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        amount: 23000, 
        quantity: 32, 
        country: 'KE',
        totalShopOrders: 1, 
        status: 'Delivered' 
      },
      { 
        id: 'ORD-RE-0987684', 
        user: '@Shaul', 
        userId: 'I9U0JHF29HI9H8230',
        userAvatar: 'https://randomuser.me/api/portraits/women/6.jpg',
        amount: 23000, 
        quantity: 11, 
        country: 'KE',
        totalShopOrders: 46, 
        status: 'Delivered' 
      }
    ],
    reviewsList: [
      { 
        id: 'r1', 
        content: "Can't believe this is how it is supposed to be and how about we just do it ...", 
        product: 'Product', 
        productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80',
        salutes: 50, 
        rating: 3.5 
      },
      { 
        id: 'r2', 
        content: "Can't believe this is how it is supposed to be and how about we just do it ...", 
        product: 'Product', 
        productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80',
        salutes: 50, 
        rating: 3.5 
      },
      { 
        id: 'r3', 
        content: "Can't believe this is how it is supposed to be and how about we just do it ...", 
        product: 'Product', 
        productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80',
        salutes: 50, 
        rating: 3.5 
      },
      { 
        id: 'r4', 
        content: "Can't believe this is how it is supposed to be and how about we just do it ...", 
        product: 'Product', 
        productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80',
        salutes: 50, 
        rating: 3.5 
      },
      { 
        id: 'r5', 
        content: "Can't believe this is how it is supposed to be and how about we just do it ...", 
        product: 'Product', 
        productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80',
        salutes: 50, 
        rating: 3.5 
      }
    ],
    salesData: [
      { month: 'Jan', sales: 2000 },
      { month: 'Feb', sales: 3000 },
      { month: 'Mar', sales: 4500 },
      { month: 'Apr', sales: 5000 },
      { month: 'May', sales: 4800 },
      { month: 'Jun', sales: 5500 },
      { month: 'Jul', sales: 6000 },
      { month: 'Aug', sales: 6500 }
    ]
  }), [id])

  const getCountryFlag = (countryCode) => {
    const flags = {
      'KE': '🇰🇪'
    }
    return flags[countryCode] || '🏳️'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'Awaiting payment':
        return 'bg-yellow-100 text-yellow-800'
      case 'Overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Bulk selection handlers
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked
    setSelectAll(isChecked)
    if (isChecked) {
      setSelectedOrders(product.ordersList.map((_, idx) => idx))
    } else {
      setSelectedOrders([])
    }
  }

  const handleSelectOrder = (idx) => {
    setSelectedOrders(prev => {
      if (prev.includes(idx)) {
        return prev.filter(i => i !== idx)
      } else {
        return [...prev, idx]
      }
    })
  }

  // Order Context Menu State
  const [orderContextMenu, setOrderContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, order: null })

  const handleOrderContextMenu = (e, order) => {
    e.preventDefault()
    e.stopPropagation()
    setOrderContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      order
    })
  }

  const closeOrderContextMenu = () => {
    setOrderContextMenu({ isOpen: false, position: { x: 0, y: 0 }, order: null })
  }

  // Review Context Menu State
  const [reviewContextMenu, setReviewContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, review: null })

  const handleReviewContextMenu = (e, review) => {
    e.preventDefault()
    e.stopPropagation()
    setReviewContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      review
    })
  }

  const closeReviewContextMenu = () => {
    setReviewContextMenu({ isOpen: false, position: { x: 0, y: 0 }, review: null })
  }

  const handleOrderAction = (action, order) => {
    switch (action) {
      case 'markPaid':
        console.log(`Marking order ${order.id} as paid`)
        alert(`Order ${order.id} marked as paid`)
        break
      case 'extendDeadline':
        console.log(`Extending payment deadline for order ${order.id}`)
        alert(`Payment deadline extended for order ${order.id}`)
        break
      case 'markDelivered':
        console.log(`Marking order ${order.id} as delivered`)
        alert(`Order ${order.id} marked as delivered`)
        break
      case 'inTransit':
        console.log(`Marking order ${order.id} as in transit`)
        alert(`Order ${order.id} marked as in transit`)
        break
      case 'processReturn':
        console.log(`Processing return for order ${order.id}`)
        alert(`Processing return for order ${order.id}`)
        break
      case 'reportIssue':
        console.log(`Reporting issue for order ${order.id}`)
        alert(`Issue report opened for order ${order.id}`)
        break
      case 'sendReminder':
        console.log(`Sending payment reminder for order ${order.id}`)
        alert(`Payment reminder sent for order ${order.id}`)
        break
      case 'archive':
        console.log(`Archiving order ${order.id}`)
        alert(`Order ${order.id} archived`)
        break
      case 'cancel':
        console.log(`Cancelling order ${order.id}`)
        if (confirm(`Are you sure you want to cancel order ${order.id}? This action cannot be undone.`)) {
          alert(`Order ${order.id} cancelled`)
        }
        break
      default:
        break
    }
  }

  const handleReviewAction = (action, review) => {
    switch (action) {
      case 'view':
        console.log(`Viewing full review`)
        alert(`Viewing full review with rating ${review.rating}`)
        break
      case 'feature':
        console.log(`Featuring review`)
        alert(`Review has been featured`)
        break
      case 'reply':
        console.log(`Replying to review`)
        alert(`Opening reply dialog for review`)
        break
      case 'flag':
        console.log(`Flagging review as inappropriate`)
        alert(`Review has been flagged for moderation`)
        break
      case 'hide':
        console.log(`Hiding review`)
        alert(`Review has been hidden`)
        break
      case 'delete':
        console.log(`Deleting review`)
        if (confirm(`Are you sure you want to delete this review? This action cannot be undone.`)) {
          alert(`Review deleted`)
        }
        break
      default:
        break
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="mb-6">
            <div className="flex gap-6 w-full">
              {/* Left side - Product Image, Rating, Name, Shop */}
              <div className="flex-1">
                {/* Product Image */}
                <div className="w-full h-48 mb-4">
                  <img 
                    src={product.productImage} 
                    alt={product.name}
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>

                <div className="flex items-start gap-10 justify-between">
                  <div>
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-4 bg-gray-300 px-4 py-2 rounded-full w-fit">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-5 h-5 ${star <= product.rating ? 'fill-orange-500 text-orange-500' : 'fill-gray-400 text-gray-400'}`}
                        />
                      ))}
                    </div>

                    {/* Product Name */}
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                    {/* Shop Info */}
                    <div 
                      className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => navigate(`/store/${encodeURIComponent(product.shop)}`)}
                    >
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden">
                        <ShoppingCart className="w-5 h-5 text-[#F19534]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-600">Shop</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">{product.shop}</span>
                          {product.shopVerified && <BadgeCheck className="w-4 h-4 text-[#F19534]" fill="#F19534" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats at Bottom */}
                <div className="grid grid-cols-3 gap-8 mt-8">
                  <div>
                    <div className="font-sm text-[12px]">Orders</div>
                    <div className="text-3xl font-bold">{product.orders}</div>
                  </div>
                  <div>
                    <div className="font-sm text-[12px]">Amount Sold</div>
                    <div className="text-3xl font-bold">{product.amountSold}</div>
                  </div>
                  <div>
                    <div className="font-sm text-[12px]">Reviews</div>
                    <div className="text-3xl font-bold">{product.reviews}</div>
                  </div>
                </div>
              </div>

              {/* Cards Section - Grid Layout */}
              <div className="grid grid-cols-2 gap-6 items-start flex-1">
                {/* Sales Volume Card */}
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Package className="w-5 h-5 text-[#F19534]" />
                    <select className="text-[12px] border-0 bg-gray-400 rounded-md">
                      <option>This Year</option>
                      <option>Last Year</option>
                    </select>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">Sales Volume</div>
                  <div className="text-[30px] font-bold mb-1">{product.salesVolume}</div>
                  <div className="text-xs">
                    <span className="text-gray-600">compared to last year</span>
                  </div>
                  <div className="mt-2 inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                    {product.salesGrowth}%
                  </div>
                  <div className="mt-4 text-xs text-gray-600">
                    <div className="mb-1">Created At</div>
                    <div className="font-bold text-gray-900">{product.createdAt}</div>
                  </div>
                </div>

                {/* Product Views Card */}
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="w-5 h-5 text-[#F19534]" />
                    <select className="text-[12px] border-0 bg-gray-400 rounded-md">
                      <option>Today</option>
                      <option>This Week</option>
                      <option>This Month</option>
                    </select>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">Product Views</div>
                  <div className="text-[30px] font-bold">{product.productViews}</div>
                </div>

                {/* Order Distribution Map - Full Width */}
                <div className="col-span-2">
                  <OrderDistributionMap 
                    height="h-48"
                    showLegend={true}
                    showStats={true}
                    darkMode={true}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Orders</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
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
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="mr-3"
                      />
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">User</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Amount</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Quantity</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Country</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Total Shop Orders</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {product.ordersList.map((item, idx) => (
                    <tr 
                      key={item.id + idx} 
                      className="hover:bg-gray-50 cursor-context-menu"
                      onContextMenu={(e) => handleOrderContextMenu(e, item)}
                    >
                      <td className="px-6 py-3 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          checked={selectedOrders.includes(idx)}
                          onChange={() => handleSelectOrder(idx)}
                          className="mr-3" 
                        />
                        <span className="font-medium text-gray-900">{item.id}</span>
                      </td>
                      <td 
                        className="px-6 py-3 cursor-pointer hover:opacity-80"
                        onClick={() => navigate(`/profile/${encodeURIComponent(item.user)}`)}
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.userAvatar} 
                            alt={item.user}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{item.user}</span>
                            <span className="text-xs text-gray-500">{item.userId}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-center">{item.amount.toLocaleString()}</td>
                      <td className="px-6 py-3 text-center">{item.quantity}</td>
                      <td className="px-6 py-3 text-center">
                        <span className="text-2xl">{getCountryFlag(item.country)}</span>
                      </td>
                      <td className="px-6 py-3 text-center">{item.totalShopOrders}</td>
                      <td className="px-6 py-3 text-center">
                        <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Reviews and Sales Report Side by Side */}
          <div className="grid grid-cols-12 gap-6">
            {/* Reviews */}
            <div className="col-span-6 bg-white rounded-lg shadow">
              <StandardTable
                title="Reviews"
                showSearch={true}
                showFilter={true}
                columns={["Latest Reviews", "Salutes", "Rating"]}
                data={product.reviewsList}
                renderRow={(item) => (
                  <tr 
                    key={item.id} 
                    className="hover:bg-gray-50 cursor-context-menu"
                    onContextMenu={(e) => handleReviewContextMenu(e, item)}
                  >
                    <td className="px-6 py-3">
                      <div className="text-sm text-gray-800 line-clamp-2">{item.content}</div>
                    </td>
                    <td className="px-6 py-3 text-center">{item.salutes}</td>
                    <td className="px-6 py-3 text-center">{item.rating}</td>
                  </tr>
                )}
              />
            </div>

            {/* Sales Report */}
            <SalesReportChart salesData={product.salesData} />
          </div>
        </div>
      </div>

      {/* Context Menus */}
      <OrderContextMenu
        isOpen={orderContextMenu.isOpen}
        position={orderContextMenu.position}
        onClose={closeOrderContextMenu}
        order={orderContextMenu.order}
        onAction={handleOrderAction}
      />
      <ReviewContextMenu
        isOpen={reviewContextMenu.isOpen}
        position={reviewContextMenu.position}
        onClose={closeReviewContextMenu}
        review={reviewContextMenu.review}
        onAction={handleReviewAction}
      />
    </div>
  )
}

export default ProductProfile

