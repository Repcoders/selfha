'use client';

import { useState, useMemo } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';
import { Input, TextArea } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { CheckInModal } from '@/app/components/modals/CheckInModal';
import { ComfortModal } from '@/app/components/modals/ComfortModal';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const safetyWords = ['cut', 'kms', 'bleed', 'hurt myself', 'razor', 'slice'];

export default function UploadPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showComfort, setShowComfort] = useState(false);

  // Softly scan captions for crisis-related words and nudge the user before posting.
  const captionContainsSafetyWord = safetyWords.some((word) =>
    caption.toLowerCase().includes(word.toLowerCase())
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!imageFile) return null;
    const fileExt = imageFile.name.split('.').pop();
    const filePath = `uploads/${crypto.randomUUID()}.${fileExt}`;
    const { error } = await supabase.storage.from('images').upload(filePath, imageFile);
    if (error) throw error;
    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const submitPost = async () => {
    try {
      setLoading(true);
      setSuccessMessage('');
      setErrorMessage('');

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      let userId = user?.id;

      if (!userId) {
        // Create an anonymous identity if this is a fresh visitor.
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) throw error;
        userId = data.user?.id ?? null;
      }

      if (!userId) throw new Error('Unable to determine user.');

      let imageUrl: string | null = null;

      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const { error: insertError } = await supabase.from('posts').insert({
        caption,
        image_url: imageUrl,
        user_id: userId,
      });

      if (insertError) throw insertError;

      setCaption('');
      setImageFile(null);
      setPreview(null);
      setSuccessMessage('your gentle moment is now in the feed. thank you for sharing.');
    } catch (error) {
      console.error(error);
      setErrorMessage('we could not share that just yet. please try again in a little while.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (captionContainsSafetyWord) {
      setShowCheckIn(true);
      return;
    }
    await submitPost();
  };

  return (
    <section className="fade-enter">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card glow-border flex flex-col gap-6 rounded-3xl p-8 shadow-glow"
      >
        <div>
          <h1 className="text-2xl font-semibold text-cozy-cream">Share a cozy moment</h1>
          <p className="mt-2 text-sm text-cozy-cream/70">
            Upload soft imagery, poems, or journal musings. Graphic self-harm content is gently
            blocked, but your warmth is welcome.
          </p>
        </div>

        <label className="flex flex-col gap-2 text-sm text-cozy-cream/70">
          Caption
          <TextArea
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            placeholder="describe your mood, poem, or cozy scene..."
            rows={5}
            required
          />
        </label>

        <label className="flex flex-col gap-3 text-sm text-cozy-cream/70">
          Image (optional)
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <AnimatePresence>
          {preview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-hidden rounded-3xl border border-white/5"
            >
              <Image src={preview} alt="Preview" width={900} height={600} className="h-full w-full object-cover" />
            </motion.div>
          )}
        </AnimatePresence>

        {successMessage && <p className="text-sm text-cozy-cream/60">{successMessage}</p>}
        {errorMessage && <p className="text-sm text-red-300/80">{errorMessage}</p>}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" disabled={loading} className="disabled:opacity-60">
            {loading ? 'sharing...' : 'share softness'}
          </Button>
          {captionContainsSafetyWord && (
            <span className="text-xs text-cozy-cream/60">
              we sensed tender language and will check in before posting.
            </span>
          )}
        </div>
      </motion.form>

      <CheckInModal
        open={showCheckIn}
        onPost={async () => {
          setShowCheckIn(false);
          await submitPost();
        }}
        onComfort={() => {
          setShowCheckIn(false);
          setShowComfort(true);
        }}
      />

      <ComfortModal open={showComfort} onClose={() => setShowComfort(false)} />
    </section>
  );
}
