import { Schema, model, models } from "mongoose";

const SupportMessageSchema = new Schema(
  {
    actorUserId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    email: { type: String, required: true, lowercase: true, trim: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["open", "closed"], default: "open" },
    createdAt: { type: Date, default: Date.now },
  },
  {
    strict: true,
    timestamps: false,
  },
);

export const SupportMessageModel =
  models.SupportMessage ?? model("SupportMessage", SupportMessageSchema);
