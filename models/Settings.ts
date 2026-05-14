import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ISettings extends Document {
  // Identity
  siteName: string;
  showLogo: boolean;
  siteTagline_en: string;
  siteTagline_de: string;
  logo?: string;
  logoKey?: string;
  favicon?: string;
  faviconKey?: string;

  // Contact
  supportEmail: string;
  supportPhone: string;
  address?: string;
  businessHours_en?: string;
  businessHours_de?: string;

  // Social
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };

  // SEO & Analytics
  seo: {
    defaultMetaTitle_en: string;
    defaultMetaTitle_de: string;
    defaultMetaDescription_en: string;
    defaultMetaDescription_de: string;
    googleAnalyticsId?: string;
    facebookPixelId?: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    siteName: { type: String, default: "Zufriedene Verkäufe" },
    showLogo: { type: Boolean, default: true },
    siteTagline_en: { type: String, default: "" },
    siteTagline_de: { type: String, default: "" },
    logo: { type: String },
    logoKey: { type: String },
    favicon: { type: String },
    faviconKey: { type: String },

    supportEmail: { type: String, default: "" },
    supportPhone: { type: String, default: "" },
    address: { type: String, default: "" },
    businessHours_en: { type: String, default: "" },
    businessHours_de: { type: String, default: "" },

    socialLinks: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },

    seo: {
      defaultMetaTitle_en: { type: String, default: "" },
      defaultMetaTitle_de: { type: String, default: "" },
      defaultMetaDescription_en: { type: String, default: "" },
      defaultMetaDescription_de: { type: String, default: "" },
      googleAnalyticsId: { type: String, default: "" },
      facebookPixelId: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

const Settings =
  models.Settings || model<ISettings>("Settings", SettingsSchema);

export default Settings;
