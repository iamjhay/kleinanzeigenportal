"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Globe } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
  ];

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "de" : "en";
    router.replace(pathname, { locale: nextLocale, scroll: false });
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
              className={`text-2xl md:text-3xl font-extrabold tracking-tighter font-serif transition-colors ${
                scrolled || !isHome ? "text-primary" : "text-white"
              }`}
            >
              <span translate="no">Zufriedene Verkäufe</span>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-8 lg:gap-10">
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

            <div className="hidden md:flex items-center gap-5">
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
                  className={`rounded-full px-8 py-3 text-sm font-bold shadow-xl transition-all active:scale-95 ${
                    scrolled || !isHome
                      ? "bg-primary text-white hover:opacity-90"
                      : "bg-white text-primary hover:bg-gray-100"
                  }`}
                >
                  {t("contactUs")}
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`flex h-10 w-10 items-center justify-center rounded-lg lg:hidden transition-colors ${
                scrolled || !isHome ? "text-primary" : "text-white"
              }`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
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
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-border/50 text-sm font-bold text-primary transition-all hover:bg-primary/5 active:scale-95"
            >
              <Globe size={18} />
              {locale === "en" ? "Switch to German" : "Auf Englisch umstellen"}
            </button>
            <Link href="/contact" className="w-full">
              <button className="w-full rounded-xl bg-primary py-4 text-base font-bold text-white shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98]">
                {t("contactUs")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
