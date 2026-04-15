import { createAuditLogRepository, listRecentAuditLogsRepository } from "@/server/repository/audit.repository";

export async function recordAuditEvent(input: {
  requestId: string;
  actorUserId?: string | null;
  action: string;
  resource: string;
  targetUserId?: string | null;
  metadata?: unknown;
}): Promise<void> {
  await createAuditLogRepository({
    ...input,
    createdAt: new Date(),
  });
}

export async function getRecentAuditActivity(limit = 6) {
  return listRecentAuditLogsRepository(limit);
}
