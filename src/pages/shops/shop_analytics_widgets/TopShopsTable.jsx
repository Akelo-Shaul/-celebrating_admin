import React from 'react'
import { TrendingUp, TrendingDown, Star, DollarSign } from 'lucide-react'

const TopShopsTable = () => {
  const topShops = [
    {
      rank: 1,
      name: 'Luxury Fashion Boutique',
      category: 'Fashion',
      revenue: '$145,230',
      orders: 1847,
      rating: 4.8,
      change: '+12.5%',
      changeType: 'up'
    },
    {
      rank: 2,
      name: 'Tech Haven Electronics',
      category: 'Electronics',
      revenue: '$132,450',
      orders: 1523,
      rating: 4.7,
      change: '+8.3%',
      changeType: 'up'
    },
    {
      rank: 3,
      name: 'Organic Delights',
      category: 'Food & Beverage',
      revenue: '$118,900',
      orders: 2145,
      rating: 4.9,
      change: '+15.2%',
      changeType: 'up'
    },
    {
      rank: 4,
      name: 'Beauty Haven',
      category: 'Beauty',
      revenue: '$95,670',
      orders: 1356,
      rating: 4.6,
      change: '-2.1%',
      changeType: 'down'
    },
    {
      rank: 5,
      name: 'Home Decor Paradise',
      category: 'Home & Garden',
      revenue: '$87,340',
      orders: 982,
      rating: 4.5,
      change: '+5.7%',
      changeType: 'up'
    },
    {
      rank: 6,
      name: 'Sports Zone',
      category: 'Sports',
      revenue: '$76,210',
      orders: 845,
      rating: 4.4,
      change: '+3.2%',
      changeType: 'up'
    },
    {
      rank: 7,
      name: 'Gadget Galaxy',
      category: 'Electronics',
      revenue: '$68,590',
      orders: 723,
      rating: 4.6,
      change: '-1.5%',
      changeType: 'down'
    },
    {
      rank: 8,
      name: 'Fashion Forward',
      category: 'Fashion',
      revenue: '$62,840',
      orders: 891,
      rating: 4.7,
      change: '+7.8%',
      changeType: 'up'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Top Performing Shops</h3>
        <p className="text-sm text-gray-600 mt-1">Ranked by revenue and performance</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Rank</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Shop Name</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Revenue</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Orders</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Rating</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Change</th>
            </tr>
          </thead>
          <tbody>
            {topShops.map((shop) => (
              <tr key={shop.rank} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    shop.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    shop.rank === 2 ? 'bg-gray-100 text-gray-700' :
                    shop.rank === 3 ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-50 text-blue-700'
                  }`}>
                    {shop.rank}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="font-medium text-gray-900">{shop.name}</div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {shop.category}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1 font-semibold text-gray-900">
                    <DollarSign size={14} className="text-gray-500" />
                    {shop.revenue.replace('$', '')}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-gray-700">{shop.orders.toLocaleString()}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-medium text-gray-900">{shop.rating}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className={`flex items-center gap-1 font-medium ${
                    shop.changeType === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {shop.changeType === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    <span>{shop.change}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopShopsTable
