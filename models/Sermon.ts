import { Schema, model, models, type InferSchemaType } from "mongoose";

const SermonSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true },
    speaker: { type: String, required: true },
    date: { type: String, required: true },
    scripture: { type: String, required: true },
    category: {
      type: String,
      enum: ["Sunday Service", "Midweek Service", "Conference", "Special Event"],
      required: true,
    },
    description: { type: String, required: true },
    youtubeId: { type: String, required: true },
    duration: { type: String, required: true },
  },
  { timestamps: true }
);

export type Sermon = InferSchemaType<typeof SermonSchema> & { _id: string };

export default models.Sermon || model("Sermon", SermonSchema);
