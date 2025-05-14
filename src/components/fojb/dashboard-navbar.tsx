"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell } from "lucide-react"

export function DashboardNavbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div>
        <h1 className="text-xl font-bold">Halo, Bara 👋</h1>
        <p className="text-sm text-muted-foreground">
          Selamat datang di Website Forum OSIS Jawa Barat.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-muted-foreground" />
        <Avatar>
          <AvatarFallback>DF</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
