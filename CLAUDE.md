# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start dev server (Vite) at http://localhost:5173
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Architecture Overview

### Core Structure

This is a **React + Vite** admin dashboard for the "Celebrating" platform with role-based access control (RBAC). The application manages users, celebrities, shops, events, tickets, financial transactions, and social content.

### Key Architectural Patterns

#### 1. **Role-Based Access Control (RBAC)**
The app implements a 5-role system with granular permissions:

- **Roles**: `super_admin`, `social_admin`, `content_moderator`, `financial_admin`, `marketplace_admin`
- **Configuration**: `src/config/rolePermissions.js` defines which menu items each role can access
- **Filtering**: `filterMenuItems()` dynamically filters sidebar navigation based on logged-in user's role
- **Authentication**: `src/services/authService.js` contains dummy user data for all roles
- **Context**: `src/contexts/AuthContext.jsx` manages auth state and persists to localStorage

**Important**: When adding new menu items or sections, update `rolePermissions.js` to define which roles can access them.

#### 2. **Celebrity Verification System**
A **3-tier verification workflow** requiring multiple admins:

- **Flow**: Pending → Social Admin 1 Verifies → Social Admin 2 Confirms → Super Admin Approves → Verified
- **Service**: `src/services/verificationService.js` manages verification state and validation
- **UI**: Verification happens on celebrity profile pages (`src/pages/entities/UserProfile.jsx`)
- **Status Page**: `src/pages/celebrities/VerificationRequests.jsx` shows status badges (no verify buttons)

**Rules**:
- Same social admin cannot verify twice
- Super admin can only approve after both social admins verify
- Button text changes by role: "Verify" → "Confirm Verification" → "Approve"

#### 3. **Navigation & Routing**

**Menu Configuration**: `src/config/menuItems.js` defines the hierarchical sidebar structure:
```javascript
[
  { title: 'GENERAL', items: [...] },
  { title: 'FINANCIAL', items: [...] },
  { title: 'RATING AND REVIEW', items: [...] },
  { title: 'SOCIAL', items: [...] },
  { title: 'EVENT', items: [...] }
]
```

**Route Mapping**: Routes in `App.jsx` use kebab-case URLs (e.g., `/user-overview`, `/celebrity-list`)

**Dynamic Navigation**:
- `Header.jsx` shows current page title and sub-item dropdown
- `Sidebar.jsx` renders role-filtered menu with collapsible sub-items
- URL ↔ Menu Item synchronization handled via `location.pathname`

#### 4. **Context Providers**

Three main contexts wrap the app:
- **AuthProvider**: User authentication, role, and session management
- **MessagingProvider**: Opens messaging modal with user context
- **NotificationProvider**: Opens notification modal

**Usage Pattern**: All contexts use hooks (`useAuth()`, `useMessaging()`, `useNotification()`)

#### 5. **Layout System**

**Structure**:
```
<AuthProvider>
  <NotificationProvider>
    <MessagingProvider>
      <Sidebar /> (role-filtered)
      <Header />  (shows user details)
      <Routes />  (main content)
    </MessagingProvider>
  </NotificationProvider>
</AuthProvider>
```

**Responsive**:
- Mobile: Sidebar collapses with backdrop overlay
- Desktop: Sidebar always visible
- Breakpoint: `md` (768px)

#### 6. **Entity Pages**

Entity detail pages (`src/pages/entities/`) show comprehensive profiles:
- **UserProfile.jsx**: Supports both member and celebrity views with verification controls
- **StoreProfile.jsx**: Shop details and analytics
- **EventDetail.jsx**: Event info with ticket sales
- **TicketDetail.jsx**: Individual ticket information

**Navigation**: These pages are accessed via dynamic routes like `/profile/:id`, `/store/:id`, `/event/:id`

### Directory Structure

```
src/
├── components/
│   ├── auth/          # Authentication components
│   ├── common/        # Reusable UI components (modals, tables)
│   └── layout/        # Header, Sidebar
├── config/
│   ├── menuItems.js        # Sidebar navigation structure
│   └── rolePermissions.js  # RBAC configuration
├── contexts/
│   ├── AuthContext.jsx
│   ├── MessagingContext.jsx
│   └── NotificationContext.jsx
├── pages/              # Page components organized by domain
│   ├── auth/          # Login page
│   ├── celebrities/   # Celebrity management
│   ├── dashboard/     # Dashboard overviews
│   ├── entities/      # Profile/detail pages
│   ├── events/        # Event management
│   ├── financial/     # Wallet, escrow, revenue
│   ├── reviews/       # Ratings and reviews
│   ├── shops/         # Shop management
│   ├── social/        # Posts, engagement, streaming
│   ├── tickets/       # Ticket sales
│   └── users/         # User management
├── services/
│   ├── authService.js         # Authentication with dummy data
│   └── verificationService.js # Celebrity verification logic
└── utils/             # Utility functions
```

### Data Flow Patterns

#### Authentication Flow
```
Login → authService.authenticateUser() → AuthContext.login() → localStorage → App redirects
```

#### Verification Flow
```
Profile Page → verificationService.canUserVerify() → Shows/hides button
Click Verify → verificationService.verifyCelebrity() → Updates state → Re-renders
```

#### Navigation Flow
```
Sidebar click → onItemSelect() → navigate() → URL changes → App.jsx useEffect → Sets activeItem
```

### Important Implementation Details

1. **Mock Data**: All pages currently use mock data. When integrating with backend, replace mock arrays with API calls.

2. **Context Menus**: Many tables implement right-click context menus for bulk actions (e.g., `VerificationRequests.jsx`, `AllUsers.jsx`)

3. **Avatar Handling**:
   - User avatars show initials if no image (`getUserInitials()` in `authService.js`)
   - Background color: `bg-yellow-200` (`#fde047`)

4. **Responsive Tables**: Tables use `overflow-x-auto` and stack/collapse on mobile

5. **Status Badges**: Consistent color coding:
   - Pending: Gray (`bg-gray-100`)
   - In Progress: Blue (`bg-blue-100`)
   - Warning: Yellow (`bg-yellow-100`)
   - Success: Green (`bg-green-100`)
   - Error: Red (`bg-red-100`)

6. **Route Protection**: Currently minimal - `ProtectedRoute` checks `isAuthenticated` but doesn't validate role-based route access

### Adding New Features

#### Adding a New Role
1. Add user to `DUMMY_USERS` in `authService.js`
2. Define permissions in `ROLE_PERMISSIONS` in `rolePermissions.js`
3. Test by logging in with the new role credentials

#### Adding a New Menu Section
1. Add to `menuItems` array in `config/menuItems.js`
2. Define role access in `rolePermissions.js`
3. Create page component in appropriate `pages/` subdirectory
4. Add route in `App.jsx`
5. Add icon mapping in `Sidebar.jsx` `getIconForLabel()`

#### Adding a New Page
1. Create component in appropriate `pages/` directory
2. Import and add `<Route>` in `App.jsx`
3. If it should appear in sidebar, add to `menuItems.js`
4. Follow URL pattern: kebab-case matching the menu item text

### Testing Credentials

See `ROLE_BASED_ACCESS.md` for complete credentials list. Quick reference:
- Super Admin: `super_admin` / `admin123`
- Social Admin: `social_admin` / `social123`
- Content Moderator: `content_mod` / `content123`
- Financial Admin: `finance_admin` / `finance123`
- Marketplace Admin: `market_admin` / `market123`

### Known Patterns

- **Tailwind CSS**: Using Tailwind v4 with `@tailwindcss/vite` plugin
- **Icons**: Lucide React icons throughout
- **Charts**: Chart.js via `react-chartjs-2`
- **Maps**: Leaflet for geographic data, `react-simple-maps` for world maps
- **Flags**: `country-flag-icons` for country flags
- **Date Handling**: Currently using string dates, consider adding date library if needed

### State Management

No global state library (Redux/Zustand). State managed via:
- React Context for auth, messaging, notifications
- Component-level `useState` for UI state
- Services for business logic and data persistence

This keeps the architecture simple and suitable for the current scale.
