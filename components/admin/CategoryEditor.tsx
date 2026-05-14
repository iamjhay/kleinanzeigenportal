"use client";

import { useRef, useState, useTransition } from "react";
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Loader2,
  Image as ImageIcon,
  Tag,
  Link2,
  AlignLeft,
  Layout,
  Upload,
  Trash2,
  CircleDashed,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateCategory } from "@/app/actions/category";
import { uploadImage } from "@/app/actions/upload";
import { useToast } from "@/hooks/useToast";
import IconPicker from "./IconPicker";
import DynamicIcon from "@/components/ui/DynamicIcon";

interface Category {
  _id: string;
  name: string;
  title?: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  status: "draft" | "published";
}

interface CategoryEditorProps {
  category: Category;
  locale: string;
}

export default function CategoryEditor({
  category,
  locale,
}: CategoryEditorProps) {
  const { addToast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: category.name,
    title: category.title || "",
    slug: category.slug,
    description: category.description || "",
    image: category.image || "",
    icon: category.icon || "Tag",
    status: category.status,
  });

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [slugLocked, setSlugLocked] = useState(true);

  const handleSave = async (newStatus?: "draft" | "published") => {
    const statusToSave = newStatus || formData.status;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append("description", formData.description);
    data.append("image", formData.image);
    data.append("icon", formData.icon);
    data.append("status", statusToSave);

    startTransition(async () => {
      const result = await updateCategory(category._id, data);
      if (result.success) {
        addToast(
          "success",
          "Category Updated",
          "Your changes have been saved successfully.",
        );
        setFormData((prev) => ({ ...prev, status: statusToSave }));
        router.refresh();
      } else {
        addToast(
          "error",
          "Update Failed",
          result.error || "Could not update category.",
        );
      }
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: slugLocked
        ? val
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
        : prev.slug,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      addToast("error", "Invalid File", "Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      addToast("error", "File Too Large", "Image must be less than 5MB.");
      return;
    }

    setIsUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const result = await uploadImage(data);
      if (result.url) {
        setFormData((prev) => ({ ...prev, image: result.url }));
        addToast("success", "Image Uploaded", "Thumbnail has been updated.");
      } else {
        addToast(
          "error",
          "Upload Failed",
          result.error || "Could not upload image.",
        );
      }
    } catch (err) {
      addToast("error", "Error", "An unexpected error occurred during upload.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="md:min-h-screen bg-[#f8fafc] mt-4 md:mt-0 w-full">
      <div className="max-w-7xl mx-auto mb-5 flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/admin/categories`}
            className="p-2.5 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 transition-all border border-gray-400"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h1 className="text-xl font-black text-primary tracking-tight">
                {formData.name || "Untitled Category"}
              </h1>
              <span
                className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  formData.status === "published"
                    ? "bg-green-100 text-green-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {formData.status}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium font-mono">
              ID: {category._id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              handleSave(
                formData.status === "published" ? "draft" : "published",
              )
            }
            disabled={isPending}
            className={`flex items-center gap-2 px-5 h-9 rounded text-[11px] font-semibold font-mono uppercase tracking-widest transition-all cursor-pointer ${
              formData.status === "published"
                ? "text-amber-200 bg-amber-900 hover:bg-amber-700"
                : "text-secondary bg-secondary/10 hover:bg-secondary/20"
            }`}
          >
            {formData.status === "published" ? (
              <>
                <CircleDashed size={14} />
                Draft
              </>
            ) : (
              <>
                <Eye size={14} />
                Publish
              </>
            )}
          </button>
          <button
            onClick={() => handleSave()}
            disabled={isPending}
            className="flex items-center gap-2 px-8 h-9 bg-primary text-white rounded text-[11px] font-semibold font-mono uppercase tracking-widest hover:bg-secondary transition-all shadow-lg shadow-primary/20 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            Save
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left Column: Core Data ─────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded border border-gray-200 overflow-hidden">
              <div className="px-4 md:px-8 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Layout size={18} className="text-primary" />
                  </div>
                  <h2 className="text-lg font-bold font-mono text-primary">
                    General Information
                  </h2>
                </div>
              </div>

              <div className="px-4 md:px-8 py-6 space-y-5 md:space-y-8">
                {/* Icon Selection */}
                <div className="flex items-start gap-8">
                  <div className="w-full md:w-1/3">
                    <label className="text-[10px] font-black font-mono text-gray-400 uppercase tracking-widest block mb-3">
                      Category Icon
                    </label>
                    <IconPicker
                      selectedIcon={formData.icon}
                      onSelect={(icon) =>
                        setFormData((prev) => ({ ...prev, icon }))
                      }
                      noStyles={true}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  {/* Display Title */}
                  <div className="col-span-2">
                    <label className="flex items-center gap-2 text-[10px] font-black font-mono text-gray-400 uppercase tracking-widest mb-3">
                      <Tag size={12} />
                      Display Title (SEO)
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-3 bg-white border border-gray-200 rounded-md text-sm font-medium text-primary focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all placeholder:text-sm"
                      placeholder="e.g. Fashion Collection"
                    />
                  </div>

                  {/* Category Name */}
                  <div className="flex-1 col-span-2 md:col-span-1">
                    <label className="flex items-center gap-2 text-[10px] font-black font-mono text-gray-400 uppercase tracking-widest mb-3">
                      <Tag size={12} />
                      Category Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={handleNameChange}
                      className="w-full px-5 py-3 bg-white border border-gray-200 rounded-md text-sm font-bold text-primary focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                      placeholder="e.g. Real Estate"
                    />
                  </div>

                  {/* Slug */}
                  <div className="flex-1 col-span-2 md:col-span-1">
                    <label className="flex items-center gap-2 text-[10px] font-black font-mono text-gray-400 uppercase tracking-widest mb-3">
                      <Link2 size={12} />
                      URL Slug
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            slug: e.target.value,
                          }))
                        }
                        disabled={slugLocked}
                        className="w-full pl-5 pr-16 py-3 bg-white border border-gray-300 rounded-md text-sm font-mono text-primary focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all disabled:opacity-50"
                      />
                      <button
                        onClick={() => setSlugLocked(!slugLocked)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-secondary uppercase tracking-widest hover:underline"
                      >
                        {slugLocked ? "Unlock" : "Lock"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black font-mono text-gray-400 uppercase tracking-widest mb-3">
                    <AlignLeft size={12} />
                    Description
                  </label>
                  <textarea
                    rows={6}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-primary focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all resize-none"
                    placeholder="Describe this category for your users..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Media & Meta ─────────────────────────────────── */}
          <div className="space-y-6">
            <div className="bg-white rounded border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <ImageIcon size={18} className="text-secondary" />
                  </div>
                  <h2 className="text-lg font-bold font-mono text-primary">
                    Featured Image
                  </h2>
                </div>
              </div>

              <div className="px-6 py-6">
                <div className="aspect-4/3 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group transition-all hover:border-secondary/30">
                  {formData.image ? (
                    <>
                      <img
                        src={formData.image}
                        alt="Featured"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button className="p-3 bg-white rounded-xl text-primary hover:bg-secondary hover:text-white transition-all shadow-xl">
                          <Upload size={18} />
                        </button>
                        <button
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, image: "" }))
                          }
                          className="p-3 bg-white rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-6">
                      {isUploading ? (
                        <div className="flex flex-col items-center">
                          <Loader2
                            size={32}
                            className="text-secondary animate-spin mb-4"
                          />
                          <p className="text-[11px] font-black text-primary uppercase tracking-widest">
                            Uploading...
                          </p>
                        </div>
                      ) : (
                        <>
                          <div
                            className="w-14 h-14 bg-white rounded-md flex items-center justify-center mx-auto mb-4 border border-gray-300 group-hover:scale-110 transition-transform cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload size={22} className="text-gray-300" />
                          </div>
                          <p className="text-sm font-bold font-mono text-primary mb-1">
                            Upload Image
                          </p>
                          <p className="text-[10px] text-gray-400 font-medium italic">
                            Recommended: 1200x630px
                          </p>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats / Info */}
            <div className="bg-white rounded border border-gray-300 p-6">
              <h3 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">
                Category Status
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 font-medium">
                    Status
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      formData.status === "published"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {formData.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 font-medium">
                    Visibility
                  </span>
                  <span className="text-[11px] text-primary font-bold">
                    {formData.status === "published" ? "Public" : "Admin Only"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
