import React from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const ViewerDistributionMap = () => {
  // Sample data for viewer locations
  const viewerLocations = [
    { lat: -1.2921, lng: 36.8219, count: 2500, city: 'Nairobi', color: '#8B5CF6' },
    { lat: 40.7128, lng: -74.0060, count: 1800, city: 'New York', color: '#3B82F6' },
    { lat: 51.5074, lng: -0.1278, count: 1200, city: 'London', color: '#10B981' },
    { lat: -33.8688, lng: 151.2093, count: 900, city: 'Sydney', color: '#10B981' },
    { lat: 35.6762, lng: 139.6503, count: 1600, city: 'Tokyo', color: '#3B82F6' },
    { lat: 1.3521, lng: 103.8198, count: 700, city: 'Singapore', color: '#10B981' },
    { lat: 19.4326, lng: -99.1332, count: 500, city: 'Mexico City', color: '#10B981' },
    { lat: 55.7558, lng: 37.6173, count: 1100, city: 'Moscow', color: '#10B981' },
  ]

  // Function to get marker size based on viewer count
  const getMarkerSize = (count) => {
    if (count >= 2000) return 25
    if (count >= 1000) return 18
    return 12
  }

  return (
    <div className="bg-gray-700 rounded-lg shadow p-4">
      <h2 className="text-white text-sm font-semibold mb-4">Viewer Distribution</h2>
      
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
          {viewerLocations.map((location, index) => (
            <CircleMarker
              key={index}
              center={[location.lat, location.lng]}
              radius={getMarkerSize(location.count)}
              fillColor={location.color}
              color={location.color}
              fillOpacity={0.6}
              weight={2}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-bold">{location.city}</div>
                  <div className="text-gray-600">{location.count.toLocaleString()} viewers</div>
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
          <span className="text-white text-xs">500-1000 viewers</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-white text-xs">1000-2000 viewers</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-white text-xs">2000+ viewers</span>
        </div>
      </div>
    </div>
  )
}

export default ViewerDistributionMap

