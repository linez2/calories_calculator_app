import ProgressBar from './ProgressBar'

/**
 * MacroBar — a single labelled macronutrient progress row (composite).
 *
 * A header row pairs the macro label (left) with its "{value}g / {total}g"
 * readout (right), above a small ProgressBar that fills value/total. Color is
 * keyed to the macro per the brand's "one accent per purpose" principle:
 *   protein → orange   (accent-primary)
 *   carbs   → sage     (accent-secondary)
 *   fat     → neutral  (neutral-400)
 *
 * Values render in IBM Plex Mono (font-numbers) per the data convention.
 */

const variantToBar = {
  protein: 'orange',
  carbs: 'sage',
  fat: 'neutral',
}

export function MacroBar({
  label,
  value = 0,
  total = 0,
  variant = 'protein',
  // Optional override for the right-hand readout. When omitted, the readout is
  // derived as "{value}g / {total}g". `value`/`total` still drive the fill.
  valueLabel,
}) {
  const barVariant = variantToBar[variant] ?? 'orange'
  const pct = total > 0 ? Math.round((value / total) * 100) : 0

  return (
    <div>
      <div className="flex items-baseline justify-between gap-1.5">
        <span className="text-caption font-default text-text-secondary">
          {label}
        </span>
        <span className="font-numbers text-caption text-text-primary">
          {valueLabel ?? `${value}g / ${total}g`}
        </span>
      </div>
      <div className="mt-1.5">
        <ProgressBar value={pct} variant={barVariant} size="small" />
      </div>
    </div>
  )
}

/**
 * MacroGroup — three MacroBars stacked with gap-3, the typical "today's
 * macros" cluster. Pass an array of { label, value, total, variant }.
 */
export function MacroGroup({ macros = [] }) {
  return (
    <div className="flex flex-col gap-3">
      {macros.map((m) => (
        <MacroBar key={m.label} {...m} />
      ))}
    </div>
  )
}

export default MacroBar
