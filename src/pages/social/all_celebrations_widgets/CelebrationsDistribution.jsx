import React, { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.heat'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Heat map layer component
const HeatMapLayer = ({ data }) => {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    // Convert data to heat map format [lat, lng, intensity]
    const heatData = data.map(point => [
      point.lat,
      point.lng,
      point.celebrations / 1000 // Normalize intensity
    ])

    // Create heat layer
    const heat = L.heatLayer(heatData, {
      radius: 25,
      blur: 35,
      maxZoom: 10,
      max: 150,
      gradient: {
        0.0: '#3b82f6', // Blue
        0.5: '#10b981', // Green
        0.7: '#f59e0b', // Orange
        1.0: '#ef4444'  // Red
      }
    })

    heat.addTo(map)

    return () => {
      map.removeLayer(heat)
    }
  }, [map, data])

  return null
}

// Get color based on celebrations count
const getColor = (celebrations) => {
  if (celebrations >= 50000) return '#ff9800' // Orange - Above 50k
  if (celebrations >= 30000) return '#4caf50'  // Green - Above 30k
  if (celebrations >= 10000) return '#2196f3'  // Blue - Above 10k
  return '#90caf9' // Light Blue - Below 10k
}

// Get radius based on celebrations count
const getRadius = (celebrations) => {
  if (celebrations >= 50000) return 12
  if (celebrations >= 30000) return 10
  if (celebrations >= 10000) return 8
  return 6
}

const CelebrationsDistribution = () => {
  // Sample celebrations data for African cities
  const celebrationsData = useMemo(() => [
    // Kenya
    { city: 'Nairobi', country: 'Kenya', lat: -1.286389, lng: 36.817223, celebrations: 85000, users: 12500 },
    { city: 'Kisumu', country: 'Kenya', lat: -0.091702, lng: 34.767956, celebrations: 32000, users: 4800 },
    { city: 'Mombasa', country: 'Kenya', lat: -4.043477, lng: 39.668206, celebrations: 54000, users: 7200 },
    
    // Uganda
    { city: 'Kampala', country: 'Uganda', lat: 0.347596, lng: 32.582520, celebrations: 42000, users: 6100 },
    { city: 'Entebbe', country: 'Uganda', lat: 0.376373, lng: 30.924950, celebrations: 18000, users: 2500 },
    
    // Tanzania
    { city: 'Dar es Salaam', country: 'Tanzania', lat: -6.792354, lng: 39.208328, celebrations: 67000, users: 9800 },
    { city: 'Arusha', country: 'Tanzania', lat: -3.385719, lng: 36.682808, celebrations: 28000, users: 3900 },
    
    // Rwanda
    { city: 'Kigali', country: 'Rwanda', lat: -1.970579, lng: 30.104429, celebrations: 38000, users: 5400 },
    
    // Ethiopia
    { city: 'Addis Ababa', country: 'Ethiopia', lat: 9.024325, lng: 38.746830, celebrations: 71000, users: 10200 },
    
    // South Africa
    { city: 'Cape Town', country: 'South Africa', lat: -33.924870, lng: 18.424055, celebrations: 95000, users: 14500 },
    { city: 'Johannesburg', country: 'South Africa', lat: -26.205171, lng: 28.049815, celebrations: 120000, users: 18000 },
    { city: 'Durban', country: 'South Africa', lat: -29.858680, lng: 31.021840, celebrations: 58000, users: 8200 },
    
    // Nigeria
    { city: 'Lagos', country: 'Nigeria', lat: 6.524379, lng: 3.379206, celebrations: 145000, users: 22000 },
    { city: 'Abuja', country: 'Nigeria', lat: 9.076479, lng: 7.398574, celebrations: 76000, users: 11500 },
    
    // Ghana
    { city: 'Accra', country: 'Ghana', lat: 5.603717, lng: -0.186964, celebrations: 52000, users: 7800 },
    
    // Senegal
    { city: 'Dakar', country: 'Senegal', lat: 14.693425, lng: -17.447938, celebrations: 34000, users: 4900 },
    
    // Côte d'Ivoire
    { city: 'Abidjan', country: 'Côte d\'Ivoire', lat: 5.3167, lng: -4.0333, celebrations: 48000, users: 6900 },
    
    // Morocco
    { city: 'Rabat', country: 'Morocco', lat: 33.971588, lng: -6.849813, celebrations: 62000, users: 8800 },
    { city: 'Casablanca', country: 'Morocco', lat: 33.589886, lng: -7.603869, celebrations: 88000, users: 13200 },
    
    // Egypt
    { city: 'Cairo', country: 'Egypt', lat: 30.044420, lng: 31.235712, celebrations: 110000, users: 16500 },
    { city: 'Alexandria', country: 'Egypt', lat: 31.200092, lng: 29.918739, celebrations: 64000, users: 9100 },
    
    // Additional cities
    { city: 'Kinshasa', country: 'DRC', lat: -4.4419, lng: 15.2663, celebrations: 55000, users: 7900 },
    { city: 'Luanda', country: 'Angola', lat: -8.8383, lng: 13.2344, celebrations: 45000, users: 6400 },
    { city: 'Khartoum', country: 'Sudan', lat: 15.5007, lng: 32.5599, celebrations: 38000, users: 5200 },
  ], [])

  const heatPoints = useMemo(() => 
    celebrationsData.map(loc => [loc.lat, loc.lng, loc.celebrations / 100000]) // Scale for heat intensity
  , [celebrationsData])

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full flex flex-col">
      <h2 className="text-gray-600 font-medium mb-4">Celebrations Distribution</h2>
      
      {/* Map Container */}
      <div className="flex-1 min-h-[400px] rounded-lg overflow-hidden border border-gray-200 relative z-0">
        <MapContainer 
          center={[0.0236, 37.9062]} // Center of Africa
          zoom={4} 
          scrollWheelZoom={true} 
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Heat Map Layer */}
          <HeatMapLayer data={celebrationsData} />
          
          {/* Circle Markers for Cities */}
          {celebrationsData.map((location, index) => (
            <CircleMarker
              key={index}
              center={[location.lat, location.lng]}
              radius={getRadius(location.celebrations)}
              fillColor={getColor(location.celebrations)}
              fillOpacity={0.7}
              color="#fff"
              weight={2}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-bold text-gray-900">{location.city}</div>
                  <div className="text-gray-600">{location.country}</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Celebrations:</span>
                      <span className="font-semibold text-blue-600">
                        {location.celebrations.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Active Users:</span>
                      <span className="font-semibold text-green-600">
                        {location.users.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Avg/User:</span>
                      <span className="font-semibold text-purple-600">
                        {Math.round(location.celebrations / location.users)}
                      </span>
                    </div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
      
      {/* Legend */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block border-2 border-white"></span>
          <span className="text-gray-600">Above 10,000</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block border-2 border-white"></span>
          <span className="text-gray-600">Above 30,000</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-500 inline-block border-2 border-white"></span>
          <span className="text-gray-600">Above 50,000</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-300 inline-block border-2 border-white"></span>
          <span className="text-gray-600">Below 10,000</span>
        </div>
      </div>
    </div>
  )
}

export default CelebrationsDistribution
