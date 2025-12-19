# Role-Based Access Control (RBAC) Implementation

This document describes the role-based access control system implemented in the admin dashboard.

## Available Roles and Credentials

### 1. Super Admin
- **Username:** `super_admin`
- **Password:** `admin123`
- **Name:** Elisha Abade
- **Email:** elisha.abade@example.com
- **Access:** Full access to all screens and sections

### 2. Social Admin
- **Username:** `social_admin`
- **Password:** `social123`
- **Name:** Sarah Johnson
- **Email:** sarah.johnson@example.com
- **Access:**
  - **Dashboard (General):** User Overview, Shops Overview, Products Overview (excludes Wallet Overview)
  - **Celebrity Management:** All screens
  - **Social Section:** All screens

### 3. Content Moderator
- **Username:** `content_mod`
- **Password:** `content123`
- **Name:** Mike Wilson
- **Email:** mike.wilson@example.com
- **Access:**
  - **Dashboard (General):** User Overview only
  - **User Management:** All Users, User Activities
  - **Celebrity Management:** Celebrity List, Performance Metrics, Celebrity Categories
  - **Rating & Review:** All screens

### 4. Financial Admin
- **Username:** `finance_admin`
- **Password:** `finance123`
- **Name:** Lisa Chen
- **Email:** lisa.chen@example.com
- **Access:**
  - **Dashboard (General):** All screens
  - **Shop Management:** All screens
  - **Financial Section:** All screens
  - **Event Section:** All screens

### 5. Marketplace Admin
- **Username:** `market_admin`
- **Password:** `market123`
- **Name:** David Martinez
- **Email:** david.martinez@example.com
- **Access:**
  - **Platform Revenue:** Commission Revenue, Event Revenue, Promotions Revenue, Revenue Analytics
  - **Fraud Detection And Alerts:** Full access
  - **Rating & Review:** All screens
  - **Event Section:** All screens

## How to Test

1. **Logout** if you're currently logged in
2. On the login page, click **"Demo Credentials"** to see all available test accounts
3. Click on any account to auto-fill the credentials
4. Click **"Sign In"** to login
5. The sidebar will automatically show only the menu items the logged-in user has access to
6. The header will display the user's name, position, and avatar initials

## Implementation Details

### Files Created/Modified

1. **`src/services/authService.js`** - Dummy authentication service with user data
2. **`src/config/rolePermissions.js`** - Role-based access control configuration
3. **`src/contexts/AuthContext.jsx`** - Updated to support role-based authentication
4. **`src/pages/auth/Login.jsx`** - Added demo credentials dropdown
5. **`src/components/layout/Sidebar.jsx`** - Filters menu items based on user role
6. **`src/components/layout/Header.jsx`** - Displays logged-in user details

### Key Features

- ✅ Dummy authentication for all roles
- ✅ Role-based menu filtering
- ✅ User details displayed in header and profile panel
- ✅ Avatar with user initials
- ✅ Persistent login via localStorage
- ✅ Easy role switching via demo credentials
- ✅ Notification button in sidebar panel opens notification popup

## Future Enhancements

When implementing real server-side authentication:

1. Replace `authService.js` with actual API calls
2. Add JWT token management
3. Add refresh token logic
4. Add server-side permission validation
5. Add role-based route protection
6. Add session timeout handling

## Testing Checklist

- [ ] Super Admin can see all menu sections
- [ ] Social Admin cannot see User Management or Wallet Overview
- [ ] Content Moderator only sees specific dashboard items
- [ ] Financial Admin has access to all financial screens
- [ ] Marketplace Admin sees only revenue-related items
- [ ] User details display correctly in header
- [ ] User details display correctly in profile panel
- [ ] Avatar initials display correctly
- [ ] Logout functionality works
- [ ] Login persists across page refreshes
- [ ] Notifications button in profile panel opens notification popup
