export function formatDate({
  startDate,
  endDate,
}: {
  startDate: string | null;
  endDate: string | null;
}): string {
  if (!startDate) return "Unknown";

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "Unknown";

    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    return `${startYear}-${endYear}`;
  } else if (startDate) {
    const date = new Date(startDate);
    if (isNaN(date.getTime())) return "Unknown";

    const year = date.getFullYear();
    return year.toString();
  }

  return "Unknown";
}
