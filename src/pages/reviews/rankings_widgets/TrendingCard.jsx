import React from 'react';

const TrendingCard = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        {/* Profile Picture */}
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-gray-900">@Shaul</span>
            <span className="text-sm text-gray-600">Shaul</span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
              </svg>
              Trending
            </span>
          </div>
          
          <div className="text-sm text-gray-600 mb-2">Movie Premiere event</div>
          
          <div className="space-y-1">
            <div className="text-xs text-gray-500">Follower Spike: +500k</div>
            <div className="text-xs text-gray-500">Engagement Surge: 13%</div>
            <div className="text-xs text-gray-500">Media Mentions: 34k</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm font-bold text-gray-900">Score: 95</div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;










