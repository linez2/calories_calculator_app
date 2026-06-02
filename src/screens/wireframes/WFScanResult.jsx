import { ChevronLeft } from 'lucide-react'

/**
 * WFScanResult — wireframe for the scan result screen (scan flow, screen 3).
 *
 * Design intent: "We found this. Does it look right?" The photo sits at top as
 * evidence; dashed connector lines link 3 detection dots to floating annotation
 * cards, each with a compact −/+ grams stepper for quick correction. Below: a
 * calm summary, an estimated total, then one primary action ("Add to lunch")
 * and a ghost escape ("Edit manually"). Back button to exit, no bottom nav.
 * Wireframe greys only, no brand colors.
 */

// Detected items — drive both the photo overlay cards and the editable list.
const detected = [
  { name: 'Grilled chicken', grams: '120g', kcal: '210', pos: 'top-3 left-3' },
  { name: 'Brown rice', grams: '150g', kcal: '190', pos: 'top-3 right-3' },
  {
    name: 'Broccoli',
    grams: '80g',
    kcal: '55',
    pos: 'bottom-3 left-1/2 -translate-x-1/2',
  },
]

// Floating annotation card: name + soft tappable grams pill + "tap to change".
function Annotation({ name, grams, className }) {
  return (
    <div
      className={`absolute w-32 bg-white border border-gray-200 rounded-md shadow-sm px-2 py-1.5 ${className}`}
    >
      <div className="text-sm font-medium text-gray-700 truncate">{name}</div>
      <div className="mt-1">
        <span className="inline-block px-2 py-0.5 bg-gray-50 border border-gray-300 rounded-full text-[10px] font-mono text-gray-600">
          {grams}
        </span>
      </div>
      <div className="mt-0.5 text-[10px] text-gray-300">tap to change</div>
    </div>
  )
}

export default function WFScanResult() {
  return (
    <div className="min-h-full bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-[375px]">
        {/* Screen label */}
        <div className="mb-2 font-mono text-xs text-gray-500">
          3. Scan Result
        </div>

        {/* Mobile frame */}
        <div className="w-[375px] h-[760px] bg-white border border-gray-300 rounded-sm overflow-hidden flex flex-col">
          {/* Status bar placeholder */}
          <div className="h-6 shrink-0 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-3 font-mono text-[10px] text-gray-500">
            <span>9:41</span>
            <span>●●● WiFi Battery</span>
          </div>

          {/* Top app bar — back + title */}
          <div className="relative h-12 shrink-0 flex items-center justify-center border-b border-gray-200">
            <button
              type="button"
              aria-label="Back"
              className="absolute left-2 w-9 h-9 rounded-md border border-gray-300 flex items-center justify-center text-gray-600"
            >
              <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <span className="text-sm font-medium text-gray-700">
              Scan result
            </span>
          </div>

          {/* Scroll area */}
          <div className="flex-1 overflow-auto">
            {/* Photo with AI annotation overlay */}
            <div className="relative w-full h-80 bg-gray-200 overflow-hidden">
              {/* Faint photo placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                Meal photo
              </div>

              {/* Connector lines (dot → card), dashed */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 375 320"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line x1="76" y1="84" x2="120" y2="120" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="241" y1="84" x2="250" y2="150" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="187" y1="236" x2="187" y2="190" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />
              </svg>

              {/* Detection dots */}
              {[
                { x: 120, y: 120 },
                { x: 250, y: 150 },
                { x: 187, y: 190 },
              ].map((d, i) => (
                <span
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white bg-gray-700"
                  style={{ left: d.x, top: d.y }}
                />
              ))}

              {/* Floating annotation cards — name + tappable grams + hint */}
              {detected.map((d) => (
                <Annotation
                  key={d.name}
                  name={d.name}
                  grams={d.grams}
                  className={d.pos}
                />
              ))}
            </div>

            {/* Friendly summary line */}
            <div className="px-5 pt-4">
              <div className="text-base font-medium text-gray-700">
                We found 3 items
              </div>
              <div className="mt-1 text-xs text-gray-400">
                Adjust portions below if anything looks off.
              </div>
            </div>

            {/* Detected items — editable rows (all editing happens here) */}
            <div className="px-5 pt-2">
              {detected.map((it) => (
                <div
                  key={it.name}
                  className="flex items-center gap-2 py-3 border-b border-gray-100"
                >
                  {/* Name — flexible left column */}
                  <div className="flex-1 min-w-0">
                    <div className="text-base text-gray-700 truncate">
                      {it.name}
                    </div>
                  </div>

                  {/* Stepper — clean, no hints */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center text-sm text-gray-500">
                      −
                    </span>
                    <span className="w-10 text-center text-sm font-mono text-gray-600">
                      {it.grams}
                    </span>
                    <span className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center text-sm text-gray-500">
                      +
                    </span>
                  </div>

                  {/* Calories — fixed right column */}
                  <div className="w-20 shrink-0 text-right text-sm font-mono text-gray-600">
                    {it.kcal} kcal
                  </div>
                </div>
              ))}
            </div>

            {/* Estimated total */}
            <div className="px-5 pt-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-gray-500">Estimated total</span>
                <span className="text-base font-mono font-medium text-gray-700">
                  455 kcal
                </span>
              </div>
            </div>
          </div>

          {/* Footer — primary action + ghost escape */}
          <div className="shrink-0 px-5 pt-3 pb-6 border-t border-gray-100 flex flex-col gap-2">
            <div className="h-12 w-full rounded-md bg-gray-800 border border-gray-800 flex items-center justify-center text-sm text-white">
              Add to lunch
            </div>
            <div className="h-10 flex items-center justify-center text-sm text-gray-500">
              Retake photo
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
