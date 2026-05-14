import React from "react";
import {
  TrendingUp,
  FileText,
  CheckCircle,
  Layers,
  MessageSquare,
  Users,
  Globe,
} from "lucide-react";

interface StatItemProps {
  label: string;
  value: number | string;
  icon: any;
  iconBg: string;
  iconColor: string;
}

const StatItem = ({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
}: StatItemProps) => (
  <div className="flex items-center gap-4 px-3 py-6 md:p-6 bg-white group hover:bg-gray-50 transition-colors">
    <div
      className={`p-3 rounded-lg ${iconBg} ${iconColor} transition-transform group-hover:scale-110`}
    >
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">
        {label}
      </p>
      <p className="text-xl font-black text-primary leading-none">{value}</p>
    </div>
  </div>
);

interface StatsWidgetProps {
  stats: {
    totalListings: number;
    publishedListings: number;
    categories: number;
    contactSubmissions: number;
    adminUsers: number;
    locales: number;
  };
}

const StatsWidget = ({ stats }: StatsWidgetProps) => {
  return (
    <div className="bg-white rounded border border-gray-100 shadow-xs overflow-hidden">
      <div className="px-8 py-4 bg-gray-50/50 flex items-center gap-2">
        <TrendingUp size={14} className="text-gray-400" />
        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Project Statistics
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-100 border-t border-gray-100">
        <StatItem
          label="Total Listings"
          value={stats.totalListings}
          icon={FileText}
          iconBg="bg-blue-50"
          iconColor="text-blue-500"
        />
        <StatItem
          label="Published"
          value={stats.publishedListings}
          icon={CheckCircle}
          iconBg="bg-green-50"
          iconColor="text-green-500"
        />
        <StatItem
          label="Categories"
          value={stats.categories}
          icon={Layers}
          iconBg="bg-amber-50"
          iconColor="text-amber-500"
        />
        <StatItem
          label="Inquiries"
          value={stats.contactSubmissions}
          icon={MessageSquare}
          iconBg="bg-indigo-50"
          iconColor="text-indigo-500"
        />
        <StatItem
          label="Admins"
          value={stats.adminUsers}
          icon={Users}
          iconBg="bg-rose-50"
          iconColor="text-rose-500"
        />
        <StatItem
          label="Locales"
          value={stats.locales}
          icon={Globe}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-500"
        />
      </div>
    </div>
  );
};

export default StatsWidget;
