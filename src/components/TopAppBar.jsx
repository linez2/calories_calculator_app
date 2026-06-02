import { ChevronLeft } from 'lucide-react'

/**
 * TopAppBar — the screen header.
 *
 * The title is absolutely centered (left-1/2, -translate-x-1/2) so it stays
 * pinned to the exact horizontal center of the bar regardless of whether a
 * back button or right action is present. The left and right icon areas are
 * fixed-width slots anchored to the edges; because the title is positioned
 * out of flow, those slots never push it off-center.
 *
 * Each icon button is a 44×44px touch target (w-11 h-11), meeting the Apple
 * HIG minimum tap-area standard.
 */

const TOUCH = 'w-11 h-11 flex items-center justify-center'

export default function TopAppBar({
  title,
  showBack = false,
  onBack,
  rightAction,
}) {
  return (
    <header className="relative flex items-center justify-between bg-background border-b border-border px-2 h-14">
      {/* Left slot — back button (fixed-width touch target) */}
      <div className="w-11 h-11">
        {showBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className={`${TOUCH} text-text-primary transition-colors focus:outline-none focus-visible:text-accent-primary`}
          >
            <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {/* Center — absolutely centered title */}
      <h1 className="absolute left-1/2 -translate-x-1/2 font-default font-medium text-h3 text-text-primary truncate max-w-[60%] text-center">
        {title}
      </h1>

      {/* Right slot — optional action (fixed-width touch target) */}
      <div className="w-11 h-11">{rightAction}</div>
    </header>
  )
}
