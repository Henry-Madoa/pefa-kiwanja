import { Schema, model, models, type InferSchemaType } from "mongoose";

// Images uploaded via the admin gallery. Currently powers the landing-page
// marquee; ordered by `order` then newest first.
const GalleryImageSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type GalleryImage = InferSchemaType<typeof GalleryImageSchema> & { _id: string };

export default models.GalleryImage || model("GalleryImage", GalleryImageSchema);
