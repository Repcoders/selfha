'use client';

import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

interface CheckInModalProps {
  open: boolean;
  onPost: () => void;
  onComfort: () => void;
}

// Gentle modal that appears when sensitive words are detected.
export const CheckInModal = ({ open, onPost, onComfort }: CheckInModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <Dialog as={motion.div} static open={open} onClose={onComfort} className="relative z-[110]">
          <motion.div
            className="fixed inset-0 bg-black/65 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card glow-border w-full max-w-md rounded-3xl p-8 text-center"
            >
              <Dialog.Title className="text-lg font-semibold text-cozy-cream">
                hey... are you okay?
              </Dialog.Title>
              <Dialog.Description className="mt-3 text-sm text-cozy-cream/75">
                we noticed a tender phrase. want to take a pause?
              </Dialog.Description>
              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={onComfort}
                  className="rounded-3xl bg-cozy-blush/30 px-6 py-3 text-sm font-medium text-cozy-cream shadow-glow transition hover:bg-cozy-blush/40"
                >
                  open comfort corner
                </button>
                <button
                  onClick={onPost}
                  className="rounded-3xl border border-cozy-cream/20 px-6 py-3 text-sm font-medium text-cozy-cream/80 transition hover:border-cozy-cream/40"
                >
                  post anyway
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
