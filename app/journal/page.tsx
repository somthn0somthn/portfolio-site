import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allJournals } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import JournalListLayout from '@/layouts/JournalListLayout'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Journal' })

export default async function JournalPage() {
  const posts = allCoreContent(sortPosts(allJournals))
  const pageNumber = 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <JournalListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
