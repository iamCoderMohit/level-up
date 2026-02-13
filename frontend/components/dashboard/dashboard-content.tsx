"use client";

import { UserAvatar } from "@/components/user-avatar";
import { XPProgressBar } from "@/components/xp-progress-bar";
import { StatusBadge } from "@/components/status-badge";
import { QuestCard } from "@/components/quest-card";
import { AchievementBadge } from "@/components/achievement-badge";
import {
  Flame,
  Zap,
  Code2,
  Terminal,
  CheckCircle,
  Star,
  Bug,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../../lib/axios";
import { useAuthStore } from "../../store/authStore";

/* -------- Profile Card -------- */
function ProfileCard() {
  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        useAuthStore.getState().setUser(res.data.data);
      })
      .catch(() => {
        useAuthStore.getState().setUser(null);
      });
  }, []);

  //fetcch the level from backedn
  const [currentLevel, setCurrentLevel] = useState(0);
  useEffect(() => {
    api.get("/auth/currentLevel").then((res) => {
      setCurrentLevel(res.data.data);
    });
  }, []);

  const [currentPath, setCurrentPath] = useState("None");
  useEffect(() => {
    api.get("/path/getCurrentPath").then((res) => {
      setCurrentPath(res.data.data.pathName);
    });
  }, []);

  const user = useAuthStore((state) => state.user);

  return (
    <div className="rounded-xl border border-border bg-card p-4 lg:p-5">
      <div className="flex items-center gap-4">
        <UserAvatar
          name={user?.username || "User"}
          level={currentLevel || "0"}
          size="lg"
          showLevel
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-bold text-foreground">
              {user?.username}
            </h2>
            <StatusBadge variant="pro" />
          </div>
          <p className="text-sm text-muted-foreground">{currentPath}</p>
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">XP Progress</span>
              <span className="text-xs font-mono text-primary">
                {currentLevel * 100} / 5,00 XP
              </span>
            </div>
            <XPProgressBar
              current={currentLevel * 100}
              max={500}
              showLabel={false}
              size="md"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {500 - currentLevel * 100} XP needed to reach Level{" "}
              {currentLevel + 1}. {"You're"} crushing it!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------- Streak Card -------- */
function StreakCard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="rounded-xl bg-gradient-to-br from-streak/90 to-orange-700 p-4 lg:p-5 text-foreground relative overflow-hidden">
      <Flame className="absolute top-3 right-3 w-10 h-10 text-foreground/20" />
      <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
        Current Streak
      </p>
      <p className="text-4xl font-bold mt-1">{user?.currentStreak}</p>
      <p className="text-sm text-foreground/80">Days</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-foreground/80">
          Longest: {user?.longestStreak} Days
        </span>
        <span className="bg-foreground/20 text-foreground text-xs font-bold px-2 py-0.5 rounded">
          +10 XP Bonus
        </span>
      </div>
    </div>
  );
}

/* -------- Daily Quests -------- */
interface DailyQuestItem {
  title: string;
  xp: number;
  completed: boolean;
  progress?: string;
}

const dailyQuests: DailyQuestItem[] = [
  { title: "Solve 1 Algorithm", xp: 50, completed: true },
  {
    title: "Review 5 Code Snippets",
    xp: 30,
    completed: false,
    progress: "0/5",
  },
  { title: "Complete Quiz: CSS Grid", xp: 100, completed: false },
];

function DailyQuestsPanel() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 lg:p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground">Daily Quests</h3>
        <span className="text-xs text-muted-foreground">Resets in 4h</span>
      </div>
      <div className="flex flex-col gap-3">
        {dailyQuests.map((quest) => (
          <div key={quest.title} className="flex items-start gap-3">
            <div
              className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${quest.completed ? "bg-success border-success" : "border-border"}`}
            >
              {quest.completed && (
                <CheckCircle className="w-3.5 h-3.5 text-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-sm ${quest.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
                >
                  {quest.title}
                </span>
                {quest.progress && (
                  <span className="text-xs text-muted-foreground">
                    {quest.progress}
                  </span>
                )}
              </div>
              <span className="text-xs text-primary font-semibold">
                +{quest.xp} XP
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------- Latest Badges -------- */
function LatestBadges() {
  const badges = [
    {
      icon: <Bug className="w-5 h-5 text-emerald-400" />,
      bg: "bg-emerald-500/20",
    },
    { icon: <Zap className="w-5 h-5 text-primary" />, bg: "bg-primary/20" },
    { icon: <Star className="w-5 h-5 text-gold" />, bg: "bg-gold/20" },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-4 lg:p-5">
      <h3 className="font-bold text-foreground mb-3">Latest Badges</h3>
      <div className="flex items-center gap-3">
        {badges.map((badge, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${badge.bg}`}
          >
            {badge.icon}
          </div>
        ))}
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs text-muted-foreground font-medium">
          +3
        </div>
      </div>
    </div>
  );
}

/* -------- Main Dashboard -------- */
export function DashboardContent() {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(true);

  console.log(user?.totalXp)

function getSlug() {
  const xp = user?.totalXp;

  if (xp == null) return undefined;

  if (xp <= 1000) return "frontend";
  if (xp <= 2000) return "backend";
  return "fullstack";
}

  const slug = getSlug();
  const [levels, setLevels] = useState([]);
  useEffect(() => {
    if(!slug) return
    setLoading(true);
    api.get(`/path/${slug}/level`).then((res) => {
      setLevels(res.data.data);
      setLoading(false);
    });
  }, [slug]);

  function getLevelProgress(totalXp: number, levelIndex: number) {
    const XP_PER_TASK = 100;
const TASKS_PER_LEVEL = 5;
const XP_PER_LEVEL = XP_PER_TASK * TASKS_PER_LEVEL; // 500

  const levelStartXp = levelIndex * XP_PER_LEVEL;
  const levelEndXp = levelStartXp + XP_PER_LEVEL;

  if (totalXp <= levelStartXp) return 0;

  const xpInsideLevel = Math.min(totalXp, levelEndXp) - levelStartXp;

  return Math.floor((xpInsideLevel / XP_PER_LEVEL) * 100);
}


  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          Command Center
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back, Developer. Your stats are looking strong today.
        </p>
      </div>

      {/* Top Row: Profile + Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="lg:col-span-2">
          <ProfileCard />
        </div>
        <StreakCard />
      </div>

      {/* Active Quests + Right Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Active Quests</h2>
            <Link
              href="/paths"
              className="text-sm text-primary hover:underline"
            >
              View All Paths &rarr;
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {!loading &&
              levels.levels.map((level, index) => (
                <QuestCard
                  title={level.title}
                  description={level.description}
                  module={`${index + 1} / 2`}
                  progress={getLevelProgress(user?.totalXp!, level.order - 1)}
                  status={"active"}
                  actionLabel={
                    user?.totalXp! >= level.requiredXp ? "Done" : "Resume"
                  }
                  icon={<Code2 className="w-6 h-6 text-primary" />}
                  iconBg="bg-primary/10"
                />
              ))}
              {loading && <div className="flex flex-col gap-4">
                            <QuestCard
              title="Loading your quests"
              description="Master modern React with Hooks, Context API, and Redux. Build real-world applications."
              module="Module 4/12: Advanced Hooks"
              progress={65}
              status="active"
              actionLabel="Resume"
              icon={<Code2 className="w-6 h-6 text-primary" />}
              iconBg="bg-primary/10"
            />
            <QuestCard
              title="Hang on blud"
              description="Build scalable APIs with FastAPI, manage PostgreSQL databases, and deploy to AWS."
              module="Module 2/10: Async Functions"
              progress={12}
              status="paused"
              icon={<Terminal className="w-6 h-6 text-amber-400" />}
              iconBg="bg-amber-500/10"
            />
              </div>}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <DailyQuestsPanel />
          <LatestBadges />
        </div>
      </div>
    </div>
  );
}
