import { Schema, model, models, type InferSchemaType } from "mongoose";

const MinistrySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    leader: { type: String, default: "" },
    contact: { type: String, default: "" },
    schedule: { type: String, default: "" },
    upcoming: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type Ministry = InferSchemaType<typeof MinistrySchema> & { _id: string };

export default models.Ministry || model("Ministry", MinistrySchema);
