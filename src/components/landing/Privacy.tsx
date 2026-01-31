"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function Privacy() {
    const [sectionRef, isVisible] = useIntersectionObserver();

    return (
        <section
            className="py-24 px-6 bg-slate-100 dark:bg-slate-800/50 border-t border-life-border dark:border-slate-800 transition-colors overflow-hidden"
            id="privacy"
            ref={sectionRef as any}
        >
            <div className="max-w-4xl mx-auto">
                <div className={`flex flex-col items-center text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className={`w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-10 text-primary transition-all duration-1000 ${isVisible ? 'scale-100 rotate-0' : 'scale-50 -rotate-12'}`}>
                        <span className="material-symbols-outlined !text-5xl">
                            verified_user
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-900 dark:text-white tracking-tight animate-fade-in-up delay-100">
                        Privacy & Security
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl leading-relaxed font-light animate-fade-in-up delay-200">
                        We believe your reflections should be as private as your thoughts.<br />
                        We do not sell, trade, or share your personal data.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 mb-16">
                        {[
                            { icon: 'shield', label: 'No Data Sharing' },
                            { icon: 'lock', label: 'Secure Login' },
                            { icon: 'person_check', label: 'Data Ownership' }
                        ].map((item, i) => (
                            <div key={i} className={`flex flex-col items-center gap-2 group animate-fade-in-up`} style={{ animationDelay: `${300 + (i * 100)}ms` }}>
                                <div className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-900 border border-life-border dark:border-slate-800 rounded-full shadow-sm hover:shadow-md transition-all group-hover:-translate-y-1">
                                    <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        {item.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full max-w-3xl animate-fade-in-up delay-500">
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-center italic">
                            We believe privacy is a fundamental human right.
                            Our platform is built on a strict privacy-first architecture.
                            Unlike free apps that monetize your behavior,
                            our business model relies on respecting your data, not selling it.
                            Your entries are stored securely and remain accessible only to you.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
