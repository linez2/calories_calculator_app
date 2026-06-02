import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Image as GalleryIcon, Zap } from 'lucide-react'

/**
 * Scan — the camera capture screen.
 *
 * A full-screen, dark, focused camera moment with one clear action: capture.
 * Design system applied over the wireframe: near-black camera area (#1C1B1F =
 * neutral-900), accent-primary corner guides, a confident white shutter, and
 * subtle white flanking controls. No bottom nav — a focused task screen.
 * Same device frame as the other screens; status bar + home indicator in a
 * dark (white-on-dark) theme.
 */

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

export default function Scan() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-neutral-200 flex items-center justify-center p-6">
      {/* Device frame — dark camera area */}
      <div className="relative w-[390px] h-[844px] rounded-[44px] border-[8px] border-neutral-800 shadow-2xl overflow-hidden bg-neutral-900 flex flex-col">
        <StatusBar />

        {/* Top bar — TopAppBar style adapted for dark: white back + centered title */}
        <div className="relative h-14 shrink-0 flex items-center px-2 z-10">
          <button
            type="button"
            aria-label="Back"
            onClick={() => navigate('/home')}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-text-primary transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
          >
            <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-body font-medium text-white">
            Scan
          </h1>
        </div>

        {/* Viewfinder — live food photo, dark overlay, accent-primary guides */}
        <div className="relative z-10 flex-1 overflow-hidden">
          {/* Food photo (camera feed) */}
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay keeps the brackets + text readable */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Bottom-edge gradient — blends the viewfinder into the dark panel */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-black/60" />

          {/* Corner guides (centered, above the photo) */}
          <div className="relative z-10 h-full flex items-center justify-center px-8">
            <div className="relative w-60 h-60">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent-primary rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent-primary rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent-primary rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent-primary rounded-br-xl" />
            </div>
          </div>

          {/* Instruction — bottom overlay bar of the viewfinder */}
          <div className="absolute bottom-0 inset-x-0 z-10 bg-black/40 backdrop-blur-sm py-3 text-center">
            <p className="text-caption text-white">Point at your meal.</p>
          </div>
        </div>

        {/* Dark controls panel — visually separated from the viewfinder */}
        <div className="relative z-20 shrink-0 bg-neutral-950 pt-4 pb-3 flex flex-col items-center">
          <div className="w-full px-10 flex items-center justify-between">
            {/* Gallery */}
            <button
              type="button"
              aria-label="Open gallery"
              className="w-11 h-11 flex items-center justify-center text-white/70 focus:outline-none focus-visible:text-white"
            >
              <GalleryIcon size={24} strokeWidth={1.75} aria-hidden="true" />
            </button>

            {/* Shutter — white ring + white fill */}
            <button
              type="button"
              aria-label="Capture"
              onClick={() => navigate('/scan-analysis')}
              className="w-[76px] h-[76px] rounded-full border-4 border-white flex items-center justify-center transition-transform active:scale-95 focus:outline-none focus-visible:border-accent-primary"
            >
              <div className="w-[60px] h-[60px] rounded-full bg-white" />
            </button>

            {/* Flash */}
            <button
              type="button"
              aria-label="Toggle flash"
              className="w-11 h-11 flex items-center justify-center text-white/70 focus:outline-none focus-visible:text-white"
            >
              <Zap size={24} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          {/* Escape hatch — manual entry (below the controls row) */}
          <button
            type="button"
            className="mt-4 py-2 text-sm text-white/70 underline focus:outline-none focus-visible:text-white"
          >
            Enter manually
          </button>

          {/* Home indicator — light on dark */}
          <div className="w-32 h-1 bg-white rounded-full opacity-30 mx-auto mb-2" />
        </div>
      </div>
    </div>
  )
}
