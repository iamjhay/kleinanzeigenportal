"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
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

const legalContentEn: { [key: string]: any } = {
  tos: {
    title: "Terms & Purchase Policy",
    lastUpdated: "October 24, 2024",
    sections: [
      {
        title: "Seller Identity",
        content:
          "Zufriedene Verkäufe is the sole owner, operator, and seller of all products listed on this platform. No third-party sellers are permitted.",
      },
      {
        title: "Product Authenticity",
        content:
          "All items sold on Zufriedene Verkäufe are original, genuine, and verified. The company maintains full responsibility for product sourcing, quality control, and listing accuracy.",
      },
      {
        title: "Product Information",
        content:
          "Zufriedene Verkäufe strives to provide accurate product descriptions, images, and specifications. Minor variations may occur but do not affect the authenticity or core quality of the item.",
      },
      {
        title: "Payments",
        content:
          "Zufriedene Verkäufe accepts secure online payments through approved payment channels. All transactions are encrypted and processed in compliance with applicable security standards.",
      },
      {
        title: "Installment Payments",
        content:
          "Eligible customers may opt for instalment payment plans, subject to Zufriedene Verkäufe instalment terms and approval conditions. Ownership or delivery terms may vary based on payment completion.",
      },
      {
        title: "Customer Responsibility",
        content:
          "Customers are advised to review product details carefully before completing a purchase. By proceeding with payment, the customer agrees to Zufriedene Verkäufe terms and conditions.",
      },
      {
        title: "Customer Support",
        content:
          "Zufriedene Verkäufe provides customer support to assist with inquiries, payments, and post-purchase concerns within reasonable service timelines. Zufriedene Verkäufe reserves the right to amend these terms at any time without prior notice.",
      },
      {
        title: "Termination",
        content:
          "Zufriedene Verkäufe may suspend or terminate access immediately, without notice, if these Terms are violated. Termination does not waive Zufriedene Verkäufe legal rights or remedies.",
      },
      {
        title: "Force Majeure",
        content:
          "Zufriedene Verkäufe shall not be liable for failure or delay in performance caused by events beyond reasonable control, including natural disasters, governmental actions, or system failures.",
      },
      {
        title: "Governing Law & Jurisdiction",
        content:
          "This Agreement shall be governed by and construed in accordance with the laws applicable in the jurisdiction where Zufriedene Verkäufe operates. Courts of competent jurisdiction shall have exclusive authority over disputes.",
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
          "All legal notices or inquiries must be directed through Zufriedene Verkäufe official communication channels listed on the website.",
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
          "Zufriedene Verkäufe is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and safeguard your personal information when you use our website or services.",
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
          "All payment transactions are processed through secure, encrypted systems. Zufriedene Verkäufe does not store sensitive card details beyond what is necessary for transaction processing and compliance.",
      },
      {
        title: "Data protection",
        content:
          "We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss, or misuse.",
      },
      {
        title: "Information sharing",
        content:
          "Zufriedene Verkäufe does not sell or rent customer data. Information may only be shared with: Trusted payment processors, Legal authorities when required by law, and Service providers strictly for operational purposes.",
      },
      {
        title: "Cookies and tracking",
        content:
          "Zufriedene Verkäufe may use cookies to enhance site functionality, analyze traffic, and improve user experience. You may manage cookie preferences through your browser settings.",
      },
      {
        title: "Your rights",
        content:
          "Customers have the right to: Access their personal data, Request correction or deletion, Withdraw consent where applicable. Requests can be made through Zufriedene Verkäufe customer support.",
      },
      {
        title: "Policy updates",
        content:
          "Zufriedene Verkäufe reserves the right to update this Privacy Policy at any time. Changes will take effect immediately upon posting on the website. By using Zufriedene Verkäufe, you agree to this Privacy Policy.",
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
          "This Cookies Policy explains how Zufriedene Verkäufe uses cookies and similar technologies when you visit our website. By continuing to use our website, you consent to the use of cookies in accordance with this policy.",
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
          "Zufriedene Verkäufe uses cookies to: Ensure website functionality, Process secure transactions, Improve website performance, Enhance user experience, and Protect against fraud and abuse.",
      },
      {
        title: "Third-party cookies",
        content:
          "Some cookies may be placed by trusted third-party service providers, such as payment processors or analytics services, strictly for operational and performance purposes. Zufriedene Verkäufe does not control these cookies directly.",
      },
      {
        title: "Managing cookies",
        content:
          "You can control or disable cookies through your browser settings. Please note that disabling certain cookies may affect website functionality and your ability to complete transactions.",
      },
      {
        title: "Data protection",
        content:
          "Any personal data collected through cookies is handled in accordance with the Zufriedene Verkäufe Privacy Policy. We do not use cookies to collect sensitive personal information without your consent.",
      },
      {
        title: "Policy updates",
        content:
          "Zufriedene Verkäufe reserves the right to update this Cookies Policy at any time. Changes will take effect immediately upon publication on the website.",
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
          "Zufriedene Verkäufe respects intellectual property rights and is committed to complying with applicable copyright laws. This policy outlines how Zufriedene Verkäufe handles copyright ownership, usage, and infringement concerns related to content and products on the platform.",
      },
      {
        title: "Ownership of content",
        content:
          "Unless otherwise stated, all content on the Zufriedene Verkäufe website—including but not limited to: Text, Images, Product descriptions, Logos, Graphics, Design elements—is the exclusive property of Zufriedene Verkäufe and is protected by copyright and other intellectual property laws.",
      },
      {
        title: "Authorized use",
        content:
          "Users may view, browse, and purchase products on Zufriedene Verkäufe for personal, non-commercial use only. Any reproduction, redistribution, modification, copying, or commercial use of Zufriedene Verkäufe content without prior written consent is strictly prohibited.",
      },
      {
        title: "Prohibited activities",
        content:
          "The following actions are not permitted: Copying or republishing Zufriedene Verkäufe content on other websites or platforms; Using Zufriedene Verkäufe images or descriptions for resale, advertising, or marketing; Framing, scraping, or extracting content for commercial purposes; Any use that infringes on Zufriedene Verkäufe intellectual property rights.",
      },
      {
        title: "Reporting copyright infringement",
        content:
          "If you believe that any content on Zufriedene Verkäufe infringes upon your copyright, you may submit a written notice containing: Identification of the copyrighted work, Description of the allegedly infringing material, Proof of ownership or authorization, and Your contact information. Zufriedene Verkäufe will review all valid claims and take appropriate action where necessary.",
      },
      {
        title: "Action on infringement",
        content:
          "Upon confirmation of infringement, Zufriedene Verkäufe reserves the right to: Remove or modify the infringing content, Restrict access to affected materials, and Take legal action where appropriate.",
      },
      {
        title: "False claims",
        content:
          "Submitting false or misleading copyright infringement claims may result in legal consequences. Claimants are responsible for ensuring the accuracy of their reports.",
      },
      {
        title: "Policy updates",
        content:
          "Zufriedene Verkäufe reserves the right to amend this Copyright Infringement Policy at any time. Updates will be effective immediately upon publication on the website.",
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
          "Zufriedene Verkäufe may offer installment payment options to eligible customers at its sole discretion. Eligibility may depend on product type, purchase value, and other internal criteria determined by Zufriedene Verkäufe.",
      },
      {
        title: "2. Payment Structure",
        content:
          "Customers choosing an installment plan agree to pay the total purchase price in scheduled installments as clearly stated at checkout or in the payment agreement. The installment amount, frequency, and duration will be disclosed before confirmation.",
      },
      {
        title: "3. Ownership and Delivery",
        content:
          "Unless otherwise stated, ownership of the purchased item remains with Zufriedene Verkäufe until full payment has been completed. Delivery, usage, or possession terms may vary based on the selected installment plan.",
      },
      {
        title: "4. Late or Missed Payments",
        content:
          "Failure to make payments on the agreed dates may result in: Suspension of delivery or service, Cancellation of the installment plan, Additional charges or penalties where applicable. Zufriedene Verkäufe reserves the right to take appropriate action in cases of repeated default.",
      },
      {
        title: "5. Cancellation and Refunds",
        content:
          "Installment purchases are subject to Zufriedene Verkäufe refund and return policies. Any refunds approved will be processed after deducting applicable usage fees, administrative charges, or amounts already due.",
      },
    ],
  },
};

const legalContentDe: { [key: string]: any } = {
  tos: {
    title: "AGB & Einkaufsrichtlinien",
    lastUpdated: "24. Oktober 2024",
    sections: [
      {
        title: "Identität des Verkäufers",
        content:
          "Zufriedene Verkäufe ist der alleinige Eigentümer, Betreiber und Verkäufer aller auf dieser Plattform gelisteten Produkte. Drittanbieter sind nicht zugelassen.",
      },
      {
        title: "Produktauthentizität",
        content:
          "Alle bei Zufriedene Verkäufe verkauften Artikel sind original, echt und verifiziert. Das Unternehmen trägt die volle Verantwortung für die Produktbeschaffung, Qualitätskontrolle und die Richtigkeit der Angebote.",
      },
      {
        title: "Produktinformationen",
        content:
          "Zufriedene Verkäufe bemüht sich um genaue Produktbeschreibungen, Bilder und Spezifikationen. Geringfügige Abweichungen können auftreten, beeinträchtigen jedoch nicht die Authentizität oder Kernqualität des Artikels.",
      },
      {
        title: "Zahlungen",
        content:
          "Zufriedene Verkäufe akzeptiert sichere Online-Zahlungen über zugelassene Zahlungskanäle. Alle Transaktionen werden verschlüsselt und in Übereinstimmung mit geltenden Sicherheitsstandards verarbeitet.",
      },
      {
        title: "Ratenzahlungen",
        content:
          "Berechtigte Kunden können Ratenzahlungspläne wählen, vorbehaltlich der Ratenzahlungsbedingungen und Genehmigungsbedingungen von Zufriedene Verkäufe. Eigentums- oder Lieferbedingungen können je nach Abschluss der Zahlung variieren.",
      },
      {
        title: "Verantwortung des Kunden",
        content:
          "Kunden wird empfohlen, die Produktdetails vor Abschluss eines Kaufs sorgfältig zu prüfen. Mit der Fortsetzung der Zahlung stimmt der Kunde den AGB von Zufriedene Verkäufe zu.",
      },
      {
        title: "Kundendienst",
        content:
          "Zufriedene Verkäufe bietet Kundensupport zur Unterstützung bei Anfragen, Zahlungen und Anliegen nach dem Kauf innerhalb angemessener Servicezeiten an. Zufriedene Verkäufe behält sich das Recht vor, diese Bedingungen jederzeit ohne vorherige Ankündigung zu ändern.",
      },
      {
        title: "Beendigung",
        content:
          "Zufriedene Verkäufe kann den Zugriff sofort und ohne Vorankündigung sperren oder beenden, wenn gegen diese Bedingungen verstoßen wird. Die Beendigung entbindet Zufriedene Verkäufe nicht von seinen gesetzlichen Rechten oder Rechtsmitteln.",
      },
      {
        title: "Höhere Gewalt",
        content:
          "Zufriedene Verkäufe haftet nicht für Leistungsstörungen oder Verzögerungen, die durch Ereignisse außerhalb zumutbarer Kontrolle verursacht werden, einschließlich Naturkatastrophen, behördlicher Maßnahmen oder Systemausfällen.",
      },
      {
        title: "Anwendbares Recht & Gerichtsstand",
        content:
          "Diese Vereinbarung unterliegt dem Recht des Staates, in dem Zufriedene Verkäufe tätig ist, und wird in Übereinstimmung mit diesem ausgelegt. Die zuständigen Gerichte haben die ausschließliche Zuständigkeit für Streitigkeiten.",
      },
      {
        title: "Salvatorische Klausel",
        content:
          "Sollte eine Bestimmung dieser Vereinbarung für nicht durchsetzbar befunden werden, bleiben die übrigen Bestimmungen in vollem Umfang in Kraft.",
      },
      {
        title: "Gesamtvereinbarung",
        content:
          "Diese Bedingungen stellen die gesamte Vereinbarung zwischen Ihnen und Zufriedene Verkäufe dar und ersetzen alle vorherigen Vereinbarungen oder Absprachen.",
      },
      {
        title: "Kontakt",
        content:
          "Alle rechtlichen Hinweise oder Anfragen müssen über die offiziellen Kommunikationskanäle von Zufriedene Verkäufe geleitet werden, die auf der Website aufgeführt sind.",
      },
    ],
  },
  privacy: {
    title: "Datenschutzerklärung",
    lastUpdated: "12. Oktober 2024",
    sections: [
      {
        title: "Einleitung",
        content:
          "Zufriedene Verkäufe verpflichtet sich zum Schutz Ihrer Privatsphäre. Diese Datenschutzerklärung erläutert, wie wir Ihre personenbezogenen Daten erheben, verwenden, speichern und schützen, wenn Sie unsere Website oder Dienste nutzen.",
      },
      {
        title: "Informationen, die wir sammeln",
        content:
          "Wir können die folgenden Informationen sammeln: Vollständiger Name, Kontaktdaten (E-Mail-Adresse, Telefonnummer), Rechnungs- und Zahlungsinformationen, Bestell- und Transaktionshistorie, Geräte- und Nutzungsdaten (für Sicherheit und Leistung).",
      },
      {
        title: "Wie wir Ihre Informationen verwenden",
        content:
          "Ihre Informationen werden verwendet für: Bearbeitung von Bestellungen und Zahlungen, Verwaltung von Ratenzahlungsplänen, Bereitstellung von Kundensupport, Verbesserung unserer Dienste und des Nutzererlebnisses, Einhaltung gesetzlicher und regulatorischer Anforderungen.",
      },
      {
        title: "Zahlungssicherheit",
        content:
          "Alle Zahlungstransaktionen werden über sichere, verschlüsselte Systeme verarbeitet. Zufriedene Verkäufe speichert keine sensiblen Kartendaten über das für die Transaktionsabwicklung und Compliance erforderliche Maß hinaus.",
      },
      {
        title: "Datenschutz",
        content:
          "Wir implementieren angemessene technische und organisatorische Maßnahmen, um Ihre Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen.",
      },
      {
        title: "Weitergabe von Informationen",
        content:
          "Zufriedene Verkäufe verkauft oder vermietet keine Kundendaten. Informationen dürfen nur weitergegeben werden an: Vertrauenswürdige Zahlungsabwickler, Behörden, wenn dies gesetzlich vorgeschrieben ist, und Dienstleister ausschließlich für betriebliche Zwecke.",
      },
      {
        title: "Cookies und Tracking",
        content:
          "Zufriedene Verkäufe kann Cookies verwenden, um die Funktionalität der Website zu verbessern, den Datenverkehr zu analysieren und das Nutzererlebnis zu verbessern. Sie können die Cookie-Einstellungen über Ihre Browser-Einstellungen verwalten.",
      },
      {
        title: "Ihre Rechte",
        content:
          "Kunden haben das Recht: auf Zugang zu ihren personenbezogenen Daten, auf Korrektur oder Löschung, auf Widerruf der Einwilligung, sofern zutreffend. Anfragen können über den Kundensupport von Zufriedene Verkäufe gestellt werden.",
      },
      {
        title: "Richtlinienaktualisierungen",
        content:
          "Zufriedene Verkäufe behält sich das Recht vor, diese Datenschutzerklärung jederzeit zu aktualisieren. Änderungen treten sofort nach Veröffentlichung auf der Website in Kraft. Durch die Nutzung von Zufriedene Verkäufe stimmen Sie dieser Datenschutzerklärung zu.",
      },
    ],
  },
  cookies: {
    title: "Cookie-Richtlinie",
    lastUpdated: "05. September 2024",
    sections: [
      {
        title: "Einleitung",
        content:
          "Diese Cookie-Richtlinie erläutert, wie Zufriedene Verkäufe Cookies und ähnliche Technologien verwendet, wenn Sie unsere Website besuchen. Durch die weitere Nutzung unserer Website stimmen Sie der Verwendung von Cookies gemäß dieser Richtlinie zu.",
      },
      {
        title: "Was sind Cookies?",
        content:
          "Cookies sind kleine Textdateien, die auf Ihrem Gerät (Computer, Tablet oder Mobiltelefon) gespeichert werden, wenn Sie eine Website besuchen. Sie helfen dabei, die Funktionalität zu verbessern, das Nutzererlebnis zu optimieren und Einblicke in die Nutzung der Website zu geben.",
      },
      {
        title: "Arten von Cookies, die wir verwenden",
        content:
          "a. Essenzielle Cookies: Notwendig für das ordnungsgemäße Funktionieren der Website. b. Leistungs- und Analyse-Cookies: Helfen uns zu verstehen, wie Besucher interagieren. c. Funktionale Cookies: Speichern Ihre bevorzugten Einstellungen. d. Sicherheits-Cookies: Erkennen verdächtige Aktivitäten und schützen Konten.",
      },
      {
        title: "Wie wir Cookies verwenden",
        content:
          "Zufriedene Verkäufe verwendet Cookies, um: die Funktionalität der Website sicherzustellen, sichere Transaktionen zu verarbeiten, die Website-Leistung zu verbessern, das Nutzererlebnis zu optimieren und vor Betrug und Missbrauch zu schützen.",
      },
      {
        title: "Cookies von Drittanbietern",
        content:
          "Einige Cookies können von vertrauenswürdigen Drittanbietern wie Zahlungsabwicklern oder Analysediensten ausschließlich für betriebliche und Leistungszwecke gesetzt werden. Zufriedene Verkäufe kontrolliert diese Cookies nicht direkt.",
      },
      {
        title: "Cookies verwalten",
        content:
          "Sie können Cookies über Ihre Browser-Einstellungen steuern oder deaktivieren. Bitte beachten Sie, dass das Deaktivieren bestimmter Cookies die Funktionalität der Website und Ihre Fähigkeit zum Abschluss von Transaktionen beeinträchtigen kann.",
      },
      {
        title: "Datenschutz",
        content:
          "Alle über Cookies gesammelten personenbezogenen Daten werden gemäß der Datenschutzerklärung von Zufriedene Verkäufe behandelt. Wir verwenden Cookies nicht, um sensible persönliche Informationen ohne Ihre Zustimmung zu sammeln.",
      },
      {
        title: "Richtlinienaktualisierungen",
        content:
          "Zufriedene Verkäufe behält sich das Recht vor, diese Cookie-Richtlinie jederzeit zu aktualisieren. Änderungen treten sofort nach Veröffentlichung auf der Website in Kraft.",
      },
    ],
  },
  copyright: {
    title: "Urheberrechtsrichtlinie",
    lastUpdated: "20. August 2024",
    sections: [
      {
        title: "Einleitung",
        content:
          "Zufriedene Verkäufe respektiert geistige Eigentumsrechte und verpflichtet sich zur Einhaltung der geltenden Urheberrechtsgesetze. Diese Richtlinie legt fest, wie Zufriedene Verkäufe mit Urheberrechten, Nutzung und Urheberrechtsverletzungen in Bezug auf Inhalte und Produkte auf der Plattform umgeht.",
      },
      {
        title: "Eigentum an Inhalten",
        content:
          "Sofern nicht anders angegeben, sind alle Inhalte auf der Website von Zufriedene Verkäufe – einschließlich, aber nicht beschränkt auf: Texte, Bilder, Produktbeschreibungen, Logos, Grafiken, Designelemente – das exklusive Eigentum von Zufriedene Verkäufe und durch Urheberrechtsgesetze geschützt.",
      },
      {
        title: "Autorisierte Nutzung",
        content:
          "Nutzer dürfen Produkte auf Zufriedene Verkäufe nur für den persönlichen, nicht-kommerziellen Gebrauch ansehen, durchsuchen und kaufen. Jede Vervielfältigung, Weitergabe, Änderung, Kopie oder kommerzielle Nutzung von Inhalten ohne vorherige schriftliche Zustimmung ist strengstens untersagt.",
      },
      {
        title: "Verbotene Aktivitäten",
        content:
          "Folgende Handlungen sind nicht gestattet: Kopieren oder Veröffentlichen von Inhalten auf anderen Websites oder Plattformen; Verwendung von Bildern oder Beschreibungen für den Wiederverkauf, Werbung oder Marketing; Framing, Scraping oder Extrahieren von Inhalten für kommerzielle Zwecke; Jede Nutzung, die die geistigen Eigentumsrechte von Zufriedene Verkäufe verletzt.",
      },
      {
        title: "Meldung von Urheberrechtsverletzungen",
        content:
          "Wenn Sie glauben, dass Inhalte auf Zufriedene Verkäufe Ihr Urheberrecht verletzen, können Sie eine schriftliche Mitteilung einreichen, die Folgendes enthält: Identifizierung des urheberrechtlich geschützten Werks, Beschreibung des mutmaßlich verletzenden Materials, Eigentumsnachweis oder Autorisierung und Ihre Kontaktinformationen. Zufriedene Verkäufe wird alle gültigen Ansprüche prüfen und gegebenenfalls Maßnahmen ergreifen.",
      },
      {
        title: "Maßnahmen bei Verstößen",
        content:
          "Nach Bestätigung einer Verletzung behält sich Zufriedene Verkäufe das Recht vor: die verletzenden Inhalte zu entfernen oder zu ändern, den Zugriff auf betroffene Materialien zu beschränken und gegebenenfalls rechtliche Schritte einzuleiten.",
      },
      {
        title: "Falsche Behauptungen",
        content:
          "Das Einreichen falscher oder irreführender Urheberrechtsverletzungsklagen kann rechtliche Konsequenzen nach sich ziehen. Die Antragsteller sind für die Richtigkeit ihrer Meldungen verantwortlich.",
      },
      {
        title: "Richtlinienaktualisierungen",
        content:
          "Zufriedene Verkäufe behält sich das Recht vor, diese Urheberrechtsrichtlinie jederzeit zu ändern. Aktualisierungen treten sofort nach Veröffentlichung auf der Website in Kraft.",
      },
    ],
  },
  installment: {
    title: "Ratenzahlungsrichtlinie",
    lastUpdated: "01. November 2024",
    sections: [
      {
        title: "Zustimmung zur Vereinbarung",
        content:
          "Durch die Auswahl einer Ratenzahlungsoption bestätigt der Kunde die Annahme dieser Ratenzahlungsvereinbarung und erklärt sich bereit, deren Bedingungen vollständig einzuhalten.",
      },
      {
        title: "1. Berechtigung",
        content:
          "Zufriedene Verkäufe kann berechtigten Kunden nach eigenem Ermessen Ratenzahlungsoptionen anbieten. Die Berechtigung kann von der Produktart, dem Kaufwert und anderen internen Kriterien abhängen, die von Zufriedene Verkäufe festgelegt werden.",
      },
      {
        title: "2. Zahlungsstruktur",
        content:
          "Kunden, die sich für einen Ratenzahlungsplan entscheiden, erklären sich bereit, den Gesamtkaufpreis in geplanten Raten zu zahlen, wie beim Checkout oder in der Zahlungsvereinbarung angegeben. Ratenhöhe, Häufigkeit und Dauer werden vor der Bestätigung offengelegt.",
      },
      {
        title: "3. Eigentum und Lieferung",
        content:
          "Sofern nicht anders angegeben, verbleibt das Eigentum am gekauften Artikel bei Zufriedene Verkäufe, bis die vollständige Zahlung erfolgt ist. Liefer-, Nutzungs- oder Besitzbedingungen können je nach gewähltem Ratenzahlungsplan variieren.",
      },
      {
        title: "4. Verspätete oder versäumte Zahlungen",
        content:
          "Die Nichtzahlung zu den vereinbarten Terminen kann zu Folgendem führen: Aussetzung der Lieferung oder des Dienstes, Stornierung des Ratenzahlungsplans, zusätzliche Gebühren oder Strafen, falls zutreffend. Zufriedene Verkäufe behält sich das Recht vor, bei wiederholtem Verzug angemessene Maßnahmen zu ergreifen.",
      },
      {
        title: "5. Stornierung und Rückerstattung",
        content:
          "Ratenkäufe unterliegen den Rückerstattungs- und Rückgaberichtlinien von Zufriedene Verkäufe. Alle genehmigten Rückerstattungen werden nach Abzug geltender Nutzungsgebühren, Verwaltungsgebühren oder bereits fälliger Beträge bearbeitet.",
      },
    ],
  },
};

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

export default function LegalsPage() {
  const t = useTranslations("Legals");
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState("tos");

  const legalLinks = [
    { id: "tos", name: t("tabs.tos"), icon: <ShieldCheck size={18} /> },
    { id: "privacy", name: t("tabs.privacy"), icon: <Lock size={18} /> },
    { id: "cookies", name: t("tabs.cookies"), icon: <Cookie size={18} /> },
    {
      id: "copyright",
      name: t("tabs.copyright"),
      icon: <Copyright size={18} />,
    },
    {
      id: "installment",
      name: t("tabs.installment"),
      icon: <CreditCard size={18} />,
    },
    { id: "imprint", name: t("tabs.imprint"), icon: <Info size={18} /> },
  ];

  // Handlers for Imprint which is not in the data structure
  const content =
    activeTab === "imprint"
      ? {
          title: t("tabs.imprint"),
          lastUpdated: locale === "de" ? "15. Juli 2024" : "July 15, 2024",
          sections: [
            {
              title:
                locale === "de"
                  ? "Rechtliche Informationen"
                  : "Legal Information",
              content:
                locale === "de"
                  ? "Zufriedene Verkäufe GmbH ist ein in Berlin, Deutschland, eingetragenes Unternehmen. Geschäftsführer: John Doe, Jane Smith. Registernummer: HRB 123456."
                  : "Zufriedene Verkäufe GmbH is a registered company in Berlin, Germany. Managing Directors: John Doe, Jane Smith. Registration Number: HRB 123456.",
            },
          ],
        }
      : locale === "de"
        ? legalContentDe[activeTab]
        : legalContentEn[activeTab];

  return (
    <div className="flex min-h-screen flex-col bg-white pt-20">
      {/* Header Section */}
      <section className="mx-auto max-w-4xl px-6 sm:px-8 py-20 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-wider text-secondary border border-secondary/20">
            <Shield size={14} />
            <span>{t("trustBadge")}</span>
          </div>
        </div>
        <h1 className="mb-6 text-4xl md:text-5xl font-bold tracking-tight text-primary font-serif">
          {t("title")}
        </h1>
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted leading-relaxed font-medium">
          {protectBrand(t("description"))}
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
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary font-serif tracking-tight mb-4">
                  {protectBrand(content.title)}
                </h1>
                  <p className="mt-2 text-sm font-medium text-muted">
                    {t("lastUpdated")}: {content.lastUpdated}
                  </p>
                </div>
                <button className="flex items-center gap-2 rounded border border-border px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-primary hover:bg-zinc-50 transition-colors cursor-pointer">
                  <Download size={14} />
                  <span>{t("downloadPdf")}</span>
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
                            {protectBrand(section.content)}
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
                    {t("stillQuestions")}
                  </h4>
                  <p className="mt-2 text-sm font-medium text-muted">
                    {t("complianceHelp")}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto text-center rounded bg-[#000913] px-8 py-4 text-[11px] font-black uppercase tracking-widest text-white hover:bg-primary transition-all"
                  >
                    {t("contactCompliance")}
                  </Link>
                  <Link
                    href="/faqs"
                    className="w-full sm:w-auto text-center rounded border border-border px-8 py-4 text-[11px] font-black uppercase tracking-widest text-primary hover:bg-zinc-50 transition-all"
                  >
                    {t("helpCenter")}
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
