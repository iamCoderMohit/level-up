import { cn } from "@/lib/utils"

interface LevelBadgeProps {
  level: number
  label: string
  variant?: "default" | "small"
  className?: string
}

const classColors: Record<string, string> = {
  novice: "bg-emerald-600",
  ranger: "bg-orange-600",
  sorcerer: "bg-blue-600",
  paladin: "bg-primary",
  mage: "bg-purple-600",
  rogue: "bg-red-600",
  warrior: "bg-amber-600",
  expert: "bg-teal-600",
  wizard: "bg-indigo-600",
  hunter: "bg-lime-600",
}

export function LevelBadge({ level, label, variant = "default", className }: LevelBadgeProps) {
  const labelLower = label.toLowerCase()
  const bgColor = classColors[labelLower] || "bg-primary"

  if (variant === "small") {
    return (
      <span className={cn("inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-bold text-primary-foreground", bgColor, className)}>
        LVL {level} {label.toUpperCase()}
      </span>
    )
  }

  return (
    <span className={cn("inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-bold text-primary-foreground", bgColor, className)}>
      LVL {level}
    </span>
  )
}
