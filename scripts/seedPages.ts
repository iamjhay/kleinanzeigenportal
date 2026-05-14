import mongoose, { Schema, model, models } from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
  console.error(
    "Please define the DATABASE_URL environment variable inside .env",
  );
  process.exit(1);
}

// Define Schema locally to avoid import issues in standalone script
const PageSchema = new Schema(
  {
    title_en: { type: String, required: true },
    title_de: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content_en: { type: String, default: "" },
    content_de: { type: String, default: "" },
    metaTitle_en: { type: String, default: "" },
    metaTitle_de: { type: String, default: "" },
    metaDescription_en: { type: String, default: "" },
    metaDescription_de: { type: String, default: "" },
    author: { type: String, required: true },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true },
);

const Page = models.Page || model("Page", PageSchema);

const pages = [
  {
    title_en: "Home",
    title_de: "Startseite",
    slug: "/",
    author: "System Admin",
    status: "published",
    content_en: "Welcome to Zufriedene Verkäufe - Your premium marketplace.",
    content_de: "Willkommen bei Zufriedene Verkäufe - Ihr Premium-Marktplatz.",
    metaTitle_en: "Premium Marketplace | Zufriedene Verkäufe",
    metaTitle_de: "Premium-Marktplatz | Zufriedene Verkäufe",
    metaDescription_en:
      "Discover curated excellence in our luxury marketplace.",
    metaDescription_de:
      "Entdecken Sie kuratierte Exzellenz in unserem Luxus-Marktplatz.",
  },
  {
    title_en: "About Us",
    title_de: "Über uns",
    slug: "about",
    author: "System Admin",
    status: "published",
    content_en:
      "We are dedicated to providing the best marketplace experience.",
    content_de: "Wir sind bestrebt, das beste Marktplatzerlebnis zu bieten.",
    metaTitle_en: "About Us | Zufriedene Verkäufe",
    metaTitle_de: "Über uns | Zufriedene Verkäufe",
    metaDescription_en: "Learn more about our mission and values.",
    metaDescription_de: "Erfahren Sie mehr über unsere Mission und Werte.",
  },
  {
    title_en: "Contact",
    title_de: "Kontakt",
    slug: "contact",
    author: "System Admin",
    status: "published",
    content_en: "Get in touch with us for any inquiries.",
    content_de: "Kontaktieren Sie uns bei Fragen jeglicher Art.",
    metaTitle_en: "Contact Us | Zufriedene Verkäufe",
    metaTitle_de: "Kontaktieren Sie uns | Zufriedene Verkäufe",
    metaDescription_en: "Reach out to our support team.",
    metaDescription_de: "Kontaktieren Sie unser Support-Team.",
  },
  {
    title_en: "Legal Information",
    title_de: "Rechtliche Hinweise",
    slug: "legals",
    author: "System Admin",
    status: "published",
    content_en: "Privacy Policy, Terms & Conditions, and Imprint.",
    content_de: "Datenschutzerklärung, AGB und Impressum.",
    metaTitle_en: "Legal | Zufriedene Verkäufe",
    metaTitle_de: "Rechtliches | Zufriedene Verkäufe",
    metaDescription_en: "Read our privacy policy and terms of service.",
    metaDescription_de: "Lesen Sie unsere Datenschutzerklärung und AGB.",
  },
  {
    title_en: "FAQs",
    title_de: "Häufig gestellte Fragen",
    slug: "faqs",
    author: "System Admin",
    status: "published",
    content_en: "Find answers to frequently asked questions.",
    content_de: "Finden Sie Antworten auf häufig gestellte Fragen.",
    metaTitle_en: "FAQs | Zufriedene Verkäufe",
    metaTitle_de: "FAQs | Zufriedene Verkäufe",
    metaDescription_en: "Frequently asked questions about our services.",
    metaDescription_de: "Häufig gestellte Fragen zu unseren Dienstleistungen.",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("Connected to MongoDB...");

    // Clear existing pages for a clean state
    await Page.deleteMany({});
    console.log("Cleared existing pages.");

    for (const pageData of pages) {
      await Page.findOneAndUpdate({ slug: pageData.slug }, pageData, {
        upsert: true,
        new: true,
      });
      console.log(`Seeded page: ${pageData.slug}`);
    }

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
