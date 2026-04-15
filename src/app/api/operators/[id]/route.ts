import { requireSessionActor } from "@/server/lib/auth/session";
import { updateOperatorSchema } from "@/server/lib/operators/validation";
import { AppError } from "@/server/errors/AppError";
import { handleApiRequest } from "@/server/errors/response";
import { deleteOperatorForActor, getOperatorForActor, updateOperatorForActor } from "@/server/service/operators.service";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  return handleApiRequest(request, async () => {
    const actor = await requireSessionActor();
    const { id } = await context.params;
    return { data: await getOperatorForActor(actor, id) };
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
    const parsed = updateOperatorSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError("VALIDATION_ERROR", "Invalid operator update payload.", parsed.error.flatten());
    }

    return { data: await updateOperatorForActor(actor, id, parsed.data, requestId) };
  });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  return handleApiRequest(request, async (requestId) => {
    const actor = await requireSessionActor();
    const { id } = await context.params;
    return { data: { deleted: true, operator: await deleteOperatorForActor(actor, id, requestId) } };
  });
}
