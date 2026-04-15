import { requireSessionActor } from "@/server/lib/auth/session";
import { inviteOperatorSchema } from "@/server/lib/operators/validation";
import { AppError } from "@/server/errors/AppError";
import { handleApiRequest } from "@/server/errors/response";
import { inviteOperatorForActor } from "@/server/service/operators.service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleApiRequest(request, async (requestId) => {
    const actor = await requireSessionActor();
    const body = await request.json();
    const parsed = inviteOperatorSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError("VALIDATION_ERROR", "Invalid operator invite payload.", parsed.error.flatten());
    }

    return {
      data: await inviteOperatorForActor(actor, parsed.data, requestId),
      status: 201,
    };
  });
}
