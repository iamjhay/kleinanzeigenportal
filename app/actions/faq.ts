"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/mongoose";
import FaqTopic from "@/models/FaqTopic";
import FaqItem from "@/models/FaqItem";
import { FaqTopicSchema, FaqItemSchema } from "@/lib/validations";

export type FaqFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<string, string>>;
};

// ─── Topic Actions ─────────────────────────────────────────────────────────────

export async function createFaqTopic(
  _prevState: FaqFormState,
  formData: FormData,
): Promise<FaqFormState> {
  const raw = {
    title_en: (formData.get("title_en") as string) || "",
    title_de: (formData.get("title_de") as string) || "",
    slug: (formData.get("slug") as string) || "",
    icon: (formData.get("icon") as string) || "HelpCircle",
    order: Number(formData.get("order")) || 0,
  };

  const parsed = FaqTopicSchema.safeParse(raw);

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
    const existing = await FaqTopic.findOne({ slug: parsed.data.slug });
    if (existing) {
      return {
        error: "A topic with that slug already exists.",
        fieldErrors: { slug: "This slug is already taken." },
      };
    }
    await FaqTopic.create(parsed.data);
    revalidatePath("/[locale]/admin/faqs", "page");
    return { success: true };
  } catch (err) {
    console.error("[createFaqTopic]", err);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function updateFaqTopic(
  id: string,
  _prevState: FaqFormState,
  formData: FormData,
): Promise<FaqFormState> {
  const raw = {
    title_en: (formData.get("title_en") as string) || "",
    title_de: (formData.get("title_de") as string) || "",
    slug: (formData.get("slug") as string) || "",
    icon: (formData.get("icon") as string) || "HelpCircle",
    order: Number(formData.get("order")) || 0,
  };

  const parsed = FaqTopicSchema.safeParse(raw);

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
    const existing = await FaqTopic.findOne({
      slug: parsed.data.slug,
      _id: { $ne: id },
    });
    if (existing) {
      return {
        error: "A topic with that slug already exists.",
        fieldErrors: { slug: "This slug is already taken." },
      };
    }
    await FaqTopic.findByIdAndUpdate(id, parsed.data);
    revalidatePath("/[locale]/admin/faqs", "page");
    revalidatePath(`/[locale]/admin/faqs/${id}`, "page");
    return { success: true };
  } catch (err) {
    console.error("[updateFaqTopic]", err);
    return { error: "Failed to update topic." };
  }
}

export async function deleteFaqTopic(id: string): Promise<FaqFormState> {
  try {
    await dbConnect();
    // Also delete all items in this topic
    await FaqItem.deleteMany({ topicId: id });
    await FaqTopic.findByIdAndDelete(id);
    revalidatePath("/[locale]/admin/faqs", "page");
    return { success: true };
  } catch (err) {
    console.error("[deleteFaqTopic]", err);
    return { error: "Failed to delete topic." };
  }
}

export async function deleteManyFaqTopics(
  ids: string[],
): Promise<FaqFormState> {
  try {
    await dbConnect();
    await FaqItem.deleteMany({ topicId: { $in: ids } });
    await FaqTopic.deleteMany({ _id: { $in: ids } });
    revalidatePath("/[locale]/admin/faqs", "page");
    return { success: true };
  } catch (err) {
    console.error("[deleteManyFaqTopics]", err);
    return { error: "Failed to delete topics." };
  }
}

// ─── FAQ Item Actions ─────────────────────────────────────────────────────────

export async function createFaqItem(
  _prevState: FaqFormState,
  formData: FormData,
): Promise<FaqFormState> {
  const raw = {
    topicId: (formData.get("topicId") as string) || "",
    question_en: (formData.get("question_en") as string) || "",
    question_de: (formData.get("question_de") as string) || "",
    answer_en: (formData.get("answer_en") as string) || "",
    answer_de: (formData.get("answer_de") as string) || "",
    order: Number(formData.get("order")) || 0,
  };

  const parsed = FaqItemSchema.safeParse(raw);

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
    await FaqItem.create(parsed.data);
    revalidatePath(`/[locale]/admin/faqs/${parsed.data.topicId}`, "page");
    return { success: true };
  } catch (err) {
    console.error("[createFaqItem]", err);
    return { error: "Failed to create FAQ item." };
  }
}

export async function updateFaqItem(
  id: string,
  _prevState: FaqFormState,
  formData: FormData,
): Promise<FaqFormState> {
  const raw = {
    topicId: (formData.get("topicId") as string) || "",
    question_en: (formData.get("question_en") as string) || "",
    question_de: (formData.get("question_de") as string) || "",
    answer_en: (formData.get("answer_en") as string) || "",
    answer_de: (formData.get("answer_de") as string) || "",
    order: Number(formData.get("order")) || 0,
  };

  const parsed = FaqItemSchema.safeParse(raw);

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
    await FaqItem.findByIdAndUpdate(id, parsed.data);
    revalidatePath(`/[locale]/admin/faqs/${parsed.data.topicId}`, "page");
    return { success: true };
  } catch (err) {
    console.error("[updateFaqItem]", err);
    return { error: "Failed to update FAQ item." };
  }
}

export async function deleteFaqItem(
  id: string,
  topicId: string,
): Promise<FaqFormState> {
  try {
    await dbConnect();
    await FaqItem.findByIdAndDelete(id);
    revalidatePath(`/[locale]/admin/faqs/${topicId}`, "page");
    return { success: true };
  } catch (err) {
    console.error("[deleteFaqItem]", err);
    return { error: "Failed to delete FAQ item." };
  }
}

export async function updateFaqItemsOrder(
  topicId: string,
  items: { _id: string; order: number }[],
): Promise<FaqFormState> {
  try {
    await dbConnect();
    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $set: { order: item.order } },
      },
    }));
    await FaqItem.bulkWrite(bulkOps);
    revalidatePath(`/[locale]/admin/faqs/${topicId}`, "page");
    return { success: true };
  } catch (err) {
    console.error("[updateFaqItemsOrder]", err);
    return { error: "Failed to update items order." };
  }
}
