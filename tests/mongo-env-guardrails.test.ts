import assert from "node:assert/strict";
import test from "node:test";
import mongoose from "mongoose";
import { parseEnvironment } from "@/server/config/env";
import { connectToDatabase } from "@/server/db/mongoose";

function buildValidEnv(overrides: Partial<Record<string, string>> = {}): Record<string, string> {
  return {
    APP_RUNTIME: "test",
    NEXT_PUBLIC_APP_URL: "http://localhost:3000",
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "test-nextauth-secret",
    AUTH_TOKEN_PEPPER: "test-auth-token-pepper",
    MONGODB_URI: "mongodb://localhost:27017/ready2agent",
    ...overrides,
  };
}

test("accepts a valid local MongoDB URI", () => {
  const parsed = parseEnvironment(buildValidEnv());
  assert.equal(parsed.MONGODB_URI, "mongodb://localhost:27017/ready2agent");
});

test("rejects placeholder MongoDB URI values", () => {
  assert.throws(
    () =>
      parseEnvironment(
        buildValidEnv({
          MONGODB_URI:
            "mongodb://username:password@host1:27017,host2:27017,host3:27017/ready2agent?ssl=true&replicaSet=your-replicaset",
        }),
      ),
    /MONGODB_URI contains placeholder values/i,
  );
});

test("returns guided message on MongoDB DNS errors", async () => {
  const originalConnect = mongoose.connect;

  (mongoose.connect as unknown) = async () => {
    throw new Error("getaddrinfo ENOTFOUND host1");
  };

  const cache = globalThis.__ready2agentMongooseCache;
  if (cache) {
    cache.conn = null;
    cache.promise = null;
  }

  try {
    await assert.rejects(
      () => connectToDatabase(),
      /Unable to reach MongoDB using MONGODB_URI\. Check \.env\.local/i,
    );
  } finally {
    (mongoose.connect as unknown) = originalConnect;

    if (cache) {
      cache.conn = null;
      cache.promise = null;
    }

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  }
});
