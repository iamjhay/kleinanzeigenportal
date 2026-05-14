"use client";

import { useActionState, useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  HelpCircle,
  Save,
  Loader2,
  Tag,
  Link2,
  AlertCircle,
  GripVertical,
  Edit2,
  ChevronDown,
  ChevronLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import IconPicker from "./IconPicker";
import DynamicIcon from "@/components/ui/DynamicIcon";
import Modal from "@/components/ui/Modal";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import {
  updateFaqTopic,
  createFaqItem,
  updateFaqItem,
  deleteFaqItem,
} from "@/app/actions/faq";
import { FaqTopicSchema, FaqItemSchema } from "@/lib/validations";
import Link from "next/link";

interface Faq {
  _id: string;
  question_en: string;
  question_de: string;
  answer_en: string;
  answer_de: string;
  order: number;
}

interface Topic {
  _id: string;
  title_en: string;
  title_de: string;
  slug: string;
  icon?: string;
  order: number;
}

interface FaqTopicEditorProps {
  topic: Topic;
  faqs: Faq[];
  locale: string;
}

export default function FaqTopicEditor({
  topic,
  faqs,
  locale,
}: FaqTopicEditorProps) {
  const router = useRouter();
  const { addToast } = useToast();

  // Topic Editing State
  const [topicData, setTopicData] = useState(topic);
  const [isUpdatingTopic, setIsUpdatingTopic] = useState(false);
  const [topicErrors, setTopicErrors] = useState<
    Partial<Record<string, string>>
  >({});

  // FAQ Item Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [itemErrors, setItemErrors] = useState<Partial<Record<string, string>>>(
    {},
  );
  const [faqToDelete, setFaqToDelete] = useState<Faq | null>(null);
  const [touchedItems, setTouchedItems] = useState<Set<string>>(new Set());
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);

  // Topic Update
  const handleUpdateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingTopic(true);

    const formData = new FormData();
    formData.append("title_en", topicData.title_en);
    formData.append("title_de", topicData.title_de);
    formData.append("slug", topicData.slug);
    formData.append("icon", topicData.icon || "HelpCircle");
    formData.append("order", String(topicData.order));

    const result = await updateFaqTopic(topic._id, {}, formData);
    setIsUpdatingTopic(false);

    if (result.success) {
      addToast("success", "Topic Updated", "Topic changes saved successfully.");
      setTopicErrors({});
      setIsTopicModalOpen(false);
    } else {
      addToast("error", "Update Failed", result.error || "Check your inputs.");
      if (result.fieldErrors) setTopicErrors(result.fieldErrors);
    }
  };

  // FAQ Item Management
  const [itemState, itemFormAction, isItemPending] = useActionState(
    editingFaq ? updateFaqItem.bind(null, editingFaq._id) : createFaqItem,
    {},
  );

  useEffect(() => {
    if (itemState.success) {
      addToast(
        "success",
        editingFaq ? "FAQ Updated" : "FAQ Created",
        "Your changes have been saved.",
      );
      setIsModalOpen(false);
      setEditingFaq(null);
      setItemErrors({});
    } else if (itemState.error) {
      addToast("error", "Error", itemState.error);
      if (itemState.fieldErrors) setItemErrors(itemState.fieldErrors);
      setTouchedItems(new Set());
    }
  }, [itemState]);

  const validateItemField = (name: string, value: string) => {
    const shape = FaqItemSchema.shape[name as keyof typeof FaqItemSchema.shape];
    if (!shape) return;
    const result = shape.safeParse(value);
    setItemErrors((prev) => {
      const next = { ...prev };
      if (result.success) delete next[name];
      else next[name] = result.error.issues[0].message;
      return next;
    });
    setTouchedItems((prev) => {
      const next = new Set(prev);
      next.add(name);
      return next;
    });
  };

  const getItemError = (field: string) => {
    if (itemErrors[field]) return itemErrors[field];
    if (touchedItems.has(field)) return undefined;
    return itemState.fieldErrors?.[field];
  };

  const confirmDeleteFaq = async () => {
    if (!faqToDelete) return;
    const result = await deleteFaqItem(faqToDelete._id, topic._id);
    if (result.success) {
      addToast("success", "Deleted", "FAQ item removed.");
      setFaqToDelete(null);
    } else {
      addToast(
        "error",
        "Delete Failed",
        result.error || "Could not delete item.",
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Topic Edit Modal ────────────────────────────────────────────── */}
      <Modal
        isOpen={isTopicModalOpen}
        onClose={() => setIsTopicModalOpen(false)}
        title="Edit Topic Info"
        width="max-w-md"
      >
        <form onSubmit={handleUpdateTopic} className="p-6 space-y-5">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
              Topic Icon
            </label>
            <IconPicker
              selectedIcon={topicData.icon || "HelpCircle"}
              onSelect={(icon) => setTopicData({ ...topicData, icon })}
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
              Title (English)
            </label>
            <input
              type="text"
              value={topicData.title_en}
              onChange={(e) => {
                setTopicData({ ...topicData, title_en: e.target.value });
                setTopicErrors((prev) => ({ ...prev, title_en: undefined }));
              }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none"
            />
            {topicErrors.title_en && (
              <p className="text-[10px] text-red-500 mt-1">
                {topicErrors.title_en}
              </p>
            )}
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
              Title (German)
            </label>
            <input
              type="text"
              value={topicData.title_de}
              onChange={(e) => {
                setTopicData({ ...topicData, title_de: e.target.value });
                setTopicErrors((prev) => ({ ...prev, title_de: undefined }));
              }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none"
            />
            {topicErrors.title_de && (
              <p className="text-[10px] text-red-500 mt-1">
                {topicErrors.title_de}
              </p>
            )}
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
              URL Slug
            </label>
            <input
              type="text"
              value={topicData.slug}
              onChange={(e) => {
                setTopicData({ ...topicData, slug: e.target.value });
                setTopicErrors((prev) => ({ ...prev, slug: undefined }));
              }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-secondary/20 outline-none"
            />
            {topicErrors.slug && (
              <p className="text-[10px] text-red-500 mt-1">
                {topicErrors.slug}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isUpdatingTopic}
            className="w-full flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-primary text-[#b5e941] text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/10 border border-[#b5e941] mt-4"
          >
            {isUpdatingTopic ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            Save Changes
          </button>
        </form>
      </Modal>

      {/* ── FAQ Items ─────────────────────────────────────────────────── */}
      <div className="xl:col-span-3 space-y-6">
        <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/admin/faqs`}
              className="p-2 rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-primary hover:border-primary transition-all"
            >
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 className="text-xl font-black text-primary uppercase tracking-tight">
                Manage FAQs
              </h1>
              <p className="text-[13px] md:text-sm text-muted font-medium">
                Edit topic details and manage Q&A
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsTopicModalOpen(true)}
              className="flex-1 md:flex-none flex justify-center items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 text-[13px] font-bold transition-all shadow-sm"
            >
              <Edit2 size={16} />
              Edit Topic
            </button>
            <button
              onClick={() => {
                setEditingFaq(null);
                setIsModalOpen(true);
              }}
              className="flex-1 md:flex-none flex justify-center items-center gap-2 px-6 py-3 rounded-full bg-[#122e1e] hover:bg-primary cursor-pointer border border-[#b5e941] text-[13px] font-bold text-[#b5e941] hover:border-[#122e1e] transition-all shadow-lg shadow-primary/5"
            >
              <Plus size={16} />
              Add FAQ
            </button>
          </div>
        </div>

        <div className="space-y-0">
          {faqs.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle size={32} className="text-gray-200" />
              </div>
              <h3 className="text-sm font-bold text-gray-500">
                No questions yet
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Start by adding the first FAQ to this topic.
              </p>
            </div>
          ) : (
            faqs.map((faq, index) => (
              <div
                key={faq._id}
                className="bg-white border-b border-x first:border-t border-gray-200 p-6 flex flex-col md:flex-row items-start gap-4 md:gap-6 group hover:border-secondary/20 transition-all"
              >
                <div className="flex flex-row md:flex-col justify-between items-center md:items-start w-full md:w-auto mb-2 md:mb-0 shrink-0">
                  <div className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-secondary transition-colors font-black text-xs font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Actions on Mobile */}
                  <div className="flex md:hidden items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingFaq(faq);
                        setIsModalOpen(true);
                      }}
                      className="p-2 rounded-lg bg-gray-50 text-gray-400 active:text-secondary active:bg-secondary/5 transition-all"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => setFaqToDelete(faq)}
                      className="p-2 rounded-lg bg-red-50 text-red-400 active:text-white active:bg-red-500 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 min-w-0 w-full">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">🇺🇸</span>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest font-mono">
                          English
                        </p>
                      </div>
                      <p className="text-sm font-bold text-primary mb-1">
                        {faq.question_en}
                      </p>
                      <p className="text-xs text-muted leading-relaxed line-clamp-2">
                        {faq.answer_en}
                      </p>
                    </div>
                    <div className="border-t border-dashed border-gray-100 pt-6 md:pt-0 md:border-t-0 md:border-l md:pl-6 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">🇩🇪</span>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest font-mono">
                          German
                        </p>
                      </div>
                      <p className="text-sm font-bold text-primary mb-1">
                        {faq.question_de}
                      </p>
                      <p className="text-xs text-muted leading-relaxed line-clamp-2">
                        {faq.answer_de}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions on Desktop */}
                <div className="hidden md:flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setEditingFaq(faq);
                      setIsModalOpen(true);
                    }}
                    className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-secondary hover:bg-secondary/5 transition-all cursor-pointer"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => setFaqToDelete(faq)}
                    className="p-2 rounded-lg bg-red-50 text-red-400 hover:text-white hover:bg-red-500 transition-all cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* FAQ Item Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingFaq ? "Edit FAQ Item" : "Add New FAQ Item"}
        width="max-w-4xl"
      >
        <form action={itemFormAction} className="p-6 space-y-6">
          <input type="hidden" name="topicId" value={topic._id} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* English Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-2xl">🇺🇸</div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                  English Version
                </span>
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold text-gray-500 block mb-2">
                  Question
                </label>
                <textarea
                  name="question_en"
                  rows={2}
                  defaultValue={editingFaq?.question_en}
                  onChange={(e) =>
                    validateItemField("question_en", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md font-mono text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none resize-none"
                  placeholder="e.g. How do I verify my account?"
                />
                {getItemError("question_en") && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {getItemError("question_en")}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold text-gray-500 block mb-2">
                  Answer
                </label>
                <textarea
                  name="answer_en"
                  rows={4}
                  defaultValue={editingFaq?.answer_en}
                  onChange={(e) =>
                    validateItemField("answer_en", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md font-mono text-sm leading-relaxed focus:ring-2 focus:ring-secondary/20 outline-none resize-none"
                  placeholder="Provide a detailed answer..."
                />
                {getItemError("answer_en") && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {getItemError("answer_en")}
                  </p>
                )}
              </div>
            </div>

            {/* German Content */}
            <div className="space-y-4 border-l border-gray-100 pl-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-2xl">🇩🇪</div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                  German Version
                </span>
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold text-gray-500 block mb-2">
                  Frage
                </label>
                <textarea
                  name="question_de"
                  rows={2}
                  defaultValue={editingFaq?.question_de}
                  onChange={(e) =>
                    validateItemField("question_de", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md font-mono text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none resize-none"
                  placeholder="z.B. Wie verifiziere ich mein Konto?"
                />
                {getItemError("question_de") && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {getItemError("question_de")}
                  </p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold text-gray-500 block mb-2">
                  Antwort
                </label>
                <textarea
                  name="answer_de"
                  rows={4}
                  defaultValue={editingFaq?.answer_de}
                  onChange={(e) =>
                    validateItemField("answer_de", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md font-mono text-sm leading-relaxed focus:ring-2 focus:ring-secondary/20 outline-none resize-none"
                  placeholder="Geben Sie eine detaillierte Antwort..."
                />
                {getItemError("answer_de") && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {getItemError("answer_de")}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isItemPending}
            className="w-full py-4 bg-secondary text-white rounded-full text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            {isItemPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {editingFaq ? "Save FAQ" : "Create Item"}
          </button>
        </form>
      </Modal>

      <ConfirmationDialog
        isOpen={!!faqToDelete}
        onClose={() => setFaqToDelete(null)}
        onConfirm={confirmDeleteFaq}
        title="Delete FAQ Item?"
        message="Are you sure you want to remove this question? This cannot be undone."
        confirmText="Yes, Delete"
      />
    </div>
  );
}
