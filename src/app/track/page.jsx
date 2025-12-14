"use client";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";

export default function TrackHistory() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [filterDay, setFilterDay] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;

  async function loadData() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/track", { cache: "no-store" });
      const json = await res.json();
      setLogs(json.data || []);
    } catch (err) {
      console.error("Gagal load track", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  /* ================= FILTER ================= */
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.aktivitas?.toLowerCase().includes(search.toLowerCase()) ||
        log.pelajaran?.toLowerCase().includes(search.toLowerCase());

      const matchesDay = filterDay ? log.hari === Number(filterDay) : true;
      return matchesSearch && matchesDay;
    });
  }, [logs, search, filterDay]);

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage) || 1;
  const paginatedLogs = filteredLogs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <section className="relative overflow-hidden bg-white text-gray-900 py-32 px-6">

      {/* SOFT GLOW */}
      <div className="absolute -left-48 top-32 w-[420px] h-[420px] bg-sky-300/30 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Riwayat{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              Aktivitas
            </span>
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Pantau progres dan catatan aktivitas kamu secara terstruktur
          </p>
        </motion.div>

        {/* FILTER BAR */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
            <input
              type="text"
              placeholder="Cari aktivitas atau pelajaran..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="
                w-full pl-11 pr-4 py-3 rounded-xl
                border border-blue-200/60
                bg-white/85 backdrop-blur
                focus:outline-none focus:ring-2 focus:ring-blue-500/30
                transition
              "
            />
          </div>

          <div className="relative w-full md:w-56">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
            <select
              value={filterDay}
              onChange={(e) => {
                setFilterDay(e.target.value);
                setPage(1);
              }}
              className="
                w-full pl-11 pr-4 py-3 rounded-xl
                border border-blue-200/60
                bg-white/85 backdrop-blur
                focus:outline-none
              "
            >
              <option value="">Semua Hari</option>
              {[...new Set(logs.map((log) => log.hari))].map((day) => (
                <option key={day} value={day}>
                  Hari ke-{day}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TABLE CARD */}
        <div
          className="
            bg-white/85 backdrop-blur-xl
            border border-blue-200/50
            rounded-2xl
            shadow-[0_10px_30px_rgba(0,0,0,0.06)]
            overflow-hidden
          "
        >
          {loading ? (
            <div className="py-16 text-center text-gray-500">
              Memuat data...
            </div>
          ) : paginatedLogs.length === 0 ? (
            <div className="py-16 text-center text-gray-500 italic">
              Tidak ada data yang sesuai.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-blue-50/80 text-blue-900">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Tanggal</th>
                    <th className="px-6 py-4 text-left font-semibold">Hari</th>
                    <th className="px-6 py-4 text-left font-semibold">Aktivitas</th>
                    <th className="px-6 py-4 text-left font-semibold">Pelajaran</th>
                    <th className="px-6 py-4 text-center font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLogs.map((log, i) => (
                    <motion.tr
                      key={log._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="
                        border-t border-blue-100
                        hover:bg-blue-50/60
                        transition
                      "
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {log.tanggal}
                      </td>
                      <td className="px-6 py-4 font-semibold text-blue-600">
                        Hari ke-{log.hari}
                      </td>
                      <td className="px-6 py-4">
                        {log.aktivitas}
                      </td>
                      <td className="px-6 py-4">
                        {log.pelajaran}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <a
                          href={`/track/${log._id}`}
                          className="
                            inline-flex items-center justify-center
                            px-4 py-2 rounded-xl
                            bg-gradient-to-r from-blue-600 to-sky-500
                            text-white font-medium
                            shadow-md shadow-blue-500/20
                            hover:scale-[1.05]
                            transition
                          "
                        >
                          Detail
                        </a>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
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
