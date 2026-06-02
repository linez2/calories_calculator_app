// Fill colors. Orange uses the soft orange-200 (#FFD7A5) tint rather than the
// vivid accent-primary, so progress reads calm. Sage uses a deeper, desaturated
// sage-600 (#70754A) for a more premium, muted green. Neutral is unchanged.
const variantClasses = {
  orange: 'bg-orange-200',
  sage: 'bg-sage-600',
  neutral: 'bg-neutral-400',
}

// Track dimensions per orientation × size.
const horizontalTrack = {
  default: 'w-full h-2',
  small: 'w-full h-1',
}

const verticalTrack = {
  default: 'h-20 w-2',
  small: 'h-16 w-1',
}

export default function ProgressBar({
  value = 0,
  variant = 'orange',
  size = 'default',
  orientation = 'horizontal',
  className = '',
}) {
  const clamped = Math.max(0, Math.min(100, value))
  const fillColor = variantClasses[variant] ?? variantClasses.orange
  const isVertical = orientation === 'vertical'

  const trackSize = isVertical
    ? verticalTrack[size] ?? verticalTrack.default
    : horizontalTrack[size] ?? horizontalTrack.default

  // For vertical bars, the track is a flex column that anchors the fill to
  // the bottom (justify-end) so progress grows upward. For horizontal bars,
  // the fill simply grows left-to-right via inline width.
  const trackLayout = isVertical ? 'flex flex-col justify-end' : ''

  const fillSize = isVertical ? 'w-full' : 'h-full'
  const fillStyle = isVertical
    ? { height: `${clamped}%` }
    : { width: `${clamped}%` }

  return (
    <div
      className={`bg-neutral-200 rounded-full ${trackSize} ${trackLayout} ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-orientation={orientation}
    >
      {/* Fill carries its own rounded-full so partial fills end with a
          rounded cap — per the brand's "soft visual feedback" principle. */}
      <div
        className={`${fillColor} rounded-full ${fillSize} transition-all duration-300`}
        style={fillStyle}
      />
    </div>
  )
}
