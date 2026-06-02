import { useNavigate } from 'react-router-dom'
import {
  BarChart3,
  Home as HomeIcon,
  Utensils,
  User,
  Scan,
  Plus,
  Sunrise,
  Sun,
  Moon,
  Cookie,
} from 'lucide-react'
import TopAppBar from '../components/TopAppBar'
import CalorieRing from '../components/CalorieRing'
import MealList from '../components/MealList'
import BottomNavigation from '../components/BottomNavigation'
import Button from '../components/Button'
import Card from '../components/Card'

/**
 * Home — the Today / dashboard screen, the daily starting point.
 *
 * A calm instrument panel: the calorie ring is the hero (the only element that
 * earns the full accent-primary orange). Macros are a quiet, single soft-orange
 * read-out; the meal log uses the MealList / MealListItem design-system
 * components. Mid-day state — Breakfast + Lunch logged (895 of 2,200 kcal).
 * Full design system + device frame. All numbers are IBM Plex Mono.
 */

const macros = [
  { label: 'Protein', value: 68, total: 120 },
  { label: 'Carbs', value: 95, total: 220 },
  { label: 'Fat', value: 26, total: 70 },
]

// Mid-day: Breakfast (515) + Lunch (380) = 895 kcal. Dinner + Snacks empty.
const meals = [
  { name: 'Breakfast', description: '2 items', calories: 515, Icon: Sunrise, logged: true },
  { name: 'Lunch', description: '1 item', calories: 380, Icon: Sun, logged: true },
  { name: 'Dinner', description: 'Add food', Icon: Moon, logged: false },
  { name: 'Snacks', description: 'Add food', Icon: Cookie, logged: false },
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

// iOS-style status bar right-side glyphs (signal · wifi · battery).
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

// Macro bar — single very-soft orange fill on a neutral track (no color overload).
function MacroRow({ label, value, total }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-caption text-text-secondary">{label}</span>
        <span className="font-numbers text-caption text-text-primary">
          {value}g / {total}g
        </span>
      </div>
      <div className="mt-1.5 h-2 w-full rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-orange-200"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()

  const mealItems = meals.map((m) => ({
    thumbnail: (
      <m.Icon
        size={16}
        strokeWidth={1.75}
        className="text-text-secondary"
        aria-hidden="true"
      />
    ),
    name: m.name,
    description: m.description,
    calories: m.calories,
    showCalories: m.logged,
    // Empty meals get a subtle "+" add affordance on the right.
    trailing: m.logged ? undefined : (
      <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-text-secondary">
        <Plus size={16} strokeWidth={1.75} aria-hidden="true" />
      </div>
    ),
    onClick: () => {},
  }))

  return (
    <div className="min-h-screen bg-neutral-200 flex items-center justify-center p-6">
      {/* Device frame */}
      <div className="relative w-[390px] h-[844px] rounded-[44px] border-[8px] border-neutral-800 shadow-2xl overflow-hidden bg-background flex flex-col">
        <StatusBar />
        <TopAppBar title="Today" />

        {/* Scrollable dashboard — scrollbar hidden, pb clears the FAB + nav */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden pb-44">
          {/* Calorie ring + macros — the instrument cluster */}
          <div className="px-6 pt-4">
            <Card
              padded={false}
              elevated
              className="flex flex-col items-center gap-6 px-4 py-6 !rounded-3xl"
            >
              <CalorieRing value={41} current={895} total={2200} size="lg" />
              <div className="w-full flex flex-col gap-3">
                {macros.map((m) => (
                  <MacroRow key={m.label} {...m} />
                ))}
              </div>
            </Card>
          </div>

          {/* Meal log — design-system MealList / MealListItem */}
          <div className="px-6 pt-6">
            <MealList
              title="Today's meals"
              totalCalories={895}
              items={mealItems}
            />
          </div>
        </div>

        {/* FAB — Scan meal, just above the bottom nav, full width minus px-5 */}
        <div className="absolute left-5 right-5 bottom-[88px] z-10">
          <Button
            variant="primary"
            size="large"
            leadingIcon={Scan}
            className="w-full"
            onClick={() => navigate('/scan')}
          >
            Scan meal
          </Button>
        </div>

        {/* Bottom navigation — Home · Recipes · Progress · Profile */}
        <div className="absolute bottom-0 left-0 right-0">
          <BottomNavigation
            tabs={navTabs}
            activeTab="home"
            onTabChange={(id) => navigate(tabRoutes[id])}
          />
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-text-primary rounded-full opacity-20" />
      </div>
    </div>
  )
}
