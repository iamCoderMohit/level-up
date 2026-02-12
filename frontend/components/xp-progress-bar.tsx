import { cn } from "@/lib/utils"

interface XPProgressBarProps {
  current: number
  max: number
  showLabel?: boolean
  label?: string
  size?: "sm" | "md" | "lg"
  className?: string
  color?: string
}

export function XPProgressBar({
  current,
  max,
  showLabel = true,
  label,
  size = "md",
  className,
  color = "bg-primary",
}: XPProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100)

  const heights: Record<string, string> = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-3.5",
  }

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-xs text-muted-foreground">{label}</span>}
          <span className="text-xs font-mono text-primary">
            {current.toLocaleString()} / {max.toLocaleString()} XP
          </span>
        </div>
      )}
      <div className={cn("w-full rounded-full bg-secondary overflow-hidden", heights[size])}>
        <div
          className={cn("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
