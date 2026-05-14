"use client";

import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="bg-white rounded border border-gray-100 shadow-xs p-8 h-full flex flex-col animate-pulse">
      <div className="h-7 w-24 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-64 bg-gray-100 rounded mb-6" />

      <div className="flex-1 space-y-6">
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-gray-100" />
          <div className="flex flex-col items-center gap-2">
            <div className="h-6 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-48 bg-gray-100 rounded" />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-50">
          <div className="flex items-center justify-between">
            <div className="h-4 w-20 bg-gray-100 rounded" />
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 bg-gray-100 rounded" />
            <div className="h-6 w-32 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
