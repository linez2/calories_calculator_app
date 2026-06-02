import Button from '../components/Button'

/**
 * Onboarding1 — the Rieccal welcome screen (first real design-system screen),
 * shown inside a mock device frame: iOS-style status bar, the brand moment,
 * two actions, terms, and a home indicator.
 *
 * Full design system — bg-background, brand tokens, the Button component, and
 * IBM Plex Sans.
 */

// Brand mark — a rising sun over a level horizon. The horizon line is the
// proprietary move: it grounds the sun and reads as "balance", while the
// half-sun cresting it reads as "daily energy" rising.
//
// Refined: five rays, generously spaced (30deg apart), whose lengths EASE from
// tall at the peak to short at the edges (a graduated fan, not uniform spikes),
// rooted on a ring well clear of the sun so it breathes. Rendered larger.
// currentColor lets the accent-primary token drive the orange.
function BrandMark() {
  const rays = [
    { a: -60, len: 3.5 },
    { a: -30, len: 4.3 },
    { a: 0, len: 5 },
    { a: 30, len: 4.3 },
    { a: 60, len: 3.5 },
  ]
  return (
    <svg
      width="88"
      height="88"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-accent-primary"
      role="img"
      aria-label="Rieccal"
    >
      {/* Horizon — the level "balance" line */}
      <line
        x1="3"
        y1="16"
        x2="21"
        y2="16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Rising half-sun resting on the horizon */}
      <path d="M9 16 A3 3 0 0 1 15 16 Z" />
      {/* Graduated upward fan — peak tallest, easing to the edges */}
      {rays.map(({ a, len }) => (
        <rect
          key={a}
          x="11.2"
          width="1.6"
          y={11.5 - len}
          height={len}
          rx="0.6"
          transform={`rotate(${a} 12 16)`}
        />
      ))}
    </svg>
  )
}

// iOS-style status bar right-side glyphs (signal · wifi · battery).
function StatusIcons() {
  return (
    <div className="flex items-center gap-1.5 text-text-primary">
      {/* Signal bars */}
      <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
        <rect x="0" y="8" width="3" height="4" rx="1" />
        <rect x="5" y="5" width="3" height="7" rx="1" />
        <rect x="10" y="2" width="3" height="10" rx="1" />
        <rect x="15" y="0" width="3" height="12" rx="1" />
      </svg>
      {/* Wifi */}
      <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
        <path d="M8 2.2C5.2 2.2 2.6 3.2 0.7 5L8 12 15.3 5C13.4 3.2 10.8 2.2 8 2.2z" />
      </svg>
      {/* Battery */}
      <svg width="24" height="12" viewBox="0 0 24 12" fill="none" aria-hidden="true">
        <rect x="0.5" y="1" width="20" height="10" rx="2.5" stroke="currentColor" />
        <rect x="2" y="2.5" width="15" height="7" rx="1" fill="currentColor" />
        <rect x="22" y="4" width="1.5" height="4" rx="0.75" fill="currentColor" />
      </svg>
    </div>
  )
}

export default function Onboarding1() {
  return (
    <div className="min-h-screen bg-neutral-200 flex items-center justify-center p-6">
      {/* Device frame */}
      <div className="w-[390px] h-[844px] rounded-[44px] border-[8px] border-neutral-800 shadow-2xl overflow-hidden bg-background flex flex-col">
        {/* Status bar */}
        <div className="h-12 px-6 flex items-center justify-between bg-background shrink-0">
          <span className="text-caption font-medium text-text-primary">
            9:41
          </span>
          <StatusIcons />
        </div>

        {/* Screen content */}
        <div className="flex-1 flex flex-col px-6 pb-3">
          {/* Top spacer — generous, but smaller than the gap below */}
          <div className="flex-[2]" />

          {/* Brand block — sits above vertical center */}
          <div className="flex flex-col items-center text-center">
            <BrandMark />
            <h1
              className="mt-6 font-default font-normal text-display text-text-primary"
              style={{ letterSpacing: '0.14em', marginRight: '-0.14em' }}
            >
              Rieccal
            </h1>
            <p className="mt-3 max-w-[300px] text-body text-text-secondary text-center">
              Your daily energy balance, simplified. Zero friction, no
              restrictions.
            </p>
          </div>

          {/* Generous space below the brand toward the actions */}
          <div className="flex-[3]" />

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button variant="primary" size="large" className="w-full">
              Get started
            </Button>
            {/* Secondary — deliberately quiet text, must not compete with the CTA */}
            <button
              type="button"
              className="w-full h-12 flex items-center justify-center text-body font-normal text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:text-text-primary"
            >
              I already have an account
            </button>
            <p className="mt-2 text-center text-caption text-text-secondary">
              By continuing you agree to our Terms &amp; Privacy
            </p>
          </div>
        </div>

        {/* Home indicator */}
        <div className="w-32 h-1 bg-text-primary rounded-full opacity-20 mx-auto mb-2 shrink-0" />
      </div>
    </div>
  )
}
