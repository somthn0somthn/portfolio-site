// app/page.tsx
import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'
import P5Background from '@/components/P5Background'

export const metadata = genPageMetadata({
  title: 'Home',
  description: 'Portfolio & writing of Luke Mahoney.',
})

export default function HomePage() {
  return (
    <main className="relative min-h-[70vh] overflow-hidden">
      {/* Animated p5 background */}
      <P5Background />

      {/* Foreground content */}
      <section className="relative z-10 mx-auto flex max-w-5xl flex-col justify-center px-6 py-20">
        {/* Frosted glass hero panel */}
        <div className="inline-flex max-w-3xl flex-col gap-4 rounded-2xl bg-slate-950/50 px-8 py-8 shadow-xl shadow-black/40 backdrop-blur-md">
          <p className="text-primary-300/90 text-xs font-semibold tracking-[0.35em] uppercase">
            Inner Algorithm
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-50 drop-shadow-[0_0_22px_rgba(0,0,0,0.7)] sm:text-5xl md:text-6xl">
            Luke Mahoney
          </h1>

          <p className="max-w-2xl text-base text-slate-200/95 sm:text-lg">
            Technical PM & blockchain engineer in Japan. This site collects deep–dive essays, rough
            journal notes, and project work in web3, systems, and AI.
          </p>

          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="bg-primary-500/95 hover:bg-primary-400 focus-visible:ring-primary-400 shadow-primary-500/30 rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none"
            >
              Read the blog
            </Link>

            <Link
              href="/journal"
              className="hover:border-primary-400 hover:text-primary-300 dark:hover:border-primary-300 dark:hover:text-primary-200 rounded-lg border border-slate-600/70 px-5 py-2.5 text-sm font-medium text-slate-100 backdrop-blur-sm"
            >
              Browse the journal
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
