import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventListTable = () => {
  const navigate = useNavigate();
  
  const events = [
    {
      id: 1,
      title: "Product Launch - Next Gen Launch Phone",
      organizer: "Braum Hallabery",
      organizerStatus: "Celebrity",
      category: "Music",
      date: "Oct 3, 10:52",
      time: "10:52 EAT",
      location: "Anniversary Towers, 5th Floor Nairobi",
      ticketsSold: 850,
      totalTickets: 1000,
      ticketsPercentage: "85%",
      revenue: "$356,254",
      status: "LIVE",
      statusColor: "text-red-500",
      statusBg: "bg-red-100"
    },
    {
      id: 2,
      title: "Product Launch - Next Gen Launch Phone",
      organizer: "Braum Hallabery",
      organizerStatus: "Celebrity",
      category: "Music",
      date: "Oct 3, 10:52",
      time: "10:52 EAT",
      location: "Anniversary Towers, 5th Floor Nairobi",
      ticketsSold: 0,
      totalTickets: 1000,
      ticketsPercentage: "0%",
      revenue: "$0",
      status: "Pending",
      statusColor: "text-gray-500",
      statusBg: "bg-gray-100"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Event List</h2>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Event..."
              className="pl-8 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-1 focus:ring-gray-200"
            />
            <svg
              className="w-4 h-4 text-gray-500 absolute left-2.5 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md flex items-center space-x-1 hover:bg-gray-200">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date And Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tickets
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr 
                key={event.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/event/${encodeURIComponent(event.title)}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{event.title}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">{event.organizer}</span>
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full">
                          {event.organizerStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {event.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{event.date}</div>
                  <div className="text-sm text-gray-500">{event.time}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{event.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{event.ticketsSold}/{event.totalTickets}</div>
                  <div className="text-sm text-gray-500">{event.ticketsPercentage}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{event.revenue}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {event.status === "LIVE" ? (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-bold text-red-500">{event.status}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">{event.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventListTable;







