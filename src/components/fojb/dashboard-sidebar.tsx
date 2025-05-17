"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, FileText, Image as ImageIcon, Settings, User, Key} from "lucide-react"
import Link from "next/link"
import clsx from "clsx"
import { useState } from "react"

export function DashboardSidebar() {
  return (
    <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between h-screen">
      <div>
        {/* Logo naik ke atas (margin-bottom lebih kecil) */}
        <div className="flex items-center gap-2 mb-6">
          <Image src="/logo.png" alt="FOJB Logo" width={52} height={52} className="rounded-sm" />
        </div>
        <nav className="space-y-2">
          <SidebarLink icon={<Home size={18} />} label="Home" href="/fojb" />
          <SidebarLink icon={<FileText size={18} />} label="Informasi Data" href="/fojb/informasi-data" />
          <SidebarLink icon={<ImageIcon size={18} />} label="Twibbon" href="/fojb/twibbon" />
          <SettingMenu />
        </nav>
      </div>

      <div className="text-xs text-gray-500 text-left pt-6 border-t mt-6">
        <p className="leading-snug">
          Copyright ©2025<br />
          Forum OSIS Jawa Barat
        </p>
      </div>
    </aside>
  )
}

function SidebarLink({ icon, label, href, className }: { icon: React.ReactNode; label: string; href: string; className?: string }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-3 text-sm rounded-md px-3 py-2 transition-colors",
        isActive
          ? "bg-green-100 text-green-700 font-semibold"
          : "text-gray-700 hover:bg-green-50 hover:text-green-700",
        className
      )}
    >
      {icon}
      {label}
    </Link>
  )
}

function SettingMenu() {
  const pathname = usePathname()
  const [open, setOpen] = useState(true) // default buka menu Setting

  // cek jika aktif ada di salah satu halaman Setting atau submenu-nya
  const isActive = ["/fojb/setting-user", "/fojb/profile", "/fojb/change-password"].includes(pathname)

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          "flex items-center gap-3 text-sm rounded-md px-3 py-2 w-full text-left transition-colors",
          isActive
            ? "bg-green-100 text-green-700 font-semibold"
            : "text-gray-700 hover:bg-green-50 hover:text-green-700"
        )}
      >
        <Settings size={18} />
        <span>Setting</span>
        <svg
          className={clsx("ml-auto h-4 w-4 transition-transform duration-200", open ? "rotate-180" : "")}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="ml-7 mt-1 flex flex-col space-y-1">
          <SidebarLink
            href="/fojb/profile"
            label="Profile"
            icon={<User size={16} />}
            className={clsx(
              pathname === "/fojb/profile" ? "font-semibold text-green-700" : "text-gray-700 hover:text-green-700"
            )}
          />
          <SidebarLink
            href="/fojb/change-password"
            label="Change Password"
            icon={<Key size={16} />}
            className={clsx(
              pathname === "/fojb/change-password" ? "font-semibold text-green-700" : "text-gray-700 hover:text-green-700"
            )}
          />
        </div>
      )}
    </div>
  )
}
