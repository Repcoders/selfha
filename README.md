# Cozy Support Space

A warm, anonymous sharing space built with Next.js, Tailwind CSS, Supabase, and Framer Motion. The vibe is cozy-bedroom inspired with soft gradients and glows. Users can sign in anonymously, share images + captions, and visit the Comfort Corner for breathing exercises.

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   # or npm install / yarn install
   ```

2. Copy the environment file and set your Supabase project credentials:

   ```bash
   cp .env.example .env.local
   # fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

3. Configure Supabase:

   - Create a storage bucket named `images` (public). Configure storage rules to disallow graphic self-harm imagery uploads if desired through manual moderation.
   - Run the SQL in `supabase-schema.sql` using the Supabase SQL editor.
   - Enable anonymous sign-in (Experimental) in Supabase Auth settings.

4. Run the development server:

   ```bash
   npm run dev
   ```

## Image Safety Flow

- Before posting, captions are scanned for sensitive words. If detected, a gentle modal checks in with the user, offering the Comfort Corner.
- Graphic self-harm imagery is disallowed through moderation guidelines; the app intentionally promotes soft, aesthetic content only.

## Project Structure

- `app/` — Next.js App Router pages and components
- `app/components` — Reusable UI elements, cards, and modals
- `lib/` — Supabase client helpers and shared utilities
- `public/` — Static assets (currently empty)

## Styling Notes

- Tailwind configuration uses warm browns, blush pinks, and cream accents.
- Components rely on glassmorphism with blur, rounded-3xl corners, and glow shadows.

## Supabase Table: `posts`

| column     | type      | notes                                     |
| ---------- | --------- | ----------------------------------------- |
| `id`       | `uuid`    | primary key                               |
| `user_id`  | `uuid`    | Supabase auth user ID                     |
| `image_url`| `text`    | public URL to Supabase Storage image      |
| `caption`  | `text`    | warm caption text                         |
| `created_at` | `timestamp` | defaults to `now()` in UTC           |

Feel free to expand with reactions, playlists, or journaling prompts.
