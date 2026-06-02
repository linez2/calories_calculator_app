import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * WFOnboardingPrototype — a clickable click-through of the 5 onboarding
 * wireframes. A single useState(step) drives which screen layout renders.
 * The primary CTA on each step advances; the top-bar back button goes back
 * (hidden on step 1); step 5's CTA loops back to step 1. Wireframe style
 * only — no real form logic.
 */

const TOTAL = 5

// Shared controls -----------------------------------------------------------
function Cta({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-12 w-full rounded-md bg-gray-800 border border-gray-800 flex items-center justify-center text-sm text-white"
    >
      {children}
    </button>
  )
}

function Outline({ children }) {
  return (
    <div className="h-12 w-full rounded-md border border-gray-300 flex items-center justify-center text-sm text-gray-600">
      {children}
    </div>
  )
}

// Step layouts (frame chrome — status bar, top bar — is shared below) -------
function Step1({ onNext }) {
  return (
    <div className="flex flex-col h-full">
      <div className="h-1/2 shrink-0 p-4">
        <div className="w-full h-full rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-500">
          Illustration / Hero Visual
        </div>
      </div>
      <div className="flex-1 px-6 flex flex-col">
        <div className="mt-6 text-center">
          <div className="text-2xl font-medium text-gray-800">rieccal</div>
          <div className="mt-2 text-base text-gray-500">
            A calm space for your daily energy balance.
          </div>
        </div>
        <div className="mt-8">
          <Cta onClick={onNext}>Get started</Cta>
        </div>
        <div className="mt-3">
          <Outline>I already have an account</Outline>
        </div>
        <div className="mt-4 text-center text-[10px] text-gray-400">
          By continuing you agree to our Terms &amp; Privacy
        </div>
      </div>
    </div>
  )
}

function Step2({ onNext }) {
  return (
    <div className="px-6 pt-10">
      <div className="text-2xl font-medium text-gray-800">
        What&apos;s your email?
      </div>
      <div className="mt-2 text-base text-gray-500">
        We&apos;ll keep your data safe.
      </div>
      <div className="mt-8 h-12 w-full rounded-md border border-gray-300 px-4 flex items-center text-sm text-gray-400">
        your@email.com
      </div>
      <div className="mt-4">
        <Cta onClick={onNext}>Continue</Cta>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <div className="mt-3">
        <Outline>Continue with Apple</Outline>
      </div>
      <div className="mt-3">
        <Outline>Continue with Google</Outline>
      </div>
    </div>
  )
}

function Step3({ onNext }) {
  return (
    <div className="px-6 pt-10">
      <div className="text-2xl font-medium text-gray-800">Check your inbox</div>
      <div className="mt-2 text-base text-gray-500">
        We sent a 6-digit code to your@email.com
      </div>
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
      <div className="mt-8">
        <Cta onClick={onNext}>Verify</Cta>
      </div>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-400">Didn&apos;t get it? </span>
        <span className="text-sm text-gray-700 underline">Resend</span>
      </div>
    </div>
  )
}

function Step4({ onNext }) {
  return (
    <div className="px-6 pt-10">
      <div className="text-2xl font-medium text-gray-800">
        Tell us about yourself
      </div>
      <div className="mt-2 text-base text-gray-500">
        This helps us estimate your daily needs.
      </div>
      <div className="mt-8">
        <div className="mb-2 text-sm text-gray-500">Sex</div>
        <div className="flex gap-3">
          <div className="flex-1 h-12 rounded-md bg-gray-800 border border-gray-800 flex items-center justify-center text-sm text-white">
            Male
          </div>
          <div className="flex-1 h-12 rounded-md border border-gray-300 flex items-center justify-center text-sm text-gray-600">
            Female
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-500">Height</span>
          <span className="text-sm text-gray-400">cm / ft</span>
        </div>
        <div className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 flex items-center text-sm text-gray-400">
          175
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-500">Weight</span>
          <span className="text-sm text-gray-400">kg / lb</span>
        </div>
        <div className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 flex items-center text-sm text-gray-400">
          70
        </div>
      </div>
      <div className="mt-8">
        <Cta onClick={onNext}>Continue</Cta>
      </div>
    </div>
  )
}

const goals = ['Lose weight', 'Gain muscle', 'Stay balanced', 'Just eat better']

function Step5({ onNext }) {
  return (
    <div className="px-6 pt-10">
      <div className="text-2xl font-medium text-gray-800">
        What&apos;s your goal?
      </div>
      <div className="mt-2 text-base text-gray-500">
        We&apos;ll build a calm plan around it.
      </div>
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
      <div className="mt-6">
        <Cta onClick={onNext}>Get started</Cta>
      </div>
      <div className="mt-3 text-center text-sm text-gray-400 underline">
        I&apos;ll decide later
      </div>
    </div>
  )
}

const STEPS = { 1: Step1, 2: Step2, 3: Step3, 4: Step4, 5: Step5 }

export default function WFOnboardingPrototype() {
  const [step, setStep] = useState(1)

  // Advance; step 5 loops back to the start.
  const next = () => setStep(step >= TOTAL ? 1 : step + 1)
  const back = () => setStep(step > 1 ? step - 1 : 1)

  const Current = STEPS[step]

  return (
    <div className="min-h-full bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-[375px]">
        {/* Label + exit */}
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-xs text-gray-500">
            Onboarding — Interactive Prototype
          </span>
          <Link
            to="/wireframes/onboarding"
            className="font-mono text-xs text-gray-400 underline"
          >
            exit
          </Link>
        </div>

        {/* Mobile frame */}
        <div className="w-[375px] h-[760px] bg-white border border-gray-300 rounded-sm overflow-hidden flex flex-col">
          {/* Status bar placeholder */}
          <div className="h-6 shrink-0 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-3 font-mono text-[10px] text-gray-500">
            <span>9:41</span>
            <span>●●● WiFi Battery</span>
          </div>

          {/* Top bar — back (hidden on step 1) + live step indicator */}
          <div className="h-12 shrink-0 flex items-center justify-between px-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={back}
                className="w-9 h-9 rounded-md border border-gray-300 flex items-center justify-center text-sm text-gray-600"
              >
                &lt;
              </button>
            ) : (
              <div className="w-9 h-9" />
            )}
            <span className="text-sm text-gray-400">
              {step} of {TOTAL}
            </span>
          </div>

          {/* Current step */}
          <div className="flex-1 overflow-auto">
            <Current onNext={next} />
          </div>
        </div>
      </div>
    </div>
  )
}
