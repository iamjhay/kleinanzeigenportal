"use client";

import React, { useState } from "react";
import { User, Lock, Save, Mail, Shield } from "lucide-react";
import { updateProfile } from "@/app/actions/user";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

interface ProfileManagerProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

export default function ProfileManager({ user }: ProfileManagerProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        addToast(
          "success",
          "Profile Updated",
          "Your personal details have been saved.",
        );
        router.refresh();
      } else {
        addToast(
          "error",
          "Update Failed",
          result.error || "Failed to update profile.",
        );
      }
    } catch (error) {
      addToast("error", "Error", "An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-black uppercase tracking-tight font-serif">
          Personal Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1 font-medium">
          Manage your administrative profile and security credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-200 rounded p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-white text-2xl font-black border-4 border-gray-50 shadow-sm mb-4 uppercase">
              {user.name
                ? user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                : "A"}
            </div>
            <h3 className="font-bold text-primary">{user.name}</h3>
            <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mt-1">
              {user.role}
            </span>
            <div className="mt-6 w-full pt-6 border-t border-gray-50 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-gray-400 uppercase">Status</span>
                <span className="text-green-600 font-bold uppercase">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-gray-400 uppercase">Account</span>
                <span className="text-primary font-bold uppercase">Admin</span>
              </div>
            </div>
          </div>

          <div className="bg-[#001226] rounded p-6 text-white overflow-hidden relative group">
            <Shield className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-black uppercase tracking-widest mb-2 relative z-10">
              Security Tip
            </h4>
            <p className="text-xs text-white/60 leading-relaxed relative z-10">
              Use a strong, unique password to protect your administrative
              access. We recommend at least 12 characters.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-2 w-full">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded overflow-hidden"
          >
            <div className="p-8 space-y-8">
              {/* General Info */}
              <div className="space-y-6">
                <h3 className="text-xs font-black text-primary uppercase tracking-widest border-l-4 border-secondary pl-4">
                  Profile Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold font-mono text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                      <User size={12} className="text-secondary" />
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      defaultValue={user.name || ""}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold font-mono text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                      <Mail size={12} className="text-secondary" />
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      defaultValue={user.email || ""}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="space-y-6 pt-8 border-t border-dashed border-gray-200">
                <h3 className="text-xs font-black text-primary uppercase tracking-widest border-l-4 border-amber-400 pl-4">
                  Update Password
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold font-mono text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                      <Lock size={12} className="text-amber-500" />
                      New Password
                    </label>
                    <input
                      name="newPassword"
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold font-mono text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                      <Lock size={12} className="text-amber-500" />
                      Confirm Password
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center justify-center gap-3 px-10 py-3 bg-primary text-white rounded text-[11px] font-bold font-mono uppercase tracking-widest hover:bg-secondary transition-all shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
