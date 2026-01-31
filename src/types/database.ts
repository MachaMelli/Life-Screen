export interface Calendar {
    id: string;
    user_id: string;
    birth_year: number;
    life_expectancy: number;
    created_at: string;
    updated_at: string;
}

export interface WeekEntry {
    id: string;
    calendar_id: string;
    year_index: number;
    month_index: number;
    week_index: number;
    status: 'gray' | 'black' | 'green' | 'red';
    updated_at: string;
}

export interface GuestCalendarData {
    birthYear: number;
    lifeExpectancy: number;
    weeks: Array<{
        year: number;
        month: number;
        week: number;
        status: 'gray' | 'black' | 'green' | 'red';
    }>;
}
