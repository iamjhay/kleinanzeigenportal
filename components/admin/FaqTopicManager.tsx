"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  Loader2,
  Plus,
  Trash2,
  Link2,
  AlignLeft,
  Tag,
  HelpCircle,
  AlertCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DynamicIcon from "@/components/ui/DynamicIcon";
import IconPicker from "./IconPicker";
import {
  createFaqTopic,
  deleteFaqTopic,
  deleteManyFaqTopics,
  FaqFormState,
} from "@/app/actions/faq";
import { FaqTopicSchema } from "@/lib/validations";
import { useToast } from "@/hooks/useToast";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import Modal from "@/components/ui/Modal";

interface Topic {
  _id: string;
  title_en: string;
  title_de: string;
  slug: string;
  icon?: string;
  order: number;
  faqCount: number;
}

interface FaqTopicManagerProps {
  topics: Topic[];
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

export default function FaqTopicManager({
  topics,
  locale,
}: FaqTopicManagerProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [clientErrors, setClientErrors] = useState<
    Partial<Record<string, string>>
  >({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [slugLocked, setSlugLocked] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string>("HelpCircle");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [topicToDelete, setTopicToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [state, formAction, isPending] = useActionState<FaqFormState, FormData>(
    createFaqTopic,
    {},
  );

  useEffect(() => {
    if (state.success) {
      addToast("success", "Topic Created", "FAQ topic added successfully.");
      formRef.current?.reset();
      setClientErrors({});
      setSlugLocked(false);
      setSelectedIcon("HelpCircle");
      setIsAddModalOpen(false);
    } else if (state.error) {
      addToast("error", "Creation Failed", state.error);
      setTouchedFields(new Set()); // Reset touched fields on new error to show fresh server errors
    }
  }, [state]);

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const slugInput =
      formRef.current?.querySelector<HTMLInputElement>('[name="slug"]');

    // Auto-fill if not locked OR if the slug field is currently empty
    if (!slugLocked || (slugInput && !slugInput.value)) {
      if (slugInput) {
        slugInput.value = generateSlug(val);
        // If it was empty, we can safely unlock it
        if (!slugInput.value) setSlugLocked(false);
      }
    }
    validateField("title_en", val);
  };

  const validateField = (name: string, value: string) => {
    const shape =
      FaqTopicSchema.shape[name as keyof typeof FaqTopicSchema.shape];
    if (!shape) return;
    const result = shape.safeParse(value);
    setClientErrors((prev) => {
      const next = { ...prev };
      if (result.success) delete next[name];
      else next[name] = result.error.issues[0].message;
      return next;
    });
    setTouchedFields((prev) => {
      const next = new Set(prev);
      next.add(name);
      return next;
    });
  };

  const fieldError = (field: string) => {
    if (clientErrors[field]) return clientErrors[field];
    if (touchedFields.has(field)) return undefined; // Hide server error if user touched it
    return state.fieldErrors?.[field];
  };

  const handleDelete = (id: string, name: string) => {
    setTopicToDelete({ id, name });
  };

  const confirmDelete = async () => {
    if (!topicToDelete) return;
    setDeletingId(topicToDelete.id);
    const result = await deleteFaqTopic(topicToDelete.id);
    setDeletingId(null);
    setTopicToDelete(null);
    if (result.success) {
      addToast("success", "Topic Deleted", `"${topicToDelete.name}" removed.`);
    } else {
      addToast(
        "error",
        "Delete Failed",
        result.error || "Could not delete topic.",
      );
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === topics.length && topics.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(topics.map((t) => t._id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleBulkDelete = async () => {
    setIsBulkDeleting(true);
    const result = await deleteManyFaqTopics(selectedIds);
    setIsBulkDeleting(false);
    setShowBulkConfirm(false);
    if (result.success) {
      addToast(
        "success",
        "Topics Deleted",
        `${selectedIds.length} topics removed.`,
      );
      setSelectedIds([]);
    } else {
      addToast(
        "error",
        "Delete Failed",
        result.error || "Could not delete topics.",
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:gap-8 items-start relative">
      {/* ── Left: Create Form ─────────────────────────────────────────────── */}
      <div className="hidden lg:block w-[380px] shrink-0 animate-in slide-in-from-left duration-300">
        <div className="bg-white rounded border border-gray-100 shadow-sm overflow-hidden sticky top-24">
          <div className="bg-linear-to-br from-primary to-[#0a2540] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Plus size={18} className="text-secondary" />
              </div>
              <div>
                <h2 className="text-sm font-black text-white uppercase tracking-widest">
                  Add FAQ Topic
                </h2>
                <p className="text-[10px] text-white/50 font-medium mt-0.5">
                  Create a new category for FAQs
                </p>
              </div>
            </div>
          </div>

          <form ref={formRef} action={formAction} className="p-6 space-y-5">
            {/* Icon Selection */}
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black font-mono text-primary uppercase tracking-widest mb-2">
                Topic Icon
              </label>
              <IconPicker
                selectedIcon={selectedIcon}
                onSelect={setSelectedIcon}
              />
              <input type="hidden" name="icon" value={selectedIcon} />
            </div>

            {/* Title EN */}
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black font-mono text-primary uppercase tracking-widest mb-2">
                Title (English) *
              </label>
              <input
                name="title_en"
                type="text"
                placeholder="e.g. Payments"
                onChange={handleTitleChange}
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-all outline-none focus:ring-2 focus:ring-secondary/20 font-medium placeholder:text-gray-300 ${
                  fieldError("title_en")
                    ? "border-red-300 bg-red-50/30"
                    : "border-gray-300 bg-gray-50/50"
                }`}
              />
              <FieldError message={fieldError("title_en")} />
            </div>

            {/* Title DE */}
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black font-mono text-primary uppercase tracking-widest mb-2">
                Title (German) *
              </label>
              <input
                name="title_de"
                type="text"
                placeholder="e.g. Zahlungen"
                onChange={(e) => validateField("title_de", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-all outline-none focus:ring-2 focus:ring-secondary/20 font-medium placeholder:text-gray-300 ${
                  fieldError("title_de")
                    ? "border-red-300 bg-red-50/30"
                    : "border-gray-300 bg-gray-50/50"
                }`}
              />
              <FieldError message={fieldError("title_de")} />
            </div>

            {/* Slug */}
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black font-mono text-primary uppercase tracking-widest mb-2">
                URL Slug *
              </label>
              <div className="relative">
                <input
                  name="slug"
                  type="text"
                  placeholder="e.g. payments"
                  onChange={(e) => {
                    if (e.target.value) setSlugLocked(true);
                    else setSlugLocked(false);
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
                    onClick={() => {
                      setSlugLocked(false);
                      const titleInput =
                        formRef.current?.querySelector<HTMLInputElement>(
                          '[name="title_en"]',
                        );
                      const slugInput =
                        formRef.current?.querySelector<HTMLInputElement>(
                          '[name="slug"]',
                        );
                      if (titleInput && slugInput) {
                        slugInput.value = generateSlug(titleInput.value);
                      }
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black font-mono text-secondary uppercase tracking-widest hover:underline"
                  >
                    Auto
                  </button>
                )}
              </div>
              <FieldError message={fieldError("slug")} />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center gap-2 px-6 py-3.5 rounded-full bg-primary hover:bg-primary cursor-pointer border border-[#b5e941] text-sm font-medium text-[#b5e941] hover:border-[#122e1e] transition-all"
            >
              {isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Creating...
                </>
              ) : (
                <>
                  <Plus size={14} /> Create Topic
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ── Right: Topics Table ─────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 w-full transition-all duration-300">
        <div className="bg-white rounded border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
            <div>
              <h2 className="text-sm font-black text-primary uppercase tracking-widest">
                Existing Topics
              </h2>
              <p className="text-[10px] text-muted font-medium mt-0.5">
                {topics.length} topics total
              </p>
            </div>

            {selectedIds.length > 0 && (
              <button
                onClick={() => setShowBulkConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all border border-red-100"
              >
                <Trash2 size={12} />
                Bulk Delete
              </button>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 border-b border-gray-100 w-10">
                    <input
                      type="checkbox"
                      checked={
                        selectedIds.length === topics.length &&
                        topics.length > 0
                      }
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-secondary focus:ring-secondary cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    Topic
                  </th>
                  <th className="px-4 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    Slug
                  </th>
                  <th className="px-4 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    FAQs
                  </th>
                  <th className="px-6 py-4 border-b border-gray-100 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topics.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <HelpCircle size={22} className="text-gray-200" />
                      </div>
                      <p className="text-gray-400 font-medium text-sm italic">
                        No FAQ topics created yet.
                      </p>
                    </td>
                  </tr>
                ) : (
                  topics.map((topic) => (
                    <tr
                      key={topic._id}
                      onClick={() =>
                        router.push(`/${locale}/admin/faqs/${topic._id}`)
                      }
                      className={`hover:bg-gray-50/50 transition-colors cursor-pointer group ${selectedIds.includes(topic._id) ? "bg-secondary/5" : ""}`}
                    >
                      <td
                        className="px-6 py-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(topic._id)}
                          onChange={() => toggleSelect(topic._id)}
                          className="w-4 h-4 rounded border-gray-300 text-secondary focus:ring-secondary cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                            <DynamicIcon
                              name={topic.icon || "HelpCircle"}
                              size={16}
                              className="text-secondary"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-primary">
                              {topic.title_en}
                            </p>
                            <p className="text-[10px] font-mono text-muted font-medium">
                              {topic.title_de}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-mono text-[11px] text-secondary bg-secondary/5 px-2 py-0.5 rounded">
                          {topic.slug}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight bg-gray-100 px-2 py-0.5 rounded">
                          {topic.faqCount || 0} FAQs
                        </span>
                      </td>
                      <td
                        className="px-6 py-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() =>
                            handleDelete(topic._id, topic.title_en)
                          }
                          className="p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all inline-block"
                          title="Delete Topic"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile List View */}
          <div className="md:hidden divide-y divide-gray-100">
            {topics.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <p className="text-gray-400 font-medium text-sm italic">
                  No FAQ topics created yet.
                </p>
              </div>
            ) : (
              topics.map((topic) => (
                <div
                  key={topic._id}
                  onClick={() =>
                    router.push(`/${locale}/admin/faqs/${topic._id}`)
                  }
                  className={`p-5 flex items-start gap-4 active:bg-gray-50 transition-colors ${selectedIds.includes(topic._id) ? "bg-secondary/5" : ""}`}
                >
                  <div className="mt-1" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(topic._id)}
                      onChange={() => toggleSelect(topic._id)}
                      className="w-4 h-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-1">
                      <div className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                        <DynamicIcon
                          name={topic.icon || "HelpCircle"}
                          size={14}
                          className="text-secondary"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-primary truncate">
                          {topic.title_en}
                        </h3>
                        <p className="text-[10px] font-mono text-muted mb-2">
                          {topic.title_de}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight bg-gray-100 px-2 py-0.5 rounded">
                        <span className="font-mono">FAQ:</span>{" "}
                        {topic.faqCount || 0} items
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(topic._id, topic.title_en);
                    }}
                    className="p-2 rounded-lg text-gray-300 active:text-red-500 active:bg-red-50 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={!!topicToDelete}
        onClose={() => setTopicToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Topic?"
        message={`Are you sure you want to delete "${topicToDelete?.name}"? All FAQs inside this topic will also be deleted.`}
        confirmText="Delete Everything"
        variant="danger"
        isPending={!!deletingId}
      />

      <ConfirmationDialog
        isOpen={showBulkConfirm}
        onClose={() => setShowBulkConfirm(false)}
        onConfirm={handleBulkDelete}
        title="Delete Multiple?"
        message={`Are you sure you want to delete ${selectedIds.length} topics? This action cannot be undone.`}
        confirmText="Yes, Delete All"
        isPending={isBulkDeleting}
      />

      {/* Mobile Floating Action Button */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="lg:hidden fixed bottom-8 right-8 w-14 h-14 bg-secondary text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all"
      >
        <Plus size={24} />
      </button>

      {/* Mobile Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add FAQ Topic"
      >
        <form action={formAction} className="p-6 space-y-5">
          {/* Form fields replicated for modal */}
          <div>
            <label className="text-[10px] font-black font-mono text-primary uppercase tracking-widest mb-2 block">
              Icon
            </label>
            <IconPicker
              selectedIcon={selectedIcon}
              onSelect={setSelectedIcon}
            />
            <input type="hidden" name="icon" value={selectedIcon} />
          </div>

          <div>
            <label className="text-[10px] font-black font-mono text-primary uppercase tracking-widest mb-2 block">
              Title (English) *
            </label>
            <input
              name="title_en"
              type="text"
              placeholder="e.g. Payments"
              onChange={handleTitleChange}
              className={`w-full px-4 py-3 rounded-lg border text-sm transition-all outline-none focus:ring-2 focus:ring-secondary/20 font-medium ${
                fieldError("title_en")
                  ? "border-red-300 bg-red-50/30"
                  : "border-gray-300 bg-gray-50/50"
              }`}
            />
            <FieldError message={fieldError("title_en")} />
          </div>

          <div>
            <label className="text-[10px] font-black font-mono text-primary uppercase tracking-widest mb-2 block">
              Title (German) *
            </label>
            <input
              name="title_de"
              type="text"
              placeholder="e.g. Zahlungen"
              onChange={(e) => validateField("title_de", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border text-sm transition-all outline-none focus:ring-2 focus:ring-secondary/20 font-medium ${
                fieldError("title_de")
                  ? "border-red-300 bg-red-50/30"
                  : "border-gray-300 bg-gray-50/50"
              }`}
            />
            <FieldError message={fieldError("title_de")} />
          </div>

          <div>
            <label className="text-[10px] font-black font-mono text-primary uppercase tracking-widest mb-2 block">
              URL Slug *
            </label>
            <input
              name="slug"
              type="text"
              placeholder="e.g. payments"
              onChange={(e) => {
                if (e.target.value) setSlugLocked(true);
                else setSlugLocked(false);
                validateField("slug", e.target.value);
              }}
              className={`w-full px-4 py-3 rounded-lg border text-sm transition-all outline-none focus:ring-2 focus:ring-secondary/20 font-mono ${
                fieldError("slug")
                  ? "border-red-300 bg-red-50/30"
                  : "border-gray-300 bg-gray-50/50"
              }`}
            />
            <FieldError message={fieldError("slug")} />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-primary text-[#b5e941] text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/10 border border-[#b5e941]"
          >
            {isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Plus size={16} />
            )}
            Create Topic
          </button>
        </form>
      </Modal>
    </div>
  );
}
