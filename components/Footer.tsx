"use client";

import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import React from "react";
import { useSettings } from "@/components/providers/SettingsProvider";
import Image from "next/image";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiYoutubeFill,
} from "@remixicon/react";

const Footer = () => {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navbar");
  const settings = useSettings();
  const locale = useLocale();

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
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-3">
              {settings.logo && settings.showLogo ? (
                <div className="relative md:h-20 md:w-20 h-16 w-16">
                  <Image
                    src={settings.logo}
                    alt={settings.siteName}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <>
                  <span className="text-2xl font-black tracking-tighter text-primary font-serif">
                    {settings.siteName.charAt(0)}.
                  </span>
                  <span
                    className="text-xl font-bold tracking-tight text-primary font-serif"
                    translate="no"
                  >
                    {settings.siteName}
                  </span>
                </>
              )}
            </Link>
          </div>
          <p className="text-sm font-medium text-muted leading-relaxed">
            {locale === "de"
              ? settings.siteTagline_de
              : settings.siteTagline_en}
          </p>

          <div className="mt-8 flex items-center gap-4">
            {settings.socialLinks.facebook && (
              <a
                href={settings.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all shadow-sm"
              >
                <RiFacebookCircleFill size={18} />
              </a>
            )}
            {settings.socialLinks.instagram && (
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-pink-600 hover:border-pink-100 hover:bg-pink-50 transition-all shadow-sm"
              >
                <RiInstagramFill size={18} />
              </a>
            )}
            {settings.socialLinks.linkedin && (
              <a
                href={settings.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-700 hover:border-blue-100 hover:bg-blue-50 transition-all shadow-sm"
              >
                <RiLinkedinBoxFill size={18} />
              </a>
            )}
            {settings.socialLinks.youtube && (
              <a
                href={settings.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm"
              >
                <RiYoutubeFill size={18} />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="sm:mb-8 text-[11px] font-black text-primary uppercase tracking-[0.2em] font-montserrat">
            Contact
          </h4>
          <ul className="space-y-5 text-sm font-medium font-mono text-muted">
            <li className="flex flex-col gap-1">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                Phone
              </span>
              <span className="text-primary">
                {settings.supportPhone || "+4915731582988"}
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                Email
              </span>
              <span className="text-primary truncate">
                {settings.supportEmail || "info.zufriedeneverkaufe@gmail.com"}
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-8 text-[11px] font-black text-primary uppercase tracking-[0.2em] font-montserrat">
            {t("company")}
          </h4>
          <ul className="space-y-5 text-sm font-medium font-mono text-muted">
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
          <ul className="space-y-5 text-sm font-medium font-mono text-muted">
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
        © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
