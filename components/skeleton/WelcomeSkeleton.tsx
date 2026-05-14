"use client";

import React from "react";

const WelcomeSkeleton = () => {
  return (
    <div className="md:bg-white bg-transparent rounded md:border border-gray-100 md:shadow-xs md:p-8 py-2 h-full flex flex-col justify-between animate-pulse">
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-4">
            <div className="h-8 w-64 bg-gray-200 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-[400px] bg-gray-100 rounded" />
              <div className="h-4 w-[350px] bg-gray-100 rounded" />
            </div>
          </div>
          <div className="h-12 w-12 bg-gray-200 rounded-full" />
        </div>
      </div>

      <div className="my-4 border-t border-dashed border-gray-100 w-full" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-4 rounded border flex items-center gap-4 bg-gray-50/50 border-gray-100"
          >
            <div className="h-11 w-11 bg-gray-200 rounded-full shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-32 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeSkeleton;
