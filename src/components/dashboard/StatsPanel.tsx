"use client";

import { useCalendar } from "@/context/CalendarContext";

export default function StatsPanel() {
    const { stats, loading } = useCalendar();

    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm animate-pulse">
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded mb-6"></div>
                <div className="flex flex-col items-center mb-8">
                    <div className="w-40 h-40 rounded-full border-8 border-slate-100 dark:border-slate-800"></div>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="h-16 bg-slate-50 dark:bg-slate-800/50 rounded-lg"></div>
                        <div className="h-16 bg-slate-50 dark:bg-slate-800/50 rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    const { weeksLived, weeksLeft, percentComplete } = stats;
    const strokeDasharray = 439.8; // 2 * PI * 70
    const strokeDashoffset = strokeDasharray - (strokeDasharray * percentComplete) / 100;

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm animate-scale-in">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">analytics</span>{" "}
                Statistics
            </h3>
            <div className="flex flex-col items-center mb-8 relative">
                <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            className="text-slate-100 dark:text-slate-800"
                            cx="80"
                            cy="80"
                            fill="transparent"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="12"
                        ></circle>
                        <circle
                            className="text-primary transition-all duration-1000 ease-out"
                            cx="80"
                            cy="80"
                            fill="transparent"
                            r="70"
                            stroke="currentColor"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            strokeWidth="12"
                            strokeLinecap="round"
                        ></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold font-mono tracking-tighter text-slate-900 dark:text-white">
                            {percentComplete.toFixed(1)}%
                        </span>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="material-symbols-outlined text-[14px] text-slate-400">
                                history
                            </span>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                Weeks Lived
                            </p>
                        </div>
                        <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white tracking-tighter">
                            {weeksLived.toLocaleString()}
                        </p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="material-symbols-outlined text-[14px] text-primary">
                                hourglass
                            </span>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                Weeks Left
                            </p>
                        </div>
                        <p className="text-2xl font-bold font-mono text-primary tracking-tighter">
                            {weeksLeft.toLocaleString()}
                        </p>
                    </div>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${percentComplete}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
