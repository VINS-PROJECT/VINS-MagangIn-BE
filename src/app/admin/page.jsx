"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CalendarDays,
  FolderKanban,
  Image as ImageIcon,
  FileText,
  PlusCircle,
  NotebookPen,
  Calendar,
  Activity,
} from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats", { cache: "no-store" });
        const data = await res.json();
        setStats(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="
              h-28 rounded-2xl
              bg-white/60 backdrop-blur-xl
              border border-white/40
              animate-pulse
            "
          />
        ))}
      </div>
    );
  }

  /* ================= METRICS ================= */
  const metrics = [
    { label: "Hari Ke-", value: stats?.day ?? "-", icon: CalendarDays },
    {
      label: "Track Berjalan",
      value: stats?.totalTrack ?? 0,
      icon: FolderKanban,
    },
    {
      label: "Dokumentasi",
      value: stats?.totalDocs ?? 0,
      icon: ImageIcon,
    },
    {
      label: "Logbook",
      value: stats?.totalLogbook ?? 0,
      icon: FileText,
    },
  ];

  const completedTrack = stats?.completedTrack ?? 0;
  const weekProgress = Math.min(
    Math.round((completedTrack / 7) * 100),
    100
  );

  const recentActivity = stats?.recent ?? [];

  return (
    <div className="space-y-12">

      {/* ================= METRICS ================= */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {metrics.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="
              relative p-6 rounded-2xl
              bg-white/80 backdrop-blur-xl
              border border-blue-200/50
              shadow-[0_12px_36px_rgba(0,0,0,0.08)]
              hover:shadow-[0_20px_50px_rgba(37,99,235,0.18)]
              transition
            "
          >
            <div className="absolute inset-0 rounded-2xl
              bg-gradient-to-br from-blue-500/5 to-sky-400/5" />

            <div className="relative flex items-center gap-4">
              <div
                className="
                  flex items-center justify-center
                  w-12 h-12 rounded-xl
                  bg-gradient-to-br from-blue-600 to-sky-500
                  text-white
                  shadow-md
                "
              >
                <item.icon className="w-6 h-6" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500">
                  {item.label}
                </p>
                <h3 className="text-3xl font-extrabold text-slate-900">
                  {item.value}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ================= MIDDLE GRID ================= */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* PROGRESS */}
        <div
          className="
            p-6 rounded-2xl
            bg-white/80 backdrop-blur-xl
            border border-blue-200/50
            shadow-[0_10px_30px_rgba(0,0,0,0.06)]
          "
        >
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Progress Mingguan
          </h3>

          <div className="space-y-4">
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="
                  h-full
                  bg-gradient-to-r from-blue-600 to-sky-500
                  transition-all
                "
                style={{ width: `${weekProgress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">
                {completedTrack}/7 track selesai
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    weekProgress >= 100
                      ? "bg-green-100 text-green-700"
                      : weekProgress >= 60
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {weekProgress >= 100
                  ? "Selesai"
                  : weekProgress >= 60
                  ? "On Track"
                  : "Perlu Perhatian"}
              </span>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div
          className="
            lg:col-span-2 p-6 rounded-2xl
            bg-white/80 backdrop-blur-xl
            border border-blue-200/50
            shadow-[0_10px_30px_rgba(0,0,0,0.06)]
          "
        >
          <h3 className="font-semibold text-slate-800 mb-5">
            Aksi Cepat
          </h3>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                label: "Tambah Track",
                href: "/admin/track/tambah",
                icon: PlusCircle,
              },
              {
                label: "Buat Logbook",
                href: "/admin/logbook/tambah",
                icon: NotebookPen,
              },
              {
                label: "Kalender",
                href: "/admin/kalender",
                icon: Calendar,
              },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="
                  flex items-center gap-3 p-4 rounded-xl
                  bg-white border border-blue-200/60
                  hover:bg-blue-50
                  hover:shadow-md
                  transition
                  text-sm font-semibold
                "
              >
                <item.icon className="w-5 h-5 text-blue-600" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ================= RECENT ACTIVITY ================= */}
      <div
        className="
          p-6 rounded-2xl
          bg-white/80 backdrop-blur-xl
          border border-blue-200/50
          shadow-[0_10px_30px_rgba(0,0,0,0.06)]
        "
      >
        <h3 className="font-semibold text-slate-800 mb-4">
          Aktivitas Terakhir
        </h3>

        {recentActivity.length === 0 ? (
          <p className="text-sm text-slate-500">
            Belum ada aktivitas terbaru.
          </p>
        ) : (
          <ul className="space-y-3 text-sm">
            {recentActivity.map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center text-slate-600"
              >
                <span className="truncate">{item.title}</span>
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {item.date}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
