import React from 'react';
import { useNavigate } from 'react-router-dom';

const PastEventCard = ({ event }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-gray-100 rounded-lg overflow-hidden shadow cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/event/${encodeURIComponent(event.title)}`)}
    >
      {/* Header with Pattern Background */}
      <div className="relative h-32 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
        {/* Background Pattern - Tribal Masks */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-amber-900 via-orange-800 to-red-900" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Cpath d='M30 10c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20zm0 4c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16z'/%3E%3Cpath d='M30 15c8.284 0 15 6.716 15 15s-6.716 15-15 15-15-6.716-15-15 6.716-15 15-15zm0 4c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundSize: '60px 60px'
               }}>
          </div>
        </div>

        {/* Bottom Right - Viewer Count */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-gray-800 bg-opacity-80 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span>{event.viewerCount}</span>
          </div>
        </div>
      </div>

      {/* Event Details Area */}
      <div className="p-4 bg-white">
        {/* Host Information */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            {/* Avatar */}
            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {event.host.avatar}
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">{event.host.name}</h4>
              <p className="text-xs text-gray-500">{event.host.handle}</p>
              <span className="inline-block text-xs px-2 py-0.5 rounded-full mt-1 bg-orange-100 text-orange-800">
                {event.host.status}
              </span>
            </div>
          </div>
          
          {/* Rating and More Options */}
          <div className="flex items-center space-x-3">
            {/* Star Rating */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < 3 ? 'text-orange-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            {/* More Options */}
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Event Title */}
        <h3 className="text-base font-bold text-gray-900 mb-3">{event.title}</h3>

        {/* Event Metrics */}
        <div className="flex items-center space-x-6 mb-3 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
            <span>{event.viewersPerMinute}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>{event.duration}</span>
          </div>
        </div>

        {/* Sentiment */}
        <div className="text-sm text-gray-500 mb-3">
          Sentiment: {event.sentiment}%
        </div>

        {/* Tags */}
        <div className="flex items-center space-x-2 mb-4">
          {event.tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Event Date and Time */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            Held On
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-gray-900">{event.date}</div>
            <div className="text-sm text-gray-900">{event.time}</div>
          </div>
        </div>

        {/* Attendance Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Attendance</span>
            <span className="text-gray-900">{event.attendance.attended}/{event.attendance.total} ({event.attendance.percentage}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gray-600 h-2 rounded-full" 
              style={{ width: `${event.attendance.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Revenue and Status */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600 mb-1">Revenue</div>
            <div className="text-lg font-bold text-green-600">{event.revenue}</div>
          </div>
          <div className="text-right">
            <span className="bg-gray-600 text-white text-xs px-3 py-1 rounded-full">
              {event.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastEventCard;
