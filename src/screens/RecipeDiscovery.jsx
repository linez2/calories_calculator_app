import { useNavigate, Link } from 'react-router-dom'
import {
  Home as HomeIcon,
  Utensils,
  User,
  BarChart3,
  Camera,
  Search,
  Clock,
} from 'lucide-react'
import TopAppBar from '../components/TopAppBar'
import FilterChip from '../components/FilterChip'
import RecipeCard from '../components/RecipeCard'
import Tag from '../components/Tag'
import BottomNavigation from '../components/BottomNavigation'

/**
 * RecipeDiscovery — the Recipes tab. Calm, utilitarian discovery: the AI knows
 * the user's macros and recent scans, so it surfaces relevant recipes first.
 * Search (+ scan-ingredients), filters, then personalized sections and the full
 * list. Full design system; numbers in IBM Plex Mono. BottomNav: Recipes active.
 */

const U = (id) => `https://images.unsplash.com/${id}?w=400&q=75`

const filters = [
  'All',
  'Quick & Easy',
  'Under 30 min',
  'High protein',
  'Low Carb',
  'Keto',
  'Vegetarian',
  'Gluten-Free',
  'Breakfast',
  'Meal Prep',
  'Family',
]

const fromScan = [
  { image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80', title: 'Chicken rice bowl', duration: '20 min', calories: '480' },
  { image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=400&q=80', title: 'Broccoli stir-fry', duration: '15 min', calories: '320' },
  { image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80', title: 'Salmon salad', duration: '15 min', calories: '390' },
  { image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80', title: 'Egg fried rice', duration: '20 min', calories: '450' },
]

const proteinGap = [
  { image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80', title: 'Lemon chicken', duration: '20 min', calories: '420', tags: ['35g protein'] },
  { image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80', title: 'Chickpea salad', duration: '15 min', calories: '310', tags: ['28g protein'] },
  { image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80', title: 'Tuna bowl', duration: '15 min', calories: '380', tags: ['32g protein'] },
  { image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80', title: 'Cottage bowl', duration: '10 min', calories: '290', tags: ['25g protein'] },
]

const allRecipes = [
  { image: U('photo-1490645935967-10de6ba17061'), title: 'Overnight oats', duration: '5 min', calories: '310' },
  { image: U('photo-1484723091739-30a097e8f929'), title: 'Avocado toast', duration: '10 min', calories: '290' },
  { image: U('photo-1504674900247-0877df9cc836'), title: 'Garden grain salad', duration: '15 min', calories: '350' },
  { image: U('photo-1473093295043-cdd812d0e601'), title: 'Tomato basil pasta', duration: '25 min', calories: '480' },
]

const navTabs = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'recipes', label: 'Recipes', icon: Utensils },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
]

const tabRoutes = {
  home: '/home',
  recipes: '/recipes',
  progress: '/progress',
  profile: '/profile',
}

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

function Section({ title, subtitle, action, carousel = false, children }) {
  return (
    <div className="mt-6 px-5">
      {/* Heading row — title/subtitle left, optional action right-aligned */}
      <div className="flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <div className="text-body-l font-medium text-text-primary">{title}</div>
          {subtitle ? (
            <div className="mt-0.5 text-caption text-text-secondary">
              {subtitle}
            </div>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>

      {carousel ? (
        // Horizontal carousel — full-bleed scroll (-mx-5 cancels the wrapper
        // padding, px-5 re-insets the first/last card so the next one peeks).
        <div className="flex flex-row gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden -mx-5 px-5 mt-3">
          {children}
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-2 gap-3">{children}</div>
      )}
    </div>
  )
}

export default function RecipeDiscovery() {
  const navigate = useNavigate()

  const cardProps = (r) => ({
    image: r.image,
    title: r.title,
    duration: r.duration,
    calories: r.calories,
    tags: r.tags,
    onClick: () => navigate('/recipe'),
  })

  // Grid item fills its 2-col cell (shared RecipeCard, 2-line title).
  const gridCard = (r) => <RecipeCard key={r.title} {...cardProps(r)} />

  // Carousel slide — fixed 200px width + 140px image + a fixed-min-height text
  // block + single-line name, so every card is identical height.
  const carouselCard = (r) => (
    <button
      key={r.title}
      type="button"
      onClick={() => navigate('/recipe')}
      className="min-w-[200px] max-w-[200px] flex-shrink-0 flex flex-col text-left bg-surface border border-border rounded-md overflow-hidden cursor-pointer transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
    >
      <img src={r.image} alt="" className="h-[140px] w-full object-cover object-center" />
      <div className="p-3 min-h-[92px] flex flex-col">
        <div className="text-body-l font-default font-medium text-text-primary line-clamp-1">
          {r.title}
        </div>
        <div className="flex items-center gap-1.5 mt-1 text-text-secondary">
          <Clock size={12} strokeWidth={1.75} aria-hidden="true" />
          <span className="text-caption">{r.duration}</span>
          <span className="text-caption" aria-hidden="true">
            ·
          </span>
          <span className="font-numbers text-caption">{r.calories} kcal</span>
        </div>
        {r.tags?.length ? (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {r.tags.map((t, i) => (
              <Tag key={i} variant="neutral" className="px-2 py-0.5 text-caption">
                {t}
              </Tag>
            ))}
          </div>
        ) : null}
      </div>
    </button>
  )

  return (
    <div className="min-h-screen bg-neutral-200 flex items-center justify-center p-6">
      {/* Device frame */}
      <div className="relative w-[390px] h-[844px] rounded-[44px] border-[8px] border-neutral-800 shadow-2xl overflow-hidden bg-background flex flex-col">
        <StatusBar />
        <TopAppBar title="Recipes" />

        {/* Scroll area */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden pb-24">
          {/* Search + scan-ingredients — light field + matching light camera button */}
          <div className="px-5 pt-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search
                size={20}
                strokeWidth={1.75}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search recipes"
                className="w-full h-11 pl-10 pr-3 rounded-md bg-surface text-text-primary placeholder:text-text-secondary border border-border text-body font-default focus:outline-none focus:border-accent-primary"
              />
            </div>
            <button
              type="button"
              aria-label="Scan ingredients"
              onClick={() => navigate('/scan')}
              className="w-11 h-11 shrink-0 flex items-center justify-center rounded-md bg-surface border border-border text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
            >
              <Camera size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          {/* Filter chips — strict single-row horizontal slider (no wrap),
              native scrollbar hidden */}
          <div className="mt-4 px-5 flex flex-nowrap gap-2 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((f, i) => (
              <FilterChip
                key={f}
                variant="sage"
                label={f}
                selected={i === 0}
                onClick={() => {}}
                className="shrink-0"
              />
            ))}
          </div>

          {/* Personalized — from the recent scan (horizontal carousel) */}
          <Section
            title="Based on what you have"
            subtitle="From your recent scan"
            carousel
          >
            {fromScan.map(carouselCard)}
          </Section>

          {/* Macro-gap nudge (horizontal carousel) */}
          <Section
            title="Close your protein gap"
            subtitle="Evening suggestions to hit your remaining 30g protein target."
            carousel
          >
            {proteinGap.map(carouselCard)}
          </Section>

          {/* Everything — full grid with a View all link */}
          <Section
            title="All recipes"
            action={
              <Link
                to="/recipes"
                className="text-caption text-accent-primary hover:underline"
              >
                View all →
              </Link>
            }
          >
            {allRecipes.map(gridCard)}
          </Section>
        </div>

        {/* Bottom navigation — Recipes active */}
        <div className="absolute bottom-0 left-0 right-0">
          <BottomNavigation
            tabs={navTabs}
            activeTab="recipes"
            onTabChange={(id) => navigate(tabRoutes[id])}
          />
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-text-primary rounded-full opacity-20" />
      </div>
    </div>
  )
}
