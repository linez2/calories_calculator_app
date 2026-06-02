import { cloneElement, isValidElement } from 'react'
import { Square } from 'lucide-react'

/**
 * Toast — a transient, low-pressure notification pill anchored at the bottom
 * of the screen. This is where the brand voice surfaces ("Lunch logged.") —
 * a calm confirmation, never an alarm.
 *
 * Variants drive a 4px left-accent stripe + a matching-colored leading icon:
 *   default — no stripe, no icon. Just a shadowed surface pill.
 *   success — sage   (accent-secondary) · positive confirmation
 *   warning — orange (accent-primary)   · attention, not alarm
 *   error   — red    (error token)       · functional system failures only
 *
 * Note (Design principle #1 — "no shaming"): warning/error are for FUNCTIONAL,
 * system-level feedback (e.g. "Couldn't save, try again"), never for calorie
 * or macro judgements. Keep those neutral.
 *
 * `visible` drives opacity + a small upward translate so the toast can fade
 * and slide in/out; callers flip it to animate. Rendered statically visible
 * in the showcase.
 *
 * `icon` (React element) overrides the auto Square placeholder when a caller
 * wants a real glyph; it's cloned to 20px / thin stroke. When omitted, every
 * non-default variant renders a Square in the variant's accent color.
 */

const variantConfig = {
  default: { stripe: '', iconColor: '' },
  success: {
    stripe: 'border-l-4 border-l-accent-secondary',
    iconColor: 'text-accent-secondary',
  },
  warning: {
    stripe: 'border-l-4 border-l-accent-primary',
    iconColor: 'text-accent-primary',
  },
  error: {
    stripe: 'border-l-4 border-l-error',
    iconColor: 'text-error',
  },
}

export default function Toast({
  message,
  variant = 'default',
  icon,
  visible = true,
}) {
  const cfg = variantConfig[variant] ?? variantConfig.default

  // Explicit icon override wins; otherwise non-default variants get a Square
  // placeholder tinted to match the left stripe. Default shows no icon.
  const iconNode = isValidElement(icon) ? (
    cloneElement(icon, { size: 20, strokeWidth: 1.75, 'aria-hidden': true })
  ) : variant !== 'default' ? (
    <Square
      size={20}
      strokeWidth={1.75}
      aria-hidden="true"
      className={`${cfg.iconColor} shrink-0`}
    />
  ) : null

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-3 rounded-lg shadow-md px-4 py-3 bg-surface transition-all duration-300 ${cfg.stripe} ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      {iconNode}
      <span className="text-body font-default text-text-primary">{message}</span>
    </div>
  )
}
