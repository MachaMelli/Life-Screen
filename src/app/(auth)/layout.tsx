"use client";

import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import Logo from "@/components/common/Logo";
import { useRouter } from "next/navigation";


export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isDark, toggleTheme } = useTheme();
    const router = useRouter();

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans min-h-screen flex items-center justify-center p-6 relative">
            <div className="absolute top-6 left-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-sm font-medium"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Go back
                </button>
            </div>
            <div className="absolute top-6 right-6">

                <button
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    {isDark ? (
                        <span className="material-symbols-outlined">light_mode</span>
                    ) : (
                        <span className="material-symbols-outlined">dark_mode</span>
                    )}
                </button>
            </div>
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <div className="mb-4">
                        <Logo size={48} />
                    </div>


                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <h1 className="text-2xl font-bold tracking-tight">Life Screen</h1>
                    </Link>

                    <p className="text-slate-500 text-sm mt-1">Make every week count.</p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}
