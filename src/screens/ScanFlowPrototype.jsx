import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart3,
  Home as HomeIcon,
  Utensils,
  User,
  Scan as ScanIcon,
  Plus,
  Minus,
  Sunrise,
  Sun,
  Moon,
  Cookie,
  CheckCircle,
  ChevronLeft,
  X,
  Image as GalleryIcon,
  Zap,
} from 'lucide-react'
import TopAppBar from '../components/TopAppBar'
import CalorieRing from '../components/CalorieRing'
import MealList from '../components/MealList'
import BottomNavigation from '../components/BottomNavigation'
import Button from '../components/Button'
import Card from '../components/Card'
import Toast from '../components/Toast'

/**
 * ScanFlowPrototype — a clickable click-through of the real scan flow.
 *
 *   1 Home          → tap "Scan meal" FAB → 2
 *   2 Scan (camera) → tap the shutter     → 3
 *   3 Analyzing     → tap (or auto 2s)     → 4
 *   4 Scan result   → tap "Add to lunch"   → 5
 *   5 Home (logged) → tap the toast        → 1 (restart)
 *
 * One useState(step) drives which screen renders. Chrome above the frame holds
 * a back arrow (hidden on step 1) and an "X / 5" indicator. Layouts are inlined
 * from the real screen files using the design system.
 */

const SCAN_PHOTO =
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85'
const RESULT_PHOTO =
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=85'

const navTabs = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'recipes', label: 'Recipes', icon: Utensils },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
]

// Home (mid-day) — 895 kcal
const homeMacros = [
  { label: 'Protein', value: 68, total: 120 },
  { label: 'Carbs', value: 95, total: 220 },
  { label: 'Fat', value: 26, total: 70 },
]
const homeMeals = [
  { name: 'Breakfast', description: '2 items', calories: 515, Icon: Sunrise, logged: true },
  { name: 'Lunch', description: '1 item', calories: 380, Icon: Sun, logged: true },
  { name: 'Dinner', description: 'Add food', Icon: Moon, logged: false },
  { name: 'Snacks', description: 'Add food', Icon: Cookie, logged: false },
]

// Home after logging the bowl to dinner — 1,415 kcal
const updatedMacros = [
  { label: 'Protein', value: 71, total: 120 },
  { label: 'Carbs', value: 108, total: 220 },
  { label: 'Fat', value: 31, total: 70 },
]
const updatedMeals = [
  { name: 'Breakfast', description: '2 items', calories: 515, Icon: Sunrise, logged: true },
  { name: 'Lunch', description: '2 items', calories: 640, Icon: Sun, logged: true },
  { name: 'Dinner', description: '1 item', calories: 260, Icon: Moon, logged: true },
  { name: 'Snacks', description: 'Add food', Icon: Cookie, logged: false },
]

// Scan result detected items + pins over the avocado bowl
const detected = [
  { name: 'Avocado', grams: '80g', kcal: '130' },
  { name: 'Cherry tomatoes', grams: '60g', kcal: '11' },
  { name: 'Mixed greens', grams: '40g', kcal: '9' },
  { name: 'Quinoa', grams: '90g', kcal: '110' },
]
const pins = [
  { x: 40, y: 38 },
  { x: 68, y: 30 },
  { x: 63, y: 50 },
  { x: 47, y: 72 },
]

// iOS-style status bar (light = dark glyphs on bg-background; dark = white).
function StatusBar({ dark }) {
  const color = dark ? 'text-white' : 'text-text-primary'
  return (
    <div
      className={`h-12 shrink-0 px-6 flex items-center justify-between ${
        dark ? '' : 'bg-background'
      }`}
    >
      <span className={`font-numbers text-caption font-medium ${color}`}>
        9:41
      </span>
      <div className={`flex items-center gap-1.5 ${color}`}>
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

function MacroRow({ label, value, total }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-caption text-text-secondary">{label}</span>
        <span className="font-numbers text-caption text-text-primary">
          {value}g / {total}g
        </span>
      </div>
      <div className="mt-1.5 h-2 w-full rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-orange-200"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

const FRAME =
  'relative w-[390px] h-[844px] rounded-[44px] border-[8px] border-neutral-800 shadow-2xl overflow-hidden flex flex-col'

// ---- Steps 1 & 5: Home --------------------------------------------------
function HomeFrame({ ring, macros, meals, onFab, onToast }) {
  const mealItems = meals.map((m) => ({
    thumbnail: (
      <m.Icon size={16} strokeWidth={1.75} className="text-text-secondary" aria-hidden="true" />
    ),
    name: m.name,
    description: m.description,
    calories: m.calories,
    showCalories: m.logged,
    trailing: m.logged ? undefined : (
      <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-text-secondary">
        <Plus size={16} strokeWidth={1.75} aria-hidden="true" />
      </div>
    ),
    onClick: () => {},
  }))

  return (
    <div className={`${FRAME} bg-background`}>
      <StatusBar />
      <TopAppBar title="Today" />

      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden pb-44">
        <div className="px-6 pt-4">
          <Card padded={false} elevated className="flex flex-col items-center gap-6 px-4 py-6 !rounded-3xl">
            <CalorieRing value={ring.value} current={ring.current} total={2200} size="lg" />
            <div className="w-full flex flex-col gap-3">
              {macros.map((m) => (
                <MacroRow key={m.label} {...m} />
              ))}
            </div>
          </Card>
        </div>
        <div className="px-6 pt-6">
          <MealList title="Today's meals" totalCalories={ring.current} items={mealItems} />
        </div>
      </div>

      {/* Success toast (step 5) — tap to restart */}
      {onToast && (
        <div
          onClick={onToast}
          className="absolute inset-x-0 bottom-[148px] z-10 flex justify-center px-5 cursor-pointer"
        >
          <Toast
            variant="success"
            icon={<CheckCircle className="text-accent-secondary" />}
            message="Bowl added to your lunch."
          />
        </div>
      )}

      {/* FAB — clickable on step 1 */}
      <div className="absolute left-5 right-5 bottom-[88px] z-10">
        <Button variant="primary" size="large" leadingIcon={ScanIcon} className="w-full" onClick={onFab}>
          Scan meal
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <BottomNavigation tabs={navTabs} activeTab="home" onTabChange={() => {}} />
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-text-primary rounded-full opacity-20" />
    </div>
  )
}

// ---- Step 2: Scan (camera) ----------------------------------------------
function ScanFrame({ onShutter }) {
  return (
    <div className={`${FRAME} bg-neutral-900`}>
      <StatusBar dark />

      <div className="relative h-14 shrink-0 flex items-center px-2 z-10">
        <div className="w-11 h-11 flex items-center justify-center text-white">
          <ChevronLeft size={24} strokeWidth={1.75} aria-hidden="true" />
        </div>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-body font-medium text-white">
          Scan
        </h1>
      </div>

      {/* Viewfinder */}
      <div className="relative z-10 flex-1 overflow-hidden">
        <img src={SCAN_PHOTO} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-black/60" />
        <div className="relative z-10 h-full flex items-center justify-center px-8">
          <div className="relative w-60 h-60">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent-primary rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent-primary rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent-primary rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent-primary rounded-br-xl" />
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 z-10 bg-black/40 backdrop-blur-sm py-3 text-center">
          <p className="text-caption text-white">Point at your meal.</p>
        </div>
      </div>

      {/* Dark controls panel */}
      <div className="relative z-20 shrink-0 bg-neutral-950 pt-4 pb-3 flex flex-col items-center">
        <div className="w-full px-10 flex items-center justify-between">
          <div className="w-11 h-11 flex items-center justify-center text-white/70">
            <GalleryIcon size={24} strokeWidth={1.75} aria-hidden="true" />
          </div>
          <button
            type="button"
            aria-label="Capture"
            onClick={onShutter}
            className="w-[76px] h-[76px] rounded-full border-4 border-white flex items-center justify-center transition-transform active:scale-95"
          >
            <div className="w-[60px] h-[60px] rounded-full bg-white" />
          </button>
          <div className="w-11 h-11 flex items-center justify-center text-white/70">
            <Zap size={24} strokeWidth={1.75} aria-hidden="true" />
          </div>
        </div>
        <div className="mt-4 py-2 text-sm text-white/70 underline">Enter manually</div>
        <div className="mt-4 w-32 h-1 bg-white rounded-full opacity-30 mb-2" />
      </div>
    </div>
  )
}

// ---- Step 3: Analyzing ---------------------------------------------------
function AnalysisFrame({ onAdvance }) {
  return (
    <div className={`${FRAME} bg-neutral-900 cursor-pointer`} onClick={onAdvance}>
      <img src={SCAN_PHOTO} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="sa-sweep absolute inset-x-0 h-28 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/10 to-accent-primary/30" />
        <div
          className="absolute bottom-0 inset-x-0 h-[2px] bg-accent-primary"
          style={{ boxShadow: '0 0 16px 3px rgba(255,146,50,0.7)' }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-60 h-60 opacity-50">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent-primary rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent-primary rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent-primary rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent-primary rounded-br-xl" />
        </div>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
        <StatusBar dark />
        <div className="relative h-14 shrink-0 flex items-center px-2">
          <div className="w-11 h-11 flex items-center justify-center text-white">
            <X size={24} strokeWidth={1.75} aria-hidden="true" />
          </div>
          <span className="sa-pulse absolute left-1/2 -translate-x-1/2 text-body text-white">
            Analyzing…
          </span>
        </div>
        <div className="flex-1" />
        <div className="shrink-0 flex flex-col items-center">
          <Button variant="secondary">Retake photo</Button>
          <div className="mt-4 w-32 h-1 bg-white rounded-full opacity-30 mb-2" />
        </div>
      </div>

      <style>{`
        @keyframes saSweep { 0% { top: -14%; } 100% { top: 100%; } }
        @keyframes saPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        .sa-sweep { top: -14%; animation: saSweep 2.6s cubic-bezier(0.45, 0, 0.55, 1) infinite; }
        .sa-pulse { animation: saPulse 1.8s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

// ---- Step 4: Scan result -------------------------------------------------
function ResultFrame({ onAdd }) {
  return (
    <div className={`${FRAME} bg-background`}>
      <StatusBar />

      <div className="relative h-14 shrink-0 flex items-center justify-center border-b border-border">
        <div className="absolute left-2 w-11 h-11 flex items-center justify-center text-text-primary">
          <ChevronLeft size={24} strokeWidth={1.75} aria-hidden="true" />
        </div>
        <h1 className="text-body font-medium text-text-primary">Scan result</h1>
      </div>

      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {/* Photo + pins */}
        <div className="relative w-full h-80 bg-neutral-900 overflow-hidden">
          <img src={RESULT_PHOTO} alt="" className="absolute inset-0 w-full h-full object-cover" />
          {pins.map((p, i) => (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent-primary ring-2 ring-white shadow-sm"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            />
          ))}
        </div>

        <div className="px-6 pt-5">
          <div className="text-body-l font-medium text-text-primary">We found 4 items</div>
          <div className="mt-1 text-caption text-text-secondary">
            Adjust portions below if anything looks off.
          </div>
        </div>

        <div className="px-6 pt-3">
          {detected.map((it) => (
            <div
              key={it.name}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-2 py-3 border-b border-border"
            >
              <div className="min-w-0 text-body text-text-primary whitespace-nowrap overflow-hidden text-ellipsis">
                {it.name}
              </div>
              <div className="flex items-center gap-1">
                <span className="w-8 h-8 rounded border border-border flex items-center justify-center text-text-secondary">
                  <Minus size={14} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <input
                  type="text"
                  defaultValue={it.grams}
                  aria-label={`${it.name} grams`}
                  className="w-10 h-8 text-center border border-border rounded-md bg-surface text-body font-numbers text-text-primary"
                />
                <span className="w-8 h-8 rounded border border-border flex items-center justify-center text-text-secondary">
                  <Plus size={14} strokeWidth={1.75} aria-hidden="true" />
                </span>
              </div>
              <div className="w-20 whitespace-nowrap text-right font-numbers text-body text-text-secondary">
                {it.kcal} kcal
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 pt-4">
          <div className="bg-surface rounded-lg px-4 py-3 flex items-center justify-between">
            <span className="text-body text-text-secondary">Estimated total</span>
            <span className="font-numbers text-body-l font-medium text-text-primary">260 kcal</span>
          </div>
        </div>
      </div>

      <div className="shrink-0 px-6 pt-3 pb-4 border-t border-border bg-background flex flex-col gap-2">
        <Button variant="primary" size="large" className="w-full" onClick={onAdd}>
          Add to lunch
        </Button>
        <Button variant="secondary" size="large" className="w-full">
          Retake photo
        </Button>
      </div>

      <div className="w-32 h-1 bg-text-primary rounded-full opacity-20 mx-auto mb-2 shrink-0" />
    </div>
  )
}

// ---- Prototype shell -----------------------------------------------------
export default function ScanFlowPrototype() {
  const [step, setStep] = useState(1)
  const back = () => setStep((s) => (s > 1 ? s - 1 : 1))

  // Step 3 auto-advances after 2s (also tappable).
  useEffect(() => {
    if (step !== 3) return
    const t = setTimeout(() => setStep(4), 2000)
    return () => clearTimeout(t)
  }, [step])

  return (
    <div className="min-h-screen bg-neutral-200 flex flex-col items-center py-10 px-4">
      <div className="w-[390px]">
        {/* Chrome — back (hidden on step 1) + exit, step indicator top-right */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step > 1 ? (
              <button
                type="button"
                onClick={back}
                aria-label="Back"
                className="w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center text-gray-600"
              >
                <ChevronLeft size={16} strokeWidth={1.75} aria-hidden="true" />
              </button>
            ) : (
              <div className="w-7 h-7" />
            )}
            <Link to="/screens/scan-flow" className="font-mono text-xs text-gray-400 underline">
              exit
            </Link>
          </div>
          <span className="font-mono text-xs text-gray-500">{step} / 5</span>
        </div>

        {/* Current step */}
        {step === 1 && (
          <HomeFrame
            ring={{ value: 41, current: 895 }}
            macros={homeMacros}
            meals={homeMeals}
            onFab={() => setStep(2)}
          />
        )}
        {step === 2 && <ScanFrame onShutter={() => setStep(3)} />}
        {step === 3 && <AnalysisFrame onAdvance={() => setStep(4)} />}
        {step === 4 && <ResultFrame onAdd={() => setStep(5)} />}
        {step === 5 && (
          <HomeFrame
            ring={{ value: 64, current: 1415 }}
            macros={updatedMacros}
            meals={updatedMeals}
            onToast={() => setStep(1)}
          />
        )}
      </div>
    </div>
  )
}
