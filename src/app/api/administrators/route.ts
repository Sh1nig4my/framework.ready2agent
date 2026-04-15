import { requireSessionActor } from "@/server/lib/auth/session";
import { handleApiRequest } from "@/server/errors/response";
import { getAdministratorDirectoryForActor } from "@/server/service/administrators.service";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return handleApiRequest(request, async () => {
    const actor = await requireSessionActor();
    return { data: await getAdministratorDirectoryForActor(actor) };
  });
}
