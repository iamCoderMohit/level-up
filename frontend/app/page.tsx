"use client"

import { SiteNav } from "@/components/site-nav"
import { HeroSection } from "@/components/landing/hero-section"
import { CoreLoopSection } from "@/components/landing/core-loop-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { CTASection, SiteFooter } from "@/components/landing/cta-section"
import { useAuthStore } from "../store/authStore"

const landingLinks = [
  { label: "Quests", href: "/paths" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Guilds", href: "/chat" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
     <SiteNav links={landingLinks} showGitHub variant="landing" />
      <main>
        <HeroSection />
        <CoreLoopSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  )
}
