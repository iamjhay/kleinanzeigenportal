import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const region = process.env.S3_REGION || "us-east-1";
const bucketName = process.env.S3_BUCKET;

if (
  !process.env.S3_ACCESS_KEY_ID ||
  !process.env.S3_SECRET_ACCESS_KEY ||
  !bucketName
) {
  console.warn("S3 configuration is missing. Uploads will fail.");
}

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
  endpoint: process.env.S3_ENDPOINT || undefined,
  forcePathStyle: !!process.env.S3_ENDPOINT, // Often needed for custom endpoints like MinIO or DigitalOcean
});

export async function uploadFileToS3(
  buffer: Buffer,
  filename: string,
  contentType: string,
) {
  if (!bucketName) {
    throw new Error("S3_BUCKET is not defined");
  }

  const key = `uploads/${Date.now()}-${filename}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  await s3Client.send(command);

  let url = "";
  if (process.env.S3_ENDPOINT) {
    const endpoint = process.env.S3_ENDPOINT.replace(/\/$/, "");
    url = `${endpoint}/${bucketName}/${key}`;
  } else {
    url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
  }

  return {
    url,
    key,
  };
}

export async function deleteFileFromS3(key: string) {
  if (!bucketName) {
    throw new Error("S3_BUCKET is not defined");
  }

  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  await s3Client.send(command);
  return { success: true };
}
