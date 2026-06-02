import { ChevronLeft, Camera } from 'lucide-react'

/**
 * WFScan — wireframe for the camera scan screen (scan flow, screen 2).
 *
 * Design intent: the viewfinder is the hero, so the frame goes full-bleed
 * dark (gray-900) — the dark end of the wireframe grey palette, no brand
 * colors. Everything else is a light-grey overlay: a thin status bar, a back
 * button to exit, centered scan-frame brackets, one calm instruction, a single
 * shutter (primary action), and a quiet "Enter manually" escape hatch. No
 * bottom nav — this is a focused task screen.
 */
export default function WFScan() {
  return (
    <div className="min-h-full bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-[375px]">
        {/* Screen label */}
        <div className="mb-2 font-mono text-xs text-gray-500">2. Scan</div>

        {/* Mobile frame — dark immersive viewfinder */}
        <div className="relative w-[375px] h-[760px] bg-gray-900 border border-gray-300 rounded-sm overflow-hidden flex flex-col">
          {/* Top overlay — status bar + back button */}
          <div className="relative z-10 shrink-0">
            <div className="h-6 flex items-center justify-between px-3 font-mono text-[10px] text-gray-400">
              <span>9:41</span>
              <span>●●● WiFi Battery</span>
            </div>
            <div className="px-4 pt-2">
              <button
                type="button"
                aria-label="Back"
                className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-200"
              >
                <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Middle — scan frame + instruction */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-8 px-6">
            {/* Scan frame: corner brackets around a faint live-view hint */}
            <div className="relative w-60 h-60 flex items-center justify-center">
              <Camera
                size={40}
                strokeWidth={1.25}
                className="text-gray-700"
                aria-hidden="true"
              />
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gray-200 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gray-200 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gray-200 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gray-200 rounded-br-xl" />
            </div>

            {/* Calm instruction */}
            <div className="text-center">
              <div className="text-base text-gray-100">Point at your meal</div>
              <div className="mt-1 text-xs text-gray-400">
                We&apos;ll estimate the calories.
              </div>
            </div>
          </div>

          {/* Bottom — primary capture + escape hatch */}
          <div className="relative z-10 shrink-0 pb-10 flex flex-col items-center gap-5">
            {/* Shutter — single primary action */}
            <button
              type="button"
              aria-label="Capture"
              className="w-[72px] h-[72px] rounded-full border-4 border-gray-200 flex items-center justify-center"
            >
              <div className="w-14 h-14 rounded-full bg-gray-200" />
            </button>

            {/* Escape hatch — manual entry */}
            <button
              type="button"
              className="text-sm text-gray-400 underline"
            >
              Enter manually
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
