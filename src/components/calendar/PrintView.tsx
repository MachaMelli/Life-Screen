"use client";

import { useCalendar } from "@/context/CalendarContext";
import { WEEKS_PER_MONTH, MONTHS_PER_YEAR } from "@/lib/constants";

export default function PrintView() {
    const { config, stats, currentPosition, getWeekStatus, loading } = useCalendar();

    if (loading) return null;

    const years = Array.from({ length: config.lifeExpectancy }, (_, i) => i + 1);

    return (
        <div
            id="print-view"
            className="fixed left-[-9999px] top-[-9999px] w-[800px] p-8"
            style={{
                fontFamily: 'Inter, sans-serif',
                backgroundColor: '#ffffff',
                color: '#0f172a'
            }}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-12 pb-8" style={{ borderBottom: '2px solid #f1f5f9' }}>
                <div>
                    <h1 className="text-6xl font-black tracking-tight mb-2" style={{ color: '#0f172a' }}>
                        Life Screen
                    </h1>
                    <p className="text-lg font-medium" style={{ color: '#64748b' }}>
                        Make every week count.
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: '#94a3b8' }}>Generated on</p>
                    <p className="text-lg font-mono font-bold">{new Date().toLocaleDateString()}</p>
                </div>
            </div>

            {/* Stats & Parameters Grid - All in one row */}
            <div className="grid grid-cols-5 gap-4 mb-12">
                <div className="p-4 rounded-xl border" style={{ backgroundColor: '#f8fafc', borderColor: '#f1f5f9' }}>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: '#94a3b8' }}>Weeks Lived</p>
                    <p className="text-3xl font-black font-mono" style={{ color: '#0f172a' }}>{stats.weeksLived.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl border" style={{ backgroundColor: '#ecfdf5', borderColor: '#d1fae5' }}>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: '#059669' }}>Weeks Left</p>
                    <p className="text-3xl font-black font-mono" style={{ color: '#059669' }}>{stats.weeksLeft.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl border" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: '#10b981' }}>Progress</p>
                    <p className="text-3xl font-black font-mono" style={{ color: '#10b981' }}>{stats.percentComplete.toFixed(1)}%</p>
                </div>
                <div className="p-4 rounded-xl border" style={{ backgroundColor: '#f8fafc', borderColor: '#f1f5f9' }}>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: '#94a3b8' }}>Birth Year</p>
                    <p className="text-3xl font-black font-mono" style={{ color: '#334155' }}>{config.birthYear}</p>
                </div>
                <div className="p-4 rounded-xl border" style={{ backgroundColor: '#f8fafc', borderColor: '#f1f5f9' }}>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: '#94a3b8' }}>Expectancy</p>
                    <p className="text-3xl font-black font-mono" style={{ color: '#334155' }}>{config.lifeExpectancy}</p>
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-row items-center gap-6 mb-12 p-4 rounded-2xl border justify-center" style={{ backgroundColor: '#f8fafc', borderColor: '#f1f5f9' }}>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#1e293b' }}></div>
                    <span className="text-sm font-bold" style={{ color: '#475569' }}>Neutral</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
                    <span className="text-sm font-bold" style={{ color: '#475569' }}>Good</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'rgba(244, 63, 94, 1)' }}></div>
                    <span className="text-sm font-bold" style={{ color: '#475569' }}>Bad</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: '#e2e8f0' }}></div>
                    <span className="text-sm font-bold" style={{ color: '#475569' }}>Future</span>
                </div>
            </div>

            {/* Full Grid */}
            <div className="space-y-[4px]">
                {years.map(year => (
                    <div key={`print-year-${year}`}>
                        {year > 0 && year % 10 === 0 && (
                            <div className="flex items-center gap-4 my-4">
                                <span className="text-sm font-black font-mono shrink-0" style={{ color: '#10b981' }}>{year}s</span>
                                <div className="h-[1px] flex-1" style={{ background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.2) 0%, transparent 100%)' }}></div>
                            </div>
                        )}
                        <div className="flex items-center gap-4">
                            <div className="w-8 text-[10px] font-mono font-black text-right" style={{ color: '#cbd5e1' }}>
                                {year}
                            </div>
                            <div className="flex gap-[8px]">
                                {[...Array(MONTHS_PER_YEAR)].map((_, month) => (
                                    <div key={`print-month-${year}-${month}`} className="flex gap-[2px]">
                                        {[...Array(WEEKS_PER_MONTH)].map((_, weekInMonth) => {
                                            const status = getWeekStatus(year, month, weekInMonth);
                                            const isCurrentWeek =
                                                year === currentPosition.year &&
                                                month === currentPosition.month &&
                                                weekInMonth === currentPosition.week;

                                            const isPast =
                                                year < currentPosition.year ||
                                                (year === currentPosition.year && month < currentPosition.month) ||
                                                (year === currentPosition.year && month === currentPosition.month && weekInMonth < currentPosition.week);

                                            let bgColor = '#ffffff';
                                            let borderColor = '#e2e8f0';

                                            if (status === 'green') {
                                                bgColor = '#10b981';
                                                borderColor = '#059669';
                                            } else if (status === 'red') {
                                                bgColor = '#f43f5e';
                                                borderColor = '#e11d48';
                                            } else if (status === 'black' || (isPast && status === 'gray')) {
                                                bgColor = '#1e293b';
                                                borderColor = '#0f172a';
                                            }

                                            return (
                                                <div
                                                    key={`print-week-${year}-${month}-${weekInMonth}`}
                                                    className="w-[10px] h-[10px] rounded-full border"
                                                    style={{
                                                        backgroundColor: bgColor,
                                                        borderColor: borderColor,
                                                        boxShadow: isCurrentWeek ? '0 0 0 2px #10b981' : 'none'
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
