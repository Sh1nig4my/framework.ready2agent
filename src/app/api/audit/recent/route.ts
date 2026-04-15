import { requireSessionActor } from "@/server/lib/auth/session";
import { AppError } from "@/server/errors/AppError";
import { getRecentAuditActivity } from "@/server/service/audit.service";
import { handleApiRequest } from "@/server/errors/response";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return handleApiRequest(request, async () => {
    const actor = await requireSessionActor();

    if (actor.role === "USER") {
      throw new AppError("FORBIDDEN", "Audit activity is not available for this profile.");
    }

    const url = new URL(request.url);
    const rawLimit = Number(url.searchParams.get("limit") ?? "4");
    const limit = Number.isFinite(rawLimit) ? Math.max(1, Math.min(20, rawLimit)) : 4;

    return { data: await getRecentAuditActivity(limit) };
  });
}
