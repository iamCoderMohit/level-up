import { cn } from "@/lib/utils"
import { StatusBadge } from "@/components/status-badge"
import { StatCard } from "@/components/stat-card"
import { XPProgressBar } from "@/components/xp-progress-bar"
import { Lock, ArrowRight } from "lucide-react"
import Link from "next/link"

interface DisciplineCardProps {
  title: string
  description: string
  icon: React.ReactNode
  iconBg: string
  level: number
  xpEarned: string
  modules: string
  progress: number
  isLocked?: boolean
  lockMessage?: string
  href?: string
  className?: string
}

export function DisciplineCard({
  title,
  description,
  icon,
  iconBg,
  level,
  xpEarned,
  modules,
  progress,
  isLocked = false,
  lockMessage,
  href = "/paths/frontend",
  className,
}: DisciplineCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 lg:p-6 flex flex-col",
        isLocked && "opacity-60",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconBg)}>
          {icon}
        </div>
        <StatusBadge variant={isLocked ? "locked" : "active"} label={isLocked ? "Locked Path" : "Active Campaign"} />
      </div>

      <h3 className="text-lg font-bold text-foreground mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <StatCard label="Level" value={level} />
        <StatCard label="XP Earned" value={xpEarned} />
        <StatCard label="Modules" value={modules} />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted-foreground">Mastery Progress</span>
          <span className="text-xs font-semibold text-primary">{progress}%</span>
        </div>
        <XPProgressBar current={progress} max={100} showLabel={false} size="sm" />
      </div>

      <div className="mt-auto">
        {isLocked ? (
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-secondary text-muted-foreground text-sm font-medium cursor-not-allowed"
          >
            <Lock className="w-4 h-4" />
            {lockMessage || "Reach Lvl 15 to Unlock"}
          </button>
        ) : (
          <Link
            href={href}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Continue Journey <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
