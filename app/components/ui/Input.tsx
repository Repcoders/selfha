import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-3xl border border-white/5 bg-[#1C1A1A]/80 px-4 py-3 text-cozy-cream placeholder:text-cozy-cream/40 focus:border-cozy-blush/40 focus:outline-none focus:ring-2 focus:ring-cozy-blush/30',
        className,
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'w-full rounded-3xl border border-white/5 bg-[#1C1A1A]/80 px-4 py-3 text-cozy-cream placeholder:text-cozy-cream/40 focus:border-cozy-blush/40 focus:outline-none focus:ring-2 focus:ring-cozy-blush/30',
        className,
      )}
      {...props}
    />
  )
);
TextArea.displayName = 'TextArea';
