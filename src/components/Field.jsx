/**
 * Field — accessibility + caption wrapper for any form control.
 *
 * Renders:
 *   <label>
 *     <span class="caption">{label}</span>
 *     {children}        ← the form control (Input, SearchBar, etc.)
 *   </label>
 *   <p class="caption">{error || helperText}</p>   ← if either is set
 *
 * Uses the implicit-association pattern: wrapping the control inside the
 * <label> element means the control is properly labeled for assistive
 * tech without needing matching htmlFor/id. Field stays generic — it
 * does not introspect or modify its children's props.
 *
 * The `error` prop is the error MESSAGE (string). When you pass it, also
 * set `error` (boolean) on the Input itself so the border switches color.
 * Field intentionally does not auto-inject — keeps composition explicit.
 */
export default function Field({
  label,
  helperText,
  error,
  children,
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="flex flex-col gap-1.5">
        {label ? (
          <span className="text-caption text-text-secondary">{label}</span>
        ) : null}
        {children}
      </label>

      {error ? (
        <p className="text-caption text-error">{error}</p>
      ) : helperText ? (
        <p className="text-caption text-text-secondary">{helperText}</p>
      ) : null}
    </div>
  )
}
