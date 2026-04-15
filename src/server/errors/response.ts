import { randomUUID } from "crypto";
import { mapToHttp } from "@/server/errors/mapToHttp";

export interface ApiSuccessPayload<T> {
  data: T;
  status?: number;
}

export function createRequestId(headers?: Headers): string {
  return headers?.get("x-request-id") ?? randomUUID();
}

export function jsonSuccess<T>(data: T, requestId: string, status = 200): Response {
  return Response.json(
    {
      success: true,
      requestId,
      data,
    },
    { status },
  );
}

export function jsonError(error: unknown, requestId: string): Response {
  const mapped = mapToHttp(error);

  return Response.json(
    {
      success: false,
      requestId,
      error: {
        category: mapped.category,
        code: mapped.code,
        message: mapped.message,
        ...(mapped.details ? { details: mapped.details } : {}),
      },
    },
    { status: mapped.status },
  );
}

export async function handleApiRequest<T>(
  request: Request,
  handler: (requestId: string) => Promise<ApiSuccessPayload<T>>,
): Promise<Response> {
  const requestId = createRequestId(request.headers);

  try {
    const result = await handler(requestId);
    return jsonSuccess(result.data, requestId, result.status ?? 200);
  } catch (error) {
    return jsonError(error, requestId);
  }
}
