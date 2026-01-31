import { WEEKS_PER_YEAR, MS_PER_DAY } from "./constants";
import type { CurrentPosition, CalendarStats } from "@/types/calendar";

export function getCurrentPosition(birthYear: number): CurrentPosition {
  const now = new Date();
  const currentYear = now.getFullYear();
  const ageInYears = currentYear - birthYear;

  // Day of year (0-364)
  const startOfYear = new Date(currentYear, 0, 1);
  const dayOfYear = Math.floor(
    (now.getTime() - startOfYear.getTime()) / MS_PER_DAY,
  );

  // 13 months × 4 weeks = 52 weeks, each month ≈ 28 days
  const month = Math.min(Math.floor(dayOfYear / 28), 12); // 0-12
  const weekInMonth = Math.floor((dayOfYear % 28) / 7); // 0-3

  return {
    year: ageInYears,
    month: month,
    week: Math.min(weekInMonth, 3),
  };
}
export function calculateStats(
  birthYear: number,
  lifeExpectancy: number,
): CalendarStats {
  const currentPosition = getCurrentPosition(birthYear);
  const totalWeeks = lifeExpectancy * WEEKS_PER_YEAR;

  // Weeks lived is (age * 52) + (current month * 4) + current week
  const weeksLived =
    currentPosition.year * WEEKS_PER_YEAR +
    currentPosition.month * 4 +
    currentPosition.week +
    1;
  const weeksLeft = Math.max(0, totalWeeks - weeksLived);
  const percentComplete = Math.min(100, (weeksLived / totalWeeks) * 100);

  return {
    weeksLived,
    weeksLeft,
    totalWeeks,
    percentComplete,
  };
}
