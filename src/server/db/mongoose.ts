import mongoose from "mongoose";
import { env } from "@/server/config/env";

declare global {
  var __ready2agentMongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const globalCache = globalThis.__ready2agentMongooseCache ?? {
  conn: null,
  promise: null,
};

globalThis.__ready2agentMongooseCache = globalCache;

const mongoUri = env.database.mongoUri;
export const isDatabaseEnabled = true;

function mapConnectionError(error: unknown): Error {
  const message = error instanceof Error ? error.message : String(error);
  const isDnsOrNetworkIssue = /ENOTFOUND|querySrv|ETIMEOUT|getaddrinfo/i.test(message);

  if (isDnsOrNetworkIssue) {
    return new Error(
      "Unable to reach MongoDB using MONGODB_URI. Check .env.local and replace placeholder hosts with a real local or Atlas URI.",
      { cause: error instanceof Error ? error : undefined },
    );
  }

  return new Error("MongoDB connection failed. Verify MONGODB_URI credentials, network access, and cluster status.", {
    cause: error instanceof Error ? error : undefined,
  });
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is required in every runtime.");
  }

  if (globalCache.conn && globalCache.conn.connection.readyState === 1) {
    return globalCache.conn;
  }

  if (globalCache.conn && globalCache.conn.connection.readyState !== 1) {
    globalCache.conn = null;
    globalCache.promise = null;
  }

  if (!globalCache.promise) {
    globalCache.promise = mongoose
      .connect(mongoUri, {
        bufferCommands: false,
      })
      .catch((error) => {
        globalCache.conn = null;
        globalCache.promise = null;
        throw mapConnectionError(error);
      });
  }

  globalCache.conn = await globalCache.promise;

  return globalCache.conn;
}
