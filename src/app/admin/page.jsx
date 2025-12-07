"use client";
import { motion } from "framer-motion";
import {
  CalendarDays, FolderKanban, Image, FileText
} from "lucide-react";

export default function DashboardPage() {

  const stats = [
    { label: "Day Ke-", value: "27", icon: CalendarDays },
    { label: "Total Track Berjalan", value: "143", icon: FolderKanban },
    { label: "Total Dokumentasi", value: "322", icon: Image },
    { label: "Total Logbook", value: "27", icon: FileText },
  ];

  return (
    <div className="space-y-10">

      {/* Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.25 }}
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <item.icon className="w-10 h-10 text-violet-300" />
              <div>
                <p className="text-sm text-gray-400">{item.label}</p>
                <h3 className="text-3xl font-bold">{item.value}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
