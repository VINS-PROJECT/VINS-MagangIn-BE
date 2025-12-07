"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Award,
  Settings,
  LogOut,
  Bell,
  FileText,
  Star,
  Briefcase,
  BadgeCheck,
  ClipboardList,
  MessageSquare,
  Users,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [showNotif, setShowNotif] = useState(false);

  const pengumuman = [
    { id: 1, judul: "Batch 2 Dibuka!", tanggal: "15 Okt 2025" },
    { id: 2, judul: "Perubahan Jadwal Wawancara", tanggal: "10 Okt 2025" },
  ];

  const menuItems = [
    {
      section: "Utama",
      items: [
        { href: "/dashboard", label: "Beranda", icon: Home },
        { href: "/dashboard/lowongan", label: "Lowongan Pekerjaan", icon: Briefcase },
      ],
    },
    {
      section: "Informasi Akun",
      items: [
        { href: "/dashboard/akun", label: "Informasi Akun", icon: Settings },
        { href: "/dashboard/status", label: "Status Lamaran", icon: FileText },
      ],
    },
    {
      section: "Profil Saya",
      items: [
        { href: "/dashboard/identitas", label: "Identitas Diri", icon: User },
        { href: "/dashboard/keahlian", label: "Keahlian Diri", icon: Star },
        { href: "/dashboard/penghargaan", label: "Penghargaan", icon: Award },
        { href: "/dashboard/pratayang-id", label: "Pratayang ID", icon: BadgeCheck },
      ],
    },
    {
      section: "Report Magang",
      items: [
        {
          href: "/dashboard/laporan-mingguan",
          label: "Laporan Mingguan",
          icon: ClipboardList,
        },
        {
          href: "/dashboard/feedback-magang",
          label: "Feedback Magang",
          icon: MessageSquare,
        },
        {
          href: "/dashboard/feedback-mentor",
          label: "Feedback Mentor",
          icon: Users,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#0b0f15] text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-72 sticky top-0 h-screen bg-white dark:bg-[#141a23] border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between shadow-md">
        <div className="p-6 overflow-y-auto">
          <h1 className="text-xl font-bold mb-8 text-blue-600 dark:text-blue-400">
            MagangHub
          </h1>

          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                {section.section}
              </h3>
              <ul className="space-y-1.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        pathname === item.href
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-100 dark:border-gray-800">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Konten utama */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-10 py-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#141a23]/80 backdrop-blur-md">
          <h2 className="font-semibold text-lg capitalize">
            {pathname.split("/").pop() || "Dashboard Peserta"}
          </h2>

          <div className="flex items-center gap-6">
            {/* Notifikasi */}
            <div className="relative">
              <button
                onClick={() => setShowNotif(!showNotif)}
                className="relative"
              >
                <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              </button>
              {showNotif && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#1a1f2b] border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 p-3">
                  <h4 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-300">
                    Notifikasi
                  </h4>
                  {pengumuman.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition"
                    >
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {notif.judul}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {notif.tanggal}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profil user */}
            <div className="flex items-center gap-3">
              <img
                src="/avatar.jpg"
                alt="User"
                className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700"
              />
              <span className="text-sm font-medium">Kevin Simorangkir</span>
            </div>
          </div>
        </header>

        {/* Halaman konten */}
        <div className="flex-1 p-10 overflow-y-auto bg-gray-50 dark:bg-[#0b0f15]">
          <div className="max-w-5xl mx-auto bg-white dark:bg-[#141a23] p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
