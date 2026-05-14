import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "../globals.css";
import { ToastProvider } from "@/hooks/useToast";
import ToasterWrapper from "@/components/admin/ToasterWrapper";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getSettings } from "@/app/actions/settings";
import { SettingsProvider } from "@/components/providers/SettingsProvider";
import { GoogleAnalytics, FacebookPixel } from "@/components/analytics/Analytics";
import AuthProvider from "@/components/providers/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const settings = await getSettings();

  const title =
    locale === "de"
      ? settings?.seo?.defaultMetaTitle_de || settings?.siteName
      : settings?.seo?.defaultMetaTitle_en || settings?.siteName;

  const description =
    locale === "de"
      ? settings?.seo?.defaultMetaDescription_de
      : settings?.seo?.defaultMetaDescription_en;

  return {
    title: {
      default: title || "Zufriedene Verkäufe",
      template: `%s | ${settings?.siteName || "Zufriedene Verkäufe"}`,
    },
    description: description || "Premium Classifieds Marketplace",
    icons: {
      icon: settings?.favicon || "/favicon.ico",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#001226",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Fetch settings for the provider
  const settings = await getSettings();

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics gaId={settings?.seo?.googleAnalyticsId} />
        <FacebookPixel pixelId={settings?.seo?.facebookPixelId} />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SettingsProvider settings={settings}>
            <AuthProvider>
              <ToastProvider>
                <ToasterWrapper />
                {children}
              </ToastProvider>
            </AuthProvider>
          </SettingsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
