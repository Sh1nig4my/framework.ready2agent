import { requireSessionActor } from "@/server/lib/auth/session";
import { handleApiRequest } from "@/server/errors/response";
import { getOperatorDirectoryForActor } from "@/server/service/operators.service";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return handleApiRequest(request, async () => {
    const actor = await requireSessionActor();
    return { data: await getOperatorDirectoryForActor(actor) };
  });
}
