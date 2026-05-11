"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import {
  Search,
  ChevronDown,
  BadgeCheck,
  CreditCard,
  Truck,
  Tag,
  Phone,
} from "lucide-react";

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
    <div className="border border-border rounded overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left text-[15px] sm:text-base font-medium text-foreground hover:bg-zinc-50 transition-colors cursor-pointer"
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
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-6 pb-5 sm:pb-6 text-[14px] sm:text-[15px] leading-relaxed text-muted font-medium border-t border-border/50 pt-4">
          {protectBrand(a)}
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function FAQsPage() {
  const t = useTranslations("FAQs");
  const locale = useLocale();
  const [activeTopic, setActiveTopic] = useState("verification");
  const [searchQuery, setSearchQuery] = useState("");

  const topics = [
    {
      id: "verification",
      label: t("sections.verification"),
      icon: <BadgeCheck size={18} />,
    },
    {
      id: "payments",
      label: t("sections.payments"),
      icon: <CreditCard size={18} />,
    },
    {
      id: "shipping",
      label: t("sections.shipping"),
      icon: <Truck size={18} />,
    },
    {
      id: "selling",
      label: t("sections.selling"),
      icon: <Tag size={18} />,
    },
  ];

  const faqSectionsEn = [
    {
      id: "verification",
      title: "Identity & Trust Verification",
      icon: <BadgeCheck size={28} className="text-secondary" />,
      questions: [
        {
          q: 'What does the "100% Verified Premium" badge mean?',
          a: 'The "100% Verified Premium" badge indicates that a seller has completed our full identity verification process — including government ID check, address confirmation, and phone verification. It signals to buyers that the seller is a trusted, authenticated member of our platform.',
        },
        {
          q: "How do I verify my own account?",
          a: "To verify your account, navigate to your Profile Settings and click on 'Start Verification'. You will need to upload a valid government-issued ID and a recent selfie. Our team reviews submissions within 24–48 hours.",
        },
        {
          q: "Is my personal data safe during verification?",
          a: "Absolutely. All documents are encrypted in transit and at rest. We use bank-grade security and are fully compliant with GDPR. Your data is never sold or shared with third parties.",
        },
      ],
    },
    {
      id: "payments",
      title: "Secure Payments",
      icon: <CreditCard size={28} className="text-accent" />,
      questions: [
        {
          q: "What payment methods are supported?",
          a: "We support all major credit and debit cards (Visa, Mastercard, American Express), PayPal, SEPA bank transfers, and Apple Pay / Google Pay. Cryptocurrency payments are available for select high-value transactions.",
        },
        {
          q: "Is there a buyer protection fee?",
          a: "Yes, a small buyer protection fee of 1.5% (minimum €2) is applied per transaction. This covers our escrow service, dispute resolution, and insurance for items valued over €500.",
        },
        {
          q: "How long does payment take to reach the seller?",
          a: "Funds are held in escrow until the buyer confirms delivery. Once confirmed (or after 5 business days with no dispute), payment is released to the seller's account within 1–2 business days.",
        },
      ],
    },
    {
      id: "shipping",
      title: "White-Glove Shipping",
      icon: <Truck size={28} className="text-primary" />,
      questions: [
        {
          q: "How does the premium shipping service work?",
          a: "Our white-glove shipping partners collect items directly from the seller, professionally package them, and deliver them to the buyer with full tracking. For items over €1,000, insurance is included automatically.",
        },
        {
          q: "Can I track my high-value shipment?",
          a: "Yes. All shipments through our platform include real-time tracking. You will receive email and SMS notifications at each stage — pickup, transit, and delivery confirmation.",
        },
        {
          q: "What happens if my item arrives damaged?",
          a: "If an item arrives damaged, open a dispute within 48 hours via your order dashboard. Attach photos and our team will investigate. Insured shipments are typically refunded within 5 business days.",
        },
      ],
    },
    {
      id: "selling",
      title: "Selling on Zufriedene Verkäufe",
      icon: <Tag size={28} className="text-secondary" />,
      questions: [
        {
          q: "How do I list an item for sale?",
          a: "Click 'Post an Ad' in the navigation, fill in the item details, upload high-quality photos, set your price, and publish. Your listing goes live immediately after passing our automated content review.",
        },
        {
          q: "Are there any listing fees?",
          a: "Basic listings are free. Premium placements (featured on the homepage, category highlights) start at €4.99. A 3% success fee is deducted from the sale price once a transaction completes.",
        },
      ],
    },
  ];

  const faqSectionsDe = [
    {
      id: "verification",
      title: "Identitäts- & Vertrauensprüfung",
      icon: <BadgeCheck size={28} className="text-secondary" />,
      questions: [
        {
          q: 'Was bedeutet das "100% Verifiziert Premium"-Abzeichen?',
          a: "Das Abzeichen zeigt an, dass ein Verkäufer unseren vollständigen Identitätsprüfprozess abgeschlossen hat – einschließlich Ausweisprüfung, Adressbestätigung und Telefonverifizierung. Es signalisiert Käufern, dass der Verkäufer ein vertrauenswürdiges, authentifiziertes Mitglied unserer Plattform ist.",
        },
        {
          q: "Wie verifiziere ich mein eigenes Konto?",
          a: "Um Ihr Konto zu verifizieren, gehen Sie zu Ihren Profileinstellungen und klicken Sie auf 'Verifizierung starten'. Sie müssen einen gültigen amtlichen Lichtbildausweis hochladen und ein aktuelles Selfie machen. Unser Team prüft die Einreichungen innerhalb von 24–48 Stunden.",
        },
        {
          q: "Sind meine persönlichen Daten während der Verifizierung sicher?",
          a: "Absolut. Alle Dokumente werden während der Übertragung und im Ruhezustand verschlüsselt. Wir verwenden bankübliche Sicherheit und sind vollumfänglich DSGVO-konform. Ihre Daten werden niemals an Dritte verkauft oder weitergegeben.",
        },
      ],
    },
    {
      id: "payments",
      title: "Sichere Zahlungen",
      icon: <CreditCard size={28} className="text-accent" />,
      questions: [
        {
          q: "Welche Zahlungsmethoden werden unterstützt?",
          a: "Wir unterstützen alle gängigen Kredit- und Debitkarten (Visa, Mastercard, American Express), PayPal, SEPA-Banküberweisungen sowie Apple Pay / Google Pay. Kryptowährungszahlungen sind für ausgewählte hochwertige Transaktionen verfügbar.",
        },
        {
          q: "Gibt es eine Käuferschutzgebühr?",
          a: "Ja, pro Transaktion wird eine kleine Käuferschutzgebühr von 1,5% (mindestens 2 €) erhoben. Diese deckt unseren Treuhandservice, die Streitbeilegung und die Versicherung für Artikel im Wert von über 500 € ab.",
        },
        {
          q: "Wie lange dauert es, bis die Zahlung den Verkäufer erreicht?",
          a: "Die Gelder werden auf einem Treuhandkonto verwaltet, bis der Käufer die Lieferung bestätigt. Nach der Bestätigung (oder nach 5 Werktagen ohne Streitfall) wird die Zahlung innerhalb von 1–2 Werktagen auf das Konto des Verkäufers freigegeben.",
        },
      ],
    },
    {
      id: "shipping",
      title: "Premium-Versand",
      icon: <Truck size={28} className="text-primary" />,
      questions: [
        {
          q: "Wie funktioniert der Premium-Versandservice?",
          a: "Unsere Versandpartner holen die Artikel direkt beim Verkäufer ab, verpacken sie professionell und liefern sie mit vollständiger Sendungsverfolgung an den Käufer. Für Artikel über 1.000 € ist eine Versicherung automatisch enthalten.",
        },
        {
          q: "Kann ich meine hochwertige Sendung verfolgen?",
          a: "Ja. Alle Sendungen über unsere Plattform verfügen über Echtzeit-Tracking. Sie erhalten E-Mail- und SMS-Benachrichtigungen in jeder Phase – Abholung, Transit und Zustellbestätigung.",
        },
        {
          q: "Was passiert, wenn mein Artikel beschädigt ankommt?",
          a: "Wenn ein Artikel beschädigt ankommt, eröffnen Sie innerhalb von 48 Stunden einen Streitfall über Ihr Bestell-Dashboard. Fügen Sie Fotos bei und unser Team wird die Untersuchung einleiten. Versicherte Sendungen werden in der Regel innerhalb von 5 Werktagen erstattet.",
        },
      ],
    },
    {
      id: "selling",
      title: "Verkaufen auf Zufriedene Verkäufe",
      icon: <Tag size={28} className="text-secondary" />,
      questions: [
        {
          q: "Wie stelle ich einen Artikel zum Verkauf ein?",
          a: "Klicken Sie in der Navigation auf 'Anzeige aufgeben', füllen Sie die Artikeldetails aus, laden Sie hochwertige Fotos hoch, legen Sie Ihren Preis fest und veröffentlichen Sie die Anzeige. Ihr Inserat geht sofort online, nachdem es unsere automatisierte Inhaltsprüfung bestanden hat.",
        },
        {
          q: "Gibt es Einstellgebühren?",
          a: "Basiseinträge sind kostenlos. Premium-Platzierungen (Hervorhebung auf der Startseite, Kategorie-Highlights) beginnen bei 4,99 €. Eine Erfolgsgebühr von 3% wird vom Verkaufspreis abgezogen, sobald eine Transaktion abgeschlossen ist.",
        },
      ],
    },
  ];

  const faqSections = locale === "de" ? faqSectionsDe : faqSectionsEn;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Navbar height + some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveTopic(id);
    }
  };

  // Intersection Observer to highlight active topic on scroll
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
      const element = document.getElementById(topic.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [topics]);

  const filteredSections = faqSections.filter((section) =>
    section.questions.some(
      (q) =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  return (
    <div className="flex min-h-screen flex-col bg-background pt-20">
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{
          background:
            "linear-gradient(135deg, #001226 0%, #002147 60%, #003366 100%)",
        }}
      >
        {/* Decorative background accent */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            {protectBrand(t("title"))}
          </h1>
          <p className="text-lg text-white/70 mb-10 leading-relaxed">
            {protectBrand(t("description"))}
          </p>

          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-white rounded pl-4 pr-1 py-1 shadow-xl max-w-xl mx-auto">
            <Search size={20} className="text-muted shrink-0" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 py-3 bg-transparent text-sm text-foreground placeholder:text-muted/60 focus:outline-none font-montserrat"
            />
            <button className="bg-primary text-white text-sm font-bold px-8 py-3 rounded hover:opacity-90 transition-opacity shrink-0 cursor-pointer">
              {t("searchButton")}
            </button>
          </div>
        </div>
      </section>

      {/* Mobile Topics Bar (Sticky) */}
      <div className="sticky top-20 z-40 block bg-white/90 backdrop-blur-md border-b border-border md:hidden overflow-x-auto no-scrollbar">
        <div className="flex px-6 py-4 gap-3 min-w-max">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => scrollToSection(topic.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-bold whitespace-nowrap transition-all border ${
                activeTopic === topic.id
                  ? "bg-secondary text-white border-secondary"
                  : "bg-gray-50 text-muted border-gray-200"
              }`}
            >
              {topic.icon}
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-1 bg-zinc-50 py-16">
        <div className="mx-auto max-w-[1300px] px-6 flex gap-20 items-start">
          {/* Sidebar (Desktop Only) */}
          <aside className="hidden md:flex flex-col gap-4 w-72 shrink-0 sticky top-28">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2 font-montserrat">
              {t("topics")}
            </p>
            <nav className="flex flex-col gap-2">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => scrollToSection(topic.id)}
                  className={`flex items-center text-left gap-4 rounded border px-5 py-4 text-sm font-bold transition-all cursor-pointer ${
                    activeTopic === topic.id
                      ? "border-primary bg-white text-primary shadow-md"
                      : "border-transparent bg-transparent text-muted hover:bg-white/50 hover:text-primary"
                  }`}
                >
                  {topic.icon}
                  {topic.label}
                </button>
              ))}
            </nav>

            {/* Live Help Card */}
            <div className="mt-8 rounded bg-primary p-7 text-white shadow-xl shadow-primary/10">
              <div className="flex items-center gap-3 mb-3">
                <Phone size={20} className="text-secondary" />
                <p className="font-bold text-lg font-montserrat tracking-tight">
                  {t("needHelp")}
                </p>
              </div>
              <p className="text-sm text-white/70 mb-6 leading-relaxed">
                {t("conciergeService")}
              </p>
              <Link
                href="/contact"
                className="block w-full text-center rounded bg-secondary py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-lg shadow-secondary/20"
              >
                {t("contactUs")}
              </Link>
            </div>
          </aside>

          {/* FAQ Sections */}
          <div className="flex-1 flex flex-col gap-10 min-w-0">
            {filteredSections.length === 0 ? (
              <div className="text-center py-20 text-muted">
                <Search size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-xl font-bold font-montserrat text-foreground">
                  {t("noResults")}
                </p>
                <p className="text-sm mt-2">{t("noResultsDesc")}</p>
              </div>
            ) : (
              filteredSections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32 transition-opacity duration-500"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 border border-border shadow-sm">
                        {section.icon}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-primary font-serif tracking-tight">
                        {protectBrand(section.title)}
                      </h2>
                    </div>
                  </div>

                  {/* Accordion Items */}
                  <div className="flex flex-col gap-2">
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

      {/* Bottom CTA */}
      <section className="bg-zinc-100 border-t border-border py-16 sm:px-6">
        <div className="mx-auto max-w-[1300px] px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl font-bold text-foreground font-montserrat tracking-tight">
              {t("stillQuestions")}
            </h3>
            <p className="text-base text-muted mt-2 font-medium">
              {t("stillQuestionsDesc")}
            </p>
          </div>
          <div className="flex sm:flex-row flex-col items-center gap-4 shrink-0 w-full sm:w-auto">
            <Link
              href="#"
              className="flex-1 w-full sm:w-auto sm:flex-none text-center rounded border border-border bg-white px-8 py-4 text-sm font-bold text-foreground hover:bg-zinc-50 transition-colors shadow-sm"
            >
              {t("helpCenter")}
            </Link>
            <Link
              href="#"
              className="flex-1 w-full sm:w-auto sm:flex-none text-center rounded bg-secondary px-8 py-4 text-sm font-bold text-white shadow-lg shadow-secondary/20 hover:opacity-90 transition-opacity"
            >
              {t("submitTicket")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
