export const countryToCode = (countryName) => {
  const mapping = {
    'Kenya': 'KE',
    'Ghana': 'GH',
    'Nigeria': 'NG',
  }
  return mapping[countryName] || 'KE'
}
