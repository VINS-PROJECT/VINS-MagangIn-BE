"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Pencil,
  Trash2,
  Save,
  X,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function TrackAdminPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/track", { cache: "no-store" });
    const json = await res.json();
    setData(json.data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const deleteTrack = async (id) => {
    if (!confirm("Hapus track ini?")) return;

    const res = await fetch(`/api/admin/track/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setData((prev) => prev.filter((i) => i._id !== id));
      setSelected(null);
    }
  };

  const saveEdit = async () => {
    const res = await fetch(`/api/admin/track/${selected._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selected),
    });

    if (res.ok) {
      load();
      setIsEdit(false);
    }
  };

  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <h2
          className="text-3xl font-extrabold
          bg-gradient-to-r from-blue-600 to-sky-500
          bg-clip-text text-transparent"
        >
          Track Harian
        </h2>

        <Link
          href="/admin/track/tambah"
          className="flex items-center gap-2 px-5 py-3
          bg-gradient-to-r from-blue-600 to-sky-500
          hover:brightness-110
          rounded-xl text-white font-semibold
          shadow-md transition"
        >
          <Plus size={18} /> Tambah Track
        </Link>
      </div>

      {/* ================= TABLE ================= */}
      <div
        className="rounded-2xl overflow-hidden
        bg-white/70 backdrop-blur-xl
        border border-white/40
        shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
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
            <thead className="sticky top-0 bg-white/80 backdrop-blur border-b border-slate-200">
              <tr className="text-slate-600">
                <th className="py-4 px-4 text-left">Hari</th>
                <th className="py-4 px-4 text-left">Tanggal</th>
                <th className="py-4 px-4 text-left">Aktivitas</th>
                <th className="py-4 px-4 text-left w-32">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-slate-200/60
                  hover:bg-blue-50/60 transition"
                >
                  <td className="py-3 px-4 font-semibold text-blue-700">
                    Hari ke-{item.hari}
                  </td>
                  <td className="py-3 px-4">
                    {item.tanggal}
                  </td>
                  <td className="py-3 px-4 max-w-sm truncate">
                    {item.aktivitas}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-3">
                      <button
                        className="text-slate-500 hover:text-blue-600 transition"
                        onClick={() => {
                          setSelected(item);
                          setIsEdit(false);
                        }}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="text-slate-500 hover:text-sky-600 transition"
                        onClick={() => {
                          setSelected({ ...item });
                          setIsEdit(true);
                        }}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className="text-slate-500 hover:text-red-600 transition"
                        onClick={() => deleteTrack(item._id)}
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

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center
            bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-[520px] p-6 rounded-2xl
              bg-white/80 backdrop-blur-xl
              border border-white/40
              shadow-[0_20px_40px_rgba(0,0,0,0.2)]
              space-y-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-blue-700">
                  {isEdit ? "Edit Track" : "Detail Track"}
                </h3>
                <button
                  onClick={() => setSelected(null)}
                  className="text-slate-500 hover:text-slate-800"
                >
                  <X />
                </button>
              </div>

              {["aktivitas", "pelajaran", "kendala"].map((field) => (
                <div key={field}>
                  <p className="text-xs text-slate-500 capitalize mb-1">
                    {field}
                  </p>
                  {isEdit ? (
                    <textarea
                      rows={2}
                      value={selected[field]}
                      onChange={(e) =>
                        setSelected({
                          ...selected,
                          [field]: e.target.value,
                        })
                      }
                      className="w-full rounded-xl p-2
                      bg-white border border-slate-300
                      focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  ) : (
                    <p className="text-slate-800">
                      {selected[field] || "-"}
                    </p>
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-3 pt-2">
                {isEdit ? (
                  <button
                    onClick={saveEdit}
                    className="flex items-center gap-2 px-4 py-2
                    bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
                  >
                    <Save size={18} /> Simpan
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEdit(true)}
                    className="flex items-center gap-2 px-4 py-2
                    border border-blue-300 text-blue-600 rounded-xl hover:bg-blue-50 transition"
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
