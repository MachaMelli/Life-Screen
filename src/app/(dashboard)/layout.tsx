"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StatsPanel from "@/components/dashboard/StatsPanel";
import ParametersForm from "@/components/dashboard/ParametersForm";
import MigrationPrompt from "@/components/dashboard/MigrationPrompt";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/context/ThemeContext";

import { CalendarProvider } from "@/context/CalendarContext";
import Logo from "@/components/common/Logo";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isDark, toggleTheme } = useTheme();
    const { user, loading, logOut, isGuest, mounted } = useAuth();

    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (error) {
            // Log out error
        }
    };

    return (
        <CalendarProvider>
            <MigrationPrompt />
            <div className="bg-slate-100 dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans min-h-screen flex flex-col">
                <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <Logo size={32} />
                            <h1 className="text-xl font-bold tracking-tight">
                                Life Screen
                            </h1>
                        </Link>
                        <div className="flex items-center gap-4">
                            <button
                                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                            >
                                {isDark ? (
                                    <span className="material-symbols-outlined">light_mode</span>
                                ) : (
                                    <span className="material-symbols-outlined">dark_mode</span>
                                )}
                            </button>
                            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800"></div>
                            {mounted && !loading && (
                                <>
                                    {user ? (
                                        <button
                                            onClick={handleLogOut}
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                logout
                                            </span>
                                            Log out
                                        </button>
                                    ) : isGuest ? (
                                        <Link
                                            href="/signup"
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                person_add
                                            </span>
                                            Sign up
                                        </Link>
                                    ) : (
                                        <Link
                                            href="/login"
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                login
                                            </span>
                                            Log in
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </header>
                <div className="flex flex-1 max-w-[1600px] mx-auto w-full px-6 py-8 gap-8 overflow-hidden">
                    <aside className="w-80 flex flex-col gap-6 shrink-0">
                        <StatsPanel />
                        <ParametersForm />
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">
                                    palette
                                </span>{" "}
                                Color Legend
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-slate-800 dark:bg-slate-300"></div>
                                    <span className="text-sm">Neutral</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                                    <span className="text-sm">Good</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-rose-500"></div>
                                    <span className="text-sm">Bad</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700"></div>
                                    <span className="text-sm">Future</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 p-7 rounded-2xl shadow-sm">
                            <span className="material-symbols-outlined text-emerald-500 mb-4 block scale-125">
                                format_quote
                            </span>
                            <p className="text-emerald-900 dark:text-emerald-200 text-[15px] font-medium italic leading-relaxed tracking-tight">
                                "Remembering that I'll be dead soon is the most important tool
                                I've ever encountered to help me make the big choices in life.
                                Because almost everything — all external expectations, all pride, all fear of embarrassment or failure
                                — these things just fall away in the face of death, leaving only what is truly important."
                            </p>
                            <p className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold mt-5 uppercase tracking-[0.2em]">
                                — Steve Jobs
                            </p>
                        </div>
                    </aside>
                    <main className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[48px] shadow-sm">
                        {children}
                    </main>
                </div>
            </div>
        </CalendarProvider>
    );
}

