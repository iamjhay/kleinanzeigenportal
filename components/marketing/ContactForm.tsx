"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Send, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { submitLead, ContactFormState } from "@/app/actions/lead";
import { ContactSchema } from "@/lib/validations";
import { useToast } from "@/hooks/useToast";
import Toaster from "@/components/ui/Toaster";

type FieldErrors = Partial<Record<string, string>>;

interface Subject {
  _id: string;
  label: string;
  value: string;
}

interface ContactFormProps {
  subjects: Subject[];
}

export default function ContactForm({ subjects }: ContactFormProps) {
  const t = useTranslations("Contact");
  const { addToast } = useToast();
  const [state, formAction] = useActionState<ContactFormState, FormData>(
    submitLead,
    {},
  );
  const [isPending, startTransition] = useTransition();
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (name: string, value: string) => {
    const partial =
      ContactSchema.shape[name as keyof typeof ContactSchema.shape];
    if (!partial) return;
    const result = partial.safeParse(value);
    setClientErrors((prev) => {
      const next = { ...prev };
      if (result.success) {
        delete next[name];
      } else {
        next[name] = result.error.issues[0].message;
      }
      return next;
    });
  };

  useEffect(() => {
    if (state.success) {
      addToast(
        "success",
        "Message Sent!",
        "We'll get back to you within 24 hours.",
      );
      formRef.current?.reset();
      setClientErrors({});
    } else if (state.error) {
      addToast("error", "Submission failed", state.error);
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      firstName:
        (form.elements.namedItem("firstName") as HTMLInputElement)?.value ?? "",
      lastName:
        (form.elements.namedItem("lastName") as HTMLInputElement)?.value ?? "",
      email:
        (form.elements.namedItem("email") as HTMLInputElement)?.value ?? "",
      phone:
        (form.elements.namedItem("phone") as HTMLInputElement)?.value ?? "",
      subject:
        (form.elements.namedItem("subject") as HTMLSelectElement)?.value ?? "",
      message:
        (form.elements.namedItem("message") as HTMLTextAreaElement)?.value ??
        "",
    };

    const result = ContactSchema.safeParse(data);
    if (!result.success) {
      const errors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!errors[field]) errors[field] = issue.message;
      }
      setClientErrors(errors);
      return;
    }

    setClientErrors({});
    startTransition(() => formAction(new FormData(form)));
  };

  const fieldError = (field: string) =>
    clientErrors[field] || state.fieldErrors?.[field];

  return (
    <div className="rounded border border-border bg-white px-4 py-8 sm:p-10 shadow-2xl">
      <div className="mb-10">
        <h2 className="mb-2 text-2xl font-bold text-primary font-montserrat tracking-tight">
          {t("sendMessage")}
        </h2>
        <p className="text-sm text-muted">{t("formDesc")}</p>
      </div>

      <form
        ref={formRef}
        action={formAction}
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        {/* Name Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              {t("firstName")}
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="John"
              onChange={(e) => validateField("firstName", e.target.value)}
              className={`rounded border px-5 py-3 text-sm placeholder:text-muted/40 focus:border-primary focus:outline-none transition-colors ${
                fieldError("firstName")
                  ? "border-red-300 bg-red-50/30"
                  : "border-border"
              }`}
            />
            {fieldError("firstName") && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-100 text-red-500 inline-flex items-center justify-center text-[8px] font-black shrink-0">
                  !
                </span>
                {fieldError("firstName")}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              {t("lastName")}
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              onChange={(e) => validateField("lastName", e.target.value)}
              className={`rounded border px-5 py-3 text-sm placeholder:text-muted/40 focus:border-primary focus:outline-none transition-colors ${
                fieldError("lastName")
                  ? "border-red-300 bg-red-50/30"
                  : "border-border"
              }`}
            />
            {fieldError("lastName") && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-100 text-red-500 inline-flex items-center justify-center text-[8px] font-black shrink-0">
                  !
                </span>
                {fieldError("lastName")}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              {t("emailAddress")}
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              onChange={(e) => validateField("email", e.target.value)}
              className={`rounded border px-5 py-3 text-sm placeholder:text-muted/40 focus:border-primary focus:outline-none transition-colors ${
                fieldError("email")
                  ? "border-red-300 bg-red-50/30"
                  : "border-border"
              }`}
            />
            {fieldError("email") && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-100 text-red-500 inline-flex items-center justify-center text-[8px] font-black shrink-0">
                  !
                </span>
                {fieldError("email")}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              {t("phone")}
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+49..."
              onChange={(e) => validateField("phone", e.target.value)}
              className={`rounded border px-5 py-3 text-sm placeholder:text-muted/40 focus:border-primary focus:outline-none transition-colors ${
                fieldError("phone")
                  ? "border-red-300 bg-red-50/30"
                  : "border-border"
              }`}
            />
          </div>
        </div>

        {/* Dynamic Subject */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            {t("subject")}
          </label>
          <div className="relative">
            <select
              name="subject"
              className="w-full appearance-none rounded border border-border px-5 py-3 text-sm focus:border-primary focus:outline-none transition-colors bg-white"
            >
              <option value="">
                {t("selectSubject") || "Select a subject..."}
              </option>
              {subjects.map((s) => (
                <option key={s._id} value={s.label}>
                  {s.label}
                </option>
              ))}
              {/* Fallback if no subjects in DB */}
              {subjects.length === 0 && (
                <>
                  <option>{t("subjects.verification")}</option>
                  <option>{t("subjects.listing")}</option>
                  <option>{t("subjects.technical")}</option>
                  <option>{t("subjects.general")}</option>
                </>
              )}
            </select>
            <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-muted">
              <ChevronRight size={16} className="rotate-90" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            {t("message")}
          </label>
          <textarea
            rows={4}
            name="message"
            placeholder={t("messagePlaceholder")}
            onChange={(e) => validateField("message", e.target.value)}
            className={`rounded border px-5 py-4 text-sm placeholder:text-muted/40 focus:border-primary focus:outline-none transition-colors resize-none ${
              fieldError("message")
                ? "border-red-300 bg-red-50/30"
                : "border-border"
            }`}
          />
          {fieldError("message") && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-red-100 text-red-500 inline-flex items-center justify-center text-[8px] font-black shrink-0">
                !
              </span>
              {fieldError("message")}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center gap-3 rounded bg-[#000913] py-5 text-[12px] font-black text-white uppercase tracking-[0.25em] shadow-xl hover:bg-primary transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span>{isPending ? "Sending..." : t("sendEnquiry")}</span>
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
