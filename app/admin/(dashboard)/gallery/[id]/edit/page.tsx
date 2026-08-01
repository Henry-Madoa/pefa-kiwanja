import { notFound, redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import GalleryImageModel from "@/models/GalleryImage";
import { can } from "@/lib/rbac/access";
import PhotoField from "../../../PhotoField";
import FormField from "../../../FormField";
import { updateGalleryImage } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditGalleryImagePage({ params }: { params: { id: string } }) {
  if (!(await can("Media.Manage"))) redirect("/admin/gallery");

  await dbConnect();
  const image = await GalleryImageModel.findById(params.id).lean<{
    url: string;
    alt?: string;
    order?: number;
  } | null>();
  if (!image) notFound();

  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-8">Edit Image</h1>
      <form
        action={updateGalleryImage.bind(null, params.id)}
        className="bg-white border border-[color:var(--line)] rounded-lg p-8 max-w-[640px] space-y-5"
      >
        <PhotoField
          label="Image"
          name="image"
          variant="cover"
          currentPhoto={image.url}
          allowRemove={false}
          helpText="Leave empty to keep the current image. JPG or PNG, up to 2 MB."
        />
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-5">
          <FormField label="Alt text (description)" name="alt" defaultValue={image.alt} />
          <FormField label="Display order" name="order" type="number" defaultValue={image.order ?? 0} />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}
