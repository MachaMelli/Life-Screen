"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function Philosophy() {
    const [sectionRef, isVisible] = useIntersectionObserver();

    return (
        <section className="py-24 px-6 border-t border-life-border dark:border-slate-800 bg-background-light dark:bg-background-dark transition-colors overflow-hidden" id="philosophy" ref={sectionRef as any}>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                <div className={`flex-1 lg:max-w-xl lg:ml-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    <span className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-4 block animate-fade-in-up">
                        The Philosophy
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-[1.15] text-slate-900 dark:text-white tracking-tight animate-fade-in-up delay-100">
                        Living with intentionality doesn't require complex tools.
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-light animate-fade-in-up delay-200">
                        Grounded in the Stoic principle of <span className="italic">Memento Mori</span>,
                        Life Screen helps you visualize your journey.
                        By seeing the time you've spent and the time you have left, you instinctively prioritize what truly matters.
                    </p>
                    <ul className="space-y-5">
                        {[
                            "Distraction-free clarity",
                            "Your data stays yours",
                            "Ad-free & Subscription-free"
                        ].map((text, i) => (
                            <li key={i} className={`flex items-center gap-4 animate-fade-in-up`} style={{ animationDelay: `${300 + (i * 100)}ms` }}>
                                <span className="material-symbols-outlined text-primary">
                                    check_circle
                                </span>
                                <span className="font-medium text-slate-700 dark:text-slate-200 tracking-tight">{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`flex-1 w-full dashboard-theme transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-95 rotate-1'}`}>
                    <div className="bg-slate-100 dark:bg-slate-800/80 p-6 md:p-10 rounded-[48px] border border-life-border dark:border-slate-800 shadow-inner">
                        <div className="bg-white dark:bg-slate-900 rounded-[48px] p-8 shadow-2xl border border-life-border/50 dark:border-slate-800">
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-10 gap-x-4 mb-10">
                                {/* Sample Grid Dots */}
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="grid grid-cols-3 gap-1.5 w-fit">
                                            {[...Array(4)].map((_, j) => (
                                                <div
                                                    key={j}
                                                    className={`w-3.5 h-3.5 rounded-full ${i < 8
                                                        ? j === 2 && (i === 1 || i === 5)
                                                            ? "bg-rose-500"
                                                            : j === 1 && (i === 2 || i === 6)
                                                                ? "bg-primary"
                                                                : "bg-slate-900 dark:bg-slate-300"
                                                        : "bg-slate-100 dark:bg-slate-800"
                                                        } transition-all duration-700`}
                                                    style={{ transitionDelay: `${500 + (i * 50)}ms` }}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* ... rest of the preview card content ... */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group hover:bg-white dark:hover:bg-slate-800 transition-colors duration-500">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                            Lived
                                        </span>
                                        <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-sm group-hover:rotate-12 transition-transform">
                                            history
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                            1,664
                                        </p>
                                        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                                            weeks
                                        </span>
                                    </div>
                                    <div className="mt-2 w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="w-[40%] h-full bg-slate-900 dark:bg-slate-300 transform origin-left transition-transform duration-1000 delay-700" style={{ transform: isVisible ? 'scaleX(1)' : 'scaleX(0)' }}></div>
                                    </div>
                                </div>
                                <div className="p-5 rounded-3xl bg-primary/[0.03] dark:bg-primary/5 border border-primary/10 dark:border-primary/20 group hover:bg-primary/[0.05] transition-colors duration-500">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                                            Left
                                        </span>
                                        <span className="material-symbols-outlined text-primary/40 text-sm group-hover:animate-pulse">
                                            hourglass_bottom
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <p className="text-3xl font-bold text-primary tracking-tight">
                                            2,496
                                        </p>
                                        <span className="text-xs text-primary/60 font-medium">
                                            weeks
                                        </span>
                                    </div>
                                    <div className="mt-2 w-full h-1 bg-primary/10 dark:bg-primary/20 rounded-full overflow-hidden">
                                        <div className="w-full h-full bg-primary/40 transform origin-left transition-transform duration-1000 delay-1000" style={{ transform: isVisible ? 'scaleX(1)' : 'scaleX(0)' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 dark:bg-slate-300"></div>
                                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Neutral
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Bad
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Good
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Future
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
