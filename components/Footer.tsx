import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-white px-4 sm:px-8 lg:px-12 pt-24 pb-10">
      <div className="mx-auto grid max-w-6xl gap-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-1 lg:col-span-1">
          <div className="mb-8 flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-primary font-serif">
              K.
            </span>
            <span className="text-xl font-bold tracking-tight text-primary font-serif">
              Kleinanzeigenportal
            </span>
          </div>
          <p className="text-sm font-medium text-muted leading-relaxed">
            The premier destination for buying and selling high-quality
            pre-owned items. Experience the future of classifieds.
          </p>
        </div>

        <div>
          <h4 className="sm:mb-8 text-[11px] font-black text-primary uppercase tracking-[0.2em] font-montserrat">
            {/* Platform */}
          </h4>
          <ul className="space-y-5 text-sm font-bold text-muted">
            {/* <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Post an Ad
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Locations
                </Link>
              </li> */}
          </ul>
        </div>
        <div>
          <h4 className="mb-8 text-[11px] font-black text-primary uppercase tracking-[0.2em] font-montserrat">
            Company
          </h4>
          <ul className="space-y-5 text-sm font-bold text-muted">
            <li>
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/faqs"
                className="hover:text-primary transition-colors"
              >
                Faq
              </Link>
            </li>
            {/* <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li> */}
            <li>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-8 text-[11px] font-black text-primary uppercase tracking-[0.2em] font-montserrat">
            Support
          </h4>
          <ul className="space-y-5 text-sm font-bold text-muted">
            <li>
              <Link
                href="/faqs"
                className="hover:text-primary transition-colors"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                href="/legals"
                className="hover:text-primary transition-colors"
              >
                Safety Rules
              </Link>
            </li>
            <li>
              <Link
                href="/legals"
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/legals"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-border pt-12 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted/40">
        © 2026 Kleinanzeigenportal GmbH. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
