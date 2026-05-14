import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IPage extends Document {
  title_en: string;
  title_de: string;
  slug: string;
  content_en: string;
  content_de: string;
  metaTitle_en?: string;
  metaTitle_de?: string;
  metaDescription_en?: string;
  metaDescription_de?: string;
  author: string;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema = new Schema<IPage>(
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

const Page = models.Page || model<IPage>("Page", PageSchema);

export default Page;
