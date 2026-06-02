import { ChevronLeft } from 'lucide-react'

/**
 * WFOnboarding3 — wireframe for onboarding screen 3: verification code.
 *
 * Structure only, no brand colors. Same 375px frame as screens 1–2: status
 * bar, back/step top bar, then a 6-digit code input and verify CTA.
 */
export default function WFOnboarding3() {
  return (
    <div className="min-h-full bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-[375px]">
        {/* Screen label */}
        <div className="mb-2 font-mono text-xs text-gray-500">
          Onboarding — Verify (3 of 5)
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
            <span className="text-sm text-gray-400">3 of 5</span>
          </div>

          {/* Content */}
          <div className="px-6 pt-10">
            {/* Headline + subtext */}
            <div className="text-2xl font-medium text-gray-800">
              Check your inbox
            </div>
            <div className="mt-2 text-base text-gray-500">
              We sent a 6-digit code to your@email.com
            </div>

            {/* Code input row — 6 boxes */}
            <div className="mt-10 flex gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-12 h-14 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center text-xl text-gray-400"
                >
                  ·
                </div>
              ))}
            </div>

            {/* Primary CTA — full width, dark fill */}
            <div className="mt-8 h-12 w-full rounded-md bg-gray-800 border border-gray-800 flex items-center justify-center text-sm text-white">
              Verify
            </div>

            {/* Resend row */}
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-400">Didn&apos;t get it? </span>
              <span className="text-sm text-gray-700 underline">Resend</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
