"use client";

import {
  X,
  Star,
  Smartphone,
  Car,
  Home as HomeIcon,
  Shirt,
  Sprout,
  Briefcase,
  PawPrint,
  HelpCircle,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Car,
  Home: HomeIcon,
  Shirt,
  Sprout,
  Briefcase,
  PawPrint,
  HelpCircle,
};

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: {
    name: string;
    icon: any; // Allow string or ReactNode
    title: string;
    description: string;
    image: string;
    tagline: string;
  } | null;
}

export default function CategoryModal({
  isOpen,
  onClose,
  category,
}: CategoryModalProps) {
  const t = useTranslations("CategoryModal");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!category || !mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center transition-all duration-500 ease-in-out ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-[95%] max-w-6xl h-[85vh] overflow-hidden rounded-2xl md:rounded-[40px] bg-black shadow-2xl transition-all duration-700 ease-out ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-20 scale-95 opacity-0"
        }`}
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 h-full w-full">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 1200px) 100vw, 1152px"
            className={`object-cover object-center opacity-60 transition-transform duration-3000ms ease-out ${
              isOpen ? "scale-100" : "scale-110"
            }`}
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-black/10 via-transparent to-transparent" />
        </div>

        {/* Top Header */}
        <div className="absolute top-0 left-0 w-full p-6 py-8 lg:px-12 flex justify-between items-center z-10">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#b5e941]/50 text-white shadow-2xl transition-transform duration-500 delay-300">
              {typeof category.icon === "string"
                ? React.createElement(iconMap[category.icon] || HelpCircle, {
                    size: 28,
                  })
                : category.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#b5e941]">
                {t("category")}
              </span>
              <span className="text-lg md:text-xl font-bold tracking-tight text-white font-montserrat">
                {category.name}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl hover:bg-white/20 transition-all active:scale-90 border border-white/20 group cursor-pointer"
          >
            <X
              size={20}
              className="transition-transform group-hover:rotate-90"
            />
          </button>
        </div>

        {/* Content Area */}
        <div className="absolute bottom-0 left-0 w-full p-6 py-12 lg:px-12 flex flex-col items-start z-10">
          <div
            className={`max-w-3xl transition-all duration-700 delay-200 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="mb-4 md:mb-8 flex items-center gap-4 text-white">
              <div className="flex items-center gap-1 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="fill-[#b5e941] text-[#b5e941]"
                  />
                ))}
                <span className="ml-2 text-[10px] font-black uppercase tracking-widest">
                  {t("premium")}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-[0.95] mb-2 md:mb-5 font-montserrat tracking-tighter">
                {category.title}
              </h2>
              <p className="text-base md:text-lg text-white/70 max-w-2xl font-medium font-montserrat">
                {category.description}
              </p>
            </div>

            <Link href="/contact">
              <button className="rounded-full bg-[#122e1e] border border-[#b5e941] px-8 py-3.5 md:px-10 md:py-5 text-[13px] font-mono md:font-montserrat font-black uppercase tracking-widest text-[#b5e941] shadow-2xl transition-all hover:scale-105 active:scale-95">
                Contact Us
              </button>
            </Link>

            {/* <div className="flex flex-wrap items-center gap-6">
              <button className="group relative overflow-hidden rounded-full bg-white px-12 py-6 text-sm font-black uppercase tracking-widest text-black shadow-2xl transition-all hover:pr-14 active:scale-95">
                <span className="relative z-10">Explore {category.name}</span>
                <ArrowRight
                  size={20}
                  className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 transition-all group-hover:opacity-100"
                />
              </button>

              <button className="rounded-full bg-white/5 backdrop-blur-md border border-white/20 px-12 py-6 text-sm font-black uppercase tracking-widest text-white shadow-2xl transition-all hover:bg-white/10 active:scale-95">
                Post an Ad
              </button>
            </div> */}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#b5e941]/10 blur-[120px] pointer-events-none" />
        <div className="absolute left-[-5%] bottom-[-5%] h-[300px] w-[300px] rounded-full bg-white/5 blur-[100px] pointer-events-none" />
      </div>
    </div>
  );
}
