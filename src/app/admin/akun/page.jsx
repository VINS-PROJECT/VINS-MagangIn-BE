"use client";
import { useState } from "react";
import { User, Shield, Search, Eye, Pencil, Trash2 } from "lucide-react";

export default function AkunPage() {
  const akunAwal = [
    {
      id: 1,
      nama: "Kevin Simorangkir",
      email: "kevin@example.com",
      role: "Peserta",
      status: "Aktif",
    },
    {
      id: 2,
      nama: "Sinta Dewi",
      email: "sinta@example.com",
      role: "Admin",
      status: "Aktif",
    },
    {
      id: 3,
      nama: "Budi Pratama",
      email: "budi@example.com",
      role: "Mentor",
      status: "Nonaktif",
    },
  ];

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [data] = useState(akunAwal);

  const filtered = data.filter((u) => {
    const matchSearch =
      u.nama.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchRole = filterRole ? u.role === filterRole : true;
    return matchSearch && matchRole;
  });

  const perPage = 5;
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(filtered.length / perPage);
  const shown = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text">
          Daftar Akun Magang VINS
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Kelola semua akun pengguna sistem monitoring magang.
        </p>
      </div>

      {/* Filters + Tambah Button */}
      <div className="flex flex-col md:flex-row justify-between gap-4">

        {/* Search + Role Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:max-w-xl">

          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full h-12 pl-10 pr-4
                rounded-xl bg-white/10 border border-white/10 text-gray-200
                placeholder-gray-400 focus:ring-2 focus:ring-violet-400 outline-none
              "
            />
          </div>

          {/* Filter Role */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="
              w-full h-12 px-4
              rounded-xl bg-white/10 border border-white/10 text-gray-200
              focus:ring-2 focus:ring-violet-400 outline-none
            "
          >
            <option value="">Semua</option>
            <option value="Peserta">Peserta</option>
            <option value="Mentor">Mentor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Button Tambah Akun */}
        <button className="
          h-12 px-6 rounded-xl shrink-0
          bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold
          shadow-md hover:scale-[1.03] transition-all duration-300
        ">
          + Tambah
        </button>
      </div>

      {/* Tabel Akun */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_20px_rgba(139,92,246,0.15)]">
        <table className="w-full text-sm">
          <thead className="bg-white/5 border-b border-white/10 text-gray-300">
            <tr>
              <th className="py-3 px-4 text-left">Akun</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {shown.map((u) => (
              <tr key={u.id} className="border-t border-white/10 hover:bg-white/5 transition">

                {/* Nama + Email */}
                <td className="py-4 px-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-violet-300 mt-1" />
                    <div>
                      <p className="text-gray-200 font-medium">{u.nama}</p>
                      <p className="text-sm text-gray-400">{u.email}</p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Shield className="w-4 h-4 text-fuchsia-300" />
                    {u.role}
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      u.status === "Aktif"
                        ? "bg-green-600/20 text-green-300 border border-green-500/40"
                        : "bg-red-600/20 text-red-300 border border-red-500/40"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>

                {/* Action */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">

                    <button
                      title="Detail"
                      className="p-2 rounded-lg bg-violet-500/20 border border-violet-500/30 text-violet-300 hover:bg-violet-500/30 transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      title="Edit"
                      className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30 transition"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    <button
                      title="Hapus"
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
      <div className="flex justify-between items-center pt-2">
        <p className="text-gray-400 text-sm">
          Menampilkan <span className="text-violet-300">{shown.length}</span> dari{" "}
          <span className="text-violet-300">{filtered.length}</span> akun
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-gray-200 hover:bg-white/20 transition"
          >
            Prev
          </button>

          <span className="text-gray-300">{page} / {totalPage}</span>

          <button
            onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-gray-200 hover:bg-white/20 transition"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}
