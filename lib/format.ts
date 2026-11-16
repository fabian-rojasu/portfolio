import type { createFormatter } from "next-intl";

type Formatter = ReturnType<typeof createFormatter>;
export type Period = { start: string; end?: string };

// Periods are "YYYY" or "YYYY-MM". Months are pinned to mid-month at noon UTC
// so no time zone can shift them into the previous month.
function formatPoint(format: Formatter, value: string) {
  if (value.length === 4) return value;
  return format.dateTime(new Date(`${value}-15T12:00:00Z`), { year: "numeric", month: "short" });
}

export function formatPeriod(format: Formatter, { start, end }: Period, present: string) {
  return `${formatPoint(format, start)} – ${end ? formatPoint(format, end) : present}`;
}
