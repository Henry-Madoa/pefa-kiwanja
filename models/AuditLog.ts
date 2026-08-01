import { Schema, model, models, type InferSchemaType } from "mongoose";

// Records sensitive actions: user creation, role assignment, permission and
// role changes. Append-only from the app's perspective.
const AuditLogSchema = new Schema(
  {
    actorId: { type: String, required: true },
    actorName: { type: String, default: "" },
    actorEmail: { type: String, default: "" },
    action: { type: String, required: true }, // e.g. "User.AssignRole"
    target: { type: String, default: "" }, // affected entity label/id
    detail: { type: String, default: "" },
  },
  { timestamps: true }
);

export type AuditLog = InferSchemaType<typeof AuditLogSchema> & { _id: string };

export default models.AuditLog || model("AuditLog", AuditLogSchema);
