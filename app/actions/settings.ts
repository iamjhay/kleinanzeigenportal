"use server";

import dbConnect from "@/lib/mongoose";
import Settings from "@/models/Settings";
import { revalidatePath } from "next/cache";

export async function updateSettings(data: any) {
  try {
    await dbConnect();

    // We only ever want one settings document
    const updatedSettings = await Settings.findOneAndUpdate(
      {}, // Empty filter to find the first/only document
      {
        $set: {
          siteName: data.siteName,
          showLogo: data.showLogo,
          siteTagline_en: data.siteTagline_en,
          siteTagline_de: data.siteTagline_de,
          logo: data.logo,
          logoKey: data.logoKey,
          favicon: data.favicon,
          faviconKey: data.faviconKey,
          supportEmail: data.supportEmail,
          supportPhone: data.supportPhone,
          address: data.address,
          businessHours_en: data.businessHours_en,
          businessHours_de: data.businessHours_de,
          socialLinks: data.socialLinks,
          seo: data.seo,
        },
      },
      { upsert: true, returnDocument: "after" },
    );

    revalidatePath("/[locale]/admin/settings", "page");
    return { success: true, data: JSON.parse(JSON.stringify(updatedSettings)) };
  } catch (error: any) {
    console.error("Error updating settings:", error);
    return { success: false, error: error.message };
  }
}

export async function getSettings() {
  try {
    await dbConnect();
    const settings = await Settings.findOne({}).lean();
    return JSON.parse(JSON.stringify(settings));
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}
