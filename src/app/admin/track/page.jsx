"use client";
import { useState } from "react";
import { Calendar, Search, Eye, Pencil, Trash2, X, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TrackHarianPage() {
  const dataAwal = [
    {
      id: 1,
      hari: 1,
      tanggal: "2025-10-01",
      aktivitas: "Mempelajari alur kerja perusahaan & onboarding.",
      pelajaran: "Memahami struktur divisi dan standar kerja.",
      kendala: "Belum terbiasa dengan sistem internal.",
    },
    {
      id: 2,
      hari: 2,
      tanggal: "2025-10-02",
      aktivitas: "Mulai mengerjakan task project dasar.",
      pelajaran: "Belajar manajemen waktu dengan tools internal.",
      kendala: "Beberapa tool memerlukan akses tambahan.",
    },
  ];

  const [data, setData] = useState(dataAwal);
  const [search, setSearch] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");

  const filteredData = data.filter((item) =>
    item.aktivitas.toLowerCase().includes(search.toLowerCase()) &&
    (filterTanggal ? item.tanggal === filterTanggal : true)
  );

  // PAGINATION
  const [page, setPage] = useState(1);
  const perPage = 5;
  const totalPage = Math.ceil(filteredData.length / perPage);
  const shown = filteredData.slice((page - 1) * perPage, page * perPage);

  // DETAIL / EDIT / DELETE
  const [selected, setSelected] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const deleteTrack = (id) => {
    if (!confirm("Yakin ingin menghapus track ini?")) return;
    setData((prev) => prev.filter((item) => item.id !== id));
    setSelected(null);
  };

  const saveEdit = () => {
    setData((prev) =>
      prev.map((item) => (item.id === selected.id ? selected : item))
    );
    setIsEdit(false);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text">
          Track Harian Magang
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Riwayat aktivitas, pelajaran, dan kendala setiap hari.
        </p>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari aktivitas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 h-11 rounded-xl bg-white/10 border border-white/10 text-gray-200"
            />
          </div>

          {/* Filter Tanggal */}
          <div className="relative w-full md:w-56">
            <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              value={filterTanggal}
              onChange={(e) => setFilterTanggal(e.target.value)}
              className="w-full pl-10 pr-10 h-11 rounded-xl bg-white/10 border border-white/10 text-gray-200"
            />
          </div>
        </div>

        <a
          href="/admin/track/tambah"
          className="px-5 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-xl text-white font-semibold shadow-md"
        >
          + Tambah Track
        </a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full text-sm">
          <thead className="bg-white/10 text-gray-300">
            <tr>
              <th className="py-3 px-4 text-left">Day</th>
              <th className="py-3 px-4 text-left">Tanggal</th>
              <th className="py-3 px-4 text-left">Aktivitas</th>
              <th className="py-3 px-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((item) => (
              <tr key={item.id} className="border-t border-white/10 hover:bg-white/5">
                <td className="py-3 px-4 text-violet-300 font-semibold">Day {item.hari}</td>
                <td className="py-3 px-4">{item.tanggal}</td>
                <td className="py-3 px-4 max-w-xs">{item.aktivitas}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button className="hover:text-violet-300" onClick={() => { setSelected(item); setIsEdit(false); }}>
                      <Eye size={18} />
                    </button>
                    <button className="hover:text-blue-300" onClick={() => { setSelected(item); setIsEdit(true); }}>
                      <Pencil size={18} />
                    </button>
                    <button className="hover:text-red-400" onClick={() => deleteTrack(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between text-gray-400">
        <span>Page {page} / {totalPage}</span>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-40"
          >
            Prev
          </button>
          <button
            disabled={page === totalPage}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal Detail / Edit */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-[#131822] p-6 rounded-2xl w-[500px] border border-white/10"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
            >
              {/* Title */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-violet-300 text-lg">
                  {isEdit ? "Edit Track" : "Detail Track"}
                </h3>
                <button className="hover:text-red-400" onClick={() => setSelected(null)}>
                  <X />
                </button>
              </div>

              {/* FORM / SHOW */}
              {["aktivitas", "pelajaran", "kendala"].map((field) => (
                <div className="mb-4" key={field}>
                  <p className="text-gray-400 text-sm capitalize">{field}</p>
                  {isEdit ? (
                    <textarea
                      className="w-full p-2 bg-white/10 border border-white/10 rounded-lg"
                      rows={2}
                      value={selected[field]}
                      onChange={(e) =>
                        setSelected({ ...selected, [field]: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-gray-200">{selected[field]}</p>
                  )}
                </div>
              ))}

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-3 mt-4">
                {isEdit ? (
                  <button
                    className="bg-violet-600 px-4 py-2 rounded-lg hover:bg-violet-500 flex gap-2"
                    onClick={saveEdit}
                  >
                    <Save size={18} /> Simpan
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEdit(true)}
                    className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 flex gap-2"
                  >
                    <Pencil size={18} /> Edit
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
