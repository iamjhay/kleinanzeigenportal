"use server";

import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import Role from "@/models/Role";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { SetupSchema } from "@/lib/validations";

export async function createInitialAdmin(formData: FormData) {
  await dbConnect();

  const userCount = await User.countDocuments();
  if (userCount > 0) {
    return { error: "Setup already completed" };
  }

  const data = Object.fromEntries(formData.entries());
  const validatedFields = SetupSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }

  const { name, email, password, phone } = validatedFields.data;

  try {
    // 1. Create Super Admin Role
    let superAdminRole = await Role.findOne({ name: "Super Admin" });
    if (!superAdminRole) {
      superAdminRole = await Role.create({
        name: "Super Admin",
        permissions: [
          "view:dashboard",
          "manage:leads",
          "manage:categories",
          "manage:faqs",
          "manage:pages",
          "manage:settings",
          "manage:roles",
          "manage:users",
        ],
      });
    }

    // 2. Create User
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: superAdminRole._id,
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to create admin" };
  }
}
