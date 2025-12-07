"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, FolderKanban, Image, FileText } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadStats() {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    }
    loadStats();
  }, []);

  if (!stats) return <p className="text-gray-600">Loading...</p>;

  const metrics = [
    { label: "Day Ke-", value: stats.day, icon: CalendarDays },
    { label: "Total Track Berjalan", value: stats.totalTrack, icon: FolderKanban },
    { label: "Total Dokumentasi", value: stats.totalDocs, icon: Image },
    { label: "Total Logbook", value: stats.totalLogbook, icon: FileText },
  ];

  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {metrics.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.25 }}
            className="p-6 rounded-2xl bg-white border border-blue-100 shadow-lg hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4">
              <item.icon className="w-10 h-10 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">{item.label}</p>
                <h3 className="text-3xl font-extrabold text-gray-900">{item.value}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
