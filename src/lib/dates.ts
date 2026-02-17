const TIMEZONE = "America/New_York";

/**
 * Get the current date string (YYYY-MM-DD) in EST/EDT.
 */
export function todayDateString(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: TIMEZONE });
}

/**
 * Get a Date object representing the start of today in EST/EDT.
 * Returns a UTC Date set to midnight of today's EST date.
 */
export function getStartOfToday(): Date {
  const dateStr = todayDateString();
  return new Date(dateStr + "T00:00:00.000Z");
}

export function toDateOnly(date: Date): Date {
  const dateStr = date.toISOString().split("T")[0];
  return new Date(dateStr + "T00:00:00.000Z");
}

export function formatDate(date: Date, style: "short" | "long" = "short"): string {
  if (style === "long") {
    return new Date(date.toISOString().split("T")[0] + "T12:00:00").toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  }
  return new Date(date.toISOString().split("T")[0] + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateShort(date: Date): string {
  return new Date(date.toISOString().split("T")[0] + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    timeZone: "UTC",
  });
}

export function daysAgo(n: number): Date {
  const today = getStartOfToday();
  today.setDate(today.getDate() - n);
  return today;
}
