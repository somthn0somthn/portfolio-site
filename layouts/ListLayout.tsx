'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

type ListPost = CoreContent<{
  path: string
  date: string
  title: string
  summary?: string
  tags?: string[]
  images?: string[] | string
}>

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: ListPost[]
  title: string
  initialDisplayPosts?: ListPost[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+\/?$/, '') // Remove any trailing /page
    .replace(/\/$/, '') // Remove trailing slash
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-border divide-y">
        {/* Header + search bar */}
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            {title}
          </h1>
          <div className="relative max-w-xl">
            <label>
              <span className="sr-only">Search articles</span>
              <input
                aria-label="Search articles"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles"
                className="focus:border-primary-500 focus:ring-primary-500 border-border bg-background text-foreground dark:bg-surface block w-full rounded-md border px-4 py-2"
              />
            </label>
            <svg
              className="pointer-events-none absolute top-3 right-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* === Grid instead of vertical list === */}
        <div className="pt-6">
          {!filteredBlogPosts.length && <p>No posts found.</p>}

          {/* Grid: 1 col on mobile, 2 on md, 3 on xl */}
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags, images } = post

              const thumbnail =
                typeof images === 'string'
                  ? images
                  : Array.isArray(images) && images.length > 0
                    ? images[0]
                    : null

              return (
                <li key={path}>
                  <article className="hover:border-primary-500 border-border bg-surface/40 hover:bg-surface flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition">
                    {/* Clickable area: image + title + summary */}
                    <Link href={`/${path}`} className="flex flex-1 flex-col">
                      {/* Top image */}
                      {thumbnail && (
                        <div className="relative h-40 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                          <img
                            src={thumbnail}
                            alt={title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Text content */}
                      <div className="flex flex-1 flex-col space-y-2 p-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </p>

                        <h2 className="group-hover:text-primary-400 text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {title}
                        </h2>

                        {summary && (
                          <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                            {summary}
                          </p>
                        )}
                      </div>
                    </Link>

                    {/* Footer: tags + read more, not wrapped by the big Link */}
                    <div className="border-border flex items-center justify-between gap-2 border-t px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                      </div>
                      <Link
                        href={`/${path}`}
                        className="text-primary-500 hover:text-primary-400 text-sm font-medium"
                      >
                        Read more →
                      </Link>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Pagination stays exactly the same */}
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
