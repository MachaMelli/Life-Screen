export type WeekStatus = 'gray' | 'green' | 'red' | 'black';

export interface CalendarConfig {
    birthYear: number;
    lifeExpectancy: number;
}

export interface WeekEntry {
    yearIndex: number;
    monthIndex: number;
    weekIndex: number;
    status: WeekStatus;
}

export interface CurrentPosition {
    year: number;
    month: number;
    week: number;
}

export interface CalendarStats {
    weeksLived: number;
    weeksLeft: number;
    totalWeeks: number;
    percentComplete: number;
}
