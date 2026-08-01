import { Schema, model, models, type InferSchemaType } from "mongoose";

// Holds every account that can log in. Access is governed by RBAC: a user's
// effective permissions are the union of their assigned `roles`. The legacy
// `role` string is retained for backward compatibility and migration — a user
// with role "admin" and no roles assigned is treated as Super Administrator.
const AdminUserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "member"], default: "member" }, // legacy
    roles: { type: [Schema.Types.ObjectId], ref: "Role", default: [] },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

export type AdminUser = InferSchemaType<typeof AdminUserSchema> & { _id: string };

export default models.AdminUser || model("AdminUser", AdminUserSchema);
