import { Schema, model, models } from "mongoose";

const AuthTokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    email: { type: String, required: true, lowercase: true, trim: true },
    type: {
      type: String,
      enum: ["EMAIL_VERIFY", "PASSWORD_RESET", "OPERATOR_INVITE", "ADMIN_INVITE"],
      required: true,
      index: true,
    },
    tokenHash: { type: String, required: true, index: true },
    payload: { type: Schema.Types.Mixed, default: null },
    expiresAt: { type: Date, required: true },
    usedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  {
    strict: true,
    timestamps: false,
  },
);

AuthTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const AuthTokenModel = models.AuthToken ?? model("AuthToken", AuthTokenSchema);