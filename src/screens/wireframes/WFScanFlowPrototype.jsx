import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Camera } from 'lucide-react'

/**
 * WFScanFlowPrototype — clickable click-through of the scan flow.
 *
 *   1 Home          → tap "Scan meal" FAB   → 2
 *   2 Scan (camera) → tap the shutter       → 3
 *   3 Scan result   → tap "Add to lunch"    → 4
 *   4 Home (logged) → tap the toast         → 1 (restart)
 *
 * A single useState(step) drives which screen renders. Chrome above the frame
 * holds a back arrow (previous step) and an "X / 4" indicator. Screen layouts
 * are inlined from the standalone wireframe files. Wireframe greys only.
 */

// ---- Shared data ----------------------------------------------------------
const tabs = [
  { label: 'Home', active: true },
  { label: 'Recipes', active: false },
  { label: 'Scan', active: false },
  { label: 'Profile', active: false },
]

const macrosOriginal = [
  { label: 'Protein', value: '90g / 120g', pct: 75 },
  { label: 'Carbs', value: '140g / 220g', pct: 63 },
  { label: 'Fat', value: '35g / 70g', pct: 50 },
]
const macrosUpdated = [
  { label: 'Protein', value: '93g / 120g', pct: 78 },
  { label: 'Carbs', value: '179g / 220g', pct: 81 },
  { label: 'Fat', value: '36g / 70g', pct: 51 },
]

const mealsOriginal = [
  { name: 'Breakfast', sub: '2 items logged', cal: '515 kcal' },
  { name: 'Lunch', sub: 'No items', cal: '0 kcal' },
  { name: 'Dinner', sub: 'No items', cal: '0 kcal' },
  { name: 'Snacks', sub: 'No items', cal: '0 kcal' },
]
const mealsUpdated = [
  { name: 'Breakfast', sub: '2 items logged', cal: '515 kcal' },
  { name: 'Lunch', sub: '3 items logged', cal: '455 kcal' },
  { name: 'Dinner', sub: 'No items', cal: '0 kcal' },
  { name: 'Snacks', sub: 'No items', cal: '0 kcal' },
]

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

// ---- Step 1 & 4: Home -----------------------------------------------------
function HomeFrame({ eaten, remaining, macros, meals, onFab, onToast }) {
  return (
    <div className="relative w-[375px] h-[760px] bg-white border border-gray-300 rounded-sm overflow-hidden flex flex-col">
      <div className="h-6 shrink-0 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-3 font-mono text-[10px] text-gray-500">
        <span>9:41</span>
        <span>●●● WiFi Battery</span>
      </div>

      <div className="shrink-0 px-5 py-3 border-b border-gray-200">
        <div className="text-lg font-medium text-gray-800">Today</div>
        <div className="text-xs text-gray-400">May 30</div>
      </div>

      <div className="flex-1 overflow-auto pb-40">
        {/* Dashboard widget */}
        <div className="mx-5 mt-4 bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center">
              <span className="text-lg font-mono font-medium text-gray-700">
                {eaten}
              </span>
              <span className="text-xs text-gray-400">Eaten</span>
            </div>
            <div className="w-40 h-40 shrink-0 rounded-full border border-gray-300 bg-gray-100 flex flex-col items-center justify-center">
              <span className="font-mono text-lg font-medium text-gray-700">
                {remaining}
              </span>
              <span className="text-xs text-gray-400">Remaining</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-mono font-medium text-gray-700">
                0
              </span>
              <span className="text-xs text-gray-400">Burned</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {macros.map((m) => (
              <div key={m.label} className="flex flex-col gap-1">
                <span className="text-xs text-gray-400">{m.label}</span>
                <span className="text-xs font-mono text-gray-600">
                  {m.value}
                </span>
                <div className="w-full h-1.5 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-gray-400 rounded-full"
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meals */}
        <div className="mt-4 flex flex-col gap-2">
          {meals.map((meal) => (
            <div
              key={meal.name}
              className="mx-5 bg-white border border-gray-200 rounded-lg px-4 py-3 flex flex-row items-center justify-between"
            >
              <div className="min-w-0">
                <div className="text-base font-medium text-gray-700">
                  {meal.name}
                </div>
                <div className="text-xs text-gray-400">{meal.sub}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-sm font-mono text-gray-600">
                  {meal.cal}
                </span>
                <ChevronRight
                  size={18}
                  strokeWidth={1.75}
                  className="text-gray-300"
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast (step 4) — clickable to restart */}
      {onToast && (
        <button
          type="button"
          onClick={onToast}
          className="absolute left-5 right-5 bottom-36 h-12 bg-white border border-gray-200 border-l-4 border-l-green-400 rounded-lg shadow-md flex items-center px-4 text-sm text-gray-700"
        >
          Lunch logged.
        </button>
      )}

      {/* FAB — Scan meal (clickable on step 1) */}
      {onFab ? (
        <button
          type="button"
          onClick={onFab}
          className="absolute left-5 right-5 bottom-20 h-12 rounded-md bg-gray-800 border border-gray-800 flex items-center justify-center text-sm text-white"
        >
          Scan meal
        </button>
      ) : (
        <div className="absolute left-5 right-5 bottom-20 h-12 rounded-md bg-gray-800 border border-gray-800 flex items-center justify-center text-sm text-white">
          Scan meal
        </div>
      )}

      {/* Bottom navigation */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around px-2">
        {tabs.map((tab) => (
          <div key={tab.label} className="flex flex-col items-center gap-1">
            <div
              className={`w-6 h-6 rounded border ${
                tab.active
                  ? 'bg-gray-700 border-gray-700'
                  : 'bg-gray-100 border-gray-300'
              }`}
            />
            <span
              className={`text-[10px] ${
                tab.active ? 'text-gray-800' : 'text-gray-500'
              }`}
            >
              {tab.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---- Step 2: Scan (camera) ------------------------------------------------
function ScanFrame({ onShutter }) {
  return (
    <div className="relative w-[375px] h-[760px] bg-gray-900 border border-gray-300 rounded-sm overflow-hidden flex flex-col">
      <div className="relative z-10 shrink-0">
        <div className="h-6 flex items-center justify-between px-3 font-mono text-[10px] text-gray-400">
          <span>9:41</span>
          <span>●●● WiFi Battery</span>
        </div>
        <div className="px-4 pt-2">
          <div className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-200">
            <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-8 px-6">
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
        <div className="text-center">
          <div className="text-base text-gray-100">Point at your meal</div>
          <div className="mt-1 text-xs text-gray-400">
            We&apos;ll estimate the calories.
          </div>
        </div>
      </div>

      <div className="relative z-10 shrink-0 pb-10 flex flex-col items-center gap-5">
        <button
          type="button"
          onClick={onShutter}
          aria-label="Capture"
          className="w-[72px] h-[72px] rounded-full border-4 border-gray-200 flex items-center justify-center"
        >
          <div className="w-14 h-14 rounded-full bg-gray-200" />
        </button>
        <div className="text-sm text-gray-400 underline">Enter manually</div>
      </div>
    </div>
  )
}

// ---- Step 3: Scan result --------------------------------------------------
function ResultFrame({ onAdd }) {
  return (
    <div className="w-[375px] h-[760px] bg-white border border-gray-300 rounded-sm overflow-hidden flex flex-col">
      <div className="h-6 shrink-0 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-3 font-mono text-[10px] text-gray-500">
        <span>9:41</span>
        <span>●●● WiFi Battery</span>
      </div>

      <div className="relative h-12 shrink-0 flex items-center justify-center border-b border-gray-200">
        <div className="absolute left-2 w-9 h-9 rounded-md border border-gray-300 flex items-center justify-center text-gray-600">
          <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
        </div>
        <span className="text-sm font-medium text-gray-700">Scan result</span>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Photo + annotations */}
        <div className="relative w-full h-80 bg-gray-200 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
            Meal photo
          </div>
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
          {detected.map((d) => (
            <Annotation
              key={d.name}
              name={d.name}
              grams={d.grams}
              className={d.pos}
            />
          ))}
        </div>

        {/* Summary line */}
        <div className="px-5 pt-4">
          <div className="text-base font-medium text-gray-700">
            We found 3 items
          </div>
          <div className="mt-1 text-xs text-gray-400">
            Adjust portions below if anything looks off.
          </div>
        </div>

        {/* Items list */}
        <div className="px-5 pt-2">
          {detected.map((it) => (
            <div
              key={it.name}
              className="flex items-center gap-2 py-3 border-b border-gray-100"
            >
              <div className="flex-1 min-w-0">
                <div className="text-base text-gray-700 truncate">
                  {it.name}
                </div>
              </div>
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

      {/* Footer */}
      <div className="shrink-0 px-5 pt-3 pb-6 border-t border-gray-100 flex flex-col gap-2">
        <button
          type="button"
          onClick={onAdd}
          className="h-12 w-full rounded-md bg-gray-800 border border-gray-800 flex items-center justify-center text-sm text-white"
        >
          Add to lunch
        </button>
        <div className="h-10 flex items-center justify-center text-sm text-gray-500">
          Retake photo
        </div>
      </div>
    </div>
  )
}

// ---- Prototype shell ------------------------------------------------------
export default function WFScanFlowPrototype() {
  const [step, setStep] = useState(1)
  const back = () => setStep((s) => (s > 1 ? s - 1 : 1))

  return (
    <div className="min-h-full bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-[375px]">
        {/* Chrome — back + exit (left), step indicator (right) */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={back}
              disabled={step === 1}
              aria-label="Back"
              className={`w-7 h-7 rounded-md border flex items-center justify-center ${
                step === 1
                  ? 'border-gray-200 text-gray-300'
                  : 'border-gray-300 text-gray-600'
              }`}
            >
              <ChevronLeft size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <Link
              to="/wireframes/scan-flow"
              className="font-mono text-xs text-gray-400 underline"
            >
              exit
            </Link>
          </div>
          <span className="font-mono text-xs text-gray-500">{step} / 4</span>
        </div>

        {/* Current step */}
        {step === 1 && (
          <HomeFrame
            eaten="611"
            remaining="1,631"
            macros={macrosOriginal}
            meals={mealsOriginal}
            onFab={() => setStep(2)}
          />
        )}
        {step === 2 && <ScanFrame onShutter={() => setStep(3)} />}
        {step === 3 && <ResultFrame onAdd={() => setStep(4)} />}
        {step === 4 && (
          <HomeFrame
            eaten="1,689"
            remaining="511"
            macros={macrosUpdated}
            meals={mealsUpdated}
            onToast={() => setStep(1)}
          />
        )}
      </div>
    </div>
  )
}
