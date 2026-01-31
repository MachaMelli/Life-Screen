'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import AuthModal from '@/components/auth/AuthModal';
import { useAuth } from '@/hooks/useAuth';

export default function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, loading } = useAuth();
    const router = useRouter();

    const handleStartJourney = () => {
        // If user is already logged in, redirect to dashboard
        if (user) {
            router.push('/dashboard');
        } else {
            // Otherwise, open the auth modal
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <section className="relative pt-40 pb-20 px-6 overflow-hidden transition-colors">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/rabbit.webp"
                        alt="Background"
                        fill
                        priority
                        className="object-cover opacity-80 dark:opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background-light/30 to-background-light dark:from-background-dark/20 dark:to-background-dark"></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-serif font-medium leading-[1.05] mb-8 text-slate-900 dark:text-white tracking-tighter animate-fade-in-up">
                        Your entire life, <br />
                        <span className="italic text-primary">visualized</span> in weeks.
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up delay-100">
                        Time is the only currency we truly own.<br /> Witness the brevity and beauty
                        of your journey on a single canvas.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
                        <button
                            onClick={handleStartJourney}
                            disabled={loading}
                            className="px-8 py-4 bg-primary text-white text-lg font-bold rounded-full shadow-lg shadow-primary/20 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Loading...' : 'Visualize Your Life'}
                        </button>
                    </div>
                </div>
            </section>
            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}

