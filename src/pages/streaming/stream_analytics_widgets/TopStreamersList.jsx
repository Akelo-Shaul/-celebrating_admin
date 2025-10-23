import React from 'react';

const TopStreamersList = () => {
  const streamers = [
    {
      rank: 1,
      name: 'Braum Hallabery',
      avatar: 'B',
      streams: 14,
      viewers: 1345245,
      revenue: 255987
    },
    {
      rank: 2,
      name: 'Braum Hallabery',
      avatar: 'B',
      streams: 14,
      viewers: 1345245,
      revenue: 255987
    },
    {
      rank: 3,
      name: 'Braum Hallabery',
      avatar: 'B',
      streams: 14,
      viewers: 1345245,
      revenue: 255987
    },
    {
      rank: 4,
      name: 'Braum Hallabery',
      avatar: 'B',
      streams: 14,
      viewers: 1345245,
      revenue: 255987
    },
    {
      rank: 5,
      name: 'Braum Hallabery',
      avatar: 'B',
      streams: 14,
      viewers: 1345245,
      revenue: 255987
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Top Streamers (This Month)</h3>
        <select className="text-sm text-gray-600 bg-transparent border-none focus:outline-none">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {streamers.map((streamer) => (
          <div key={streamer.rank} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              <span className="text-sm font-bold text-gray-600">#{streamer.rank}</span>
            </div>
            
            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {streamer.avatar}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate">{streamer.name}</h4>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-600">{streamer.streams} Streams</div>
              <div className="text-sm text-gray-600">{streamer.viewers.toLocaleString()} Viewers</div>
              <div className="text-sm font-semibold text-green-600">${streamer.revenue.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStreamersList;






