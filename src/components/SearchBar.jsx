import { Search } from 'lucide-react'
import Input from './Input'

/**
 * SearchBar — a labelled search field with optional hint / error text.
 *
 * Composition: SearchBar does NOT build its own <input>. It wraps the shared
 * Input primitive, handing it a leading Search icon and forwarding the field
 * props through. This keeps the field's border/focus/disabled/error treatment
 * defined in exactly one place.
 *
 * Below the field: an optional "Hint" line (text-secondary) and an optional
 * "Error" line (error red). Both can show at once — hint sits above error.
 * When `error` is true it also flows to Input so the border turns red.
 *
 * Note on icons: Input renders its leadingIcon as a COMPONENT and fixes it at
 * size 20 / stroke 1.75 internally — so we pass the Lucide component reference
 * (Search), not an element. No trailing icon: the field carries the search
 * glyph on the left only.
 */
export default function SearchBar({
  label,
  placeholder = 'Search',
  value,
  onChange,
  hint = false,
  error = false,
  disabled = false,
  forceFocus = false,
  className = '',
  ...rest
}) {
  return (
    <div className={`w-full ${className}`}>
      {label !== undefined ? (
        <span className="block text-caption font-default text-text-secondary mb-1.5">
          {label}
        </span>
      ) : null}

      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        error={error}
        forceFocus={forceFocus}
        leadingIcon={Search}
        {...rest}
      />

      {hint ? (
        <span className="block text-caption text-text-secondary mt-1.5">
          Hint
        </span>
      ) : null}

      {error ? (
        <span className="block text-caption text-error mt-1.5">Error</span>
      ) : null}
    </div>
  )
}
