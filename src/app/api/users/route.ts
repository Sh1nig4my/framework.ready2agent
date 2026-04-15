import { requireSessionActor } from "@/server/lib/auth/session";
import { handleApiRequest } from "@/server/errors/response";
import { getUsersDirectoryForActor } from "@/server/service/users.service";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return handleApiRequest(request, async () => {
    const actor = await requireSessionActor();
    return { data: await getUsersDirectoryForActor(actor) };
  });
}
