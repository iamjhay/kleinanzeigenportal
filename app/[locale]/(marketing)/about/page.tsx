"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  Image as ImageIcon,
  CreditCard,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("About");

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
    <div className="flex min-h-screen flex-col bg-white pt-5">
      {/* Hero Section - Matching User Requested Layout */}
      <section className="relative sm:px-8 py-12 sm:pt-20 lg:pt-24 max-w-7xl mx-auto overflow-hidden">
        <div className="relative h-96 sm:h-auto w-full overflow-hidden sm:rounded-3xl shadow-2xl">
          {/* Background Image */}
          <Image
            src="/stage_career_desktop.jpg"
            alt="The Zufriedene Verkäufe Team"
            width={1920}
            height={1200}
            className="object-cover h-full w-full"
            priority
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/10 lg:bg-transparent" />

          {/* Floating Content Box */}
          <div className="relative sm:absolute left-6 right-6 lg:left-0 xl:left-12 lg:top-1/2 lg:-translate-y-1/2 lg:max-w-xl rounded-2xl bg-[#b5e941] p-8 lg:p-12 shadow-2xl flex flex-col justify-center">
            <h1 className="mb-6 text-2xl lg:text-4xl font-extrabold text-[#1d4b00] leading-tight font-montserrat">
              {protectBrand(t("title"))}
            </h1>

            <p className="mb-10 text-[15px] font-medium text-[#1d4b00] leading-relaxed font-inter">
              {protectBrand(t("intro"))}
            </p>

            <div>
              <Link
                href="/faqs"
                className="inline-flex items-center justify-center rounded-full bg-[#1d4b00] px-8 py-4 text-sm font-bold text-[#b5e941] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/5"
              >
                {t("howItWorks")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Text Section */}
      <section className="mx-auto max-w-4xl px-4 md:px-8 pb-20 text-center">
        <p className="text-lg lg:text-xl leading-relaxed text-muted font-medium italic">
          {protectBrand(t("mission"))}
        </p>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-zinc-50 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Authenticity */}
            <div className="group rounded-xl bg-white p-6 shadow-sm border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-transform group-hover:scale-110">
                <ShieldCheck size={25} />
              </div>
              <h3 className="mb-4 text-lg font-bold lg:text-xl lg:font-black text-primary font-montserrat tracking-tight">
                {t("values.authenticity.title")}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted font-medium">
                {t("values.authenticity.description")}
              </p>
            </div>

            {/* Presentation */}
            <div className="group rounded-xl bg-white p-6 shadow-sm border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <ImageIcon size={25} />
              </div>
              <h3 className="mb-4 text-lg font-bold lg:text-xl lg:font-black text-primary font-montserrat tracking-tight">
                {t("values.presentation.title")}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted font-medium">
                {t("values.presentation.description")}
              </p>
            </div>

            {/* Payments */}
            <div className="group rounded-xl bg-white p-6 shadow-sm border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
                <CreditCard size={25} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-primary font-montserrat tracking-tight">
                {t("values.payments.title")}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted font-medium">
                {t("values.payments.description")}
              </p>
            </div>

            {/* Promise */}
            <div className="group rounded-xl bg-white p-6 shadow-sm border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#000913]/5 text-[#000913] transition-transform group-hover:scale-110">
                <Sparkles size={25} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-primary font-montserrat tracking-tight">
                {protectBrand(t("values.promise.title"))}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted font-medium">
                {protectBrand(t("values.promise.description"))}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
