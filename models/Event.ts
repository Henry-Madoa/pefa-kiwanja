import { Schema, model, models, type InferSchemaType } from "mongoose";

const EventSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    venue: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    organizer: { type: String, required: true },
    category: { type: String, required: true },
    capacity: { type: Number, required: true },
    registered: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export type ChurchEvent = InferSchemaType<typeof EventSchema> & { _id: string };

export default models.Event || model("Event", EventSchema);
