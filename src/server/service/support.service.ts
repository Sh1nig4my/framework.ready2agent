import { recordAuditEvent } from "@/server/service/audit.service";
import { createSupportMessageRepository } from "@/server/repository/support.repository";

export async function createSupportRequest(input: {
  actorUserId?: string | null;
  email: string;
  subject: string;
  message: string;
  requestId?: string;
}) {
  const supportMessage = await createSupportMessageRepository({
    actorUserId: input.actorUserId ?? null,
    email: input.email,
    subject: input.subject,
    message: input.message,
    status: "open",
    createdAt: new Date(),
  });

  if (input.requestId) {
    await recordAuditEvent({
      requestId: input.requestId,
      actorUserId: input.actorUserId ?? null,
      action: "support.contact-admin",
      resource: "support",
      metadata: { email: input.email, subject: input.subject },
    });
  }

  return supportMessage;
}
