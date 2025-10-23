import { BadgeCheck, MapPin, Mail, Phone, TrendingUp, TrendingDown, ShoppingCart, Star, Package, Edit, Trash2, Eye, BarChart2, Archive, AlertTriangle, Flag, ThumbsUp, MessageSquare } from 'lucide-react'
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

const Stat = ({ label, value }) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-gray-900">{value}</div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
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
        <div className="text-xs text-gray-500">{product.category}</div>
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
      icon: Archive,
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

const StoreProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const store = useMemo(() => ({
    id,
    name: decodeURIComponent(id || 'Shang Mulan'),
    owner: 'Braum Halaberry',
    verified: true,
    location: 'Kenya',
    email: 'braum.h@gmail.com',
    phone: '+254 708 045 985',
    followers: '12,087',
    revenue: '$ 12,087',
    profileVisits: '200',
    salesVolume: '$ 124,209',
    salesGrowth: '+2.54',
    createdAt: '28-02-2000',
    bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    distribution: {
      above10k: 3,
      above30k: 5,
      above50k: 2
    },
    products: [
      { id: 'pr1', name: 'Marika Haloga', category: 'Bungi Helm', salesVolume: 32000, orders: 32000, rating: 4.5, trend: 'up' },
      { id: 'pr2', name: 'Marika Haloga', category: 'Bungi Helm', salesVolume: 23000, orders: 23000, rating: 4.3, trend: 'down' },
      { id: 'pr3', name: 'Marika Haloga', category: 'Bungi Helm', salesVolume: 23000, orders: 23000, rating: 4.3, trend: 'down' },
      { id: 'pr4', name: 'Marika Haloga', category: 'Bungi Helm', salesVolume: 23000, orders: 23000, rating: 4.3, trend: 'up' },
      { id: 'pr5', name: 'Marika Haloga', category: 'Bungi Helm', salesVolume: 23000, orders: 23000, rating: 4.3, trend: 'down' },
      { id: 'pr6', name: 'Marika Haloga', category: 'Bungi Helm', salesVolume: 23000, orders: 23000, rating: 4.3, trend: 'down' }
    ],
    reviews: [
      { id: 'r1', content: "Can't believe this is how it is supposed to be and how about we just do it ...", product: 'Product Name', productImage: 'https://randomuser.me/api/portraits/men/11.jpg', salutes: 50, rating: 3.5 },
      { id: 'r2', content: "Can't believe this is how it is supposed to be and how about we just do it ...", product: 'Product Name', productImage: 'https://randomuser.me/api/portraits/women/12.jpg', salutes: 50, rating: 3.5 },
      { id: 'r3', content: "Can't believe this is how it is supposed to be and how about we just do it ...", product: 'Product Name', productImage: 'https://randomuser.me/api/portraits/men/13.jpg', salutes: 50, rating: 3.5 },
      { id: 'r4', content: "Can't believe this is how it is supposed to be and how about we just do it ...", product: 'Product Name', productImage: 'https://randomuser.me/api/portraits/women/14.jpg', salutes: 50, rating: 3.5 },
      { id: 'r5', content: "Can't believe this is how it is supposed to be and how about we just do it ...", product: 'Product Name', productImage: 'https://randomuser.me/api/portraits/men/15.jpg', salutes: 50, rating: 3.5 }
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

  const maxSales = Math.max(...store.salesData.map(d => d.sales))

  // Product Context Menu State
  const [productContextMenu, setProductContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, product: null })

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
        if (confirm(`Are you sure you want to delete ${product.name}? This action cannot be undone.`)) {
          alert(`Product ${product.name} deleted`)
        }
        break
      default:
        break
    }
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
        {/* Left Section - Profile Info */}
        <div className="col-span-12">
          <div className="mb-6">
            <div className="flex gap-6 w-full">
              {/* Left side - Banner, Rating, Name, Owner */}
              <div className="flex-1">
                {/* Banner Image */}
                <div className="w-full h-48 mb-4">
                  <img 
                    src={store.bannerUrl} 
                    alt={store.name}
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
                            className={`w-5 h-5 ${star <= 3 ? 'fill-orange-500 text-orange-500' : 'fill-gray-400 text-gray-400'}`}
                            />
                        ))}
                        </div>

                        {/* Store Name */}
                        <h1 className="text-4xl font-bold mb-4">{store.name}</h1>

                        {/* Owner Info */}
                        <div 
                          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => navigate(`/profile/${encodeURIComponent(store.owner)}`)}
                        >
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                            <span className="text-xs text-gray-600">Owner</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-600">Owner</span>
                            <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{store.owner}</span>
                            {store.verified && <BadgeCheck className="w-4 h-4 text-[#F19534]" fill="#F19534" />}
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Right side - Contact Info and Stats */}
                    <div className="flex-1 flex flex-col justify-between p-6">
                        {/* Contact Information */}
                        <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-gray-600" />
                            <span className="text-base">{store.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-gray-600" />
                            <span className="text-base">{store.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-gray-600" />
                            <span className="text-base">{store.phone}</span>
                        </div>
                        </div>
                    </div>
                </div>

                {/* Stats at Bottom */}
                <div className="grid grid-cols-3 gap-8 mt-8">
                  <div>
                    <div className="font-sm text-[12px]">Followers</div>
                    <div className="text-3xl font-bold">{store.followers}</div>
                  </div>
                  <div>
                    <div className="font-sm text-[12px]">Revenue</div>
                    <div className="text-3xl font-bold">{store.revenue}</div>
                  </div>
                  <div>
                    <div className="flex gap-0.3 items-center gap-3 justify-between mb-1">
                      <span className="font-sm text-[12px]">Profile Visits</span>
                      <select className="text-[12px] border-0 bg-gray-400 rounded-md">
                        <option>Today</option>
                        <option>This Week</option>
                        <option>This Month</option>
                      </select>
                    </div>
                    <div className="text-3xl font-bold">{store.profileVisits}</div>
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
                  <div className="text-[30px] font-bold mb-1">{store.salesVolume}</div>
                  <div className="text-xs">
                    <span className="text-gray-600">compared to last year</span>
                  </div>
                  <div className="mt-2 inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                    {store.salesGrowth}%
                  </div>
                  <div className="mt-4 text-xs text-gray-600">
                    <div className="mb-1">Created At</div>
                    <div className="font-bold text-gray-900">{store.createdAt}</div>
                  </div>
                </div>

                {/* Order Distribution Map */}
                <OrderDistributionMap 
                  height="h-48"
                  showLegend={true}
                  showStats={true}
                  darkMode={true}
                />
              </div>
            </div>
          </div>

          {/* Shop Products */}
          <div className="bg-white rounded-lg shadow mb-6">
            <StandardTable
              title="Shop Products"
              showSearch={true}
              showFilter={true}
              columns={["Name", "Sales Volume ($)", "Orders", "Rating", ""]}
              data={store.products}
              renderRow={(item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/product/${encodeURIComponent(item.name)}`)}
                  onContextMenu={(e) => handleProductContextMenu(e, item)}
                >
                  <td className="px-6 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <div className="flex items-center gap-1 mt-1">
                        <ShoppingCart className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-600">{item.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center">{item.salesVolume.toLocaleString()}</td>
                  <td className="px-6 py-3 text-center">{item.orders.toLocaleString()}</td>
                  <td className="px-6 py-3 text-center">{item.rating}</td>
                  <td className="px-6 py-3 text-center">
                    {item.trend === 'up' ? (
                      <TrendingUp className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                </tr>
              )}
            />
          </div>

          {/* Reviews and Sales Report Side by Side */}
          <div className="grid grid-cols-12 gap-6">
            {/* Reviews */}
            <div className="col-span-6 bg-white rounded-lg shadow">
              <StandardTable
                title="Reviews"
                showSearch={true}
                showFilter={true}
                columns={["Latest Reviews", "Product", "Salutes", "Rating"]}
                data={store.reviews}
                renderRow={(item) => (
                  <tr 
                    key={item.id} 
                    className="hover:bg-gray-50 cursor-context-menu"
                    onContextMenu={(e) => handleReviewContextMenu(e, item)}
                  >
                    <td className="px-6 py-3">
                      <div className="text-sm text-gray-800 line-clamp-2">{item.content}</div>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <img 
                        src={item.productImage} 
                        alt={item.product} 
                        className="w-12 h-12 rounded object-cover mx-auto" 
                      />
                    </td>
                    <td className="px-6 py-3 text-center">{item.salutes}</td>
                    <td className="px-6 py-3 text-center">{item.rating}</td>
                  </tr>
                )}
              />
            </div>

            {/* Sales Report */}
            <SalesReportChart salesData={store.salesData} />
          </div>
        </div>
      </div>

      {/* Context Menus */}
      <ProductContextMenu
        isOpen={productContextMenu.isOpen}
        position={productContextMenu.position}
        onClose={closeProductContextMenu}
        product={productContextMenu.product}
        onAction={handleProductAction}
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

export default StoreProfile

