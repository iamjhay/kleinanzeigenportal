"use client";

import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  User as UserIcon,
  ChevronDown,
  SquareArrowOutUpRight,
} from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  user: {
    name?: string | null;
    role?: string | null;
  };
}

export default function AdminLayoutClient({
  children,
  user,
}: AdminLayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300 ${isSidebarCollapsed ? "xl:ml-0" : "xl:ml-72"}`}
      >
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-10 sticky top-0 z-20 w-full">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Hamburger Toggle */}
            <button
              onClick={() => {
                // On mobile/tablet (up to xl), open the drawer. On desktop (xl+), toggle collapse.
                if (window.innerWidth < 1280) {
                  setIsSidebarOpen(true);
                } else {
                  setIsSidebarCollapsed(!isSidebarCollapsed);
                }
              }}
              className="p-2 -ml-2 text-primary hover:bg-gray-100 rounded-lg transition-colors"
              title={isSidebarCollapsed ? "Show Sidebar" : "Hide Sidebar"}
            >
              <Menu size={24} />
            </button>
            <a
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-xs font-bold font-mono bg-green-800 text-green-200 hover:text-green-50 hover:bg-green-700 w-full transition-colors cursor-pointer"
            >
              View Website
              <SquareArrowOutUpRight size={16} />
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 relative">
            <div className="text-right hidden sm:block">
              <p className="text-[13px] font-black text-primary leading-tight">
                {user.name}
              </p>
              <p className="text-[9px] font-black text-muted uppercase tracking-widest mt-0.5">
                {user.role}
              </p>
            </div>

            {/* User Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 group p-0.5 rounded-full hover:bg-gray-50 transition-all active:scale-95"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center text-white font-black text-sm shadow-sm ring-2 ring-white group-hover:ring-secondary/20 transition-all uppercase">
                  {user.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                    : "A"}
                </div>
                <ChevronDown
                  size={14}
                  className={`text-muted transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-sm shadow-md border border-gray-100 py-2 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-200 mb-1">
                      <p className="text-sm font-bold text-primary truncate">
                        {user.name}
                      </p>
                      <span className="text-[10px] font-medium font-mono text-muted uppercase tracking-wider">
                        {user.role}
                      </span>
                    </div>

                    <Link
                      href="/admin/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm font-bold font-mono text-primary hover:bg-secondary/5 hover:text-secondary transition-colors"
                    >
                      <UserIcon size={16} />
                      Profile
                    </Link>

                    <Link
                      href="/admin/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm font-bold font-mono text-primary hover:bg-secondary/5 hover:text-secondary transition-colors"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>

                    <div className="h-px bg-gray-50 my-0.5" />

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        signOut();
                      }}
                      className="flex items-center gap-3 px-4 py-2 text-sm font-bold font-mono text-red-500 hover:bg-red-50 w-full transition-colors cursor-pointer"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 sm:p-10 md:pt-5 flex-1 w-full min-w-0">
          <div className="max-w-[1600px] mx-auto w-full min-w-0">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
