import React, { useState } from 'react'
import { Calendar, Download } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import TicketRevenueChart from './ticket_sales_widgets/TicketRevenueChart'
import TicketDistributionWidget from './ticket_sales_widgets/TicketDistributionWidget'
import TopSellingEventsWidget from './ticket_sales_widgets/TopSellingEventsWidget'
import TicketSalesTable from './ticket_sales_widgets/TicketSalesTable'
import StandardTable from '../../components/common/StandardTable'

const TicketReports = () => {
  const [range, setRange] = useState({ from: '', to: '' })

  const stats = [
    { title: 'Tickets Sold', value: '45,632', change: '+12.5%', icon: Calendar, iconBgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
    { title: 'Revenue', value: '$967,234', change: '+18.3%', icon: Download, iconBgColor: 'bg-green-100', iconColor: 'text-green-600' }
  ]

  // Example table data (reuse ticket sales table component for detailed rows)
  const tableData = []

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col gap-4 mb-4 md:mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Ticket Reports</h1>
          <p className="text-sm md:text-base text-gray-600">Generate and export ticketing reports across events, channels and date ranges.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex items-center bg-white border rounded px-3 py-2 gap-2 flex-1 sm:flex-initial">
            <Calendar size={16} className="text-gray-500 flex-shrink-0" />
            <input type="date" value={range.from} onChange={e => setRange(r => ({ ...r, from: e.target.value }))} className="text-sm flex-1 min-w-0" />
            <span className="text-gray-400 flex-shrink-0">—</span>
            <input type="date" value={range.to} onChange={e => setRange(r => ({ ...r, to: e.target.value }))} className="text-sm flex-1 min-w-0" />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded text-sm md:text-base whitespace-nowrap">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="mb-4 md:mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {stats.map((s, i) => (
            <StatCard key={i} title={s.title} value={s.value} change={s.change} icon={s.icon} iconBgColor={s.iconBgColor} iconColor={s.iconColor} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-6 mb-4 md:mb-6">
        <div className="lg:col-span-8 space-y-3 md:space-y-6">
          <TicketRevenueChart />
          {/* Reuse the TicketSalesTable for a detailed list; if a dedicated report table is needed we can swap this */}
          <TicketSalesTable />
        </div>

        <div className="lg:col-span-4 space-y-3 md:space-y-6">
          <TicketDistributionWidget />
          <TopSellingEventsWidget />
        </div>
      </div>
    </div>
  )
}

export default TicketReports
