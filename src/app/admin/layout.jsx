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
    <div className="w-full min-h-screen flex bg-[#f8fafc] text-gray-900">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-72 h-screen bg-white border-r border-blue-100 shadow-md flex flex-col">
        <div className="p-6 border-b border-blue-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            VINS Admin
          </h1>
          <p className="text-xs text-gray-600">Control Panel Sistem</p>
        </div>

        <div className="flex-1 px-6 py-4 overflow-y-auto">
          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-7">
              <p className="text-[11px] text-gray-500 tracking-wider uppercase mb-2 font-semibold">
                {section.section}
              </p>
              <ul className="space-y-1.5">
                {section.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition font-medium
                        ${
                          active
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-blue-50"
                        }`}
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

        <div className="p-6 border-t border-blue-100">
          <button
  className="flex items-center gap-2 text-red-500 hover:text-red-400 text-sm"
  onClick={async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }}
>
  <LogOut size={18} /> Keluar
</button>

        </div>
      </aside>

      {/* CONTENT */}
      <main className="ml-72 flex-1 flex flex-col">

        {/* Top Header */}
        <header
          className="sticky top-0 flex items-center justify-between z-50
          px-10 py-4 bg-white border-b border-blue-100 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            {formattedTitle}
          </h2>

          {/* notif + profile */}
          <div className="flex items-center gap-6">
            {/* Notif */}
            <div className="relative">
              <button
                onClick={() => setShowNotif(!showNotif)}
                className="hover:text-blue-600 transition relative"
              >
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
              </button>

              {showNotif && (
                <div className="absolute right-0 mt-3 w-72 p-4 rounded-xl bg-white border border-blue-100 shadow-xl">
                  {notifications.map((n) => (
                    <div key={n.id} className="mb-3 last:mb-0">
                      <p className="text-sm text-gray-900 font-medium">{n.msg}</p>
                      <span className="text-xs text-gray-600">{n.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2">
              <img
                src="/avatar.jpg"
                className="w-9 h-9 rounded-full border border-blue-200"
              />
              <span className="text-sm font-medium text-gray-800">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-10 bg-white border border-blue-100 rounded-2xl shadow-md">
            {children}
          </div>
        </div>

      </main>
    </div>
  );
}
