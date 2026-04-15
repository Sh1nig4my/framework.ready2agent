import { requireSessionActor } from "@/server/lib/auth/session";
import { reauthenticateActor } from "@/server/service/auth.service";
import { reauthSchema } from "@/server/dto/auth";
import { AppError } from "@/server/errors/AppError";
import { handleApiRequest } from "@/server/errors/response";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleApiRequest(request, async (requestId) => {
    const actor = await requireSessionActor();
    const body = await request.json();
    const parsed = reauthSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError("VALIDATION_ERROR", "Invalid reauth payload.", parsed.error.flatten());
    }

    return { data: await reauthenticateActor(actor, parsed.data.password, requestId) };
  });
}
