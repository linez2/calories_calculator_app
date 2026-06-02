import { ChevronLeft } from 'lucide-react'

/**
 * WFOnboarding2 — wireframe for onboarding screen 2: email entry.
 *
 * Structure only, no brand colors. Same 375px mobile frame as screen 1:
 * status bar, a back/step top bar, then the email form and social CTAs.
 */
export default function WFOnboarding2() {
  return (
    <div className="min-h-full bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-[375px]">
        {/* Screen label */}
        <div className="mb-2 font-mono text-xs text-gray-500">
          Onboarding — Email (2 of 5)
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
            <span className="text-sm text-gray-400">2 of 5</span>
          </div>

          {/* Content */}
          <div className="px-6 pt-10">
            {/* Headline + subtext */}
            <div className="text-2xl font-medium text-gray-800">
              What&apos;s your email?
            </div>
            <div className="mt-2 text-base text-gray-500">
              We&apos;ll keep your data safe.
            </div>

            {/* Email input */}
            <div className="mt-8 h-12 w-full rounded-md border border-gray-300 px-4 flex items-center text-sm text-gray-400">
              your@email.com
            </div>

            {/* Primary CTA — full width, dark fill */}
            <div className="mt-4 h-12 w-full rounded-md bg-gray-800 border border-gray-800 flex items-center justify-center text-sm text-white">
              Continue
            </div>

            {/* Divider — or */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social CTAs — outlined */}
            <div className="mt-3 h-12 w-full rounded-md border border-gray-300 flex items-center justify-center text-sm text-gray-600">
              Continue with Apple
            </div>
            <div className="mt-3 h-12 w-full rounded-md border border-gray-300 flex items-center justify-center text-sm text-gray-600">
              Continue with Google
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
