"use client";

import CalendarGrid from "@/components/calendar/CalendarGrid";
import PrintView from "@/components/calendar/PrintView";
import { useExportPDF } from "@/hooks/useExportPDF";
import { useCalendar } from "@/context/CalendarContext";
import { useDeleteAccount } from "@/hooks/useDeleteAccount";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
    const { exportPDF, isExporting } = useExportPDF();
    const { clearCalendar } = useCalendar();
    const { deleteAccount, isDeleting } = useDeleteAccount();
    const { user } = useAuth();

    return (
        <>
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-end bg-white/50 dark:bg-slate-900/30">
                <div>
                    <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-white">Life Timeline</h2>
                    <p className="text-slate-500 text-[15px] font-light tracking-tight mt-1">
                        Your life, visualized. Every row stands for a year of your existence.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={async () => {
                            if (window.confirm('Are you sure you want to clear your calendar and reset all parameters? This action cannot be undone.')) {
                                await clearCalendar();
                            }
                        }}
                        className="px-5 py-2.5 border border-rose-200 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-bold rounded-full hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all flex items-center gap-2 tracking-tight"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            delete_sweep
                        </span>
                        Clear
                    </button>
                    {user && (
                        <button
                            onClick={async () => {
                                const confirmed = window.confirm(
                                    '⚠️ WARNING: This will permanently delete your account and all data.\n\nThis action CANNOT be undone.\n\nAre you absolutely sure you want to delete your account?'
                                );
                                if (confirmed) {
                                    const doubleConfirm = window.confirm(
                                        'Final confirmation: Click OK to permanently delete your account, or Cancel to keep it.'
                                    );
                                    if (doubleConfirm) {
                                        await deleteAccount();
                                    }
                                }
                            }}
                            disabled={isDeleting}
                            className="px-4 py-2 bg-rose-600 dark:bg-rose-700 text-white text-sm font-semibold rounded-full hover:bg-rose-700 dark:hover:bg-rose-800 transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                {isDeleting ? 'sync' : 'delete_forever'}
                            </span>
                            {isDeleting ? 'Deleting...' : 'Delete Account'}
                        </button>
                    )}
                    <button
                        onClick={() => exportPDF('print-view')}
                        disabled={isExporting}
                        className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            {isExporting ? 'sync' : 'download'}
                        </span>{" "}
                        {isExporting ? 'Exporting...' : 'Export PDF'}
                    </button>
                </div>
            </div>
            <CalendarGrid />
            <PrintView />
        </>
    );
}
