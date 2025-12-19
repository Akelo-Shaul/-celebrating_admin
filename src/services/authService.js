// Dummy user data for each role
export const DUMMY_USERS = {
  'super_admin': {
    id: 'ADM-1023',
    username: 'super_admin',
    password: 'admin123',
    name: 'Elisha Abade',
    email: 'elisha.abade@example.com',
    role: 'super_admin',
    position: 'Super Admin',
    avatar: null
  },
  'social_admin': {
    id: 'ADM-2045',
    username: 'social_admin',
    password: 'social123',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'social_admin',
    position: 'Social Admin',
    avatar: null
  },
  'social_admin_2': {
    id: 'ADM-2046',
    username: 'social_admin2',
    password: 'social123',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'social_admin',
    position: 'Social Admin',
    avatar: null
  },
  
  'content_moderator': {
    id: 'ADM-3067',
    username: 'content_mod',
    password: 'content123',
    name: 'Mike Wilson',
    email: 'mike.wilson@example.com',
    role: 'content_moderator',
    position: 'Content Moderator',
    avatar: null
  },
  'financial_admin': {
    id: 'ADM-4089',
    username: 'finance_admin',
    password: 'finance123',
    name: 'Lisa Chen',
    email: 'lisa.chen@example.com',
    role: 'financial_admin',
    position: 'Financial Admin',
    avatar: null
  },
  'marketplace_admin': {
    id: 'ADM-5012',
    username: 'market_admin',
    password: 'market123',
    name: 'David Martinez',
    email: 'david.martinez@example.com',
    role: 'marketplace_admin',
    position: 'Marketplace Admin',
    avatar: null
  }
}

// Authenticate user with username and password
export const authenticateUser = async (username, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Find user by username
  const user = Object.values(DUMMY_USERS).find(
    u => u.username === username && u.password === password
  )

  if (!user) {
    throw new Error('Invalid username or password')
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user
  return {
    ...userWithoutPassword,
    loginTime: new Date().toISOString()
  }
}

// Get user initials for avatar
export const getUserInitials = (name) => {
  if (!name) return '??'
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

// Get avatar URL
export const getAvatarUrl = (name) => {
  const initials = getUserInitials(name)
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=fde047&color=000&size=128`
}
