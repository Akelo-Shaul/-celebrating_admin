import React from 'react'
import { Store, DollarSign, ShoppingCart } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import ShopRankings from './shop_widgets/ShopRankings'
import ShopDistribution from './shop_widgets/ShopDistribution'
import SalesMapping from './shop_widgets/SalesMapping'
import BestSellers from './shop_widgets/BestSellers'
import SalesReport from './shop_widgets/SalesReport'

const ShopsOverview = () => {
  const shops = [
    { name: 'Marika Halaga', posts: 32, country: 'Kenya', sales: 32000, followers: 32000, rating: 4.5, trend: 'up', status: 'active', owner: 'John Doe' },
    { name: 'Cham Thum', posts: 32, country: 'Kenya', sales: 23000, followers: 23000, rating: 4.3, trend: 'down', status: 'active', owner: 'Jane Smith' },
    { name: 'Paward Chung', posts: 12, country: 'Kenya', sales: 23000, followers: 23000, rating: 4.3, trend: 'down', status: 'pending', owner: 'Mike Johnson' },
    { name: 'Hang Turm', posts: 32, country: 'Kenya', sales: 23000, followers: 23000, rating: 4.3, trend: 'up', status: 'active', owner: 'Sarah Williams' },
    { name: 'Hankue Hue', posts: 32, country: 'Kenya', sales: 23000, followers: 23000, rating: 4.3, trend: 'down', status: 'pending', owner: 'Tom Brown' },
  ]

  const sellers = [
    { product: 'Mtumba Connect', orders: 54, owner: 'A. Mwangi', country: 'Kenya', sales: 32000 },
    { product: 'Mtumba Connect', orders: 54, owner: 'A. Mwangi', country: 'Kenya', sales: 32000 },
    { product: 'Mtumba Connect', orders: 54, owner: 'A. Mwangi', country: 'Kenya', sales: 32000 },
  ]

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Shops Overview</h1>
        <p className="text-gray-600 mt-1">Monitor shop performance, sales, and rankings across the platform</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Top stat cards: stack on small, row on md+ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard 
              title="All Shops" 
              value="124,209"
              suffix="Shops"
              change="+2.54%" 
              changeType="up"
              icon={Store}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
              comparisonText="compared to last year"
            />
            <StatCard 
              title="Sales Volume" 
              value="$124,209"
              change="+2.54%" 
              changeType="up"
              icon={DollarSign}
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
              comparisonText="compared to last year"
            />
            <StatCard 
              title="Order Volume" 
              value="124,209"
              change="+2.54%" 
              changeType="up"
              icon={ShoppingCart}
              iconBgColor="bg-purple-100"
              iconColor="text-purple-600"
              comparisonText="compared to last year"
            />
          </div>

          {/* Main content: Shop Rankings */}
          <ShopRankings shops={shops} />

        </div>

        {/* Right sidebar - stacks under main content on small screens */}
        <aside className="md:col-span-1 flex flex-col gap-6">
          <ShopDistribution />
          <SalesMapping />
        </aside>
      </div>

      {/* Bottom row: Best Sellers + Sales Report (stack on small) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8 pb-8">
        <BestSellers sellers={sellers} />
        <SalesReport />
      </div>
    </div>
  )
}

export default ShopsOverview