import Image from 'next/image';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import type { Database } from '@/lib/types';

type Post = Database['public']['Tables']['posts']['Row'];

interface PostCardProps {
  post: Post & { profiles_username?: string | null };
}

// Displays an individual cozy post with a soft fade-in animation.
export const PostCard = ({ post }: PostCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass-card glow-border flex flex-col gap-4 rounded-3xl p-6 shadow-glow"
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-cozy-cream/60">
        <span>{post.profiles_username ?? 'soft-soul'}</span>
        <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
      </div>
      {post.image_url && (
        <div className="relative overflow-hidden rounded-3xl border border-white/5">
          <Image
            src={post.image_url}
            alt={post.caption.slice(0, 40) || 'Post image'}
            width={900}
            height={700}
            className="h-full w-full object-cover"
            priority={false}
          />
        </div>
      )}
      <p className="text-base leading-relaxed text-cozy-cream/85">{post.caption}</p>
    </motion.article>
  );
};
