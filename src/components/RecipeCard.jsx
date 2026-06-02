import { Square, Clock } from 'lucide-react'
import Tag from './Tag'

/**
 * RecipeCard — a tappable recipe preview tile.
 *
 * Top: a fixed-height (160px) image area. When `image` is provided it fills
 * via object-cover; otherwise a neutral placeholder well shows a centered
 * Square icon. Bottom: padded content — title, a meta row (duration · kcal),
 * and an optional row of neutral tags.
 *
 * Numbers use IBM Plex Mono (font-numbers) per the data convention. Tags use
 * a compact className since Tag has no built-in small size.
 */
export default function RecipeCard({
  image,
  title,
  duration,
  calories = 0,
  tags = [],
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col w-full text-left bg-surface border border-border rounded-md overflow-hidden cursor-pointer transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
    >
      {/* Image / placeholder */}
      <div className="h-40 bg-neutral-100 flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <Square
            size={24}
            strokeWidth={1.75}
            className="text-text-secondary"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="text-body-l font-default font-medium text-text-primary line-clamp-2">
          {title}
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-1.5 mt-1 text-text-secondary">
          <Clock size={12} strokeWidth={1.75} aria-hidden="true" />
          <span className="text-caption">{duration}</span>
          <span className="text-caption" aria-hidden="true">
            ·
          </span>
          <span className="font-numbers text-caption">{calories} kcal</span>
        </div>

        {/* Tags */}
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((tag, i) => (
              <Tag
                key={i}
                variant="neutral"
                className="px-2 py-0.5 text-caption"
              >
                {tag}
              </Tag>
            ))}
          </div>
        ) : null}
      </div>
    </button>
  )
}
