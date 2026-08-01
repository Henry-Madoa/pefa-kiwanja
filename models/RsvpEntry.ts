import { Schema, model, models, type InferSchemaType } from "mongoose";

const RsvpEntrySchema = new Schema(
  {
    eventSlug: { type: String, required: true },
    eventTitle: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    guests: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export type RsvpEntry = InferSchemaType<typeof RsvpEntrySchema> & { _id: string };

export default models.RsvpEntry || model("RsvpEntry", RsvpEntrySchema);
