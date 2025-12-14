"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  AlertTriangle,
  Image as ImageIcon,
} from "lucide-react";

export default function TrackDetailPublicPage() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function loadTrack() {
      try {
        const res = await fetch(`/api/track/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Gagal load data");

        const json = await res.json();
        setData(json.data);
      } catch (err) {
        console.error("Gagal load data", err);
      } finally {
        setLoading(false);
      }
    }

    loadTrack();
  }, [id]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-500 animate-pulse">
          Memuat detail aktivitas...
        </div>
      </section>
    );
  }

  /* ================= EMPTY ================= */
  if (!data) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white text-gray-500">
        Data tidak ditemukan
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-white py-32 px-6">

      {/* SOFT GLOW */}
      <div className="absolute -left-48 top-40 w-[420px] h-[420px] bg-sky-300/30 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-12">

        {/* BACK */}
        <Link
          href="/track"
          className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Riwayat
        </Link>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="
            p-9 rounded-3xl
            bg-white/85 backdrop-blur-xl
            border border-blue-200/50
            shadow-[0_12px_40px_rgba(0,0,0,0.08)]
          "
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Hari ke-{data.hari}
          </h1>

          <div className="flex items-center gap-2 mt-4 text-gray-600">
            <CalendarDays size={16} />
            <span>{data.tanggal}</span>
          </div>
        </motion.div>

        {/* DETAILS */}
        <div className="space-y-8">
          <DetailCard
            icon={<ClipboardList size={18} />}
            title="Aktivitas"
            value={data.aktivitas}
          />

          <DetailCard
            icon={<ClipboardList size={18} />}
            title="Pelajaran"
            value={data.pelajaran}
          />

          <DetailCard
            icon={<AlertTriangle size={18} />}
            title="Kendala"
            value={data.kendala || "Tidak ada kendala"}
          />

          {/* DOKUMENTASI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
              p-9 rounded-3xl
              bg-white/85 backdrop-blur-xl
              border border-blue-200/50
              shadow-[0_12px_40px_rgba(0,0,0,0.08)]
            "
          >
            <div className="flex items-center gap-2 mb-6 text-blue-700 font-semibold">
              <ImageIcon size={18} />
              Dokumentasi
            </div>

            {data.dokumentasi?.length === 0 ? (
              <p className="text-gray-500 italic">
                Tidak ada dokumentasi.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.dokumentasi.map((img, i) => (
                  <motion.img
                    key={i}
                    src={img}
                    onClick={() => setSelectedImg(img)}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.25 }}
                    className="
                      w-full h-40 object-cover rounded-2xl
                      cursor-pointer
                      border border-blue-200/50
                      shadow-sm
                    "
                    alt={`Dokumentasi ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* IMAGE MODAL */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 z-50
              bg-black/75
              flex items-center justify-center
              p-6
            "
            onClick={() => setSelectedImg(null)}
          >
            <motion.img
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              transition={{ duration: 0.25 }}
              src={selectedImg}
              className="max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl"
              alt="Preview dokumentasi"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ================= DETAIL CARD ================= */
function DetailCard({ title, value, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        p-9 rounded-3xl
        bg-white/85 backdrop-blur-xl
        border border-blue-200/50
        shadow-[0_12px_40px_rgba(0,0,0,0.08)]
      "
    >
      <div className="flex items-center gap-2 mb-4 text-blue-700 font-semibold">
        {icon}
        {title}
      </div>
      <p className="text-gray-800 leading-relaxed whitespace-pre-line">
        {value}
      </p>
    </motion.div>
  );
}
