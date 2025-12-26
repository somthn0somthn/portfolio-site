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
        <div className="bg-background/70 dark:bg-surface/80 inline-flex max-w-3xl flex-col gap-4 rounded-3xl px-8 py-8 backdrop-blur-md">
          <p className="text-primary-500 dark:text-primary-300/90 mb-1 text-xs font-semibold tracking-[0.35em] uppercase">
            Quiet Complexity
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 drop-shadow-[0_0_22px_rgba(0,0,0,0.35)] sm:text-5xl md:text-6xl dark:text-gray-100">
            Luke Mahoney
          </h1>
          <p className="max-w-2xl text-base text-gray-700 sm:text-lg dark:text-gray-200">
            Technical Project Manager & blockchain engineer. This site collects deep–dive essays,
            TIL notes, and project work in web3 and systems.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="bg-primary-500/95 hover:bg-primary-400 focus-visible:ring-primary-400 shadow-primary-500/30 focus-visible:ring-offset-background rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
