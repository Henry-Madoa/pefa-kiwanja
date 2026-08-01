import { Schema, model, models, type InferSchemaType } from "mongoose";

const RoleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: "" },
    permissions: { type: [String], default: [] },
    // System roles are seeded defaults and cannot be deleted.
    isSystem: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type Role = InferSchemaType<typeof RoleSchema> & { _id: string };

export default models.Role || model("Role", RoleSchema);
