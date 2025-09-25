export const menuItems = [
  {
    title: 'GENERAL',
    items: [
      {
        label: 'Dashboard',
        subItems: [
          'User Overview',
          'Shops Overview',
          'Products Overview',
          'Wallet Overview'
        ]
      },
      {
        label: 'User Management',
        subItems: [
          'All Users',
          'User Roles',
          'User Activities',
          'Access Control'
        ]
      },
      {
        label: 'Celebrity Management',
        subItems: [
          'Celebrity List',
          'Verification Requests',
          'Celebrity Categories',
          'Performance Metrics'
        ]
      },
      {
        label: 'Shop Management',
        subItems: [
          'Active Shops',
          'Pending Approvals',
          'Shop Categories',
          'Shop Analytics'
        ]
      },
    ],
  },
  {
    title: 'FINANCIAL',
    items: [
      {
        label: 'Wallet Management',
        subItems: [
          'Balance Overview',
          'Transaction Log',
          'Payment Methods',
          'Withdrawal Requests'
        ]
      },
      {
        label: 'Escrow Management',
        subItems: [
          'Active Escrows',
          'Completed Escrows',
          'Dispute Resolution',
          'Escrow Settings'
        ]
      },
      {
        label: 'Transaction History',
        subItems: [
          'All Transactions',
          'Pending Transactions',
          'Failed Transactions',
          'Transaction Reports'
        ]
      }
    ],
  },
  {
    title: 'RATING AND REVIEW',
    items: [
      { label: 'All Reviews' },
      { label: 'Rankings' },
      { label: 'Rating Analytics' },
      { label: 'Authenticity Analysis' }
    ],
  },
  {
    title: 'SOCIAL',
    items: [
      {
        label: 'Post Management',
        subItems: [
          'All Posts',
          'Scheduled Posts',
          'Post Analytics',
          'Content Calendar'
        ]
      },
      {
        label: 'Engagement Metrics',
        subItems: [
          'User Engagement',
          'Content Performance',
          'Interaction Analysis',
          'Engagement Reports'
        ]
      },
      {
        label: 'Content Categories',
        subItems: [
          'Category List',
          'Category Analytics',
          'Content Tags',
          'Category Management'
        ]
      },
      {
        label: 'Live Streams',
        subItems: [
          'Active Streams',
          'Scheduled Streams',
          'Stream Analytics',
          'Stream Settings'
        ]
      }
    ],
  },
  {
    title: 'EVENT',
    items: [
      {
        label: 'Event Management',
        subItems: [
          'Upcoming Events',
          'Past Events',
          'Event Categories',
          'Event Analytics'
        ]
      },
      {
        label: 'Ticket Sales',
        subItems: [
          'Active Tickets',
          'Sales Analytics',
          'Pricing Tiers',
          'Ticket Reports'
        ]
      }
    ],
  },
];

// Helper to normalize labels for case-insensitive comparisons
const normalize = (s) => (s || '').toString().trim().toLowerCase()

export const findSubItems = (mainLabel) => {
  const target = normalize(mainLabel)
  for (const section of menuItems) {
    const item = section.items.find(item => 
      typeof item === 'object' && normalize(item.label) === target
    );
    if (item) return item.subItems || null;
  }
  return null;
};

export const isMainMenuItem = (label) => {
  const target = normalize(label)
  return menuItems.some(section => 
    section.items.some(item => 
      typeof item === 'object' && normalize(item.label) === target
    )
  );
};

export const findParentMenuItem = (subItem) => {
  const target = normalize(subItem)
  for (const section of menuItems) {
    for (const item of section.items) {
      if (typeof item === 'object' && item.subItems) {
        const found = item.subItems.some(si => normalize(si) === target)
        if (found) return item.label
      }
      if (typeof item === 'object' && normalize(item.label) === target) {
        return item.label
      }
    }
  }
  return null;
};