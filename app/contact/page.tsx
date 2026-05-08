"use client";

import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  Send,
  ChevronRight,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white pt-20">
      {/* Header Section */}
      <section className="mx-auto sm:max-w-4xl px-4 sm:px-8 py-20 text-center">
        <h1 className="mb-6 text-3xl xl:text-5xl font-bold tracking-tight text-primary font-serif">
          Kleinanzeigenportal Support
        </h1>
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted leading-relaxed font-medium">
          Experience the assurance of premium assistance. Our dedicated team is
          ready to facilitate your high-end transactions and verify the
          excellence of every listing.
        </p>
      </section>

      {/* Main Content */}
      <section className="bg-gray-100 pt-24">
        <section className="mx-auto grid max-w-7xl gap-10 md:gap-16 px-6 sm:px-8 pb-32 lg:grid-cols-2">
          {/* Left Column: Direct Channels & Guarantee */}
          <div className="flex flex-col gap-12">
            <div>
              <h2 className="mb-10 text-2xl font-bold text-primary font-montserrat tracking-tight">
                Direct Channels
              </h2>

              <div className="flex flex-col gap-8">
                {/* Phone */}
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary text-white shadow-lg">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-1">
                      Phone & WhatsApp
                    </p>
                    <p className="text-sm sm:text-lg xl:text-xl font-bold text-primary font-montserrat tracking-tight">
                      +4915731582988
                    </p>
                    <p className="mt-1 text-[13px] sm:text-sm text-muted font-medium">
                      Available Mon–Fri, 9:00 – 18:00 CET
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary text-white shadow-lg">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-1">
                      Email Enquiries
                    </p>
                    <p className="text-sm sm:text-lg xl:text-xl font-bold text-primary font-montserrat tracking-tight">
                      inforkleinanzeigenportal@gmail.com
                    </p>
                    <p className="mt-1 text-[13px] sm:text-sm text-muted font-medium">
                      Typical response time: Under 4 hours
                    </p>
                  </div>
                </div>

                {/* Office */}
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary text-white shadow-lg">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-1">
                      Berlin Office
                    </p>
                    <p className="text-sm sm:text-lg xl:text-xl font-bold text-primary font-montserrat tracking-tight">
                      Clara-zetkin-stra 1
                    </p>
                    <p className="mt-1 text-[13px] sm:text-sm text-muted font-medium">
                      04779 Wermsdorf, Germany
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee Box */}
            <div className="rounded bg-zinc-50 p-4 sm:p-8 border border-border">
              <h3 className="mb-6 text-lg font-bold text-primary font-montserrat tracking-tight">
                Our Guarantee
              </h3>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex items-center gap-2 rounded bg-secondary px-3 py-1.5 text-[10px] font-black text-white uppercase tracking-wider shadow-sm">
                    <ShieldCheck size={14} />
                    <span>100% Verified</span>
                  </div>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    Every interaction is encrypted and monitored.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex items-center gap-2 rounded bg-accent/20 border border-accent/30 px-3 py-1.5 text-[10px] font-black text-accent uppercase tracking-wider">
                    <Award size={14} />
                    <span>Premium Support</span>
                  </div>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    Direct access to our senior verification agents.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            <div className="rounded border border-border bg-white px-4 py-8 sm:p-10 shadow-2xl">
              <div className="mb-10">
                <h2 className="mb-2 text-2xl font-bold text-primary font-montserrat tracking-tight">
                  Send a Message
                </h2>
                <p className="text-sm text-muted">
                  Fill out the form below and we will get back to you as soon as
                  possible.
                </p>
              </div>

              <form className="flex flex-col gap-8">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John von Neumann"
                      className="rounded border border-border px-5 py-4 text-sm placeholder:text-muted/40 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="rounded border border-border px-5 py-4 text-sm placeholder:text-muted/40 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                    Subject
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded border border-border px-5 py-4 text-sm focus:border-primary focus:outline-none transition-colors bg-white">
                      <option>Verification Request</option>
                      <option>Premium Listing Enquiry</option>
                      <option>Technical Support</option>
                      <option>General Question</option>
                    </select>
                    <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-muted">
                      <ChevronRight size={16} className="rotate-90" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How can our concierge assist you today?"
                    className="rounded border border-border px-5 py-4 text-sm placeholder:text-muted/40 focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button className="flex items-center justify-center gap-3 rounded bg-[#000913] py-5 text-[12px] font-black text-white uppercase tracking-[0.25em] shadow-xl hover:bg-primary transition-all active:scale-[0.98]">
                  <span>Send Enquiry</span>
                  <Send size={16} />
                </button>
              </form>
            </div>

            {/* Bottom Image Section */}
            <div className="relative mt-12 overflow-hidden rounded shadow-2xl h-[400px]">
              <Image
                src="/contact-hero.png"
                alt="Contact Support"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/10" />

              {/* Location Tag */}
              <div className="absolute bottom-10 left-10 rounded bg-white p-5 shadow-2xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white">
                    <MapPin size={20} />
                  </div>
                  <span className="text-base font-bold text-primary font-montserrat tracking-tight">
                    Visit our Berlin Headquarters
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
