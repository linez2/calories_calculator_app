import { Link } from 'react-router-dom'

/**
 * WFScanFlowIndex — group index for the scan wireframe flow. Mirrors the
 * onboarding group index style: a back link, a flow title, and the list of
 * screens. Screens without a route yet are shown muted as "soon".
 */

const screens = [
  { label: '1. Home', to: '/wireframes/home' },
  { label: '2. Scan', to: '/wireframes/scan-flow/scan' },
  { label: '3. Scan Result', to: '/wireframes/scan-flow/scan-result' },
  { label: '1b. Home — after lunch', to: '/wireframes/scan-flow/home-updated' },
]

export default function WFScanFlowIndex() {
  return (
    <div className="min-h-full bg-gray-50">
      <div className="mx-auto max-w-[480px] px-6 py-16">
        <Link to="/" className="font-mono text-xs text-gray-400 underline">
          ← All wireframes
        </Link>

        <h1 className="mt-4 text-2xl font-medium text-gray-800">Scan Flow</h1>

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

        {/* Prototype */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link
            to="/wireframes/scan-flow/prototype"
            className="text-base font-medium text-gray-900 underline"
          >
            Interactive Prototype →
          </Link>
        </div>
      </div>
    </div>
  )
}
