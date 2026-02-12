"use client"

import { cn } from "@/lib/utils"
import { UserAvatar } from "@/components/user-avatar"
import { Flame, Trophy, Star } from "lucide-react"
import { useState } from "react"

/* -------- Types -------- */
interface LeaderboardEntry {
  rank: number
  name: string
  level: number
  title: string
  xp: number
  streak: number
  isYou?: boolean
}

/* -------- Data -------- */
const podiumData: LeaderboardEntry[] = [
  { rank: 2, name: "Sarah.dev", level: 40, title: "React Master", xp: 14200, streak: 30 },
  { rank: 1, name: "AlexCoder", level: 50, title: "TOP 1%", xp: 18450, streak: 60 },
  { rank: 3, name: "Davidd_99", level: 38, title: "Go Expert", xp: 12980, streak: 21 },
]

const tableData: LeaderboardEntry[] = [
  { rank: 4, name: "CodeMasterX", level: 38, title: "Python Expert", xp: 10500, streak: 42 },
  { rank: 5, name: "Jenna_Codes", level: 35, title: "JS Warrior", xp: 9820, streak: 15 },
  { rank: 6, name: "M_Tylor", level: 32, title: "Rustacean", xp: 9100, streak: 0 },
  { rank: 7, name: "PixelPioneer", level: 30, title: "CSS Wizard", xp: 8540, streak: 21 },
  { rank: 8, name: "Kudo_Chan", level: 28, title: "Full Stack", xp: 8100, streak: 89 },
]

const currentUser: LeaderboardEntry = {
  rank: 24,
  name: "You",
  level: 12,
  title: "Junior Dev",
  xp: 4320,
  streak: 5,
  isYou: true,
}

/* -------- Podium -------- */
function PodiumPlace({ entry, place }: { entry: LeaderboardEntry; place: 1 | 2 | 3 }) {
  const sizes = { 1: "w-24 h-24 lg:w-28 lg:h-28", 2: "w-18 h-18 lg:w-20 lg:h-20", 3: "w-18 h-18 lg:w-20 lg:h-20" }
  const ringColors = { 1: "ring-gold", 2: "ring-muted-foreground", 3: "ring-streak" }
  const order = { 1: "order-2", 2: "order-1", 3: "order-3" }

  return (
    <div className={cn("flex flex-col items-center", order[place], place === 1 && "-mt-6 lg:-mt-10")}>
      {place === 1 && (
        <div className="mb-2">
          <Star className="w-6 h-6 text-gold fill-gold" />
        </div>
      )}
      {place !== 1 && (
        <div className="mb-2">
          <Trophy className={cn("w-5 h-5", place === 2 ? "text-muted-foreground" : "text-streak")} />
        </div>
      )}
      <div className={cn("rounded-full ring-4 flex items-center justify-center bg-secondary text-foreground font-bold text-lg", sizes[place], ringColors[place])}>
        {entry.name.slice(0, 2).toUpperCase()}
      </div>
      <p className="font-bold text-foreground mt-2 text-sm lg:text-base">{entry.name}</p>
      {place === 1 && (
        <span className="text-xs font-bold bg-primary/20 text-primary border border-primary/30 rounded-full px-2 py-0.5 mt-1">
          {entry.title}
        </span>
      )}
      <p className={cn("text-sm font-mono font-bold mt-1", place === 1 ? "text-primary" : place === 3 ? "text-streak" : "text-muted-foreground")}>
        {entry.xp.toLocaleString()} XP
      </p>
    </div>
  )
}

/* -------- Table Row -------- */
function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  return (
    <div
      className={cn(
        "grid grid-cols-[3rem_1fr_auto_auto] lg:grid-cols-[4rem_1fr_8rem_6rem] items-center gap-3 px-4 py-3 border-b border-border last:border-0",
        entry.isYou && "bg-primary/10 border-primary/20"
      )}
    >
      <span className={cn("text-sm font-mono font-bold text-center", entry.isYou ? "text-primary" : "text-muted-foreground")}>
        {entry.rank}
      </span>
      <div className="flex items-center gap-3 min-w-0">
        <UserAvatar name={entry.name} size="sm" online={!entry.isYou} />
        <div className="min-w-0">
          <p className={cn("text-sm font-semibold truncate", entry.isYou ? "text-primary" : "text-foreground")}>
            {entry.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            Lvl {entry.level} &middot; {entry.title}
          </p>
        </div>
      </div>
      <span className={cn("text-sm font-mono text-right", entry.isYou ? "text-primary" : "text-foreground")}>
        {entry.xp.toLocaleString()}
      </span>
      <span className="text-sm font-mono text-right text-streak">
        {entry.streak} <Flame className="w-3.5 h-3.5 inline" />
      </span>
    </div>
  )
}

/* -------- Main Content -------- */
export function LeaderboardContent() {
  const [tab, setTab] = useState<"weekly" | "alltime">("weekly")

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold text-foreground">Global Leaderboard</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-lg">
            Compete with the top developers worldwide. Earn XP, maintain your streak, and claim your spot on the podium.
          </p>
        </div>
        <div className="flex items-center bg-secondary rounded-lg p-1">
          <button
            onClick={() => setTab("weekly")}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              tab === "weekly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Weekly
          </button>
          <button
            onClick={() => setTab("alltime")}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              tab === "alltime" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-6 lg:gap-12 mb-12 pt-8">
        {podiumData.map((entry) => (
          <PodiumPlace key={entry.rank} entry={entry} place={entry.rank as 1 | 2 | 3} />
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[3rem_1fr_auto_auto] lg:grid-cols-[4rem_1fr_8rem_6rem] items-center gap-3 px-4 py-3 border-b border-border bg-secondary/50">
          <span className="text-xs uppercase text-muted-foreground font-semibold text-center">#</span>
          <span className="text-xs uppercase text-muted-foreground font-semibold">Developer</span>
          <span className="text-xs uppercase text-muted-foreground font-semibold text-right">XP</span>
          <span className="text-xs uppercase text-muted-foreground font-semibold text-right">Streak</span>
        </div>
        {tableData.map((entry) => (
          <LeaderboardRow key={entry.rank} entry={entry} />
        ))}
        {/* Your position */}
        <LeaderboardRow entry={currentUser} />
      </div>
    </div>
  )
}
