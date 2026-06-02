import { Link } from 'react-router-dom'

/**
 * WFRecipeFlowIndex — group index for the recipe wireframe flow. Mirrors the
 * onboarding / scan group index style: a back link, a flow title, and the list
 * of screens. Screens without a route yet are shown muted as "soon".
 */

const screens = [
  { label: '1. Recipe Discovery', to: '/wireframes/recipe-flow/discovery' },
  { label: '2. Recipe Detail', to: '/wireframes/recipe-flow/detail' },
]

export default function WFRecipeFlowIndex() {
  return (
    <div className="min-h-full bg-gray-50">
      <div className="mx-auto max-w-[480px] px-6 py-16">
        <Link to="/" className="font-mono text-xs text-gray-400 underline">
          ← All wireframes
        </Link>

        <h1 className="mt-4 text-2xl font-medium text-gray-800">Recipe Flow</h1>

        {/* Screens */}
        <div className="mt-8 flex flex-col gap-3">
          {screens.map((s) =>
            s.to ? (
              <Link
                key={s.label}
                to={s.to}
                className="text-base text-gray-700 underline hover:text-gray-900"
              >
                {s.label}
              </Link>
            ) : (
              <span key={s.label} className="text-base text-gray-400">
                {s.label} · soon
              </span>
            )
          )}
        </div>
      </div>
    </div>
  )
}
