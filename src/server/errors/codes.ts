export const errorCodes = [
  "VALIDATION_ERROR",
  "UNAUTHENTICATED",
  "FORBIDDEN",
  "NOT_FOUND",
  "CONFLICT",
  "RATE_LIMITED",
  "INTERNAL_ERROR",
  "ACCOUNT_INACTIVE",
  "ACCOUNT_INVITED",
  "INVALID_CREDENTIALS",
  "TOKEN_INVALID_OR_EXPIRED",
  "REAUTH_REQUIRED",
  "OPERATOR_LIMIT_REACHED",
  "ADMIN_ALREADY_EXISTS",
  "SUPER_ALREADY_EXISTS",
] as const;

export type ErrorCode = (typeof errorCodes)[number];

export type ErrorCategory = "validation" | "auth" | "business" | "system";

export const errorCodeMetadata: Record<ErrorCode, { category: ErrorCategory; status: number }> = {
  VALIDATION_ERROR: { category: "validation", status: 400 },
  UNAUTHENTICATED: { category: "auth", status: 401 },
  FORBIDDEN: { category: "auth", status: 403 },
  NOT_FOUND: { category: "business", status: 404 },
  CONFLICT: { category: "business", status: 409 },
  RATE_LIMITED: { category: "auth", status: 429 },
  INTERNAL_ERROR: { category: "system", status: 500 },
  ACCOUNT_INACTIVE: { category: "auth", status: 403 },
  ACCOUNT_INVITED: { category: "auth", status: 403 },
  INVALID_CREDENTIALS: { category: "auth", status: 401 },
  TOKEN_INVALID_OR_EXPIRED: { category: "auth", status: 400 },
  REAUTH_REQUIRED: { category: "auth", status: 401 },
  OPERATOR_LIMIT_REACHED: { category: "business", status: 409 },
  ADMIN_ALREADY_EXISTS: { category: "business", status: 409 },
  SUPER_ALREADY_EXISTS: { category: "business", status: 409 },
};
