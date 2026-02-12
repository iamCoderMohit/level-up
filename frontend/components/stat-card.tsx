import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string | number
  className?: string
  valueClassName?: string
}

export function StatCard({ label, value, className, valueClassName }: StatCardProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-secondary/50 px-4 py-3", className)}>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={cn("text-lg font-bold font-mono text-foreground", valueClassName)}>{value}</p>
    </div>
  )
}
