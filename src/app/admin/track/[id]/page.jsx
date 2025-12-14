"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil, CalendarDays, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TrackDetailAdminPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/admin/track/${id}`, { cache: "no-store" });
      const json = await res.json();
      setData(json.data);
    }
    load();
  }, [id]);

  if (!data) {
    return <div className="text-center py-20 text-gray-500">Memuat data...</div>;
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <Link
          href="/admin/track"
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} /> Kembali
        </Link>

        <Link
          href={`/admin/track/${id}/edit`}
          className="flex items-center gap-2 px-4 py-2 rounded-xl
          bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Pencil size={16} /> Edit
        </Link>
      </div>

      {/* INFO */}
      <div className="p-6 rounded-2xl bg-white/80 border border-blue-100">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Hari ke-{data.hari}
        </h1>
        <p className="flex items-center gap-2 text-gray-600 mt-2">
          <CalendarDays size={16} /> {data.tanggal}
        </p>
      </div>

      {/* TEXT */}
      {["aktivitas", "pelajaran", "kendala"].map((key) => (
        <div
          key={key}
          className="p-6 rounded-2xl bg-white/80 border border-blue-100"
        >
          <h3 className="font-semibold capitalize mb-2">{key}</h3>
          <p className="text-gray-800 whitespace-pre-line">
            {data[key] || "-"}
          </p>
        </div>
      ))}

      {/* DOKUMENTASI */}
      <div className="p-6 rounded-2xl bg-white/80 border border-blue-100">
        <h3 className="flex items-center gap-2 font-semibold mb-4">
          <ImageIcon size={18} /> Dokumentasi
        </h3>

        {data.dokumentasi?.length === 0 ? (
          <p className="italic text-gray-500">Tidak ada dokumentasi</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.dokumentasi.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setPreview(img)}
                className="h-40 w-full object-cover rounded-xl cursor-pointer
                border border-blue-100 hover:scale-105 transition"
                alt={`Dokumentasi ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* IMAGE PREVIEW */}
      <AnimatePresence>
        {preview && (
          <motion.div
            onClick={() => setPreview(null)}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={preview}
              className="max-h-[90vh] rounded-xl shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
