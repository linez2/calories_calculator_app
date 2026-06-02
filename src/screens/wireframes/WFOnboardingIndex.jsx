import { Link } from 'react-router-dom'

/**
 * WFOnboardingIndex — group index for the onboarding wireframe flow.
 * Lists the five individual screens plus the interactive click-through
 * prototype. Plain wireframe-grey styling, no brand colors.
 */

const screens = [
  { label: 'Screen 1 — Welcome', to: '/wireframes/onboarding-1' },
  { label: 'Screen 2 — Email', to: '/wireframes/onboarding-2' },
  { label: 'Screen 3 — Verify', to: '/wireframes/onboarding-3' },
  { label: 'Screen 4 — Personal data', to: '/wireframes/onboarding-4' },
  { label: 'Screen 5 — Goal', to: '/wireframes/onboarding-5' },
]

export default function WFOnboardingIndex() {
  return (
    <div className="min-h-full bg-gray-50">
      <div className="mx-auto max-w-[480px] px-6 py-16">
        <Link to="/" className="font-mono text-xs text-gray-400 underline">
          ← All wireframes
        </Link>

        <h1 className="mt-4 text-2xl font-medium text-gray-800">
          Onboarding Flow
        </h1>

        {/* Individual screens */}
        <div className="mt-8 flex flex-col gap-3">
          {screens.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="text-base text-gray-700 underline hover:text-gray-900"
            >
              {s.label}
            </Link>
          ))}
        </div>

        {/* Prototype */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link
            to="/wireframes/onboarding/prototype"
            className="text-base font-medium text-gray-900 underline"
          >
            Interactive Prototype →
          </Link>
        </div>
      </div>
    </div>
  )
}
