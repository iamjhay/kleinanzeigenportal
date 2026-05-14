import React from "react";
import WelcomeSkeleton from "@/components/skeleton/WelcomeSkeleton";
import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import StatsSkeleton from "@/components/skeleton/StatsSkeleton";
import LeadsSkeleton from "@/components/skeleton/LeadsSkeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <WelcomeSkeleton />
        </div>
        <div className="lg:col-span-1">
          <ProfileSkeleton />
        </div>
      </div>

      <StatsSkeleton />

      <LeadsSkeleton />
    </div>
  );
}
