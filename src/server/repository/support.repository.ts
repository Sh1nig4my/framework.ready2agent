import { connectToDatabase } from "@/server/db/mongoose";
import { SupportMessageModel } from "@/server/models/SupportMessage";

interface SupportMessage {
  id: string;
  actorUserId?: string | null;
  email: string;
  subject: string;
  message: string;
  status: "open" | "closed";
  createdAt: Date;
}

export async function createSupportMessageRepository(
  payload: Omit<SupportMessage, "id">,
): Promise<SupportMessage> {
  await connectToDatabase();
  const message = await SupportMessageModel.create(payload);
  return {
    id: String(message._id),
    actorUserId: message.actorUserId ? String(message.actorUserId) : null,
    email: message.email,
    subject: message.subject,
    message: message.message,
    status: message.status,
    createdAt: message.createdAt,
  };
}
