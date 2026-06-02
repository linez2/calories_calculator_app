const variantClasses = {
  orange: 'bg-orange-100 text-orange-700',
  sage: 'bg-sage-100 text-sage-700',
  neutral: 'bg-neutral-100 text-neutral-700',
}

export default function Tag({
  variant = 'neutral',
  // Design element — small filled circle in the tag's text color. Kept
  // separate from icons since it's not a glyph, it's a status dot.
  dot = false,
  // Icon slots — both can be set independently or together. Mirrors
  // the Button component's leadingIcon / trailingIcon API.
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  children,
  className = '',
}) {
  const v = variantClasses[variant] ?? variantClasses.neutral

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-caption font-default ${v} ${className}`}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full bg-current"
        />
      ) : null}
      {LeadingIcon ? (
        <LeadingIcon size={16} strokeWidth={1.75} aria-hidden="true" />
      ) : null}
      <span>{children}</span>
      {TrailingIcon ? (
        <TrailingIcon size={16} strokeWidth={1.75} aria-hidden="true" />
      ) : null}
    </span>
  )
}
