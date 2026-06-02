import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Index from './screens/Index'
import DesignSystem from './screens/DesignSystem'
import Onboarding1 from './screens/Onboarding1'
import OnboardingIndex from './screens/OnboardingIndex'
import Home from './screens/Home'
import HomeUpdated from './screens/HomeUpdated'
import ScanFlowIndex from './screens/ScanFlowIndex'
import ScanFlowPrototype from './screens/ScanFlowPrototype'
import RecipeFlowIndex from './screens/RecipeFlowIndex'
import RecipeDiscovery from './screens/RecipeDiscovery'
import RecipeDetail from './screens/RecipeDetail'
import Scan from './screens/Scan'
import ScanAnalysis from './screens/Scan_Analysis'
import ScanResult from './screens/Scan_Result'
import WFOnboarding from './screens/wireframes/WFOnboarding'
import WFOnboarding2 from './screens/wireframes/WFOnboarding2'
import WFOnboarding3 from './screens/wireframes/WFOnboarding3'
import WFOnboarding4 from './screens/wireframes/WFOnboarding4'
import WFOnboarding5 from './screens/wireframes/WFOnboarding5'
import WFOnboardingIndex from './screens/wireframes/WFOnboardingIndex'
import WFOnboardingPrototype from './screens/wireframes/WFOnboardingPrototype'
import WFHome from './screens/wireframes/WFHome'
import WFScanFlowIndex from './screens/wireframes/WFScanFlowIndex'
import WFScan from './screens/wireframes/WFScan'
import WFScanResult from './screens/wireframes/WFScanResult'
import WFHomeUpdated from './screens/wireframes/WFHomeUpdated'
import WFScanFlowPrototype from './screens/wireframes/WFScanFlowPrototype'
import WFRecipeFlowIndex from './screens/wireframes/WFRecipeFlowIndex'
import WFRecipeDiscovery from './screens/wireframes/WFRecipeDiscovery'
import WFRecipeDetail from './screens/wireframes/WFRecipeDetail'

/**
 * Placeholder — a stand-in for screens not built yet. Renders the screen name
 * with a "coming soon" note and a link back to the index, on the app bg.
 */
function Placeholder({ name }) {
  return (
    <div className="min-h-full bg-background flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-body-l text-text-primary">{name} — coming soon</p>
      <Link to="/" className="text-body text-accent-primary hover:underline">
        Back to index
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/design-system" element={<DesignSystem />} />
        <Route path="/onboarding" element={<Placeholder name="Onboarding" />} />
        <Route path="/onboarding/1" element={<Onboarding1 />} />
        <Route path="/screens/onboarding" element={<OnboardingIndex />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home-updated" element={<HomeUpdated />} />
        <Route path="/screens/scan-flow" element={<ScanFlowIndex />} />
        <Route
          path="/screens/scan-flow/prototype"
          element={<ScanFlowPrototype />}
        />
        <Route path="/scan" element={<Scan />} />
        <Route path="/scan-analysis" element={<ScanAnalysis />} />
        <Route path="/scan-result" element={<ScanResult />} />
        <Route path="/screens/recipe-flow" element={<RecipeFlowIndex />} />
        <Route path="/recipes" element={<RecipeDiscovery />} />
        <Route path="/recipe" element={<RecipeDetail />} />
        <Route path="/progress" element={<Placeholder name="Progress" />} />
        <Route path="/profile" element={<Placeholder name="Profile" />} />
        <Route path="/wireframes/onboarding" element={<WFOnboardingIndex />} />
        <Route
          path="/wireframes/onboarding/prototype"
          element={<WFOnboardingPrototype />}
        />
        <Route path="/wireframes/onboarding-1" element={<WFOnboarding />} />
        <Route path="/wireframes/onboarding-2" element={<WFOnboarding2 />} />
        <Route path="/wireframes/onboarding-3" element={<WFOnboarding3 />} />
        <Route path="/wireframes/onboarding-4" element={<WFOnboarding4 />} />
        <Route path="/wireframes/onboarding-5" element={<WFOnboarding5 />} />
        <Route path="/wireframes/scan-flow" element={<WFScanFlowIndex />} />
        <Route path="/wireframes/scan-flow/scan" element={<WFScan />} />
        <Route
          path="/wireframes/scan-flow/scan-result"
          element={<WFScanResult />}
        />
        <Route
          path="/wireframes/scan-flow/home-updated"
          element={<WFHomeUpdated />}
        />
        <Route
          path="/wireframes/scan-flow/prototype"
          element={<WFScanFlowPrototype />}
        />
        <Route path="/wireframes/recipe-flow" element={<WFRecipeFlowIndex />} />
        <Route
          path="/wireframes/recipe-flow/discovery"
          element={<WFRecipeDiscovery />}
        />
        <Route
          path="/wireframes/recipe-flow/detail"
          element={<WFRecipeDetail />}
        />
        <Route path="/wireframes/home" element={<WFHome />} />
      </Routes>
    </BrowserRouter>
  )
}
