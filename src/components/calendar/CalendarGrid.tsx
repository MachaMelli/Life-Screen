"use client";

import { useCalendar } from "@/context/CalendarContext";
import WeekSquare from "./WeekSquare";
import { WEEKS_PER_MONTH, MONTHS_PER_YEAR } from "@/lib/constants";
import { Virtuoso } from "react-virtuoso";
import { useMemo } from "react";

type CalendarItem =
    | { type: 'decade'; year: number }
    | { type: 'year'; year: number };

export default function CalendarGrid() {
    const { config, currentPosition, getWeekStatus, toggleWeekStatus, loading, weeks } = useCalendar();


    const items = useMemo(() => {
        const result: CalendarItem[] = [];
        for (let year = 1; year <= config.lifeExpectancy; year++) {
            if (year > 0 && year % 10 === 0) {
                result.push({ type: 'decade', year });
            }
            result.push({ type: 'year', year });
        }
        return result;
    }, [config.lifeExpectancy]);

    const statusCounts = useMemo(() => {
        const counts = {
            gray: 0,
            green: 0,
            red: 0,
            black: 0
        };

        const totalWeeks = config.lifeExpectancy * 52;

        // Calculate weeks lived (past weeks)
        const weeksLived = (currentPosition.year * 52) + (currentPosition.month * 4) + currentPosition.week + 1;

        (weeks || []).forEach(w => {
            if (w.status in counts) {
                counts[w.status as keyof typeof counts]++;
            }
        });

        // Neutral (black) includes explicit black status PLUS past weeks that are gray (default)
        // We need to find how many past weeks are NOT explicitly set to green, red, or black
        let explicitPastWeeksCount = 0;
        (weeks || []).forEach(w => {
            const isPast = w.yearIndex < currentPosition.year ||
                (w.yearIndex === currentPosition.year && w.monthIndex < currentPosition.month) ||
                (w.yearIndex === currentPosition.year && w.monthIndex === currentPosition.month && w.weekIndex < currentPosition.week);

            if (isPast && (w.status === 'green' || w.status === 'red' || w.status === 'black')) {
                explicitPastWeeksCount++;
            }
        });

        const pastGrayWeeks = Math.max(0, weeksLived - explicitPastWeeksCount);
        counts.black = counts.black + pastGrayWeeks;

        // Future (gray) is total weeks minus everything else
        counts.gray = totalWeeks - (counts.green + counts.red + counts.black);

        return counts;
    }, [weeks, config.lifeExpectancy, currentPosition]);



    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-hidden flex flex-col" id="calendar-grid">
            <div className="flex-1">
                <Virtuoso
                    data={items}
                    className="no-scrollbar"
                    style={{ height: '100%' }}
                    increaseViewportBy={800}
                    itemContent={(index, item) => {
                        if (item.type === 'decade') {
                            return (
                                <div className="grid-row decade-marker group px-8 py-2 animate-reveal">
                                    <div className="w-8 text-[11px] font-bold font-mono text-primary flex items-center justify-end pr-3 bg-white dark:bg-slate-900 z-10">
                                        {item.year}s
                                    </div>
                                    <div className="decade-line"></div>
                                </div>
                            );
                        }

                        const year = item.year;
                        return (
                            <div className="grid-row px-8 py-[2px] animate-reveal">
                                {/* Year Label */}
                                <div className="w-8 text-[10px] font-mono font-bold text-slate-400 flex items-center justify-end pr-2">
                                    {year}
                                </div>
                                <div className="flex gap-[8px]">
                                    {[...Array(MONTHS_PER_YEAR)].map((_, month) => (
                                        <div key={`month-${year}-${month}`} className="month-block">
                                            {[...Array(WEEKS_PER_MONTH)].map((_, weekInMonth) => {
                                                const status = getWeekStatus(year, month, weekInMonth);
                                                const isCurrentWeek =
                                                    year === currentPosition.year &&
                                                    month === currentPosition.month &&
                                                    weekInMonth === currentPosition.week;

                                                const isPast =
                                                    year < currentPosition.year ||
                                                    (year === currentPosition.year && month < currentPosition.month) ||
                                                    (year === currentPosition.year && month === currentPosition.month && weekInMonth < currentPosition.week);

                                                return (
                                                    <WeekSquare
                                                        key={`week-${year}-${month}-${weekInMonth}`}
                                                        yearIndex={year}
                                                        monthIndex={month}
                                                        weekIndex={weekInMonth}
                                                        status={status}
                                                        isCurrentWeek={isCurrentWeek}
                                                        isPast={isPast}
                                                        onClick={toggleWeekStatus}
                                                    />
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    }}
                    components={{
                        Footer: () => (
                            <div className="mt-16 mb-16 flex flex-wrap gap-10 items-center justify-center text-sm border-t border-slate-100 dark:border-slate-800 pt-10 px-8 animate-fade-in-up delay-500">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-transparent border border-slate-200 dark:border-slate-700"></div>
                                    <span className="font-mono font-bold text-slate-900 dark:text-white tracking-tighter">{statusCounts.gray}</span>
                                    <span className="text-slate-500 dark:text-slate-400 font-light tracking-tight">Future</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800 dark:bg-slate-300"></div>
                                    <span className="font-mono font-bold text-slate-900 dark:text-white tracking-tighter">{statusCounts.black}</span>
                                    <span className="text-slate-500 dark:text-slate-400 font-light tracking-tight">Neutral</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                                    <span className="font-mono font-bold text-slate-900 dark:text-white tracking-tighter">{statusCounts.green}</span>
                                    <span className="text-slate-500 dark:text-slate-400 font-light tracking-tight">Good</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                                    <span className="font-mono font-bold text-slate-900 dark:text-white tracking-tighter">{statusCounts.red}</span>
                                    <span className="text-slate-500 dark:text-slate-400 font-light tracking-tight">Bad</span>
                                </div>

                                <p className="w-full text-center mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                    Click any week to cycle through colors
                                </p>
                            </div>
                        )
                    }}
                />
            </div>
        </div>
    );
}
