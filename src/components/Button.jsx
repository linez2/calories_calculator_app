const baseClasses =
  'inline-flex items-center justify-center font-default font-medium rounded-lg transition-colors duration-150 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'

// Variant config splits "always-on" base from interactive state classes,
// so the pressed-state background doesn't fight the default background.
//
// `disabled` REPLACES `base` entirely (used instead of layering on top) so
// the variant's colored text/border/bg don't bleed through the neutral
// disabled treatment. All disabled text/icon colors are neutral-500 to
// meet WCAG 3:1 contrast against their backgrounds — neutral-400 was
// tested and fails (≈2.2:1 on background and on neutral-100/transparent).
const variantClasses = {
  primary: {
    // Dark text on the orange fill — accent-primary (#FF9232) is too light to
    // carry white text at AA (white ≈ 2.2:1). text-primary (#1C1B1F) on
    // #FF9232 ≈ 7.7:1, passing AA + AAA.
    base: 'text-text-primary border border-transparent',
    default: 'bg-accent-primary hover:bg-orange-500 active:bg-orange-600',
    pressed: 'bg-orange-600',
    // neutral-500 on neutral-200 ≈ 3.5:1 (passes 3:1 for UI/large text)
    disabled: 'bg-neutral-200 text-neutral-500 border border-transparent',
  },
  // Outlined: 1.5px accent-primary border, accent-primary text, transparent fill.
  secondary: {
    base: 'text-accent-primary border-[1.5px] border-accent-primary',
    default: 'bg-transparent hover:bg-orange-50 active:bg-orange-100',
    pressed: 'bg-orange-100',
    // text bumped to neutral-500 (≈3.9:1 on #F2F1ED, passes 3:1)
    disabled:
      'bg-transparent text-neutral-500 border-[1.5px] border-neutral-300',
  },
  ghost: {
    // Ghost stays ghost — no background tint, no outline, no chrome in any
    // interactive state. Feedback is purely typographic: hover fades the
    // text slightly, pressed fades it more. Keeps the surface unmodified
    // and lets ghost buttons disappear into the layout when at rest.
    base: 'text-text-primary border border-transparent bg-transparent',
    default: 'hover:opacity-80 active:opacity-60',
    pressed: 'opacity-60',
    // text bumped to neutral-500 (passes 3:1 on transparent/#F2F1ED)
    disabled: 'bg-transparent text-neutral-500 border border-transparent',
  },
  icon: {
    base: 'text-text-primary border border-border',
    default: 'bg-surface hover:bg-neutral-100 active:bg-neutral-200',
    pressed: 'bg-neutral-200',
    // icon stroke inherits via currentColor; neutral-500 on neutral-100 ≈ 4:1
    disabled: 'bg-neutral-100 text-neutral-500 border border-border',
  },
}

const sizeClasses = {
  small: {
    text: 'text-caption',
    // min-h-[44px] meets the 44px touch-target minimum while the visual padding
    // stays compact; base `items-center justify-center` keeps content centered.
    pad: 'min-h-[44px] px-3 py-1.5 gap-1.5',
    // Icon-small: keep the 32px visual box but grow the tap area to 44×44.
    iconBox: 'h-8 w-8 min-h-[44px] min-w-[44px]',
    iconPx: 16,
  },
  default: {
    text: 'text-body',
    pad: 'h-11 px-4 gap-2',
    iconBox: 'h-11 w-11',
    iconPx: 18,
  },
  large: {
    text: 'text-body-l',
    pad: 'px-6 py-3.5 gap-2',
    iconBox: 'h-14 w-14',
    iconPx: 20,
  },
}

export default function Button({
  variant = 'primary',
  size = 'default',
  disabled = false,
  pressed = false,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  onClick,
  children,
  className = '',
  type = 'button',
  ...rest
}) {
  const v = variantClasses[variant] ?? variantClasses.primary
  const s = sizeClasses[size] ?? sizeClasses.default
  const isIcon = variant === 'icon'

  const layout = isIcon ? s.iconBox : `${s.pad} ${s.text}`

  // When disabled, swap base → disabled and drop default/pressed state classes
  // so the neutral treatment isn't fighting the variant's colored defaults.
  const variantClass = disabled ? v.disabled : v.base
  const stateClass = disabled ? '' : pressed ? v.pressed : v.default
  const disabledClass = disabled ? 'cursor-not-allowed pointer-events-none' : ''

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={`${baseClasses} ${variantClass} ${layout} ${stateClass} ${disabledClass} ${className}`}
      {...rest}
    >
      {isIcon ? (
        LeadingIcon ? (
          <LeadingIcon size={s.iconPx} strokeWidth={1.75} />
        ) : (
          children
        )
      ) : (
        <>
          {LeadingIcon ? (
            <LeadingIcon size={s.iconPx} strokeWidth={1.75} />
          ) : null}
          <span>{children}</span>
          {TrailingIcon ? (
            <TrailingIcon size={s.iconPx} strokeWidth={1.75} />
          ) : null}
        </>
      )}
    </button>
  )
}
