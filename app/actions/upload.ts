"use server";

import { uploadFileToS3, deleteFileFromS3 } from "@/lib/s3";

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { error: "No file uploaded" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to S3
    const result = await uploadFileToS3(buffer, file.name, file.type);

    return { url: result.url, key: result.key };
  } catch (err) {
    console.error("[uploadImage]", err);
    return { error: "Failed to upload image to S3" };
  }
}

export async function deleteImage(key: string) {
  try {
    if (!key) return { error: "No key provided" };
    await deleteFileFromS3(key);
    return { success: true };
  } catch (err) {
    console.error("[deleteImage]", err);
    return { error: "Failed to delete image from S3" };
  }
}
