"use client";

import React from "react";

const LeadsSkeleton = () => {
  return (
    <div className="bg-white rounded border border-gray-100 shadow-xs animate-pulse">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-10 w-24 bg-gray-100 rounded-full" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50">
              {[...Array(5)].map((_, i) => (
                <th key={i} className="px-6 py-4">
                  <div className="h-4 w-20 bg-gray-200 rounded mx-auto lg:mx-0" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                {[...Array(5)].map((_, j) => (
                  <td key={j} className="px-6 py-4">
                    <div className="h-4 w-24 bg-gray-100 rounded" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsSkeleton;
