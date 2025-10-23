import React from 'react';

const ApprovedStreamsList = () => {
  const approvedStreams = [
    {
      id: 1,
      title: "Product Launch - Next Gen Launch Phone",
      streamer: {
        name: "Braum Hallabery",
        avatar: "B",
        status: "Celebrity"
      },
      scheduled: "Oct 3, 10:52",
      category: "Podcast",
      type: "Paid",
      expectedViewers: "540K",
      thumbnail: "placeholder"
    },
    {
      id: 2,
      title: "Product Launch - Next Gen Launch Phone",
      streamer: {
        name: "Braum Hallabery",
        avatar: "B",
        status: "Celebrity"
      },
      scheduled: "Oct 3, 10:52",
      category: "Podcast",
      type: "Paid",
      expectedViewers: "540K",
      thumbnail: "placeholder"
    }
  ];

  const handleEdit = (stream) => {
    console.log('Edit stream:', stream);
  };

  const handleReschedule = (stream) => {
    console.log('Reschedule stream:', stream);
  };

  const handleNotifyFollowers = (stream) => {
    console.log('Notify followers:', stream);
  };

  const handlePromote = (stream) => {
    console.log('Promote stream:', stream);
  };

  const handleDetails = (stream) => {
    console.log('View details:', stream);
  };

  const handleCancel = (stream) => {
    console.log('Cancel stream:', stream);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Approved Streams</h2>
          <select className="bg-gray-700 text-white text-sm px-3 py-1 rounded border-none focus:outline-none">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Next Month</option>
          </select>
        </div>
      </div>

      {/* Streams List */}
      <div className="p-6 space-y-4">
        {approvedStreams.map((stream) => (
          <div key={stream.id} className="bg-white rounded-lg p-4 relative shadow-sm">
            {/* Approved Badge */}
            <div className="absolute top-4 right-4">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Approved
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
                    <span className="text-gray-500">Scheduled:</span>
                    <span className="ml-1 font-medium text-gray-900">{stream.scheduled}</span>
                  </div>
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
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(stream)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleReschedule(stream)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Reschedule</span>
                  </button>
                  <button
                    onClick={() => handleNotifyFollowers(stream)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12l2 2 4-4M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                    <span>Notify Followers</span>
                  </button>
                  <button
                    onClick={() => handlePromote(stream)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Promote</span>
                  </button>
                  <button
                    onClick={() => handleDetails(stream)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>Details</span>
                  </button>
                  <button
                    onClick={() => handleCancel(stream)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Cancel</span>
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

export default ApprovedStreamsList;
