import { requireSessionActor } from "@/server/lib/auth/session";
import { inviteAdministratorSchema } from "@/server/lib/administrators/validation";
import { inviteAdministratorForActor } from "@/server/service/administrators.service";
import { AppError } from "@/server/errors/AppError";
import { handleApiRequest } from "@/server/errors/response";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleApiRequest(request, async (requestId) => {
    const actor = await requireSessionActor();
    const body = await request.json();
    const parsed = inviteAdministratorSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError("VALIDATION_ERROR", "Invalid administrator invite payload.", parsed.error.flatten());
    }

    return {
      data: await inviteAdministratorForActor(actor, parsed.data, requestId),
      status: 201,
    };
  });
}
