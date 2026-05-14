"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Settings,
  MessageSquare,
  Layers,
  HelpCircle,
  Mail,
} from "lucide-react";
import Link from "next/link";

const WelcomeWidget = ({
  userName,
  locale,
}: {
  userName: string;
  locale: string;
}) => {
  const [greeting, setGreeting] = useState("Welcome");
  const firstName = userName.split(" ")[0];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <div className="md:bg-white bg-transparent rounded md:border border-gray-100 md:shadow-xs md:p-8 py-2 h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-secondary font-serif relative inline-block">
              {greeting}, <span className="text-primary">{firstName}!</span>
              <div className="absolute -bottom-1 left-0 w-20 h-1 bg-secondary rounded-full"></div>
            </h2>
            <div className=" mt-4">
              <span className="text-gray-400 text-sm font-mono max-w-lg leading-7">
                Welcome back! You’re logged in as an administrator. Explore the
                powerful tools available in your portal by managing your{" "}
                <span className="font-semibold text-primary">Categories</span>{" "}
                or reviewing your{" "}
                <span className="font-semibold text-primary">Leads</span> using
                the quick actions below.
              </span>
            </div>
          </div>
          <span className="text-4xl animate-bounce">👋</span>
        </div>

        {/* <Link href="/admin/categories">
          <button className="bg-[#002147] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-3 hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/10">
            <ArrowRight size={16} />
            MANAGE CATEGORIES
          </button>
        </Link> */}
      </div>

      <div className="my-4 border-t border-dashed border-[#1d4b00]/10 w-full" />
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Link
          href={`/${locale}/admin/leads`}
          className="p-4 rounded border flex items-center gap-4 group cursor-pointer transition-all duration-500 hover:shadow-xs bg-[#eafdc5]/20 hover:ring-1 hover:border border-secondary/30 ring-offset-1 hover:ring-secondary"
        >
          <div className="p-2.5 bg-secondary rounded-full">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[15px] font-mono font-semibold text-[#1d4b00]">
              Recent Entries
            </p>
            <p className="text-[11px] font-mono text-black font-medium">
              View recent form submissions
            </p>
          </div>
        </Link>

        <Link
          href={`/${locale}/admin/categories`}
          className="p-4 rounded border flex items-center gap-4 group cursor-pointer transition-all duration-500 hover:shadow-xs bg-[#e9eff0]/40 hover:ring-1 hover:border border-stone-600/30 ring-offset-1 hover:ring-stone-600"
        >
          <div className="p-2.5 bg-stone-600 rounded-full">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[15px] font-mono font-semibold text-stone-600">
              Manage Categories
            </p>
            <p className="text-[11px] font-mono text-black font-medium">
              Add or update your categories
            </p>
          </div>
        </Link>

        <Link
          href={`/${locale}/admin/faqs`}
          className="p-4 rounded border hidden md:flex items-center gap-4 group cursor-pointer transition-all duration-500 hover:shadow-xs bg-[#dad9f9]/40 hover:bg-[#dad9f9]/60 hover:ring-1 hover:border border-[#dad9f9] ring-offset-1 hover:ring-indigo-600"
        >
          <div className="p-2.5 bg-indigo-600 rounded-full">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[15px] font-mono font-semibold text-indigo-600">
              Support & Help
            </p>
            <p className="text-[11px] font-mono text-black font-medium">
              Contact us for assistance
            </p>
          </div>
        </Link>

        <Link
          href={`/${locale}/admin/settings`}
          className="p-4 rounded border hidden md:flex items-center gap-4 group cursor-pointer transition-all duration-500 hover:shadow-xs bg-amber-200/20 hover:bg-amber-200/30 hover:ring-1 hover:border border-amber-200 ring-offset-1 hover:ring-amber-400"
        >
          <div className="p-2.5 bg-amber-600 rounded-full">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[15px] font-mono font-semibold text-amber-800">
              Settings
            </p>
            <p className="text-[11px] font-mono text-black font-medium">
              Admin panel settings
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeWidget;
