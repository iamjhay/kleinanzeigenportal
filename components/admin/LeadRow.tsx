"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";
import { Mail, Clock, ChevronRight } from "lucide-react";

interface LeadRowProps {
  lead: any;
  locale: string;
}

export default function LeadRow({ lead, locale }: LeadRowProps) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/admin/leads/${lead._id}`);
  };

  return (
    <tr
      onClick={handleRowClick}
      className={`group hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 cursor-pointer ${
        !lead.isRead ? "bg-blue-50/30" : ""
      }`}
    >
      <td className="px-6 py-5 border-r border-gray-100">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-black text-white uppercase shrink-0">
              {lead.firstName.charAt(0)}
            </div>
            {!lead.isRead && (
              <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-blue-500 border-2 border-white rounded-full shadow-sm" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-primary truncate group-hover:text-secondary transition-colors">
              {lead.firstName} {lead.lastName}
            </p>
            <p className="text-xs font-mono text-gray-500 truncate">
              {lead.email}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-5 border-r border-gray-100">
        <p className="text-[13px] text-primary font-bold font-mono truncate">
          {lead.subject || "—"}
        </p>
        <p className="text-xs font-mono capitalize text-gray-500 mt-0.5 truncate">
          {lead.message.substring(0, 100)}
          {lead.message.length > 100 && "..."}
        </p>
      </td>
      <td className="px-6 py-5 text-center border-r border-gray-100">
        <StatusBadge status={lead.status} />
      </td>
      <td className="px-6 py-5 border-r border-gray-100">
        <p className="text-[13px] font-semibold font-mono text-muted">
          {new Intl.DateTimeFormat(locale, {
            month: "short",
            day: "numeric",
            year: "numeric",
          }).format(new Date(lead.createdAt))}
        </p>
      </td>
      <td className="px-4 py-5 text-right">
        <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-secondary transition-colors inline-block" />
      </td>
    </tr>
  );
}
