import { requireSessionActor } from "@/server/lib/auth/session";
import { updateAdministratorSchema } from "@/server/lib/administrators/validation";
import { AppError } from "@/server/errors/AppError";
import { handleApiRequest } from "@/server/errors/response";
import { deleteAdministratorForActor, getAdministratorForActor, updateAdministratorForActor } from "@/server/service/administrators.service";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  return handleApiRequest(request, async () => {
    const actor = await requireSessionActor();
    const { id } = await context.params;
    return { data: await getAdministratorForActor(actor, id) };
  });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  return handleApiRequest(request, async (requestId) => {
    const actor = await requireSessionActor();
    const { id } = await context.params;
    const body = await request.json();
    const parsed = updateAdministratorSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError("VALIDATION_ERROR", "Invalid administrator update payload.", parsed.error.flatten());
    }

    return { data: await updateAdministratorForActor(actor, id, parsed.data, requestId) };
  });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  return handleApiRequest(request, async (requestId) => {
    const actor = await requireSessionActor();
    const { id } = await context.params;
    return { data: { deleted: true, administrator: await deleteAdministratorForActor(actor, id, requestId) } };
  });
}
