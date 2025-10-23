import React from 'react'
import { Users, UserCheck, UserPlus, Award, UserCog, Globe } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import LocationDistribution from './all_user_widgets/LocationDistribution'
import UsersTable from './all_user_widgets/UsersTable'

const AllUsers = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard 
            title="All Users" 
            value="124,209"
            suffix="Users"
            change="+2.54%" 
            changeType="up"
            icon={Users}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            comparisonText="compared to last year"
          />
          <StatCard 
            title="Active Users" 
            value="104,209"
            suffix="Users"
            change="+2.54%" 
            changeType="up"
            icon={UserCheck}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            comparisonText="compared to last year"
          />
          <StatCard 
            title="New Registrations" 
            value="4,209"
            change="+2.54%" 
            changeType="up"
            icon={UserPlus}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            comparisonText="compared to last year"
          />
          <StatCard 
            title="Verified Celebrities" 
            value="54,209"
            suffix="Users"
            change="+2.54%" 
            changeType="up"
            icon={Award}
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
            comparisonText="compared to last year"
          />
          <StatCard 
            title="Member Count" 
            value="95,209"
            suffix="Users"
            change="+2.54%" 
            changeType="up"
            icon={UserCog}
            iconBgColor="bg-indigo-100"
            iconColor="text-indigo-600"
            comparisonText="compared to last year"
          />
          <StatCard 
            title="Online Users" 
            value="4,209"
            icon={Globe}
            iconBgColor="bg-emerald-100"
            iconColor="text-emerald-600"
          />
        </div>

        <div className="lg:col-span-3">
          <LocationDistribution />
        </div>

        <div className="lg:col-span-12">
          <UsersTable />
        </div>
      </div>
    </div>
  )
}

export default AllUsers