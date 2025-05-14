import { DashboardNavbar } from "@/components/fojb/dashboard-navbar"
import { DashboardSidebar } from "@/components/fojb/dashboard-sidebar"
import { DashboardContent } from "@/components/fojb/dashboard-content"

export default function Page() {
  return (
    <div className="flex h-screen bg-muted">
      <DashboardSidebar />
      <div className="flex flex-col flex-1">
        <DashboardNavbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <DashboardContent />
        </main>
      </div>
    </div>
  )
}
