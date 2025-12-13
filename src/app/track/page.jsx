"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

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
    <section className="relative overflow-clip bg-white text-gray-900 py-28 px-6">

      {/* Soft glow */}
      <div className="absolute -left-40 top-32 w-[360px] h-[360px] bg-sky-300/40 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold">
            Riwayat{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              Aktivitas
            </span>
          </h1>
          <p className="text-gray-600 mt-3">
            Pantau progres dan catatan aktivitas kamu secara terstruktur
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Cari aktivitas atau pelajaran..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="
              w-full px-4 py-3 rounded-xl
              border border-blue-100
              bg-white/80 backdrop-blur
              focus:outline-none focus:ring-2 focus:ring-blue-500/20
            "
          />

          <select
            value={filterDay}
            onChange={(e) => {
              setFilterDay(e.target.value);
              setPage(1);
            }}
            className="
              w-full md:w-52 px-4 py-3 rounded-xl
              border border-blue-100
              bg-white/80 backdrop-blur
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

        {/* Table Card */}
        <div className="
          bg-white/80 backdrop-blur
          border border-blue-100/60
          rounded-2xl
          shadow-sm
          overflow-hidden
        ">
          {loading ? (
            <div className="py-12 text-center text-gray-500">
              Memuat data...
            </div>
          ) : paginatedLogs.length === 0 ? (
            <div className="py-12 text-center text-gray-500 italic">
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
                  {paginatedLogs.map((log) => (
                    <motion.tr
                      key={log._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-blue-100 hover:bg-blue-50/60 transition"
                    >
                      <td className="px-6 py-4">{log.tanggal}</td>
                      <td className="px-6 py-4 font-semibold text-blue-600">
                        Hari ke-{log.hari}
                      </td>
                      <td className="px-6 py-4">{log.aktivitas}</td>
                      <td className="px-6 py-4">{log.pelajaran}</td>
                      <td className="px-6 py-4 text-center">
                        <a
                          href={`/track/${log._id}`}
                          className="
                            inline-flex items-center justify-center
                            px-4 py-2 rounded-lg
                            bg-gradient-to-r from-blue-600 to-sky-500
                            text-white font-medium
                            hover:shadow-md hover:scale-105
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

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded-lg border border-blue-200 disabled:opacity-40 hover:bg-blue-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`
                  px-3 py-2 rounded-lg text-sm
                  ${page === i + 1
                    ? "bg-blue-600 text-white"
                    : "border border-blue-200 hover:bg-blue-50"}
                `}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded-lg border border-blue-200 disabled:opacity-40 hover:bg-blue-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
