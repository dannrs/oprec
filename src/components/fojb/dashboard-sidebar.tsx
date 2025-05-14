"use client"

import { Home, FileText, MessageCircle, Image, Clock } from "lucide-react"
import Link from "next/link"

export function DashboardSidebar() {
  return (
    <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between h-screen">
      <div>
        <div className="font-bold text-lg mb-10">🟦 FOJB</div>
        <nav className="space-y-5">
          <SidebarLink icon={<Home size={18} />} label="Home" href="/fojb" />
          <SidebarLink icon={<FileText size={18} />} label="Informasi Data" href="/fojb/informasi-data" />
          {/* <SidebarLink icon={<MessageCircle size={18} />} label="Pengumuman Seleksi Anggota" href="#" /> */}
          <SidebarLink icon={<Image size={18} />} label="Twibbon" href="/fojb/twibbon" />
          <SidebarLink icon={<Clock size={18} />} label="Upload Bukti Twibbon" href="/fojb/pengumpulan-twibbon" />
        </nav>
      </div>

      {/* Copyright Section */}
      <div className="text-xs text-gray-500 text-left pt-6 border-t mt-6">
        <p className="leading-snug">
          Copyright ©2025<br />
          Forum OSIS Jawa Barat
        </p>
      </div>
    </aside>
  )
}

function SidebarLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 text-sm text-gray-700 hover:text-black">
      {icon}
      {label}
    </Link>
  )
}
