import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopStreamersList = () => {
  const navigate = useNavigate();
  
  const streamers = [
    {
      rank: 1,
      name: 'Braum Hallabery',
      handle: '@braum',
      avatar: 'B',
      streams: 14,
      viewers: 1345245,
      revenue: 255987
    },
    {
      rank: 2,
      name: 'Braum Hallabery',
      handle: '@braum',
      avatar: 'B',
      streams: 14,
      viewers: 1345245,
      revenue: 255987
    },
    {
      rank: 3,
      name: 'Braum Hallabery',
      handle: '@braum',
      avatar: 'B',
      streams: 14,
      viewers: 1345245,
      revenue: 255987
    },
    {
      rank: 4,
      name: 'Braum Hallabery',
      handle: '@braum',
      avatar: 'B',
      streams: 14,
      viewers: 1345245,
      revenue: 255987
    },
    {
      rank: 5,
      name: 'Braum Hallabery',
      handle: '@braum',
      avatar: 'B',
      streams: 14,
      viewers: 1345245,
      revenue: 255987
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Top Streamers (This Month)</h3>
        <select className="text-sm text-gray-600 bg-transparent border-none focus:outline-none">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="space-y-3 md:space-y-4">
        {streamers.map((streamer) => (
          <div
            key={streamer.rank}
            className="flex items-center gap-2 md:gap-4 p-2 md:p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => navigate(`/profile/${encodeURIComponent(streamer.handle)}`)}
          >
            <div className="flex-shrink-0">
              <span className="text-xs md:text-sm font-bold text-gray-600">#{streamer.rank}</span>
            </div>

            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-semibold text-xs md:text-sm flex-shrink-0">
              {streamer.avatar}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs md:text-sm font-semibold text-gray-900 truncate">{streamer.name}</h4>
              <p className="text-xs text-gray-500">{streamer.handle}</p>
            </div>

            <div className="text-right flex-shrink-0">
              <div className="text-xs md:text-sm text-gray-600">{streamer.streams} Streams</div>
              <div className="text-xs md:text-sm text-gray-600 hidden sm:block">{streamer.viewers.toLocaleString()} Viewers</div>
              <div className="text-xs md:text-sm font-semibold text-green-600">${streamer.revenue.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStreamersList;







