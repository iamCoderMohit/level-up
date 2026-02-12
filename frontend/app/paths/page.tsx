import { SiteNav } from "@/components/site-nav"
import { PathsOverview } from "@/components/paths/paths-overview"

export const metadata = {
  title: "Skill Paths | Level-Up",
  description: "Choose your discipline and master tech stacks through gamified learning.",
}

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Quests", href: "/paths" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Profile", href: "/profile" },
]

export default function PathsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav links={navLinks} showXP xp={12450} level={12} showStreak streak={14} />
      <main className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
        <PathsOverview />
      </main>
    </div>
  )
}
