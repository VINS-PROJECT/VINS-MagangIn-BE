"use client";
import { useState } from "react";
import {
  Search,
  Calendar,
  Eye,
  FileText,
  Pencil,
  Trash2,
  Plus,
  CheckSquare,
  Square,
} from "lucide-react";
import Link from "next/link";

export default function LogbookAdminPage() {
  const dataAwal = [
    {
      id: 1,
      day: 1,
      tanggal: "2025-10-01",
      file: "Logbook-Day-1-Kevin.pdf",
      catatan: "Onboarding dan pengenalan divisi.",
    },
    {
      id: 2,
      day: 2,
      tanggal: "2025-10-02",
      file: "Logbook-Day-2-Sinta.pdf",
      catatan: "Mengerjakan task desain UI awal.",
    },
    {
      id: 3,
      day: 3,
      tanggal: "2025-10-03",
      file: "Logbook-Day-3-Budi.pdf",
      catatan: "Meeting dan review teknis proyek.",
    },
  ];

  const [data, setData] = useState(dataAwal);
  const [search, setSearch] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");
  const [filterMinggu, setFilterMinggu] = useState("");

  const [selected, setSelected] = useState([]);

  const filtered = data.filter((item) => {
    const matchText =
      item.file.toLowerCase().includes(search.toLowerCase()) ||
      item.catatan.toLowerCase().includes(search.toLowerCase());

    const matchTanggal = filterTanggal ? item.tanggal === filterTanggal : true;

    const matchWeek = filterMinggu
      ? getWeek(item.tanggal) == filterMinggu
      : true;

    return matchText && matchTanggal && matchWeek;
  });

  const perPage = 6;
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(filtered.length / perPage);
  const shown = filtered.slice((page - 1) * perPage, page * perPage);

  function getWeek(dateStr) {
    const date = new Date(dateStr);
    const first = new Date(date.getFullYear(), 0, 1);
    const diff = (date - first) / 86400000;
    return Math.ceil((diff + first.getDay() + 1) / 7);
  }

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const deleteOne = (id) => {
    setData((prev) => prev.filter((x) => x.id !== id));
    setSelected((prev) => prev.filter((x) => x !== id));
  };

  const bulkDelete = () => {
    setData((prev) => prev.filter((x) => !selected.includes(x.id)));
    setSelected([]);
  };

  return (
    <div className="space-y-10">

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text">
            Logbook Magang
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Kelola logbook harian peserta magang.
          </p>
        </div>

        <Link
          href="/admin/logbook/tambah"
          className="h-12 px-5 inline-flex items-center gap-2 rounded-xl
          bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold
          hover:scale-[1.03] transition-all shadow-[0_0_18px_rgba(139,92,246,0.3)]"
        >
          <Plus className="w-5 h-5" />
          Tambah
        </Link>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row justify-between gap-4">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">

          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari file atau catatan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl
              bg-white/10 border border-white/10 text-gray-200 placeholder-gray-400
              focus:ring-2 ring-violet-500 outline-none"
            />
          </div>

          {/* Tanggal */}
          <div className="relative">
            <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              value={filterTanggal}
              onChange={(e) => setFilterTanggal(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl
              bg-white/10 border border-white/10 text-gray-200
              focus:ring-2 ring-violet-500 outline-none"
            />
          </div>

          {/* Week Filter */}
          <select
            value={filterMinggu}
            onChange={(e) => setFilterMinggu(e.target.value)}
            className="w-full h-12 px-4 rounded-xl
            bg-white/10 border border-white/10 text-gray-200
            focus:ring-2 ring-violet-500 outline-none"
          >
            <option value="">Filter Minggu</option>
            {[...Array(20)].map((_, i) => (
              <option key={i} value={i + 1}>
                Minggu {i + 1}
              </option>
            ))}
          </select>
        </div>

        {selected.length > 0 && (
          <button
            onClick={bulkDelete}
            className="h-12 px-6 bg-red-500/90 hover:bg-red-600 rounded-xl text-white
            font-medium shadow-lg transition"
          >
            Hapus {selected.length}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-gray-300">
            <tr>
              <th className="py-3 px-4 w-12 text-left">✓</th>
              <th className="py-3 px-4 text-left">Day</th>
              <th className="py-3 px-4 text-left">Tanggal</th>
              <th className="py-3 px-4 text-left">File</th>
              <th className="py-3 px-4 text-left">Catatan</th>
              <th className="py-3 px-4 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {shown.map((item) => (
              <tr
                key={item.id}
                className={`border-t border-white/10 hover:bg-white/10 transition
                ${selected.includes(item.id) ? "bg-violet-500/10" : ""}`}
              >
                <td className="py-4 px-4">
                  <button onClick={() => toggleSelect(item.id)}>
                    {selected.includes(item.id) ? (
                      <CheckSquare className="w-5 h-5 text-violet-400" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </td>

                <td className="py-4 px-4 text-gray-200 font-semibold">
                  Day {item.day}
                </td>

                <td className="py-4 px-4 text-gray-300">{item.tanggal}</td>

                <td className="py-4 px-4 text-violet-300 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {item.file}
                </td>

                <td className="py-4 px-4 text-gray-400 max-w-xs">
                  {item.catatan}
                </td>

                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">

                    <button
                      title="Lihat"
                      className="p-2 rounded-lg bg-violet-500/20 border border-violet-500/30 text-violet-300 hover:bg-violet-500/30 transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <Link
                      href={`/admin/logbook/edit/${item.id}`}
                      className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30 transition"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => deleteOne(item.id)}
                      className="p-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-sm">
          Menampilkan <span className="text-violet-300">{shown.length}</span> dari{" "}
          <span className="text-violet-300">{filtered.length}</span> logbook
        </p>

        <div className="flex items-center gap-3">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-gray-300 hover:bg-white/20 transition disabled:text-gray-500 disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-gray-300">
            {page} / {totalPage}
          </span>

          <button
            disabled={page >= totalPage}
            onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-gray-300 hover:bg-white/20 transition disabled:text-gray-500 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}
