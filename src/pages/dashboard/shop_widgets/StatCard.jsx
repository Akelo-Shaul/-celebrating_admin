import React from 'react'

const StatCard = ({ title, value, delta }) => (
  <div className="bg-white rounded-md shadow-sm p-4 flex flex-col gap-2">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-semibold">{value}</div>
    {delta && <div className="text-xs text-green-600 font-medium">+{delta}% compared to last year</div>}
  </div>
)

export default StatCard
