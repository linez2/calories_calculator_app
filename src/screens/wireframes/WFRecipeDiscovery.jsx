import { Search, Clock, Camera } from 'lucide-react'

/**
 * WFRecipeDiscovery — wireframe for the Recipes tab (recipe flow, screen 1).
 *
 * A utility tool, not a magazine: it answers "What can I cook?" immediately.
 * The hero is "Based on what you have" — recipes surfaced from the user's
 * recent ingredient scan — shown first. Search (with a scan-ingredients icon)
 * and filter chips are secondary paths; "All recipes" follows below. Root tab
 * chrome matches Home (status bar, app bar, bottom nav with Recipes active);
 * no back button. Wireframe greys only, no brand colors.
 */

const filters = ['All', 'Under 30 min', 'High protein', 'Vegetarian', 'Family']

// Surfaced from the recent scan (chicken / rice / broccoli) — ties to the scan flow.
const fromYourScan = [
  { name: 'Chicken & rice bowl', meta: '20 min · 480 kcal' },
  { name: 'Broccoli stir-fry', meta: '15 min · 320 kcal' },
]

const allRecipes = [
  { name: 'Lemon herb chicken', meta: '20 min · 420 kcal' },
  { name: 'Chickpea & spinach stew', meta: '30 min · 380 kcal' },
  { name: 'Overnight oats', meta: '5 min · 310 kcal' },
  { name: 'Garden grain salad', meta: '15 min · 290 kcal' },
]

const tabs = [
  { label: 'Home', active: false },
  { label: 'Recipes', active: true },
  { label: 'Scan', active: false },
  { label: 'Profile', active: false },
]

function RecipeCard({ name, meta, badge }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="h-24 bg-gray-100 border-b border-gray-200 flex items-center justify-center text-[10px] text-gray-400">
        Image
      </div>
      <div className="p-3">
        <div className="text-sm font-medium text-gray-700 truncate">{name}</div>
        <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
          <Clock size={11} strokeWidth={1.75} aria-hidden="true" />
          <span className="font-mono">{meta}</span>
        </div>
        {/* Optional contextual badge — outlined pill below the meta row */}
        {badge && (
          <div className="mt-2">
            <span className="inline-block px-2 py-0.5 rounded-full border border-gray-300 text-[10px] font-mono text-gray-600">
              {badge}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function WFRecipeDiscovery() {
  return (
    <div className="min-h-full bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-[375px]">
        {/* Screen label */}
        <div className="mb-2 font-mono text-xs text-gray-500">
          1. Recipe Discovery
        </div>

        {/* Mobile frame */}
        <div className="relative w-[375px] h-[760px] bg-white border border-gray-300 rounded-sm overflow-hidden flex flex-col">
          {/* Status bar placeholder */}
          <div className="h-6 shrink-0 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-3 font-mono text-[10px] text-gray-500">
            <span>9:41</span>
            <span>●●● WiFi Battery</span>
          </div>

          {/* Top app bar — title only, no tagline */}
          <div className="shrink-0 px-5 py-3 border-b border-gray-200">
            <div className="text-lg font-medium text-gray-800">Recipes</div>
          </div>

          {/* Scroll area */}
          <div className="flex-1 overflow-auto pb-24">
            {/* Search row — search field + scan-ingredients button */}
            <div className="px-5 pt-4 flex items-center gap-2">
              <div className="flex-1 h-11 rounded-lg border border-gray-300 bg-white flex items-center gap-2 px-3 text-sm text-gray-400">
                <Search size={18} strokeWidth={1.75} aria-hidden="true" />
                Search recipes
              </div>
              <button
                type="button"
                aria-label="Scan ingredients"
                className="w-11 h-11 shrink-0 rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-600"
              >
                <Camera size={20} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            {/* Filter chips — horizontal scroll */}
            <div className="mt-4 px-5 flex gap-2 overflow-x-auto">
              {filters.map((f, i) => (
                <span
                  key={f}
                  className={`shrink-0 h-9 px-3.5 inline-flex items-center rounded-full text-sm whitespace-nowrap ${
                    i === 0
                      ? 'bg-gray-800 text-white'
                      : 'border border-gray-300 text-gray-600'
                  }`}
                >
                  {f}
                </span>
              ))}
            </div>

            {/* Hero — based on the recent scan */}
            <div className="px-5 mt-6">
              <div className="text-sm font-medium text-gray-700">
                Based on what you have
              </div>
              <div className="text-xs text-gray-400">From your recent scan</div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {fromYourScan.map((r) => (
                  <RecipeCard key={r.name} name={r.name} meta={r.meta} />
                ))}
              </div>
            </div>

            {/* Contextual — macro-gap suggestions (a calm nudge) */}
            <div className="px-5 mt-6">
              <div className="text-sm font-medium text-gray-700">
                Close your protein gap
              </div>
              <div className="text-xs text-gray-400">
                Evening suggestions to hit your remaining 30g protein target.
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <RecipeCard
                  name="Lemon herb chicken"
                  meta="20 min · 420 kcal"
                  badge="35g protein"
                />
                <RecipeCard
                  name="Greek chicken salad"
                  meta="15 min · 310 kcal"
                  badge="28g protein"
                />
              </div>
            </div>

            {/* All recipes grid */}
            <div className="px-5 mt-6">
              <div className="text-sm font-medium text-gray-700">All recipes</div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {allRecipes.map((r) => (
                  <RecipeCard key={r.name} name={r.name} meta={r.meta} />
                ))}
              </div>
            </div>
          </div>

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
      </div>
    </div>
  )
}
