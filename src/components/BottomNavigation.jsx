import { Home as HomeIcon, Utensils, BarChart3, User } from 'lucide-react'
import NavItem from './NavItem'

/**
 * BottomNavigation — fixed-bottom mobile tab bar.
 *
 * Production usage: place inside a fullscreen container with the bar
 * fixed to the viewport bottom, e.g.
 *
 *   <div className="fixed bottom-0 left-0 right-0">
 *     <BottomNavigation ... />
 *   </div>
 *
 * The component itself stays positionally agnostic so it can also be
 * rendered inline (as in the design-system showcase). It sizes to its
 * container via `w-full`.
 *
 * Each tab is a NavItem — equal flex distribution, icon above a caption
 * label. The active tab is tinted accent-primary; inactive tabs use
 * text-secondary. The `pb-5` is an iOS safe-area buffer for the iPhone
 * home indicator.
 */

// Default tabs are the canonical app nav: Home · Recipes · Progress · Profile.
// Real screens still pass their own `tabs` (each: { id, label, icon }) plus
// activeTab/onTabChange for routing; the default just keeps the design-system
// showcase rendering a realistic bar instead of placeholders.
const defaultTabs = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'recipes', label: 'Recipes', icon: Utensils },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
]

export default function BottomNavigation({
  tabs = defaultTabs,
  activeTab,
  onTabChange,
}) {
  return (
    <nav
      role="tablist"
      aria-label="Primary"
      className="relative flex items-center justify-between bg-background border-t border-border w-full px-4 pt-2 pb-5"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon
        return (
          <NavItem
            key={tab.id}
            icon={<Icon />}
            label={tab.label}
            active={tab.id === activeTab}
            onClick={() => onTabChange?.(tab.id)}
          />
        )
      })}
    </nav>
  )
}
