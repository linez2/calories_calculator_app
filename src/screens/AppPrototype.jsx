import { useState, useEffect } from 'react'
import {
  Home as HomeIcon,
  Utensils,
  BarChart3,
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
  Image as GalleryIcon,
  Zap,
  Search,
  Clock,
  Camera,
  Bookmark,
  Flame,
  Users,
  RotateCcw,
} from 'lucide-react'
import TopAppBar from '../components/TopAppBar'
import CalorieRing from '../components/CalorieRing'
import MealList from '../components/MealList'
import BottomNavigation from '../components/BottomNavigation'
import Button from '../components/Button'
import Card from '../components/Card'
import Toast from '../components/Toast'
import RecipeCard from '../components/RecipeCard'
import Tag from '../components/Tag'
import FilterChip from '../components/FilterChip'

/**
 * AppPrototype — one stateful, click-through prototype that stitches the real
 * screens into a single unified flow, with smooth entrance transitions:
 *
 *   onboarding → home → camera → analyzing (3s) → result (sheet)
 *     → home (logged) → [Recipes tab] → recipes → recipe (detail)
 *
 * A single `screen` state machine drives which inlined screen renders; `logged`
 * + `added` (kcal + macros) carry the scan's result back into Home on top of a
 * constant-target baseline so the calorie ring, macro bars, and Dinner row update
 * live. The scan-result step keeps ALL the polished logic: ±10g steppers, direct
 * manual grams entry on the text field, and a real-time total that flashes and
 * then feeds the amount added to dinner. `cameraOrigin` makes the camera Back
 * button return to wherever it was launched from. Screen frames are inlined from
 * the existing screen files (no new routes) using the design system.
 *
 * Mounted as an isolated block inside the main Index layout.
 */

// ---- Static assets / data ------------------------------------------------
const SCAN_PHOTO =
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85'
const RESULT_PHOTO =
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=85'
const RECIPE_HERO =
  'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=85'

const navTabs = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'recipes', label: 'Recipes', icon: Utensils },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
]

// Detected scan items — densities per 100g (kcal + macros) + initial grams.
// Macro densities let the bowl contribute real protein/carbs/fat.
const ITEMS = [
  { name: 'Avocado', density: 160, initial: 80, protein: 2, carbs: 9, fat: 15 },
  { name: 'Cherry tomatoes', density: 18, initial: 60, protein: 1, carbs: 4, fat: 0 },
  { name: 'Mixed greens', density: 23, initial: 40, protein: 2, carbs: 4, fat: 0 },
  { name: 'Quinoa', density: 120, initial: 90, protein: 4, carbs: 21, fat: 2 },
]
const STEP = 10
const MIN = 10
const kcalFor = (w, d) => Math.round((w / 100) * d)

const pins = [
  { x: 40, y: 38 },
  { x: 68, y: 30 },
  { x: 63, y: 50 },
  { x: 47, y: 72 },
]

// Constant daily targets (denominators) — these NEVER change when a meal is
// logged. The baseline is the day's already-eaten total; logging a meal ADDS
// the scanned bowl on top, so every value only ever increases.
const MACRO_TARGETS = { protein: 90, carbs: 250, fat: 85 }
const BASELINE = { kcal: 895, protein: 25, carbs: 110, fat: 39 }

// Recipes (subset of RecipeDiscovery), full URLs at q=80.
const U = (id) => `https://images.unsplash.com/${id}?w=400&q=80`
const recipesCarousel = [
  { image: U('photo-1512058564366-18510be2db19'), title: 'Chicken rice bowl', duration: '20 min', calories: '480' },
  { image: U('photo-1546069901-d5bfd2cbfb1f'), title: 'Broccoli stir-fry', duration: '15 min', calories: '320' },
  { image: U('photo-1467003909585-2f8a72700288'), title: 'Salmon salad', duration: '15 min', calories: '390' },
]
const proteinGap = [
  { image: U('photo-1604908176997-125f25cc6f3d'), title: 'Lemon chicken', duration: '20 min', calories: '420', tags: ['35g protein'] },
  { image: U('photo-1540420773420-3366772f4999'), title: 'Chickpea salad', duration: '15 min', calories: '310', tags: ['28g protein'] },
  { image: U('photo-1579584425555-c3ce17fd4351'), title: 'Tuna bowl', duration: '15 min', calories: '380', tags: ['32g protein'] },
]
const recipesGrid = [
  { image: U('photo-1490645935967-10de6ba17061'), title: 'Overnight oats', duration: '5 min', calories: '310' },
  { image: U('photo-1484723091739-30a097e8f929'), title: 'Avocado toast', duration: '10 min', calories: '290' },
  { image: U('photo-1504674900247-0877df9cc836'), title: 'Garden grain salad', duration: '15 min', calories: '350' },
  { image: U('photo-1473093295043-cdd812d0e601'), title: 'Tomato basil pasta', duration: '25 min', calories: '480' },
]

// Recipe detail content.
const detailMeta = [
  { Icon: Clock, text: '20 min' },
  { Icon: Flame, text: '420 kcal' },
  { Icon: Users, text: '2 servings' },
]
const detailTags = ['High protein', 'Gluten-free', 'Dinner']
const detailNutrition = [
  { value: '420', label: 'kcal', accent: true },
  { value: '35g', label: 'Protein' },
  { value: '12g', label: 'Carbs' },
  { value: '18g', label: 'Fat' },
]
const detailIngredients = [
  '2 chicken breasts',
  '1 lemon, juiced',
  '2 tbsp olive oil',
  '3 sprigs thyme',
  '2 garlic cloves',
  'Salt & pepper',
]
const detailSteps = [
  'Pat the chicken dry and season both sides well.',
  'Warm the oil and sear the chicken until golden — about 5 minutes a side.',
  'Add the garlic and thyme, then pour over the lemon juice.',
  'Let it rest a couple of minutes before serving — that keeps it juicy.',
]

const FRAME =
  'relative w-[390px] h-[844px] rounded-[44px] border-[8px] border-neutral-800 shadow-2xl overflow-hidden flex flex-col'

const puck =
  'w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-text-primary transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary'

// ---- Stateless helpers ---------------------------------------------------
function StatusBar({ dark }) {
  const color = dark ? 'text-white' : 'text-text-primary'
  return (
    <div className={`h-12 shrink-0 px-6 flex items-center justify-between ${dark ? '' : 'bg-background'}`}>
      <span className={`font-numbers text-caption font-medium ${color}`}>9:41</span>
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
        <span className="font-numbers text-caption text-text-primary">{value}g / {total}g</span>
      </div>
      <div className="mt-1.5 h-2 w-full rounded-full bg-neutral-200">
        <div className="h-full rounded-full bg-orange-200 transition-[width] duration-700 ease-out" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

// ---- Prototype -----------------------------------------------------------
export default function AppPrototype() {
  const [screen, setScreen] = useState('onboarding')
  const [logged, setLogged] = useState(false)
  // The logged meal's frozen kcal + macros (added on top of BASELINE).
  const [added, setAdded] = useState({ kcal: 0, protein: 0, carbs: 0, fat: 0 })
  const [showToast, setShowToast] = useState(false)
  const [weights, setWeights] = useState(ITEMS.map((it) => it.initial))
  // Remembers which screen launched the camera so Back returns there.
  const [cameraOrigin, setCameraOrigin] = useState('home')
  // Active recipe filter chip.
  const [selectedFilter, setSelectedFilter] = useState('All')

  // Scan-result interactive logic.
  const setWeight = (i, w) => setWeights((prev) => prev.map((x, idx) => (idx === i ? w : x)))
  const dec = (i) => setWeight(i, Math.max(MIN, weights[i] - STEP))
  const inc = (i) => setWeight(i, weights[i] + STEP)
  const onType = (i, value) => {
    const digits = value.replace(/[^0-9]/g, '')
    setWeight(i, digits === '' ? 0 : parseInt(digits, 10))
  }
  const kcals = ITEMS.map((it, i) => kcalFor(weights[i], it.density))
  const total = kcals.reduce((a, b) => a + b, 0)
  // The scanned bowl's macros — summed from each item's per-100g density and
  // rounded once (same model as kcal) so they stay mathematically consistent.
  const macroOf = (key) =>
    Math.round(ITEMS.reduce((acc, it, i) => acc + (weights[i] / 100) * it[key], 0))
  const bowl = { kcal: total, protein: macroOf('protein'), carbs: macroOf('carbs'), fat: macroOf('fat') }

  // Analyzing auto-advances after a 3s simulated delay.
  useEffect(() => {
    if (screen !== 'analyzing') return
    const t = setTimeout(() => setScreen('result'), 3000)
    return () => clearTimeout(t)
  }, [screen])

  // Success toast on the updated Home auto-dismisses.
  useEffect(() => {
    if (!(screen === 'home' && showToast)) return
    const t = setTimeout(() => setShowToast(false), 2800)
    return () => clearTimeout(t)
  }, [screen, showToast])

  const addToDinner = () => {
    setAdded(bowl) // freeze the bowl's kcal + macros onto the day's totals
    setLogged(true)
    setShowToast(true)
    setScreen('home')
  }
  const restart = () => {
    setScreen('onboarding')
    setLogged(false)
    setAdded({ kcal: 0, protein: 0, carbs: 0, fat: 0 })
    setShowToast(false)
    setWeights(ITEMS.map((it) => it.initial))
    setSelectedFilter('All')
    setCameraOrigin('home')
  }

  // ---- Screen: Onboarding ----
  const renderOnboarding = () => (
    <div className={`${FRAME} bg-background`}>
      <StatusBar />
      <div className="flex-1 flex flex-col px-6 pb-3">
        <div className="flex-[2]" />
        <div className="flex flex-col items-center text-center">
          <svg width="88" height="88" viewBox="0 0 24 24" fill="currentColor" className="text-accent-primary" role="img" aria-label="Rieccal">
            <line x1="3" y1="16" x2="21" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 16 A3 3 0 0 1 15 16 Z" />
            {[{ a: -60, len: 3.5 }, { a: -30, len: 4.3 }, { a: 0, len: 5 }, { a: 30, len: 4.3 }, { a: 60, len: 3.5 }].map(({ a, len }) => (
              <rect key={a} x="11.2" width="1.6" y={11.5 - len} height={len} rx="0.6" transform={`rotate(${a} 12 16)`} />
            ))}
          </svg>
          <h1 className="mt-6 font-default font-normal text-display text-text-primary" style={{ letterSpacing: '0.14em', marginRight: '-0.14em' }}>
            Rieccal
          </h1>
          <p className="mt-3 max-w-[300px] text-body text-text-secondary">
            Your daily energy balance, simplified. Zero friction, no restrictions.
          </p>
        </div>
        <div className="flex-[3]" />
        <div className="flex flex-col gap-3">
          <Button variant="primary" size="large" className="w-full" onClick={() => setScreen('home')}>
            Get started
          </Button>
          <button type="button" onClick={() => setScreen('home')} className="w-full h-12 flex items-center justify-center text-body font-normal text-text-secondary transition-colors hover:text-text-primary">
            I already have an account
          </button>
          <p className="mt-2 text-center text-caption text-text-secondary">By continuing you agree to our Terms &amp; Privacy</p>
        </div>
      </div>
      <div className="w-32 h-1 bg-text-primary rounded-full opacity-20 mx-auto mb-2 shrink-0" />
    </div>
  )

  // ---- Screen: Home (pre- and post-scan) ----
  const renderHome = () => {
    const current = BASELINE.kcal + (logged ? added.kcal : 0)
    const ringValue = Math.round((current / 2200) * 100)
    const macros = [
      { label: 'Protein', value: BASELINE.protein + (logged ? added.protein : 0), total: MACRO_TARGETS.protein },
      { label: 'Carbs', value: BASELINE.carbs + (logged ? added.carbs : 0), total: MACRO_TARGETS.carbs },
      { label: 'Fat', value: BASELINE.fat + (logged ? added.fat : 0), total: MACRO_TARGETS.fat },
    ]
    const meals = logged
      ? [
          { name: 'Breakfast', description: '2 items', calories: 515, Icon: Sunrise, logged: true },
          { name: 'Lunch', description: '1 item', calories: 380, Icon: Sun, logged: true },
          { name: 'Dinner', description: '1 item', calories: added.kcal, Icon: Moon, logged: true },
          { name: 'Snacks', description: 'Add food', Icon: Cookie, logged: false },
        ]
      : [
          { name: 'Breakfast', description: '2 items', calories: 515, Icon: Sunrise, logged: true },
          { name: 'Lunch', description: '1 item', calories: 380, Icon: Sun, logged: true },
          { name: 'Dinner', description: 'Add food', Icon: Moon, logged: false },
          { name: 'Snacks', description: 'Add food', Icon: Cookie, logged: false },
        ]
    const mealItems = meals.map((m) => ({
      thumbnail: <m.Icon size={16} strokeWidth={1.75} className="text-text-secondary" aria-hidden="true" />,
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
            <Card padded={false} elevated className="flex flex-col items-center gap-6 px-4 py-6 rounded-sm">
              <CalorieRing value={ringValue} current={current} total={2200} size="lg" />
              <div className="w-full flex flex-col gap-3">
                {macros.map((m) => (
                  <MacroRow key={m.label} {...m} />
                ))}
              </div>
            </Card>
          </div>
          <div className="px-6 pt-6">
            <MealList title="Today's meals" totalCalories={current} items={mealItems} />
          </div>
        </div>

        {logged && showToast && (
          <div className="absolute inset-x-0 bottom-[148px] z-10 flex justify-center px-6">
            <Toast variant="success" icon={<CheckCircle className="text-accent-secondary" />} message="Bowl added to your dinner." />
          </div>
        )}

        <div className="absolute left-6 right-6 bottom-[88px] z-10">
          <Button variant="primary" size="large" leadingIcon={ScanIcon} className="w-full" onClick={() => { setCameraOrigin('home'); setScreen('camera') }}>
            Scan meal
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <BottomNavigation tabs={navTabs} activeTab="home" onTabChange={(id) => id === 'recipes' && setScreen('recipes')} />
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-text-primary rounded-full opacity-20" />
      </div>
    )
  }

  // ---- Screen: Camera ----
  const renderCamera = () => (
    <div className={`${FRAME} bg-neutral-900`}>
      <StatusBar dark />
      <div className="relative h-14 shrink-0 flex items-center px-2 z-10">
        <button type="button" aria-label="Back" onClick={() => setScreen(cameraOrigin)} className={puck}>
          <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-h3 font-default font-medium text-white">Scan</h1>
      </div>
      <div className="relative z-10 flex-1 overflow-hidden">
        <img src={SCAN_PHOTO} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-neutral-900/20" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-neutral-900/60" />
        <div className="relative z-10 h-full flex items-center justify-center px-8">
          <div className="relative w-60 h-60">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent-primary rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent-primary rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent-primary rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent-primary rounded-br-lg" />
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 z-10 bg-neutral-900/40 backdrop-blur-sm py-3 text-center">
          <p className="text-caption text-white">Point at your meal.</p>
        </div>
      </div>
      <div className="relative z-20 shrink-0 bg-neutral-950 pt-4 pb-3 flex flex-col items-center">
        <div className="w-full px-10 flex items-center justify-between">
          <button type="button" aria-label="Open gallery" className="w-11 h-11 flex items-center justify-center rounded-lg text-white/70 transition-colors hover:text-white active:text-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
            <GalleryIcon size={24} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Capture" onClick={() => setScreen('analyzing')} className="w-[76px] h-[76px] rounded-full border-4 border-white flex items-center justify-center transition-transform active:scale-95">
            <div className="w-[60px] h-[60px] rounded-full bg-white" />
          </button>
          <button type="button" aria-label="Toggle flash" className="w-11 h-11 flex items-center justify-center rounded-lg text-white/70 transition-colors hover:text-white active:text-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
            <Zap size={24} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
        <button type="button" className="mt-4 py-2 text-sm text-white/70 underline transition-colors hover:text-white active:text-white/60 focus:outline-none focus-visible:text-white">Enter manually</button>
        <div className="mt-4 w-32 h-1 bg-white rounded-full opacity-30 mb-2" />
      </div>
    </div>
  )

  // ---- Screen: Analyzing (3s) ----
  const renderAnalyzing = () => (
    <div className={`${FRAME} bg-neutral-900`}>
      <img src={SCAN_PHOTO} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-neutral-900/25" />
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-neutral-900/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-neutral-900/60 to-transparent" />
      {/* Laser scan line — full-frame-height track, animate-scanline keyframe. */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none z-[6] animate-scanline">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-accent-primary/35 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[3px] bg-accent-primary shadow-[0_0_18px_4px_rgba(255,146,50,0.9)]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-60 h-60 opacity-50">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent-primary rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent-primary rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent-primary rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent-primary rounded-br-lg" />
        </div>
      </div>
      <div className="absolute inset-0 z-10 flex flex-col">
        <StatusBar dark />
        <div className="relative h-14 shrink-0 flex items-center px-2">
          <button type="button" aria-label="Back" onClick={() => setScreen('camera')} className={puck}>
            <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <span className="sa-pulse absolute left-1/2 -translate-x-1/2 text-h3 font-default font-medium text-white">Analyzing…</span>
        </div>
        <div className="flex-1" />
        <div className="shrink-0 flex flex-col items-center">
          <Button variant="secondary" onClick={() => setScreen('camera')}>Retake photo</Button>
          <div className="mt-4 w-32 h-1 bg-white rounded-full opacity-30 mb-2" />
        </div>
      </div>
    </div>
  )

  // ---- Screen: Scan result (interactive sheet) ----
  const renderResult = () => (
    <div className={`${FRAME} bg-background`}>
      <StatusBar />
      <div className="relative h-14 shrink-0 flex items-center justify-center border-b border-border">
        <button type="button" aria-label="Back" onClick={() => setScreen('camera')} className="absolute left-2 w-11 h-11 flex items-center justify-center text-text-primary focus:outline-none focus-visible:text-accent-primary">
          <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <h1 className="text-h3 font-default font-medium text-text-primary">Scan result</h1>
      </div>

      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="relative w-full h-72 bg-neutral-900 overflow-hidden">
          <img src={RESULT_PHOTO} alt="" className="absolute inset-0 w-full h-full object-cover" />
          {pins.map((p, i) => (
            <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent-primary ring-2 ring-white shadow-sm" style={{ left: `${p.x}%`, top: `${p.y}%` }} />
          ))}
        </div>

        <div className="px-6 pt-5">
          <div className="text-body-l font-medium text-text-primary">We found 4 items</div>
          <div className="mt-1 text-caption text-text-secondary">Adjust portions below if anything looks off.</div>
        </div>

        <div className="px-6 pt-3">
          {ITEMS.map((it, i) => (
            <div key={it.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-2 py-3 border-b border-border">
              <div className="min-w-0 text-body text-text-primary whitespace-nowrap overflow-hidden text-ellipsis">{it.name}</div>
              <div className="flex items-center gap-1">
                <button type="button" aria-label={`Decrease ${it.name}`} onClick={() => dec(i)} className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-text-secondary transition-colors focus:outline-none focus-visible:border-accent-primary active:bg-orange-50">
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
                <button type="button" aria-label={`Increase ${it.name}`} onClick={() => inc(i)} className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-text-secondary transition-colors focus:outline-none focus-visible:border-accent-primary active:bg-orange-50">
                  <Plus size={14} strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>
              <div key={kcals[i]} className="sr-flash w-20 whitespace-nowrap text-right font-numbers text-body text-text-secondary">{kcals[i]} kcal</div>
            </div>
          ))}
        </div>

        <div className="px-6 pt-4 pb-2">
          <div className="bg-surface rounded-sm px-4 py-3 flex items-center justify-between">
            <span className="text-body text-text-secondary">Estimated total</span>
            <span key={total} className="sr-flash font-numbers text-body-l font-medium text-text-primary">{total} kcal</span>
          </div>
        </div>
      </div>

      <div className="shrink-0 px-6 pt-3 pb-4 border-t border-border bg-background flex flex-col gap-2">
        <Button variant="primary" size="large" className="w-full" onClick={addToDinner}>Add to dinner</Button>
        <Button variant="secondary" size="large" className="w-full" onClick={() => setScreen('camera')}>Retake photo</Button>
      </div>
      <div className="w-32 h-1 bg-text-primary rounded-full opacity-20 mx-auto mb-2 shrink-0" />
    </div>
  )

  // ---- Screen: Recipes ----
  const renderRecipes = () => {
    const filters = ['All', 'Quick & Easy', 'Under 30 min', 'High protein', 'Low Carb', 'Keto', 'Vegetarian', 'Gluten-Free', 'Breakfast', 'Meal Prep', 'Family']
    return (
      <div className={`${FRAME} bg-background`}>
        <StatusBar />
        <TopAppBar title="Recipes" />
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden pb-24">
          {/* Search + scan-ingredients — light field + matching light camera button */}
          <div className="px-6 pt-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search size={20} strokeWidth={1.75} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" aria-hidden="true" />
              <input type="search" placeholder="Search recipes" className="w-full h-11 pl-10 pr-3 rounded-md bg-surface text-text-primary placeholder:text-text-secondary border border-border text-body font-default focus:outline-none focus:border-accent-primary" />
            </div>
            <Button variant="icon" leadingIcon={Camera} aria-label="Scan ingredients" className="shrink-0" onClick={() => { setCameraOrigin('recipes'); setScreen('camera') }} />
          </div>

          <div className="mt-4 px-6 flex flex-nowrap gap-2 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((f) => (
              <FilterChip key={f} variant="sage" label={f} selected={f === selectedFilter} onClick={() => setSelectedFilter(f)} className="shrink-0" />
            ))}
          </div>

          {/* Carousel — based on what you have */}
          <div className="mt-6 px-6">
            <div className="text-h2 font-medium text-text-primary">Based on what you have</div>
            <div className="mt-0.5 text-caption text-text-secondary">From your recent scan</div>
            <div className="mt-3 flex flex-row gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden -mx-6 px-6">
              {recipesCarousel.map((r) => (
                <div key={r.title} className="min-w-[200px] max-w-[200px] flex-shrink-0">
                  <RecipeCard image={r.image} title={r.title} duration={r.duration} calories={r.calories} onClick={() => setScreen('recipe')} />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel — close your protein gap */}
          <div className="mt-6 px-6">
            <div className="text-h2 font-medium text-text-primary">Close your protein gap</div>
            <div className="mt-0.5 text-caption text-text-secondary">Evening suggestions to hit your remaining 65g protein target.</div>
            <div className="mt-3 flex flex-row gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden -mx-6 px-6">
              {proteinGap.map((r) => (
                <div key={r.title} className="min-w-[200px] max-w-[200px] flex-shrink-0">
                  <RecipeCard image={r.image} title={r.title} duration={r.duration} calories={r.calories} tags={r.tags} onClick={() => setScreen('recipe')} />
                </div>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="mt-6 px-6">
            <div className="flex items-baseline justify-between gap-3">
              <div className="text-h2 font-medium text-text-primary">All recipes</div>
              <button type="button" onClick={() => {}} className="text-caption text-accent-primary hover:underline transition-colors focus:outline-none focus-visible:underline">View all →</button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {recipesGrid.map((r) => (
                <RecipeCard key={r.title} image={r.image} title={r.title} duration={r.duration} calories={r.calories} onClick={() => setScreen('recipe')} />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <BottomNavigation tabs={navTabs} activeTab="recipes" onTabChange={(id) => id === 'home' && setScreen('home')} />
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-text-primary rounded-full opacity-20" />
      </div>
    )
  }

  // ---- Screen: Recipe detail ----
  const renderRecipe = () => (
    <div className={`${FRAME} bg-background`}>
      <StatusBar />
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="relative w-full h-72 min-h-[260px] shrink-0 bg-neutral-900">
          <img src={RECIPE_HERO} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
          <button type="button" aria-label="Back" onClick={() => setScreen('recipes')} className={`absolute top-3 left-4 ${puck}`}>
            <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Save recipe" className={`absolute top-3 right-4 ${puck}`}>
            <Bookmark size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 pt-5">
          <h1 className="text-h1 font-default font-medium text-text-primary">Lemon herb chicken</h1>
          <div className="mt-2 flex items-center flex-wrap gap-x-2 gap-y-1 text-body text-text-secondary">
            {detailMeta.map(({ Icon, text }, i) => (
              <span key={text} className="flex items-center gap-1.5">
                {i > 0 ? <span aria-hidden="true" className="mr-1">·</span> : null}
                <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                <span className="font-numbers">{text}</span>
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {detailTags.map((t) => (
              <Tag key={t} variant="sage">{t}</Tag>
            ))}
          </div>
        </div>

        <div className="px-6 mt-5">
          <div className="bg-surface border border-border rounded-sm p-4 grid grid-cols-4 gap-2">
            {detailNutrition.map((n) => (
              <div key={n.label} className="flex flex-col items-center gap-1">
                <span className={`font-numbers text-body-l font-medium ${n.accent ? 'text-accent-primary' : 'text-text-primary'}`}>{n.value}</span>
                <span className="text-caption text-text-secondary">{n.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 mt-7">
          <h2 className="text-h3 font-default font-medium text-text-primary">Ingredients</h2>
          <ul className="mt-3 flex flex-col gap-2.5">
            {detailIngredients.map((ing) => (
              <li key={ing} className="flex items-center gap-3 text-body text-text-primary">
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent-secondary shrink-0" />
                {ing}
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 mt-7 pb-6">
          <h2 className="text-h3 font-default font-medium text-text-primary">Steps</h2>
          <ol className="mt-3 flex flex-col gap-4">
            {detailSteps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-7 h-7 shrink-0 rounded-full border border-border flex items-center justify-center font-numbers text-caption text-text-secondary">{i + 1}</span>
                <span className="text-body text-text-primary leading-relaxed">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="shrink-0 px-6 pt-3 pb-3 border-t border-border bg-background">
        <Button variant="primary" size="large" className="w-full" onClick={() => {}}>Start cooking</Button>
      </div>
      <div className="w-32 h-1 bg-text-primary rounded-full opacity-20 mx-auto mb-2 shrink-0" />
    </div>
  )

  const screens = {
    onboarding: renderOnboarding,
    home: renderHome,
    camera: renderCamera,
    analyzing: renderAnalyzing,
    result: renderResult,
    recipes: renderRecipes,
    recipe: renderRecipe,
  }
  // Result + recipe detail rise like sheets; the rest cross-fade gently.
  const animClass = screen === 'result' || screen === 'recipe' ? 'proto-sheet' : 'proto-fade'

  const flowLabel = {
    onboarding: 'Onboarding',
    home: logged ? 'Home · logged' : 'Home',
    camera: 'Camera',
    analyzing: 'Analyzing…',
    result: 'Scan result',
    recipes: 'Recipes',
    recipe: 'Recipe detail',
  }[screen]

  return (
    <div className="flex flex-col items-center">
      {/* Prototype chrome — current step + restart */}
      <div className="w-[390px] mb-3 flex items-center justify-between">
        <span className="font-numbers text-caption text-text-secondary">{flowLabel}</span>
        <button type="button" onClick={restart} className="inline-flex items-center gap-1.5 text-caption text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:text-text-primary">
          <RotateCcw size={14} strokeWidth={1.75} aria-hidden="true" />
          Restart
        </button>
      </div>

      {/* Animated frame — keyed by screen so each transition replays */}
      <div key={screen} className={animClass}>
        {screens[screen]()}
      </div>

      <style>{`
        @keyframes protoFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes protoSheet { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        .proto-fade { animation: protoFade 0.32s ease-out; }
        .proto-sheet { animation: protoSheet 0.40s cubic-bezier(0.22, 1, 0.36, 1); }
        @keyframes srFlash { from { color: #FF9232; } }
        .sr-flash { animation: srFlash 0.5s ease-out; }
        @keyframes saPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        .sa-pulse { animation: saPulse 1.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .proto-fade, .proto-sheet, .sr-flash, .sa-pulse { animation: none; }
        }
      `}</style>
    </div>
  )
}
