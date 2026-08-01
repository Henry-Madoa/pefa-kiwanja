import { Schema, model, models, type InferSchemaType } from "mongoose";

const LeaderSchema = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    bio: { type: String, required: true },
    responsibilities: { type: String },
    // Profile picture stored as a data URL (data:image/...;base64,...).
    photo: { type: String },
    // Lower numbers show first.
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type Leader = InferSchemaType<typeof LeaderSchema> & { _id: string };

export default models.Leader || model("Leader", LeaderSchema);
