import React from 'react'

const ShopDistribution = () => (
  <div className="bg-white rounded-md shadow-sm p-4">
    <h5 className="font-semibold mb-2">Shop Distribution</h5>
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm text-gray-700"><div>Kenya</div><div>125.0K</div></div>
      <div className="h-2 bg-gray-200 rounded overflow-hidden"><div className="h-2 bg-yellow-400 w-3/4"></div></div>
      <div className="flex items-center justify-between text-sm text-gray-700"><div>Nigeria</div><div>95.0K</div></div>
      <div className="h-2 bg-gray-200 rounded overflow-hidden"><div className="h-2 bg-yellow-400 w-2/3"></div></div>
      <div className="flex items-center justify-between text-sm text-gray-700"><div>Ghana</div><div>45.0K</div></div>
      <div className="h-2 bg-gray-200 rounded overflow-hidden"><div className="h-2 bg-yellow-400 w-1/3"></div></div>
    </div>
  </div>
)

export default ShopDistribution
