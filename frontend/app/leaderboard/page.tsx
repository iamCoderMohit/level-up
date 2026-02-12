import { SiteNav } from "@/components/site-nav"
import { LeaderboardContent } from "@/components/leaderboard/leaderboard-content"

export const metadata = {
  title: "Leaderboard | Level-Up",
  description: "Compete with the top developers worldwide on the global leaderboard.",
}

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Quests", href: "/paths" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Profile", href: "/profile" },
]

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav links={navLinks} showXP xp={2450} level={12} />
      <main className="max-w-5xl mx-auto px-4 py-8 lg:py-12">
        <LeaderboardContent />
      </main>
    </div>
  )
}
