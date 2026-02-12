import { cn } from "@/lib/utils"
import { StatusBadge } from "@/components/status-badge"
import { XPProgressBar } from "@/components/xp-progress-bar"

interface QuestCardProps {
  title: string
  description: string
  module: string
  progress: number
  status: "active" | "paused" | "completed" | "locked"
  icon: React.ReactNode
  iconBg?: string
  onAction?: () => void
  actionLabel?: string
  className?: string
}

export function QuestCard({
  title,
  description,
  module,
  progress,
  status,
  icon,
  iconBg = "bg-secondary",
  actionLabel,
  className,
}: QuestCardProps) {
  const buttonLabel = actionLabel || (status === "active" ? "Resume" : status === "paused" ? "Continue" : "Start")

  return (
    <div className={cn("rounded-xl border border-border bg-card p-4 lg:p-5", className)}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Icon */}
        <div className={cn("w-14 h-14 lg:w-20 lg:h-20 rounded-xl flex items-center justify-center shrink-0 self-start", iconBg)}>
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-foreground text-base lg:text-lg">{title}</h3>
            <StatusBadge variant={status} className="shrink-0" />
          </div>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>

          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">{module}</span>
            <span className="text-xs font-medium text-foreground">{progress}% Complete</span>
          </div>
          <XPProgressBar
            current={progress}
            max={100}
            showLabel={false}
            size="sm"
            color={status === "paused" ? "bg-streak" : "bg-primary"}
          />

          {status !== "completed" && status !== "locked" && (
            <button className="mt-4 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              {buttonLabel} {status === "active" && <span className="ml-1">{">"}</span>}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
