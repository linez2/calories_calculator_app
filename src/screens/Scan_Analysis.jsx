import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import Button from '../components/Button'

/**
 * Scan_Analysis — the AI-working state between capture and results.
 *
 * A calm 2–3s moment: the full-bleed photo holds still while a soft
 * accent-primary scan beam sweeps top→bottom (the brand signature), faint
 * orange corner guides frame the meal, and an "Analyzing…" label breathes.
 * Considered, not anxious — no spinner. Dark theme, no bottom nav.
 */

const PHOTO =
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85'

// iOS-style status bar, dark theme (white glyphs).
function StatusBar() {
  return (
    <div className="h-12 shrink-0 px-6 flex items-center justify-between">
      <span className="font-numbers text-caption font-medium text-white">
        9:41
      </span>
      <div className="flex items-center gap-1.5 text-white">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2" width="3" height="10" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
          <path d="M8 2.2C5.2 2.2 2.6 3.2 0.7 5L8 12 15.3 5C13.4 3.2 10.8 2.2 8 2.2z" />
        </svg>
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none" aria-hidden="true">
          <rect x="0.5" y="1" width="20" height="10" rx="2.5" stroke="currentColor" />
          <rect x="2" y="2.5" width="15" height="7" rx="1" fill="currentColor" />
          <rect x="22" y="4" width="1.5" height="4" rx="0.75" fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}

export default function ScanAnalysis() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-neutral-200 flex items-center justify-center p-6">
      {/* Device frame */}
      <div className="relative w-[390px] h-[844px] rounded-[44px] border-[8px] border-neutral-800 shadow-2xl overflow-hidden bg-neutral-900">
        {/* Full-bleed photo */}
        <img
          src={PHOTO}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Soft dark overlay for legibility */}
        <div className="absolute inset-0 bg-black/25" />
        {/* Readability gradients top + bottom */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Scan beam — accent-primary line + glow, sweeping top→bottom */}
        <div className="sa-sweep absolute inset-x-0 h-28 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/10 to-accent-primary/30" />
          <div
            className="absolute bottom-0 inset-x-0 h-[2px] bg-accent-primary"
            style={{ boxShadow: '0 0 16px 3px rgba(255,146,50,0.7)' }}
          />
        </div>

        {/* Faint corner guides (continuity with the capture frame) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-60 h-60 opacity-50">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent-primary rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent-primary rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent-primary rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent-primary rounded-br-xl" />
          </div>
        </div>

        {/* Chrome — over the photo */}
        <div className="absolute inset-0 z-10 flex flex-col">
          <StatusBar />

          {/* Top bar — close (left) + Analyzing label (centered) */}
          <div className="relative h-14 shrink-0 flex items-center px-2">
            <button
              type="button"
              aria-label="Back"
              onClick={() => navigate('/scan')}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-text-primary transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
            >
              <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <span
              className="sa-pulse absolute left-1/2 -translate-x-1/2 text-body text-white"
              aria-live="polite"
            >
              Analyzing…
            </span>
          </div>

          <div className="flex-1" />

          {/* Bottom — Retake photo (ghost), above the home indicator */}
          <div className="shrink-0 flex flex-col items-center">
            <Button variant="secondary" onClick={() => navigate('/scan')}>
              Retake photo
            </Button>
            <div className="mt-4 w-32 h-1 bg-white rounded-full opacity-30 mb-2" />
          </div>
        </div>

        {/* Animation keyframes */}
        <style>{`
          @keyframes saSweep { 0% { top: -14%; } 100% { top: 100%; } }
          @keyframes saPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
          .sa-sweep { top: -14%; animation: saSweep 2.6s cubic-bezier(0.45, 0, 0.55, 1) infinite; }
          .sa-pulse { animation: saPulse 1.8s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .sa-sweep { animation: none; top: 42%; }
            .sa-pulse { animation: none; opacity: 0.85; }
          }
        `}</style>
      </div>
    </div>
  )
}
