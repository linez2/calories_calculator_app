import {
  Search,
  Scan,
  Leaf,
  Home,
  User,
  Calendar,
  Bookmark,
  Heart,
  MessageSquare,
  Coffee,
  Sun,
  Plus,
  Square,
} from 'lucide-react'
import Button from '../components/Button'
import Tag from '../components/Tag'
import FilterChip from '../components/FilterChip'
import Input from '../components/Input'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import CalorieRing from '../components/CalorieRing'
import BottomNavigation from '../components/BottomNavigation'
import NavItem from '../components/NavItem'
import TopAppBar from '../components/TopAppBar'
import MacroBar from '../components/MacroBar'
import MealListItem from '../components/MealListItem'
import MealList from '../components/MealList'
import SearchBar from '../components/SearchBar'
import Toast from '../components/Toast'

const orangeRamp = [
  { step: 50, hex: '#FFF7EC' },
  { step: 100, hex: '#FFEDD3' },
  { step: 200, hex: '#FFD7A5' },
  { step: 300, hex: '#FFBA6D' },
  { step: 400, hex: '#FF9232' },
  { step: 500, hex: '#FF730A' },
  { step: 600, hex: '#FF5C00' },
  { step: 700, hex: '#CC4102' },
  { step: 800, hex: '#A1330B' },
  { step: 900, hex: '#822C0C' },
  { step: 950, hex: '#461404' },
]

const neutralRamp = [
  { step: 50, hex: '#FAFAFA' },
  { step: 100, hex: '#F4F4F5' },
  { step: 200, hex: '#E5E4E7' },
  { step: 300, hex: '#D5D4D8' },
  { step: 400, hex: '#A3A0AB' },
  { step: 500, hex: '#73707B' },
  { step: 600, hex: '#54515C' },
  { step: 700, hex: '#403E47' },
  { step: 800, hex: '#28272A' },
  { step: 900, hex: '#1C1B1F' },
  { step: 950, hex: '#0A090B' },
]

const sageRamp = [
  { step: 50, hex: '#F5F6F0' },
  { step: 100, hex: '#E6E9DB' },
  { step: 200, hex: '#D0D4BB' },
  { step: 300, hex: '#B4BA93' },
  { step: 400, hex: '#A4AB7D' },
  { step: 500, hex: '#878E5C' },
  { step: 600, hex: '#70754A' },
  { step: 700, hex: '#5B5D3C' },
  { step: 800, hex: '#4D4E35' },
  { step: 900, hex: '#444431' },
  { step: 950, hex: '#252519' },
]

const semantic = [
  { name: 'background', hex: '#F2F1ED' },
  { name: 'surface', hex: '#FAFAF7' },
  { name: 'border', hex: '#E5E4E0' },
  { name: 'text-primary', hex: '#1C1B1F' },
  { name: 'text-secondary', hex: '#6B7368' },
  { name: 'accent-primary', hex: '#FF9232' },
  { name: 'accent-secondary', hex: '#A4AB7D' },
]

const adjectives = ['warm', 'restrained', 'precise', 'honest', 'calm']

const icons = [
  Search,
  Scan,
  Leaf,
  Home,
  User,
  Calendar,
  Bookmark,
  Heart,
  MessageSquare,
  Coffee,
  Sun,
  Plus,
]

const spacingScale = [4, 8, 12, 16, 24, 32, 48, 64]

const voiceLines = [
  'Lunch logged.',
  'Today: 1,850 kcal.',
  'A lighter breakfast might help.',
  'Balanced, not restricted.',
]

function Section({ title, children }) {
  return (
    <section className="py-12 border-t border-border first:border-t-0">
      <h2 className="text-h2 text-text-primary mb-6">{title}</h2>
      {children}
    </section>
  )
}

function Swatch({ step, hex }) {
  return (
    <div className="flex flex-col items-start">
      <div
        className="w-14 h-14 rounded-sm border border-border"
        style={{ backgroundColor: hex }}
      />
      <div className="mt-2 font-numbers text-caption text-text-secondary leading-tight">
        <div>{step}</div>
        <div>{hex}</div>
      </div>
    </div>
  )
}

function Ramp({ name, ramp }) {
  return (
    <div className="mb-8">
      <div className="text-body text-text-secondary mb-3">{name}</div>
      <div className="flex flex-wrap gap-2">
        {ramp.map((s) => (
          <Swatch key={s.step} step={s.step} hex={s.hex} />
        ))}
      </div>
    </div>
  )
}

function TypeRow({ sample, spec, className = '', mono = false }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-3 border-b border-border last:border-b-0">
      <div className={`${mono ? 'font-numbers' : 'font-default'} ${className}`}>
        {sample}
      </div>
      <div className="font-numbers text-caption text-text-secondary whitespace-nowrap">
        {spec}
      </div>
    </div>
  )
}

export default function DesignSystem() {
  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-[720px] px-6 py-16">

        {/* ===== Foundations ===== */}
        <div className="font-numbers text-caption text-text-secondary uppercase tracking-wide border-b border-border pb-2 mb-8 mt-16">
          Foundations
        </div>

        <Section title="Brand">
          <div className="font-default font-medium text-display text-text-primary">
            Rieccal
          </div>
          <p className="mt-4 text-body-l text-text-secondary max-w-[520px]">
            A calm space for your daily energy balance. No pressure, no
            restrictions.
          </p>
          <p className="mt-6 text-body text-accent-primary">
            Balanced, not restricted.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {adjectives.map((adj) => (
              <span
                key={adj}
                className="text-caption text-text-secondary border border-border rounded-sm px-2 py-1 bg-surface"
              >
                {adj}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Voice">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {voiceLines.map((line) => (
              <div
                key={line}
                className="bg-surface rounded-md p-4 border-l-2 border-accent-primary text-body text-text-primary"
              >
                {line}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Colors">
          <Ramp name="Orange" ramp={orangeRamp} />
          <Ramp name="Neutral" ramp={neutralRamp} />
          <Ramp name="Sage" ramp={sageRamp} />

          <div className="mt-4">
            <div className="text-body text-text-secondary mb-3">Semantic</div>
            <div className="flex flex-wrap gap-2">
              {semantic.map((s) => (
                <div key={s.name} className="flex flex-col items-start">
                  <div
                    className="w-14 h-14 rounded-sm border border-border"
                    style={{ backgroundColor: s.hex }}
                  />
                  <div className="mt-2 font-numbers text-caption text-text-secondary leading-tight max-w-[80px]">
                    <div className="font-default text-text-primary">
                      {s.name}
                    </div>
                    <div>{s.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Typography">
          <TypeRow
            sample="Balanced eating"
            spec="display · 40 / 1.1 / 500"
            className="text-display text-text-primary"
          />
          <TypeRow
            sample="Today's meals"
            spec="h1 · 28 / 1.2 / 500"
            className="text-h1 text-text-primary"
          />
          <TypeRow
            sample="Recipes for you"
            spec="h2 · 22 / 1.25 / 500"
            className="text-h2 text-text-primary"
          />
          <TypeRow
            sample="Nutrient breakdown"
            spec="h3 · 18 / 1.35 / 500"
            className="text-h3 text-text-primary"
          />
          <TypeRow
            sample="A short paragraph showing how body copy reads."
            spec="body-l · 16 / 1.5 / 400"
            className="text-body-l text-text-primary"
          />
          <TypeRow
            sample="Secondary body text."
            spec="body · 14 / 1.5 / 400"
            className="text-body text-text-primary"
          />
          <TypeRow
            sample="Helper text and labels"
            spec="caption · 12 / 1.4 / 400"
            className="text-caption text-text-secondary"
          />
          <TypeRow
            sample="1,850"
            spec="num-l · Mono · 32 / 1.1 / 500"
            className="text-num-l text-text-primary"
            mono
          />
        </Section>

        <Section title="Iconography">
          <div className="grid grid-cols-6 gap-4">
            {icons.map((Icon, i) => (
              <div
                key={`lg-${i}`}
                className="flex items-center justify-center h-14 bg-surface border border-border rounded-sm"
              >
                <Icon size={24} strokeWidth={1.5} className="text-text-primary" />
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-6 gap-4">
            {icons.map((Icon, i) => (
              <div
                key={`sm-${i}`}
                className="flex items-center justify-center h-10 bg-surface border border-border rounded-sm"
              >
                <Icon size={16} strokeWidth={1.5} className="text-text-primary" />
              </div>
            ))}
          </div>
          <p className="mt-4 font-numbers text-caption text-text-secondary">
            Lucide React · 24px and 16px · line, rounded caps
          </p>
        </Section>

        <Section title="Spacing">
          <div className="flex flex-col gap-3">
            {spacingScale.map((px) => (
              <div key={px} className="flex items-center gap-4">
                <div className="w-12 font-numbers text-caption text-text-secondary text-right">
                  {px}px
                </div>
                <div
                  className="h-3 bg-accent-primary rounded-sm"
                  style={{ width: `${px}px` }}
                />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Radius">
          <div className="flex gap-6">
            <div className="flex flex-col items-start">
              <div className="w-20 h-20 bg-surface border border-border rounded-sm" />
              <div className="mt-2 font-numbers text-caption text-text-secondary">
                sm 4px
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="w-20 h-20 bg-surface border border-border rounded-md" />
              <div className="mt-2 font-numbers text-caption text-text-secondary">
                md 6px
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="w-20 h-20 bg-surface border border-border rounded-lg" />
              <div className="mt-2 font-numbers text-caption text-text-secondary">
                lg 12px
              </div>
            </div>
          </div>
        </Section>

        {/* ===== Basic Components ===== */}
        <div className="font-numbers text-caption text-text-secondary uppercase tracking-wide border-b border-border pb-2 mb-8 mt-16">
          Basic Components
        </div>

        <Section title="Components — Buttons">
          {/* Button variants */}
          <div className="mb-12">
            <div className="text-body text-text-secondary mb-4">Variants</div>
            <div className="flex flex-wrap items-center gap-5">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="icon" leadingIcon={Plus} aria-label="Add" />
            </div>
          </div>

          {/* Button sizes */}
          <div className="mb-12">
            <div className="text-body text-text-secondary mb-4">Sizes</div>
            <div className="flex flex-wrap items-end gap-8">
              <div className="flex flex-col items-start gap-3">
                <Button variant="primary" size="small">
                  Placeholder
                </Button>
                <span className="font-numbers text-caption text-text-secondary">
                  small
                </span>
              </div>
              <div className="flex flex-col items-start gap-3">
                <Button variant="primary" size="default">
                  Placeholder
                </Button>
                <span className="font-numbers text-caption text-text-secondary">
                  default
                </span>
              </div>
              <div className="flex flex-col items-start gap-3">
                <Button variant="primary" size="large">
                  Placeholder
                </Button>
                <span className="font-numbers text-caption text-text-secondary">
                  large
                </span>
              </div>
            </div>
          </div>

          {/* Button states — four variants × default / pressed / disabled.
              Each row is its own grid with the same column template so the
              border-t dividers can run continuously across all four columns. */}
          <div className="mb-12">
            <div className="text-body text-text-secondary mb-4">States</div>
            <div className="flex flex-col">
              {/* Column headers — sit above the first divider, no border */}
              <div className="grid grid-cols-[120px_repeat(3,1fr)] gap-x-8 items-center pb-3">
                <div></div>
                <div className="font-numbers text-caption text-text-secondary">
                  default
                </div>
                <div className="font-numbers text-caption text-text-secondary">
                  pressed
                </div>
                <div className="font-numbers text-caption text-text-secondary">
                  disabled
                </div>
              </div>

              {/* Primary */}
              <div className="grid grid-cols-[120px_repeat(3,1fr)] gap-x-8 items-center py-6 border-t border-border">
                <div className="font-numbers text-caption text-text-secondary">
                  primary
                </div>
                <div className="justify-self-start">
                  <Button
                    variant="primary"
                    leadingIcon={Square}
                    trailingIcon={Square}
                  >
                    Placeholder
                  </Button>
                </div>
                <div className="justify-self-start">
                  <Button
                    variant="primary"
                    leadingIcon={Square}
                    trailingIcon={Square}
                    pressed
                  >
                    Placeholder
                  </Button>
                </div>
                <div className="justify-self-start">
                  <Button
                    variant="primary"
                    leadingIcon={Square}
                    trailingIcon={Square}
                    disabled
                  >
                    Placeholder
                  </Button>
                </div>
              </div>

              {/* Secondary */}
              <div className="grid grid-cols-[120px_repeat(3,1fr)] gap-x-8 items-center py-6 border-t border-border">
                <div className="font-numbers text-caption text-text-secondary">
                  secondary
                </div>
                <div className="justify-self-start">
                  <Button
                    variant="secondary"
                    leadingIcon={Square}
                    trailingIcon={Square}
                  >
                    Placeholder
                  </Button>
                </div>
                <div className="justify-self-start">
                  <Button
                    variant="secondary"
                    leadingIcon={Square}
                    trailingIcon={Square}
                    pressed
                  >
                    Placeholder
                  </Button>
                </div>
                <div className="justify-self-start">
                  <Button
                    variant="secondary"
                    leadingIcon={Square}
                    trailingIcon={Square}
                    disabled
                  >
                    Placeholder
                  </Button>
                </div>
              </div>

              {/* Ghost */}
              <div className="grid grid-cols-[120px_repeat(3,1fr)] gap-x-8 items-center py-6 border-t border-border">
                <div className="font-numbers text-caption text-text-secondary">
                  ghost
                </div>
                <div className="justify-self-start">
                  <Button
                    variant="ghost"
                    leadingIcon={Square}
                    trailingIcon={Square}
                  >
                    Placeholder
                  </Button>
                </div>
                <div className="justify-self-start">
                  <Button
                    variant="ghost"
                    leadingIcon={Square}
                    trailingIcon={Square}
                    pressed
                  >
                    Placeholder
                  </Button>
                </div>
                <div className="justify-self-start">
                  <Button
                    variant="ghost"
                    leadingIcon={Square}
                    trailingIcon={Square}
                    disabled
                  >
                    Placeholder
                  </Button>
                </div>
              </div>

              {/* Icon — stays icon-only, Square centered */}
              <div className="grid grid-cols-[120px_repeat(3,1fr)] gap-x-8 items-center py-6 border-t border-border">
                <div className="font-numbers text-caption text-text-secondary">
                  icon
                </div>
                <div className="justify-self-start">
                  <Button
                    variant="icon"
                    leadingIcon={Square}
                    aria-label="Placeholder"
                  />
                </div>
                <div className="justify-self-start">
                  <Button
                    variant="icon"
                    leadingIcon={Square}
                    pressed
                    aria-label="Placeholder"
                  />
                </div>
                <div className="justify-self-start">
                  <Button
                    variant="icon"
                    leadingIcon={Square}
                    disabled
                    aria-label="Placeholder"
                  />
                </div>
              </div>
            </div>
          </div>

        </Section>

        <Section title="Components — Tags">
          {/* Plain — no dot, no icon */}
          <div className="mb-8">
            <div className="text-body text-text-secondary mb-3">Plain</div>
            <div className="flex flex-wrap items-center gap-2">
              <Tag variant="orange">Placeholder</Tag>
              <Tag variant="sage">Placeholder</Tag>
              <Tag variant="neutral">Placeholder</Tag>
            </div>
          </div>

          {/* Leading icon only */}
          <div className="mb-8">
            <div className="text-body text-text-secondary mb-3">Leading</div>
            <div className="flex flex-wrap items-center gap-2">
              <Tag variant="orange" leadingIcon={Square}>
                Placeholder
              </Tag>
              <Tag variant="sage" leadingIcon={Square}>
                Placeholder
              </Tag>
              <Tag variant="neutral" leadingIcon={Square}>
                Placeholder
              </Tag>
            </div>
          </div>

          {/* Trailing icon only */}
          <div className="mb-8">
            <div className="text-body text-text-secondary mb-3">Trailing</div>
            <div className="flex flex-wrap items-center gap-2">
              <Tag variant="orange" trailingIcon={Square}>
                Placeholder
              </Tag>
              <Tag variant="sage" trailingIcon={Square}>
                Placeholder
              </Tag>
              <Tag variant="neutral" trailingIcon={Square}>
                Placeholder
              </Tag>
            </div>
          </div>

          {/* Both leading and trailing icons */}
          <div>
            <div className="text-body text-text-secondary mb-3">Both</div>
            <div className="flex flex-wrap items-center gap-2">
              <Tag
                variant="orange"
                leadingIcon={Square}
                trailingIcon={Square}
              >
                Placeholder
              </Tag>
              <Tag
                variant="sage"
                leadingIcon={Square}
                trailingIcon={Square}
              >
                Placeholder
              </Tag>
              <Tag
                variant="neutral"
                leadingIcon={Square}
                trailingIcon={Square}
              >
                Placeholder
              </Tag>
            </div>
          </div>
        </Section>

        <Section title="Components — Filter Chip">
          <div className="w-[375px] flex flex-col gap-8">
            {/* Unselected */}
            <div className="flex flex-col gap-3">
              <div className="text-body text-text-secondary">Unselected</div>
              <div className="flex flex-wrap items-center gap-2">
                <FilterChip
                  variant="orange"
                  leadingIcon={<Square />}
                  label="Placeholder"
                  selected={false}
                  onClick={() => {}}
                />
                <FilterChip
                  variant="sage"
                  leadingIcon={<Square />}
                  label="Placeholder"
                  selected={false}
                  onClick={() => {}}
                />
              </div>
            </div>

            {/* Selected */}
            <div className="flex flex-col gap-3">
              <div className="text-body text-text-secondary">Selected</div>
              <div className="flex flex-wrap items-center gap-2">
                <FilterChip
                  variant="orange"
                  leadingIcon={<Square />}
                  label="Placeholder"
                  selected
                  onClick={() => {}}
                />
                <FilterChip
                  variant="sage"
                  leadingIcon={<Square />}
                  label="Placeholder"
                  selected
                  onClick={() => {}}
                />
              </div>
            </div>

            {/* Both icons */}
            <div className="flex flex-col gap-3">
              <div className="text-body text-text-secondary">Both icons</div>
              <div className="flex flex-wrap items-center gap-2">
                <FilterChip
                  variant="orange"
                  leadingIcon={<Square />}
                  trailingIcon={<Square />}
                  label="Placeholder"
                  selected={false}
                  onClick={() => {}}
                />
                <FilterChip
                  variant="sage"
                  leadingIcon={<Square />}
                  trailingIcon={<Square />}
                  label="Placeholder"
                  selected
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Components — Inputs">
          <div className="flex flex-col gap-6 max-w-[420px]">

            {/* default */}
            <div className="flex flex-col gap-2">
              <span className="font-numbers text-caption text-text-secondary">
                default
              </span>
              <Input
                placeholder="Placeholder"
                leadingIcon={Square}
                trailingIcon={Square}
              />
            </div>

            {/* focus (static) */}
            <div className="flex flex-col gap-2">
              <span className="font-numbers text-caption text-text-secondary">
                focus
              </span>
              <Input
                placeholder="Placeholder"
                leadingIcon={Square}
                trailingIcon={Square}
                forceFocus
              />
            </div>

            {/* filled */}
            <div className="flex flex-col gap-2">
              <span className="font-numbers text-caption text-text-secondary">
                filled
              </span>
              <Input
                defaultValue="Placeholder"
                leadingIcon={Square}
                trailingIcon={Square}
              />
            </div>

            {/* disabled */}
            <div className="flex flex-col gap-2">
              <span className="font-numbers text-caption text-text-secondary">
                disabled
              </span>
              <Input
                defaultValue="Placeholder"
                leadingIcon={Square}
                trailingIcon={Square}
                disabled
              />
            </div>

            {/* error — border only; messages are owned at the form level */}
            <div className="flex flex-col gap-2">
              <span className="font-numbers text-caption text-text-secondary">
                error
              </span>
              <Input
                defaultValue="Placeholder"
                leadingIcon={Square}
                trailingIcon={Square}
                error
              />
            </div>

          </div>
        </Section>

        <Section title="Components — Cards">
          <div className="flex flex-col gap-3 max-w-[480px]">
            <Card className="w-full">
              <div className="border border-dashed border-border rounded-sm flex items-center justify-center h-32 font-numbers text-caption text-text-secondary">
                Flexible container
              </div>
            </Card>
            <p className="text-caption text-text-secondary">
              Card is a surface primitive. Content is defined by composite
              components.
            </p>
          </div>
        </Section>

        <Section title="Components — Progress">
          {/* Horizontal */}
          <div className="mb-12">
            <div className="text-body text-text-secondary mb-4">Horizontal</div>
            <div className="flex flex-col gap-6 max-w-[420px]">
              <div className="flex flex-col gap-2">
                <ProgressBar value={35} variant="orange" size="default" />
                <span className="font-numbers text-caption text-text-secondary">
                  default · orange
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <ProgressBar value={35} variant="orange" size="small" />
                <span className="font-numbers text-caption text-text-secondary">
                  small · orange
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <ProgressBar value={35} variant="sage" size="default" />
                <span className="font-numbers text-caption text-text-secondary">
                  default · sage
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <ProgressBar value={35} variant="sage" size="small" />
                <span className="font-numbers text-caption text-text-secondary">
                  small · sage
                </span>
              </div>
            </div>
          </div>

          {/* Vertical */}
          <div>
            <div className="text-body text-text-secondary mb-4">Vertical</div>
            <div className="grid grid-cols-4 gap-x-6 gap-y-3 items-end justify-items-center max-w-[480px]">
              <ProgressBar
                value={35}
                variant="orange"
                size="default"
                orientation="vertical"
              />
              <ProgressBar
                value={35}
                variant="orange"
                size="small"
                orientation="vertical"
              />
              <ProgressBar
                value={35}
                variant="sage"
                size="default"
                orientation="vertical"
              />
              <ProgressBar
                value={35}
                variant="sage"
                size="small"
                orientation="vertical"
              />

              <span className="font-numbers text-caption text-text-secondary text-center">
                default · orange
              </span>
              <span className="font-numbers text-caption text-text-secondary text-center">
                small · orange
              </span>
              <span className="font-numbers text-caption text-text-secondary text-center">
                default · sage
              </span>
              <span className="font-numbers text-caption text-text-secondary text-center">
                small · sage
              </span>
            </div>
          </div>
        </Section>

        <Section title="Components — NavItem">
          <div className="flex items-start gap-12">
            <div className="flex flex-col items-center gap-3">
              <NavItem icon={<Square />} label="Placeholder" active />
              <span className="font-numbers text-caption text-text-secondary">
                active
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <NavItem icon={<Square />} label="Placeholder" active={false} />
              <span className="font-numbers text-caption text-text-secondary">
                inactive
              </span>
            </div>
          </div>
        </Section>

        <Section title="Components — Top App Bar">
          <div className="flex flex-col gap-8">
            {/* Title only */}
            <div className="flex flex-col gap-3">
              <div className="w-[375px]">
                <TopAppBar title="Placeholder" />
              </div>
              <span className="font-numbers text-caption text-text-secondary">
                title only
              </span>
            </div>

            {/* Title + back */}
            <div className="flex flex-col gap-3">
              <div className="w-[375px]">
                <TopAppBar title="Placeholder" showBack onBack={() => {}} />
              </div>
              <span className="font-numbers text-caption text-text-secondary">
                with back
              </span>
            </div>

            {/* Title + back + right action */}
            <div className="flex flex-col gap-3">
              <div className="w-[375px]">
                <TopAppBar
                  title="Placeholder"
                  showBack
                  onBack={() => {}}
                  rightAction={
                    <button
                      type="button"
                      aria-label="Action"
                      className="w-11 h-11 flex items-center justify-center text-text-primary transition-colors focus:outline-none focus-visible:text-accent-primary"
                    >
                      <Square size={24} strokeWidth={1.75} aria-hidden="true" />
                    </button>
                  }
                />
              </div>
              <span className="font-numbers text-caption text-text-secondary">
                with back + action
              </span>
            </div>
          </div>
        </Section>

        <Section title="Components — Calorie Ring">
          {/* Sizes — same value, current, total; only the size changes */}
          <div className="mb-12">
            <div className="text-body text-text-secondary mb-4">Sizes</div>
            <div className="flex flex-wrap items-end gap-10">
              <div className="flex flex-col items-center gap-3">
                <CalorieRing
                  value={65}
                  current={1234}
                  total={2200}
                  size="lg"
                />
                <span className="font-numbers text-caption text-text-secondary">
                  lg
                </span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <CalorieRing
                  value={65}
                  current={1234}
                  total={2200}
                  size="md"
                />
                <span className="font-numbers text-caption text-text-secondary">
                  md
                </span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <CalorieRing
                  value={65}
                  current={1234}
                  total={2200}
                  size="sm"
                />
                <span className="font-numbers text-caption text-text-secondary">
                  sm
                </span>
              </div>
            </div>
          </div>

          {/* Fill states — md only, arc-only (no center text) */}
          <div>
            <div className="text-body text-text-secondary mb-4">
              Fill states
            </div>
            <div className="flex flex-wrap items-end gap-6">
              {[0, 50, 100, 120].map((v) => (
                <div
                  key={v}
                  className="flex flex-col items-center gap-3"
                >
                  <CalorieRing value={v} size="md" />
                  <span className="font-numbers text-caption text-text-secondary">
                    {v > 100 ? `${v}%+` : `${v}%`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Components — Meal List Item">
          {/* One item per variant, each labeled. Left-aligned, ~375px. */}
          <div className="flex flex-col gap-8">
            {/* Full */}
            <div className="flex flex-col gap-2">
              <span className="font-numbers text-caption text-text-secondary">
                Full
              </span>
              <div className="w-[375px]">
                <MealListItem
                  thumbnail={
                    <Square
                      size={16}
                      strokeWidth={1.75}
                      className="text-text-secondary"
                      aria-hidden="true"
                    />
                  }
                  name="Placeholder"
                  description="Placeholder"
                  calories={'000'}
                  onClick={() => {}}
                />
              </div>
            </div>

            {/* No thumbnail */}
            <div className="flex flex-col gap-2">
              <span className="font-numbers text-caption text-text-secondary">
                No thumbnail
              </span>
              <div className="w-[375px]">
                <MealListItem
                  thumbnail={null}
                  name="Placeholder"
                  description="Placeholder"
                  calories={'000'}
                  onClick={() => {}}
                />
              </div>
            </div>

            {/* No description */}
            <div className="flex flex-col gap-2">
              <span className="font-numbers text-caption text-text-secondary">
                No description
              </span>
              <div className="w-[375px]">
                <MealListItem
                  thumbnail={
                    <Square
                      size={16}
                      strokeWidth={1.75}
                      className="text-text-secondary"
                      aria-hidden="true"
                    />
                  }
                  name="Placeholder"
                  calories={'000'}
                  onClick={() => {}}
                />
              </div>
            </div>

            {/* With photo (colored bg placeholder, no real image) */}
            <div className="flex flex-col gap-2">
              <span className="font-numbers text-caption text-text-secondary">
                With photo
              </span>
              <div className="w-[375px]">
                <MealListItem
                  thumbnail={
                    <div className="w-full h-full rounded-md bg-orange-100" />
                  }
                  name="Placeholder"
                  description="Placeholder"
                  calories={'000'}
                  onClick={() => {}}
                />
              </div>
            </div>

            {/* No calories */}
            <div className="flex flex-col gap-2">
              <span className="font-numbers text-caption text-text-secondary">
                No calories
              </span>
              <div className="w-[375px]">
                <MealListItem
                  thumbnail={
                    <Square
                      size={16}
                      strokeWidth={1.75}
                      className="text-text-secondary"
                      aria-hidden="true"
                    />
                  }
                  name="Placeholder"
                  description="Placeholder"
                  showCalories={false}
                  onClick={() => {}}
                />
              </div>
            </div>

            {/* Pressed */}
            <div className="flex flex-col gap-2">
              <span className="font-numbers text-caption text-text-secondary">
                Pressed
              </span>
              <div className="w-[375px]">
                <MealListItem
                  thumbnail={
                    <Square
                      size={16}
                      strokeWidth={1.75}
                      className="text-text-secondary"
                      aria-hidden="true"
                    />
                  }
                  name="Placeholder"
                  description="Placeholder"
                  calories={'000'}
                  forcePressed
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Components — Toast">
          <div className="w-[375px] flex flex-col gap-6 items-start">
            {/* default */}
            <div className="flex flex-col gap-2 items-start">
              <span className="font-numbers text-caption text-text-secondary">
                default
              </span>
              <Toast message="Placeholder" variant="default" />
            </div>

            {/* success */}
            <div className="flex flex-col gap-2 items-start">
              <span className="font-numbers text-caption text-text-secondary">
                success
              </span>
              <Toast message="Placeholder" variant="success" />
            </div>

            {/* warning */}
            <div className="flex flex-col gap-2 items-start">
              <span className="font-numbers text-caption text-text-secondary">
                warning
              </span>
              <Toast message="Placeholder" variant="warning" />
            </div>

            {/* error */}
            <div className="flex flex-col gap-2 items-start">
              <span className="font-numbers text-caption text-text-secondary">
                error
              </span>
              <Toast message="Placeholder" variant="error" />
            </div>
          </div>
        </Section>

        {/* ===== Advanced Components ===== */}
        <div className="font-numbers text-caption text-text-secondary uppercase tracking-wide border-b border-border pb-2 mb-8 mt-16">
          Advanced Components
        </div>

        <Section title="Components — Bottom Navigation">
          {/* Mock mobile frame — 375px wide, the typical iPhone width.
              Recipes tab shown active. Left-aligned to the showcase column. */}
          <div className="w-[375px]">
            <BottomNavigation activeTab="recipes" onTabChange={() => {}} />
          </div>
        </Section>

        <Section title="Components — Macro Bar">
          {/* Single MacroBar, left-aligned. ~60% fill (value/total = 60/100). */}
          <div className="w-[375px]">
            <MacroBar
              label="Placeholder"
              value={60}
              total={100}
              variant="protein"
              valueLabel="Placeholder"
            />
          </div>
        </Section>

        <Section title="Components — Meal List">
          {/* One titled list with three placeholder items. Left-aligned, ~375px. */}
          <div className="w-[375px]">
            <MealList
              title="Placeholder"
              totalCalories={'000'}
              items={[0, 1, 2].map(() => ({
                thumbnail: (
                  <Square
                    size={16}
                    strokeWidth={1.75}
                    className="text-text-secondary"
                    aria-hidden="true"
                  />
                ),
                name: 'Placeholder',
                description: 'Placeholder',
                calories: '000',
                onClick: () => {},
              }))}
            />
          </div>
        </Section>

        <Section title="Components — SearchBar">
          <div className="flex flex-col gap-8">
            {/* default */}
            <div className="flex flex-col gap-2">
              <span className="font-numbers text-caption text-text-secondary">
                default
              </span>
              <div className="w-[375px]">
                <SearchBar
                  label="Placeholder"
                  placeholder="Placeholder"
                  hint
                />
              </div>
            </div>

            {/* focus */}
            <div className="flex flex-col gap-2">
              <span className="font-numbers text-caption text-text-secondary">
                focus
              </span>
              <div className="w-[375px]">
                <SearchBar
                  label="Placeholder"
                  placeholder="Placeholder"
                  hint
                  forceFocus
                />
              </div>
            </div>

            {/* error */}
            <div className="flex flex-col gap-2">
              <span className="font-numbers text-caption text-text-secondary">
                error
              </span>
              <div className="w-[375px]">
                <SearchBar
                  label="Placeholder"
                  placeholder="Placeholder"
                  hint
                  error
                />
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  )
}
