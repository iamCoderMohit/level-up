"use client"

import { cn } from "@/lib/utils"
import { StatusBadge } from "@/components/status-badge"
import { StatCard } from "@/components/stat-card"
import { XPProgressBar } from "@/components/xp-progress-bar"
import { Monitor, Play, Star, CheckCircle, Lock, ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

/* -------- Types -------- */
type LevelStatus = "completed" | "current" | "locked"

interface PathLevel {
  level: number
  title: string
  description: string
  status: LevelStatus
  stars?: number
  best?: string
  xpReward?: number
  tags?: string[]
}

/* -------- Data -------- */
const levels: PathLevel[] = [
  { level: 1, title: "HTML Semantic Structure", description: "Understanding sectioning elements, accessibility basics, and document flow.", status: "completed", stars: 3, best: "100%" },
  { level: 2, title: "CSS Selectors & Specificity", description: "Mastering the cascade, class weighting, and advanced selectors.", status: "completed", stars: 2, best: "85%" },
  { level: 3, title: "Flexbox Layouts", description: "Building responsive 1-dimensional layouts and alignments.", status: "completed", stars: 3, best: "100%" },
  { level: 4, title: "CSS Grid Systems", description: "Creating complex 2-dimensional layouts with grid-template-areas.", status: "completed", stars: 2, best: "92%" },
  { level: 5, title: "JavaScript: The DOM API", description: "Learn how to select, modify, and animate HTML elements using vanilla JavaScript. This is crucial for interactivity.", status: "current", xpReward: 800, tags: ["querySelector", "EventListeners", "classList"] },
  { level: 6, title: "Async JavaScript & Fetch", description: "Understanding Promises, Async/Await, and API consumption.", status: "locked" },
  { level: 7, title: "React Fundamentals", description: "Components, Props, and State management basics.", status: "locked" },
]

/* -------- Path Info Card -------- */
function PathInfoCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 mb-8 lg:sticky lg:top-20">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Monitor className="w-5 h-5 text-primary" />
        </div>
        <StatusBadge variant="active" />
      </div>
      <h2 className="text-lg font-bold text-foreground mb-1">Frontend Developer</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Master HTML, CSS, React, and modern web tooling to build immersive user interfaces.
      </p>
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
        <span>Progress</span>
        <span className="text-primary font-semibold">Level 5 / 20</span>
      </div>
      <XPProgressBar current={5} max={20} showLabel={false} size="sm" />
      <div className="grid grid-cols-2 gap-3 mt-4">
        <StatCard label="TOTAL XP" value="12.5k" />
        <StatCard label="RANK" value="#402" />
      </div>
      <Link
        href="/paths/frontend/5"
        className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        <Play className="w-4 h-4" /> Resume Path
      </Link>
    </div>
  )
}

/* -------- Daily Challenge Card -------- */
function DailyChallengeCard() {
  return (
    <div className="rounded-xl bg-primary p-4 text-primary-foreground mb-6">
      <div className="flex items-center gap-2 mb-1">
        <Zap className="w-4 h-4" />
        <span className="text-xs font-bold uppercase">Daily CSS Challenge</span>
      </div>
      <p className="text-sm mb-2">Create a pulsing button animation using only CSS keyframes.</p>
      <div className="flex items-center justify-between text-xs">
        <span>+150 XP</span>
        <span>Expires in 4h</span>
      </div>
    </div>
  )
}

/* -------- Level Node -------- */
function LevelNode({ level, index }: { level: PathLevel; index: number }) {
  const isEven = index % 2 === 0

  return (
    <div className="relative flex items-start gap-4 lg:gap-0">
      {/* Timeline connector */}
      <div className="flex flex-col items-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 z-10">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0",
            level.status === "completed" && "bg-primary border-primary",
            level.status === "current" && "bg-primary/20 border-primary animate-pulse-glow",
            level.status === "locked" && "bg-secondary border-border"
          )}
        >
          {level.status === "completed" && <CheckCircle className="w-4 h-4 text-primary-foreground" />}
          {level.status === "current" && <Zap className="w-4 h-4 text-primary" />}
          {level.status === "locked" && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
        </div>
        {index < levels.length - 1 && (
          <div className={cn("w-0.5 h-16 lg:h-24", level.status === "completed" ? "bg-primary" : "bg-border")} />
        )}
      </div>

      {/* Card - on mobile always on the right, on desktop alternates */}
      <div
        className={cn(
          "flex-1 lg:w-[calc(50%-2rem)]",
          "lg:absolute",
          isEven ? "lg:left-[calc(50%+2rem)]" : "lg:right-[calc(50%+2rem)]"
        )}
      >
        <div
          className={cn(
            "rounded-xl border p-4",
            level.status === "current" ? "border-primary/40 bg-primary/5" : "border-border bg-card",
            level.status === "locked" && "opacity-50"
          )}
        >
          <div className="flex items-center justify-between mb-1">
            <span className={cn("text-xs font-bold uppercase tracking-wide", level.status === "completed" ? "text-success" : level.status === "current" ? "text-primary" : "text-muted-foreground")}>
              {level.status === "completed" ? `Level ${level.level} - Completed` : level.status === "current" ? "Current Mission" : `Level ${level.level} - Locked`}
            </span>
            {level.stars && (
              <div className="flex items-center gap-0.5">
                {Array.from({ length: level.stars }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />
                ))}
              </div>
            )}
          </div>
          <h3 className="font-bold text-foreground mb-1">{level.title}</h3>
          <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{level.description}</p>

          {level.status === "completed" && level.best && (
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>Best: {level.best}</span>
              <span className="text-primary hover:underline cursor-pointer">Replay Module</span>
            </div>
          )}
          {level.status === "current" && (
            <>
              {level.xpReward && <p className="text-xs text-primary font-semibold mb-2">+{level.xpReward} XP Reward</p>}
              {level.tags && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {level.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-secondary text-xs text-muted-foreground">{tag}</span>
                  ))}
                </div>
              )}
              <Link
                href="/paths/frontend/5"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
              >
                Start Level <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/* -------- Main Timeline -------- */
export function PathTimeline() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      {/* Left Panel */}
      <div>
        <PathInfoCard />
        <DailyChallengeCard />
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Mobile: simple list, Desktop: centered timeline */}
        <div className="flex flex-col gap-0 lg:gap-0">
          {levels.map((level, i) => (
            <div key={level.level} className="relative min-h-[120px] lg:min-h-[140px]">
              <LevelNode level={level} index={i} />
            </div>
          ))}
        </div>

        {/* Milestone at bottom */}
        <div className="mt-8 text-center">
          <div className="w-10 h-10 rounded-full bg-secondary border-2 border-border flex items-center justify-center mx-auto mb-2">
            <Lock className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Milestone Project: Portfolio V1</p>
          <p className="text-xs text-muted-foreground">Combine everything {"you've"} learned to build your personal site.</p>
        </div>
      </div>
    </div>
  )
}
