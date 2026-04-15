import { requireSessionActor } from "@/server/lib/auth/session";
import { assertAdminOrSuper } from "@/server/lib/auth/guards";
import { OPERATOR_PERMISSION_CATALOG, createDefaultOperatorPermissions } from "@/shared/auth/permissions.catalog";
import { createRequestId, jsonError, jsonSuccess } from "@/server/errors/response";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const requestId = createRequestId(request.headers);

  try {
    const actor = await requireSessionActor();
    assertAdminOrSuper(actor);

    return jsonSuccess(
      {
        catalog: OPERATOR_PERMISSION_CATALOG,
        defaults: createDefaultOperatorPermissions(),
      },
      requestId,
    );
  } catch (error) {
    return jsonError(error, requestId);
  }
}
