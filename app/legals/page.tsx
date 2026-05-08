"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Scale,
  Download,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Lock,
  Cookie,
  Copyright,
  Info,
  CreditCard,
} from "lucide-react";

// ─── Content Data ─────────────────────────────────────────────────────────────

const legalContent: { [key: string]: any } = {
  tos: {
    title: "Terms & Purchase Policy",
    lastUpdated: "October 24, 2024",
    sections: [
      {
        title: "Seller Identity",
        content:
          "Kleinanzeigenportal is the sole owner, operator, and seller of all products listed on this platform. No third-party sellers are permitted.",
      },
      {
        title: "Product Authenticity",
        content:
          "All items sold on Kleinanzeigenportal are original, genuine, and verified. The company maintains full responsibility for product sourcing, quality control, and listing accuracy.",
      },
      {
        title: "Product Information",
        content:
          "Kleinanzeigenportal strives to provide accurate product descriptions, images, and specifications. Minor variations may occur but do not affect the authenticity or core quality of the item.",
      },
      {
        title: "Payments",
        content:
          "Kleinanzeigenportal accepts secure online payments through approved payment channels. All transactions are encrypted and processed in compliance with applicable security standards.",
      },
      {
        title: "Installment Payments",
        content:
          "Eligible customers may opt for instalment payment plans, subject to Kleinanzeigenportal instalment terms and approval conditions. Ownership or delivery terms may vary based on payment completion.",
      },
      {
        title: "Customer Responsibility",
        content:
          "Customers are advised to review product details carefully before completing a purchase. By proceeding with payment, the customer agrees to Kleinanzeigenportal terms and conditions.",
      },
      {
        title: "Customer Support",
        content:
          "Kleinanzeigenportal provides customer support to assist with inquiries, payments, and post-purchase concerns within reasonable service timelines. Kleinanzeigenportal reserves the right to amend these terms at any time without prior notice.",
      },
      {
        title: "Termination",
        content:
          "Kleinanzeigenportal may suspend or terminate access immediately, without notice, if these Terms are violated. Termination does not waive Kleinanzeigenportal legal rights or remedies.",
      },
      {
        title: "Force Majeure",
        content:
          "Kleinanzeigenportal shall not be liable for failure or delay in performance caused by events beyond reasonable control, including natural disasters, governmental actions, or system failures.",
      },
      {
        title: "Governing Law & Jurisdiction",
        content:
          "This Agreement shall be governed by and construed in accordance with the laws applicable in the jurisdiction where Kleinanzeigenportal operates. Courts of competent jurisdiction shall have exclusive authority over disputes.",
      },
      {
        title: "Severability",
        content:
          "If any provision of this Agreement is found unenforceable, the remaining provisions shall remain in full force and effect.",
      },
      {
        title: "Entire Agreement",
        content:
          "These Terms constitute the entire agreement between you and supersede all prior agreements or understandings.",
      },
      {
        title: "Contact",
        content:
          "All legal notices or inquiries must be directed through Kleinanzeigenportal official communication channels listed on the website.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "October 12, 2024",
    sections: [
      {
        title: "Introduction",
        content:
          "Kleinanzeigenportal is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and safeguard your personal information when you use our website or services.",
      },
      {
        title: "Information we collect",
        content:
          "We may collect the following information: Full name, Contact details (email address, phone number), Billing and payment information, Order and transaction history, Device and usage data (for security and performance).",
      },
      {
        title: "How we use your information",
        content:
          "Your information is used to: Process orders and payments, Manage instalment plans, Provide customer support, Improve our services and user experience, Comply with legal and regulatory requirements.",
      },
      {
        title: "Payment security",
        content:
          "All payment transactions are processed through secure, encrypted systems. Kleinanzeigenportal does not store sensitive card details beyond what is necessary for transaction processing and compliance.",
      },
      {
        title: "Data protection",
        content:
          "We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss, or misuse.",
      },
      {
        title: "Information sharing",
        content:
          "Kleinanzeigenportal does not sell or rent customer data. Information may only be shared with: Trusted payment processors, Legal authorities when required by law, and Service providers strictly for operational purposes.",
      },
      {
        title: "Cookies and tracking",
        content:
          "Kleinanzeigenportal may use cookies to enhance site functionality, analyze traffic, and improve user experience. You may manage cookie preferences through your browser settings.",
      },
      {
        title: "Your rights",
        content:
          "Customers have the right to: Access their personal data, Request correction or deletion, Withdraw consent where applicable. Requests can be made through Kleinanzeigenportal customer support.",
      },
      {
        title: "Policy updates",
        content:
          "Kleinanzeigenportal reserves the right to update this Privacy Policy at any time. Changes will take effect immediately upon posting on the website. By using Kleinanzeigenportal, you agree to this Privacy Policy.",
      },
    ],
  },
  cookies: {
    title: "Cookies Policy",
    lastUpdated: "September 05, 2024",
    sections: [
      {
        title: "Introduction",
        content:
          "This Cookies Policy explains how Kleinanzeigenportal uses cookies and similar technologies when you visit our website. By continuing to use our website, you consent to the use of cookies in accordance with this policy.",
      },
      {
        title: "What are cookies?",
        content:
          "Cookies are small text files stored on your device (computer, tablet, or mobile phone) when you visit a website. They help improve functionality, enhance user experience, and provide insights into how the website is used.",
      },
      {
        title: "Types of cookies we use",
        content:
          "a. Essential cookies: Necessary for the website to function properly. b. Performance and analytics cookies: Help us understand visitor interaction. c. Functional cookies: Remember your preferences. d. Security cookies: Detect suspicious activity and protect accounts.",
      },
      {
        title: "How we use cookies",
        content:
          "Kleinanzeigenportal uses cookies to: Ensure website functionality, Process secure transactions, Improve website performance, Enhance user experience, and Protect against fraud and abuse.",
      },
      {
        title: "Third-party cookies",
        content:
          "Some cookies may be placed by trusted third-party service providers, such as payment processors or analytics services, strictly for operational and performance purposes. Kleinanzeigenportal does not control these cookies directly.",
      },
      {
        title: "Managing cookies",
        content:
          "You can control or disable cookies through your browser settings. Please note that disabling certain cookies may affect website functionality and your ability to complete transactions.",
      },
      {
        title: "Data protection",
        content:
          "Any personal data collected through cookies is handled in accordance with the Kleinanzeigenportal Privacy Policy. We do not use cookies to collect sensitive personal information without your consent.",
      },
      {
        title: "Policy updates",
        content:
          "Kleinanzeigenportal reserves the right to update this Cookies Policy at any time. Changes will take effect immediately upon publication on the website.",
      },
    ],
  },
  copyright: {
    title: "Copyright Infringement Policy",
    lastUpdated: "August 20, 2024",
    sections: [
      {
        title: "Introduction",
        content:
          "Kleinanzeigenportal respects intellectual property rights and is committed to complying with applicable copyright laws. This policy outlines how Kleinanzeigenportal handles copyright ownership, usage, and infringement concerns related to content and products on the platform.",
      },
      {
        title: "Ownership of content",
        content:
          "Unless otherwise stated, all content on the Kleinanzeigenportal website—including but not limited to: Text, Images, Product descriptions, Logos, Graphics, Design elements—is the exclusive property of Kleinanzeigenportal and is protected by copyright and other intellectual property laws.",
      },
      {
        title: "Authorized use",
        content:
          "Users may view, browse, and purchase products on Kleinanzeigenportal for personal, non-commercial use only. Any reproduction, redistribution, modification, copying, or commercial use of Kleinanzeigenportal content without prior written consent is strictly prohibited.",
      },
      {
        title: "Prohibited activities",
        content:
          "The following actions are not permitted: Copying or republishing Kleinanzeigenportal content on other websites or platforms; Using Kleinanzeigenportal images or descriptions for resale, advertising, or marketing; Framing, scraping, or extracting content for commercial purposes; Any use that infringes on Kleinanzeigenportal intellectual property rights.",
      },
      {
        title: "Reporting copyright infringement",
        content:
          "If you believe that any content on Kleinanzeigenportal infringes upon your copyright, you may submit a written notice containing: Identification of the copyrighted work, Description of the allegedly infringing material, Proof of ownership or authorization, and Your contact information. Kleinanzeigenportal will review all valid claims and take appropriate action where necessary.",
      },
      {
        title: "Action on infringement",
        content:
          "Upon confirmation of infringement, Kleinanzeigenportal reserves the right to: Remove or modify the infringing content, Restrict access to affected materials, and Take legal action where appropriate.",
      },
      {
        title: "False claims",
        content:
          "Submitting false or misleading copyright infringement claims may result in legal consequences. Claimants are responsible for ensuring the accuracy of their reports.",
      },
      {
        title: "Policy updates",
        content:
          "Kleinanzeigenportal reserves the right to amend this Copyright Infringement Policy at any time. Updates will be effective immediately upon publication on the website.",
      },
    ],
  },
  installment: {
    title: "Installment Payment Agreement Policy",
    lastUpdated: "November 01, 2024",
    sections: [
      {
        title: "Agreement Acceptance",
        content:
          "By selecting an installment payment option, the customer confirms acceptance of this Installment Payment Agreement and agrees to comply fully with its terms.",
      },
      {
        title: "1. Eligibility",
        content:
          "Kleinanzeigenportal may offer installment payment options to eligible customers at its sole discretion. Eligibility may depend on product type, purchase value, and other internal criteria determined by Kleinanzeigenportal.",
      },
      {
        title: "2. Payment Structure",
        content:
          "Customers choosing an installment plan agree to pay the total purchase price in scheduled installments as clearly stated at checkout or in the payment agreement. The installment amount, frequency, and duration will be disclosed before confirmation.",
      },
      {
        title: "3. Ownership and Delivery",
        content:
          "Unless otherwise stated, ownership of the purchased item remains with Kleinanzeigenportal until full payment has been completed. Delivery, usage, or possession terms may vary based on the selected installment plan.",
      },
      {
        title: "4. Late or Missed Payments",
        content:
          "Failure to make payments on the agreed dates may result in: Suspension of delivery or service, Cancellation of the installment plan, Additional charges or penalties where applicable. Kleinanzeigenportal reserves the right to take appropriate action in cases of repeated default.",
      },
      {
        title: "5. Cancellation and Refunds",
        content:
          "Installment purchases are subject to Kleinanzeigenportal refund and return policies. Any refunds approved will be processed after deducting applicable usage fees, administrative charges, or amounts already due.",
      },
    ],
  },
};

const legalLinks = [
  { id: "tos", name: "Terms of Service", icon: <ShieldCheck size={18} /> },
  { id: "privacy", name: "Privacy Policy", icon: <Lock size={18} /> },
  { id: "cookies", name: "Cookies Policy", icon: <Cookie size={18} /> },
  { id: "copyright", name: "Copyright Policy", icon: <Copyright size={18} /> },
  {
    id: "installment",
    name: "Installment Policy",
    icon: <CreditCard size={18} />,
  },
  { id: "imprint", name: "Imprint", icon: <Info size={18} /> },
];

export default function LegalsPage() {
  const [activeTab, setActiveTab] = useState("tos");

  // Handlers for Imprint which is not in the data structure
  const content =
    activeTab === "imprint"
      ? {
          title: "Imprint",
          lastUpdated: "July 15, 2024",
          sections: [
            {
              title: "Legal Information",
              content:
                "Kleinanzeigenportal GmbH is a registered company in Berlin, Germany. Managing Directors: John Doe, Jane Smith. Registration Number: HRB 123456.",
            },
          ],
        }
      : legalContent[activeTab];

  return (
    <div className="flex min-h-screen flex-col bg-white pt-20">
      {/* Header Section */}
      <section className="mx-auto max-w-4xl px-6 sm:px-8 py-20 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-wider text-secondary border border-secondary/20">
            <Shield size={14} />
            <span>Trust & Compliance</span>
          </div>
        </div>
        <h1 className="mb-6 text-4xl md:text-5xl font-bold tracking-tight text-primary font-serif">
          Legal Framework
        </h1>
        <p className="mx-auto max-w-2xl text-base md:text-lg text-muted leading-relaxed font-medium">
          Our commitment to transparency ensures that every interaction on
          Kleinanzeigenportal is governed by the highest standards of European
          digital safety and legal integrity.
        </p>
      </section>

      {/* Mobile Sticky Horizontal Nav */}
      <div className="sticky top-10 z-40 block bg-white/95 backdrop-blur-md border-b border-border lg:hidden overflow-x-auto no-scrollbar">
        <div className="flex px-6 py-4 gap-3 min-w-max">
          {legalLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded text-sm font-bold whitespace-nowrap transition-all border ${
                activeTab === link.id
                  ? "bg-primary text-white border-primary"
                  : "bg-gray-50 text-muted border-gray-200"
              }`}
            >
              {link.icon}
              {link.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <section className="bg-zinc-50 py-12 lg:py-20 border-t border-border/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 lg:px-8 lg:flex-row items-start">
          {/* Sidebar Navigation (Desktop) */}
          <aside className="hidden lg:flex w-72 lg:shrink-0 sticky top-28 flex-col gap-2">
            {legalLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`flex items-center justify-between rounded border px-6 py-4 text-sm font-bold transition-all cursor-pointer ${
                  activeTab === link.id
                    ? "border-primary bg-white text-primary shadow-md translate-x-2"
                    : "border-transparent bg-transparent text-muted hover:bg-white/50 hover:text-primary"
                }`}
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  <span>{link.name}</span>
                </div>
                <ChevronRight
                  size={16}
                  className={
                    activeTab === link.id ? "text-primary" : "text-muted/30"
                  }
                />
              </button>
            ))}
          </aside>

          {/* Policy Content Card */}
          <main className="flex-1 rounded border border-border bg-white shadow-xl shadow-zinc-200/50">
            <div className="p-8 lg:p-16">
              {/* Content Header */}
              <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-border pb-8">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-primary font-serif tracking-tight">
                    {content.title}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-muted">
                    Last updated: {content.lastUpdated}
                  </p>
                </div>
                <button className="flex items-center gap-2 rounded border border-border px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-primary hover:bg-zinc-50 transition-colors cursor-pointer">
                  <Download size={14} />
                  <span>Download PDF</span>
                </button>
              </div>

              {/* Policy Body */}
              <div className="flex flex-col gap-10 lg:gap-12">
                {content.sections.map((section: any, index: number) => (
                  <section key={index}>
                    <h3 className="mb-4 text-xl lg:text-2xl font-bold text-primary font-serif uppercase tracking-tight">
                      {section.title}
                    </h3>
                    <p className="text-base text-muted leading-relaxed font-medium">
                      {section.content}
                    </p>

                    {/* Special Highlighting for Verification (specific to TOS) */}
                    {activeTab === "tos" &&
                      section.title === "Verification Requirements" && (
                        <div className="mt-8 rounded border-l-4 border-secondary bg-zinc-50 p-6 lg:p-8 flex flex-col gap-4 shadow-sm">
                          <div className="flex items-center gap-4 text-muted font-medium text-sm lg:text-base">
                            <CheckCircle2
                              size={20}
                              className="text-secondary shrink-0"
                            />
                            <span>
                              Government-issued ID verification for all premium
                              sellers.
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-muted font-medium text-sm lg:text-base">
                            <CheckCircle2
                              size={20}
                              className="text-secondary shrink-0"
                            />
                            <span>
                              Two-factor authentication (2FA) is mandatory for
                              transaction processing.
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-muted font-medium text-sm lg:text-base">
                            <CheckCircle2
                              size={20}
                              className="text-secondary shrink-0"
                            />
                            <span>
                              Mandatory provenance documentation for luxury
                              assets over €5,000.
                            </span>
                          </div>
                        </div>
                      )}

                    {/* Special Highlighting for Governing Law */}
                    {(section.title.includes("Governing Law") ||
                      section.title.includes("Agreement Acceptance")) && (
                      <div className="mt-8 rounded border border-border bg-zinc-50 p-6 lg:p-10 flex flex-col md:flex-row gap-6 lg:gap-8 items-start shadow-sm">
                        <div className="flex h-12 w-12 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-md text-primary">
                          <Scale size={24} />
                        </div>
                        <div>
                          <p className="text-base text-muted leading-relaxed font-medium italic">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Inner Footer CTA */}
              <div className="mt-20 border-t border-border pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h4 className="text-2xl font-bold text-primary font-serif tracking-tight">
                    Still have questions?
                  </h4>
                  <p className="mt-2 text-sm font-medium text-muted">
                    Our compliance team is available for legal inquiries.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto text-center rounded bg-[#000913] px-8 py-4 text-[11px] font-black uppercase tracking-widest text-white hover:bg-primary transition-all"
                  >
                    Contact Compliance
                  </Link>
                  <Link
                    href="/faqs"
                    className="w-full sm:w-auto text-center rounded border border-border px-8 py-4 text-[11px] font-black uppercase tracking-widest text-primary hover:bg-zinc-50 transition-all"
                  >
                    Help Center
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
