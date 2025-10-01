import React from 'react';

const HighlightSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* 3 Skeleton Cards */}
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
        >
          {/* Image Placeholder */}
          <div className="h-48 bg-gray-700"></div>
          
          <div className="p-6">
            {/* Title Placeholder */}
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
            
            {/* Provider/Category Placeholder */}
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
            
            {/* Description Placeholder */}
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gray-700 rounded w-full"></div>
              <div className="h-3 bg-gray-700 rounded w-5/6"></div>
            </div>
            
            {/* Details Placeholder */}
            <div className="flex items-center justify-between text-sm mb-4">
              <div className="h-4 bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            </div>
            
            {/* Button Placeholder */}
            <div className="w-full h-10 bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HighlightSkeleton;