export default function Card({
  padded = true,
  elevated = false,
  children,
  className = '',
}) {
  const padding = padded ? 'p-4' : ''
  const shadow = elevated ? 'shadow-sm' : ''
  return (
    <div
      className={`bg-surface border border-border rounded-sm ${padding} ${shadow} ${className}`}
    >
      {children}
    </div>
  )
}
