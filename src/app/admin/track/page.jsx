"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";

export default function TrackAdminPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/track", { cache: "no-store" });
      const json = await res.json();
      setData(json.data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  /* ================= ACTION ================= */
  const deleteTrack = async (id) => {
    if (!confirm("Hapus track ini?")) return;

    const res = await fetch(`/api/admin/track/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setData((prev) => prev.filter((i) => i._id !== id));
    }
  };

  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <h2
          className="
            text-3xl font-extrabold
            bg-gradient-to-r from-blue-600 to-sky-500
            bg-clip-text text-transparent
          "
        >
          Track Harian
        </h2>

        <Link
          href="/admin/track/tambah"
          className="
            inline-flex items-center gap-2
            px-5 py-3 rounded-xl
            bg-gradient-to-r from-blue-600 to-sky-500
            text-white font-semibold
            shadow-md
            hover:brightness-110
            transition
          "
        >
          <Plus size={18} />
          Tambah Track
        </Link>
      </div>

      {/* ================= TABLE ================= */}
      <div
        className="
          rounded-2xl overflow-hidden
          bg-white/80 backdrop-blur-xl
          border border-blue-200/40
          shadow-[0_20px_40px_rgba(0,0,0,0.08)]
        "
      >
        {loading ? (
          <div className="p-10 text-center text-slate-500">
            Memuat data track...
          </div>
        ) : data.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            Belum ada track harian.
          </div>
        ) : (
          <table className="w-full text-sm text-slate-800">
            <thead className="bg-white/90 backdrop-blur border-b border-slate-200">
              <tr className="text-slate-600">
                <th className="py-4 px-5 text-left">Hari</th>
                <th className="py-4 px-5 text-left">Tanggal</th>
                <th className="py-4 px-5 text-left">Aktivitas</th>
                <th className="py-4 px-5 text-center w-40">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="
                    border-t border-slate-200/60
                    hover:bg-blue-50/60
                    transition
                  "
                >
                  <td className="py-3 px-5 font-semibold text-blue-700">
                    Hari ke-{item.hari}
                  </td>

                  <td className="py-3 px-5">
                    {item.tanggal}
                  </td>

                  <td className="py-3 px-5 max-w-sm truncate">
                    {item.aktivitas}
                  </td>

                  <td className="py-3 px-5">
                    <div className="flex justify-center gap-4">
                      {/* VIEW */}
                      <Link
                        href={`/admin/track/${item._id}`}
                        className="text-slate-500 hover:text-blue-600 transition"
                        aria-label="Lihat Detail"
                      >
                        <Eye size={18} />
                      </Link>

                      {/* EDIT */}
                      <Link
                        href={`/admin/track/${item._id}/edit`}
                        className="text-slate-500 hover:text-sky-600 transition"
                        aria-label="Edit Track"
                      >
                        <Pencil size={18} />
                      </Link>

                      {/* DELETE */}
                      <button
                        onClick={() => deleteTrack(item._id)}
                        className="text-slate-500 hover:text-red-600 transition"
                        aria-label="Hapus Track"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
