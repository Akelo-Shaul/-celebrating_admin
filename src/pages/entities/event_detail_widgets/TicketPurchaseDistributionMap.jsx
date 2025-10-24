import React from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const TicketPurchaseDistributionMap = () => {
  // Sample data for ticket purchases by location
  const purchaseLocations = [
    { lat: -1.2921, lng: 36.8219, count: 15, amount: 10000, color: '#10B981' },  // Nairobi (Above $10,000)
    { lat: 40.7128, lng: -74.0060, count: 25, amount: 32000, color: '#3B82F6' }, // New York (Above $30,000)
    { lat: 51.5074, lng: -0.1278, count: 8, amount: 12000, color: '#10B981' },   // London
    { lat: -33.8688, lng: 151.2093, count: 12, amount: 18000, color: '#10B981' }, // Sydney
    { lat: 35.6762, lng: 139.6503, count: 20, amount: 35000, color: '#3B82F6' }, // Tokyo
    { lat: 1.3521, lng: 103.8198, count: 10, amount: 52000, color: '#8B5CF6' },  // Singapore (Above $50,000)
    { lat: 19.4326, lng: -99.1332, count: 6, amount: 8000, color: '#10B981' },   // Mexico City
    { lat: 55.7558, lng: 37.6173, count: 18, amount: 42000, color: '#3B82F6' },  // Moscow
  ]

  // Function to get marker size based on amount
  const getMarkerSize = (amount) => {
    if (amount >= 50000) return 20
    if (amount >= 30000) return 15
    return 10
  }

  return (
    <div className="bg-gray-700 rounded-lg shadow p-4">
      <h2 className="text-white text-sm font-semibold mb-4">Ticket Purchase Distribution</h2>
      
      {/* Map */}
      <div className="h-[250px] rounded-lg overflow-hidden mb-4">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: '100%', width: '100%', backgroundColor: '#374151' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {purchaseLocations.map((location, index) => (
            <CircleMarker
              key={index}
              center={[location.lat, location.lng]}
              radius={getMarkerSize(location.amount)}
              fillColor={location.color}
              color={location.color}
              fillOpacity={0.6}
              weight={2}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-bold">${location.amount.toLocaleString()}</div>
                  <div className="text-gray-600">{location.count} purchases</div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-white text-xs">Above $10,000</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-white text-xs">Above $30,000</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-white text-xs">Above $50,000</span>
        </div>
      </div>
    </div>
  )
}

export default TicketPurchaseDistributionMap

