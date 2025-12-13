"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Eye,
  Pencil,
  Trash2,
  Save,
  X,
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

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
          Data Track Harian
        </h2>
        <Link
          href="/admin/track/tambah"
          className="px-5 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-semibold shadow-md transition"
        >
          + Tambah Track
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-blue-100 bg-white shadow-md">
        {loading ? (
          <p className="p-6 text-gray-500 text-center">Memuat...</p>
        ) : (
          <table className="w-full text-sm text-gray-800">
            <thead className="bg-blue-50 text-gray-700 font-semibold">
              <tr>
                <th className="py-3 px-4">Day</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Aktivitas</th>
                <th className="py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-blue-100 hover:bg-blue-50 transition"
                >
                  <td className="py-3 px-4 text-blue-700 font-semibold">
                    Hari ke-{item.hari}
                  </td>
                  <td className="py-3 px-4">{item.tanggal}</td>
                  <td className="py-3 px-4 max-w-xs truncate">
                    {item.aktivitas}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-3">
                      <button
                        className="hover:text-blue-600"
                        onClick={() => { setSelected(item); setIsEdit(false); }}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="hover:text-sky-600"
                        onClick={() => { setSelected({ ...item }); setIsEdit(true); }}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className="hover:text-red-600"
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

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl w-[520px] border border-blue-200 shadow-xl space-y-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-blue-700 text-lg">
                  {isEdit ? "Edit Track" : "Detail Track"}
                </h3>
                <button onClick={() => setSelected(null)}>
                  <X />
                </button>
              </div>

              {["aktivitas", "pelajaran", "kendala"].map((field) => (
                <div key={field}>
                  <p className="text-gray-600 text-sm capitalize">{field}</p>
                  {isEdit ? (
                    <textarea
                      rows={2}
                      value={selected[field]}
                      onChange={(e) =>
                        setSelected({ ...selected, [field]: e.target.value })
                      }
                      className="w-full p-2 border border-blue-200 rounded-lg"
                    />
                  ) : (
                    <p>{selected[field]}</p>
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-3">
                {isEdit ? (
                  <button
                    onClick={saveEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg flex gap-2"
                  >
                    <Save size={18} /> Simpan
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEdit(true)}
                    className="px-4 py-2 border border-blue-300 text-blue-600 rounded-lg flex gap-2"
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
