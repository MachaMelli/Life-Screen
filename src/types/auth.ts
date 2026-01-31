import { User } from '@supabase/supabase-js';

export interface AuthState {
    user: User | null;
    loading: boolean;
    isGuest: boolean;
}

export interface SignUpCredentials {
    email: string;
    password: string;
}

export interface LogInCredentials {
    email: string;
    password: string;
}
