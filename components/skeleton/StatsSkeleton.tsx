"use client";

import React from "react";

const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded border border-gray-100 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="h-10 w-10 bg-gray-100 rounded-lg" />
            <div className="h-4 w-12 bg-gray-100 rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="h-8 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSkeleton;
