"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

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
    <section className="relative overflow-clip bg-white py-28 px-6">

      {/* Soft glow */}
      <div className="absolute -right-40 top-40 w-[360px] h-[360px] bg-sky-300/40 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl font-extrabold">
            Logbook{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              VINSGawe
            </span>
          </h1>

          <p className="text-gray-600 mt-3">
            Rekap logbook mingguan berdasarkan aktivitas yang telah dicatat
          </p>
        </motion.div>

        {/* SEARCH */}
        <div className="flex justify-center mb-10">
          <input
            placeholder="Cari minggu atau tanggal..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="
              w-full max-w-md px-4 py-3
              rounded-xl
              border border-blue-100
              bg-white/80 backdrop-blur
              focus:outline-none focus:ring-2 focus:ring-blue-500/20
            "
          />
        </div>

        {/* LIST */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-16 text-gray-500 animate-pulse">
              Memuat logbook...
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-16 text-gray-500 italic">
              Logbook belum tersedia.
            </div>
          ) : (
            paginated.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="
                  flex flex-col md:flex-row
                  justify-between items-start md:items-center
                  gap-4
                  p-6 rounded-2xl
                  bg-white/80 backdrop-blur
                  border border-blue-100/60
                  shadow-sm
                  hover:shadow-xl hover:shadow-blue-500/10
                  transition-all
                "
              >
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
                      px-4 py-2 rounded-lg
                      bg-gradient-to-r from-blue-600 to-sky-500
                      text-white font-medium
                      hover:shadow-md hover:scale-105
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
                      px-4 py-2 rounded-lg
                      border border-blue-400
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
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="
                px-4 py-2 rounded-lg
                border border-blue-200
                disabled:opacity-40
                hover:bg-blue-50
              "
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`
                  px-3 py-2 rounded-lg text-sm
                  ${
                    page === i + 1
                      ? "bg-blue-600 text-white"
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
                px-4 py-2 rounded-lg
                border border-blue-200
                disabled:opacity-40
                hover:bg-blue-50
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
