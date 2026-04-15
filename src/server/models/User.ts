import { Schema, model, models } from "mongoose";
import { ADMIN_PERMISSION_CATALOG } from "@/shared/auth/admin-permissions.catalog";
import { OPERATOR_PERMISSION_CATALOG } from "@/shared/auth/permissions.catalog";

const operatorPermissionsSchema = new Schema(
  Object.fromEntries(
    Object.entries(OPERATOR_PERMISSION_CATALOG).map(([resource, actions]) => [
      resource,
      {
        type: new Schema(
          Object.fromEntries(actions.map((action) => [action, { type: Boolean, default: false }])),
          { _id: false, id: false },
        ),
        default: () => undefined,
      },
    ]),
  ),
  { _id: false, id: false },
);

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    status: { type: String, enum: ["ACTIVE", "INACTIVE", "INVITED"], required: true, index: true },
    deletedAt: { type: Date, default: null },
    role: {
      type: String,
      enum: ["SUPER", "ADMIN", "OPERATOR", "USER"],
      required: true,
      index: true,
    },
    adminPermissions: { type: [String], enum: [...ADMIN_PERMISSION_CATALOG], default: [] },
    operatorPermissions: { type: operatorPermissionsSchema, default: null },
    emailVerifiedAt: { type: Date, default: null },
    termsAcceptedAt: { type: Date, default: null },
    privacyAcceptedAt: { type: Date, default: null },
    lastLoginAt: { type: Date, default: null },
    invitationSentAt: { type: Date, default: null },
    invitedByUserId: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  {
    strict: true,
    timestamps: true,
  },
);

export const UserModel = models.User ?? model("User", UserSchema);
