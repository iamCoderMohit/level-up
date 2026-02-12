import { cn } from "@/lib/utils"

interface AchievementBadgeProps {
  title: string
  subtitle: string
  icon: React.ReactNode
  iconBg?: string
  locked?: boolean
  className?: string
}

export function AchievementBadge({
  title,
  subtitle,
  icon,
  iconBg = "bg-secondary",
  locked = false,
  className,
}: AchievementBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-border bg-card p-3 lg:p-4 transition-colors",
        locked && "opacity-50",
        className
      )}
    >
      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", iconBg)}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
      </div>
    </div>
  )
}
