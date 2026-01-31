'use client';

import React, { createContext, useContext } from 'react';
import { useCalendar as useCalendarHook } from '@/hooks/useCalendar';

const CalendarContext = createContext<ReturnType<typeof useCalendarHook> | null>(null);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
    const calendar = useCalendarHook();
    return (
        <CalendarContext.Provider value={calendar}>
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendar() {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error('useCalendar must be used within a CalendarProvider');
    }
    return context;
}
