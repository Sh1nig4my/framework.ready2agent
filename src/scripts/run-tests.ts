import { spawnSync } from "node:child_process";

async function runTests() {
  const env = {
    ...process.env,
    APP_RUNTIME: "test",
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? "test-nextauth-secret",
    AUTH_TOKEN_PEPPER: process.env.AUTH_TOKEN_PEPPER ?? "test-auth-token-pepper",
    MONGODB_URI: process.env.MONGODB_URI ?? "mongodb://localhost:27017/ready2agent_test",
  };

  const result = spawnSync(
    process.execPath,
    ["--import", "tsx", "--test", "--test-concurrency=1", "src/tests/mongo-env-guardrails.test.ts"],
    {
      stdio: "inherit",
      env,
    },
  );

  process.exitCode = result.status ?? 1;
}

runTests().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
