import { useEffect, useState } from 'react'

/**
 * CalorieRing — the signature data display of the Rieccal design system.
 *
 * Architecture:
 *   - Pure SVG (no canvas, no third-party dep).
 *   - Two concentric circles: a neutral track and an orange arc.
 *   - The arc's length is controlled by stroke-dasharray + stroke-dashoffset.
 *   - The SVG is rotated -90° so progress starts at 12 o'clock and proceeds
 *     clockwise — the natural reading direction for "how much of the day".
 *   - When `animated`, the dashoffset CSS-transitions from "empty" to target,
 *     producing a soft fill-up motion on mount AND on prop updates.
 *
 * Sizing matrix:
 *   lg → 200px · stroke 12 · full center stack (number + label + "of total")
 *   md → 120px · stroke 8  · center has number + label
 *   sm → 56px  · stroke 4  · arc only, no center text (too small to read)
 */

const sizeConfig = {
  lg: { diameter: 200, strokeWidth: 12 },
  md: { diameter: 120, strokeWidth: 8 },
  sm: { diameter: 56, strokeWidth: 4 },
}

export default function CalorieRing({
  value = 0,
  current,
  total,
  size = 'md',
  label = 'kcal',
  animated = true,
}) {
  const cfg = sizeConfig[size] ?? sizeConfig.md
  // Visual fill is clamped to 0–100 so the arc never "wraps past full".
  // `isOverGoal` is detected from the unclamped value — when the day went
  // beyond the goal, we keep the ring visually full but switch the stroke
  // to orange-600, a brighter neighbor on the same orange ramp (no red
  // shift, no darkening). Reads as "more" rather than "warning" — stays
  // calm and on-brand (Design principle #1).
  const clamped = Math.max(0, Math.min(100, value))
  const isOverGoal = value > 100
  const fillStrokeClass = isOverGoal
    ? 'stroke-orange-600'
    : 'stroke-accent-primary'
  const radius = (cfg.diameter - cfg.strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  // Animated mount: start at 0, then on the next frame advance to target so
  // the CSS transition kicks in. Prop updates also animate via this same
  // path (useEffect re-runs when `clamped` changes).
  const [displayValue, setDisplayValue] = useState(animated ? 0 : clamped)

  useEffect(() => {
    if (!animated) {
      setDisplayValue(clamped)
      return
    }
    const id = requestAnimationFrame(() => setDisplayValue(clamped))
    return () => cancelAnimationFrame(id)
  }, [clamped, animated])

  const dashOffset = circumference * (1 - displayValue / 100)
  const showCenter = size !== 'sm' && current !== undefined
  const showTotalLine = size === 'lg' && total !== undefined

  const ariaLabel =
    current !== undefined && total !== undefined
      ? `${current} of ${total} ${label}, ${Math.round(clamped)}% of daily goal`
      : `${Math.round(clamped)}%`

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: cfg.diameter, height: cfg.diameter }}
    >
      <svg
        width={cfg.diameter}
        height={cfg.diameter}
        viewBox={`0 0 ${cfg.diameter} ${cfg.diameter}`}
        className="-rotate-90"
        role="img"
        aria-label={ariaLabel}
      >
        {/* Track */}
        <circle
          cx={cfg.diameter / 2}
          cy={cfg.diameter / 2}
          r={radius}
          fill="none"
          className="stroke-neutral-200"
          strokeWidth={cfg.strokeWidth}
        />
        {/* Fill arc */}
        <circle
          cx={cfg.diameter / 2}
          cy={cfg.diameter / 2}
          r={radius}
          fill="none"
          className={fillStrokeClass}
          strokeWidth={cfg.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            // Smooth color transition on the stroke too, so animating from
            // 80%→120% morphs from accent-primary to orange-700 instead of
            // snapping at the goal threshold.
            transition: animated
              ? 'stroke-dashoffset 0.8s ease-out, stroke 0.4s ease-out'
              : 'none',
          }}
        />
      </svg>

      {showCenter ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-2 text-center">
          <span
            className={
              size === 'lg'
                ? 'font-numbers font-medium text-text-primary text-num-l leading-none'
                : 'font-numbers font-medium text-text-primary text-h3 leading-none'
            }
          >
            {/* Force en-US locale so the thousands separator is always a
                comma, never a space (which is the European convention and
                would render "1 430" in some browser locales). */}
            {current.toLocaleString('en-US')}
          </span>
          {/* "kcal" label — clearly readable supporting text. lg gets 14px,
              md scales down to 12px so it stays subordinate to the smaller
              20px number without disappearing. */}
          <span
            className={
              size === 'lg'
                ? 'font-default text-text-secondary text-body leading-none mt-1'
                : 'font-default text-text-secondary text-caption leading-none mt-1'
            }
          >
            {label}
          </span>
          {showTotalLine ? (
            // "of {total} kcal" — clearly the most subordinate line. The
            // mt-3 gap visually demotes it from the kcal label so it reads
            // as context, not as part of the headline number.
            <span className="font-numbers text-text-secondary text-caption leading-none mt-3">
              of {total.toLocaleString('en-US')} {label}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
