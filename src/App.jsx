import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import './App.css'
import 'leaflet/dist/leaflet.css'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import PageContainer from './components/PageContainer'
import { MessagingProvider } from './contexts/MessagingContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Login from './pages/auth/Login'

// Dashboard Pages
import DashboardOverview from './pages/dashboard/DashboardOverview'
import UserOverview from './pages/dashboard/UserOverview'
import ShopsOverview from './pages/dashboard/ShopsOverview'
import ProductsOverview from './pages/dashboard/ProductsOverview'
import WalletOverview from './pages/dashboard/WalletOverview'

// User Management Pages
import UserManagement from './pages/users/UserManagement'
import AllUsers from './pages/users/AllUsers'
import UserRoles from './pages/users/UserRoles'
import UserActivities from './pages/users/UserActivities'
import AccessControl from './pages/users/AccessControl'

// Celebrity Management Pages
import CelebrityManagement from './pages/celebrities/CelebrityManagement'
import CelebrityList from './pages/celebrities/CelebrityList'
import VerificationRequests from './pages/celebrities/VerificationRequests'
import CelebrityCategories from './pages/celebrities/CelebrityCategories'
import PerformanceMetrics from './pages/celebrities/PerformanceMetrics'

// Shop Management Pages
import ActiveShops from './pages/shops/ActiveShops'
import PendingApprovals from './pages/shops/PendingApprovals'
import ShopCategories from './pages/shops/ShopCategories'
import ShopAnalytics from './pages/shops/ShopAnalytics'

// Financial Pages
import WalletManagement from './pages/financial/WalletManagement'
import BalanceOverview from './pages/financial/BalanceOverview'
import TransactionLog from './pages/financial/TransactionLog'
import TransactionHistory from './pages/financial/TransactionHistory'
import Deposits from './pages/financial/Deposits'
import Withdrawals from './pages/financial/Withdrawals'
import Escrows from './pages/financial/Escrows'
import ActiveEscrows from './pages/financial/ActiveEscrows'
import CompletedEscrows from './pages/financial/CompletedEscrows'
import DisputeResolution from './pages/financial/DisputeResolution'
import EscrowSettings from './pages/financial/EscrowSettings'
import FraudDetection from './pages/financial/FraudDetection'
import PaymentMethods from './pages/financial/PaymentMethods'
import WithdrawalRequests from './pages/financial/WithdrawalRequests'
import RevenueOverview from './pages/financial/RevenueOverview'
import TransactionFeesRevenue from './pages/financial/TransactionFeesRevenue'
import CommissionRevenue from './pages/financial/CommissionRevenue'
import EventRevenue from './pages/financial/EventRevenue'
import StreamingRevenue from './pages/financial/StreamingRevenue'
import SocialRevenue from './pages/financial/SocialRevenue'
import RevenueAnalytics from './pages/financial/RevenueAnalytics'
import PromotionsRevenue from './pages/financial/PromotionsRevenue'
import PromotionDetail from './pages/financial/PromotionDetail'

// Reviews Pages
import AllReviews from './pages/reviews/AllReviews'
import AllRatings from './pages/reviews/AllRatings'
import Rankings from './pages/reviews/Rankings'
import RatingAnalytics from './pages/reviews/RatingAnalytics'
import AuthenticityAnalysis from './pages/reviews/AuthenticityAnalysis'

// Social Pages
import PostManagement from './pages/social/PostManagement'
import AllCelebrations from './pages/social/AllCelebrations'
import ScheduledCelebrations from './pages/social/ScheduledCelebrations'
import CelebrationAnalytics from './pages/social/CelebrationAnalytics'
import ContentModeration from './pages/social/ContentModeration'
import UserEngagement from './pages/social/UserEngagement'
import CategoryList from './pages/social/CategoryList'
import CategoryAnalytics from './pages/social/CategoryAnalytics'
import ContentTags from './pages/social/ContentTags'
import CategoryManagement from './pages/social/CategoryManagement'

// Streaming Pages
import ActiveStreams from './pages/streaming/ActiveStreams'
import StreamAnalytics from './pages/streaming/StreamAnalytics'
import ScheduledStreams from './pages/streaming/ScheduledStreams'
import StreamSettings from './pages/streaming/StreamSettings'

// Events Pages
import EventAnalytics from './pages/events/EventAnalytics'
import UpcomingEvents from './pages/events/UpcomingEvents'
import PastEvents from './pages/events/PastEvents'
import EventCategories from './pages/events/EventCategories'

// Ticket Sales Pages
import TicketSales from './pages/tickets/TicketSales'
import ActiveTickets from './pages/tickets/ActiveTickets'
import SalesAnalytics from './pages/tickets/SalesAnalytics'
import PricingTiers from './pages/tickets/PricingTiers'
import TicketReports from './pages/tickets/TicketReports'

// Entity Pages
import UserProfile from './pages/entities/UserProfile'
import StoreProfile from './pages/entities/StoreProfile'
import WalletProfile from './pages/entities/WalletProfile'
import PostDetail from './pages/entities/PostDetail'
import ProductProfile from './pages/entities/ProductProfile'
import EventDetail from './pages/entities/EventDetail'
import LiveStreamDetail from './pages/entities/LiveStreamDetail'

const AppContent = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768)
  const [activeItem, setActiveItem] = useState('Dashboard')
  const { isAuthenticated, loading } = useAuth()

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

  // All hooks must be called before any conditional returns
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

    // Handle root path
    if (location.pathname === '/') {
      setActiveItem('Dashboard')
      return
    }

    if (path) {
      // Title-case each word so it matches labels in menuItems
      if (location.pathname.startsWith('/profile/')) {
        setActiveItem('Profile')
        return
      }
      if (location.pathname.startsWith('/store/')) {
        const storeName = decodeURIComponent(location.pathname.split('/store/')[1])
        setActiveItem(`Store/${storeName}`)
        return
      }
      if (location.pathname.startsWith('/wallet/')) {
        const walletName = decodeURIComponent(location.pathname.split('/wallet/')[1])
        setActiveItem(`Wallet/${walletName}`)
        return
      }
      if (location.pathname.startsWith('/post/')) {
        const postId = decodeURIComponent(location.pathname.split('/post/')[1])
        setActiveItem(`Post/${postId}`)
        return
      }
      if (location.pathname.startsWith('/product/')) {
        const productId = decodeURIComponent(location.pathname.split('/product/')[1])
        setActiveItem(`Product/${productId}`)
        return
      }
      if (location.pathname.startsWith('/event/')) {
        const eventName = decodeURIComponent(location.pathname.split('/event/')[1])
        setActiveItem(`Event/${eventName}`)
        return
      }
      if (location.pathname.startsWith('/stream/')) {
        const streamName = decodeURIComponent(location.pathname.split('/stream/')[1])
        setActiveItem(`Stream/${streamName}`)
        return
      }
      const titled = path.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      setActiveItem(titled)
    }
  }, [location])

  // Authentication check - after all hooks are called
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-yellow-50">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" replace />
  }

  if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to="/" replace />
  }

  // If on login page, render only the login route without dashboard layout
  if (location.pathname === '/login') {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    )
  }

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
              <Route path="/products-overview" element={<ProductsOverview />} />
              <Route path="/wallet-overview" element={<WalletOverview />} />
              
              {/* User Management Routes */}
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="/user-roles" element={<UserRoles />} />
              <Route path="/user-activities" element={<UserActivities />} />
              <Route path="/access-control" element={<AccessControl />} />

              {/* Celebrity Management Routes */}
              <Route path="/celebrity-management" element={<CelebrityManagement />} />
              <Route path="/celebrity-list" element={<CelebrityList />} />
              <Route path="/verification-requests" element={<VerificationRequests />} />
              <Route path="/celebrity-categories" element={<CelebrityCategories />} />
              <Route path="/performance-metrics" element={<PerformanceMetrics />} />

              {/* Shop Management Routes */}
              <Route path="/shop-management" element={<PageContainer title="Shop Management" />} />
              <Route path="/active-shops" element={<ActiveShops />} />
              <Route path="/pending-approvals" element={<PendingApprovals />} />
              <Route path="/shop-categories" element={<ShopCategories />} />
              <Route path="/shop-analytics" element={<ShopAnalytics />} />

              {/* Financial Routes */}
              <Route path="/wallet-management" element={<PageContainer title="Wallet Management" />} />
              <Route path="/balance-overview" element={<BalanceOverview />} />
              <Route path="/transaction-log" element={<TransactionLog />} />
              <Route path="/payment-methods" element={<PaymentMethods />} />
              <Route path="/withdrawal-requests" element={<WithdrawalRequests />} />

              {/* Transaction History Routes */}
              <Route path="/transaction-history" element={<TransactionHistory />} />
              <Route path="/deposits" element={<Deposits />} />
              <Route path="/withdrawals" element={<Withdrawals />} />
              <Route path="/escrows" element={<Escrows />} />

              <Route path="/escrow-management" element={<PageContainer title="Escrow Management" />} />
              <Route path="/active-escrows" element={<ActiveEscrows />} />
              <Route path="/completed-escrows" element={<CompletedEscrows />} />
              <Route path="/dispute-resolution" element={<DisputeResolution />} />
              <Route path="/escrow-settings" element={<EscrowSettings />} />

              <Route path="/fraud-detection-and-alerts" element={<FraudDetection />} />

              {/* Platform Revenue Routes */}
              <Route path="/platform-revenue" element={<PageContainer title="Platform Revenue" />} />
              <Route path="/revenue-overview" element={<RevenueOverview />} />
              <Route path="/transaction-fees" element={<TransactionFeesRevenue />} />
              <Route path="/commission-revenue" element={<CommissionRevenue />} />
              <Route path="/event-revenue" element={<EventRevenue />} />
              <Route path="/streaming-revenue" element={<StreamingRevenue />} />
              <Route path="/social-revenue" element={<SocialRevenue />} />
              <Route path="/promotions-revenue" element={<PromotionsRevenue />} />
              <Route path="/promotion/:id" element={<PromotionDetail />} />
              <Route path="/revenue-analytics" element={<RevenueAnalytics />} />

              {/* Streaming Routes */}
              <Route path="/active-streams" element={<ActiveStreams />} />
              <Route path="/stream-analytics" element={<StreamAnalytics />} />
              <Route path="/scheduled-streams" element={<ScheduledStreams />} />
              <Route path="/stream-settings" element={<StreamSettings />} />

              {/* Events Routes */}
              <Route path="/event-analytics" element={<EventAnalytics />} />
              <Route path="/upcoming-events" element={<UpcomingEvents />} />
              <Route path="/past-events" element={<PastEvents />} />
              <Route path="/event-categories" element={<EventCategories />} />

              {/* Ticket Sales Routes */}
              <Route path="/ticket-sales" element={<TicketSales />} />
              <Route path="/active-tickets" element={<ActiveTickets />} />
              <Route path="/sales-analytics" element={<SalesAnalytics />} />
              <Route path="/pricing-tiers" element={<PricingTiers />} />
              <Route path="/ticket-reports" element={<TicketReports />} />

              {/* Entity routes */}
              <Route path="/profile/:id" element={<UserProfile />} />
              <Route path="/store/:id" element={<StoreProfile />} />
              <Route path="/wallet/:id" element={<WalletProfile />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/product/:id" element={<ProductProfile />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/stream/:id" element={<LiveStreamDetail />} />

              <Route path="/transaction-history" element={<PageContainer title="Transaction History" />} />
              <Route path="/all-transactions" element={<PageContainer title="All Transactions" />} />
              <Route path="/pending-transactions" element={<PageContainer title="Pending Transactions" />} />
              <Route path="/failed-transactions" element={<PageContainer title="Failed Transactions" />} />
              <Route path="/transaction-reports" element={<PageContainer title="Transaction Reports" />} />

              {/* Rating and Review Routes */}
              <Route path="/all-reviews" element={<AllReviews />} />
              <Route path="/all-ratings" element={<AllRatings />} />
              <Route path="/rankings" element={<Rankings />} />
              <Route path="/rating-analytics" element={<RatingAnalytics />} />
              <Route path="/authenticity-analysis" element={<AuthenticityAnalysis />} />

              {/* Social Routes */}
              <Route path="/post-management" element={<PostManagement />} />
              <Route path="/all-celebrations" element={<AllCelebrations />} />
              <Route path="/scheduled-celebrations" element={<ScheduledCelebrations />} />
              <Route path="/celebration-analytics" element={<CelebrationAnalytics />} />
              <Route path="/content-moderation" element={<ContentModeration />} />
              <Route path="/scheduled-posts" element={<PageContainer title="Scheduled Posts" />} />
              <Route path="/post-analytics" element={<PageContainer title="Post Analytics" />} />
              <Route path="/content-calendar" element={<PageContainer title="Content Calendar" />} />

              <Route path="/engagement-metrics" element={<PageContainer title="Engagement Metrics" />} />
              <Route path="/user-engagement" element={<UserEngagement />} />
              <Route path="/content-performance" element={<PageContainer title="Content Performance" />} />
              <Route path="/interaction-analysis" element={<PageContainer title="Interaction Analysis" />} />
              <Route path="/engagement-reports" element={<PageContainer title="Engagement Reports" />} />

              {/* Content Categories Routes */}
              <Route path="/category-list" element={<CategoryList />} />
              <Route path="/category-analytics" element={<CategoryAnalytics />} />
              <Route path="/content-tags" element={<ContentTags />} />
              <Route path="/category-management" element={<CategoryManagement />} />

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
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <NotificationProvider>
          <MessagingProvider>
            <AppContent />
          </MessagingProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
