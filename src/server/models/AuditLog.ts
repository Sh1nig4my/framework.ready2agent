import { Schema, model, models } from "mongoose";
import { env } from "@/server/config/env";

const AuditLogSchema = new Schema(
  {
    requestId: { type: String, required: true, index: true },
    actorUserId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    action: { type: String, required: true },
    resource: { type: String, required: true },
    targetUserId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    metadata: { type: Schema.Types.Mixed, default: null },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: env.audit.ttlSeconds,
    },
  },
  {
    strict: true,
    timestamps: false,
  },
);

export const AuditLogModel = models.AuditLog ?? model("AuditLog", AuditLogSchema);
