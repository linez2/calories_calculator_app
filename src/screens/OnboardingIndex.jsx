import { Link } from 'react-router-dom'

/**
 * OnboardingIndex — group index for the real onboarding screens, at
 * /screens/onboarding. Same visual style as the wireframe index pages.
 * Screen 1 is built; 2–5 are reserved paths shown muted until built.
 */

const screens = [
  { label: 'Screen 1 — Welcome', to: '/onboarding/1', ready: true },
  { label: 'Screen 2 — Email', to: '/onboarding/2', ready: false },
  { label: 'Screen 3 — Verify', to: '/onboarding/3', ready: false },
  { label: 'Screen 4 — Personal Data', to: '/onboarding/4', ready: false },
  { label: 'Screen 5 — Goal', to: '/onboarding/5', ready: false },
]

export default function OnboardingIndex() {
  return (
    <div className="min-h-full bg-gray-50">
      <div className="mx-auto max-w-[480px] px-6 py-16">
        <Link to="/" className="font-mono text-xs text-gray-400 underline">
          ← All screens
        </Link>

        <h1 className="mt-4 text-2xl font-medium text-gray-800">
          Onboarding Flow
        </h1>

        {/* Section label */}
        <div className="mt-8 pb-2 border-b border-gray-200 font-mono text-xs uppercase tracking-wide text-gray-400">
          Screens
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {screens.map((s) =>
            s.ready ? (
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
