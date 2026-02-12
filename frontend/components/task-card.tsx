import { cn } from "@/lib/utils"
import { StatusBadge } from "@/components/status-badge"

type TaskStatus = "completed" | "in-progress" | "locked" | "active"

interface TaskCardProps {
  title: string
  description: string
  xp: number
  status: TaskStatus
  icon: React.ReactNode
  iconBg?: string
  difficulty?: "hard" | "medium" | "easy"
  time?: string
  category?: string
  featured?: boolean
  reviewLink?: string
  className?: string
}

export function TaskCard({
  title,
  description,
  xp,
  status,
  icon,
  iconBg = "bg-secondary",
  difficulty,
  time,
  category,
  featured = false,
  reviewLink,
  className,
}: TaskCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4 lg:p-5 relative",
        featured && "border-primary/30 bg-primary/5",
        status === "locked" && "opacity-60",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", iconBg)}>
          {icon}
        </div>
        <div className="flex items-center gap-2">
          {difficulty && <StatusBadge variant={difficulty} />}
          {status === "in-progress" && <StatusBadge variant="in-progress" />}
          {status === "completed" && <StatusBadge variant="completed" />}
        </div>
      </div>

      <h3 className="font-bold text-foreground mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

      {(time || category) && (
        <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
          {time && <span>~{time}</span>}
          {category && <span>{category}</span>}
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className={cn("text-sm font-semibold", status === "completed" ? "text-gold" : "text-primary")}>
          {status === "completed" ? (
            <span className="flex items-center gap-1">+{xp} XP</span>
          ) : (
            <span>+{xp} XP</span>
          )}
        </span>
        {status === "completed" && reviewLink && (
          <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer">
            Review Solution
          </span>
        )}
        {(status === "active" || status === "in-progress") && (
          <button className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
            {status === "in-progress" ? "Continue" : "Start"}
          </button>
        )}
        {status === "locked" && (
          <span className="text-xs text-muted-foreground">Locked</span>
        )}
      </div>
    </div>
  )
}
