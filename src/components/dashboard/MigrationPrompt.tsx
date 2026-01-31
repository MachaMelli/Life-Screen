"use client";

import { useCalendar } from "@/context/CalendarContext";
import { useState } from "react";

export default function MigrationPrompt() {
    const {
        showMigrationPrompt,
        syncGuestData,
        dismissMigrationPrompt,
        setNeverAskMigration
    } = useCalendar();

    const [neverAsk, setNeverAsk] = useState(false);

    if (!showMigrationPrompt) return null;

    const handleSync = async () => {
        if (neverAsk) {
            setNeverAskMigration(true);
        }
        await syncGuestData();
    };

    const handleDismiss = () => {
        if (neverAsk) {
            setNeverAskMigration(true);
        }
        dismissMigrationPrompt();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                        <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-3xl">
                            sync_alt
                        </span>
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight mb-3">
                        Sync your progress?
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                        We found some local data on this device. Would you like to sync it to your account so you can access it from anywhere?
                        <span className="block mt-2 text-sm italic">Your local data will remain on this device.</span>
                    </p>

                    <div className="space-y-4">
                        <button
                            onClick={handleSync}
                            className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                        >
                            <span className="material-symbols-outlined">cloud_upload</span>
                            Yes, sync my data
                        </button>

                        <button
                            onClick={handleDismiss}
                            className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                        >
                            Maybe later
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                        <label className="flex items-center justify-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    checked={neverAsk}
                                    onChange={(e) => setNeverAsk(e.target.checked)}
                                    className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-slate-600 rounded-md checked:bg-primary checked:border-primary transition-all"
                                />
                                <span className="material-symbols-outlined text-white text-[16px] absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                                    check
                                </span>
                            </div>
                            <span className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                                Don't ask me again on this device
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
