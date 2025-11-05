import React from 'react'
import { Shield, Users, Lock, Activity, AlertTriangle, CheckCircle } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import AccessStats from './access_control_widgets/AccessStats'
import RolesTable from './access_control_widgets/RolesTable'
import PermissionsMatrix from './access_control_widgets/PermissionsMatrix'
import AccessAuditLog from './access_control_widgets/AccessAuditLog'
import UserRoleAssignments from './access_control_widgets/UserRoleAssignments'
import RoleDistributionChart from './access_control_widgets/RoleDistributionChart'

const AccessControl = () => {
  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Access Control</h1>
        <p className="text-gray-600 mt-1">Manage user permissions, roles, and access control settings across the platform</p>
      </div>

      {/* Top Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard 
          title="Total Roles" 
          value="12"
          change="+2" 
          changeType="up"
          icon={Shield}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          comparisonText="new roles added this month"
        />
        <StatCard 
          title="Active Permissions" 
          value="48"
          suffix="Permissions"
          change="+5" 
          changeType="up"
          icon={Lock}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
          comparisonText="permissions configured"
        />
        <StatCard 
          title="Users by Role" 
          value="124,209"
          suffix="Users"
          change="+2.54%" 
          changeType="up"
          icon={Users}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          comparisonText="compared to last month"
        />
        <StatCard 
          title="Access Logs Today" 
          value="2,847"
          change="+12%" 
          changeType="up"
          icon={Activity}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
          comparisonText="compared to yesterday"
        />
        <StatCard 
          title="Security Alerts" 
          value="3"
          change="-2" 
          changeType="down"
          icon={AlertTriangle}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
          comparisonText="resolved this week"
        />
        <StatCard 
          title="Compliance Status" 
          value="100%"
          change="Maintained" 
          changeType="up"
          icon={CheckCircle}
          iconBgColor="bg-emerald-100"
          iconColor="text-emerald-600"
          comparisonText="all policies compliant"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Roles Management Table */}
          <RolesTable />

          {/* Permissions Matrix */}
          <PermissionsMatrix />
        </div>

        {/* Right Column - Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* Role Distribution Chart */}
          <RoleDistributionChart />

          {/* Access Statistics */}
          <AccessStats />
        </aside>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 pb-8">
        {/* User Role Assignments */}
        <UserRoleAssignments />

        {/* Access Audit Log */}
        <AccessAuditLog />
      </div>
    </div>
  )
}

export default AccessControl

