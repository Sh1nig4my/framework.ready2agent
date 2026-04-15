import { requireSessionActor } from "@/server/lib/auth/session";
import { updateAdministratorPermissionsSchema } from "@/server/lib/administrators/validation";
import { AppError } from "@/server/errors/AppError";
import { handleApiRequest } from "@/server/errors/response";
import { updateAdministratorPermissionsForActor } from "@/server/service/administrators.service";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  return handleApiRequest(request, async (requestId) => {
    const actor = await requireSessionActor();
    const { id } = await context.params;
    const body = await request.json();
    const parsed = updateAdministratorPermissionsSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError("VALIDATION_ERROR", "Invalid administrator permissions payload.", parsed.error.flatten());
    }

    return { data: await updateAdministratorPermissionsForActor(actor, id, parsed.data.permissions, requestId) };
  });
}
