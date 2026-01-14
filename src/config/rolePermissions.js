// Role-based permissions configuration
// Defines which menu sections and items each role can access

export const ROLE_PERMISSIONS = {
  super_admin: {
    // Super Admin can see everything
    sections: ['GENERAL', 'FINANCIAL', 'RATING AND REVIEW', 'SOCIAL', 'EVENT'],
    allowedItems: '*' // All items
  },

  social_admin: {
    sections: ['GENERAL', 'SOCIAL'],
    allowedItems: {
      'GENERAL': {
        'Dashboard': ['User Overview', 'Shops Overview', 'Products Overview'], // Exclude Wallet Overview
        // Exclude User Management completely
        'Celebrity Management': '*', // All celebrity management screens
        // Exclude Shop Management
      },
      'SOCIAL': '*' // All social section screens including Auction Management
    }
  },

  content_moderator: {
    sections: ['GENERAL', 'RATING AND REVIEW'],
    allowedItems: {
      'GENERAL': {
        'Dashboard': ['User Overview'], // Only User Overview
        'User Management': ['All Users', 'User Activities'], // Only these two
        'Celebrity Management': ['Celebrity List', 'Performance Metrics', 'Celebrity Categories']
      },
      'RATING AND REVIEW': '*' // All rating and review screens
    }
  },

  financial_admin: {
    sections: ['GENERAL', 'FINANCIAL', 'EVENT'],
    allowedItems: {
      'GENERAL': '*', // All dashboard pages
      'FINANCIAL': '*', // All financial section
      'EVENT': '*' // All event section
    }
  },

  marketplace_admin: {
    sections: ['FINANCIAL', 'RATING AND REVIEW', 'EVENT'],
    allowedItems: {
      'FINANCIAL': {
        'Platform Revenue': ['Commission Revenue', 'Event Revenue', 'Promotions Revenue', 'Revenue Analytics'],
        'Fraud Detection And Alerts': true // Single item
      },
      'RATING AND REVIEW': '*', // All rating and review screens
      'EVENT': '*' // All event section screens
    }
  }
}

// Check if user has access to a specific section
export const canAccessSection = (userRole, sectionTitle) => {
  if (!userRole) return false

  const permissions = ROLE_PERMISSIONS[userRole]
  if (!permissions) return false

  if (permissions.allowedItems === '*') return true

  return permissions.sections.includes(sectionTitle)
}

// Check if user has access to a specific menu item
export const canAccessItem = (userRole, sectionTitle, itemLabel) => {
  if (!userRole) return false

  const permissions = ROLE_PERMISSIONS[userRole]
  if (!permissions) return false

  // Super admin has access to everything
  if (permissions.allowedItems === '*') return true

  // Check if section is allowed
  if (!permissions.sections.includes(sectionTitle)) return false

  const sectionPermissions = permissions.allowedItems[sectionTitle]

  // If section has wildcard, all items are allowed
  if (sectionPermissions === '*') return true

  // Check if item is in the allowed list
  if (sectionPermissions && sectionPermissions[itemLabel]) {
    return true
  }

  return false
}

// Check if user has access to a specific sub-item
export const canAccessSubItem = (userRole, sectionTitle, itemLabel, subItemLabel) => {
  if (!userRole) return false

  const permissions = ROLE_PERMISSIONS[userRole]
  if (!permissions) return false

  // Super admin has access to everything
  if (permissions.allowedItems === '*') return true

  // Check if section is allowed
  if (!permissions.sections.includes(sectionTitle)) return false

  const sectionPermissions = permissions.allowedItems[sectionTitle]

  // If section has wildcard, all items are allowed
  if (sectionPermissions === '*') return true

  if (!sectionPermissions) return false

  const itemPermissions = sectionPermissions[itemLabel]

  // If item has wildcard or true, all sub-items are allowed
  if (itemPermissions === '*' || itemPermissions === true) return true

  // Check if sub-item is in the allowed list
  if (Array.isArray(itemPermissions)) {
    return itemPermissions.includes(subItemLabel)
  }

  return false
}

// Filter menu items based on user role
export const filterMenuItems = (menuItems, userRole) => {
  if (!userRole) return []

  const permissions = ROLE_PERMISSIONS[userRole]
  if (!permissions) return []

  // Super admin sees everything
  if (permissions.allowedItems === '*') return menuItems

  return menuItems
    .filter(section => permissions.sections.includes(section.title))
    .map(section => {
      const sectionPermissions = permissions.allowedItems[section.title]

      // If section has wildcard, return all items
      if (sectionPermissions === '*') {
        return section
      }

      // Filter items based on permissions
      const filteredItems = section.items
        .map(item => {
          // Handle string items (no sub-items)
          if (typeof item === 'string') {
            return sectionPermissions && sectionPermissions[item] ? item : null
          }

          // Handle object items (with potential sub-items)
          const itemLabel = item.label
          const itemPermissions = sectionPermissions ? sectionPermissions[itemLabel] : null

          if (!itemPermissions) return null

          // If item has no sub-items
          if (!item.subItems) {
            return itemPermissions === true ? item : null
          }

          // If item has wildcard permission, return all sub-items
          if (itemPermissions === '*' || itemPermissions === true) {
            return item
          }

          // Filter sub-items based on permissions
          if (Array.isArray(itemPermissions)) {
            const filteredSubItems = item.subItems.filter(subItem =>
              itemPermissions.includes(subItem)
            )

            if (filteredSubItems.length === 0) return null

            return {
              ...item,
              subItems: filteredSubItems
            }
          }

          return null
        })
        .filter(item => item !== null)

      return {
        ...section,
        items: filteredItems
      }
    })
    .filter(section => section.items.length > 0)
}
