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
    <div className="space-y-10 text-gray-800">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
          Daftar Akun Pengguna
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Kelola seluruh akun pada sistem.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:max-w-xl">

          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-blue-200 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Filter Role */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="w-full h-11 px-4 rounded-xl bg-white border border-blue-200 text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none"
          >
            <option value="">Semua Role</option>
            <option value="Peserta">Peserta</option>
            <option value="Mentor">Mentor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Button Tambah */}
        <button className="h-11 px-6 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 shadow-md transition">
          + Tambah Akun
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-blue-200 bg-white shadow-md">
        <table className="w-full text-sm">
          <thead className="bg-blue-50 text-gray-700 font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Akun</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {shown.map((u) => (
              <tr
                key={u.id}
                className="border-t border-blue-100 hover:bg-blue-50 transition"
              >
                {/* User */}
                <td className="py-4 px-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">{u.nama}</p>
                      <p className="text-sm text-gray-500">{u.email}</p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Shield className="w-4 h-4 text-blue-500" />
                    {u.role}
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      u.status === "Aktif"
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-red-100 text-red-700 border border-red-300"
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
                      className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 transition"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      title="Edit"
                      className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-600 border border-sky-200 transition"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      title="Hapus"
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition"
                    >
                      <Trash2 size={16} />
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
        <p className="text-gray-600 text-sm">
          Menampilkan <span className="text-blue-600">{shown.length}</span> dari{" "}
          <span className="text-blue-600">{filtered.length}</span> akun
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-blue-200 bg-blue-50 disabled:opacity-40 hover:bg-blue-100 transition"
          >
            Prev
          </button>

          <span className="text-gray-700">{page} / {totalPage}</span>

          <button
            onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
            disabled={page === totalPage}
            className="px-4 py-2 rounded-lg border border-blue-200 bg-blue-50 disabled:opacity-40 hover:bg-blue-100 transition"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}
