"use client";

import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useLegal } from "@/components/legal/LegalModals";


function LoginContent() {
    const searchParams = useSearchParams();
    const isSignupSuccess = searchParams.get('signup') === 'success';
    const isResetSuccess = searchParams.get('reset') === 'success';
    const { openPrivacy, openTerms } = useLegal();


    return (
        <>
            <div className="flex border-b border-slate-100 dark:border-slate-800">
                <button className="flex-1 py-4 text-sm font-semibold text-slate-900 dark:text-white relative">
                    Log in
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary"></div>
                </button>
                <Link
                    href="/signup"
                    replace={true}
                    className="flex-1 py-4 text-sm font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-center"
                >
                    Sign up
                </Link>
            </div>

            {isSignupSuccess && (
                <div className="px-8 pt-6">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-700 dark:text-emerald-400 text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
                        <span className="material-symbols-outlined text-emerald-500 mt-0.5">
                            check_circle
                        </span>
                        <div>
                            <p className="font-bold mb-0.5">Account Created!</p>
                            <p className="opacity-90">Your account has been created. Verify your email and log in.</p>
                        </div>
                    </div>
                </div>
            )}

            {isResetSuccess && (
                <div className="px-8 pt-6">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-700 dark:text-emerald-400 text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
                        <span className="material-symbols-outlined text-emerald-500 mt-0.5">
                            check_circle
                        </span>
                        <div>
                            <p className="font-bold mb-0.5">Password Reset!</p>
                            <p className="opacity-90">Your password has been successfully updated. You can now log in.</p>
                        </div>
                    </div>
                </div>
            )}

            <LoginForm />
            <div className="px-8 py-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                <p className="text-xs text-slate-500 leading-relaxed">
                    By continuing, you agree to our{" "}
                    <button
                        onClick={openTerms}
                        className="underline hover:text-slate-700 dark:hover:text-slate-300"
                    >
                        Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                        onClick={openPrivacy}
                        className="underline hover:text-slate-700 dark:hover:text-slate-300"
                    >
                        Privacy Policy
                    </button>
                    .
                </p>
            </div>

        </>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="p-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
