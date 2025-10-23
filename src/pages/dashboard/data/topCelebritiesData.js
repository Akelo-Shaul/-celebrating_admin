export const celebrities = [
  { id: 1, name: 'Shaul Akelo', country: 'Kenya', followers: 32000, posts: 32, rating: 4.5, status: 'Active' },
  { id: 2, name: 'Hankue Hue', country: 'Kenya', followers: 23000, posts: 32, rating: 4.3, status: 'Active' },
  { id: 3, name: 'Paward Chung', country: 'Kenya', followers: 23000, posts: 12, rating: 4.3, status: 'Inactive' },
  { id: 4, name: 'Hang Turm', country: 'Kenya', followers: 23000, posts: 8, rating: 4.3, status: 'Active' },
  { id: 5, name: 'Maya Cole', country: 'Ghana', followers: 15000, posts: 14, rating: 4.2, status: 'Active' },
  { id: 6, name: 'Lina Gomez', country: 'Nigeria', followers: 42000, posts: 54, rating: 4.7, status: 'Active' },
]

export const members = [
  { id: 101, name: 'Member One', country: 'Kenya', followers: 1200, posts: 3, status: 'Active' },
  { id: 102, name: 'Member Two', country: 'Ghana', followers: 2300, posts: 6, status: 'Restricted' },
  { id: 103, name: 'Member Three', country: 'Nigeria', followers: 800, posts: 1, status: 'Active' },
  { id: 104, name: 'Member Four', country: 'Kenya', followers: 4000, posts: 12, status: 'Active' },
]

export const countries = [...new Set([...celebrities, ...members].map(i => i.country))]

export const followerRanges = [
  { id: 'all', label: 'All' },
  { id: '0-1k', label: '0 - 1k', min: 0, max: 1000 },
  { id: '1k-5k', label: '1k - 5k', min: 1000, max: 5000 },
  { id: '5k-20k', label: '5k - 20k', min: 5000, max: 20000 },
  { id: '20k+', label: '20k+', min: 20000, max: Infinity },
]

export default { celebrities, members, countries, followerRanges }
