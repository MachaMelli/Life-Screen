export const WEEKS_PER_YEAR = 52;
export const MONTHS_PER_YEAR = 13; // 13 months of 4 weeks
export const WEEKS_PER_MONTH = 4;
export const GUEST_STORAGE_KEY = "Life-Screen-guest-data";
export const MIGRATION_IGNORE_KEY = "Life-Screen-migration-ignore";
export const MS_PER_DAY = 1000 * 60 * 60 * 24;
export const COLOR_CYCLE: Array<"gray" | "green" | "red" | "black"> = [
  "gray",
  "green",
  "red",
  "black",
];

export const WEEK_COLORS = {
  gray: "bg-transparent border-slate-200 dark:border-slate-800",
  green: "bg-emerald-500 border-emerald-600",
  red: "bg-rose-500 border-rose-600",
  black:
    "bg-slate-800 dark:bg-slate-300 border-slate-900 dark:border-slate-400",
};

export function getNextStatus(
  currentStatus: "gray" | "green" | "red" | "black",
  isPast = false,
): "gray" | "green" | "red" | "black" {
  const currentIndex = COLOR_CYCLE.indexOf(currentStatus);
  let nextIndex = (currentIndex + 1) % COLOR_CYCLE.length;

  // If it's a past week, skip 'gray' because it renders the same as 'black'
  if (isPast && COLOR_CYCLE[nextIndex] === "gray") {
    nextIndex = (nextIndex + 1) % COLOR_CYCLE.length;
  }

  return COLOR_CYCLE[nextIndex];
}
