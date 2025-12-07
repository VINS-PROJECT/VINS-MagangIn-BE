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
    { id: 1, day: 1, tanggal: "2025-10-01", file: "Logbook-Day-1-Kevin.pdf", catatan: "Onboarding dan pengenalan divisi." },
    { id: 2, day: 2, tanggal: "2025-10-02", file: "Logbook-Day-2-Sinta.pdf", catatan: "Mengerjakan task desain UI awal." },
    { id: 3, day: 3, tanggal: "2025-10-03", file: "Logbook-Day-3-Budi.pdf", catatan: "Meeting dan review teknis proyek." },
  ];

  const [data, setData] = useState(dataAwal);
  const [search, setSearch] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");
  const [filterMinggu, setFilterMinggu] = useState("");
  const [selected, setSelected] = useState([]);

  function getWeek(dateStr) {
    const d = new Date(dateStr);
    const first = new Date(d.getFullYear(), 0, 1);
    const diff = (d - first) / 86400000;
    return Math.ceil((diff + first.getDay() + 1) / 7);
  }

  const filtered = data.filter((x) =>
    (x.file.toLowerCase().includes(search.toLowerCase()) ||
     x.catatan.toLowerCase().includes(search.toLowerCase())) &&
    (!filterTanggal || x.tanggal === filterTanggal) &&
    (!filterMinggu || getWeek(x.tanggal) == filterMinggu)
  );

  const perPage = 6;
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(filtered.length / perPage);
  const shown = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const deleteOne = (id) => {
    setData((prev) => prev.filter((x) => x.id !== id));
    setSelected((prev) => prev.filter((x) => x !== id));
  };

  const bulkDelete = () => {
    setData((prev) => prev.filter((x) => !selected.includes(x.id)));
    setSelected([]);
  };

  return (
    <div className="space-y-10 text-gray-900">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-blue-600">
            Logbook Magang
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Kelola logbook harian peserta magang.
          </p>
        </div>

        <Link
          href="/admin/logbook/tambah"
          className="h-12 px-5 inline-flex items-center gap-2 rounded-xl
          bg-blue-600 text-white font-semibold
          hover:bg-blue-700 transition shadow-md"
        >
          <Plus className="w-5 h-5" />
          Tambah
        </Link>
      </div>

      {/* Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">

          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari file atau catatan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl 
              bg-white border border-gray-300
              focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Date */}
          <div className="relative">
            <Calendar className="w-5 h-5 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              value={filterTanggal}
              onChange={(e) => setFilterTanggal(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl 
              bg-white border border-gray-300 
              focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Week Select */}
          <select
            value={filterMinggu}
            onChange={(e) => setFilterMinggu(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-white border border-gray-300
            focus:ring-2 focus:ring-blue-500"
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
            className="h-12 px-6 bg-red-600 text-white rounded-xl
            hover:bg-red-700 transition shadow-md"
          >
            Hapus {selected.length}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              <th className="py-3 px-4 w-12">✓</th>
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
                className={`border-t border-gray-200 transition
                ${selected.includes(item.id) ? "bg-blue-50" : "hover:bg-blue-50"}`}
              >
                <td className="py-4 px-4">
                  <button onClick={() => toggleSelect(item.id)}>
                    {selected.includes(item.id) ? (
                      <CheckSquare className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </td>

                <td className="py-4 px-4 font-semibold text-blue-700">
                  Day {item.day}
                </td>

                <td className="py-4 px-4">{item.tanggal}</td>

                <td className="py-4 px-4 flex items-center gap-2 text-blue-600">
                  <FileText className="w-4 h-4" />
                  {item.file}
                </td>

                <td className="py-4 px-4 text-gray-600 max-w-xs">
                  {item.catatan}
                </td>

                <td className="py-4 px-4 flex gap-3">
                  <button
                    title="Lihat"
                    className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <Link
                    href={`/admin/logbook/edit/${item.id}`}
                    className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 transition"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => deleteOne(item.id)}
                    className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-gray-600 text-sm">
        <p>
          Menampilkan <span className="text-blue-600 font-semibold">{shown.length}</span> dari{" "}
          <span className="text-blue-600 font-semibold">{filtered.length}</span> logbook
        </p>

        <div className="flex items-center gap-3">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-blue-700 font-semibold">
            {page} / {totalPage}
          </span>

          <button
            disabled={page >= totalPage}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}
