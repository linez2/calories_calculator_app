import { Link } from 'react-router-dom'

/**
 * RecipeFlowIndex — group index for the recipe flow's screens, at
 * /screens/recipe-flow. Same visual style as OnboardingIndex / ScanFlowIndex.
 */

const screens = [
  { label: '1. Recipe Discovery', to: '/recipes' },
  { label: '2. Recipe Detail', to: '/recipe' },
  { label: 'Interactive Prototype', to: '/screens/recipe-flow/prototype' },
]

export default function RecipeFlowIndex() {
  return (
    <div className="min-h-full bg-gray-50">
      <div className="mx-auto max-w-[480px] px-6 py-16">
        <Link to="/" className="font-mono text-xs text-gray-400 underline">
          ← All screens
        </Link>

        <h1 className="mt-4 text-2xl font-medium text-gray-800">Recipe Flow</h1>

        {/* Section label */}
        <div className="mt-8 pb-2 border-b border-gray-200 font-mono text-xs uppercase tracking-wide text-gray-400">
          Recipe Flow
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {screens.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              className="text-base text-gray-700 underline hover:text-gray-900"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
