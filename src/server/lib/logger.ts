type LogLevel = "info" | "warn" | "error";

export function logger(level: LogLevel, message: string, context?: unknown): void {
  const payload = {
    level,
    message,
    context,
    at: new Date().toISOString(),
  };

  if (level === "error") {
    console.error(payload);
    return;
  }

  if (level === "warn") {
    console.warn(payload);
    return;
  }

  console.info(payload);
}
