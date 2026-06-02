import { Link } from 'react-router-dom'

/**
 * ScanFlowIndex — group index for the scan flow's screens, at
 * /screens/scan-flow. Same visual style as OnboardingIndex.
 */

const screens = [
  { label: '1. Home', to: '/home' },
  { label: '2. Scan', to: '/scan' },
  { label: '3. Scan Analysis', to: '/scan-analysis' },
  { label: '4. Scan Result', to: '/scan-result' },
  { label: '5. Home Updated', to: '/home-updated' },
  { label: '6. Interactive Prototype', to: '/screens/scan-flow/prototype' },
]

export default function ScanFlowIndex() {
  return (
    <div className="min-h-full bg-gray-50">
      <div className="mx-auto max-w-[480px] px-6 py-16">
        <Link to="/" className="font-mono text-xs text-gray-400 underline">
          ← All screens
        </Link>

        <h1 className="mt-4 text-2xl font-medium text-gray-800">Scan Flow</h1>

        {/* Section label */}
        <div className="mt-8 pb-2 border-b border-gray-200 font-mono text-xs uppercase tracking-wide text-gray-400">
          Scan Flow
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
