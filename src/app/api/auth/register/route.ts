import { registerStandardUser } from "@/server/service/auth.service";
import { handleApiRequest } from "@/server/errors/response";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleApiRequest(request, async (requestId) => {
    const body = await request.json();
    return {
      data: await registerStandardUser(body, requestId),
      status: 201,
    };
  });
}
