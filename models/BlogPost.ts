import { Schema, model, models, type InferSchemaType } from "mongoose";

const BlogPostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["News", "Devotional", "Testimony", "Mission Update", "Pastor's Message"],
      required: true,
    },
    author: { type: String, required: true },
    date: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: "" },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export type BlogPost = InferSchemaType<typeof BlogPostSchema> & { _id: string };

export default models.BlogPost || model("BlogPost", BlogPostSchema);
