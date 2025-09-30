import React from 'react'
import TopCelebrities from './widgets/TopCelebrities'
import CountryRankings from './widgets/CountryRankings'
import UsersGrowth from './widgets/UsersGrowth'
import TopShops from './widgets/TopShops'

const UserOverview = () => {
  return (
    <div className="p-6 h-full overflow-x-hidden">
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-row gap-6">
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
        <div className="flex flex-row gap-6">
            <div className="flex-1">
                <UsersGrowth />
            </div>
            <div className="flex-1">
                <TopShops />
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserOverview