/**
 * WFOnboarding — wireframe for onboarding screen 1: the welcome screen.
 *
 * Structure only: no brand colors, no design tokens. One message, one primary
 * action. Rendered as a 375px mobile frame: a mock status bar, a hero visual
 * occupying the top half, then centered name/tagline and the CTAs.
 */
export default function WFOnboarding() {
  return (
    <div className="min-h-full bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-[375px]">
        {/* Screen label */}
        <div className="mb-2 font-mono text-xs text-gray-500">
          Onboarding — Welcome (1 of 5)
        </div>

        {/* Mobile frame */}
        <div className="w-[375px] h-[760px] bg-white border border-gray-300 rounded-sm overflow-hidden flex flex-col">
          {/* Status bar placeholder */}
          <div className="h-6 shrink-0 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-3 font-mono text-[10px] text-gray-500">
            <span>9:41</span>
            <span>●●● WiFi Battery</span>
          </div>

          {/* Hero area — top ~50% */}
          <div className="h-1/2 shrink-0 p-4">
            <div className="w-full h-full rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-500">
              Illustration / Hero Visual
            </div>
          </div>

          {/* Bottom content */}
          <div className="flex-1 px-6 flex flex-col">
            {/* App name + tagline */}
            <div className="mt-6 text-center">
              <div className="text-2xl font-medium text-gray-800">rieccal</div>
              <div className="mt-2 text-base text-gray-500">
                A calm space for your daily energy balance.
              </div>
            </div>

            {/* Primary CTA — full width, dark fill */}
            <div className="mt-8 h-12 w-full rounded-md bg-gray-800 border border-gray-800 flex items-center justify-center text-sm text-white">
              Get started
            </div>

            {/* Secondary ghost — full width, outline */}
            <div className="mt-3 h-12 w-full rounded-md border border-gray-300 flex items-center justify-center text-sm text-gray-600">
              I already have an account
            </div>

            {/* Terms caption */}
            <div className="mt-4 text-center text-[10px] text-gray-400">
              By continuing you agree to our Terms &amp; Privacy
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
