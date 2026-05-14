"use client";

import { createInitialAdmin } from "@/app/actions/setup";
import { Mail, Lock, Phone, User as UserIcon } from "lucide-react";
import { useState } from "react";

export default function SetupForm() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError(null);
    const result = await createInitialAdmin(formData);
    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    } else if (result?.success) {
      window.location.href = "/login";
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-[#001226]">Full Name</label>
        <div className="relative">
          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          <input
            name="name"
            type="text"
            required
            className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-sm placeholder:text-gray-300"
            placeholder="John Doe"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-[#001226]">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          <input
            name="email"
            type="email"
            required
            className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-sm placeholder:text-gray-300"
            placeholder="admin@example.com"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-[#001226]">Phone Number</label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          <input
            name="phone"
            type="tel"
            className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-sm placeholder:text-gray-300"
            placeholder="+1 234 567 890"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-[#001226]">Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          <input
            name="password"
            type="password"
            required
            className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-sm placeholder:text-gray-300"
            placeholder="••••••••"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-lg">
          {error}
        </p>
      )}

      <button
        disabled={isPending}
        type="submit"
        className="w-full bg-[#122e1e] ring-1 ring-offset-1 ring-[#b5e941] text-white py-4 rounded-full font-bold shadow-lg shadow-primary/10 hover:bg-secondary active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
      >
        {isPending ? "Initializing..." : "Initialize System"}
      </button>
    </form>
  );
}
