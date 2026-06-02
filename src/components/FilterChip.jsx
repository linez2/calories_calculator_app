import { cloneElement, isValidElement } from 'react'

/**
 * FilterChip — an always-interactive, toggleable filter pill.
 *
 * Distinct from Tag (display-only): a FilterChip is a button representing a
 * selectable filter facet — e.g. recipe filters like "Under 30 min" or "High
 * protein".
 *
 * States (synchronized with the live recipe-filter UI):
 *   • Unselected — a NEUTRAL outline: transparent fill + a subtle `border-border`
 *     (#E5E4E0) hairline, with the variant's 700-ramp label for AA contrast.
 *     Reads as tappable but quiet.
 *   • Selected — a FILLED brand surface with DARK (`text-primary`) text. SAGE
 *     (accent-secondary, #A4AB7D) is the canonical/default fill, locked in to
 *     match the live screen; `orange` (accent-primary) remains an alternate
 *     variant. Dark text is used because both mid-tone accents are too light to
 *     carry white at AA.
 *
 * `leadingIcon` / `trailingIcon` are React elements (e.g. <Square />). Each is
 * cloned to enforce the 16px size + thin stroke. Lucide icons paint with
 * currentColor, so the icons track the text color in both states automatically.
 *
 * Sizing (certified standard): COMPACT padding `px-2.5 py-1`, `rounded-md`,
 * `text-caption` (12px). The chip is `inline-flex`, so its width FLEXES to fit
 * the label; `min-h-[44px]` guarantees the touch target without inflating the
 * visual height. Geometry mirrors Tag so chips and tags share one rhythm.
 */

// Unselected — neutral outline: transparent fill + a subtle #E5E4E0 hairline
// (semantic `border-border`), with the variant's 700-ramp label for AA contrast
// on the paper surface — orange-700 ≈ 4.7:1, sage-700 ≈ 6.6:1. The border is
// deliberately neutral (not the accent) so the resting chip reads quiet.
const unselectedClasses = {
  orange: 'bg-transparent border border-border text-orange-700',
  sage: 'bg-transparent border border-border text-sage-700',
}

// Selected — filled brand surface, DARK text. Sage (accent-secondary #A4AB7D)
// is the CANONICAL fill (locked in to match the live UI); border matches the
// fill so the box size is stable across the toggle. Dark text because both
// mid-tone accents fail white at AA (white on #FF9232 ≈ 2.2:1, on #A4AB7D
// ≈ 2.4:1); text-primary (#1C1B1F) lands ≈ 7.7:1 / 8.0:1 respectively.
const selectedClasses = {
  orange: 'bg-accent-primary border border-accent-primary text-text-primary',
  sage: 'bg-accent-secondary border border-accent-secondary text-text-primary',
}

// Clone an icon element to enforce the chip's 16px / thin-stroke convention.
const renderIcon = (icon) =>
  isValidElement(icon)
    ? cloneElement(icon, { size: 16, strokeWidth: 1.75, 'aria-hidden': true })
    : null

export default function FilterChip({
  label,
  leadingIcon,
  trailingIcon,
  selected = false,
  onClick,
  variant = 'sage',
  className = '',
}) {
  const styles = selected
    ? selectedClasses[variant] ?? selectedClasses.orange
    : unselectedClasses[variant] ?? unselectedClasses.orange

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`inline-flex items-center justify-center min-h-[44px] gap-1.5 rounded-md px-2.5 py-1 text-caption font-default cursor-pointer transition-colors active:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${styles} ${className}`}
    >
      {renderIcon(leadingIcon)}
      <span>{label}</span>
      {renderIcon(trailingIcon)}
    </button>
  )
}
