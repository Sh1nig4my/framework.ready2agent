export function ProgressBar({
  value,
  tone = "violet",
}: {
  value: number;
  tone?: "violet" | "green" | "pink" | "gold" | "blue" | "azure";
}) {
  const width = Math.max(0, Math.min(100, value));
  const color = {
    violet: "linear-gradient(90deg, var(--color-violet-strong), var(--color-violet))",
    green: "linear-gradient(90deg, var(--color-success-strong), var(--color-success))",
    pink: "linear-gradient(90deg, #b8477d, var(--color-pink))",
    gold: "linear-gradient(90deg, var(--color-warning-strong), var(--color-warning))",
    blue: "linear-gradient(90deg, var(--color-blue-strong), var(--color-blue))",
    azure: "linear-gradient(90deg, var(--color-azure-strong), var(--color-azure))",
  }[tone];

  return (
    <div className="h-2 overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-surface-soft)]">
      <div className="h-full rounded-full transition-all" style={{ width: `${width}%`, background: color }} />
    </div>
  );
}
