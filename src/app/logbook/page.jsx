"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

const logbookData = [
  { day: 1, date: "12-11-2025", pdfUrl: "/logbook/day1.pdf" },
  { day: 2, date: "13-11-2025", pdfUrl: "/logbook/day2.pdf" },
  { day: 3, date: "14-11-2025", pdfUrl: "/logbook/day3.pdf" },
  { day: 4, date: "15-11-2025", pdfUrl: "/logbook/day4.pdf" },
  { day: 5, date: "16-11-2025", pdfUrl: "/logbook/day5.pdf" },
  { day: 6, date: "17-11-2025", pdfUrl: "/logbook/day6.pdf" },
  { day: 7, date: "18-11-2025", pdfUrl: "/logbook/day7.pdf" },
  { day: 8, date: "19-11-2025", pdfUrl: "/logbook/day8.pdf" },
  { day: 9, date: "20-11-2025", pdfUrl: "/logbook/day9.pdf" },
  { day: 10, date: "21-11-2025", pdfUrl: "/logbook/day10.pdf" },
  { day: 11, date: "22-11-2025", pdfUrl: "/logbook/day11.pdf" },
  { day: 12, date: "23-11-2025", pdfUrl: "/logbook/day12.pdf" },
  { day: 13, date: "24-11-2025", pdfUrl: "/logbook/day13.pdf" },
  { day: 14, date: "25-11-2025", pdfUrl: "/logbook/day14.pdf" },
];

export default function LogbookPage() {
  const [selectedWeek, setSelectedWeek] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalWeeks = Math.ceil(logbookData.length / 7);

  const filteredByWeek = useMemo(() => {
    if (!selectedWeek) return logbookData;
    const weekNum = Number(selectedWeek);
    const start = (weekNum - 1) * 7 + 1;
    const end = weekNum * 7;
    return logbookData.filter(l => l.day >= start && l.day <= end);
  }, [selectedWeek]);

  const filteredData = useMemo(() => {
    return filteredByWeek.filter(
      l => l.date.includes(search) || String(l.day).includes(search)
    );
  }, [filteredByWeek, search]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <section className="relative text-white py-32 px-6 overflow-hidden">

      {/* Soft glowing continuity */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-20 right-[-160px] w-[390px] h-[390px] rounded-full
        bg-fuchsia-500 blur-[170px] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-center"
        >
          Logbook{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            MagangIn
          </span>
        </motion.h1>

        <p className="text-gray-400 text-center mt-3 mb-12">
          Koleksi PDF logbook harian dalam perjalanan magangmu 📚
        </p>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-4 mb-10 max-w-xl mx-auto">
          <input
            value={search}
            placeholder="Cari tanggal atau Day ke..."
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-600 outline-none"
          />

          <select
            value={selectedWeek}
            onChange={(e) => { setSelectedWeek(e.target.value); setPage(1); }}
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white focus:ring-2 focus:ring-fuchsia-500 outline-none"
          >
            <option value="">Semua Minggu</option>
            {Array.from({ length: totalWeeks }).map((_, i) => (
              <option key={i} value={i + 1}>
                Minggu {i + 1} (Day {i * 7 + 1}-{(i + 1) * 7})
              </option>
            ))}
          </select>
        </div>

        {/* List */}
        <div className="space-y-6">
          {paginatedData.length === 0 ? (
            <p className="text-center text-gray-400 italic">
              Tidak ada dokumen ditemukan...
            </p>
          ) : (
            paginatedData.map((item, i) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between
                py-6 px-7 rounded-2xl backdrop-blur-lg
                bg-white/5 border border-white/10 shadow-lg
                hover:bg-white/10 transition"
              >
                <div>
                  <p className="font-semibold text-violet-300 text-lg">
                    Hari ke-{item.day}
                  </p>
                  <p className="text-gray-400 text-sm">{item.date}</p>
                </div>

                <div className="flex gap-3">
                  <a
                    href={item.pdfUrl}
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg 
                    bg-gradient-to-r from-violet-600 to-fuchsia-500
                    text-white hover:scale-105 transition"
                  >
                    <FileText size={16} /> Lihat
                  </a>
                  <a
                    href={item.pdfUrl}
                    download
                    className="flex items-center gap-2 px-4 py-2 rounded-lg 
                    border border-violet-400 text-violet-300
                    hover:bg-violet-500/20 transition"
                  >
                    <Download size={16} /> Download
                  </a>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-5 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className={`px-4 py-2 rounded-lg border border-white/20
              ${page === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-white/10"}`}
            >
              Prev
            </button>

            <span className="text-gray-300">Halaman {page} / {totalPages}</span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className={`px-4 py-2 rounded-lg border border-white/20
              ${page === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-white/10"}`}
            >
              Next
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
