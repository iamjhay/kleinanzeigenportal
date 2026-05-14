"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import dbConnect from "@/lib/mongoose";
import Lead from "@/models/Lead";
import { ContactSchema } from "@/lib/validations";

export type ContactFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<string, string>>;
};

async function getLocation(ip: string) {
  try {
    if (
      !ip ||
      ip === "::1" ||
      ip === "127.0.0.1" ||
      ip.startsWith("192.168.") ||
      ip.startsWith("10.")
    ) {
      console.log(
        "[getLocation] Local/Invalid IP detected. Using mock location for dev:",
        ip,
      );
      return {
        state: "Berlin",
        country: "Germany",
      };
    }

    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      next: { revalidate: 3600 }, // Cache for an hour
    });
    const data = await res.json();
    console.log("[getLocation] API Response for IP", ip, ":", data);

    if (data && !data.error) {
      return {
        state: data.region,
        country: data.country_name,
      };
    }
    console.warn(
      "[getLocation] API returned error or empty data:",
      data?.reason || "Unknown reason",
    );
    return null;
  } catch (err) {
    console.error("[getLocation] Error fetching geolocation:", err);
    return null;
  }
}

export async function submitLead(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0] ||
    headerList.get("x-real-ip") ||
    "127.0.0.1";

  console.log("[submitLead] Processing inquiry from IP:", ip);
  const location = await getLocation(ip);

  const raw = {
    firstName: (formData.get("firstName") as string) || "",
    lastName: (formData.get("lastName") as string) || "",
    email: (formData.get("email") as string) || "",
    phone: (formData.get("phone") as string) || undefined,
    subject: (formData.get("subject") as string) || undefined,
    message: (formData.get("message") as string) || "",
  };

  const parsed = ContactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<string, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as string;
      fieldErrors[field] = issue.message;
    }
    return { error: "Please fix the errors below.", fieldErrors };
  }

  try {
    await dbConnect();
    await Lead.create({
      ...parsed.data,
      location: location || undefined,
      status: "new",
    });

    return { success: true };
  } catch (err) {
    console.error("[submitLead]", err);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function updateLeadStatus(id: string, status: string) {
  try {
    await dbConnect();
    await Lead.findByIdAndUpdate(id, { status });
    revalidatePath(`/[locale]/admin/leads/${id}`, "page");
    revalidatePath("/[locale]/admin/leads", "page");
    return { success: true };
  } catch (err) {
    console.error("[updateLeadStatus]", err);
    return { error: "Failed to update status." };
  }
}

export async function deleteLead(id: string) {
  try {
    await dbConnect();
    await Lead.findByIdAndDelete(id);
    revalidatePath("/[locale]/admin/leads", "page");
    return { success: true };
  } catch (err) {
    console.error("[deleteLead]", err);
    return { error: "Failed to delete inquiry." };
  }
}
