"use client";

import Link from "next/link";

import SignupForm from "@/components/auth/SignupForm";
import { useLegal } from "@/components/legal/LegalModals";


export default function SignupPage() {
    const { openPrivacy, openTerms } = useLegal();

    return (
        <>
            <div className="flex border-b border-slate-100 dark:border-slate-800">
                <Link
                    href="/login"
                    replace={true}
                    className="flex-1 py-4 text-sm font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-center"
                >
                    Log in
                </Link>
                <button className="flex-1 py-4 text-sm font-semibold text-slate-900 dark:text-white relative">
                    Sign up
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary"></div>
                </button>
            </div>
            <SignupForm />
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
