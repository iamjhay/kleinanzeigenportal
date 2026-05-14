import { Metadata } from "next";
import dbConnect from "@/lib/mongoose";
import Settings from "@/models/Settings";
import SettingsManager from "@/components/admin/SettingsManager";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "System Settings | Admin Dashboard",
};

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  
  if (!session) {
    redirect(`/${locale}/login`);
  }

  await dbConnect();
  
  // Fetch settings (singleton)
  let settings = await Settings.findOne({}).lean();
  
  if (!settings) {
    // Create default settings if they don't exist
    const newSettings = await Settings.create({
      siteName: "Zufriedene Verkäufe",
      socialLinks: {},
      seo: {
        defaultMetaTitle_en: "Premium Marketplace",
        defaultMetaTitle_de: "Premium-Marktplatz",
        defaultMetaDescription_en: "Curated Excellence",
        defaultMetaDescription_de: "Kurierte Exzellenz",
      }
    });
    settings = newSettings.toObject();
  }
  
  // Serialize for client component
  const serializedSettings = JSON.parse(JSON.stringify(settings));

  return (
    <SettingsManager initialSettings={serializedSettings} locale={locale} />
  );
}
