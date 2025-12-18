import React, { useState, useEffect } from 'react';
import { FileText, TrendingUp, Award, Users } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import EngagementStats from './all_celebrations_widgets/EngagementStats';
import CelebrationsDistribution from './all_celebrations_widgets/CelebrationsDistribution';
import CelebrationsTable from './all_celebrations_widgets/CelebrationsTable';

const AllCelebrations = () => {
  const [celebrations, setCelebrations] = useState([]);

  // Sample data - Replace with actual API call
  useEffect(() => {
    // Simulated data matching the image exactly
    const sampleData = [
      {
        image: null,
        caption: "Can't believe this is how it is supposed to be ..",
        mediaType: "Audio",
        taggedCount: 10,
        categories: ["Music", "Art"],
        datePosted: "28-02-2000",
        comments: "32,000",
        recelebrations: "300",
        shares: "300"
      },
      {
        image: "https://example.com/sample1.jpg",
        caption: "Can't believe this is how it is supposed to be ..",
        mediaType: "Flick / Image",
        taggedCount: 10,
        categories: ["Music", "Art"],
        datePosted: "28-02-2000",
        comments: "32,000",
        recelebrations: "300",
        shares: "300"
      },
      {
        image: "https://example.com/sample2.jpg",
        caption: "Can't believe this is how it is supposed to be ..",
        mediaType: "Image",
        taggedCount: 10,
        categories: ["Music", "Art"],
        datePosted: "28-02-2000",
        comments: "32,000",
        recelebrations: "300",
        shares: "300"
      },
      {
        image: "https://example.com/sample3.jpg",
        caption: "Can't believe this is how it is supposed to be ..",
        mediaType: "Image",
        taggedCount: 10,
        categories: ["Music", "Art"],
        datePosted: "28-02-2000",
        comments: "32,000",
        recelebrations: "300",
        shares: "300"
      },
      {
        image: "https://example.com/sample4.jpg",
        caption: "Can't believe this is how it is supposed to be ..",
        mediaType: "Flick",
        taggedCount: 10,
        categories: ["Music", "Art"],
        datePosted: "28-02-2000",
        comments: "32,000",
        recelebrations: "300",
        shares: "300"
      }
    ];

    setCelebrations(sampleData);
  }, []);

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      {/* Top Row: Stats and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Left Side: 2x2 Grid of Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            title="All Celebrations"
            value="1,295,209"
            change="+2.54%"
            changeType="up"
            icon={FileText}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            comparisonText="compared to last year"
          />
          
          <StatCard
            title="Celebrations Today"
            value="1,209"
            change="+2.54%"
            changeType="up"
            icon={TrendingUp}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            comparisonText="compared to yesterday"
          />
          
          <StatCard
            title="Celebrity Celebrations"
            value="1,295,209"
            change="+2.54%"
            changeType="up"
            icon={Award}
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
            comparisonText="compared to last year"
          />
          
          <StatCard
            title="Member Celebrations"
            value="1,209"
            change="+2.54%"
            changeType="up"
            icon={Users}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            comparisonText="compared to yesterday"
          />
        </div>
        
        {/* Right Side: Celebrations Distribution Map */}
        <div className="h-full">
          <CelebrationsDistribution />
        </div>
      </div>

      {/* Engagement Stats - Full Width Below */}
      <div className="mb-4">
        <EngagementStats />
      </div>

      {/* Celebrations Table */}
      <CelebrationsTable celebrations={celebrations} />
    </div>
  );
};

export default AllCelebrations;