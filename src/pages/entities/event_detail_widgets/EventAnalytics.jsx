import React from 'react'
import { TrendingUp, TrendingDown, Users, DollarSign, Ticket, Target } from 'lucide-react'

const EventAnalytics = () => {
  const analyticsData = [
    {
      title: 'Conversion Rate',
      value: '12.5%',
      change: '+2.3%',
      trend: 'up',
      icon: Target,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Avg Ticket Price',
      value: '$261.81',
      change: '+5.4%',
      trend: 'up',
      icon: Ticket,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Total Attendees',
      value: '475',
      change: '+18.2%',
      trend: 'up',
      icon: Users,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Revenue per Attendee',
      value: '$261.49',
      change: '-1.2%',
      trend: 'down',
      icon: DollarSign,
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Event Performance Analytics</h2>
        <p className="text-sm text-gray-600 mt-1">Key metrics and insights for this event</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-lg ${item.bgColor}`}>
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>
              {item.trend === 'up' ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
            </div>
            <div className="text-sm text-gray-600 mb-1">{item.title}</div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{item.value}</div>
            <div className={`text-sm font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {item.change} from last event
            </div>
          </div>
        ))}
      </div>

      {/* Additional Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Regions</h3>
          <div className="space-y-3">
            {[
              { region: 'North America', sales: '$45,230', percentage: 36 },
              { region: 'Europe', sales: '$38,120', percentage: 31 },
              { region: 'Asia Pacific', sales: '$28,459', percentage: 23 },
              { region: 'Others', sales: '$12,400', percentage: 10 }
            ].map((region, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{region.region}</span>
                    <span className="text-sm text-gray-600">{region.sales}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{ width: `${region.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Type Distribution</h3>
          <div className="space-y-3">
            {[
              { type: 'VIP', sold: 50, total: 100, color: 'bg-yellow-500' },
              { type: 'Early Bird', sold: 250, total: 300, color: 'bg-green-500' },
              { type: 'General', sold: 75, total: 100, color: 'bg-blue-500' }
            ].map((ticket, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{ticket.type}</span>
                    <span className="text-sm text-gray-600">{ticket.sold}/{ticket.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${ticket.color} h-2 rounded-full`}
                      style={{ width: `${(ticket.sold / ticket.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventAnalytics

