import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import PageContainer from './components/PageContainer'

// Dashboard Pages
import DashboardOverview from './pages/dashboard/DashboardOverview'
import UserOverview from './pages/dashboard/UserOverview'
import ShopsOverview from './pages/dashboard/ShopsOverview'

// User Management Pages
import UserManagement from './pages/users/UserManagement'
import AllUsers from './pages/users/AllUsers'
import UserRoles from './pages/users/UserRoles'

// Celebrity Management Pages
import CelebrityManagement from './pages/celebrities/CelebrityManagement'
import CelebrityList from './pages/celebrities/CelebrityList'

// Shop Management Pages
import ActiveShops from './pages/shops/ActiveShops'
import ShopCategories from './pages/shops/ShopCategories'
import ShopAnalytics from './pages/shops/ShopAnalytics'

// Financial Pages
import WalletManagement from './pages/financial/WalletManagement'
import BalanceOverview from './pages/financial/BalanceOverview'
import TransactionLog from './pages/financial/TransactionLog'

// Reviews Pages
import AllReviews from './pages/reviews/AllReviews'

// Social Pages
import PostManagement from './pages/social/PostManagement'
import AllPosts from './pages/social/AllPosts'

const AppContent = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768)
  const [activeItem, setActiveItem] = useState('Dashboard')

  const handleItemSelect = (item) => {
    setActiveItem(item)
    // Create URL-friendly path
    const path = item.toLowerCase().replace(/\s+/g, '-')
    navigate(`/${path}`)
    // Close sidebar on mobile when an item is selected
    if (window.innerWidth < 768) {
      setIsCollapsed(true)
    }
  }

  React.useEffect(() => {
    const handleResize = () => {
      const shouldCollapse = window.innerWidth < 768
      setIsCollapsed(shouldCollapse)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Set active item based on current route when page loads
  React.useEffect(() => {
    const path = location.pathname.slice(1).replace(/-/g, ' ').trim()
    if (path) {
      // Title-case each word so it matches labels in menuItems
      const titled = path.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      setActiveItem(titled)
    }
  }, [location])

  return (
    <div className="min-h-screen">
      <div className="relative flex h-screen overflow-hidden">
        {/* Backdrop for mobile */}
        <div 
          className={`fixed inset-0 bg-gray-900/50 transition-opacity duration-300 md:hidden ${
            !isCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsCollapsed(true)}
        />
        
        {/* Sidebar with overlay on mobile */}
        <div className={`absolute md:relative z-20 h-full ${
          isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
        } transition-transform duration-300`}>
          <Sidebar 
            isCollapsed={isCollapsed}
            activeItem={activeItem}
            onItemSelect={handleItemSelect}
          />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            isCollapsed={isCollapsed} 
            onToggleMenu={() => setIsCollapsed(!isCollapsed)}
            title={activeItem}
            onItemSelect={handleItemSelect}
          />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              {/* Dashboard Sub Items */}
              <Route path="/user-overview" element={<UserOverview />} />
              <Route path="/shops-overview" element={<ShopsOverview />} />
              <Route path="/products-overview" element={<PageContainer title="Products Overview" />} />
              <Route path="/wallet-overview" element={<PageContainer title="Wallet Overview" />} />
              
              {/* User Management Routes */}
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="/user-roles" element={<UserRoles />} />
              <Route path="/user-activities" element={<PageContainer title="User Activities" />} />
              <Route path="/access-control" element={<PageContainer title="Access Control" />} />

              {/* Celebrity Management Routes */}
              <Route path="/celebrity-management" element={<CelebrityManagement />} />
              <Route path="/celebrity-list" element={<CelebrityList />} />
              <Route path="/verification-requests" element={<PageContainer title="Verification Requests" />} />
              <Route path="/celebrity-categories" element={<PageContainer title="Celebrity Categories" />} />
              <Route path="/performance-metrics" element={<PageContainer title="Performance Metrics" />} />

              {/* Shop Management Routes */}
              <Route path="/shop-management" element={<PageContainer title="Shop Management" />} />
              <Route path="/active-shops" element={<PageContainer title="Active Shops" />} />
              <Route path="/pending-approvals" element={<PageContainer title="Pending Approvals" />} />
              <Route path="/shop-categories" element={<PageContainer title="Shop Categories" />} />
              <Route path="/shop-analytics" element={<PageContainer title="Shop Analytics" />} />

              {/* Financial Routes */}
              <Route path="/wallet-management" element={<PageContainer title="Wallet Management" />} />
              <Route path="/balance-overview" element={<PageContainer title="Balance Overview" />} />
              <Route path="/transaction-log" element={<PageContainer title="Transaction Log" />} />
              <Route path="/payment-methods" element={<PageContainer title="Payment Methods" />} />
              <Route path="/withdrawal-requests" element={<PageContainer title="Withdrawal Requests" />} />

              <Route path="/escrow-management" element={<PageContainer title="Escrow Management" />} />
              <Route path="/active-escrows" element={<PageContainer title="Active Escrows" />} />
              <Route path="/completed-escrows" element={<PageContainer title="Completed Escrows" />} />
              <Route path="/dispute-resolution" element={<PageContainer title="Dispute Resolution" />} />
              <Route path="/escrow-settings" element={<PageContainer title="Escrow Settings" />} />

              <Route path="/transaction-history" element={<PageContainer title="Transaction History" />} />
              <Route path="/all-transactions" element={<PageContainer title="All Transactions" />} />
              <Route path="/pending-transactions" element={<PageContainer title="Pending Transactions" />} />
              <Route path="/failed-transactions" element={<PageContainer title="Failed Transactions" />} />
              <Route path="/transaction-reports" element={<PageContainer title="Transaction Reports" />} />

              {/* Rating and Review Routes */}
              <Route path="/all-reviews" element={<PageContainer title="All Reviews" />} />
              <Route path="/rankings" element={<PageContainer title="Rankings" />} />
              <Route path="/rating-analytics" element={<PageContainer title="Rating Analytics" />} />
              <Route path="/authenticity-analysis" element={<PageContainer title="Authenticity Analysis" />} />

              {/* Social Routes */}
              <Route path="/post-management" element={<PageContainer title="Post Management" />} />
              <Route path="/all-posts" element={<PageContainer title="All Posts" />} />
              <Route path="/scheduled-posts" element={<PageContainer title="Scheduled Posts" />} />
              <Route path="/post-analytics" element={<PageContainer title="Post Analytics" />} />
              <Route path="/content-calendar" element={<PageContainer title="Content Calendar" />} />

              <Route path="/engagement-metrics" element={<PageContainer title="Engagement Metrics" />} />
              <Route path="/user-engagement" element={<PageContainer title="User Engagement" />} />
              <Route path="/content-performance" element={<PageContainer title="Content Performance" />} />
              <Route path="/interaction-analysis" element={<PageContainer title="Interaction Analysis" />} />
              <Route path="/engagement-reports" element={<PageContainer title="Engagement Reports" />} />

              {/* Catch all route */}
              <Route path="*" element={<PageContainer title="Page Not Found" />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
