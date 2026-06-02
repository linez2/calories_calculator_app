import { Link } from 'react-router-dom'
import { ChevronLeft, Bookmark, Clock, Flame, Users } from 'lucide-react'

/**
 * WFRecipeDetail — wireframe for the recipe detail screen (recipe flow, 2).
 *
 * A pushed screen from a Discovery card (back returns to Discovery). Editorial
 * layout: a full-width hero image with floating back/save, then the at-a-glance
 * answer above the fold (big title, time/kcal/servings, tags, a macro card),
 * then scannable Ingredients + friendly numbered Steps, and one pinned
 * "Start cooking" action. Wireframe greys only, no brand colors, no bottom nav.
 */

const tags = ['High protein', 'Gluten-free', 'Dinner']

const nutrition = [
  { value: '420', label: 'kcal' },
  { value: '35g', label: 'Protein' },
  { value: '12g', label: 'Carbs' },
  { value: '18g', label: 'Fat' },
]

const ingredients = [
  '2 chicken breasts',
  '1 lemon, juiced',
  '2 tbsp olive oil',
  '3 sprigs fresh thyme',
  '2 garlic cloves, minced',
  'Salt & black pepper',
]

const steps = [
  'Pat the chicken dry and season both sides well.',
  'Warm the oil and sear the chicken until golden — about 5 minutes a side.',
  'Add the garlic and thyme, then pour over the lemon juice.',
  'Let it rest a couple of minutes before serving — that keeps it juicy.',
]

export default function WFRecipeDetail() {
  return (
    <div className="min-h-full bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-[375px]">
        {/* Screen label */}
        <div className="mb-2 font-mono text-xs text-gray-500">
          2. Recipe Detail
        </div>

        {/* Mobile frame */}
        <div className="w-[375px] h-[760px] bg-white border border-gray-300 rounded-sm overflow-hidden flex flex-col">
          {/* Status bar placeholder */}
          <div className="h-6 shrink-0 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-3 font-mono text-[10px] text-gray-500">
            <span>9:41</span>
            <span>●●● WiFi Battery</span>
          </div>

          {/* Scroll area */}
          <div className="flex-1 overflow-auto pb-4">
            {/* Hero image with floating back + save */}
            <div className="relative w-full h-56 bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                Recipe image
              </div>
              <Link
                to="/wireframes/recipe-flow/discovery"
                aria-label="Back"
                className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-700"
              >
                <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
              </Link>
              <button
                type="button"
                aria-label="Save recipe"
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-700"
              >
                <Bookmark size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            {/* Title + meta + tags */}
            <div className="px-5 pt-4">
              <div className="text-2xl font-medium text-gray-800">
                Lemon herb chicken
              </div>

              <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock size={14} strokeWidth={1.75} aria-hidden="true" />
                  <span className="font-mono">20 min</span>
                </span>
                <span className="flex items-center gap-1">
                  <Flame size={14} strokeWidth={1.75} aria-hidden="true" />
                  <span className="font-mono">420 kcal</span>
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} strokeWidth={1.75} aria-hidden="true" />
                  <span className="font-mono">2 servings</span>
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-[10px] text-gray-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutrition summary */}
            <div className="px-5 mt-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 grid grid-cols-4 gap-2">
                {nutrition.map((n) => (
                  <div key={n.label} className="flex flex-col items-center">
                    <span className="text-sm font-mono font-medium text-gray-700">
                      {n.value}
                    </span>
                    <span className="text-[10px] text-gray-400">{n.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div className="px-5 mt-6">
              <div className="text-base font-medium text-gray-700">
                Ingredients
              </div>
              <div className="mt-2 flex flex-col gap-2">
                {ingredients.map((ing) => (
                  <div
                    key={ing}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                    {ing}
                  </div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="px-5 mt-6">
              <div className="text-base font-medium text-gray-700">Steps</div>
              <div className="mt-3 flex flex-col gap-3">
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="w-6 h-6 shrink-0 rounded-full border border-gray-300 flex items-center justify-center text-xs font-mono text-gray-500">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-600">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer — one clear action */}
          <div className="shrink-0 px-5 pt-3 pb-6 border-t border-gray-100">
            <div className="h-12 w-full rounded-md bg-gray-800 border border-gray-800 flex items-center justify-center text-sm text-white">
              Start cooking
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
