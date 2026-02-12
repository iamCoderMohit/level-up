import { cn } from "@/lib/utils"

interface UserAvatarProps {
  name: string
  level?: number
  size?: "sm" | "md" | "lg" | "xl"
  showLevel?: boolean
  online?: boolean
  className?: string
  ringColor?: string
}

export function UserAvatar({
  name,
  level,
  size = "md",
  showLevel = false,
  online,
  className,
  ringColor,
}: UserAvatarProps) {
  const sizes: Record<string, string> = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl",
  }

  let initials

  if(name){
    initials = name
    .split(/[\s_]/)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
  }

  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      <div
        className={cn(
          "rounded-full bg-secondary flex items-center justify-center font-bold text-foreground border-2 border-border",
          sizes[size],
          ringColor && `ring-2 ${ringColor}`
        )}
      >
        {initials || "User"}
      </div>
      {showLevel && level !== undefined && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap">
          LVL {level}
        </span>
      )}
      {online !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background",
            online ? "bg-success" : "bg-muted-foreground"
          )}
        />
      )}
    </div>
  )
}
