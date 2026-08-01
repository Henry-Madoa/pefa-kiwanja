// Server-only Cloudinary upload. Imported only from server actions, so the
// SDK and API secret never reach the client bundle.

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    "not5pvxb",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const MAX_BYTES = 2 * 1024 * 1024; // 2 MB

// Uploads an image from a server action's FormData to Cloudinary and returns
// its secure URL. Returns undefined when no file was provided, so callers can
// leave an existing photo untouched.
export async function uploadImage(
  entry: FormDataEntryValue | null,
  folder = "ncci"
): Promise<string | undefined> {
  if (!entry || typeof entry === "string") return undefined;
  const file = entry as File;
  if (file.size === 0) return undefined;
  if (file.size > MAX_BYTES) {
    throw new Error("Image is too large. Please upload an image under 2 MB.");
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files can be uploaded.");
  }
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env.local."
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder, resource_type: "image", transformation: [{ quality: "auto", fetch_format: "auto" }] },
        (error, uploaded) => {
          if (error || !uploaded) return reject(error || new Error("Upload failed."));
          resolve(uploaded as { secure_url: string });
        }
      )
      .end(bytes);
  });

  return result.secure_url;
}
