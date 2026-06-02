import { cloneElement } from 'react'

/**
 * NavItem — a single tab in the BottomNavigation bar.
 *
 * `icon` is a React element (e.g. <Square />). We clone it to enforce the
 * 24px size and thin stroke, so callers don't have to remember the sizing
 * convention. Lucide icons paint with `currentColor`, so the active/inactive
 * text color cascades to the glyph automatically.
 */
export default function NavItem({ icon, label, active = false, onClick }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors focus:outline-none focus-visible:text-accent-primary ${
        active ? 'text-accent-primary' : 'text-text-secondary'
      }`}
    >
      {cloneElement(icon, {
        size: 24,
        strokeWidth: 1.75,
        'aria-hidden': true,
      })}
      <span className="text-caption font-default">{label}</span>
    </button>
  )
}
