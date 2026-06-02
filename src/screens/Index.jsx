import { Link } from 'react-router-dom'
import AppPrototype from './AppPrototype'

/**
 * Index — the dev entry page at `/`. A minimal directory linking to the
 * design-system showcase and each app screen, plus the unified interactive
 * prototype housed in its own isolated block. Plain, low-chrome scaffolding.
 */

const screens = [
  { label: 'Onboarding Flow', to: '/screens/onboarding' },
  { label: 'Scan Flow', to: '/screens/scan-flow' },
  { label: 'Recipe Flow', to: '/screens/recipe-flow' },
]

function NavGroup({ title, children }) {
  return (
    <section className="mt-10">
      <div className="font-numbers text-caption text-text-secondary uppercase tracking-wide border-b border-border pb-2 mb-4">
        {title}
      </div>
      {children}
    </section>
  )
}

export default function Index() {
  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-[480px] px-6 py-16">
        <h1 className="font-default font-medium text-display text-text-primary">
          Rieccal
        </h1>
        <p className="mt-3 text-body text-text-secondary">
          Balanced, not restricted.
        </p>

        {/* ── Interactive Prototype ──────────────────────────────────────
            A dedicated, self-contained block that houses + isolates the
            entire click-through prototype (onboarding → home → scan → live
            results → recipes → recipe detail). State lives inside <AppPrototype/>;
            nothing here leaks into the directory below. */}
        <section className="mt-10">
          <div className="font-numbers text-caption text-text-secondary uppercase tracking-wide border-b border-border pb-2 mb-3">
            Interactive Prototype
          </div>
          <p className="text-body text-text-secondary mb-6">
            One connected flow — tap through it: onboarding → home → scan →
            analyzing → live results → back home → Recipes tab → recipe detail.
          </p>
          <div className="rounded-3xl border border-border bg-neutral-200/50 p-5 sm:p-6 flex justify-center overflow-x-auto">
            <AppPrototype />
          </div>
        </section>

        <NavGroup title="Design System">
          <Link
            to="/design-system"
            className="block text-body-l text-accent-primary hover:underline"
          >
            Design System
          </Link>
        </NavGroup>

        <NavGroup title="Wireframes">
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                to="/wireframes/onboarding"
                className="text-body-l text-text-primary hover:text-accent-primary transition-colors"
              >
                Onboarding Flow
              </Link>
            </li>
            <li>
              <Link
                to="/wireframes/scan-flow"
                className="text-body-l text-text-primary hover:text-accent-primary transition-colors"
              >
                Scan Flow
              </Link>
            </li>
            <li>
              <Link
                to="/wireframes/recipe-flow"
                className="text-body-l text-text-primary hover:text-accent-primary transition-colors"
              >
                Recipe Flow
              </Link>
            </li>
          </ul>
        </NavGroup>

        <NavGroup title="Screens">
          <ul className="flex flex-col gap-3">
            {screens.map((s) =>
              s.soon ? (
                <li key={s.to}>
                  <span className="text-body-l text-text-secondary opacity-60">
                    {s.label} · coming soon
                  </span>
                </li>
              ) : (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="text-body-l text-text-primary hover:text-accent-primary transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </NavGroup>
      </div>
    </div>
  )
}
