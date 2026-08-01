import { Schema, model, models, type InferSchemaType } from "mongoose";

const NewsletterSubscriberSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
  { timestamps: true }
);

export type NewsletterSubscriber = InferSchemaType<typeof NewsletterSubscriberSchema> & {
  _id: string;
};

export default models.NewsletterSubscriber ||
  model("NewsletterSubscriber", NewsletterSubscriberSchema);
