"use client";

// import Link from "next/link";
import { useState } from "react";
import {
  Smartphone,
  Car,
  Home as HomeIcon,
  Shirt,
  Sprout,
  Briefcase,
  ChevronRight,
  Star,
  ArrowRight,
  ShieldCheck,
  Timer,
  Truck,
  PawPrint,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ExploreCategories from "@/components/marketing/ExploreCategories";

export default function Home() {
  const t = useTranslations("Hero");
  const tHome = useTranslations("Home");

  // Simple helper to prevent the brand name from being translated
  const protectBrand = (text: string) => {
    const brand = "Zufriedene Verkäufe";
    if (!text.includes(brand)) return text;

    const parts = text.split(brand);
    return (
      <>
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < parts.length - 1 && <span translate="no">{brand}</span>}
          </span>
        ))}
      </>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Full-Screen Hero Section - Matching User Requested Layout */}
        <section className="relative sm:h-[95vh] w-full overflow-hidden">
          {/* Background Image */}
          <Image
            src="/assets/header-img-1.png"
            alt="Zufriedene Verkäufe Luxury Lifestyle"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Gradient Overlay for legibility */}
          <div className="absolute z-10 inset-0 bg-linear-to-b from-black/90 via-black/40 to-black/50" />

          {/* Hero Content Container */}
          <div className="relative z-20 mx-auto h-full max-w-7xl px-4 sm px-4:sm:px-8 lg:px-12 flex flex-col">
            {/* Top Left: Ratings */}
            <div className="pt-44 lg:pt-40">
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-0.5 rounded bg-white/20 backdrop-blur-md px-3 py-1.5 border border-white/30">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-white text-white" />
                  ))}
                </div>
                <p className="text-[13px] font-bold tracking-tight">
                  4.8 •{" "}
                  <span className="opacity-80 underline underline-offset-4 cursor-pointer hover:opacity-100 transition-opacity">
                    based on 12k+ Trusted Reviews
                  </span>
                </p>
              </div>
            </div>

            {/* Middle Left: Main Heading */}
            <div className="mt-8 max-w-4xl">
              <h1 className="text-5xl md:text-6xl lg:text-[75px] font-extrabold tracking-tight text-white leading-[1.1] lg:leading-none font-montserrat whitespace-pre-line">
                {protectBrand(t("title"))}
              </h1>
              <p className="mt-4 md:mt-8 text-[17px] sm:text-lg text-white/80 font-medium max-w-xl leading-relaxed">
                {protectBrand(t("description"))}
              </p>
            </div>

            {/* Bottom Content Area */}
            <div className="mt-8 lg:mt-10 pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-3 items-center gap-12">
              {/* Bottom Center: Action & Intro */}
              <div className="lg:col-start-1 flex flex-col items-start lg:text-left">
                <div className="flex items-center justify-center gap-3">
                  <Link href="/contact">
                    <button className="rounded-full bg-[#122e1e] border border-[#b5e941] px-10 py-5 text-sm font-black uppercase tracking-widest text-[#b5e941] shadow-2xl transition-all hover:scale-105 active:scale-95">
                      Contact Us
                    </button>
                  </Link>
                  <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#122e1e] shadow-xl hover:scale-105 transition-all">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>

              {/* Bottom Right: Secondary Info */}
              <div className="col-start-3 hidden lg:flex justify-end">
                <div className="bg-[#b5e941] rounded-2xl px-2 py-3 w-[380px] flex items-center gap-4 shadow-2xl border border-white/20">
                  <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl shadow-inner">
                    <Image
                      src="/assets/header-img-1.png"
                      alt="Luxury Treasure"
                      fill
                      sizes="(max-width: 1200px) 100vw, 380px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <span className="rounded-full border border-[#1d4b00]/30 px-3 py-0.5 text-[9px] font-black text-[#1d4b00] uppercase tracking-widest">
                      {t("luxuryStandard")}
                    </span>
                    <h4 className="mt-2 text-base font-extrabold text-[#1d4b00] leading-tight font-montserrat tracking-tight whitespace-pre-line">
                      {t("secondaryHeading")}
                    </h4>
                    <Link
                      href="/#"
                      className="mt-1 text-[10px] font-black text-[#1d4b00] underline underline-offset-4 hover:opacity-60 transition-opacity uppercase tracking-wider"
                    >
                      {t("startExploring")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <ExploreCategories />

        {/* About Us Section - Dark Green Asymmetric Layout */}
        <section className="bg-gray-100 py-24 lg:py-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left Column: Vision */}
              <div className="flex flex-col items-start">
                <div className="inline-block px-4 py-1.5 rounded bg-[#fe89be]/20 text-[11px] font-black tracking-[0.2em] text-[#fe89be] uppercase mb-10 border border-[#fe89be]/30">
                  {tHome("about.tag")}
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-primary leading-tight font-montserrat">
                  {protectBrand(tHome("about.heading"))}
                </h2>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 lg:grid-cols-7 gap-4">
              {/* Bottom Left: Featured Item Image */}
              <div className="col-span-2 lg:col-span-1 relative w-full aspect-video h-full overflow-hidden shadow-2xl border-4 border-[#b5e941]/20 rounded-2xl">
                <Image
                  src="/assets/prod-1.png"
                  alt="Luxury Item"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-3 relative w-full aspect-video rounded-2xl h-full overflow-hidden shadow-2xl border-4 border-[#b5e941]/20">
                <Image
                  src="/assets/prod-2.png"
                  alt="Luxury Item"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="lg:col-span-2 relative w-full aspect-video rounded-2xl h-full overflow-hidden shadow-2xl border-4 border-[#b5e941]/20">
                <Image
                  src="/assets/prod-4.png"
                  alt="Luxury Item"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  className="object-cover"
                />
              </div>
              <div className="col-span-2 lg:col-span-1 relative w-full aspect-video rounded-2xl h-full overflow-hidden shadow-2xl border-4 border-[#b5e941]/20">
                <Image
                  src="/assets/prod-3.png"
                  alt="Luxury Item"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-2 relative w-full aspect-video rounded-2xl h-full overflow-hidden shadow-2xl border-4 border-[#b5e941]/20">
                <Image
                  src="/assets/prod-7.png"
                  alt="Luxury Item"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-3 relative w-full aspect-video rounded-2xl h-full overflow-hidden shadow-2xl border-4 border-[#b5e941]/20">
                <Image
                  src="/assets/prod-5.png"
                  alt="Luxury Item"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="col-span-2 relative w-full aspect-video rounded-2xl h-full overflow-hidden shadow-2xl border-4 border-[#b5e941]/20">
                <Image
                  src="/assets/prod-6.png"
                  alt="Luxury Item"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  className="object-cover"
                />
              </div>

              {/* Bottom Right: Growth & Action */}
              {/* <div className="flex flex-col items-start">
                <h3 className="text-3xl font-serif text-white mb-6 tracking-tight">
                  20,000+ Customers
                </h3>
                <p className="max-w-md text-white/70 text-lg font-medium leading-relaxed mb-10 font-inter">
                  With verified authentication, professional presentation, and
                  secure payments, Zufriedene Verkäufe helps collectors and
                  enthusiasts trade with complete peace of mind.
                </p>
                <Link href="/marketplace">
                  <button className="rounded-full bg-white px-12 py-5 text-sm font-black text-[#1d4b00] shadow-2xl hover:bg-[#b5e941] transition-all active:scale-95 uppercase tracking-widest">
                    Get Started — It&apos;s Free!
                  </button>
                </Link>
              </div> */}
            </div>
          </div>
        </section>

        {/* Curated Excellence Section */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-primary font-montserrat mb-4 uppercase">
                {tHome("excellence.title")}
              </h2>
              <p className="text-muted font-medium max-w-2xl mx-auto text-base">
                {tHome("excellence.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Main Card: Direct Sales Excellence */}
              <div className="lg:col-span-2 rounded-md bg-zinc-50/50 border border-zinc-200 px-5 py-8 sm:p-10 flex flex-col">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#128a12] text-[10px] font-black text-white uppercase tracking-widest mb-4">
                    {tHome("excellence.verified")}
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#001226] font-montserrat mb-2">
                    {tHome("excellence.directSalesTitle")}
                  </h3>
                  <p className="text-muted text-[15px] font-medium leading-relaxed max-w-xl">
                    {tHome("excellence.directSalesDesc")}
                  </p>
                </div>
                <div className="mt-auto relative aspect-16/7 w-full overflow-hidden rounded-xl border border-zinc-200/50 shadow-inner">
                  <Image
                    src="/assets/img-4.png"
                    alt="Luxury Watch Movement"
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Dark Card: Quality Assurance */}
              <div className="rounded-md bg-[#000913] px-5 py-8 flex flex-col text-white">
                <div className="mb-8">
                  <div className="h-10 w-10 rounded-lg bg-[#b5e941]/10 flex items-center justify-center text-[#b5e941] mb-4 border border-[#b5e941]/20">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-2xl font-extrabold font-montserrat mb-2">
                    {tHome("excellence.qualityTitle")}
                  </h3>
                  <p className="text-zinc-400 text-[15px] font-medium leading-relaxed">
                    {tHome("excellence.qualityDesc")}
                  </p>
                </div>
                <div className="mt-auto">
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-[#b5e941] font-bold hover:gap-3 transition-all text-sm"
                  >
                    {tHome("excellence.securityLink")} <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Identity Shield */}
              <div className="rounded-md border border-zinc-200 px-5 py-8 transition-shadow">
                <div className="text-[#b5e941] mb-6">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="text-lg font-extrabold text-[#001226] font-montserrat mb-3">
                  {tHome("excellence.identityTitle")}
                </h4>
                <p className="text-sm text-muted font-medium leading-relaxed">
                  {tHome("excellence.identityDesc")}
                </p>
              </div>

              {/* Concierge Support */}
              <div className="rounded-md border border-zinc-200 px-5 py-8 transition-shadow">
                <div className="text-[#b5e941] mb-6">
                  <Timer size={24} />
                </div>
                <h4 className="text-lg font-extrabold text-[#001226] font-montserrat mb-3">
                  {tHome("excellence.conciergeTitle")}
                </h4>
                <p className="text-sm text-muted font-medium leading-relaxed">
                  {tHome("excellence.conciergeDesc")}
                </p>
              </div>

              {/* Insured Logistics */}
              <div className="rounded-md border border-zinc-200 p-8 transition-shadow">
                <div className="text-[#b5e941] mb-6">
                  <Truck size={24} />
                </div>
                <h4 className="text-lg font-extrabold text-[#001226] font-montserrat mb-3">
                  {tHome("excellence.logisticsTitle")}
                </h4>
                <p className="text-sm text-muted font-medium leading-relaxed">
                  {tHome("excellence.logisticsDesc")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
