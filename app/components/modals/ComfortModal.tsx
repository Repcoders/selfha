'use client';

import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { BreathingCircle } from '../BreathingCircle';

interface ComfortModalProps {
  open: boolean;
  onClose: () => void;
}

// Breathing exercise modal that can be opened from anywhere in the app.
export const ComfortModal = ({ open, onClose }: ComfortModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <Dialog as={motion.div} static open={open} onClose={onClose} className="relative z-[100]">
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="glass-card glow-border w-full max-w-lg rounded-3xl p-8 text-center"
            >
              <Dialog.Title className="text-lg font-semibold text-cozy-cream">
                Comfort Corner
              </Dialog.Title>
              <p className="mt-2 text-sm text-cozy-cream/80">it&apos;s okay to take a moment</p>
              <div className="mt-6 flex justify-center">
                <BreathingCircle />
              </div>
              <button
                onClick={onClose}
                className="mt-8 rounded-3xl bg-cozy-blush/30 px-6 py-2 text-sm font-medium text-cozy-cream transition hover:bg-cozy-blush/40"
              >
                Close
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
