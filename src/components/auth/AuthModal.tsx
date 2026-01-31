'use client';

import { useRouter } from 'next/navigation';
import { GUEST_STORAGE_KEY } from '@/lib/constants';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const router = useRouter();

    if (!isOpen) return null;

    const handleGuestMode = () => {
        // Only initialize if no data exists
        const existingData = localStorage.getItem(GUEST_STORAGE_KEY);
        if (!existingData) {
            const guestData = {
                birthYear: new Date().getFullYear() - 25,
                lifeExpectancy: 80,
                weeks: [],
            };
            localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(guestData));
        }
        router.push('/dashboard');
        onClose();
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white dark:bg-slate-900 rounded-[48px] shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-slate-900 dark:text-white tracking-tighter">
                            Visualize Your Life
                        </h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                            Choose how you'd like to continue
                        </p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleGuestMode}
                            className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3 tracking-tight"
                        >
                            <span className="material-symbols-outlined">person_off</span>
                            Continue as Guest
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase">
                                <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 font-bold tracking-[0.25em]">
                                    Or
                                </span>
                            </div>
                        </div>
                        <div className="bg-primary/[0.03] dark:bg-primary/10 border border-primary/10 dark:border-primary/20 rounded-3xl p-6 flex gap-4 items-start">
                            <span className="material-symbols-outlined text-primary text-[24px]">cloud_sync</span>
                            <div className="text-left">
                                <p className="text-[15px] font-bold text-slate-900 dark:text-white mb-1 tracking-tight">Sync & Save Your Progress</p>
                                <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                                    Create an account to securely save your calendar and access it from any device.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                router.push('/signup');
                                onClose();
                            }}
                            className="w-full px-6 py-4 bg-primary text-white rounded-full font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">person_add</span>
                            Sign up
                        </button>



                        <button
                            onClick={() => {
                                router.push('/login');
                                onClose();
                            }}
                            className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3 tracking-tight"
                        >
                            <span className="material-symbols-outlined">login</span>
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
