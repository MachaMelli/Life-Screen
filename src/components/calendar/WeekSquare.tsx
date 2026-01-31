"use client";

import { memo } from "react";
import { WEEK_COLORS } from "@/lib/constants";
import { WeekStatus } from "@/types/calendar";

interface WeekSquareProps {
    yearIndex: number;
    monthIndex: number;
    weekIndex: number;
    status: WeekStatus;
    isCurrentWeek: boolean;
    isPast: boolean;
    onClick: (year: number, month: number, week: number) => void;
}

const WeekSquare = memo(function WeekSquare({
    yearIndex,
    monthIndex,
    weekIndex,
    status,
    isCurrentWeek,
    isPast,
    onClick,
}: WeekSquareProps) {
    // Determine display color
    let displayColor = WEEK_COLORS[status];

    // If it's a past week and status is gray, default to black (lived)
    if (isPast && status === 'gray') {
        displayColor = WEEK_COLORS['black'];
    }

    return (
        <div
            onClick={() => onClick(yearIndex, monthIndex, weekIndex)}
            className={`
                week-square rounded-full w-[10px] h-[10px] border cursor-pointer transition-transform hover:scale-125
                ${displayColor}
                ${isCurrentWeek ? 'ring-2 ring-primary ring-offset-1 z-10' : ''}
            `}
            title={`Year ${yearIndex}, Month ${monthIndex + 1}, Week ${weekIndex + 1}`}
        />
    );
});

export default WeekSquare;
