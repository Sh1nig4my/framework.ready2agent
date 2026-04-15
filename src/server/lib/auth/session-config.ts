const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

export const SESSION_TTL_STANDARD_MS = DAY_MS;
export const SESSION_TTL_REMEMBER_MS = 7 * DAY_MS;
export const SESSION_TTL_STANDARD_SECONDS = Math.floor(SESSION_TTL_STANDARD_MS / 1000);
export const SESSION_TTL_REMEMBER_SECONDS = Math.floor(SESSION_TTL_REMEMBER_MS / 1000);

export const REAUTH_WINDOW_MS = 10 * 60 * 1000;

export function getSessionTtlMs(remember: boolean): number {
  return remember ? SESSION_TTL_REMEMBER_MS : SESSION_TTL_STANDARD_MS;
}

export function computeSessionExpiry(signedInAt: number, remember: boolean): number {
  return signedInAt + getSessionTtlMs(remember);
}
