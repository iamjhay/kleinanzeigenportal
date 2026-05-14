"use client";

import React, { useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  User as UserIcon,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface Page {
  _id: string;
  title_en: string;
  title_de: string;
  slug: string;
  author: string;
  status: "draft" | "published";
  updatedAt: string;
}

interface PageManagerProps {
  initialPages: Page[];
  locale: string;
}

export default function PageManager({
  initialPages,
  locale,
}: PageManagerProps) {
  const [pages, setPages] = useState(initialPages);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPages = pages.filter(
    (page) =>
      page.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.title_de.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 relative max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search pages by title or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded text-[13px] font-medium focus:ring-2 focus:ring-secondary/10 outline-none transition-all placeholder:text-gray-300"
          />
        </div>
        {/* <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded text-[11px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all">
            <Filter size={14} />
            Filters
          </button>
          <Link
            href={`/${locale}/admin/pages/new`}
            className="flex items-center gap-2 px-6 py-2.5 bg-secondary text-white rounded text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg shadow-secondary/10 active:scale-95"
          >
            <Plus size={14} />
            Create Page
          </Link>
        </div> */}
      </div>

      {/* Desktop View: Pages Table */}
      <div className="hidden lg:block bg-white rounded border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-r border-gray-100 last:border-r-0 w-1/3">
                  Page Details
                </th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-r border-gray-100 last:border-r-0">
                  Author
                </th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-r border-gray-100 last:border-r-0 text-center">
                  Status
                </th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-r border-gray-100 last:border-r-0">
                  Last Updated
                </th>
                {/* <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b last:border-r-0 text-center">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPages.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-8 py-12 text-center text-gray-400 italic text-xs"
                  >
                    No pages found matching your search.
                  </td>
                </tr>
              ) : (
                filteredPages.map((page) => (
                  <tr
                    key={page._id}
                    className="group hover:bg-gray-50/30 transition-colors"
                  >
                    <td className="px-8 py-5 border-r border-gray-50 last:border-r-0">
                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded bg-secondary/10 flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                          <FileText size={18} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-[14px] font-bold text-primary truncate group-hover:text-secondary transition-colors font-serif">
                            {page.title_en}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono text-muted bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                              /{page.slug === "/" ? "" : `${page.slug}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 border-r border-gray-50 last:border-r-0">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                          <UserIcon size={12} />
                        </div>
                        <span className="text-[11px] font-mono font-semibold text-primary uppercase tracking-tight">
                          {page.author}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 border-r border-gray-50 last:border-r-0">
                      <div className="flex justify-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-widest border ${
                            page.status === "published"
                              ? "bg-green-50 text-green-600 border-green-100"
                              : "bg-orange-50 text-orange-600 border-orange-100"
                          }`}
                        >
                          {page.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 border-r border-gray-50 last:border-r-0">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar size={13} className="text-gray-300" />
                        <span className="text-[13px] font-mono font-semibold uppercase tracking-tight">
                          {format(new Date(page.updatedAt), "MMM dd, yyyy")}
                        </span>
                      </div>
                    </td>
                    {/* <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          href={`/${locale}/admin/pages/${page._id}`}
                          className="p-2 rounded-lg text-gray-300 hover:text-secondary hover:bg-secondary/5 transition-all"
                          title="Edit Page"
                        >
                          <Edit2 size={14} />
                        </Link>
                        <button
                          className="p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                          title="Delete Page"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View: Pages List */}
      <div className="lg:hidden space-y-2">
        {filteredPages.length === 0 ? (
          <div className="bg-white rounded border border-gray-200 p-12 text-center text-gray-400 italic text-xs">
            No pages found matching your search.
          </div>
        ) : (
          filteredPages.map((page) => (
            <div
              key={page._id}
              className="bg-white rounded border border-gray-200 p-4 relative overflow-hidden group"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-secondary/10 flex items-center justify-center text-secondary">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary font-serif">
                      {page.title_en}
                    </h3>
                    <p className="text-[10px] font-mono text-muted bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 inline-block mt-1">
                      /{page.slug === "/" ? "" : `${page.slug}`}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest border shrink-0 ${
                    page.status === "published"
                      ? "bg-green-50 text-green-600 border-green-100"
                      : "bg-orange-50 text-orange-600 border-orange-100"
                  }`}
                >
                  {page.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-dashed border-gray-100">
                <div>
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Author
                  </p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                      <UserIcon size={10} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-primary uppercase">
                      {page.author}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 text-right">
                    Last Updated
                  </p>
                  <div className="flex items-center justify-end gap-1.5 text-gray-400">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-tight">
                      {format(new Date(page.updatedAt), "MMM dd, yyyy")}
                    </span>
                    <Calendar size={11} className="text-gray-300" />
                  </div>
                </div>
              </div>

              {/* <div className="flex items-center gap-2">
                <Link
                  href={`/${locale}/admin/pages/${page._id}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-secondary text-white rounded text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all active:scale-95 shadow-lg shadow-secondary/10"
                >
                  <Edit2 size={12} />
                  Edit Page
                </Link>
                <button className="px-3 py-2.5 bg-red-50 text-red-500 rounded border border-red-100 hover:bg-red-500 hover:text-white transition-all active:scale-95">
                  <Trash2 size={14} />
                </button>
              </div> */}
            </div>
          ))
        )}
      </div>

      {/* Footer Stats - Keeping it simplified like other lists */}
      <div className="flex items-center justify-between px-8 py-4 bg-white rounded border border-gray-200">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
          Current Catalog:{" "}
          <span className="text-primary">{pages.length} Pages</span>
        </p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              {pages.filter((p) => p.status === "published").length} Active
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.4)]" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              {pages.filter((p) => p.status === "draft").length} Drafts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
