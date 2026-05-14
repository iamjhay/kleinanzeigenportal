"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/mongoose";
import Category from "@/models/Category";
import { CategorySchema } from "@/lib/validations";

export type CategoryFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<string, string>>;
};

export async function createCategory(
  _prevState: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  const raw = {
    name: (formData.get("name") as string) || "",
    title: (formData.get("title") as string) || undefined,
    slug: (formData.get("slug") as string) || "",
    description: (formData.get("description") as string) || undefined,
    image: (formData.get("image") as string) || undefined,
    icon: (formData.get("icon") as string) || undefined,
    status: formData.get("status") === "published" ? "published" : "draft",
  };

  const parsed = CategorySchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<string, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { error: "Please fix the errors below.", fieldErrors };
  }

  try {
    await dbConnect();
    const existing = await Category.findOne({ slug: parsed.data.slug });
    if (existing) {
      return {
        error: "A category with that slug already exists.",
        fieldErrors: { slug: "This slug is already taken." },
      };
    }
    await Category.create(parsed.data);
    revalidatePath("/[locale]/admin/categories", "page");
    return { success: true };
  } catch (err) {
    console.error("[createCategory]", err);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function updateCategory(
  id: string,
  formData: FormData,
): Promise<CategoryFormState> {
  const raw = {
    name: (formData.get("name") as string) || "",
    title: (formData.get("title") as string) || undefined,
    slug: (formData.get("slug") as string) || "",
    description: (formData.get("description") as string) || undefined,
    image: (formData.get("image") as string) || undefined,
    icon: (formData.get("icon") as string) || undefined,
    status: formData.get("status") === "published" ? "published" : "draft",
  };

  const parsed = CategorySchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<string, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { error: "Please fix the errors below.", fieldErrors };
  }

  try {
    await dbConnect();
    const existing = await Category.findOne({
      slug: parsed.data.slug,
      _id: { $ne: id },
    });
    if (existing) {
      return {
        error: "A category with that slug already exists.",
        fieldErrors: { slug: "This slug is already taken." },
      };
    }
    await Category.findByIdAndUpdate(id, parsed.data);
    revalidatePath("/[locale]/admin/categories", "page");
    revalidatePath(`/[locale]/admin/categories/${id}`, "page");
    return { success: true };
  } catch (err) {
    console.error("[updateCategory]", err);
    return { error: "Failed to update category." };
  }
}

export async function deleteCategory(id: string): Promise<CategoryFormState> {
  try {
    await dbConnect();
    await Category.findByIdAndDelete(id);
    revalidatePath("/[locale]/admin/categories", "page");
    return { success: true };
  } catch (err) {
    console.error("[deleteCategory]", err);
    return { error: "Failed to delete category." };
  }
}

export async function deleteManyCategories(
  ids: string[],
): Promise<CategoryFormState> {
  try {
    await dbConnect();
    await Category.deleteMany({ _id: { $in: ids } });
    revalidatePath("/[locale]/admin/categories", "page");
    return { success: true };
  } catch (err) {
    console.error("[deleteManyCategories]", err);
    return { error: "Failed to delete categories." };
  }
}
export async function getCategories() {
  try {
    await dbConnect();
    const categories = await Category.find({ status: "published" })
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("[getCategories]", error);
    return [];
  }
}
