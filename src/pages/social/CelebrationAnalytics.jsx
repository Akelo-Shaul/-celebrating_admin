import React from 'react';
import CelebrationsGrowth from './celebration_analysis_widgets/CelebrationsGrowth';
import CelebrationsMediaDistribution from './celebration_analysis_widgets/CelebrationsMediaDistribution';

const CelebrationAnalytics = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Celebration Analytics</h1>
        <p className="text-gray-600 mt-1">Analytics and insights for celebration data</p>
      </div>

      {/* Charts Grid - Stacks on mobile, 2 columns on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Chart - Celebrations Growth */}
        <div>
          <CelebrationsGrowth />
        </div>

        {/* Right Chart - Celebrations Media Distribution */}
        <div>
          <CelebrationsMediaDistribution />
        </div>
      </div>
    </div>
  );
};

export default CelebrationAnalytics;










