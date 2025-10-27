'use client';

import { useMemo, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function AuthPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const signInAnonymously = async () => {
    setLoading(true);
    setStatus(null);
    // Supabase anonymous sign-in creates a user without personal data.
    const { error } = await supabase.auth.signInAnonymously();
    if (error) {
      setStatus('we had trouble signing you in. please try again.');
    } else {
      setStatus('you are softly signed in. feel free to share whenever you like.');
    }
    setLoading(false);
  };

  return (
    <section className="fade-enter">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card glow-border flex flex-col gap-6 rounded-3xl p-8 text-center shadow-glow"
      >
        <div>
          <h1 className="text-2xl font-semibold text-cozy-cream">Anonymous Sign-in</h1>
          <p className="mt-2 text-sm text-cozy-cream/70">
            Tap the button below to receive a gentle anonymous identity like <span className="text-cozy-blush">soft-owl-382</span>.
          </p>
        </div>

        <Button onClick={signInAnonymously} disabled={loading} className="mx-auto w-full max-w-xs disabled:opacity-60">
          {loading ? 'signing you in...' : 'sign in anonymously'}
        </Button>

        {status && <p className="text-sm text-cozy-cream/70">{status}</p>}
      </motion.div>
    </section>
  );
}
