import { requireSessionActor } from "@/server/lib/auth/session";
import { updateOperatorPermissionsSchema } from "@/server/lib/operators/validation";
import { AppError } from "@/server/errors/AppError";
import { handleApiRequest } from "@/server/errors/response";
import { updateOperatorPermissionsForActor } from "@/server/service/operators.service";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  return handleApiRequest(request, async (requestId) => {
    const actor = await requireSessionActor();
    const { id } = await context.params;
    const body = await request.json();
    const parsed = updateOperatorPermissionsSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError("VALIDATION_ERROR", "Invalid operator permissions payload.", parsed.error.flatten());
    }

    return { data: await updateOperatorPermissionsForActor(actor, id, parsed.data.permissions, requestId) };
  });
}
