
import React from 'react'
import OrderDistributionMap from '../../../components/common/OrderDistributionMap'

const RevenueHeatmap = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Revenue Heatmap</h3>

      {/* Reuse the OrderDistributionMap for revenue heat visualization. */}
      <OrderDistributionMap
        // Use default demo data for now; map-specific data can be passed via props later
        height="h-64"
        showHeader={false}
        showLegend={false}
        showStats={false}
      />
    </div>
  )
}

export default RevenueHeatmap






