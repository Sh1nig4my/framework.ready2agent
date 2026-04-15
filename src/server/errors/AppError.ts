import type { ErrorCode } from "@/server/errors/codes";

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly details?: unknown;

  constructor(code: ErrorCode, message: string, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.details = details;
  }
}
