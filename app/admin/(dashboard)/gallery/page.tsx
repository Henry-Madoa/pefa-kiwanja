import Link from "next/link";
import { dbConnect } from "@/lib/mongodb";
import GalleryImageModel from "@/models/GalleryImage";
import { getCurrentUser } from "@/lib/rbac/access";
import { hasPermission } from "@/lib/rbac/permissions";
import GalleryUploader from "./GalleryUploader";
import { deleteGalleryImage } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const perms = (await getCurrentUser())?.permissions ?? [];
  const canManage = hasPermission(perms, "Media.Manage");

  await dbConnect();
  const images = await GalleryImageModel.find()
    .sort({ order: 1, createdAt: -1 })
    .lean<{ _id: unknown; url: string; alt?: string; order?: number }[]>();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-1">Gallery</h1>
        <p className="font-sans text-[0.9rem] text-ink-soft">
          {images.length} image{images.length === 1 ? "" : "s"} · shown in the landing-page marquee
        </p>
      </div>

      {canManage && <GalleryUploader />}

      {images.length === 0 ? (
        <p className="font-sans text-[0.9rem] text-ink-soft">
          No images yet. {canManage ? "Upload one above to get started." : ""}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={String(img._id)}
              className="bg-white border border-[color:var(--line)] rounded-lg overflow-hidden"
            >
              <div className="aspect-[4/3] bg-cream-dim overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.alt || "Gallery image"} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="font-sans text-[0.8rem] text-ink-soft truncate" title={img.alt}>
                  {img.alt || <span className="text-ink-soft/50">No description</span>}
                </p>
                <div className="flex items-center justify-between mt-2 font-sans text-[0.78rem]">
                  <span className="text-ink-soft/70">Order: {img.order ?? 0}</span>
                  {canManage && (
                    <span className="flex items-center gap-3">
                      <Link href={`/admin/gallery/${img._id}/edit`} className="text-wine hover:underline">
                        Edit
                      </Link>
                      <form action={deleteGalleryImage.bind(null, String(img._id))}>
                        <button type="submit" className="text-ink-soft hover:text-wine hover:underline">
                          Delete
                        </button>
                      </form>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
