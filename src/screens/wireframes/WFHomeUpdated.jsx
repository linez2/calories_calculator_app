import { ChevronRight } from 'lucide-react'

/**
 * WFHomeUpdated — the Home / Today screen AFTER logging lunch. Identical layout
 * to WFHome, with updated numbers (eaten 1,689 / remaining 511, fuller macros,
 * Lunch now 455 kcal / 3 items) and a "Lunch logged." confirmation toast at the
 * bottom (white pill with a green left accent — the wireframe stand-in for the
 * sage success toast).
 */

const macros = [
  { label: 'Protein', value: '93g / 120g', pct: 78 },
  { label: 'Carbs', value: '179g / 220g', pct: 81 },
  { label: 'Fat', value: '36g / 70g', pct: 51 },
]

const meals = [
  { name: 'Breakfast', sub: '2 items logged', cal: '515 kcal' },
  { name: 'Lunch', sub: '3 items logged', cal: '455 kcal' },
  { name: 'Dinner', sub: 'No items', cal: '0 kcal' },
  { name: 'Snacks', sub: 'No items', cal: '0 kcal' },
]

const tabs = [
  { label: 'Home', active: true },
  { label: 'Recipes', active: false },
  { label: 'Scan', active: false },
  { label: 'Profile', active: false },
]

export default function WFHomeUpdated() {
  return (
    <div className="min-h-full bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-[375px]">
        {/* Screen label */}
        <div className="mb-2 font-mono text-xs text-gray-500">
          1b. Home — after lunch
        </div>

        {/* Mobile frame */}
        <div className="relative w-[375px] h-[760px] bg-white border border-gray-300 rounded-sm overflow-hidden flex flex-col">
          {/* Status bar placeholder */}
          <div className="h-6 shrink-0 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-3 font-mono text-[10px] text-gray-500">
            <span>9:41</span>
            <span>●●● WiFi Battery</span>
          </div>

          {/* Top app bar — Today + date subtitle */}
          <div className="shrink-0 px-5 py-3 border-b border-gray-200">
            <div className="text-lg font-medium text-gray-800">Today</div>
            <div className="text-xs text-gray-400">May 30</div>
          </div>

          {/* Scroll area */}
          <div className="flex-1 overflow-auto pb-40">
            {/* Dashboard widget — eaten / remaining ring / burned + macros */}
            <div className="mx-5 mt-4 bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-mono font-medium text-gray-700">
                    1,689
                  </span>
                  <span className="text-xs text-gray-400">Eaten</span>
                </div>

                <div className="w-40 h-40 shrink-0 rounded-full border border-gray-300 bg-gray-100 flex flex-col items-center justify-center">
                  <span className="font-mono text-lg font-medium text-gray-700">
                    511
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

              {/* Macro horizontal bars */}
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

            {/* Meal log */}
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

          {/* Toast — "Lunch logged." (green left accent = sage success) */}
          <div className="absolute left-5 right-5 bottom-36 h-12 bg-white border border-gray-200 border-l-4 border-l-green-400 rounded-lg shadow-md flex items-center px-4 text-sm text-gray-700">
            Lunch logged.
          </div>

          {/* FAB — Scan meal, above the bottom nav */}
          <div className="absolute left-5 right-5 bottom-20 h-12 rounded-md bg-gray-800 border border-gray-800 flex items-center justify-center text-sm text-white">
            Scan meal
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
