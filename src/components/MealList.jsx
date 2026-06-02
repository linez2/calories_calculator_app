import MealListItem from './MealListItem'

/**
 * MealList — a titled cluster of meal entries (composite).
 *
 * Renders an optional header (title + total calories) above a list of
 * MealListItems, directly on the page background — no card surface. Each item
 * carries its own bottom-border separator; the last item's border is
 * suppressed so the list ends flush.
 *
 * `items` is an array of MealListItem prop objects. The header row is omitted
 * entirely when neither `title` nor `totalCalories` is provided.
 */
export default function MealList({ title, items = [], totalCalories }) {
  const showHeader = title !== undefined || totalCalories !== undefined

  return (
    <div>
      {showHeader ? (
        <div className="flex items-baseline justify-between mb-1">
          {title !== undefined ? (
            <span className="text-body-l font-default font-medium text-text-primary">
              {title}
            </span>
          ) : (
            <span />
          )}
          {totalCalories !== undefined ? (
            <span className="font-numbers text-caption text-text-secondary">
              {totalCalories} kcal
            </span>
          ) : null}
        </div>
      ) : null}

      {/* Items — each has its own border-b; drop it on the last row. */}
      <div className="[&>button:last-child]:border-b-0">
        {items.map((item, i) => (
          <MealListItem key={i} {...item} />
        ))}
      </div>
    </div>
  )
}
