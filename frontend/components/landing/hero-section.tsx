import { XPProgressBar } from "@/components/xp-progress-bar"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-28">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center px-4">
        {/* Season tag */}
        <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            Season 4: Cyber Protocol, Live Now
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-4 leading-tight text-balance">
          LEVEL UP YOUR{" "}
          <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
            DEVELOPER JOURNEY
          </span>
        </h1>

        <p className="text-muted-foreground text-base lg:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Turn your commits into quests. Master new languages through RPG-style
          progression. Compete with your guild and prove your skills.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Start Your Journey
          </Link>
          <Link
            href="/paths"
            className="px-6 py-3 rounded-lg font-medium text-foreground border border-border hover:bg-secondary transition-colors text-sm"
          >
            View Demo
          </Link>
        </div>

        {/* XP Card preview */}
        <div className="max-w-md mx-auto rounded-xl bg-secondary/80 border border-border p-4 backdrop-blur">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">42</span>
              <span className="text-sm font-semibold text-foreground">Senior Architect</span>
            </div>
            <span className="text-sm font-mono text-muted-foreground">
              2,450 <span className="text-muted-foreground/60">/ 3,000 XP</span>
            </span>
          </div>
          <XPProgressBar current={2450} max={3000} showLabel={false} size="md" />
          <div className="text-right mt-1">
            <span className="text-xs text-primary font-semibold">+450 XP</span>
          </div>
        </div>
      </div>
    </section>
  )
}
