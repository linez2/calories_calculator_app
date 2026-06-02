import { ChevronLeft } from 'lucide-react'

/**
 * WFOnboarding5 — wireframe for onboarding screen 5: goal selection.
 *
 * Structure only, no brand colors. Same 375px frame as screens 1–4: status
 * bar, back/step top bar, then a 2x2 grid of goal cards (one selected).
 */

const goals = ['Lose weight', 'Gain muscle', 'Stay balanced', 'Just eat better']

export default function WFOnboarding5() {
  return (
    <div className="min-h-full bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-[375px]">
        {/* Screen label */}
        <div className="mb-2 font-mono text-xs text-gray-500">
          Onboarding — Goal (5 of 5)
        </div>

        {/* Mobile frame */}
        <div className="w-[375px] h-[760px] bg-white border border-gray-300 rounded-sm overflow-hidden flex flex-col">
          {/* Status bar placeholder */}
          <div className="h-6 shrink-0 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-3 font-mono text-[10px] text-gray-500">
            <span>9:41</span>
            <span>●●● WiFi Battery</span>
          </div>

          {/* Top bar — back arrow left + step indicator right */}
          <div className="h-12 shrink-0 flex items-center justify-between px-4">
            <div className="w-9 h-9 flex items-center justify-center text-gray-600">
              <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
            </div>
            <span className="text-sm text-gray-400">5 of 5</span>
          </div>

          {/* Content */}
          <div className="px-6 pt-10">
            {/* Headline + subtext */}
            <div className="text-2xl font-medium text-gray-800">
              What&apos;s your goal?
            </div>
            <div className="mt-2 text-base text-gray-500">
              We&apos;ll build a calm plan around it.
            </div>

            {/* 2x2 grid of goal cards */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {goals.map((label, i) => (
                <div
                  key={label}
                  className={`rounded-lg border p-4 h-28 flex flex-col justify-center text-sm text-gray-700 ${
                    i === 0
                      ? 'border-gray-800 bg-gray-100'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Primary CTA — full width, dark fill */}
            <div className="mt-6 h-12 w-full rounded-md bg-gray-800 border border-gray-800 flex items-center justify-center text-sm text-white">
              Get started
            </div>

            {/* Ghost link */}
            <div className="mt-3 text-center text-sm text-gray-400 underline">
              I&apos;ll decide later
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
