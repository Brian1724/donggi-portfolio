export function formatYearRange(
  years: readonly (number | string)[],
  separator = "–",
) {
  const numericYears = years
    .map(Number)
    .filter((year) => Number.isInteger(year));

  if (numericYears.length === 0) return "";

  const first = Math.min(...numericYears);
  const last = Math.max(...numericYears);
  return first === last ? String(first) : `${first}${separator}${last}`;
}
