"use client";

import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/common/Logo";


export default function Header() {
    const { isDark, toggleTheme } = useTheme();
    const { user, loading, logOut } = useAuth();

    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (error) {
            // Log out error
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-life-border dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <Logo size={40} />
                    <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white">Life Screen</span>
                </Link>
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        className="text-sm font-semibold text-slate-600 dark:text-slate-400 px-4 py-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all tracking-tight"
                        href="#features"
                    >
                        Features
                    </Link>
                    <Link
                        className="text-sm font-semibold text-slate-600 dark:text-slate-400 px-4 py-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all tracking-tight"
                        href="#philosophy"
                    >
                        Philosophy
                    </Link>
                    <Link
                        className="text-sm font-semibold text-slate-600 dark:text-slate-400 px-4 py-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all tracking-tight"
                        href="#privacy"
                    >
                        Privacy
                    </Link>
                    <button
                        className="px-4 py-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {isDark ? (
                            <span className="material-symbols-outlined dark:text-white text-[20px]">light_mode</span>
                        ) : (
                            <span className="material-symbols-outlined text-slate-600 text-[20px]">dark_mode</span>
                        )}
                    </button>
                    {!loading && (
                        <>
                            {user ? (
                                <button
                                    onClick={handleLogOut}
                                    className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2 tracking-tight"
                                >
                                    <span className="material-symbols-outlined text-[20px]">logout</span>
                                    Log out
                                </button>
                            ) : (
                                <Link
                                    className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2 tracking-tight"
                                    href="/login"
                                >
                                    <span className="material-symbols-outlined text-[20px]">login</span>
                                    Log in
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

