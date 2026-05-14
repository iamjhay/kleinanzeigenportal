"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  try {
    await dbConnect();

    const user = await User.findById(session.user.id);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Update name
    if (name) user.name = name;

    // Email update (be careful with this, but for now allow it)
    if (email) {
      const existing = await User.findOne({ email, _id: { $ne: user._id } });
      if (existing) {
        return { success: false, error: "Email already in use" };
      }
      user.email = email;
    }

    // Update password if provided
    if (newPassword) {
      if (newPassword !== confirmPassword) {
        return { success: false, error: "Passwords do not match" };
      }
      if (newPassword.length < 6) {
        return {
          success: false,
          error: "Password must be at least 6 characters",
        };
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();
    revalidatePath("/[locale]/admin", "layout");

    return { success: true };
  } catch (error: any) {
    console.error("Profile update error:", error);
    return { success: false, error: error.message };
  }
}
