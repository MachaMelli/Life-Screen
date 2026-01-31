"use client";

import { useState, useEffect } from "react";
import { useCalendar } from "@/context/CalendarContext";

export default function ParametersForm() {
    const { config, updateConfig, loading } = useCalendar();
    const [localBirthYear, setLocalBirthYear] = useState(config.birthYear);
    const [localLifeExpectancy, setLocalLifeExpectancy] = useState(config.lifeExpectancy);

    // Sync local state with config when config loads
    useEffect(() => {
        setLocalBirthYear(config.birthYear);
        setLocalLifeExpectancy(config.lifeExpectancy);
    }, [config.birthYear, config.lifeExpectancy]);

    // Debounce updates
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localBirthYear !== config.birthYear || localLifeExpectancy !== config.lifeExpectancy) {
                updateConfig({
                    birthYear: localBirthYear,
                    lifeExpectancy: localLifeExpectancy,
                });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [localBirthYear, localLifeExpectancy, updateConfig, config.birthYear, config.lifeExpectancy]);

    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm animate-pulse">
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
                <div className="space-y-4">
                    <div className="h-10 bg-slate-50 dark:bg-slate-800 rounded-lg"></div>
                    <div className="h-10 bg-slate-50 dark:bg-slate-800 rounded-lg"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm animate-scale-in delay-100">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">settings</span>{" "}
                Parameters
            </h3>
            <div className="space-y-5">
                <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Birth Year</label>
                    <input
                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium focus:ring-primary focus:border-primary px-3 py-2.5 tracking-tight [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        type="number"
                        value={localBirthYear}
                        onChange={(e) => setLocalBirthYear(parseInt(e.target.value) || 2000)}
                        min="1900"
                        max={new Date().getFullYear()}
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Life Expectancy (Years)
                    </label>
                    <input
                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium focus:ring-primary focus:border-primary px-3 py-2.5 tracking-tight [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        type="number"
                        value={localLifeExpectancy}
                        onChange={(e) => setLocalLifeExpectancy(parseInt(e.target.value) || 1)}
                        min="1"
                        max="150"
                    />
                </div>
            </div>
        </div>
    );
}
