import { connectToDatabase } from "@/server/db/mongoose";
import { AuthRateLimitModel } from "@/server/models/AuthRateLimit";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export async function assertLoginRateLimit(email: string): Promise<void> {
  const normalizedEmail = email.toLowerCase();
  await connectToDatabase();
  const record = await AuthRateLimitModel.findOne({ email: normalizedEmail }).lean();

  if (record && record.expiresAt.getTime() > Date.now() && record.count >= MAX_ATTEMPTS) {
    throw new Error("RATE_LIMITED");
  }
}

export async function registerFailedLoginAttempt(email: string): Promise<void> {
  const normalizedEmail = email.toLowerCase();
  const expiresAt = new Date(Date.now() + WINDOW_MS);

  await connectToDatabase();
  const current = await AuthRateLimitModel.findOne({ email: normalizedEmail }).lean();

  if (!current || current.expiresAt.getTime() <= Date.now()) {
    await AuthRateLimitModel.findOneAndUpdate(
      { email: normalizedEmail },
      { email: normalizedEmail, count: 1, expiresAt, updatedAt: new Date() },
      { upsert: true, returnDocument: "after" },
    );
    return;
  }

  await AuthRateLimitModel.updateOne(
    { email: normalizedEmail },
    { count: current.count + 1, updatedAt: new Date() },
  );
}

export async function clearFailedLoginAttempts(email: string): Promise<void> {
  const normalizedEmail = email.toLowerCase();
  await connectToDatabase();
  await AuthRateLimitModel.deleteOne({ email: normalizedEmail });
}
