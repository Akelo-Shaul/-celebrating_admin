import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import ScheduledCelebrationsTable from './scheduled_celebrations_widgets/ScheduledCelebrationsTable';

const ScheduledCelebrations = () => {
  const [celebrations, setCelebrations] = useState([]);

  // Sample data - Replace with actual API call
  useEffect(() => {
    // Simulated data matching the image
    const sampleData = [
      {
        id: 1,
        celebration: "Can't believe this is how it is supposed to be..",
        member: "Shaul Akelo",
        date: "28-02-2000",
        time: "10:00",
        platform: "Celebrating",
        status: "Scheduled"
      },
      {
        id: 2,
        celebration: "Can't believe this is how it is supposed to be..",
        member: "Hankue Hue",
        date: "28-02-2000",
        time: "10:00",
        platform: "Celebrating",
        status: "Scheduled"
      },
      {
        id: 3,
        celebration: "Can't believe this is how it is supposed to be..",
        member: "Shaul Akelo",
        date: "28-02-2000",
        time: "10:00",
        platform: "Celebrating",
        status: "Scheduled"
      },
      {
        id: 4,
        celebration: "Can't believe this is how it is supposed to be..",
        member: "Hankue Hue",
        date: "28-02-2000",
        time: "10:00",
        platform: "Celebrating",
        status: "Scheduled"
      },
      {
        id: 5,
        celebration: "Can't believe this is how it is supposed to be..",
        member: "Shaul Akelo",
        date: "28-02-2000",
        time: "10:00",
        platform: "Celebrating",
        status: "Scheduled"
      },
      {
        id: 6,
        celebration: "Can't believe this is how it is supposed to be..",
        member: "Hankue Hue",
        date: "28-02-2000",
        time: "10:00",
        platform: "Celebrating",
        status: "Scheduled"
      },
      {
        id: 7,
        celebration: "Can't believe this is how it is supposed to be..",
        member: "Shaul Akelo",
        date: "28-02-2000",
        time: "10:00",
        platform: "Celebrating",
        status: "Scheduled"
      },
      {
        id: 8,
        celebration: "Can't believe this is how it is supposed to be..",
        member: "Hankue Hue",
        date: "28-02-2000",
        time: "10:00",
        platform: "Celebrating",
        status: "Scheduled"
      }
    ];

    setCelebrations(sampleData);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Stats Card - Top Left */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Celebrations Scheduled Today"
            value="1,209"
            suffix="Celebrations"
            change="+2.54%"
            changeType="up"
            icon={Calendar}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            comparisonText="compared to yesterday"
          />
          {/* Empty columns to match the layout */}
          <div className="col-span-3"></div>
        </div>
      </div>

      {/* Scheduled Celebrations Table */}
      <ScheduledCelebrationsTable celebrations={celebrations} />
    </div>
  );
};

export default ScheduledCelebrations;

