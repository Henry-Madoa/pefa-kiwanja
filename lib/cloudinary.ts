// Client-safe Cloudinary helpers (URL building only — no SDK, no secrets).
// The cloud name is public, so it's fine to expose via NEXT_PUBLIC_*.

export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "not5pvxb";

// Deliver ANY remote image (e.g. an Unsplash URL) through Cloudinary's
// fetch delivery, with automatic format + quality optimization and CDN caching.
export function cloudinaryFetch(
  remoteUrl: string,
  transforms = "f_auto,q_auto"
): string {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/${transforms}/${encodeURIComponent(
    remoteUrl
  )}`;
}
