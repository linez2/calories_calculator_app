import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Bookmark, Clock, Flame, Users } from 'lucide-react'
import Tag from '../components/Tag'
import Button from '../components/Button'

/**
 * RecipeDetail — the pushed recipe screen (recipe flow, 2). Opened by tapping
 * "Lemon herb chicken" on Discovery; back returns there.
 *
 * Above the fold answers one question — is this worth cooking tonight? A
 * full-bleed hero with floating back/save, then the at-a-glance read: big
 * title, time/kcal/servings, recipe tags, and a four-up nutrition card. Below
 * sits the practical detail — a scannable Ingredients list and friendly
 * numbered Steps. One pinned "Start cooking" action; no bottom nav.
 *
 * Full design system. All numbers use IBM Plex Mono (font-numbers); sage marks
 * the food/recipe content (tags, ingredient bullets), orange carries the
 * calorie metric. Device frame matches the other screens.
 */

const HERO =
  'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=85'

const meta = [
  { Icon: Clock, text: '20 min' },
  { Icon: Flame, text: '420 kcal' },
  { Icon: Users, text: '2 servings' },
]

const tags = ['High protein', 'Gluten-free', 'Dinner']

const nutrition = [
  { value: '420', label: 'kcal', accent: true },
  { value: '35g', label: 'Protein' },
  { value: '12g', label: 'Carbs' },
  { value: '18g', label: 'Fat' },
]

const ingredients = [
  '2 chicken breasts',
  '1 lemon, juiced',
  '2 tbsp olive oil',
  '3 sprigs thyme',
  '2 garlic cloves',
  'Salt & pepper',
]

const steps = [
  'Pat the chicken dry and season both sides well.',
  'Warm the oil and sear the chicken until golden — about 5 minutes a side.',
  'Add the garlic and thyme, then pour over the lemon juice.',
  'Let it rest a couple of minutes before serving — that keeps it juicy.',
]

// iOS-style status bar, light theme (dark glyphs).
function StatusBar() {
  return (
    <div className="h-12 shrink-0 px-6 flex items-center justify-between bg-background">
      <span className="font-numbers text-caption font-medium text-text-primary">
        9:41
      </span>
      <div className="flex items-center gap-1.5 text-text-primary">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2" width="3" height="10" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
          <path d="M8 2.2C5.2 2.2 2.6 3.2 0.7 5L8 12 15.3 5C13.4 3.2 10.8 2.2 8 2.2z" />
        </svg>
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none" aria-hidden="true">
          <rect x="0.5" y="1" width="20" height="10" rx="2.5" stroke="currentColor" />
          <rect x="2" y="2.5" width="15" height="7" rx="1" fill="currentColor" />
          <rect x="22" y="4" width="1.5" height="4" rx="0.75" fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}

export default function RecipeDetail() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-neutral-200 flex items-center justify-center p-6">
      {/* Device frame */}
      <div className="relative w-[390px] h-[844px] rounded-[44px] border-[8px] border-neutral-800 shadow-2xl overflow-hidden bg-background flex flex-col">
        <StatusBar />

        {/* Scroll area */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {/* Hero — full-width photo (min 260px) with floating back + save */}
          <div className="relative w-full h-72 min-h-[260px] shrink-0 bg-neutral-900">
            <img
              src={HERO}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <button
              type="button"
              aria-label="Back"
              onClick={() => navigate('/recipes')}
              className="absolute top-3 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-text-primary transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
            >
              <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Save recipe"
              className="absolute top-3 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-text-primary transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
            >
              <Bookmark size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          {/* Title + meta + tags */}
          <div className="px-5 pt-5">
            <h1 className="text-h1 font-default font-medium text-text-primary">
              Lemon herb chicken
            </h1>

            {/* Meta row — time · kcal · servings (numbers in mono) */}
            <div className="mt-2 flex items-center flex-wrap gap-x-2 gap-y-1 text-body text-text-secondary">
              {meta.map(({ Icon, text }, i) => (
                <span key={text} className="flex items-center gap-1.5">
                  {i > 0 ? (
                    <span aria-hidden="true" className="mr-1 text-text-secondary">
                      ·
                    </span>
                  ) : null}
                  <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span className="font-numbers">{text}</span>
                </span>
              ))}
            </div>

            {/* Recipe tags — sage (food/recipe content) */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <Tag key={t} variant="sage">
                  {t}
                </Tag>
              ))}
            </div>
          </div>

          {/* Nutrition — four-up; calorie value carries the orange accent */}
          <div className="px-5 mt-5">
            <div className="bg-surface border border-border rounded-md p-4 grid grid-cols-4 gap-2">
              {nutrition.map((n) => (
                <div key={n.label} className="flex flex-col items-center gap-1">
                  <span
                    className={`font-numbers text-body-l font-medium ${
                      n.accent ? 'text-accent-primary' : 'text-text-primary'
                    }`}
                  >
                    {n.value}
                  </span>
                  <span className="text-caption text-text-secondary">
                    {n.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div className="px-5 mt-7">
            <h2 className="text-h3 font-default font-medium text-text-primary">
              Ingredients
            </h2>
            <ul className="mt-3 flex flex-col gap-2.5">
              {ingredients.map((ing) => (
                <li
                  key={ing}
                  className="flex items-center gap-3 text-body text-text-primary"
                >
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 rounded-full bg-accent-secondary shrink-0"
                  />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="px-5 mt-7 pb-6">
            <h2 className="text-h3 font-default font-medium text-text-primary">
              Steps
            </h2>
            <ol className="mt-3 flex flex-col gap-4">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-7 h-7 shrink-0 rounded-full border border-border flex items-center justify-center font-numbers text-caption text-text-secondary">
                    {i + 1}
                  </span>
                  <span className="text-body text-text-primary leading-relaxed">
                    {s}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Footer — one pinned action (no bottom nav) */}
        <div className="shrink-0 px-5 pt-3 pb-3 border-t border-border bg-background">
          <Button
            variant="primary"
            size="large"
            className="w-full"
            onClick={() => {}}
          >
            Start cooking
          </Button>
        </div>

        {/* Home indicator */}
        <div className="w-32 h-1 bg-text-primary rounded-full opacity-20 mx-auto mb-2 shrink-0" />
      </div>
    </div>
  )
}
