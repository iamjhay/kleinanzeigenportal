"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Image as ImageIcon,
  CreditCard,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white pt-5">
      {/* Hero Section - Matching User Requested Layout */}
      <section className="relative px-8 py-12  lg:pt-24 max-w-7xl mx-auto overflow-hidden">
        <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl">
          {/* Background Image */}
          <Image
            src="/stage_career_desktop.jpg"
            alt="The Kleinanzeigenportal Team"
            width={1920}
            height={1200}
            className="object-cover"
            priority
          />

          {/* Dark Overlay for mobile legibility if needed, but the box will cover most */}
          <div className="absolute inset-0 bg-black/10 lg:bg-transparent" />

          {/* Floating Content Box */}
          <div className="absolute left-6 right-6 lg:left-12 lg:top-1/2 lg:-translate-y-1/2 lg:max-w-xl rounded-xl bg-[#b5e941] p-8 lg:p-12 shadow-2xl flex flex-col justify-center">
            <h1 className="mb-6 text-2xl lg:text-3xl font-extrabold text-[#1d4b00] leading-tight font-montserrat">
              Experience True Value with Kleinanzeigenportal.
            </h1>

            <p className="mb-10 text-[15px] font-medium text-[#1d4b00] leading-relaxed font-inter">
              Where authenticity, trust, and elegance meet. As Germany&apos;s
              premier platform for verified luxury trade, we bring the best of
              all worlds together: a beloved brand, exceptional products, and a
              commitment to excellence.
            </p>

            <div>
              <Link
                href="/faqs"
                className="inline-flex items-center justify-center rounded-full bg-[#1d4b00] px-8 py-4 text-sm font-bold text-[#b5e941] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/5"
              >
                Learn how it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Text Section (Optional, keeping the flow) */}
      <section className="mx-auto max-w-4xl px-8 pb-20 text-center">
        <p className="text-xl leading-relaxed text-muted font-medium italic">
          &quot;At Kleinanzeigenportal, we believe purchasing should feel as
          rewarding as ownership. As the exclusive seller on our platform, every
          product you see is carefully selected, professionally verified, and
          offered with absolute confidence.&quot;
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
              <h3 className="mb-4 text-xl font-bold text-primary font-montserrat tracking-tight">
                Uncompromised Authenticity
              </h3>
              <p className="text-[15px] leading-relaxed text-muted font-medium">
                Every item sold on Kleinanzeigenportal is 100% genuine. We do
                not permit third-party sellers, ensuring full quality control
                and a consistently premium standard across our catalogue.
              </p>
            </div>

            {/* Presentation */}
            <div className="group rounded-xl bg-white p-6 shadow-sm border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <ImageIcon size={25} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-primary font-montserrat tracking-tight">
                Thoughtfully Presented Products
              </h3>
              <p className="text-[15px] leading-relaxed text-muted font-medium">
                Each listing features clear imagery and detailed descriptions
                designed to help you choose with confidence and clarity. What
                you see is exactly what we deliver.
              </p>
            </div>

            {/* Payments */}
            <div className="group rounded-xl bg-white p-6 shadow-sm border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
                <CreditCard size={25} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-primary font-montserrat tracking-tight">
                Seamless and Flexible Payments
              </h3>
              <p className="text-[15px] leading-relaxed text-muted font-medium">
                Kleinanzeigenportal offers secure online payment options
                supported by trusted financial channels. For added convenience,
                customers may choose flexible instalment plans.
              </p>
            </div>

            {/* Promise */}
            <div className="group rounded-xl bg-white p-6 shadow-sm border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#000913]/5 text-[#000913] transition-transform group-hover:scale-110">
                <Sparkles size={25} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-primary font-montserrat tracking-tight">
                A Promise Beyond Purchase
              </h3>
              <p className="text-[15px] leading-relaxed text-muted font-medium">
                From checkout to delivery and beyond, Kleinanzeigenportal is
                committed to exceptional service, reliability, and customer
                satisfaction—because luxury is not just what you buy but how you
                are treated.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
