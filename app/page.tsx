import { MainNav } from "@/components/main-nav"
import { LandingHero } from "@/components/landing-hero"
import { LandingTrust } from "@/components/landing-trust"
import { LandingFeatures } from "@/components/landing-features"
import { LandingHowItWorks } from "@/components/landing-how-it-works"
import { LandingPreview } from "@/components/landing-preview"
import { LandingTransparency } from "@/components/landing-transparency"
import { LandingFooter } from "@/components/landing-footer"
import { WelcomeDialog } from "@/components/welcome-dialog"

export default function Home() {
  return (
    <div className="min-h-screen">
      <MainNav />
      <LandingHero />
      <LandingTrust />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingPreview />
      <LandingTransparency />
      <LandingFooter />
      <WelcomeDialog />
    </div>
  )
}
