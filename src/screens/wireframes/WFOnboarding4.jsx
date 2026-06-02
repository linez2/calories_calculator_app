import { ChevronLeft } from 'lucide-react'

/**
 * WFOnboarding4 — wireframe for onboarding screen 4: personal data.
 *
 * Structure only, no brand colors. Same 375px frame as screens 1–3: status
 * bar, back/step top bar, then sex selection + height/weight inputs.
 */
export default function WFOnboarding4() {
  return (
    <div className="min-h-full bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-[375px]">
        {/* Screen label */}
        <div className="mb-2 font-mono text-xs text-gray-500">
          Onboarding — Personal data (4 of 5)
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
            <span className="text-sm text-gray-400">4 of 5</span>
          </div>

          {/* Content */}
          <div className="px-6 pt-10">
            {/* Headline + subtext */}
            <div className="text-2xl font-medium text-gray-800">
              Tell us about yourself
            </div>
            <div className="mt-2 text-base text-gray-500">
              This helps us estimate your daily needs.
            </div>

            {/* Sex selection */}
            <div className="mt-8">
              <div className="mb-2 text-sm text-gray-500">Sex</div>
              <div className="flex gap-3">
                {/* Male — selected (dark fill) */}
                <div className="flex-1 h-12 rounded-md bg-gray-800 border border-gray-800 flex items-center justify-center text-sm text-white">
                  Male
                </div>
                {/* Female — outlined */}
                <div className="flex-1 h-12 rounded-md border border-gray-300 flex items-center justify-center text-sm text-gray-600">
                  Female
                </div>
              </div>
            </div>

            {/* Height */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">Height</span>
                <span className="text-sm text-gray-400">cm / ft</span>
              </div>
              <div className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 flex items-center text-sm text-gray-400">
                175
              </div>
            </div>

            {/* Weight */}
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">Weight</span>
                <span className="text-sm text-gray-400">kg / lb</span>
              </div>
              <div className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 flex items-center text-sm text-gray-400">
                70
              </div>
            </div>

            {/* Primary CTA — full width, dark fill */}
            <div className="mt-8 h-12 w-full rounded-md bg-gray-800 border border-gray-800 flex items-center justify-center text-sm text-white">
              Continue
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
