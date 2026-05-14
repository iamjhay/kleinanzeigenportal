"use client";

import { MessageSquare, Calendar, User, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";

interface Lead {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject?: string;
  message: string;
  status: string;
  isRead: boolean;
  createdAt: string | Date;
}

const RecentLeads = ({ leads }: { leads: Lead[] }) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded border border-gray-100 shadow-xs overflow-hidden max-w-full">
      <div className="px-4 md:px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/5 rounded-lg">
            <MessageSquare size={18} className="text-primary" />
          </div>
          <h2 className="text-base font-black text-primary font-mono">
            Recent Inquiries
          </h2>
        </div>
        <Link
          href="/admin/leads"
          className="text-xs font-bold text-secondary flex items-center gap-1 hover:gap-2 transition-all"
        >
          View All <ChevronRight size={14} />
        </Link>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        {/* Mobile View: Stacked Cards */}
        <div className="lg:hidden divide-y divide-gray-100">
          {leads.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-400 italic text-sm">
              No inquiries found yet.
            </div>
          ) : (
            leads.map((lead) => (
              <div
                key={lead._id}
                onClick={() => router.push(`/admin/leads/${lead._id}`)}
                className={`p-6 active:bg-gray-50 transition-colors cursor-pointer ${
                  !lead.isRead ? "bg-blue-50/20" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-black text-white uppercase shrink-0">
                        {lead.firstName.charAt(0)}
                      </div>
                      {!lead.isRead && (
                        <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-blue-500 border-2 border-white rounded-full shadow-sm" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-black text-primary leading-none mb-1">
                        {lead.firstName} {lead.lastName}
                      </p>
                      <p className="text-[11px] text-gray-400 font-bold">
                        {lead.email}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-muted uppercase tracking-wider">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                    }).format(new Date(lead.createdAt))}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-black text-secondary uppercase tracking-widest leading-none">
                    {lead.subject || "No Subject"}
                  </p>
                  <p className="text-[13px] text-primary font-medium line-clamp-2">
                    {lead.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Traditional Table */}
        <table className="hidden lg:table w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-r border-gray-100 last:border-r-0 w-1/4">
                Sender
              </th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-r border-gray-100 last:border-r-0">
                Subject
              </th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-r border-gray-100 last:border-r-0  w-1/3">
                Message
              </th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-r border-gray-100 last:border-r-0">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-8 py-12 text-center text-gray-400 italic text-sm"
                >
                  No inquiries found yet.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr
                  key={lead._id}
                  onClick={() => router.push(`/admin/leads/${lead._id}`)}
                  className={`group hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 cursor-pointer ${
                    !lead.isRead ? "bg-blue-50/30" : ""
                  }`}
                >
                  <td className="px-8 py-5 border-r border-gray-100 last:border-r-0">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-black text-white uppercase shrink-0">
                          {lead.firstName.charAt(0)}
                        </div>
                        {!lead.isRead && (
                          <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-blue-500 border-2 border-white rounded-full shadow-sm" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary leading-none mb-1">
                          {lead.firstName} {lead.lastName}
                        </p>
                        <p className="text-[11px] text-gray-400 font-medium">
                          {lead.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 border-r border-gray-100 last:border-r-0">
                    <p className="text-[13px] text-primary font-bold truncate">
                      {lead.subject || "No Subject"}
                    </p>
                  </td>
                  <td className="px-8 py-5 border-r border-gray-100 last:border-r-0">
                    <p className="text-[13px] text-primary font-medium truncate">
                      {lead.message.slice(0, 100) || "No Message"}
                    </p>
                  </td>
                  <td className="px-8 py-5 border-r border-gray-100 last:border-r-0">
                    <p className="text-sm text-gray-400 font-medium">
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(lead.createdAt))}
                    </p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentLeads;
