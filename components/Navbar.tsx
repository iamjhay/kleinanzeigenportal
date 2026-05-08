"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X, ChevronRight, Star } from "lucide-react";

// Nav links for desktop view
const navLinks = [
  { name: "FAQs", href: "/faqs" },
  { name: "Legal Policies", href: "/legals" },
];

// Category links for desktop view
const categories = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Terms", href: "/legals" },
];

// Original nav links for mobile view
const mobileNavLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "FAQs", href: "/faqs" },
  { name: "Legal Policies", href: "/legals" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

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
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-border/50 shadow-sm py-0"
          : isHome
            ? "bg-transparent border-none py-2"
            : "bg-white border-b border-border/50 py-0"
      }`}
    >
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
              className={`text-[13px] font-bold tracking-tight transition-colors ${
                scrolled || !isHome
                  ? "text-muted hover:text-primary"
                  : "text-white/80 hover:text-white"
              }`}
            >
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
            KleinanzeigenPortal
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-8 lg:gap-10">
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[13px] font-bold tracking-tight transition-colors ${
                  scrolled || !isHome
                    ? "text-muted hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/contact">
              <button
                className={`rounded-full px-8 py-3 text-sm font-bold shadow-xl transition-all active:scale-95 ${
                  scrolled || !isHome
                    ? "bg-primary text-white hover:opacity-90"
                    : "bg-white text-primary hover:bg-gray-100"
                }`}
              >
                Contact Us
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

      {/* Mobile Menu - RESTORED TO ORIGINAL STATE */}
      <div
        className={`fixed inset-0 z-60 transition-all duration-500 lg:hidden ${
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
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white p-5 shadow-2xl transition-transform duration-500 ease-in-out flex flex-col ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-12">
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

          <div className="flex flex-col gap-2">
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

          <div className="mt-auto flex flex-col gap-8">
            <Link href="/contact" className="w-full">
              <button className="w-full rounded-sm bg-primary py-3.5 text-base font-bold text-white shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98]">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
