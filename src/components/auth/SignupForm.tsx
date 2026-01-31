'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import GoogleButton from './GoogleButton';

interface SignupFormProps {
    onSuccess?: () => void;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await signUp({ email, password });
            router.push('/login?signup=success');
            onSuccess?.();
        } catch (err: any) {
            if (err.message?.includes('User already registered')) {
                setError('An account with this email already exists');
            } else {
                setError(err.message || 'Failed to sign up');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <GoogleButton />

            <div className="relative mb-6 mt-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                    <span className="bg-white dark:bg-slate-900 px-2 text-slate-400 font-bold tracking-wider">
                        Or continue with email
                    </span>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        htmlFor="email"
                    >
                        Email address
                    </label>
                    <input
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:ring-primary focus:border-primary placeholder-slate-400 px-4 py-2"
                        id="email"
                        placeholder="name@company.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:ring-primary focus:border-primary placeholder-slate-400 px-4 py-2"
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        htmlFor="confirm-password"
                    >
                        Confirm Password
                    </label>
                    <input
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:ring-primary focus:border-primary placeholder-slate-400 px-4 py-2"
                        id="confirm-password"
                        placeholder="••••••••"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    className="w-full bg-primary text-white font-bold py-2.5 rounded-full hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={loading}
                >
                    {!loading && (
                        <span className="material-symbols-outlined text-[20px]">
                            person_add
                        </span>
                    )}
                    {loading ? 'Creating account...' : 'Sign up'}

                </button>
            </form>
        </div>
    );
}
