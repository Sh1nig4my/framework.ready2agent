import { Schema, model, models } from "mongoose";

const AuthRateLimitSchema = new Schema(
  {
    email: { type: String, required: true, index: true, lowercase: true, trim: true },
    count: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    strict: true,
    timestamps: false,
  },
);

AuthRateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const AuthRateLimitModel =
  models.AuthRateLimit ?? model("AuthRateLimit", AuthRateLimitSchema);
