"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  Globe,
  LayoutDashboard,
  LogOut,
  User,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useSettings } from "@/components/providers/SettingsProvider";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const settings = useSettings();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const categories = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("terms"), href: "/legals" },
    { name: t("faqs"), href: "/faqs" },
  ];

  const navLinks = [
    // { name: t("legalPolicies"), href: "/legals" }
  ];

  const mobileNavLinks = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("faqs"), href: "/faqs" },
    { name: t("legalPolicies"), href: "/legals" },
    { name: t("contact"), href: "/contact" },
  ];

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "de" : "en";
    router.replace(pathname, { locale: nextLocale, scroll: false });
  };

  const switchLocale = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale, scroll: false });
    setIsMobileLangOpen(false);
  };

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full">
        {/* Navbar Background Layer - Handles blur and color transitions independently */}
        <div
          className={`absolute inset-0 transition-all duration-500 -z-10 ${
            isMobileMenuOpen
              ? "bg-white opacity-0" // Hide during mobile menu to prevent blur interference
              : scrolled
                ? "bg-white/80 backdrop-blur-xl border-b border-border/50 shadow-sm py-0"
                : isHome
                  ? "bg-transparent border-none"
                  : "bg-white border-b border-border/50"
          }`}
        />

        <div
          className={`mx-auto flex max-w-7xl items-center justify-between p-4 sm:px-8 lg:px-12 transition-all duration-500 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Left: Categories (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-10">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className={`text-[13px] font-bold relative tracking-tight transition-colors ${
                  scrolled || !isHome
                    ? "text-muted hover:text-primary"
                    : "text-white/80 hover:text-white"
                } ${isActive(cat.href) && "text-secondary hover:text-secondary"}`}
              >
                {/* Lets add an absolute bar below */}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300 ${
                    isActive(cat.href)
                      ? "bg-secondary w-full"
                      : "bg-transparent w-0"
                  }`}
                />
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Center: Logo */}
          <div className="text-center">
            <Link
              href="/"
              className={`flex items-center justify-center transition-all duration-500`}
            >
              {settings.logo && settings.showLogo ? (
                <div
                  className={`relative ${scrolled ? "h-10 w-32" : "md:h-20 md:w-20 h-16 w-16"} transition-all duration-500`}
                >
                  <Image
                    src={settings.logo}
                    alt={settings.siteName}
                    fill
                    className={`object-contain transition-all duration-500 ${!scrolled && isHome ? "" : ""}`}
                    priority
                  />
                </div>
              ) : (
                <span
                  className={`text-2xl md:text-3xl font-extrabold tracking-tighter font-serif transition-colors ${
                    scrolled || !isHome ? "text-primary" : "text-white"
                  }`}
                  translate="no"
                >
                  {settings.siteName}
                </span>
              )}
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-8 lg:gap-20">
            <div className="hidden lg:flex items-center gap-10">
              {/* {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[13px] font-bold relative tracking-tight transition-colors ${
                    scrolled || !isHome
                      ? "text-muted hover:text-primary"
                      : "text-white/80 hover:text-white"
                  } ${isActive(link.href) && "text-secondary hover:text-secondary"}`}
                >
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300 ${
                      isActive(link.href)
                        ? "bg-secondary w-full"
                        : "bg-transparent w-0"
                    }`}
                  />
                  {link.name}
                </Link>
              ))} */}
            </div>

            <div className="hidden md:flex items-center gap-4">
              {/* Language Switcher */}
              <div className="relative group">
                <button
                  onClick={toggleLanguage}
                  className={`flex items-center gap-4 text-[12px] font-black uppercase tracking-widest transition-all px-5 py-3 rounded-full border ${
                    scrolled || !isHome
                      ? "text-primary border-primary/20 hover:bg-primary/5"
                      : "text-white border-white/20 hover:bg-white/10"
                  }`}
                >
                  <Globe size={14} />
                  {locale === "en" ? "DE" : "EN"}
                </button>
                {/* Custom Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-4 py-2 bg-[#001226] text-[#b5e941] text-[10px] font-black uppercase tracking-[0.2em] rounded-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none shadow-2xl whitespace-nowrap z-[110] border border-[#b5e941]/20">
                  {locale === "en" ? "Change to German" : "Change to English"}
                  {/* Tooltip Arrow */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#001226] rotate-45 border-t border-l border-[#b5e941]/20" />
                </div>
              </div>

              <Link href="/contact">
                <button
                  className={`rounded-full px-8 py-3 text-sm font-bold shadow-xl transition-all active:scale-95 cursor-pointer ${
                    scrolled || !isHome
                      ? "bg-primary text-white hover:opacity-90"
                      : "bg-white text-primary hover:bg-gray-100"
                  }`}
                >
                  {t("contactUs")}
                </button>
              </Link>

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 group p-0.5 rounded-full hover:bg-gray-50/10 transition-all active:scale-95"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-black text-sm shadow-xl ring-2 ring-white/10 group-hover:ring-secondary/40 transition-all uppercase">
                      {session?.user?.name
                        ? session.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                        : "A"}
                    </div>
                  </button>

                  {isUserMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-2xl border border-gray-100 py-2 z-110 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                        <div className="px-5 py-2 border-b border-gray-100 mb-2">
                          <p className="text-sm font-black text-primary truncate -mb-1">
                            {session?.user?.name}
                          </p>
                          <span className="text-[10px] font-mono font-medium text-gray-500 lowercase tracking-widest truncate">
                            {session?.user?.email}
                          </span>
                        </div>

                        <Link
                          href="/admin/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-5 py-3 text-[13px] font-bold cursor-pointer font-mono text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                        >
                          <User size={18} className="text-gray-400" />
                          Profile Settings
                        </Link>

                        <Link
                          href="/admin/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-5 py-3 text-[13px] font-bold cursor-pointer font-mono text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                        >
                          <LayoutDashboard
                            size={18}
                            className="text-gray-400"
                          />
                          Admin Dashboard
                        </Link>

                        <div className="h-px bg-gray-100 my-1" />

                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            signOut();
                          }}
                          className="flex items-center gap-3 px-5 py-3 text-[13px] font-bold font-mono text-red-500 hover:bg-red-50 w-full transition-colors cursor-pointer text-left"
                        >
                          <LogOut size={18} />
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`text-[13px] font-bold relative tracking-tight text-white/85 hover:text-white hover:border-b-2 cursor-pointer! 
                    ${scrolled && "text-gray-700!"} ${!isHome && "text-gray-500!"}`}
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Actions: Language + Menu */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Language Switcher */}
              <div className="relative">
                <button
                  className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                    scrolled || !isHome ? "text-primary" : "text-white"
                  }`}
                  onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                >
                  <Globe size={24} />
                </button>

                {/* Language Dropdown */}
                {isMobileLangOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-100"
                      onClick={() => setIsMobileLangOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-2xl border border-border/10 overflow-hidden z-110 flex flex-col p-2">
                      <button
                        onClick={() => switchLocale("en")}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-bold transition-all active:scale-95 ${
                          locale === "en"
                            ? "bg-primary/10 text-primary"
                            : "text-muted hover:bg-primary/5 hover:text-primary"
                        }`}
                      >
                        <span className="text-xl leading-none">🇺🇸</span>
                        <span>English</span>
                      </button>
                      <button
                        onClick={() => switchLocale("de")}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-bold transition-all active:scale-95 ${
                          locale === "de"
                            ? "bg-primary/10 text-primary"
                            : "text-muted hover:bg-primary/5 hover:text-primary"
                        }`}
                      >
                        <span className="text-xl leading-none">🇩🇪</span>
                        <span>Deutsch</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                  scrolled || !isHome ? "text-primary" : "text-white"
                }`}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Moved outside of the nav background logic for a glitch-free experience */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-in-out flex flex-col z-[110] ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-6 mb-4 border-b border-border/10">
            <span className="text-2xl font-bold font-serif text-primary">
              Menu
            </span>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg text-primary hover:bg-primary/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
          </div>

          <div className="flex flex-col gap-2 px-6">
            {mobileNavLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-5 border-b border-border/30 text-sm font-medium transition-all ${
                    active
                      ? "text-primary font-semibold"
                      : "text-muted hover:text-primary"
                  }`}
                >
                  {link.name}
                  <ChevronRight
                    size={20}
                    className={active ? "text-primary/50" : "text-muted/30"}
                  />
                </Link>
              );
            })}
          </div>

          <div className="mt-auto flex flex-col gap-4 p-6">
            <button
              onClick={toggleLanguage}
              title={locale === "en" ? "Change to German" : "Change to English"}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border/50 text-sm font-mono text-primary transition-all hover:bg-primary/5 active:scale-95"
            >
              <Globe size={18} />
              {locale === "en" ? "Switch to German" : "Auf Englisch umstellen"}
            </button>
            {isLoggedIn ? (
              <Link
                href="/admin/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full"
              >
                <button className="w-full flex items-center justify-between gap-3 px-6 py-4 rounded-xl bg-[#001226] text-white shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-black text-xs uppercase border-2 border-white/10">
                      {session?.user?.name
                        ? session.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                        : "A"}
                    </div>
                    <div className="text-left flex flex-col">
                      <span className="text-[10px] font-medium font-mono text-white/50 leading-none mb-1">
                        Admin Area
                      </span>
                      <span className="text-sm font-semibold font-mono">
                        My Dashboard
                      </span>
                    </div>
                  </div>
                </button>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full"
              >
                <button className="w-full rounded-xl bg-primary py-3 text-sm font-mono text-white shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98]">
                  {t("login")}
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
