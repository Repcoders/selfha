'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const sequence = [
  { label: 'inhale', duration: 4000 },
  { label: 'hold', duration: 4000 },
  { label: 'exhale', duration: 6000 },
];

// Animated breathing helper that gently scales based on the 4-4-6 pattern.
export const BreathingCircle = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const current = sequence[phaseIndex];
    const timer = setTimeout(() => {
      setPhaseIndex((index) => (index + 1) % sequence.length);
    }, current.duration);
    return () => clearTimeout(timer);
  }, [phaseIndex]);

  const phase = sequence[phaseIndex];

  const sizeVariants = {
    inhale: 1.08,
    hold: 1.1,
    exhale: 0.92,
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        key={phase.label}
        className="flex h-48 w-48 items-center justify-center rounded-full border border-cozy-blush/40 bg-cozy-blush/10 shadow-glow"
        animate={{ scale: sizeVariants[phase.label as keyof typeof sizeVariants] || 1 }}
        transition={{ duration: phase.duration / 1000, ease: 'easeInOut' }}
      >
        <motion.div
          className="h-32 w-32 rounded-full bg-cozy-blush/30 blur-cozy"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: phase.duration / 1000, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      <p className="text-sm uppercase tracking-[0.5em] text-cozy-cream/70">{phase.label}</p>
      <p className="text-center text-base text-cozy-cream/80">
        it&apos;s okay to take a moment — breathe in for 4, hold for 4, exhale for 6
      </p>
    </div>
  );
};
