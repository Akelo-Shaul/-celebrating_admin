import React from 'react'
import HeaderSearch from './celebrity_list_widgets/HeaderSearch'
import CelebTable from './celebrity_list_widgets/CelebTable'
import LocationDistribution from '../users/all_user_widgets/LocationDistribution'

const CelebrityList = () => {
  return (
    <div className="p-4">
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