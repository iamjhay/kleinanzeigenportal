"use client";

import { useState } from "react";
import { Search, Filter, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import StatusBadge from "@/components/admin/StatusBadge";
import LeadRow from "@/components/admin/LeadRow";

interface LeadsListProps {
  leads: any[];
  locale: string;
}

export default function LeadsList({ leads, locale }: LeadsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      `${lead.firstName} ${lead.lastName} ${lead.email} ${lead.subject} ${lead.message}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;
    const matchesSubject =
      subjectFilter === "all" || lead.subject === subjectFilter;

    return matchesSearch && matchesStatus && matchesSubject;
  });

  const subjects = Array.from(
    new Set(leads.map((l) => l.subject).filter(Boolean)),
  );

  return (
    <div className="space-y-6">
      {/* Filters & Search */}
      <div className="bg-white p-5 rounded border border-gray-200 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:max-w-md relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search by name, email, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-50 border border-gray-200 text-sm focus:ring-2 focus:ring-secondary/20 outline-none transition-all font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-full border border-gray-200 text-xs font-bold text-primary bg-white outline-none focus:ring-2 focus:ring-secondary/20 appearance-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="engaged">Engaged</option>
              <option value="success">Success</option>
              <option value="closed">Closed</option>
            </select>

            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-full border border-gray-200 text-xs font-bold text-primary bg-white outline-none focus:ring-2 focus:ring-secondary/20 appearance-none cursor-pointer"
            >
              <option value="all">All Subjects</option>
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>

            {(searchTerm ||
              statusFilter !== "all" ||
              subjectFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setSubjectFilter("all");
                }}
                className="text-[10px] font-black text-secondary uppercase tracking-widest hover:underline ml-2"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between px-2">
        <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">
          Showing {filteredLeads.length} of {leads.length} inquiries
        </p>
      </div>

      {/* Mobile View: Joined List */}
      <div className="md:hidden bg-white rounded border border-gray-100 overflow-hidden divide-y divide-gray-100 shadow-sm">
        {filteredLeads.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-300" size={24} />
            </div>
            <p className="text-gray-400 font-medium italic text-sm">
              No inquiries match your search.
            </p>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <Link
              key={lead._id}
              href={`/admin/leads/${lead._id}`}
              className={`block p-5 active:bg-gray-50 transition-colors cursor-pointer ${
                !lead.isRead ? "bg-blue-50/10" : ""
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
                <div className="text-right">
                  <StatusBadge status={lead.status} />
                  <p className="text-[10px] font-bold text-muted uppercase tracking-wider mt-2">
                    {new Intl.DateTimeFormat(locale, {
                      month: "short",
                      day: "numeric",
                    }).format(new Date(lead.createdAt))}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-black text-secondary uppercase tracking-widest leading-none">
                  {lead.subject || "No Subject"}
                </p>
                <p className="text-[13px] text-primary font-medium line-clamp-2">
                  {lead.message}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Leads Table - Desktop View */}
      <div className="hidden md:block bg-white rounded border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/70">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-r border-gray-100 w-[22%]">
                  Sender
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-r border-gray-100 w-[44%]">
                  Subject / Preview
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-r border-gray-100 text-center w-[12%]">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-r border-gray-100 w-[16%]">
                  Date
                </th>
                <th className="px-4 py-4 border-b border-gray-100 w-[6%]"></th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="text-gray-300" size={24} />
                    </div>
                    <p className="text-gray-400 font-medium italic text-sm">
                      No inquiries found matching "{searchTerm}"
                    </p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <LeadRow key={lead._id} lead={lead} locale={locale} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
