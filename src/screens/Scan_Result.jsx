import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Minus, Plus } from 'lucide-react'
import Button from '../components/Button'

/**
 * Scan_Result — the AI scan result screen, fully interactive.
 *
 * The captured photo sits at top with orange detection pins. Below: an editable
 * item list where each row has a −/＋ stepper and a typed grams input. Changing
 * a weight recalculates that item's calories (round(weight/100 × density)) and
 * the estimated total, in real time, with a subtle orange flash on the value
 * that changed. Design system applied; all calorie/gram values are IBM Plex Mono.
 */

const PHOTO =
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=85'

// Detected items — name + calorie density (kcal per 100g) + initial grams.
const ITEMS = [
  { name: 'Avocado', density: 160, initial: 80 },
  { name: 'Cherry tomatoes', density: 18, initial: 60 },
  { name: 'Mixed greens', density: 23, initial: 40 },
  { name: 'Quinoa', density: 120, initial: 90 },
]

const STEP = 10
const MIN = 10

const kcalFor = (weight, density) => Math.round((weight / 100) * density)

// Pin positions (% of the photo), roughly over each ingredient.
const pins = [
  { x: 40, y: 38 }, // cherry tomatoes
  { x: 68, y: 30 }, // mixed greens
  { x: 63, y: 50 }, // quinoa / grains
  { x: 47, y: 72 }, // avocado
]

// iOS-style status bar, light theme (dark glyphs).
function StatusBar() {
  return (
    <div className="h-12 shrink-0 px-6 flex items-center justify-between bg-background">
      <span className="font-numbers text-caption font-medium text-text-primary">
        9:41
      </span>
      <div className="flex items-center gap-1.5 text-text-primary">
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

export default function ScanResult() {
  const navigate = useNavigate()
  const [weights, setWeights] = useState(ITEMS.map((it) => it.initial))

  const setWeight = (i, w) =>
    setWeights((prev) => prev.map((x, idx) => (idx === i ? w : x)))

  const dec = (i) => setWeight(i, Math.max(MIN, weights[i] - STEP))
  const inc = (i) => setWeight(i, weights[i] + STEP)
  const onType = (i, value) => {
    const digits = value.replace(/[^0-9]/g, '')
    setWeight(i, digits === '' ? 0 : parseInt(digits, 10))
  }

  const kcals = ITEMS.map((it, i) => kcalFor(weights[i], it.density))
  const total = kcals.reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-screen bg-neutral-200 flex items-center justify-center p-6">
      {/* Device frame */}
      <div className="relative w-[390px] h-[844px] rounded-[44px] border-[8px] border-neutral-800 shadow-2xl overflow-hidden bg-background flex flex-col">
        <StatusBar />

        {/* Top bar — back + title */}
        <div className="relative h-14 shrink-0 flex items-center justify-center border-b border-border">
          <button
            type="button"
            aria-label="Back"
            onClick={() => navigate('/scan')}
            className="absolute left-2 w-11 h-11 flex items-center justify-center text-text-primary transition-colors focus:outline-none focus-visible:text-accent-primary"
          >
            <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <h1 className="text-body font-medium text-text-primary">Scan result</h1>
        </div>

        {/* Scroll area */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {/* Photo + pins */}
          <div className="relative w-full h-80 bg-neutral-900 overflow-hidden">
            <img
              src={PHOTO}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            {pins.map((p, i) => (
              <span
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent-primary ring-2 ring-white shadow-sm"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              />
            ))}
          </div>

          {/* Summary */}
          <div className="px-6 pt-5">
            <div className="text-body-l font-medium text-text-primary">
              We found 4 items
            </div>
            <div className="mt-1 text-caption text-text-secondary">
              Adjust portions below if anything looks off.
            </div>
          </div>

          {/* Editable item list */}
          <div className="px-6 pt-3">
            {ITEMS.map((it, i) => (
              <div
                key={it.name}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-2 py-3 border-b border-border"
              >
                {/* Name */}
                <div className="min-w-0 text-body text-text-primary whitespace-nowrap overflow-hidden text-ellipsis">
                  {it.name}
                </div>

                {/* Stepper */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label={`Decrease ${it.name}`}
                    onClick={() => dec(i)}
                    className="w-8 h-8 rounded border border-border flex items-center justify-center text-text-secondary transition-colors focus:outline-none focus-visible:border-accent-primary active:bg-orange-50"
                  >
                    <Minus size={14} strokeWidth={1.75} aria-hidden="true" />
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={`${weights[i]}g`}
                    onChange={(e) => onType(i, e.target.value)}
                    aria-label={`${it.name} grams`}
                    className="w-10 h-8 text-center border border-border rounded-md bg-surface text-body font-numbers text-text-primary focus:outline-none focus:border-accent-primary"
                  />
                  <button
                    type="button"
                    aria-label={`Increase ${it.name}`}
                    onClick={() => inc(i)}
                    className="w-8 h-8 rounded border border-border flex items-center justify-center text-text-secondary transition-colors focus:outline-none focus-visible:border-accent-primary active:bg-orange-50"
                  >
                    <Plus size={14} strokeWidth={1.75} aria-hidden="true" />
                  </button>
                </div>

                {/* Calories — flashes orange on change (keyed by value) */}
                <div
                  key={kcals[i]}
                  className="sr-flash w-20 whitespace-nowrap text-right font-numbers text-body text-text-secondary"
                >
                  {kcals[i]} kcal
                </div>
              </div>
            ))}
          </div>

          {/* Estimated total — recalculates live, flashes on change */}
          <div className="px-6 pt-4">
            <div className="bg-surface rounded-lg px-4 py-3 flex items-center justify-between">
              <span className="text-body text-text-secondary">
                Estimated total
              </span>
              <span
                key={total}
                className="sr-flash font-numbers text-body-l font-medium text-text-primary"
              >
                {total} kcal
              </span>
            </div>
          </div>
        </div>

        {/* Footer — primary + secondary actions */}
        <div className="shrink-0 px-6 pt-3 pb-4 border-t border-border bg-background flex flex-col gap-2">
          <Button
            variant="primary"
            size="large"
            className="w-full"
            onClick={() => navigate('/home')}
          >
            Add to lunch
          </Button>
          <Button
            variant="secondary"
            size="large"
            className="w-full"
            onClick={() => navigate('/scan')}
          >
            Retake photo
          </Button>
        </div>

        {/* Home indicator */}
        <div className="w-32 h-1 bg-text-primary rounded-full opacity-20 mx-auto mb-2 shrink-0" />

        {/* Flash animation — value briefly tints accent-primary on change */}
        <style>{`
          @keyframes srFlash { from { color: #FF9232; } }
          .sr-flash { animation: srFlash 0.5s ease-out; }
        `}</style>
      </div>
    </div>
  )
}
