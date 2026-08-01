import { Schema, model, models, type InferSchemaType } from "mongoose";

const BoardMemberSchema = new Schema(
  {
    // Honorific / prefix, e.g. "Dr.", "Rev.", "Mr.", "Mrs."
    title: { type: String, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    // A short note / bio about the person.
    note: { type: String },
    // Profile picture stored as a data URL (data:image/...;base64,...).
    photo: { type: String },
    // Lower numbers show first (e.g. Chairman = 0).
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type BoardMember = InferSchemaType<typeof BoardMemberSchema> & { _id: string };

export default models.BoardMember || model("BoardMember", BoardMemberSchema);
