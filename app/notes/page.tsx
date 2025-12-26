import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allNotes } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import NoteListLayout from '@/layouts/NoteListLayout'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Notes' })

export default async function NotesPage() {
  const posts = allCoreContent(sortPosts(allNotes))
  const pageNumber = 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <NoteListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
