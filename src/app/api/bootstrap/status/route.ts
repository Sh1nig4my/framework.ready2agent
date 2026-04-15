import { isFirstRunSetupRequired } from "@/server/service/bootstrap.service";
import { handleApiRequest } from "@/server/errors/response";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return handleApiRequest(request, async () => ({
    data: {
      requiresSetup: await isFirstRunSetupRequired(),
    },
  }));
}
