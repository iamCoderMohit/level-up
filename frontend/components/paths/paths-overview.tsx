import { DisciplineCard } from "@/components/paths/discipline-card"
import { AchievementBadge } from "@/components/achievement-badge"
import { Monitor, Server, Sparkles, Bug, Flame, Code2, Lock } from "lucide-react"

/* -------- Daily Quest Widget -------- */
function DailyQuestWidget() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Daily Quest</span>
        <span className="text-xs text-primary font-semibold">1/3</span>
      </div>
      <p className="text-sm font-bold text-foreground">Refactor 5 Components</p>
      <div className="mt-2 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <div className="h-full w-1/3 rounded-full bg-primary" />
      </div>
    </div>
  )
}

/* -------- Achievement Row -------- */
interface AchievementItem {
  title: string
  subtitle: string
  icon: React.ReactNode
  iconBg: string
  locked?: boolean
}

const achievements: AchievementItem[] = [
  { title: "Flexbox Master", subtitle: "Earned 2h ago", icon: <Sparkles className="w-5 h-5 text-blue-400" />, iconBg: "bg-blue-500/20" },
  { title: "Bug Hunter I", subtitle: "Earned 1d ago", icon: <Bug className="w-5 h-5 text-emerald-400" />, iconBg: "bg-emerald-500/20" },
  { title: "7 Day Streak", subtitle: "Earned 1w ago", icon: <Flame className="w-5 h-5 text-streak" />, iconBg: "bg-streak/20" },
  { title: "React Sorcerer", subtitle: "Locked", icon: <Lock className="w-5 h-5 text-muted-foreground" />, iconBg: "bg-secondary", locked: true },
]

/* -------- Main Overview -------- */
export function PathsOverview() {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Campaign Selection</p>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Choose Your Discipline</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-lg">
            Master specific tech stacks to unlock new job classes. Complete quests to earn XP and level up your developer profile.
          </p>
        </div>
        <DailyQuestWidget />
      </div>

      {/* Discipline Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <DisciplineCard
          title="Frontend Artificer"
          description="Master the art of UI/UX, React spells, and CSS enchantments. Build interfaces that captivate users."
          icon={<Monitor className="w-6 h-6 text-primary" />}
          iconBg="bg-primary/10"
          level={12}
          xpEarned="4.5k"
          modules="8/20"
          progress={42}
          href="/paths/frontend"
        />
        <DisciplineCard
          title="Backend Architect"
          description="Construct robust servers, database dungeons, and API gateways. The foundation of the digital world."
          icon={<Server className="w-6 h-6 text-muted-foreground" />}
          iconBg="bg-secondary"
          level={0}
          xpEarned="0"
          modules="0/24"
          progress={0}
          isLocked
          lockMessage="Reach Lvl 15 to Unlock"
        />
      </div>

      {/* Recent Achievements */}
      <div className="mb-2">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-gold" />
          Recent Achievements
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((a) => (
          <AchievementBadge
            key={a.title}
            title={a.title}
            subtitle={a.subtitle}
            icon={a.icon}
            iconBg={a.iconBg}
            locked={a.locked}
          />
        ))}
      </div>
    </div>
  )
}
