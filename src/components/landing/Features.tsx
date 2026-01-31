"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function Features() {
    const [sectionRef, isVisible] = useIntersectionObserver();

    return (
        <section className="py-24 px-6 bg-slate-100 dark:bg-slate-800/50 transition-colors overflow-hidden" id="features" ref={sectionRef as any}>
            <div className="max-w-7xl mx-auto">
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-slate-900 dark:text-white tracking-tight">
                        Make reflection a habit
                    </h2>
                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                        A simple tool to help you value your time and see your journey clearly
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: "visibility",
                            title: "Why visualize?",
                            desc: "The human brain struggles to grasp long timelines. Our calendar provides a tangible scale for your goals and memories.",
                            delay: ""
                        },
                        {
                            icon: "auto_awesome",
                            title: "Mark milestones",
                            desc: "Highlight the weeks that changed your life. Graduation, a new job, a first child—see exactly where they sit in your story.",
                            delay: "delay-200"
                        },
                        {
                            icon: "picture_as_pdf",
                            title: "Export as PDF",
                            desc: "Download your visualized life journey as a high-quality PDF. Keep an offline record of your milestones and memories.",
                            delay: "delay-400"
                        }
                    ].map((item, i) => (
                        <div
                            key={i}
                            className={`glass-card p-10 rounded-full shadow-sm hover:shadow-md transition-all group dark:bg-slate-900/50 dark:border-slate-800 flex flex-col items-center text-center hover-lift relative overflow-hidden ${item.delay} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                        >
                            <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>

                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 text-primary relative z-10 group-hover:animate-shake">
                                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white tracking-tight transition-colors group-hover:text-primary">
                                {item.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
