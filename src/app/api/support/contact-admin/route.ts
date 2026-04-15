import { supportContactRequestSchema } from "@/server/dto/support";
import { createSupportRequest } from "@/server/service/support.service";
import { getCurrentSessionActor } from "@/server/lib/auth/session";
import { AppError } from "@/server/errors/AppError";
import { createRequestId, jsonError, jsonSuccess } from "@/server/errors/response";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const requestId = createRequestId(request.headers);

  try {
    const actor = await getCurrentSessionActor();
    const body = await request.json();
    const parsed = supportContactRequestSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError("VALIDATION_ERROR", "Invalid support request payload.", parsed.error.flatten());
    }

    const data = await createSupportRequest({
      actorUserId: actor?.userId ?? null,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
      requestId,
    });

    return jsonSuccess(data, requestId, 201);
  } catch (error) {
    return jsonError(error, requestId);
  }
}
