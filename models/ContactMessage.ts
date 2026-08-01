import { Schema, model, models, type InferSchemaType } from "mongoose";

const ContactMessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type ContactMessage = InferSchemaType<typeof ContactMessageSchema> & { _id: string };

export default models.ContactMessage || model("ContactMessage", ContactMessageSchema);
