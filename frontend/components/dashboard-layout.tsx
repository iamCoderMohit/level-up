"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { UserAvatar } from "@/components/user-avatar"
import { Bell, Menu } from "lucide-react"
import { useState } from "react"
import { useAuthStore } from "../store/authStore"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = useAuthStore((state) => state.user)

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar for mobile */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 border-b border-border bg-background/95 backdrop-blur lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-muted-foreground hover:text-foreground"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
              L
            </div>
            <span className="font-bold text-foreground text-sm">
              LEVEL<span className="text-primary">-UP</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <UserAvatar name={user?.username} size="sm" />
          </div>
        </header>

        {/* Desktop top bar */}
        <header className="hidden lg:flex items-center justify-end h-14 px-6 border-b border-border">
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
            <UserAvatar name={user?.username} size="sm" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
