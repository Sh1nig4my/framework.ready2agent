import { requireSessionActor } from "@/server/lib/auth/session";
import { updateUserSchema } from "@/server/lib/users/validation";
import { AppError } from "@/server/errors/AppError";
import { handleApiRequest } from "@/server/errors/response";
import { getUserForActor, softDeleteUserForActor, updateUserForActor } from "@/server/service/users.service";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  return handleApiRequest(request, async () => {
    const actor = await requireSessionActor();
    const { id } = await context.params;
    return { data: await getUserForActor(actor, id) };
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
    const parsed = updateUserSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError("VALIDATION_ERROR", "Invalid user update payload.", parsed.error.flatten());
    }

    return { data: await updateUserForActor(actor, id, parsed.data, requestId) };
  });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  return handleApiRequest(request, async (requestId) => {
    const actor = await requireSessionActor();
    const { id } = await context.params;
    return { data: { deleted: true, user: await softDeleteUserForActor(actor, id, requestId) } };
  });
}
