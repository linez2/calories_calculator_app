import { isValidElement } from 'react'

/**
 * MealListItem — one row in a meal log list.
 *
 * Horizontal layout:
 *   - Left (optional): a 40×40 thumbnail. `thumbnail` may be —
 *       • a string URL  → rendered as an <img> (object-cover, rounded)
 *       • a React element → rendered inside a surface + border well
 *       • null/undefined → the left area is omitted; name starts at the edge
 *   - Center: name over an optional description, flex-1 so the row fills
 *     its container.
 *   - Right: the calorie number over a "kcal" caption, right-aligned.
 *
 * Numbers use IBM Plex Mono (font-numbers) per the data convention. The
 * bottom border acts as the separator between stacked items.
 */
export default function MealListItem({
  thumbnail,
  name,
  description,
  calories = 0,
  showCalories = true,
  // Optional right-side slot (e.g. an "Add" affordance). Rendered after the
  // calories area; pairs naturally with showCalories={false} for empty rows.
  trailing,
  // Showcase-only: forces the pressed background tint on so the state can be
  // documented statically. In real use the tint comes from active:.
  forcePressed = false,
  onClick,
}) {
  const hasThumbnail = thumbnail !== null && thumbnail !== undefined
  const isImageSrc = typeof thumbnail === 'string'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 border-b border-border text-left transition-colors focus:outline-none focus-visible:bg-orange-50 active:bg-orange-50 ${
        forcePressed ? 'bg-orange-50' : ''
      }`}
    >
      {/* Thumbnail (omitted entirely when null) */}
      {hasThumbnail ? (
        isImageSrc ? (
          <img
            src={thumbnail}
            alt=""
            className="w-10 h-10 shrink-0 object-cover rounded-md border border-border"
          />
        ) : (
          <div className="flex items-center justify-center w-10 h-10 shrink-0 bg-surface border border-border rounded-md">
            {isValidElement(thumbnail) ? thumbnail : null}
          </div>
        )
      ) : null}

      {/* Name + description */}
      <div className={`flex-1 min-w-0 pr-3 ${hasThumbnail ? 'pl-3' : ''}`}>
        <div className="text-body font-default text-text-primary truncate">
          {name}
        </div>
        {description ? (
          <div className="text-caption text-text-secondary truncate">
            {description}
          </div>
        ) : null}
      </div>

      {/* Calories (omitted when showCalories is false) */}
      {showCalories ? (
        <div className="shrink-0 text-right">
          <div className="font-numbers text-body text-text-primary">
            {calories}
          </div>
          <div className="text-caption text-text-secondary">kcal</div>
        </div>
      ) : null}

      {/* Optional trailing slot (right-aligned) */}
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </button>
  )
}
