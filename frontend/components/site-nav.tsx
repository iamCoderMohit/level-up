"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { Zap, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../lib/axios";
import { useAuthStore } from "../store/authStore";

interface NavLink {
  label: string;
  href: string;
}

interface SiteNavProps {
  links: NavLink[];
  showXP?: boolean;
  xp?: number;
  level?: number;
  showStreak?: boolean;
  streak?: number;
  showGitHub?: boolean;
  variant?: "landing" | "app";
}

export function SiteNav({
  links,
  showXP = false,
  xp,
  level,
  showStreak = false,
  streak,
  showGitHub = true,
  variant = "app",
}: SiteNavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);

  async function handleGithub() {
    setLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/github`;
  }

  const [currentLevel, setCurrentLevel] = useState(0);
  useEffect(() => {
    api.get("/auth/currentLevel").then((res) => {
      setCurrentLevel(res.data.data);
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            L
          </div>
          <span className="font-bold text-foreground text-lg">
            Level<span className="text-primary">-Up</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        {user && (
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === link.href
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {showStreak && streak !== undefined && (
            <div className="hidden sm:flex items-center gap-1.5 text-sm">
              <Zap className="w-4 h-4 text-streak" />
              <span className="text-foreground font-medium">
                {user?.currentStreak} Day Streak
              </span>
            </div>
          )}
          {showXP && xp !== undefined && (
            <div className="hidden sm:flex items-center gap-1.5 bg-secondary rounded-full px-3 py-1.5">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {`Lvl ${currentLevel.currentLevel}`},
                {level !== undefined && xp !== undefined && " "}
                {xp !== undefined && `${user?.totalXp.toLocaleString()} XP`}
              </span>
            </div>
          )}
          {showGitHub && !user && (
            <button
              onClick={handleGithub}
              className="hidden sm:flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-full px-4 py-1.5 text-sm font-medium transition-colors border border-border"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              {loading ? "Redirecting..." : "Connect Github"}
            </button>
          )}
          {user && <UserAvatar name={user?.username} size="sm" />}
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background p-4">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                )}
              >
                {link.label}
              </Link>
            ))}
            {showStreak && streak !== undefined && (
              <div className="flex items-center gap-1.5 px-3 py-2 text-sm sm:hidden">
                <Zap className="w-4 h-4 text-streak" />
                <span className="text-foreground font-medium">
                  {user?.currentStreak} Day Streak
                </span>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
