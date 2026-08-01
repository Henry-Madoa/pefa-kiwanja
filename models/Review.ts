import { Schema, model, models, type InferSchemaType } from "mongoose";

const ReviewSchema = new Schema(
  {
    refType: { type: String, enum: ["blog", "sermon"], required: true },
    refSlug: { type: String, required: true, trim: true },
    refTitle: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ReviewSchema.index({ refType: 1, refSlug: 1, createdAt: -1 });

export type Review = InferSchemaType<typeof ReviewSchema> & { _id: string };

export default models.Review || model("Review", ReviewSchema);
