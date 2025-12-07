"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function TrackHistory() {
  const logs = [
    { date: "23-11-2025", day: 12, activity: "Mengerjakan UI Dashboard VINS...", lesson: "Komponen reusable & API flow..." },
    { date: "22-11-2025", day: 11, activity: "Membuat halaman Track & Input...", lesson: "Belajar handling form state..." },
    { date: "21-11-2025", day: 10, activity: "Rapat dengan mentor...", lesson: "Cara menyusun laporan kerja..." },
    { date: "20-11-2025", day: 9, activity: "Research animasi framer-motion...", lesson: "Optimasi animasi..." },
    { date: "19-11-2025", day: 8, activity: "Membuat hero section...", lesson: "Gradient & layouting..." },
  ];

  const [search, setSearch] = useState("");
  const [filterDay, setFilterDay] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 4;
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.activity.toLowerCase().includes(search.toLowerCase()) ||
        log.lesson.toLowerCase().includes(search.toLowerCase());
      const matchesDay = filterDay ? log.day === Number(filterDay) : true;
      return matchesSearch && matchesDay;
    });
  }, [search, filterDay, logs]);

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <section className="relative text-white py-32 px-6 overflow-hidden">

      {/* Decorative faint orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute left-[-180px] top-20 w-[400px] h-[400px] bg-fuchsia-500 blur-[200px] rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold text-center"
        >
          Riwayat{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Track Harian
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          className="text-gray-400 text-center mt-3 mb-12"
        >
          Kelola dan lihat seluruh catatan aktivitas magangmu dengan mudah.
        </motion.p>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Cari aktivitas atau pelajaran..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-600 outline-none"
          />

          <select
            value={filterDay}
            onChange={(e) => setFilterDay(e.target.value)}
            className="w-full md:w-48 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-fuchsia-500 outline-none"
          >
            <option value="">Filter Day</option>
            {[...new Set(logs.map((log) => log.day))].map((day) => (
              <option key={day} value={day}>
                Hari ke-{day}
              </option>
            ))}
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl">
          <table className="w-full text-sm text-gray-200">
            <thead className="bg-white/10 text-gray-300">
              <tr>
                <th className="px-6 py-4 font-semibold">Tanggal</th>
                <th className="px-6 py-4 font-semibold">Day</th>
                <th className="px-6 py-4 font-semibold">Aktivitas</th>
                <th className="px-6 py-4 font-semibold">Pelajaran</th>
                <th className="px-6 py-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {paginatedLogs.length > 0 ? (
                paginatedLogs.map((log, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-white/10 hover:bg-white/10 transition cursor-pointer"
                  >
                    <td className="px-6 py-4">{log.date}</td>
                    <td className="px-6 py-4">Hari ke-{log.day}</td>
                    <td className="px-6 py-4">{log.activity}</td>
                    <td className="px-6 py-4">{log.lesson}</td>
                    <td className="px-6 py-4 text-center">
                      <a
                        href={`/track/detail/${index}`}
                        className="px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-lg hover:scale-105 transition"
                      >
                        Lihat
                      </a>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400 italic">
                    Tidak ada data ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10 text-gray-300">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`px-4 py-2 rounded-lg border border-white/20 ${
                page === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-white/10"
              } transition`}
            >
              Prev
            </button>

            <span>Halaman {page} dari {totalPages}</span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className={`px-4 py-2 rounded-lg border border-white/20 ${
                page === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-white/10"
              } transition`}
            >
              Next
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
