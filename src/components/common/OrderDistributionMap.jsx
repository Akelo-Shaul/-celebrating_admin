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

// Heat map layer component
const HeatMapLayer = ({ data }) => {
  const map = useMap()

  useEffect(() => {
    if (!map || !data || data.length === 0) return

    // Wait for map to be ready and have dimensions
    const initHeatmap = () => {
      const container = map.getContainer()
      if (!container || container.offsetWidth === 0 || container.offsetHeight === 0) {
        // Map container not ready yet, try again in a moment
        setTimeout(initHeatmap, 100)
        return
      }

      // Convert data to heat map format [lat, lng, intensity]
      const heatData = data.map(point => [
        point.lat,
        point.lng,
        point.orders / 50 // Normalize intensity based on orders
      ])

      // Create heat layer with color scheme
      const heat = L.heatLayer(heatData, {
        radius: 20,
        blur: 25,
        maxZoom: 10,
        max: 100,
        gradient: {
          0.0: '#3b82f6', // Blue - low orders
          0.5: '#8b5cf6', // Purple - medium orders
          0.8: '#10b981', // Green - high orders
          1.0: '#ef4444'  // Red - very high orders
        }
      })

      try {
        heat.addTo(map)
      } catch (error) {
        console.warn('Failed to add heatmap layer:', error)
      }

      // Cleanup function
      return () => {
        try {
          if (map.hasLayer(heat)) {
            map.removeLayer(heat)
          }
        } catch (error) {
          console.warn('Failed to remove heatmap layer:', error)
        }
      }
    }

    // Use whenReady to ensure map is initialized
    if (map.whenReady) {
      map.whenReady(() => {
        setTimeout(initHeatmap, 50)
      })
    } else {
      setTimeout(initHeatmap, 100)
    }
  }, [map, data])

  return null
}

// Get color based on order volume
const getColor = (orders) => {
  if (orders >= 500) return '#ef4444'  // Red - Above 500
  if (orders >= 300) return '#10b981'  // Green - Above 300
  if (orders >= 150) return '#8b5cf6'  // Purple - Above 150
  return '#3b82f6' // Blue - Below 150
}

// Get radius based on order volume
const getRadius = (orders) => {
  if (orders >= 500) return 10
  if (orders >= 300) return 8
  if (orders >= 150) return 6
  return 5
}

const OrderDistributionMap = ({ 
  orderData = null, 
  height = 'h-64',
  showLegend = true,
  showStats = true,
  darkMode = false,
  showHeader = true
}) => {
  // Default order data if none provided (example data for African cities)
  const defaultOrderData = [
    // Kenya
    { lat: -1.286389, lng: 36.817223, city: 'Nairobi', country: 'Kenya', orders: 620, value: 85000 },
    { lat: -0.091702, lng: 34.767956, city: 'Kisumu', country: 'Kenya', orders: 280, value: 32000 },
    { lat: -4.043477, lng: 39.668206, city: 'Mombasa', country: 'Kenya', orders: 410, value: 54000 },
    
    // Uganda
    { lat: 0.347596, lng: 32.582520, city: 'Kampala', country: 'Uganda', orders: 320, value: 42000 },
    { lat: 0.376373, lng: 30.924950, city: 'Entebbe', country: 'Uganda', orders: 145, value: 18000 },
    
    // Tanzania
    { lat: -6.792354, lng: 39.208328, city: 'Dar es Salaam', country: 'Tanzania', orders: 485, value: 67000 },
    { lat: -3.385719, lng: 36.682808, city: 'Arusha', country: 'Tanzania', orders: 210, value: 28000 },
    
    // Rwanda
    { lat: -1.970579, lng: 30.104429, city: 'Kigali', country: 'Rwanda', orders: 275, value: 38000 },
    
    // Ethiopia
    { lat: 9.024325, lng: 38.746830, city: 'Addis Ababa', country: 'Ethiopia', orders: 520, value: 71000 },
    
    // South Africa
    { lat: -33.924870, lng: 18.424055, city: 'Cape Town', country: 'South Africa', orders: 680, value: 95000 },
    { lat: -26.205171, lng: 28.049815, city: 'Johannesburg', country: 'South Africa', orders: 850, value: 120000 },
    { lat: -29.858680, lng: 31.021840, city: 'Durban', country: 'South Africa', orders: 420, value: 58000 },
    
    // Nigeria
    { lat: 6.524379, lng: 3.379206, city: 'Lagos', country: 'Nigeria', orders: 1050, value: 145000 },
    { lat: 9.076479, lng: 7.398574, city: 'Abuja', country: 'Nigeria', orders: 560, value: 76000 },
    
    // Ghana
    { lat: 5.603717, lng: -0.186964, city: 'Accra', country: 'Ghana', orders: 385, value: 52000 },
    
    // Senegal
    { lat: 14.693425, lng: -17.447938, city: 'Dakar', country: 'Senegal', orders: 260, value: 34000 },
    
    // Côte d'Ivoire
    { lat: 5.316667, lng: -4.033333, city: 'Abidjan', country: 'Côte d\'Ivoire', orders: 340, value: 48000 },
    
    // Morocco
    { lat: 33.971588, lng: -6.849813, city: 'Rabat', country: 'Morocco', orders: 450, value: 62000 },
    { lat: 33.589886, lng: -7.603869, city: 'Casablanca', country: 'Morocco', orders: 625, value: 88000 },
    
    // Egypt
    { lat: 30.044420, lng: 31.235712, city: 'Cairo', country: 'Egypt', orders: 790, value: 110000 },
    { lat: 31.200092, lng: 29.918739, city: 'Alexandria', country: 'Egypt', orders: 470, value: 64000 },
  ]

  const data = orderData || defaultOrderData

  // Calculate statistics
  const totalOrders = data.reduce((sum, loc) => sum + loc.orders, 0)
  const totalValue = data.reduce((sum, loc) => sum + loc.value, 0)
  const avgOrderValue = Math.round(totalValue / totalOrders)

  const containerClass = darkMode 
    ? 'bg-gray-700 rounded-lg shadow p-4' 
    : 'bg-white rounded-lg shadow-sm p-4'
  
  const textClass = darkMode ? 'text-white' : 'text-gray-900'
  const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-600'

  return (
    <div className={containerClass}>
      {showHeader && (
        <h5 className={`font-semibold mb-3 text-sm ${textClass}`}>
          Order Distribution Map
        </h5>
      )}
      
      {/* Map Container */}
      <div className={`w-full ${height} rounded overflow-hidden border ${darkMode ? 'border-gray-600' : 'border-gray-200'} relative z-0`}>
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
          <HeatMapLayer data={data} />
          
          {/* Circle Markers for Cities */}
          {data.map((location, index) => (
            <CircleMarker
              key={index}
              center={[location.lat, location.lng]}
              radius={getRadius(location.orders)}
              fillColor={getColor(location.orders)}
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
                      <span className="text-gray-500">Orders:</span>
                      <span className="font-semibold text-blue-600">
                        {location.orders.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Value:</span>
                      <span className="font-semibold text-green-600">
                        ${location.value.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Avg Order:</span>
                      <span className="font-semibold text-purple-600">
                        ${Math.round(location.value / location.orders)}
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
      {showLegend && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
              <span className={subTextClass}>Below 150 orders</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
              <span className={subTextClass}>150 - 300 orders</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
              <span className={subTextClass}>300 - 500 orders</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              <span className={subTextClass}>Above 500 orders</span>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      {showStats && (
        <div className="mt-4 pt-4 border-t border-gray-300">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className={`text-xl font-bold ${textClass}`}>
                {totalOrders.toLocaleString()}
              </div>
              <div className={`text-xs ${subTextClass}`}>Total Orders</div>
            </div>
            <div>
              <div className={`text-xl font-bold ${textClass}`}>
                ${(totalValue / 1000).toFixed(0)}K
              </div>
              <div className={`text-xs ${subTextClass}`}>Total Value</div>
            </div>
            <div>
              <div className={`text-xl font-bold ${textClass}`}>
                ${avgOrderValue}
              </div>
              <div className={`text-xs ${subTextClass}`}>Avg Order</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderDistributionMap

