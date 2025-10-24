import React from 'react'
import TopCelebrities from './user_widgets/TopCelebrities'
import CountryRankings from './user_widgets/CountryRankings'
import UsersGrowth from './user_widgets/UsersGrowth'
import TopShops from './user_widgets/TopShops'

const UserOverview = () => {
  return (
    <div className="p-6 h-full overflow-x-hidden">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Overview</h1>
        <p className="text-gray-600 mt-1">Track user growth, engagement, and top performers across the platform</p>
      </div>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-[2] h-full">
                <div className="h-full">
                    <TopCelebrities />
                </div>
            </div>
            <div className="flex-1 h-full">
                <div className="h-full">
                    <CountryRankings />
                </div>
            </div>
        </div>
        <div className="flex flex-col pb-10 md:flex-row gap-6 min-w-0">
          <div className="flex-1 min-w-0">
            <UsersGrowth />
          </div>
          <div className="flex-1 min-w-0">
            <TopShops />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserOverview