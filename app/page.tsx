"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
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
} from "lucide-react";

const categories = [
  {
    name: "Electronics",
    icon: <Smartphone size={24} />,
    color: "bg-[#eafdc5]",
  },
  {
    name: "Vehicles",
    icon: <Car size={24} />,
    color: "bg-[#e9eff0]",
  },
  {
    name: "Real Estate",
    icon: <HomeIcon size={24} />,
    color: "bg-[#f0f9d9]",
  },
  {
    name: "Fashion",
    icon: <Shirt size={24} />,
    color: "bg-[#eafdc5]",
  },
  {
    name: "Home & Garden",
    icon: <Sprout size={24} />,
    color: "bg-[#e9eff0]",
  },
  {
    name: "Jobs",
    icon: <Briefcase size={24} />,
    color: "bg-[#f0f9d9]",
  },
];

const featuredListings = [
  {
    id: 1,
    title: "MacBook Pro M3 Max - 16-inch, 64GB RAM",
    price: "€3,499",
    location: "Berlin, Mitte",
    image: "/macbook.png",
    category: "Electronics",
  },
  {
    id: 2,
    title: "Tesla Model 3 Long Range - White, 2023",
    price: "€42,500",
    location: "Munich, Schwabing",
    image: "/tesla.png",
    category: "Vehicles",
  },
  {
    id: 3,
    title: "Modern Velvet Sofa - Deep Gray, Brand New",
    price: "€899",
    location: "Hamburg, Altona",
    image: "/sofa.png",
    category: "Home & Garden",
  },
  {
    id: 4,
    title: "Omega Seamaster - Black Dial, Steel Bracelet",
    price: "€5,200",
    location: "Frankfurt, Westend",
    image: "/watch.png",
    category: "Fashion",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Full-Screen Hero Section - Matching User Requested Layout */}
        <section className="relative h-[95vh] w-full overflow-hidden">
          {/* Background Image */}
          <Image
            src="/assets/img-1.png"
            alt="Kleinanzeigenportal Luxury Lifestyle"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay for legibility */}
          <div className="absolute z-10 inset-0 bg-linear-to-b from-black/60 via-transparent to-black/50" />

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
              <h1 className="text-5xl md:text-6xl lg:text-[80px] font-extrabold tracking-tight text-white leading-[1.1] lg:leading-[0.9] font-montserrat">
                Your luxury <br />
                lifestyle with <br />
                Kleinanzeigen
              </h1>
            </div>

            {/* Bottom Content Area */}
            <div className="mt-5 lg:mt-10 pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-3 items-end gap-12">
              {/* Bottom Center: Action & Intro */}
              <div className="lg:col-start-1 flex flex-col items-start lg:text-left">
                <p className="mb-10 max-w-[450px] text-[15px] font-medium text-white/90 leading-relaxed">
                  At Kleinanzeigenportal, we provide a curated marketplace for
                  high-end assets, professionally verified for your absolute
                  peace of mind.
                </p>

                <div className="flex items-center gap-3">
                  <Link href="/marketplace">
                    <button className="rounded-full bg-[#122e1e] px-10 py-5 text-sm font-black uppercase tracking-widest text-[#b5e941] shadow-2xl transition-all hover:scale-105 active:scale-95">
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
                      src="/assets/img-1.png"
                      alt="Luxury Treasure"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <span className="rounded-full border border-[#1d4b00]/30 px-3 py-0.5 text-[9px] font-black text-[#1d4b00] uppercase tracking-widest">
                      Luxury Standard
                    </span>
                    <h4 className="mt-2 text-base font-extrabold text-[#1d4b00] leading-tight font-montserrat tracking-tight">
                      Find your next <br /> treasure here
                    </h4>
                    <Link
                      href="/#"
                      className="mt-1 text-[10px] font-black text-[#1d4b00] underline underline-offset-4 hover:opacity-60 transition-opacity uppercase tracking-wider"
                    >
                      Start Exploring
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 py-14 sm:py-16">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-2xl font-black tracking-tight text-primary font-montserrat uppercase">
                Explore Categories
              </h2>
              <p className="mt-1 text-sm text-muted font-medium">
                Browse through thousands of premium listings
              </p>
            </div>
            <Link
              href="#"
              className="group hidden md:flex items-center gap-1 text-sm font-semibold text-secondary hover:underline transition-all"
            >
              View All
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className={`group cursor-pointer rounded-lg p-6 flex flex-col h-[180px] transition-all duration-500 ${cat.color}`}
              >
                <div className="flex-1">
                  <h3 className="font-bold text-[#1d4b00] text-[15px] leading-tight font-montserrat tracking-tight mb-1">
                    {cat.name}
                  </h3>
                </div>

                <div className="my-4 border-t border-dashed border-[#1d4b00]/10 w-full" />

                <div className="flex justify-start text-[#1d4b00] opacity-80 group-hover:opacity-100 transition-all group-hover:scale-110">
                  {cat.icon}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Us Section - Dark Green Asymmetric Layout */}
        <section className="bg-gray-100 py-24 lg:py-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left Column: Vision */}
              <div className="flex flex-col items-start">
                <div className="inline-block px-4 py-1.5 rounded bg-[#fe89be]/20 text-[11px] font-black tracking-[0.2em] text-[#fe89be] uppercase mb-10 border border-[#fe89be]/30">
                  // About Us? //
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-primary leading-tight font-montserrat">
                  Kleinanzeigenportal is Germany&apos;s premier platform for
                  verified luxury trade. We turn pre-owned assets into secure
                  investments— letting customers browse, select, and own with
                  absolute confidence.
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
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-3 relative w-full aspect-video rounded-2xl h-full overflow-hidden shadow-2xl border-4 border-[#b5e941]/20">
                <Image
                  src="/assets/prod-2.png"
                  alt="Luxury Item"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-2 relative w-full aspect-video rounded-2xl h-full overflow-hidden shadow-2xl border-4 border-[#b5e941]/20">
                <Image
                  src="/assets/prod-3.png"
                  alt="Luxury Item"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="col-span-2 lg:col-span-1 relative w-full aspect-video rounded-2xl h-full overflow-hidden shadow-2xl border-4 border-[#b5e941]/20">
                <Image
                  src="/assets/prod-4.png"
                  alt="Luxury Item"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-2 relative w-full aspect-video rounded-2xl h-full overflow-hidden shadow-2xl border-4 border-[#b5e941]/20">
                <Image
                  src="/assets/prod-7.png"
                  alt="Luxury Item"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-3 relative w-full aspect-video rounded-2xl h-full overflow-hidden shadow-2xl border-4 border-[#b5e941]/20">
                <Image
                  src="/assets/prod-5.png"
                  alt="Luxury Item"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="col-span-2 relative w-full aspect-video rounded-2xl h-full overflow-hidden shadow-2xl border-4 border-[#b5e941]/20">
                <Image
                  src="/assets/prod-6.png"
                  alt="Luxury Item"
                  fill
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
                  secure payments, Kleinanzeigenportal helps collectors and
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
              <h2 className="text-3xl font-bold tracking-tight text-[#001226] font-montserrat mb-4">
                Curated Excellence
              </h2>
              <p className="text-muted font-medium max-w-2xl mx-auto text-base">
                Discover a new standard of classifieds where luxury meets
                transparency through our rigorous verification protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Main Card: Direct Sales Excellence */}
              <div className="lg:col-span-2 rounded-md bg-zinc-50/50 border border-zinc-200 px-5 py-8 sm:p-10 flex flex-col">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#128a12] text-[10px] font-black text-white uppercase tracking-widest mb-4">
                    100% Verified
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#001226] font-montserrat mb-2">
                    Direct Sales Excellence
                  </h3>
                  <p className="text-muted text-[15px] font-medium leading-relaxed max-w-xl">
                    Our escrow-based direct sales model ensures that funds are
                    only released once you have inspected and approved the item
                    in person or via certified delivery.
                  </p>
                </div>
                <div className="mt-auto relative aspect-16/7 w-full overflow-hidden rounded-xl border border-zinc-200/50 shadow-inner">
                  <Image
                    src="/assets/img-4.png"
                    alt="Luxury Watch Movement"
                    fill
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
                    Quality Assurance
                  </h3>
                  <p className="text-zinc-400 text-[15px] font-medium leading-relaxed">
                    Every professional seller on our platform undergoes a
                    multi-stage KYC (Know Your Customer) process, including
                    physical address verification and trade license auditing.
                  </p>
                </div>
                <div className="mt-auto">
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-[#b5e941] font-bold hover:gap-3 transition-all text-sm"
                  >
                    Read Security Protocol <ArrowRight size={18} />
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
                  Identity Shield
                </h4>
                <p className="text-sm text-muted font-medium leading-relaxed">
                  State-of-the-art encryption protecting your personal data and
                  browsing history from third parties.
                </p>
              </div>

              {/* Concierge Support */}
              <div className="rounded-md border border-zinc-200 px-5 py-8 transition-shadow">
                <div className="text-[#b5e941] mb-6">
                  <Timer size={24} />
                </div>
                <h4 className="text-lg font-extrabold text-[#001226] font-montserrat mb-3">
                  Concierge Support
                </h4>
                <p className="text-sm text-muted font-medium leading-relaxed">
                  Access to our Berlin-based support team 24/7 for dispute
                  resolution and marketplace guidance.
                </p>
              </div>

              {/* Insured Logistics */}
              <div className="rounded-md border border-zinc-200 p-8 transition-shadow">
                <div className="text-[#b5e941] mb-6">
                  <Truck size={24} />
                </div>
                <h4 className="text-lg font-extrabold text-[#001226] font-montserrat mb-3">
                  Insured Logistics
                </h4>
                <p className="text-sm text-muted font-medium leading-relaxed">
                  Global shipping partnerships with full insurance coverage for
                  high-value premium assets.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
