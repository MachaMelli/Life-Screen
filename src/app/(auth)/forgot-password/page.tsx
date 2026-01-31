"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const { resetPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            await resetPassword(email);
            setMessage("Check your email for the reset link.");
        } catch (err: any) {
            setError(err.message || "Failed to send reset email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Forgot Password</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
                Enter your email address and we'll send you a link to reset your password.
            </p>

            {message && (
                <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-700 dark:text-emerald-400 text-sm flex items-start gap-3">
                    <span className="material-symbols-outlined text-emerald-500 mt-0.5">check_circle</span>
                    <p>{message}</p>
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-sm flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-500 mt-0.5">error</span>
                    <p>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="email">
                        Email address
                    </label>
                    <input
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:ring-primary focus:border-primary placeholder-slate-400 px-4 py-2.5"
                        id="email"
                        placeholder="name@company.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <button
                    className="w-full bg-primary text-white font-bold py-3 rounded-full hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                    {!loading && <span className="material-symbols-outlined text-[20px]">send</span>}
                </button>
            </form>

            <div className="mt-8 text-center">
                <Link
                    href="/login"
                    replace={true}
                    className="text-sm font-semibold text-primary hover:underline flex items-center justify-center gap-1"
                >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Back to Login
                </Link>
            </div>
        </div>
    );
}
