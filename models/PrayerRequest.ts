import { Schema, model, models, type InferSchemaType } from "mongoose";

const PrayerRequestSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    category: { type: String, required: true },
    request: { type: String, required: true },
    anonymous: { type: Boolean, default: false },
    prayedFor: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type PrayerRequest = InferSchemaType<typeof PrayerRequestSchema> & { _id: string };

export default models.PrayerRequest || model("PrayerRequest", PrayerRequestSchema);
