import { BreathingCircle } from '../components/BreathingCircle';
import { motion } from 'framer-motion';

export default function ComfortPage() {
  return (
    <section className="fade-enter">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card glow-border flex flex-col items-center gap-6 rounded-3xl p-10 text-center shadow-glow"
      >
        <h1 className="text-2xl font-semibold text-cozy-cream">Comfort Corner</h1>
        <p className="max-w-md text-sm text-cozy-cream/75">
          Softly settle into your breath. Inhale for four, hold for four, and exhale for six. Repeat
          until your shoulders relax and your heart feels a bit lighter.
        </p>
        <BreathingCircle />
      </motion.div>
    </section>
  );
}
