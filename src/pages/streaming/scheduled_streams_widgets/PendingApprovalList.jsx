import React from 'react';
import { useNavigate } from 'react-router-dom';

const PendingApprovalList = () => {
  const navigate = useNavigate();
  
  const pendingStreams = [
    {
      id: 1,
      title: "Exclusive Podcast - Be Better",
      streamer: {
        name: "Braum Hallabery",
        avatar: "B",
        status: "Celebrity"
      },
      category: "Podcast",
      type: "Paid",
      expectedViewers: "540K",
      requestedTime: "In 3 Hours",
      thumbnail: "placeholder"
    },
    {
      id: 2,
      title: "Exclusive Podcast - Be Better",
      streamer: {
        name: "Braum Hallabery",
        avatar: "B",
        status: "Celebrity"
      },
      category: "Podcast",
      type: "Paid",
      expectedViewers: "540K",
      requestedTime: "In 3 Hours",
      thumbnail: "placeholder"
    }
  ];

  const handlePreview = (stream) => {
    navigate(`/stream/${encodeURIComponent(stream.title)}`);
  };

  const handleApprove = (stream) => {
    console.log('Approve stream:', stream);
  };

  const handleReject = (stream) => {
    console.log('Reject stream:', stream);
  };

  const handleReschedule = (stream) => {
    console.log('Reschedule stream:', stream);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Pending Approval</h2>
          <select className="bg-gray-700 text-white text-sm px-3 py-1 rounded border-none focus:outline-none">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Next Month</option>
          </select>
        </div>
      </div>

      {/* Streams List */}
      <div className="p-6 space-y-4">
        {pendingStreams.map((stream) => (
          <div key={stream.id} className="bg-white rounded-lg p-4 relative shadow-sm">
            {/* Pending Badge */}
            <div className="absolute top-4 right-4">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Pending
              </span>
            </div>

            <div className="flex space-x-4">
              {/* Thumbnail */}
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="text-center">
                  <svg className="w-8 h-8 text-red-500 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <svg className="w-6 h-6 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>

              {/* Stream Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{stream.title}</h3>
                
                {/* Streamer Info */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {stream.streamer.avatar}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{stream.streamer.name}</span>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                    {stream.streamer.status}
                  </span>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-sm">
                    <span className="text-gray-500">Category:</span>
                    <span className="ml-1 font-medium text-gray-900">{stream.category}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Type:</span>
                    <span className="ml-1 font-medium text-gray-900">{stream.type}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Expected Viewers:</span>
                    <span className="ml-1 font-medium text-gray-900">{stream.expectedViewers}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Requested Time:</span>
                    <span className="ml-1 font-bold text-gray-900">{stream.requestedTime}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePreview(stream)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => handleApprove(stream)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(stream)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => handleReschedule(stream)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Reschedule</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingApprovalList;






