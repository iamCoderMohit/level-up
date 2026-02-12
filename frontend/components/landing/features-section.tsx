import { Zap, Flame, BarChart3, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureItem {
  title: string
  description: string
  icon: React.ReactNode
  content?: React.ReactNode
  span?: "normal" | "wide"
}

const features: FeatureItem[] = [
  {
    title: "RPG Progression System",
    description:
      "Earn specialized XP for different languages. Become a Level 50 Python Mage or a Rust Paladin.",
    icon: <Zap className="w-5 h-5 text-primary" />,
    span: "wide",
    content: (
      <div className="flex items-center gap-4 mt-4">
        {[
          { label: "Pyromancer", icon: <Flame className="w-5 h-5 text-streak" /> },
          { label: "Alchemist", icon: <Zap className="w-5 h-5 text-primary" /> },
          { label: "Hunter", icon: <Users className="w-5 h-5 text-success" /> },
        ].map((cls) => (
          <div key={cls.label} className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center border border-border">
              {cls.icon}
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{cls.label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Daily Streak",
    description: "Keep your streak alive and earn bonus XP multipliers.",
    icon: <Flame className="w-5 h-5 text-streak" />,
    content: (
      <div className="mt-4">
        <div className="flex items-baseline justify-end gap-1 mb-2">
          <span className="text-3xl font-bold text-foreground">42</span>
          <span className="text-xs text-muted-foreground uppercase">Days Active</span>
        </div>
        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-streak via-amber-400 to-streak" style={{ width: "85%" }} />
        </div>
      </div>
    ),
  },
  {
    title: "Leaderboards",
    description: "Compete globally or within your guild.",
    icon: <BarChart3 className="w-5 h-5 text-primary" />,
    content: (
      <div className="mt-3 text-sm font-mono">
        {[
          { rank: 1, name: "Dev_X", xp: "90k" },
          { rank: 2, name: "SarahC", xp: "84k" },
          { rank: 3, name: "pixel_g", xp: "72k" },
        ].map((entry) => (
          <div key={entry.rank} className="flex items-center justify-between py-1 text-muted-foreground">
            <span>
              {entry.rank}. {entry.name}
            </span>
            <span className="text-streak">{entry.xp}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Guilds",
    description: "Team up with friends to complete raids (hackathons).",
    icon: <Users className="w-5 h-5 text-primary" />,
    content: (
      <div className="flex items-center gap-2 mt-3">
        <div className="flex -space-x-2">
          {["A", "B", "C"].map((letter) => (
            <div key={letter} className="w-8 h-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-xs font-bold text-foreground">
              {letter}
            </div>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">+5</span>
      </div>
    ),
  },
]

function FeatureCard({ title, description, icon, content, span = "normal" }: FeatureItem) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors",
        span === "wide" ? "sm:col-span-2 lg:col-span-1" : ""
      )}
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="font-bold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      {content}
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground uppercase mb-2">System Features</h2>
          <p className="text-muted-foreground">
            Everything you need to stay motivated and track your growth as an engineer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
