"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";

const Footer = () => {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navbar");

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
    <footer className="border-t border-border bg-white px-4 sm:px-8 lg:px-12 pt-24 pb-10">
      <div className="mx-auto grid max-w-6xl gap-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-1 lg:col-span-1">
          <div className="mb-8 flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-primary font-serif">
              Z.
            </span>
            <span
              className="text-xl font-bold tracking-tight text-primary font-serif"
              translate="no"
            >
              Zufriedene Verkäufe
            </span>
          </div>
          <p className="text-sm font-medium text-muted leading-relaxed">
            {t("tagline")}
          </p>
        </div>

        <div>
          <h4 className="sm:mb-8 text-[11px] font-black text-primary uppercase tracking-[0.2em] font-montserrat">
            {/* Platform */}
          </h4>
          <ul className="space-y-5 text-sm font-bold text-muted"></ul>
        </div>
        <div>
          <h4 className="mb-8 text-[11px] font-black text-primary uppercase tracking-[0.2em] font-montserrat">
            {t("company")}
          </h4>
          <ul className="space-y-5 text-sm font-bold text-muted">
            <li>
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
              >
                {tNav("about")}
              </Link>
            </li>
            <li>
              <Link
                href="/faqs"
                className="hover:text-primary transition-colors"
              >
                {tNav("faqs")}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors"
              >
                {tNav("contact")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-8 text-[11px] font-black text-primary uppercase tracking-[0.2em] font-montserrat">
            {t("support")}
          </h4>
          <ul className="space-y-5 text-sm font-bold text-muted">
            <li>
              <Link
                href="/faqs"
                className="hover:text-primary transition-colors"
              >
                {t("helpCenter")}
              </Link>
            </li>
            <li>
              <Link
                href="/legals"
                className="hover:text-primary transition-colors"
              >
                {t("safetyRules")}
              </Link>
            </li>
            <li>
              <Link
                href="/legals"
                className="hover:text-primary transition-colors"
              >
                {t("tos")}
              </Link>
            </li>
            <li>
              <Link
                href="/legals"
                className="hover:text-primary transition-colors"
              >
                {t("privacy")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-border pt-12 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted/40">
        {protectBrand(t("copyright"))}
      </div>
    </footer>
  );
};

export default Footer;
