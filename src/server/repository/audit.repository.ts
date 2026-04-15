import { connectToDatabase } from "@/server/db/mongoose";
import { AuditLogModel } from "@/server/models/AuditLog";

interface AuditLog {
  id: string;
  requestId: string;
  actorUserId?: string | null;
  action: string;
  resource: string;
  targetUserId?: string | null;
  metadata?: unknown;
  createdAt: Date;
}

export async function createAuditLogRepository(
  payload: Omit<AuditLog, "id">,
): Promise<void> {
  await connectToDatabase();
  await AuditLogModel.create(payload);
}

export async function listRecentAuditLogsRepository(limit = 6): Promise<AuditLog[]> {
  await connectToDatabase();
  const logs = await AuditLogModel.find().sort({ createdAt: -1 }).limit(limit).lean();
  return logs.map((log) => ({
    id: String(log._id),
    requestId: log.requestId,
    actorUserId: log.actorUserId ? String(log.actorUserId) : null,
    action: log.action,
    resource: log.resource,
    targetUserId: log.targetUserId ? String(log.targetUserId) : null,
    metadata: log.metadata,
    createdAt: log.createdAt,
  }));
}
