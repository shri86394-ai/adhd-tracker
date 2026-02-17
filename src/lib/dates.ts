export function todayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

export function toDateOnly(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function formatDate(date: Date, style: "short" | "long" = "short"): string {
  if (style === "long") {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getStartOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
