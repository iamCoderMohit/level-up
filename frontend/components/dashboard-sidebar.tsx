"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, TrendingUp, Trophy, User, MessageSquare, LogOut, X } from "lucide-react"

interface SidebarLink {
  label: string
  href: string
  icon: React.ReactNode
}

interface GuildItem {
  name: string
  tag: string
  color: string
  online?: boolean
}

interface DashboardSidebarProps {
  open?: boolean
  onClose?: () => void
}

const navLinks: SidebarLink[] = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Skill Paths", href: "/paths", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "Leaderboard", href: "/leaderboard", icon: <Trophy className="w-5 h-5" /> },
  { label: "Profile", href: "/profile", icon: <User className="w-5 h-5" /> },
  { label: "Guild Chat", href: "/chat", icon: <MessageSquare className="w-5 h-5" /> },
]

const guilds: GuildItem[] = [
  { name: "JS Wizards", tag: "JS", color: "bg-amber-600", online: true },
  { name: "Rustacean Order", tag: "RS", color: "bg-orange-700" },
]

export function DashboardSidebar({ open = false, onClose }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-60 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              L
            </div>
            <span className="font-bold text-sidebar-foreground text-lg">
              LEVEL<span className="text-primary">-UP</span>
            </span>
          </Link>
          <button
            className="lg:hidden p-1 text-muted-foreground hover:text-foreground"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Guilds */}
          <div className="mt-8">
            <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Your Guild
            </p>
            <div className="flex flex-col gap-1">
              {guilds.map((guild) => (
                <div
                  key={guild.name}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
                >
                  <div className={cn("w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-foreground", guild.color)}>
                    {guild.tag}
                  </div>
                  <span>{guild.name}</span>
                  {guild.online && (
                    <span className="w-2 h-2 rounded-full bg-success ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-sidebar-border">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors w-full">
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>
      </aside>
    </>
  )
}
