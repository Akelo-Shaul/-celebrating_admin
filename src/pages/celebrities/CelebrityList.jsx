import React from 'react'
import HeaderSearch from './celebrity_list_widgets/HeaderSearch'
import CelebTable from './celebrity_list_widgets/CelebTable'
import LocationDistribution from '../users/all_user_widgets/LocationDistribution'

const CelebrityList = () => {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Celebrities</h1>
        <p className="text-gray-600 mt-1">View and manage all verified celebrities on the platform</p>
      </div>
      <div className="">
        <HeaderSearch placeholder="Search Celebrities..." />
        <div className="mt-4">
          <CelebTable />
        </div>
      </div>
    </div>
  )
}

export default CelebrityList