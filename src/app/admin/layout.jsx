"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, ClipboardCheck, User2, CalendarDays,
  FileText, Settings, Accessibility, LogOut, Bell
} from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [showNotif, setShowNotif] = useState(false);

  const formattedTitle = (() => {
    const p = pathname.split("/").pop();
    if (!p || p === "admin") return "Dashboard";
    return p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, " ");
  })();

  const menuItems = [
    {
      section: "Menu Utama",
      items: [
        { href: "/admin", label: "Dashboard", icon: Home },
        { href: "/admin/track", label: "Track Harian", icon: ClipboardCheck },
        { href: "/admin/akun", label: "Akun", icon: User2 },
        { href: "/admin/kalender", label: "Kalender", icon: CalendarDays },
        { href: "/admin/logbook", label: "Logbook", icon: FileText },
      ],
    },
    {
      section: "Pengaturan",
      items: [
        { href: "/admin/pengaturan-akun", label: "Pengaturan Akun", icon: Settings },
        { href: "/admin/aksesbilitas", label: "Aksesibilitas", icon: Accessibility },
      ],
    },
  ];

  const notifications = [
    { id: 1, msg: "Track harian baru diunggah.", time: "Baru saja" },
    { id: 2, msg: "Logbook minggu ini belum diperiksa.", time: "1 jam lalu" },
  ];

  return (
    <div className="w-full min-h-screen flex bg-[#0b0f15] text-gray-100">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-72 h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            VINS Admin
          </h1>
          <p className="text-xs text-gray-400">Control Panel Sistem</p>
        </div>

        <div className="flex-1 px-6 py-4 overflow-y-auto">
          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-7">
              <p className="text-[11px] text-gray-400 tracking-wider uppercase mb-2">{section.section}</p>
              <ul className="space-y-1.5">
                {section.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition
                        ${active ? "bg-white/10 border border-violet-500/40 text-violet-400 shadow-[0_0_8px_rgba(168,85,247,0.2)]" : "text-gray-300 hover:bg-white/5"}`}
                      >
                        <item.icon size={18} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-white/10">
          <button className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm">
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="ml-72 flex-1 flex flex-col">

        {/* Top Header */}
        <header className="
          sticky top-0 flex items-center justify-between z-50
          px-10 py-4 bg-white/10 backdrop-blur-2xl
          border-b border-white/10 shadow-[0_0_20px_rgba(139,92,246,0.08)]
        ">
          <h2 className="text-lg font-semibold">{formattedTitle}</h2>

          {/* notif + profile */}
          <div className="flex items-center gap-6">
            {/* Notif */}
            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)} className="hover:text-violet-400 transition relative">
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-fuchsia-500 rounded-full" />
              </button>

              {showNotif && (
                <div className="absolute right-0 mt-3 w-72 p-4 rounded-xl bg-[#131822]/95 border border-white/10 backdrop-blur-xl shadow-xl">
                  {notifications.map((n) => (
                    <div key={n.id} className="mb-3 last:mb-0">
                      <p className="text-sm text-gray-200">{n.msg}</p>
                      <span className="text-xs text-gray-400">{n.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profil */}
            <div className="flex items-center gap-2">
              <img src="/avatar.jpg" className="w-9 h-9 rounded-full border border-white/20" />
              <span className="text-sm">Admin</span>
            </div>
          </div>
        </header>

        {/* Halaman Konten */}
        <div className="flex-1 p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
            {children}
          </div>
        </div>

      </main>
    </div>
  );
}
