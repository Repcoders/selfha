'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComfortModal } from './modals/ComfortModal';
import { Menu } from 'lucide-react';

// Primary navigation bar that keeps the Comfort Corner one tap away.
export const Navbar = () => {
  const [showComfort, setShowComfort] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-6">
      <div className="glass-card glow-border flex w-full items-center justify-between rounded-3xl px-6 py-4 shadow-glow">
        <Link
          href="/"
          className="text-lg font-semibold text-cozy-cream transition hover:text-cozy-blush"
        >
          Cozy Support Space
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          <NavLink href="/">Feed</NavLink>
          <NavLink href="/upload">Share</NavLink>
          <NavLink href="/comfort">Comfort</NavLink>
          <button
            onClick={() => setShowComfort(true)}
            className="rounded-3xl bg-cozy-blush/20 px-4 py-2 text-sm font-medium text-cozy-cream shadow-glow transition hover:bg-cozy-blush/30"
          >
            Comfort Corner
          </button>
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-cozy-brown/60 text-cozy-cream shadow-glow md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card mt-4 flex w-full flex-col gap-2 rounded-3xl p-4 md:hidden"
          >
            <NavLink href="/" onClick={() => setMobileOpen(false)}>
              Feed
            </NavLink>
            <NavLink href="/upload" onClick={() => setMobileOpen(false)}>
              Share
            </NavLink>
            <NavLink href="/comfort" onClick={() => setMobileOpen(false)}>
              Comfort
            </NavLink>
            <button
              onClick={() => {
                setMobileOpen(false);
                setShowComfort(true);
              }}
              className="rounded-3xl bg-cozy-blush/30 px-4 py-2 text-sm font-medium text-cozy-cream shadow-glow transition hover:bg-cozy-blush/40"
            >
              Comfort Corner
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      <ComfortModal open={showComfort} onClose={() => setShowComfort(false)} />
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ href, children, onClick }: NavLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className="rounded-3xl px-4 py-2 text-sm text-cozy-cream transition hover:bg-cozy-blush/20"
  >
    {children}
  </Link>
);
