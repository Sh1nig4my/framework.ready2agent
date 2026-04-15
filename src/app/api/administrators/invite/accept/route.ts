import { acceptAdministratorInvite } from "@/server/service/administrators.service";
import { acceptInviteSchema } from "@/server/dto/auth";
import { AppError } from "@/server/errors/AppError";
import { handleApiRequest } from "@/server/errors/response";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleApiRequest(request, async (requestId) => {
    const body = await request.json();
    const parsed = acceptInviteSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError("VALIDATION_ERROR", "Invalid administrator invite acceptance payload.", parsed.error.flatten());
    }

    return {
      data: await acceptAdministratorInvite(
        {
          token: parsed.data.token,
          firstName: parsed.data.firstName,
          lastName: parsed.data.lastName,
          password: parsed.data.password,
        },
        requestId,
      ),
      status: 201,
    };
  });
}
