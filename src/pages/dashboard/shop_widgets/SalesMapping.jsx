import React, { useEffect } from 'react'
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

// Sample sales data for various African countries and regions
const salesData = [
  // Kenya
  { lat: -1.286389, lng: 36.817223, city: 'Nairobi', country: 'Kenya', sales: 85000, orders: 450 },
  { lat: -0.091702, lng: 34.767956, city: 'Kisumu', country: 'Kenya', sales: 32000, orders: 180 },
  { lat: -4.043477, lng: 39.668206, city: 'Mombasa', country: 'Kenya', sales: 54000, orders: 290 },
  
  // Uganda
  { lat: 0.347596, lng: 32.582520, city: 'Kampala', country: 'Uganda', sales: 42000, orders: 220 },
  { lat: 0.376373, lng: 30.924950, city: 'Entebbe', country: 'Uganda', sales: 18000, orders: 95 },
  
  // Tanzania
  { lat: -6.792354, lng: 39.208328, city: 'Dar es Salaam', country: 'Tanzania', sales: 67000, orders: 340 },
  { lat: -3.385719, lng: 36.682808, city: 'Arusha', country: 'Tanzania', sales: 28000, orders: 150 },
  
  // Rwanda
  { lat: -1.970579, lng: 30.104429, city: 'Kigali', country: 'Rwanda', sales: 38000, orders: 195 },
  
  // Ethiopia
  { lat: 9.024325, lng: 38.746830, city: 'Addis Ababa', country: 'Ethiopia', sales: 71000, orders: 370 },
  
  // South Africa
  { lat: -33.924870, lng: 18.424055, city: 'Cape Town', country: 'South Africa', sales: 95000, orders: 520 },
  { lat: -26.205171, lng: 28.049815, city: 'Johannesburg', country: 'South Africa', sales: 120000, orders: 650 },
  { lat: -29.858680, lng: 31.021840, city: 'Durban', country: 'South Africa', sales: 58000, orders: 310 },
  
  // Nigeria
  { lat: 6.524379, lng: 3.379206, city: 'Lagos', country: 'Nigeria', sales: 145000, orders: 780 },
  { lat: 9.076479, lng: 7.398574, city: 'Abuja', country: 'Nigeria', sales: 76000, orders: 410 },
  
  // Ghana
  { lat: 5.603717, lng: -0.186964, city: 'Accra', country: 'Ghana', sales: 52000, orders: 280 },
  
  // Senegal
  { lat: 14.693425, lng: -17.447938, city: 'Dakar', country: 'Senegal', sales: 34000, orders: 185 },
  
  // Côte d\'Ivoire
  { lat: 5.316667, lng: -4.033333, city: 'Abidjan', country: 'Côte d\'Ivoire', sales: 48000, orders: 260 },
  
  // Morocco
  { lat: 33.971588, lng: -6.849813, city: 'Rabat', country: 'Morocco', sales: 62000, orders: 340 },
  { lat: 33.589886, lng: -7.603869, city: 'Casablanca', country: 'Morocco', sales: 88000, orders: 470 },
  
  // Egypt
  { lat: 30.044420, lng: 31.235712, city: 'Cairo', country: 'Egypt', sales: 110000, orders: 590 },
  { lat: 31.200092, lng: 29.918739, city: 'Alexandria', country: 'Egypt', sales: 64000, orders: 350 },
]

// Heat map layer component
const HeatMapLayer = ({ data }) => {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    // Convert data to heat map format [lat, lng, intensity]
    const heatData = data.map(point => [
      point.lat,
      point.lng,
      point.sales / 1000 // Normalize intensity
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

// Get color based on sales value
const getColor = (sales) => {
  if (sales >= 100000) return '#8b5cf6' // Purple - Above $100k
  if (sales >= 50000) return '#3b82f6'  // Blue - Above $50k
  if (sales >= 30000) return '#10b981'  // Green - Above $30k
  return '#f59e0b' // Orange - Below $30k
}

// Get radius based on sales value
const getRadius = (sales) => {
  if (sales >= 100000) return 12
  if (sales >= 50000) return 10
  if (sales >= 30000) return 8
  return 6
}

const SalesMapping = () => {
  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <h5 className="font-semibold mb-3">Sales Mapping - Heat Map</h5>
      
      {/* Map Container */}
      <div className="w-full h-80 rounded overflow-hidden border border-gray-200 relative z-0">
        <MapContainer
          center={[0.0236, 37.9062]} // Center of Africa
          zoom={4}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Heat Map Layer */}
          <HeatMapLayer data={salesData} />
          
          {/* Circle Markers for Cities */}
          {salesData.map((location, index) => (
            <CircleMarker
              key={index}
              center={[location.lat, location.lng]}
              radius={getRadius(location.sales)}
              fillColor={getColor(location.sales)}
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
                      <span className="text-gray-500">Sales:</span>
                      <span className="font-semibold text-green-600">
                        ${location.sales.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Orders:</span>
                      <span className="font-semibold text-blue-600">
                        {location.orders}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Avg Order:</span>
                      <span className="font-semibold text-purple-600">
                        ${Math.round(location.sales / location.orders)}
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
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-orange-500 inline-block border-2 border-white"></span>
          <span className="text-gray-600">Below $30K</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-green-500 inline-block border-2 border-white"></span>
          <span className="text-gray-600">$30K - $50K</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-blue-500 inline-block border-2 border-white"></span>
          <span className="text-gray-600">$50K - $100K</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-purple-500 inline-block border-2 border-white"></span>
          <span className="text-gray-600">Above $100K</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              ${(salesData.reduce((sum, loc) => sum + loc.sales, 0) / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-gray-500">Total Sales</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {salesData.reduce((sum, loc) => sum + loc.orders, 0)}
            </div>
            <div className="text-xs text-gray-500">Total Orders</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {salesData.length}
            </div>
            <div className="text-xs text-gray-500">Active Cities</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesMapping
