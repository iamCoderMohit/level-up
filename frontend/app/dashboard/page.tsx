import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export const metadata = {
  title: "Dashboard | Level-Up",
  description: "Your command center for tracking progress, quests, and streaks.",
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  )
}
