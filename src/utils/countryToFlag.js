// Single-file country -> ISO alpha-2 mapping used by components.
// Exports a named and default `countryToFlag` for compatibility with existing imports.
export const countryToFlag = (countryName) => {
	const mapping = {
		Kenya: 'KE',
		'Africa': 'KE',
		// Special regional token for East African Community flag; handled in UI
		'East Africa': 'EAC',
		Ghana: 'GH',
		Nigeria: 'NG',
		'United States': 'US',
		'United Kingdom': 'GB',
		Canada: 'CA',
		India: 'IN',
		Germany: 'DE',
		France: 'FR',
		Spain: 'ES',
		Italy: 'IT',
		Uganda: 'UG',
		Tanzania: 'TZ',
		Rwanda: 'RW',
		Burundi: 'BI',
		// Add more mappings as required
	}

	if (!countryName) return 'KE' // safe default

	// Direct match
	if (mapping[countryName]) return mapping[countryName]

	// Case-insensitive match
	const lower = countryName.toLowerCase()
	for (const [name, code] of Object.entries(mapping)) {
		if (name.toLowerCase() === lower) return code
	}

	// Fallback: return uppercased first two letters if it looks like an ISO code
	const alphaOnly = countryName.replace(/[^A-Za-z]/g, '')
	if (alphaOnly.length === 2) return alphaOnly.toUpperCase()

	return 'KE'
}

export default countryToFlag
