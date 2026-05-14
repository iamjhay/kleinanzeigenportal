"use client";

import React from "react";

const CategorySkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 lg:grid-cols-7 animate-pulse">
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="rounded-lg p-4 md:p-6 flex flex-col h-[120px] md:h-[160px] bg-gray-100/80 border border-gray-100"
        >
          <div className="flex-1">
            <div className="h-4 w-16 bg-gray-200 rounded-full mb-1" />
            <div className="h-3 w-10 bg-gray-200 rounded-full opacity-50" />
          </div>

          <div className="my-4 border-t border-dashed border-gray-200 w-full" />

          <div className="h-6 w-6 bg-gray-200 rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;
