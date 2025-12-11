// app/page.tsx
import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Home',
  description: 'Portfolio & writing of Luke Mahoney.',
})

export default function HomePage() {
  return (
    <main className="flex min-h-[70vh] flex-col justify-center">
      <section className="space-y-6">
        <p className="text-primary-400 text-sm font-medium tracking-[0.3em] uppercase">
          Inner Algorithm
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
          Luke Mahoney
        </h1>

        <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Technical PM & blockchain engineer in Japan. This site collects deep–dive essays, rough
          journal notes, and project work in web3, systems, and AI.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/blog"
            className="bg-primary-500 hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400 rounded-lg px-5 py-2.5 text-sm font-medium text-white"
          >
            Read the blog
          </Link>
          <Link
            href="/journal"
            className="hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-400 dark:hover:text-primary-400 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-900 dark:border-gray-700 dark:text-gray-100"
          >
            Browse the journal
          </Link>
        </div>
      </section>
    </main>
  )
}
