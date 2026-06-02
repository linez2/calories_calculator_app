export default function Input({
  placeholder,
  value,
  onChange,
  disabled = false,
  // Boolean now — flips border to the error token. The error MESSAGE is
  // rendered by <Field>; Input only owns the visual error border state.
  error = false,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  suffix,
  // Showcase-only: render the focus border statically.
  forceFocus = false,
  type = 'text',
  className = '',
  ...rest
}) {
  const wrapperBase =
    'flex items-center gap-2 rounded-md px-4 py-3 transition-colors'
  // Precedence: disabled > error > forceFocus > default.
  // Border WIDTH is owned per-state because the error state bumps to 1.5px
  // for a clearly visible "unmistakable at a glance" signal. Other states
  // stay at 1px so the resting field still feels soft and restrained.
  const wrapperState = disabled
    ? 'bg-neutral-100 border border-border cursor-not-allowed'
    : error
    ? 'bg-surface border-[1.5px] border-error'
    : forceFocus
    ? 'bg-surface border border-accent-primary'
    : 'bg-surface border border-border focus-within:border-accent-primary'

  const inputBase =
    'flex-1 min-w-0 bg-transparent outline-none font-default text-body placeholder:text-text-secondary'
  const inputState = disabled
    ? 'text-neutral-400 cursor-not-allowed'
    : 'text-text-primary'

  const iconColor = disabled ? 'text-neutral-400' : 'text-text-secondary'
  const suffixColor = disabled ? 'text-neutral-400' : 'text-text-secondary'

  // Forward value/onChange only when value is provided, so callers can use
  // `defaultValue` for uncontrolled inputs without React warning.
  const valueProps =
    value !== undefined ? { value, onChange } : onChange ? { onChange } : {}

  return (
    <div className={`${wrapperBase} ${wrapperState} ${className}`}>
      {LeadingIcon ? (
        <LeadingIcon
          size={20}
          strokeWidth={1.75}
          className={`${iconColor} shrink-0`}
          aria-hidden="true"
        />
      ) : null}

      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        aria-invalid={error ? 'true' : undefined}
        className={`${inputBase} ${inputState}`}
        {...valueProps}
        {...rest}
      />

      {suffix ? (
        <span
          className={`font-numbers text-body shrink-0 ${suffixColor}`}
          aria-hidden="true"
        >
          {suffix}
        </span>
      ) : null}

      {TrailingIcon ? (
        <TrailingIcon
          size={20}
          strokeWidth={1.75}
          className={`${iconColor} shrink-0`}
          aria-hidden="true"
        />
      ) : null}
    </div>
  )
}
