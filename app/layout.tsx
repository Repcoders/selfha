import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cozy Support Space',
  description: 'A warm, anonymous corner to share soft feelings and mood boards.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#1C1A1A]">
      <body className={`${inter.className} bg-[#1C1A1A] text-cozy-cream`}>
        <div className="min-h-screen bg-cozy-gradient">
          {/* The navbar stays persistent so the Comfort Corner is always available. */}
          <Navbar />
          <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pb-24 pt-10 md:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
