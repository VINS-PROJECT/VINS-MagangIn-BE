"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Search } from "lucide-react";

export default function LogbookPage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;

  /* ================= LOAD LOGBOOK ================= */
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/api/logbook", { cache: "no-store" });
        const json = await res.json();
        setData(json.data || []);
      } catch (err) {
        console.error("Gagal load logbook", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return data.filter(
      (l) =>
        String(l.week).includes(search) ||
        l.startDate?.includes(search) ||
        l.endDate?.includes(search)
    );
  }, [data, search]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <section className="relative overflow-hidden bg-white py-32 px-6">

      {/* SOFT GLOW */}
      <div className="absolute -right-48 top-40 w-[420px] h-[420px] bg-sky-300/30 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Logbook{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              VINSGawe
            </span>
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Rekap logbook mingguan berdasarkan aktivitas yang telah dicatat
          </p>
        </motion.div>

        {/* SEARCH */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
            <input
              placeholder="Cari minggu atau tanggal..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="
                w-full pl-11 pr-4 py-3
                rounded-xl
                border border-blue-200/60
                bg-white/85 backdrop-blur
                focus:outline-none focus:ring-2 focus:ring-blue-500/30
                transition
              "
            />
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-20 text-gray-500 animate-pulse">
              Memuat logbook...
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-20 text-gray-500 italic">
              Logbook belum tersedia.
            </div>
          ) : (
            paginated.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="
                  group relative
                  flex flex-col md:flex-row
                  justify-between items-start md:items-center
                  gap-6
                  p-7 rounded-2xl
                  bg-white/85 backdrop-blur-xl
                  border border-blue-200/50
                  shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                  hover:shadow-[0_20px_50px_rgba(37,99,235,0.18)]
                  transition-all duration-300
                "
              >
                {/* TOP HIGHLIGHT */}
                <div className="
                  absolute inset-x-0 top-0 h-px
                  bg-gradient-to-r from-transparent via-blue-400/40 to-transparent
                  opacity-0 group-hover:opacity-100
                  transition
                " />

                {/* INFO */}
                <div>
                  <p className="font-bold text-blue-700 text-lg">
                    Minggu ke-{item.week}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.startDate} – {item.endDate}
                  </p>
                </div>

                {/* ACTION */}
                <div className="flex gap-3">
                  <a
                    href={item.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-2
                      px-4 py-2.5 rounded-xl
                      bg-gradient-to-r from-blue-600 to-sky-500
                      text-white font-medium
                      shadow-md shadow-blue-500/20
                      hover:scale-[1.04]
                      transition
                    "
                  >
                    <FileText size={16} />
                    Lihat
                  </a>

                  <a
                    href={item.pdfUrl}
                    download
                    className="
                      inline-flex items-center gap-2
                      px-4 py-2.5 rounded-xl
                      border border-blue-300/70
                      text-blue-600 font-medium
                      hover:bg-blue-50
                      transition
                    "
                  >
                    <Download size={16} />
                    Unduh
                  </a>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-14">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="
                px-4 py-2 rounded-xl
                border border-blue-200
                text-sm font-medium
                disabled:opacity-40
                hover:bg-blue-50
                transition
              "
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`
                  px-3.5 py-2 rounded-xl text-sm font-medium
                  ${
                    page === i + 1
                      ? "bg-blue-600 text-white shadow-md"
                      : "border border-blue-200 hover:bg-blue-50"
                  }
                `}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="
                px-4 py-2 rounded-xl
                border border-blue-200
                text-sm font-medium
                disabled:opacity-40
                hover:bg-blue-50
                transition
              "
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
