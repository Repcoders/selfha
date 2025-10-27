import { PostCard } from './components/PostCard';
import { createSupabaseServerClient } from '@/lib/supabaseServer';
import Link from 'next/link';

export const revalidate = 30;

export default async function FeedPage() {
  const supabase = createSupabaseServerClient();

  // Fetch the 20 most recent posts for the cozy feed.
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  return (
    <section className="fade-enter flex flex-col gap-6">
      <div className="glass-card glow-border flex flex-col gap-2 rounded-3xl p-6 text-cozy-cream shadow-glow">
        <h1 className="text-2xl font-semibold">A soft corner for your heart</h1>
        <p className="text-sm text-cozy-cream/70">
          Share gentle moments, mood boards, poems, or cozy snapshots. We keep this space safe by
          filtering out graphic self-harm imagery while welcoming your tender creativity.
        </p>
        <Link
          href="/upload"
          className="mt-4 inline-flex w-max rounded-3xl bg-cozy-blush/30 px-6 py-2 text-sm font-medium text-cozy-cream transition hover:bg-cozy-blush/40"
        >
          Share something soft
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        {posts?.length ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="glass-card glow-border rounded-3xl p-8 text-center text-cozy-cream/70">
            nothing here yet — maybe your first share can be a cozy spark.
          </div>
        )}
      </div>
    </section>
  );
}
