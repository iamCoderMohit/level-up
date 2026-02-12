import { cn } from "@/lib/utils"

type BadgeVariant = "active" | "completed" | "locked" | "paused" | "hard" | "medium" | "easy" | "in-progress" | "boss" | "pro"

interface StatusBadgeProps {
  variant: BadgeVariant
  label?: string
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  locked: "bg-muted/50 text-muted-foreground border-border",
  paused: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  hard: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "in-progress": "bg-primary/20 text-primary border-primary/30",
  boss: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  pro: "bg-primary/20 text-primary border-primary/30",
}

const defaultLabels: Record<BadgeVariant, string> = {
  active: "Active",
  completed: "Completed",
  locked: "Locked",
  paused: "Paused",
  hard: "Hard",
  medium: "Medium",
  easy: "Easy",
  "in-progress": "In Progress",
  boss: "Boss",
  pro: "Pro Member",
}

export function StatusBadge({ variant, label, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        variantStyles[variant],
        className
      )}
    >
      {variant === "in-progress" && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
      {variant === "active" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
      {label || defaultLabels[variant]}
    </span>
  )
}
