"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import Modal from "../ui/Modal";

type LegalType = "privacy" | "terms" | null;

interface LegalContextType {
    openPrivacy: () => void;
    openTerms: () => void;
}

const LegalContext = createContext<LegalContextType | undefined>(undefined);

export function LegalProvider({ children }: { children: ReactNode }) {
    const [activeModal, setActiveModal] = useState<LegalType>(null);

    const openPrivacy = () => setActiveModal("privacy");
    const openTerms = () => setActiveModal("terms");
    const close = () => setActiveModal(null);

    return (
        <LegalContext.Provider value={{ openPrivacy, openTerms }}>
            {children}

            <Modal
                isOpen={activeModal === "privacy"}
                onClose={close}
                title="Privacy Policy"
            >
                <div className="space-y-8 py-4">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light text-lg">
                        Welcome to Life Screen. We believe privacy is a fundamental human right, and our platform is built on a strict privacy-first architecture.
                    </p>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <span className="font-bold text-primary tracking-tighter text-lg">01.</span>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light">We collect only the data necessary to provide our calendar services, primarily your birth year and life expectancy.</p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="font-bold text-primary tracking-tighter text-lg">02.</span>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light">Your week entries are stored securely and are used only to display your personal life progress.</p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="font-bold text-primary tracking-tighter text-lg">03.</span>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light">We do not sell your personal data to third parties. Your information is yours alone.</p>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={activeModal === "terms"}
                onClose={close}
                title="Terms of Service"
            >
                <div className="space-y-8 py-4">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light text-lg">By using Life Screen, you agree to the following terms and principles of intentional living:</p>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <span className="font-bold text-primary tracking-tighter text-lg">01.</span>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light">Life Screen is a tool for personal reflection and visualization. It is provided "as is" without warranties.</p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="font-bold text-primary tracking-tighter text-lg">02.</span>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light">You are responsible for maintaining the confidentiality of your account and any data you enter.</p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="font-bold text-primary tracking-tighter text-lg">03.</span>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light">We reserve the right to modify or terminate the service at any time, with or without notice.</p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="font-bold text-primary tracking-tighter text-lg">04.</span>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light">Your use of the service must comply with all applicable laws and regulations.</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </LegalContext.Provider>
    );
}

export function useLegal() {
    const context = useContext(LegalContext);
    if (context === undefined) {
        throw new Error("useLegal must be used within a LegalProvider");
    }
    return context;
}
