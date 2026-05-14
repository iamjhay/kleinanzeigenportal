"use client";

import React from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  LogOut,
  Layers,
  FileText,
  HelpCircle,
  ShieldCheck,
  User,
} from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { signOut } from "next-auth/react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const AdminSidebar = ({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}: AdminSidebarProps) => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { name: "Leads", icon: MessageSquare, href: "/admin/leads" },
    { name: "Categories", icon: Layers, href: "/admin/categories" },
    { name: "FAQs", icon: HelpCircle, href: "/admin/faqs" },
    { name: "Pages", icon: FileText, href: "/admin/pages" },
  ];

  const configItems = [
    { name: "Profile", icon: User, href: "/admin/profile" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-100 xl:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed top-0 left-0 h-full w-72 bg-[#001226] text-white flex flex-col z-110 transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isCollapsed ? "xl:-translate-x-full" : "xl:translate-x-0"}
      `}
      >
        <div className="px-6 pt-1 pb-6">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/40 pb-4">
            Admin
          </span>
          <div className="bg-white w-full p-2 rounded text-center flex items-center gap-2">
            <span className="bg-secondary text-white w-7 h-7 flex items-center justify-center font-black font-mono rounded-lg text-sm">
              Z
            </span>
            <span className="text-primary font-bold font-mono text-sm">
              Zufriedene Verkäufe
            </span>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-6">
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/40 mb-3">
              Main Menu
            </p>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-4 px-4 py-2.5 rounded transition-all text-sm font-mono font-medium group ${
                      active
                        ? "bg-secondary text-white"
                        : "hover:bg-secondary/30 text-white/70"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 transition-colors ${
                        active
                          ? "text-white"
                          : "text-white/40 group-hover:text-white"
                      }`}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/40 mb-3">
              Configuration
            </p>
            <div className="space-y-1">
              {configItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-4 px-4 py-2.5 rounded transition-all text-sm font-mono font-medium group ${
                      active
                        ? "bg-secondary/10 text-secondary"
                        : "hover:bg-white/5 text-white/70"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 transition-colors ${
                        active
                          ? "text-secondary"
                          : "text-white/40 group-hover:text-white"
                      }`}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="p-6 border-t border-white/5 space-y-2">
          <button
            onClick={() => {
              onClose();
              signOut();
            }}
            className="flex items-center gap-4 px-4 py-3 w-full rounded hover:bg-red-500/10 text-red-400 transition-all text-sm font-bold group"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
          <p className="text-[10px] text-white/20 mt-4 px-4 uppercase font-bold tracking-widest">
            © 2026 ZUFRIEDENE VERKÄUFE
          </p>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
