import { SiteNav } from "@/components/site-nav"
import { PathTimeline } from "@/components/paths/path-timeline"

export const metadata = {
  title: "Frontend Developer Path | Level-Up",
  description: "Master HTML, CSS, React, and modern web tooling through gamified levels.",
}

const navLinks = [
  { label: "Pathways", href: "/paths" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Challenges", href: "/paths/frontend/5" },
  { label: "Shop", href: "#" },
]

export default function FrontendPathPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav links={navLinks} showStreak streak={12} showXP xp={2450} />
      <main className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
        <PathTimeline />
      </main>
    </div>
  )
}
