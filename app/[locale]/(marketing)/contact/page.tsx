import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin, ShieldCheck, Award } from "lucide-react";
import ContactForm from "@/components/marketing/ContactForm";
import { getSubjects } from "@/app/actions/subject";
import { getSettings } from "@/app/actions/settings";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Contact");
  const subjects = await getSubjects();
  const settings = await getSettings();

  // Simple helper to prevent the brand name from being translated
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

  return (
    <div className="flex min-h-screen flex-col bg-white pt-20">
      {/* Header Section */}
      <section className="mx-auto sm:max-w-4xl px-4 sm:px-8 py-20 text-center">
        <h1 className="mb-6 text-3xl xl:text-5xl font-bold tracking-tight text-primary font-serif">
          {protectBrand(t("title"))}
        </h1>
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted leading-relaxed font-medium">
          {protectBrand(t("description"))}
        </p>
      </section>

      {/* Main Content */}
      <section className="bg-gray-100 pt-24">
        <section className="mx-auto grid max-w-7xl gap-10 md:gap-16 px-6 sm:px-8 pb-32 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-12">
            <div>
              <h2 className="mb-10 text-2xl font-bold text-primary font-montserrat tracking-tight">
                {t("directChannels")}
              </h2>
              <div className="flex flex-col gap-8">
                {/* Phone */}
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary text-white shadow-lg">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-1">
                      {t("phone")}
                    </p>
                    <p className="text-sm sm:text-lg xl:text-xl font-bold text-primary font-montserrat tracking-tight">
                      {settings?.supportPhone || "+4915731582988"}
                    </p>
                    <p className="mt-1 text-[13px] sm:text-sm text-muted font-medium">
                      {(locale === "de"
                        ? settings?.businessHours_de
                        : settings?.businessHours_en) || t("phoneHours")}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary text-white shadow-lg">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-1">
                      {t("email")}
                    </p>
                    <p className="text-sm sm:text-lg xl:text-xl font-bold text-primary font-montserrat tracking-tight">
                      {settings?.supportEmail ||
                        "info.zufriedeneverkaufe@gmail.com"}
                    </p>
                    <p className="mt-1 text-[13px] sm:text-sm text-muted font-medium">
                      {t("emailResponse")}
                    </p>
                  </div>
                </div>

                {/* Address */}
                {settings?.address && (
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary text-white shadow-lg">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-1">
                        {t("office")}
                      </p>
                      <p className="text-sm sm:text-lg xl:text-xl font-bold text-primary font-montserrat tracking-tight">
                        {settings.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Guarantee Box */}
            <div className="rounded bg-zinc-50 p-4 sm:p-8 border border-border">
              <h3 className="mb-6 text-lg font-bold text-primary font-montserrat tracking-tight">
                {t("guarantee")}
              </h3>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex items-center gap-2 rounded bg-secondary px-3 py-1.5 text-[10px] font-black text-white uppercase tracking-wider shadow-sm">
                    <ShieldCheck size={14} />
                    <span>{t("verified")}</span>
                  </div>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    {t("verifiedDesc")}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex items-center gap-2 rounded bg-accent/20 border border-accent/30 px-3 py-1.5 text-[10px] font-black text-accent uppercase tracking-wider">
                    <Award size={14} />
                    <span>{t("premiumSupport")}</span>
                  </div>
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    {t("premiumSupportDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <ContactForm subjects={subjects} />
        </section>
      </section>
    </div>
  );
}
