// Client-side image downscale + re-encode. Shrinks large photos (e.g. phone
// camera images) before upload so far less data crosses the network, making
// uploads dramatically faster. Falls back to the original file on any failure.
export async function compressImage(
  file: File,
  maxDim = 1600,
  quality = 0.82
): Promise<Blob> {
  // Skip non-raster or already-small files; GIFs would lose animation.
  if (!file.type.startsWith("image/") || file.type === "image/gif") return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file;
  }

  try {
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );
    // Use whichever is smaller so we never make a file bigger.
    return blob && blob.size < file.size ? blob : file;
  } finally {
    bitmap.close?.();
  }
}
