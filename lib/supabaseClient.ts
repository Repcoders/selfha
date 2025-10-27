'use client';

import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './types';

/**
 * Creates a Supabase browser client bound to the public anon key.
 * Using the auth-helpers package ensures auth cookies stay in sync across tabs.
 */
export const createSupabaseBrowserClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
