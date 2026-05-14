"use client";

import React, { useState } from "react";
import {
  Globe,
  Mail,
  Share2,
  Search,
  Save,
  Image as ImageIcon,
  Phone,
  MapPin,
  Clock,
  LineChart,
  Shield,
  Plus,
  Trash2,
} from "lucide-react";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiYoutubeFill,
} from "@remixicon/react";
import { updateSettings } from "@/app/actions/settings";
import { uploadImage, deleteImage } from "@/app/actions/upload";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useToast } from "@/hooks/useToast";

interface Settings {
  _id?: string;
  siteName: string;
  showLogo: boolean;
  siteTagline_en: string;
  siteTagline_de: string;
  logo?: string;
  logoKey?: string;
  favicon?: string;
  faviconKey?: string;
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

interface SettingsManagerProps {
  initialSettings: Settings;
  locale: string;
}

export default function SettingsManager({
  initialSettings,
  locale,
}: SettingsManagerProps) {
  const [activeTab, setActiveTab] = useState<
    "general" | "contact" | "social" | "seo"
  >("general");
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "social", label: "Social", icon: Share2 },
    { id: "seo", label: "SEO & Advanced", icon: Search },
  ] as const;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await updateSettings(settings);
      if (result.success) {
        addToast(
          "success",
          "Settings Saved",
          "Global configuration updated successfully.",
        );
        router.refresh();
      } else {
        addToast(
          "error",
          "Save Failed",
          result.error || "Failed to save settings.",
        );
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      addToast(
        "error",
        "System Error",
        "An unexpected error occurred while saving.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "favicon",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // If there's an existing key, delete it first
      const existingKey =
        type === "logo" ? settings.logoKey : settings.faviconKey;
      if (existingKey) {
        await deleteImage(existingKey);
      }

      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadImage(formData);
      if (result.url) {
        setSettings({
          ...settings,
          [type]: result.url,
          [`${type}Key`]: result.key,
        });
        addToast(
          "success",
          "Upload Complete",
          `${type === "logo" ? "Logo" : "Favicon"} has been uploaded.`,
        );
      } else {
        addToast(
          "error",
          "Upload Failed",
          result.error || "Failed to upload image.",
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      addToast(
        "error",
        "Upload Error",
        "An unexpected error occurred during upload.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = async (type: "logo" | "favicon") => {
    try {
      const key = type === "logo" ? settings.logoKey : settings.faviconKey;
      if (key) {
        await deleteImage(key);
      }
      setSettings({
        ...settings,
        [type]: "",
        [`${type}Key`]: "",
      });
      addToast(
        "success",
        "Image Removed",
        `${type === "logo" ? "Logo" : "Favicon"} has been deleted.`,
      );
    } catch (error) {
      addToast("error", "Delete Failed", "Failed to remove image from S3.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tight font-serif">
            System Settings
          </h1>
          <p className="text-gray-400 text-sm mt-1 font-medium">
            Configure your global marketplace identity, contacts, and
            integrations.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-secondary text-white rounded text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg shadow-secondary/10 active:scale-95 disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={14} />
          )}
          Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full lg:w-64 shrink-0">
          <nav className="flex lg:flex-col bg-white border border-gray-200 rounded overflow-hidden py-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 lg:flex-none flex items-center gap-3 px-6 py-4 text-xs font-bold font-mono uppercase tracking-widest cursor-pointer transition-all border-b lg:border-b-0 lg:border-l-4 ${
                  activeTab === tab.id
                    ? "bg-secondary/5 text-secondary border-secondary"
                    : "text-gray-400 hover:bg-gray-50 border-transparent"
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Form Content */}
        <div className="flex-1 bg-white border border-gray-200 rounded overflow-hidden">
          {activeTab === "general" && (
            <div className="p-8 space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                      <Globe size={12} className="text-secondary" />
                      Site Name
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-secondary transition-colors">
                        {settings.showLogo ? "Logo Mode" : "Text Mode"}
                      </span>
                      <div
                        onClick={() =>
                          setSettings({
                            ...settings,
                            showLogo: !settings.showLogo,
                          })
                        }
                        className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
                          settings.showLogo ? "bg-secondary" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${
                            settings.showLogo
                              ? "translate-x-5"
                              : "translate-x-0"
                          }`}
                        />
                      </div>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) =>
                      setSettings({ ...settings, siteName: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                    <ImageIcon size={12} className="text-secondary" />
                    Brand Logo
                  </label>
                  <div className="flex items-center gap-6">
                    {settings.logo ? (
                      <div className="relative group">
                        <div className="w-16 h-16 rounded bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                          <Image
                            src={settings.logo}
                            alt="Logo"
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveImage("logo")}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ) : (
                      <label className="w-16 h-16 rounded bg-gray-100 border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-secondary hover:text-secondary cursor-pointer transition-all gap-1">
                        {isUploading ? (
                          <div className="w-5 h-5 border-2 border-secondary/20 border-t-secondary rounded-full animate-spin" />
                        ) : (
                          <>
                            <Plus size={20} />
                            <span className="text-[8px] font-black uppercase">
                              Upload
                            </span>
                          </>
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleLogoUpload(e, "logo")}
                          disabled={isUploading}
                        />
                      </label>
                    )}
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-mono text-gray-400">
                        Recommended: PNG or SVG, max 2MB
                      </span>
                      <p className="text-[9px] text-gray-300 font-medium">
                        Transparent background preferred
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                    <ImageIcon size={12} className="text-secondary" />
                    Favicon
                  </label>
                  <div className="flex items-center gap-6">
                    {settings.favicon ? (
                      <div className="relative group">
                        <div className="w-12 h-12 rounded bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                          <Image
                            src={settings.favicon}
                            alt="Favicon"
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveImage("favicon")}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    ) : (
                      <label className="w-12 h-12 rounded bg-gray-100 border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-secondary hover:text-secondary cursor-pointer transition-all gap-1">
                        {isUploading ? (
                          <div className="w-4 h-4 border-2 border-secondary/20 border-t-secondary rounded-full animate-spin" />
                        ) : (
                          <Plus size={16} />
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/x-icon,image/png"
                          onChange={(e) => handleLogoUpload(e, "favicon")}
                          disabled={isUploading}
                        />
                      </label>
                    )}
                    <span className="text-[11px] font-mono text-gray-400">
                      Recommended: .ico or .png, 32x32px
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                    Tagline (English)
                  </label>
                  <textarea
                    rows={2}
                    value={settings.siteTagline_en}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        siteTagline_en: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all resize-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                    Tagline (German)
                  </label>
                  <textarea
                    rows={2}
                    value={settings.siteTagline_de}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        siteTagline_de: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="p-8 space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                    <Mail size={12} className="text-secondary" />
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) =>
                      setSettings({ ...settings, supportEmail: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                    <Phone size={12} className="text-secondary" />
                    Support Phone
                  </label>
                  <input
                    type="text"
                    value={settings.supportPhone}
                    onChange={(e) =>
                      setSettings({ ...settings, supportPhone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                  <MapPin size={12} className="text-secondary" />
                  Office Address
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) =>
                    setSettings({ ...settings, address: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                    <Clock size={12} className="text-secondary" />
                    Business Hours (EN)
                  </label>
                  <input
                    type="text"
                    value={settings.businessHours_en}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        businessHours_en: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                    <Clock size={12} className="text-secondary" />
                    Business Hours (DE)
                  </label>
                  <input
                    type="text"
                    value={settings.businessHours_de}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        businessHours_de: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "social" && (
            <div className="p-8 space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                    <RiFacebookCircleFill size={16} className="text-blue-600" />
                    Facebook URL
                  </label>
                  <input
                    type="text"
                    value={settings.socialLinks.facebook}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socialLinks: {
                          ...settings.socialLinks,
                          facebook: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                    <RiInstagramFill size={16} className="text-pink-600" />
                    Instagram URL
                  </label>
                  <input
                    type="text"
                    value={settings.socialLinks.instagram}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socialLinks: {
                          ...settings.socialLinks,
                          instagram: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                    <RiLinkedinBoxFill size={16} className="text-blue-700" />
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={settings.socialLinks.linkedin}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socialLinks: {
                          ...settings.socialLinks,
                          linkedin: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                    <RiYoutubeFill size={16} className="text-red-600" />
                    YouTube URL
                  </label>
                  <input
                    type="text"
                    value={settings.socialLinks.youtube}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socialLinks: {
                          ...settings.socialLinks,
                          youtube: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    placeholder="https://youtube.com/c/..."
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="p-8 space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-gray-100">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                    <LineChart size={12} className="text-secondary" />
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    value={settings.seo.googleAnalyticsId}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        seo: {
                          ...settings.seo,
                          googleAnalyticsId: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                    <Shield size={12} className="text-secondary" />
                    Facebook Pixel ID
                  </label>
                  <input
                    type="text"
                    value={settings.seo.facebookPixelId}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        seo: {
                          ...settings.seo,
                          facebookPixelId: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    placeholder="1234567890..."
                  />
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <h3 className="text-xs font-black text-primary uppercase tracking-widest border-l-4 border-secondary pl-4">
                  Default SEO Metadata
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Fallback Title (EN)
                    </label>
                    <input
                      type="text"
                      value={settings.seo.defaultMetaTitle_en}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          seo: {
                            ...settings.seo,
                            defaultMetaTitle_en: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Fallback Title (DE)
                    </label>
                    <input
                      type="text"
                      value={settings.seo.defaultMetaTitle_de}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          seo: {
                            ...settings.seo,
                            defaultMetaTitle_de: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Fallback Description (EN)
                  </label>
                  <textarea
                    rows={3}
                    value={settings.seo.defaultMetaDescription_en}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        seo: {
                          ...settings.seo,
                          defaultMetaDescription_en: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all resize-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Fallback Description (DE)
                  </label>
                  <textarea
                    rows={3}
                    value={settings.seo.defaultMetaDescription_de}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        seo: {
                          ...settings.seo,
                          defaultMetaDescription_de: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded text-sm font-medium font-mono focus:ring-2 focus:ring-secondary/10 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
