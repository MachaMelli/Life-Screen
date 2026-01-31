'use client';

import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { GUEST_STORAGE_KEY } from '@/lib/constants';
import type { SignUpCredentials, LogInCredentials } from '@/types';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        setMounted(true);
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [supabase.auth]);

    const signUp = async ({ email, password }: SignUpCredentials) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) throw error;
        return data;
    };

    const logIn = async ({ email, password }: LogInCredentials) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return data;
    };

    const logInWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/api/auth/callback`,
            },
        });

        if (error) throw error;
        return data;
    };

    const logOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        router.push('/');
    };

    const isGuest = () => {
        if (!mounted || typeof window === 'undefined') return false;
        return !user && !!window.localStorage.getItem(GUEST_STORAGE_KEY);
    };

    const resetPassword = async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
    };

    const updatePassword = async (password: string) => {
        const { error } = await supabase.auth.updateUser({
            password: password,
        });
        if (error) throw error;
    };

    return {
        user,
        loading,
        mounted,
        isGuest: isGuest(),
        signUp,
        logIn,
        logInWithGoogle,
        logOut,
        resetPassword,
        updatePassword,
    };
}
