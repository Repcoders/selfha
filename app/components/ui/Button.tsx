import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

export const Button = ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn(
      'rounded-3xl bg-cozy-blush/30 px-6 py-3 text-sm font-medium text-cozy-cream shadow-glow transition hover:bg-cozy-blush/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cozy-blush/40',
      className,
    )}
    {...props}
  />
);
