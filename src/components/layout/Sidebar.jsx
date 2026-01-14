import React from 'react'
import { Grid, Users, Star, ShoppingBag, Wallet, Archive, CreditCard, FileText, BarChart2, Calendar, Ticket, Edit2, Activity, Layers, Video, Settings, ChevronDown, DollarSign, ShieldAlert, StarIcon, Gavel } from 'lucide-react'
import { menuItems } from '../../config/menuItems'
import { filterMenuItems } from '../../config/rolePermissions'
import { useAuth } from '../../contexts/AuthContext'

const Sidebar = ({ isCollapsed, activeItem, onItemSelect }) => {
  const [openDropdown, setOpenDropdown] = React.useState('Dashboard')
  const [activeSubItem, setActiveSubItem] = React.useState(null)
  const { user } = useAuth()

  // Filter menu items based on user role
  const sections = React.useMemo(() => {
    if (!user || !user.role) return []
    return filterMenuItems(menuItems, user.role)
  }, [user])

  React.useEffect(() => {
    // Check if the active item is a sub-item
    const isSubItem = sections.some(section =>
      section.items.some(item =>
        typeof item === 'object' && item.subItems && item.subItems.includes(activeItem)
      )
    )
    if (isSubItem) {
      setActiveSubItem(activeItem)
    }
  }, [activeItem])

  const getIconForLabel = (label) => {
    switch (label) {
      case 'Dashboard':
        return <Grid size={16} />
      case 'User Management':
        return <Users size={16} />
      case 'Celebrity Management':
        return <Star size={16} />
      case 'Shop Management':
        return <ShoppingBag size={16} />
      case 'Wallet Management':
        return <Wallet size={16} />
      case 'Escrow Management':
        return <Archive size={16} />
      case 'Transaction History':
        return <CreditCard size={16} />
      case 'Platform Revenue':
        return <DollarSign size={16} />
      case 'Fraud Detection And Alerts':
        return <ShieldAlert size={16} />
      case 'All Ratings':
        return <StarIcon size={16} />
      case 'All Reviews':
        return <FileText size={16} />
      case 'Rankings':
        return <BarChart2 size={16} />
      case 'Rating Analytics':
        return <Activity size={16} />
      case 'Authenticity Analysis':
        return <Layers size={16} />
      case 'Post Management':
        return <Edit2 size={16} />
      case 'Engagement Metrics':
        return <BarChart2 size={16} />
      case 'Content Categories':
        return <FileText size={16} />
      case 'Live Streams':
        return <Video size={16} />
      case 'Auction Management':
        return <Gavel size={16} />
      case 'Event Management':
        return <Calendar size={16} />
      case 'Ticket Sales':
        return <Ticket size={16} />
      default:
        return <Grid size={16} />
    }
  }

  return (
    <aside 
      className={`transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } flex flex-col relative z-10 h-screen p-4 bg-pink-50 text-gray-800`}
    >
      {/* logo */}
      <div className={`border-b rounded-lg bg-gray-600 ${isCollapsed ? 'px-1' : 'px-4'} py-1 flex items-center justify-center`}>
        <img src={isCollapsed ? "/favicon.png" : "/celebratinglogo.png"} alt="Logo" className={`${isCollapsed ? 'w-6 h-6' : 'h-12  w-full'} object-cover`} />
      </div>

      {/* menu */}
      <nav className="flex-1 mt-4 overflow-auto">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            {!isCollapsed && (
              <div className="px-1 text-xs font-semibold text-gray-500 tracking-wide mb-2">
                {section.title}
              </div>
            )}
            <ul className="flex flex-col gap-1">
              {section.items.map((item) => {
                const label = typeof item === 'string' ? item : item.label;
                const hasSubItems = typeof item === 'object' && item.subItems;
                const isOpen = openDropdown === label;
                const isActive = activeItem === label || 
                  (hasSubItems && item.subItems && item.subItems.includes(activeItem)) ||
                  (activeSubItem && item.subItems && item.subItems.includes(activeSubItem));

                return (
                  <li key={label}>
                    <button 
                      onClick={() => {
                        if (hasSubItems) {
                          // If sidebar is collapsed, clicking the icon should open the first sub-item
                          if (isCollapsed) {
                            const firstSub = item.subItems && item.subItems[0]
                            if (firstSub) {
                              onItemSelect(firstSub)
                              setActiveSubItem(firstSub)
                              // keep dropdown state consistent for when sidebar expands
                              setOpenDropdown(label)
                              return
                            }
                          }
                          setOpenDropdown(isOpen ? null : label);
                        } else {
                          onItemSelect(label);
                          setActiveSubItem(null);
                        }
                      }}
                      className={`w-full flex items-center ${
                        isCollapsed ? 'justify-center' : 'gap-3'
                      } px-2 py-2 rounded text-sm transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-yellow-200 to-yellow-100 text-gray-900 shadow-sm'
                          : 'text-gray-700 hover:bg-pink-100 hover:text-gray-900'
                      }`}
                      title={isCollapsed ? label : undefined}
                    >
                      <span className={`w-6 h-6 flex items-center justify-center ${
                        isActive ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {getIconForLabel(label)}
                      </span>
                      {!isCollapsed && (
                        <>
                          <span className="truncate flex-1 text-left">{label}</span>
                          {hasSubItems && (
                            <ChevronDown 
                              size={16} 
                              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            />
                          )}
                        </>
                      )}
                    </button>
                    
                    {/* Submenu */}
                    {hasSubItems && !isCollapsed && isOpen && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem}>
                            <button
                              onClick={() => {
                                onItemSelect(subItem);
                                setActiveSubItem(subItem);
                              }}
                              className={`w-full text-left px-2 py-1.5 text-sm rounded ${
                                activeSubItem === subItem
                                  ? 'text-gray-900 font-medium'
                                  : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              {subItem}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* bottom actions */}
      <div className="mt-auto pt-4 border-t border-pink-100">
        <button 
          className={`w-full ${
            isCollapsed ? 'justify-center' : 'text-left'
          } p-2 rounded hover:bg-pink-100 text-sm text-gray-700 flex items-center ${
            isCollapsed ? '' : 'gap-2'
          }`}
          title={isCollapsed ? "Settings" : undefined}
        >
          <Settings size={16} className="text-gray-500" />
          {!isCollapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar