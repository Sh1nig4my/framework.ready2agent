import { z } from "zod";

const APP_RUNTIMES = ["live", "demo", "test"] as const;
const mongoUriPrefixPattern = /^mongodb(\+srv)?:\/\//i;
const mongoUriPlaceholderTokens = ["host1", "host2", "host3", "username", "password", "your-replicaset"];

const requiredNonEmptyString = z.string().min(1);
const requiredUrlString = z.string().url();
const optionalPositiveInt = z.number().int().positive().optional();
const requiredMongoUri = requiredNonEmptyString
  .refine((value) => mongoUriPrefixPattern.test(value), {
    message: "MONGODB_URI must start with mongodb:// or mongodb+srv://",
  })
  .refine(
    (value) => {
      const normalized = value.toLowerCase();
      return !mongoUriPlaceholderTokens.some((token) => normalized.includes(token));
    },
    {
      message: "MONGODB_URI contains placeholder values. Replace it with a real MongoDB URI.",
    },
  );

function normalizeEnvValue(value: string | undefined): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeNumber(value: string | undefined): number | undefined {
  const normalized = normalizeEnvValue(value);
  if (!normalized) {
    return undefined;
  }

  return Number(normalized);
}

type EnvSource = Record<string, string | undefined>;

function readRawEnv(source: EnvSource) {
  return {
    APP_RUNTIME: normalizeEnvValue(source.APP_RUNTIME),
    NEXT_PUBLIC_APP_URL: normalizeEnvValue(source.NEXT_PUBLIC_APP_URL),
    NEXTAUTH_URL: normalizeEnvValue(source.NEXTAUTH_URL),
    NEXTAUTH_SECRET: normalizeEnvValue(source.NEXTAUTH_SECRET),
    AUTH_TOKEN_PEPPER: normalizeEnvValue(source.AUTH_TOKEN_PEPPER),
    MONGODB_URI: normalizeEnvValue(source.MONGODB_URI),
    AUDIT_TTL_SECONDS: normalizeNumber(source.AUDIT_TTL_SECONDS),
  };
}

const envSchema = z
  .object({
    APP_RUNTIME: z.enum(APP_RUNTIMES),
    NEXT_PUBLIC_APP_URL: requiredUrlString,
    NEXTAUTH_URL: requiredUrlString,
    NEXTAUTH_SECRET: requiredNonEmptyString,
    AUTH_TOKEN_PEPPER: requiredNonEmptyString,
    MONGODB_URI: requiredMongoUri,
    AUDIT_TTL_SECONDS: optionalPositiveInt,
  });

function buildEnvValidationError(issues: z.ZodIssue[]): Error {
  const lines = issues.map((issue) => `- ${issue.path.join(".") || "env"}: ${issue.message}`).join("\n");

  const guidance = [
    "Guidance:",
    "- Copy .env.example to .env.local for local development.",
    "- Set APP_RUNTIME, NEXT_PUBLIC_APP_URL, NEXTAUTH_URL, NEXTAUTH_SECRET, AUTH_TOKEN_PEPPER, and MONGODB_URI for every runtime.",
    "- Use a real MONGODB_URI (mongodb://localhost:27017/ready2agent for local dev, or your Atlas mongodb+srv URI).",
    "- Database access is mandatory in live, demo, and test runtimes.",
  ].join("\n");

  return new Error(`Invalid environment configuration:\n${lines}\n\n${guidance}`);
}

export function parseEnvironment(source: EnvSource): z.infer<typeof envSchema> {
  const parsedEnv = envSchema.safeParse(readRawEnv(source));

  if (!parsedEnv.success) {
    throw buildEnvValidationError(parsedEnv.error.issues);
  }

  return parsedEnv.data;
}

const parsedEnv = parseEnvironment(process.env as EnvSource);

const runtime = parsedEnv.APP_RUNTIME;

export type AppRuntime = (typeof APP_RUNTIMES)[number];

export const isLiveRuntime = runtime === "live";
export const isDemoRuntime = runtime === "demo";
export const isTestRuntime = runtime === "test";

export const env = {
  runtime,
  isLive: isLiveRuntime,
  isDemo: isDemoRuntime,
  isTest: isTestRuntime,
  app: {
    publicUrl: parsedEnv.NEXT_PUBLIC_APP_URL,
    nextAuthUrl: parsedEnv.NEXTAUTH_URL,
  },
  auth: {
    nextAuthSecret: parsedEnv.NEXTAUTH_SECRET,
    tokenPepper: parsedEnv.AUTH_TOKEN_PEPPER,
  },
  database: {
    mongoUri: parsedEnv.MONGODB_URI,
  },
  audit: {
    ttlSeconds: parsedEnv.AUDIT_TTL_SECONDS ?? 60 * 60 * 24 * 180,
  },
} as const;

export type Env = typeof env;
