import { initializeFirstSuperUser } from "@/server/service/bootstrap.service";
import { createRequestId, jsonError, jsonSuccess } from "@/server/errors/response";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const requestId = createRequestId(request.headers);

  try {
    const body = await request.json();
    const data = await initializeFirstSuperUser(body, requestId);
    return jsonSuccess(data, requestId, 201);
  } catch (error) {
    return jsonError(error, requestId);
  }
}
