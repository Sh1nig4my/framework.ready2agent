import { AppError } from "@/server/errors/AppError";
import { errorCodeMetadata, type ErrorCategory, type ErrorCode } from "@/server/errors/codes";

export function mapToHttp(error: unknown): {
  status: number;
  category: ErrorCategory;
  code: ErrorCode;
  message: string;
  details?: unknown;
} {
  if (error instanceof AppError) {
    const metadata = errorCodeMetadata[error.code] ?? errorCodeMetadata.INTERNAL_ERROR;

    return {
      status: metadata.status,
      category: metadata.category,
      code: error.code,
      message: error.message,
      details: error.details,
    };
  }

  return {
    status: errorCodeMetadata.INTERNAL_ERROR.status,
    category: errorCodeMetadata.INTERNAL_ERROR.category,
    code: "INTERNAL_ERROR",
    message: "Unexpected server error.",
  };
}
