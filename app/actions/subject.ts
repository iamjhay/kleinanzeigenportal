"use server";

import dbConnect from "@/lib/mongoose";
import Subject from "@/models/Subject";
import { revalidatePath } from "next/cache";

export async function createSubject(formData: FormData) {
  const label = formData.get("label") as string;
  if (!label) return { error: "Label is required" };

  // Create a URL-friendly value from the label
  const value = label.toLowerCase().trim().replace(/\s+/g, "-");

  try {
    await dbConnect();
    await Subject.create({ label, value });
    revalidatePath("/[locale]/admin/leads", "page");
    return { success: true };
  } catch (error: any) {
    if (error.code === 11000) {
      return { error: "This subject already exists." };
    }
    return { error: "Failed to create subject." };
  }
}

export async function deleteSubject(id: string) {
  try {
    await dbConnect();
    await Subject.findByIdAndDelete(id);
    revalidatePath("/[locale]/admin/leads", "page");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete subject." };
  }
}

export async function getSubjects() {
  try {
    await dbConnect();
    const subjects = await Subject.find().sort({ createdAt: -1 }).lean();
    return subjects.map((s: any) => ({
      _id: s._id.toString(),
      label: s.label,
      value: s.value,
    }));
  } catch (error) {
    return [];
  }
}
