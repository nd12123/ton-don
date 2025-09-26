// lib/format.ts
const dtfUTC = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});
export const formatUTC = (iso?: string | null) =>
  iso ? dtfUTC.format(new Date(iso)) : "-";
