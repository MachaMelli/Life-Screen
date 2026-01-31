'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function useDeleteAccount() {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const deleteAccount = async () => {
        const supabase = createClient();
        setIsDeleting(true);

        try {
            // Get current user to verify authentication
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError || !user) {
                throw new Error('No authenticated user found');
            }

            // Call the server-side API to delete the account
            const response = await fetch('/api/account/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to delete account');
            }

            // Sign out the user (the account is already deleted on the server)
            await supabase.auth.signOut();

            // Redirect to home page
            router.push('/');
            router.refresh();
        } catch {
            alert('Failed to delete account. Please try again or contact support.');
        } finally {
            setIsDeleting(false);
        }
    };

    return { deleteAccount, isDeleting };
}
