"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/lib/validations";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return validatedFields.error.issues[0].message;
  }

  try {
    await signIn("credentials", {
      ...data,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid email or password.";
        default:
          return "An unexpected error occurred.";
      }
    }
    throw error;
  }
}
