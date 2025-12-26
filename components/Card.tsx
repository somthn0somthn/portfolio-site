import Image from './Image'
import Link from './Link'
import Tag from './Tag'

interface CardProps {
  title: string
  description?: string
  imgSrc?: string
  href?: string
  date?: string
  tags?: string[]
  linkText?: string
}

const Card = ({
  title,
  description,
  imgSrc,
  href,
  date,
  tags,
  linkText = 'Learn more',
}: CardProps) => (
  <article className="group border-border bg-surface/40 hover:border-primary-500 hover:bg-surface dark:hover:shadow-primary-500/10 flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
    {/* Clickable area: image + title + description */}
    <Link href={href ?? '#'} className="flex flex-1 flex-col">
      {/* Image */}
      {imgSrc && (
        <div className="relative aspect-video w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
          <Image
            alt={title}
            src={imgSrc}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            fill
          />
        </div>
      )}

      {/* Text content */}
      <div className="flex flex-1 flex-col space-y-2 p-4">
        {date && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={date}>{date}</time>
          </p>
        )}

        <h2 className="group-hover:text-primary-500 dark:group-hover:text-primary-400 text-lg font-semibold text-gray-900 transition-colors dark:text-gray-100">
          {title}
        </h2>

        {description && (
          <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
    </Link>

    {/* Footer: tags + link */}
    <div className="border-border flex items-center justify-between gap-2 border-t px-4 py-3">
      <div className="flex flex-wrap gap-1">{tags?.map((tag) => <Tag key={tag} text={tag} />)}</div>
      {href && (
        <Link href={href} className="text-primary-500 hover:text-primary-400 text-sm font-medium">
          {linkText} →
        </Link>
      )}
    </div>
  </article>
)

export default Card
