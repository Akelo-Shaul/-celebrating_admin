import React from 'react';

const LiveFeed = () => {
  const feedItems = [
    {
      id: 1,
      text: "@hankmcoy climbed 3 positions to #5",
      time: "2 mins ago"
    },
    {
      id: 2,
      text: "@braum halabery trending with +2.5% growth",
      time: "2 mins ago"
    },
    {
      id: 3,
      text: "@hank mcoy reached 450M followers",
      time: "2 mins ago"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Feed</h3>
      
      <div className="space-y-4">
        {feedItems.map((item) => (
          <div key={item.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">{item.text}</p>
              <p className="text-xs text-gray-500 mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveFeed;








