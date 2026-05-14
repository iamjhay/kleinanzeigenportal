"use client";

import { useState, useEffect } from "react";
import { Search, ChevronDown, Phone, HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import DynamicIcon from "@/components/ui/DynamicIcon";

// ─── Brand Protection Helper ──────────────────────────────────────────────────

const protectBrand = (text: string) => {
  const brand = "Zufriedene Verkäufe";
  if (!text.includes(brand)) return text;

  const parts = text.split(brand);
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span translate="no">{brand}</span>}
        </span>
      ))}
    </>
  );
};

// ─── Accordion Item ────────────────────────────────────────────────────────────

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded overflow-hidden bg-white hover:border-secondary/20 transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 sm:px-6 py-4 text-left text-sm font-bold font-montserrat text-primary hover:bg-zinc-50 transition-colors cursor-pointer"
      >
        <span>{protectBrand(q)}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 ml-4 text-muted transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-8 pb-6 sm:pb-8 text-sm leading-relaxed text-muted font-medium border-t border-border/50 pt-5">
          {protectBrand(a)}
        </div>
      </div>
    </div>
  );
}

// ─── Client Component ──────────────────────────────────────────────────────────

interface FaqItem {
  question_en: string;
  question_de: string;
  answer_en: string;
  answer_de: string;
}

interface Topic {
  _id: string;
  title_en: string;
  title_de: string;
  slug: string;
  icon?: string;
  faqs: FaqItem[];
}

interface FaqClientProps {
  topics: Topic[];
  locale: string;
}

export default function FaqClient({ topics, locale }: FaqClientProps) {
  const t = useTranslations("FAQs");
  const [activeTopic, setActiveTopic] = useState(topics[0]?.slug || "");
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveTopic(id);
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-150px 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTopic(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    topics.forEach((topic) => {
      const element = document.getElementById(topic.slug);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [topics]);

  // Localized Data Preparation
  const localizedSections = topics.map((topic) => ({
    id: topic.slug,
    title: locale === "de" ? topic.title_de : topic.title_en,
    icon: topic.icon || "HelpCircle",
    questions: topic.faqs.map((f) => ({
      q: locale === "de" ? f.question_de : f.question_en,
      a: locale === "de" ? f.answer_de : f.answer_en,
    })),
  }));

  const filteredSections = localizedSections
    .map((section) => ({
      ...section,
      questions: section.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((section) => section.questions.length > 0);

  return (
    <div className="flex min-h-screen flex-col bg-background pt-20">
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #001226 0%, #002147 60%, #003366 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[120px]" />
          <div className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-3xl animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 leading-tight tracking-tight">
            {protectBrand(t("title"))}
          </h1>
          <p className="text-lg text-white/70 mb-12 leading-relaxed max-w-2xl mx-auto">
            {protectBrand(t("description"))}
          </p>

          <div className="flex items-center gap-2 bg-white rounded-full pl-5 pr-1.5 py-1.5 shadow-2xl max-w-2xl mx-auto ring-1 ring-white/10 group focus-within:ring-secondary/50 transition-all">
            <Search
              size={22}
              className="text-muted/50 shrink-0 group-focus-within:text-secondary transition-colors"
            />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 py-3.5 bg-transparent text-base text-primary placeholder:text-muted/40 focus:outline-none font-medium"
            />
            <button className="bg-secondary text-white text-sm font-semibold font-mono uppercase tracking-widest px-10 py-3.5 rounded-full hover:bg-primary transition-all shrink-0 cursor-pointer shadow-lg shadow-secondary/20">
              {t("searchButton")}
            </button>
          </div>
        </div>
      </section>

      {/* Mobile Topics Bar */}
      <div className="sticky top-16 z-40 block bg-white/95 backdrop-blur-md border-b border-gray-100 md:hidden overflow-x-auto no-scrollbar shadow-sm">
        <div className="flex px-6 py-5 gap-3 min-w-max">
          {localizedSections.map((topic) => (
            <button
              key={topic.id}
              onClick={() => scrollToSection(topic.id)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${
                activeTopic === topic.id
                  ? "bg-secondary text-white border-secondary shadow-lg shadow-secondary/20"
                  : "bg-gray-50 text-muted border-gray-200"
              }`}
            >
              <DynamicIcon name={topic.icon} size={14} />
              {topic.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-1 bg-[#F8F9FA] py-20">
        <div className="mx-auto max-w-[1400px] px-6 flex flex-col md:flex-row gap-16 items-start">
          {/* Sidebar */}
          <aside className="hidden md:flex flex-col gap-6 w-80 shrink-0 sticky top-32">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-4">
              {t("topics")}
            </p>
            <nav className="flex flex-col gap-2.5">
              {localizedSections.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => scrollToSection(topic.id)}
                  className={`flex items-center text-left gap-4 rounded px-4 py-2 text-sm font-bold transition-all cursor-pointer border group ${
                    activeTopic === topic.id
                      ? "border-secondary bg-white text-secondary shadow-xl shadow-secondary/5"
                      : "border-transparent bg-transparent text-muted hover:bg-white hover:text-secondary hover:border-gray-100"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full transition-colors ${activeTopic === topic.id ? "bg-secondary/10 text-secondary" : "bg-gray-100 text-gray-400 group-hover:bg-secondary/10 group-hover:text-secondary"}`}
                  >
                    <DynamicIcon name={topic.icon} size={18} />
                  </div>
                  {topic.title}
                </button>
              ))}
            </nav>

            <div className="mt-10 rounded bg-[#001226] p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Phone size={80} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                    <Phone size={20} />
                  </div>
                  <p className="font-black text-lg uppercase tracking-tight">
                    {t("needHelp")}
                  </p>
                </div>
                <p className="text-sm text-white/60 mb-8 leading-relaxed font-medium">
                  {t("conciergeService")}
                </p>
                <a
                  href="/contact"
                  className="block w-full text-center rounded-xl bg-secondary py-4 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-primary transition-all shadow-xl shadow-secondary/20"
                >
                  {t("contactUs")}
                </a>
              </div>
            </div>
          </aside>

          {/* FAQ Sections */}
          <div className="flex-1 flex flex-col gap-8 min-w-0">
            {filteredSections.length === 0 ? (
              <div className="text-center py-32 bg-white rounded border border-dashed border-gray-200">
                <Search size={64} className="mx-auto mb-6 text-gray-100" />
                <p className="text-2xl font-black text-primary uppercase tracking-tight">
                  {t("noResults")}
                </p>
                <p className="text-sm text-muted mt-2 font-medium">
                  {t("noResultsDesc")}
                </p>
              </div>
            ) : (
              filteredSections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32 animate-in fade-in duration-700"
                >
                  <div className="flex items-center gap-5 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary border border-gray-100 shadow-xl shadow-gray-200/50 text-white">
                      <DynamicIcon name={section.icon} size={28} />
                    </div>
                    <h2 className="text-xl font-black font-montserrat text-primary uppercase tracking-tight">
                      {protectBrand(section.title)}
                    </h2>
                  </div>

                  <div className="flex flex-col gap-3">
                    {section.questions.map((item, idx) => (
                      <AccordionItem key={idx} q={item.q} a={item.a} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="bg-white border-t border-gray-100 py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-secondary/50 via-transparent to-primary/50" />
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-black text-primary uppercase tracking-tight mb-4">
              {t("stillQuestions")}
            </h3>
            <p className="text-lg text-muted font-medium max-w-xl">
              {t("stillQuestionsDesc")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full md:w-auto">
            <a
              href="#"
              className="w-full sm:w-auto text-center rounded-full border-2 border-gray-100 bg-white px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-primary hover:border-secondary hover:text-secondary transition-all shadow-sm"
            >
              {t("helpCenter")}
            </a>
            <a
              href="#"
              className="w-full sm:w-auto text-center rounded-full bg-primary px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-[#b5e941] shadow-2xl shadow-primary/20 hover:scale-105 transition-all border border-[#b5e941]"
            >
              {t("submitTicket")}
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
}
