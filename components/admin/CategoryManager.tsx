"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  Loader2,
  Plus,
  Trash2,
  Link2,
  Image as ImageIcon,
  AlignLeft,
  Tag,
  AlertCircle,
  GamepadDirectional,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import DynamicIcon from "@/components/ui/DynamicIcon";
import IconPicker from "./IconPicker";
import {
  createCategory,
  deleteCategory,
  deleteManyCategories,
  CategoryFormState,
} from "@/app/actions/category";
import { CategorySchema } from "@/lib/validations";
import { useToast } from "@/hooks/useToast";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import Modal from "@/components/ui/Modal";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  createdAt: string;
  status: "draft" | "published";
}

interface CategoryManagerProps {
  categories: Category[];
  locale: string;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1.5 text-[11px] text-red-500 font-medium mt-1">
      <AlertCircle size={11} />
      {message}
    </p>
  );
}

export default function CategoryManager({
  categories,
  locale,
}: CategoryManagerProps) {
  const { addToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const mobileFormRef = useRef<HTMLFormElement>(null);
  const [clientErrors, setClientErrors] = useState<
    Partial<Record<string, string>>
  >({});
  const [slugLocked, setSlugLocked] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string>("Tag");
  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [state, formAction, isPending] = useActionState<
    CategoryFormState,
    FormData
  >(createCategory, {});

  // Sync server errors
  useEffect(() => {
    if (state.success) {
      addToast(
        "success",
        "Category Created",
        "The new category has been added successfully.",
      );
      formRef.current?.reset();
      mobileFormRef.current?.reset();
      setClientErrors({});
      setSlugLocked(false);
      setSelectedIcon("Tag");
      setIsAddModalOpen(false);
    } else if (state.error) {
      addToast("error", "Creation Failed", state.error);
    }
  }, [state]);

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!slugLocked) {
      const desktopSlugInput =
        formRef.current?.querySelector<HTMLInputElement>('[name="slug"]');
      const mobileSlugInput =
        mobileFormRef.current?.querySelector<HTMLInputElement>('[name="slug"]');

      const newSlug = generateSlug(val);
      if (desktopSlugInput) desktopSlugInput.value = newSlug;
      if (mobileSlugInput) mobileSlugInput.value = newSlug;
    }
    validateField("name", val);
  };

  const validateField = (name: string, value: string) => {
    const shape =
      CategorySchema.shape[name as keyof typeof CategorySchema.shape];
    if (!shape) return;
    const result = shape.safeParse(value);
    setClientErrors((prev) => {
      const next = { ...prev };
      if (result.success) delete next[name];
      else next[name] = result.error.issues[0].message;
      return next;
    });
  };

  const fieldError = (field: string) =>
    clientErrors[field] || state.fieldErrors?.[field];

  const handleDelete = (id: string, name: string) => {
    setCategoryToDelete({ id, name });
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    setDeletingId(categoryToDelete.id);
    const result = await deleteCategory(categoryToDelete.id);
    setDeletingId(null);
    setCategoryToDelete(null);

    if (result.success) {
      addToast(
        "success",
        "Category Deleted",
        `"${categoryToDelete.name}" has been removed.`,
      );
    } else {
      addToast(
        "error",
        "Delete Failed",
        result.error || "Could not delete category.",
      );
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === categories.length && categories.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(categories.map((c) => c._id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleBulkDelete = async () => {
    setIsBulkDeleting(true);
    const result = await deleteManyCategories(selectedIds);
    setIsBulkDeleting(false);
    setShowBulkConfirm(false);

    if (result.success) {
      addToast(
        "success",
        "Categories Deleted",
        `${selectedIds.length} categories have been removed.`,
      );
      setSelectedIds([]);
    } else {
      addToast(
        "error",
        "Delete Failed",
        result.error || "Could not delete categories.",
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:gap-8 items-start relative">
      {/* Mobile Add Button (Floating or Header) */}
      <div className="lg:hidden w-full flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-[#b5e941] rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-secondary transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* ── Left: Create Form (Desktop Sidebar) ────────────────────────────── */}
      <div className="hidden lg:block w-[380px] shrink-0">
        <div className="bg-white rounded border border-gray-100 shadow-sm overflow-hidden sticky top-24">
          {/* Header */}
          <div className="bg-linear-to-br from-primary to-[#0a2540] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Plus size={18} className="text-secondary" />
              </div>
              <div>
                <h2 className="text-sm font-black text-white uppercase tracking-widest">
                  Add Category
                </h2>
                <p className="text-[10px] text-white/50 font-medium mt-0.5">
                  Create a new listing category
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form ref={formRef} action={formAction} className="p-6 space-y-5">
            {/* Icon Picker */}
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black font-mono text-primary uppercase tracking-widest mb-2">
                <Tag size={10} />
                Category Icon
              </label>
              <IconPicker
                selectedIcon={selectedIcon}
                onSelect={setSelectedIcon}
              />
              <input type="hidden" name="icon" value={selectedIcon} />
            </div>

            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black font-mono text-primary uppercase tracking-widest mb-2">
                <GamepadDirectional size={10} />
                Category Name *
              </label>
              <input
                name="name"
                type="text"
                placeholder="e.g. Electronics"
                onChange={handleNameChange}
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-all outline-none focus:ring-2 focus:ring-secondary/20 font-medium placeholder:text-gray-300 ${
                  fieldError("name")
                    ? "border-red-300 bg-red-50/30"
                    : "border-gray-300 bg-gray-50/50"
                }`}
              />
              <FieldError message={fieldError("name")} />
            </div>

            {/* Slug */}
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black font-mono text-primary uppercase tracking-widest mb-2">
                <Link2 size={10} />
                URL Slug *
              </label>
              <div className="relative">
                <input
                  name="slug"
                  type="text"
                  placeholder="e.g. electronics"
                  onChange={(e) => {
                    setSlugLocked(true);
                    validateField("slug", e.target.value);
                  }}
                  className={`w-full px-4 py-3 rounded-lg border text-sm transition-all outline-none focus:ring-2 focus:ring-secondary/20 font-mono placeholder:font-sans placeholder:text-gray-300 ${
                    fieldError("slug")
                      ? "border-red-300 bg-red-50/30"
                      : "border-gray-300 bg-gray-50/50"
                  }`}
                />
                {slugLocked && (
                  <button
                    type="button"
                    onClick={() => setSlugLocked(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black font-mono text-secondary uppercase tracking-widest hover:underline"
                  >
                    Auto
                  </button>
                )}
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                Auto-generated from name. Only lowercase letters, numbers, and
                hyphens.
              </p>
              <FieldError message={fieldError("slug")} />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black font-mono text-primary uppercase tracking-widest mb-2">
                <AlignLeft size={10} />
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Briefly describe this category..."
                onChange={(e) => validateField("description", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-all outline-none focus:ring-2 focus:ring-secondary/20 font-medium resize-none placeholder:text-gray-300 ${
                  fieldError("description")
                    ? "border-red-300 bg-red-50/30"
                    : "border-gray-300 bg-gray-50/50"
                }`}
              />
              <FieldError message={fieldError("description")} />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center gap-2 px-6 py-3.5 rounded-full bg-primary hover:bg-primary cursor-pointer border border-[#b5e941] text-sm font-medium text-[#b5e941] hover:border-[#122e1e] transition-all"
            >
              {isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={14} />
                  Create Category
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      {/* Mobile Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Category"
      >
        <div className="bg-white">
          <form
            ref={mobileFormRef}
            action={formAction}
            className="p-6 space-y-5"
          >
            {/* Icon Picker */}
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black font-mono text-primary uppercase tracking-widest mb-2">
                <Tag size={10} />
                Category Icon
              </label>
              <IconPicker
                selectedIcon={selectedIcon}
                onSelect={setSelectedIcon}
              />
              <input type="hidden" name="icon" value={selectedIcon} />
            </div>

            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black font-mono text-primary uppercase tracking-widest mb-2">
                <GamepadDirectional size={10} />
                Category Name *
              </label>
              <input
                name="name"
                type="text"
                placeholder="e.g. Electronics"
                onChange={handleNameChange}
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-all outline-none focus:ring-2 focus:ring-secondary/20 font-medium placeholder:text-gray-300 ${
                  fieldError("name")
                    ? "border-red-300 bg-red-50/30"
                    : "border-gray-300 bg-gray-50/50"
                }`}
              />
              <FieldError message={fieldError("name")} />
            </div>

            {/* Slug */}
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black font-mono text-primary uppercase tracking-widest mb-2">
                <Link2 size={10} />
                URL Slug *
              </label>
              <div className="relative">
                <input
                  name="slug"
                  type="text"
                  placeholder="e.g. electronics"
                  onChange={(e) => {
                    setSlugLocked(true);
                    validateField("slug", e.target.value);
                  }}
                  className={`w-full px-4 py-3 rounded-lg border text-sm transition-all outline-none focus:ring-2 focus:ring-secondary/20 font-mono placeholder:font-sans placeholder:text-gray-300 ${
                    fieldError("slug")
                      ? "border-red-300 bg-red-50/30"
                      : "border-gray-300 bg-gray-50/50"
                  }`}
                />
                {slugLocked && (
                  <button
                    type="button"
                    onClick={() => setSlugLocked(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black font-mono text-secondary uppercase tracking-widest hover:underline"
                  >
                    Auto
                  </button>
                )}
              </div>
              <FieldError message={fieldError("slug")} />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black font-mono text-primary uppercase tracking-widest mb-2">
                <AlignLeft size={10} />
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Briefly describe this category..."
                onChange={(e) => validateField("description", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-all outline-none focus:ring-2 focus:ring-secondary/20 font-medium resize-none placeholder:text-gray-300 ${
                  fieldError("description")
                    ? "border-red-300 bg-red-50/30"
                    : "border-gray-300 bg-gray-50/50"
                }`}
              />
              <FieldError message={fieldError("description")} />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center gap-2 px-6 py-3.5 rounded-full bg-primary hover:bg-primary cursor-pointer border border-[#b5e941] text-sm font-medium text-[#b5e941] hover:border-[#122e1e] transition-all"
            >
              {isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={14} />
                  Create Category
                </>
              )}
            </button>
          </form>
        </div>
      </Modal>

      {/* ── Right: Categories Table (scrollable) ───────────────────────────── */}
      <div className="flex-1 min-w-0">
        <div className="my-4 border-t border-dashed border-[#1d4b00]/10 w-full lg:hidden" />
        <div className="bg-white rounded border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-primary uppercase tracking-widest">
                All Categories
              </h2>
              <p className="text-[10px] text-muted font-medium mt-0.5">
                {categories.length} categories total
              </p>
            </div>

            {selectedIds.length > 0 && (
              <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <p className="text-[10px] font-black text-secondary uppercase tracking-widest">
                  {selectedIds.length} Selected
                </p>
                <button
                  onClick={() => setShowBulkConfirm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all border border-red-100"
                >
                  <Trash2 size={12} />
                  Bulk Delete
                </button>
              </div>
            )}
          </div>

          {/* Scrollable Table (Desktop) */}
          <div className="hidden lg:block overflow-x-auto">
            <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-gray-50/80 backdrop-blur">
                    <th className="px-6 py-3.5 border-b border-gray-100 w-10">
                      <input
                        type="checkbox"
                        checked={
                          selectedIds.length === categories.length &&
                          categories.length > 0
                        }
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded border-gray-300 text-secondary focus:ring-secondary cursor-pointer"
                      />
                    </th>
                    <th className="px-4 py-3.5 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                      Name
                    </th>
                    <th className="px-4 py-3.5 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                      Slug
                    </th>
                    <th className="px-4 py-3.5 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                      Description
                    </th>
                    <th className="px-4 py-3.5 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                      Status
                    </th>
                    <th className="px-4 py-3.5 border-b border-gray-100 w-20"></th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center">
                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Tag size={22} className="text-gray-300" />
                        </div>
                        <p className="text-gray-400 font-medium text-sm italic">
                          No categories yet.
                        </p>
                        <p className="text-gray-300 text-[11px] mt-1">
                          Use the form on the left to create one.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    categories.map((cat, idx) => (
                      <tr
                        key={cat._id}
                        className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors group ${selectedIds.includes(cat._id) ? "bg-secondary/5" : ""}`}
                      >
                        {/* Checkbox */}
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(cat._id)}
                            onChange={() => toggleSelect(cat._id)}
                            className="w-4 h-4 rounded border-gray-300 text-secondary focus:ring-secondary cursor-pointer"
                          />
                        </td>

                        {/* Name */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                              <DynamicIcon
                                name={cat.icon || "Tag"}
                                size={16}
                                className="text-secondary"
                              />
                            </div>

                            <Link
                              href={`/${locale}/admin/categories/${cat._id}`}
                              className="text-sm font-bold text-primary hover:text-secondary hover:underline transition-colors"
                            >
                              {cat.name}
                            </Link>
                          </div>
                        </td>

                        {/* Slug */}
                        <td className="px-4 py-4">
                          <span className="font-mono text-[11px] text-secondary bg-secondary/5 px-2.5 py-1 rounded border border-secondary/10">
                            {cat.slug}
                          </span>
                        </td>

                        {/* Description */}
                        <td className="px-4 py-4 max-w-[200px]">
                          <p className="text-[12px] text-muted font-medium truncate">
                            {cat.description || (
                              <span className="text-gray-300 italic">
                                No description
                              </span>
                            )}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                              cat.status === "published"
                                ? "bg-green-100 text-green-600"
                                : "bg-orange-100 text-orange-600"
                            }`}
                          >
                            {cat.status || "draft"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <Link
                              href={`/${locale}/admin/categories/${cat._id}`}
                              className="p-2 rounded-lg text-gray-300 hover:text-primary hover:bg-gray-50 transition-all"
                              title="Edit category"
                            >
                              <ExternalLink size={14} />
                            </Link>
                            <button
                              onClick={() => handleDelete(cat._id, cat.name)}
                              disabled={deletingId === cat._id}
                              className="p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-40"
                              title="Delete category"
                            >
                              {deletingId === cat._id ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <Trash2 size={14} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile List View */}
          <div className="lg:hidden bg-white rounded border border-gray-100 overflow-hidden shadow-sm divide-y divide-gray-100">
            {categories.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-400 font-medium text-sm italic">
                  No categories yet.
                </p>
              </div>
            ) : (
              categories.map((cat) => (
                <div
                  key={cat._id}
                  className={`p-5 active:bg-gray-50 transition-colors cursor-pointer flex items-start gap-4 ${selectedIds.includes(cat._id) ? "bg-secondary/5" : ""}`}
                >
                  <div className="flex flex-col items-center gap-4 mt-1">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(cat._id)}
                      onChange={() => toggleSelect(cat._id)}
                      className="w-4 h-4 rounded border-gray-300 text-secondary focus:ring-secondary cursor-pointer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                          <DynamicIcon
                            name={cat.icon || "Tag"}
                            size={20}
                            className="text-secondary"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/${locale}/admin/categories/${cat._id}`}
                            className="text-sm font-black text-primary leading-none block truncate"
                          >
                            {cat.name}
                          </Link>
                          <span className="font-mono text-[10px] text-secondary bg-secondary/5 px-2.5 py-0.5 rounded border border-secondary/10">
                            <span className="text-gray-500 font-bold">
                              Slug:
                            </span>{" "}
                            {cat.slug}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            cat.status === "published"
                              ? "bg-green-100 text-green-600"
                              : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {cat.status || "draft"}
                        </span>
                        <p className="text-[9px] font-bold text-gray-300 uppercase tracking-wider mt-1.5">
                          {new Intl.DateTimeFormat(locale, {
                            month: "short",
                            day: "numeric",
                          }).format(new Date(cat.createdAt))}
                        </p>
                      </div>
                    </div>

                    <p className="text-[11px] text-muted font-medium mb-3 bg-gray-50 p-2 rounded border border-gray-100 italic">
                      {cat.description || "No description provided"}
                    </p>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/${locale}/admin/categories/${cat._id}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary/5 text-primary rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 transition-all border border-primary/5"
                      >
                        <ExternalLink size={12} />
                        Edit Details
                      </Link>
                      <button
                        onClick={() => handleDelete(cat._id, cat.name)}
                        className="px-3 py-2 bg-red-50 text-red-500 rounded-lg border border-red-100 hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone and may affect existing listings.`}
        confirmText="Delete Category"
        variant="danger"
        isPending={deletingId === categoryToDelete?.id}
      />

      <ConfirmationDialog
        isOpen={showBulkConfirm}
        onClose={() => setShowBulkConfirm(false)}
        onConfirm={handleBulkDelete}
        title="Bulk Delete Categories"
        message={`Are you sure you want to delete ${selectedIds.length} selected categories? This action cannot be undone and will permanently remove all associated data.`}
        confirmText={`Delete ${selectedIds.length} Categories`}
        variant="danger"
        isPending={isBulkDeleting}
      />
    </div>
  );
}
