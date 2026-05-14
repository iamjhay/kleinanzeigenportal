import mongoose, { Schema, model, models } from "mongoose";

export interface ICategory {
  name: string;
  title?: string;
  slug: string;
  image?: string;
  icon?: string;
  description?: string;
  status: "draft" | "published";
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    title: { type: String },
    slug: { type: String, required: true, unique: true },
    image: { type: String },
    icon: { type: String },
    description: { type: String },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true },
);

// In Next.js, models are cached. If we change the schema, we need to clear the cache.
if (models.Category && !models.Category.schema.paths.title) {
  delete (mongoose as any).models.Category;
}

const Category =
  models.Category || model<ICategory>("Category", CategorySchema);

export default Category;
