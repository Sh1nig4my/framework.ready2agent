import { randomUUID } from "crypto";
import { cookies, headers } from "next/headers";
import { env } from "@/server/config/env";

interface ApiErrorPayload {
  category?: string;
  code?: string;
  message?: string;
  details?: unknown;
}

interface ApiEnvelope<T> {
  success?: boolean;
  data?: T;
  error?: ApiErrorPayload;
}

async function createForwardedCookieHeader(): Promise<string> {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
}

async function createRequestHeaders(init?: HeadersInit): Promise<Headers> {
  const incomingHeaders = await headers();
  const output = new Headers(init);
  const forwardedCookies = await createForwardedCookieHeader();

  if (forwardedCookies) {
    output.set("cookie", forwardedCookies);
  }

  if (!output.has("x-request-id")) {
    output.set("x-request-id", incomingHeaders.get("x-request-id") ?? randomUUID());
  }

  if (!output.has("accept")) {
    output.set("accept", "application/json");
  }

  return output;
}

function toInternalApiUrl(path: string): URL {
  return new URL(path, env.app.publicUrl);
}

export async function fetchInternalApi<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(toInternalApiUrl(path), {
    ...init,
    headers: await createRequestHeaders(init?.headers),
    cache: "no-store",
  });

  const payload = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok || !payload.success) {
    throw new Error(payload.error?.message ?? `Internal API request failed for ${path}`);
  }

  return payload.data as T;
}
