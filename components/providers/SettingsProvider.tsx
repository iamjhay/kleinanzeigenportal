"use client";

import React, { createContext, useContext } from "react";

interface Settings {
  siteName: string;
  showLogo: boolean;
  siteTagline_en: string;
  siteTagline_de: string;
  logo?: string;
  favicon?: string;
  supportEmail: string;
  supportPhone: string;
  address?: string;
  businessHours_en?: string;
  businessHours_de?: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  seo: {
    defaultMetaTitle_en: string;
    defaultMetaTitle_de: string;
    defaultMetaDescription_en: string;
    defaultMetaDescription_de: string;
    googleAnalyticsId?: string;
    facebookPixelId?: string;
  };
}

const SettingsContext = createContext<Settings | null>(null);

export function SettingsProvider({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: Settings;
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
