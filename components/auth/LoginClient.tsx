"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/actions/auth";
import { Mail, Lock } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function LoginClient({ locale }: { locale: string }) {
  const [errorMessage, dispatch, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] p-6">
      {/* Logo */}
      <div className="mb-6">
        <a
          href="/"
          className="text-[#002147] text-base sm:text-lg font-extrabold font-mono"
        >
          Zufriedene Verkäufe
        </a>
      </div>
      <div className="w-full max-w-[480px] md:bg-white rounded-2xl md:border border-gray-200 p-4 md:p-10">
        {/* Logo & Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-1">
            <h3 className="text-[#002147] font-black text-2xl font-mono">
              Login to Account
            </h3>
            <p className="text-gray-400 text-base mt-1 px-2">
              Sign in to your Zufriedene Verkäufe Management Portal
            </p>
          </div>
        </div>

        <form action={dispatch} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#001226]">
              Your Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input
                name="email"
                type="email"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-sm placeholder:text-gray-300"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[#001226]">
                Password
              </label>
              <Link
                href="#"
                className="text-xs font-bold text-secondary hover:underline"
              >
                Forgot?
              </Link>
            </div>
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

          {/* Remember Me */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-gray-200 text-secondary focus:ring-secondary"
            />
            <label
              htmlFor="remember"
              className="text-sm text-gray-500 font-medium cursor-pointer"
            >
              Keep me signed in
            </label>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-lg">
              {errorMessage}
            </p>
          )}

          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-[#122e1e] ring-1 ring-offset-1 ring-[#b5e941] text-white py-4 rounded-full font-bold shadow-lg shadow-primary/10 hover:bg-secondary active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        {/* <div className="pt-8 border-t border-gray-50 text-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/setup"
              className="text-secondary font-bold hover:underline"
            >
              Register
            </Link>
          </p>
        </div> */}
      </div>

      <p className="mt-8 text-[11px] font-bold text-gray-300 uppercase tracking-widest">
        © {new Date().getFullYear()} ZUFRIEDENE VERKÄUFE
      </p>
    </div>
  );
}
