import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE() {
    try {
        const supabase = await createClient();

        // Get the current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const userId = user.id;

        // Delete user's calendar data first
        const { data: calendar } = await supabase
            .from('calendars')
            .select('id')
            .eq('user_id', userId)
            .single();

        if (calendar) {
            // Delete week entries
            await supabase
                .from('week_entries')
                .delete()
                .eq('calendar_id', calendar.id);

            // Delete calendar
            await supabase
                .from('calendars')
                .delete()
                .eq('user_id', userId);
        }

        // Use admin client to delete the user account
        // Note: This requires SUPABASE_SERVICE_ROLE_KEY environment variable
        const { createClient: createAdminClient } = await import('@supabase/supabase-js');

        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
            // Missing Supabase environment variables
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const supabaseAdmin = createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

        if (deleteError) {
            // Error deleting user
            return NextResponse.json(
                { error: 'Failed to delete user account' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        // Error in delete account API
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
