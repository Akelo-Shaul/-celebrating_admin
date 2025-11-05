import React, { useMemo, useState } from 'react'
import StatCard from '../../components/common/StatCard'
import StandardTable from '../../components/common/StandardTable'
import EngagementChart from '../users/user_activities_widgets/EngagementChart'
import { Star, Users, Activity, BarChart3, MessageSquare, UserPlus, Edit3, Slash, Bell, User, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ContextMenu from '../../components/common/ContextMenu'


const mockCelebrities = Array.from({ length: 12 }).map((_, i) => {
  const followers = [32000, 23000, 45000, 12000, 56000, 18000, 41000, 72000][i % 8]
  const posts = [32, 24, 54, 12, 42, 18, 30, 48][i % 8]
  const salutes = [32000, 12000, 4300, 8900, 15000, 7000, 22000, 48000][i % 8]
  const comments = [1200, 540, 210, 1200, 800, 230, 980, 1500][i % 8]
  const recelebrations = [300, 120, 34, 250, 410, 90, 210, 520][i % 8]
  const shares = [300, 45, 12, 88, 140, 34, 110, 240][i % 8]
  const profileVisits = [200, 500, 1200, 900, 1500, 400, 800, 2100, 3200, 4200, 1800, 6100][i % 12]
  const rating = [4.5, 4.3, 3.9, 4.8, 4.2, 3.7, 4.6, 4.9][i % 8]

  return {
    id: `c${100 + i}`,
    name: ['Marika Halaga','Cham Thum','Paward Chung','Hang Turm','Hankue Hue','Shaul Akelo','Braum Hallaberry','Olivia Davis','Sofia Vega','Liam Carter','Noah Lee','Ava Brown'][i % 12],
    handle: `handle${i}`,
    followers,
    posts,
    salutes,
    comments,
    recelebrations,
    shares,
    profileVisits,
    rating,
    connections: Math.floor(followers * (0.25 + (i % 4) * 0.05)),
    // derive reach and conversions as demo-friendly fields
    reach: Math.floor((profileVisits * (1 + (i % 5) * 0.15)) + followers * 0.1),
    conversions: Math.max(0, Math.floor(((salutes + comments + recelebrations + shares) / Math.max(1, followers)) * 1000 * ((i % 5) + 1) / 3)),
    trendType: i % 3 === 0 ? 'up' : 'down'
  }
})

const PerformanceMetrics = () => {
  // memoized list used across the page
  const celebs = useMemo(() => mockCelebrities, [])

  // simple engagement calculator used for rankings
  const computeEngagement = (c) => {
    return (c.salutes || 0) + (c.comments || 0) + (c.recelebrations || 0) + (c.shares || 0)
  }
  const totalImpressions = celebs.reduce((s, c) => s + (c.profileVisits || 0), 0)
  const totalFollowers = celebs.reduce((s, c) => s + (c.followers || 0), 0)
  const totalEngagements = celebs.reduce((s, c) => s + computeEngagement(c), 0)

  const topByFollowers = [...celebs].sort((a,b) => b.followers - a.followers).slice(0,5)
  const topByEngagement = [...celebs].sort((a,b) => computeEngagement(b) - computeEngagement(a)).slice(0,5)
  const topByRating = [...celebs].sort((a,b) => b.rating - a.rating).slice(0,5)
  const topByReach = [...celebs].sort((a,b) => b.reach - a.reach).slice(0,5)
  const topByConnections = [...celebs].sort((a,b) => b.connections - a.connections).slice(0,5)
  const topBySalutes = [...celebs].sort((a,b) => (b.salutes||0) - (a.salutes||0)).slice(0,10)
  const topByComments = [...celebs].sort((a,b) => (b.comments||0) - (a.comments||0)).slice(0,10)
  const topByRecelebrations = [...celebs].sort((a,b) => (b.recelebrations||0) - (a.recelebrations||0)).slice(0,10)

  const navigate = useNavigate()

  // Context menu state
  const [contextMenuPos, setContextMenuPos] = useState(null)
  const [contextMenuItems, setContextMenuItems] = useState([])
  const [contextMenuHeader, setContextMenuHeader] = useState(null)

  const closeContextMenu = () => {
    setContextMenuPos(null)
    setContextMenuItems([])
  }

  const openContextMenu = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    const x = e.clientX
    const y = e.clientY

    const goToProfile = () => navigate(`/profile/${encodeURIComponent(item.name)}`)
    const goToPosts = () => navigate(`/profile/${encodeURIComponent(item.name)}`, { state: { open: 'posts' }})
    const goToAnalytics = () => navigate(`/celebrities/${encodeURIComponent(item.name)}/analytics`)
    const goToConnections = () => navigate(`/profile/${encodeURIComponent(item.name)}`, { state: { open: 'connections' }})
    const sendMessage = () => navigate(`/messages/compose?to=${encodeURIComponent(item.name)}`)
    const sendNotification = () => navigate(`/notifications/new?user=${encodeURIComponent(item.name)}`)

    const baseItems = [
      { label: 'View Profile', onClick: goToProfile, icon: User, iconColor: 'text-gray-600', labelColor: 'text-gray-800' },
      { label: 'View Posts', onClick: goToPosts, icon: FileText, iconColor: 'text-gray-600', labelColor: 'text-gray-800' },
      { label: 'View Analytics', onClick: goToAnalytics, icon: BarChart3, iconColor: 'text-gray-600', labelColor: 'text-gray-800' },
      { label: 'View Connections', onClick: goToConnections, icon: UserPlus, iconColor: 'text-green-500', labelColor: 'text-gray-800' },
      { label: 'Message User', onClick: sendMessage, icon: MessageSquare, iconColor: 'text-blue-500', labelColor: 'text-blue-600' },
      { label: 'Send Notification', onClick: sendNotification, icon: Bell, iconColor: 'text-purple-500', labelColor: 'text-purple-600' },
      { label: 'Disable Account', onClick: () => { /* destructive placeholder */ }, icon: Slash, iconColor: 'text-red-500', labelColor: 'text-red-600' }
    ]

    // You can tailor items by source if needed
    setContextMenuItems(baseItems)
    setContextMenuHeader({ title: item.name, subtitle: 'Celebrity' })
    setContextMenuPos({ x, y })
  }

  // Table renderers
  const renderRow = (item) => (
    <tr key={item.id} className="hover:bg-gray-50 cursor-pointer" onContextMenu={(e) => openContextMenu(e, item)}>
      <td className="px-6 py-3">
        <div className="font-medium text-gray-900">{item.name}</div>
        <div className="text-xs text-gray-500">@{item.handle}</div>
      </td>
      <td className="px-6 py-3 text-center">{item.followers.toLocaleString()}</td>
      <td className="px-6 py-3 text-center">{computeEngagement(item).toLocaleString()}</td>
      <td className="px-6 py-3 text-center">{item.rating}</td>
      <td className="px-6 py-3 text-center">{item.connections.toLocaleString()}</td>
    </tr>
  )

  const [activeTab, setActiveTab] = useState('salutes')

  const tabDataMap = {
    salutes: { rows: topBySalutes, label: 'Salutes' },
    comments: { rows: topByComments, label: 'Comments' },
    recelebrations: { rows: topByRecelebrations, label: 'ReCelebrations' }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Celebrity Performance Metrics</h1>
        <p className="text-gray-600 mt-1">Key performance indicators and rankings for celebrities across the platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Impressions" value={totalImpressions.toLocaleString()} icon={Activity} iconBgColor="bg-blue-100" iconColor="text-blue-600" />
        <StatCard title="Total Followers" value={totalFollowers.toLocaleString()} icon={Users} iconBgColor="bg-green-100" iconColor="text-green-600" />
        <StatCard title="Total Engagements" value={totalEngagements.toLocaleString()} icon={Star} iconBgColor="bg-yellow-100" iconColor="text-yellow-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Top Interactions</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => setActiveTab('salutes')} className={`px-3 py-1 rounded ${activeTab==='salutes' ? 'bg-[#F19534] text-white' : 'bg-gray-100 text-gray-700'}`}>Top Salutes</button>
                <button onClick={() => setActiveTab('comments')} className={`px-3 py-1 rounded ${activeTab==='comments' ? 'bg-[#F19534] text-white' : 'bg-gray-100 text-gray-700'}`}>Top Comments</button>
                <button onClick={() => setActiveTab('recelebrations')} className={`px-3 py-1 rounded ${activeTab==='recelebrations' ? 'bg-[#F19534] text-white' : 'bg-gray-100 text-gray-700'}`}>Top ReCelebrations</button>
              </div>
              {/* Right-click context menu for rows */}
              <ContextMenu
                items={contextMenuItems}
                position={contextMenuPos}
                header={contextMenuHeader}
                onOutsideClick={() => { setContextMenuHeader(null); closeContextMenu(); }}
              />
            </div>

            <StandardTable
              title={tabDataMap[activeTab].label}
              showSearch={true}
              showFilter={false}
              columns={["Celebrity", tabDataMap[activeTab].label, "Followers", "Engagements"]}
              data={tabDataMap[activeTab].rows}
              renderRow={(item) => (
                <tr key={item.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-3">
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500">@{item.handle}</div>
                  </td>
                  <td className="px-6 py-3 text-center">{(activeTab === 'salutes' ? item.salutes : activeTab === 'comments' ? item.comments : item.recelebrations).toLocaleString()}</td>
                  <td className="px-6 py-3 text-center">{item.followers.toLocaleString()}</td>
                  <td className="px-6 py-3 text-center">{computeEngagement(item).toLocaleString()}</td>
                </tr>
              )}
              maxHeight={360}
            />
          </div>
        </div>
          <div className="flex flex-col gap-6">
            <StandardTable
              title="Top Followers"
              showSearch={false}
              showFilter={false}
              columns={["Celebrity", "Followers", "Engagements", "Rating", "Connections"]}
              data={topByFollowers}
              renderRow={(item) => renderRow(item)}
              maxHeight={260}
              className="min-w-0"
            />

            <StandardTable
              title="Top Engagement"
              showSearch={false}
              showFilter={false}
              columns={["Celebrity", "Followers", "Engagements", "Rating", "Connections"]}
              data={topByEngagement}
              renderRow={(item) => renderRow(item)}
              maxHeight={260}
              className="min-w-0"
            />
          </div>
      </div>

      {/* Four quadrant tables: Highest Followed, Engagements, Reach, Connections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="min-w-0">
            <StandardTable
              title="Highest Followed"
              showSearch={false}
              showFilter={false}
              columns={["Celebrity", "Followers", "Connections"]}
              data={topByFollowers}
              renderRow={(item) => (
                <tr key={item.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-3">{item.name}</td>
                  <td className="px-6 py-3 text-center">{item.followers.toLocaleString()}</td>
                  <td className="px-6 py-3 text-center">{item.connections.toLocaleString()}</td>
                </tr>
              )}
              maxHeight={320}
              className="h-full"
            />
          </div>

          <div className="min-w-0">
            <StandardTable
              title="Highest Engagements"
              showSearch={false}
              showFilter={false}
              columns={["Celebrity", "Engagements", "Followers"]}
              data={topByEngagement}
              renderRow={(item) => (
                <tr key={item.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-3">{item.name}</td>
                  <td className="px-6 py-3 text-center">{computeEngagement(item).toLocaleString()}</td>
                  <td className="px-6 py-3 text-center">{item.followers.toLocaleString()}</td>
                </tr>
              )}
              maxHeight={320}
              className="h-full"
            />
          </div>

          <div className="min-w-0">
            <StandardTable
              title="Highest Reach"
              showSearch={false}
              showFilter={false}
              columns={["Celebrity", "Reach", "Impressions"]}
              data={topByReach}
              renderRow={(item) => (
                <tr key={item.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-3">{item.name}</td>
                  <td className="px-6 py-3 text-center">{item.reach.toLocaleString()}</td>
                  <td className="px-6 py-3 text-center">{item.profileVisits.toLocaleString()}</td>
                </tr>
              )}
              maxHeight={320}
              className="h-full"
            />
          </div>

          <div className="min-w-0">
            <StandardTable
              title="Highest Connections"
              showSearch={false}
              showFilter={false}
              columns={["Celebrity", "Connections", "Followers"]}
              data={topByConnections}
              renderRow={(item) => (
                <tr key={item.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-3">{item.name}</td>
                  <td className="px-6 py-3 text-center">{item.connections.toLocaleString()}</td>
                  <td className="px-6 py-3 text-center">{item.followers.toLocaleString()}</td>
                </tr>
              )}
              maxHeight={320}
              className="h-full"
            />
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <StandardTable
            title="Growth (est.)"
            showSearch={false}
            showFilter={false}
            columns={["Celebrity", "Followers", "Estimated Growth %"]}
            data={topByFollowers.map((c, idx) => ({ ...c, growth: Math.round((idx + 1) * 2.3) }))}
            renderRow={(item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">{item.name}</td>
                <td className="px-6 py-3 text-center">{item.followers.toLocaleString()}</td>
                <td className="px-6 py-3 text-center">{item.growth}%</td>
              </tr>
            )}
            maxHeight={260}
          />
        </div>

        <div>
          <StandardTable
            title="Top Rated"
            showSearch={false}
            showFilter={false}
            columns={["Celebrity", "Rating", "Followers"]}
            data={topByRating}
            renderRow={(item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">{item.name}</td>
                <td className="px-6 py-3 text-center">{item.rating}</td>
                <td className="px-6 py-3 text-center">{item.followers.toLocaleString()}</td>
              </tr>
            )}
            maxHeight={260}
          />
        </div>
      </div>

      
    </div>
  )
}

export default PerformanceMetrics
