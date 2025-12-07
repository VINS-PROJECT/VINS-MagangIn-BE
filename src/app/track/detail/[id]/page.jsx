"use client";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const logs = [
  {
    date: "23-11-2025",
    day: 12,
    activity:
      "Mengerjakan UI Dashboard VINS, membuat desain responsive, serta meeting koordinasi dengan mentor terkait integrasi API.",
    lesson:
      "Belajar membuat komponen UI reusable, memahami sistem animasi framer-motion, serta alur komunikasi API.",
    issue:
      "Tantangan pada responsive grid dan error kecil saat animasi halaman berpindah.",
    documentation: [
      "/docs/dashboard-ui.png",
      "/docs/track-input.png",
      "/docs/meeting-notes.png",
    ],
  },
  {
    date: "22-11-2025",
    day: 11,
    activity:
      "Membuat halaman input track harian, refactor struktur komponen, dan perbaikan logika form.",
    lesson:
      "Mendalami state management React, validasi data, dan cara merapikan struktur file.",
    issue:
      "Form error ketika input nomor hari, harus menambah pengecekan khusus.",
    documentation: ["/docs/form-update.png"],
  },
  {
    date: "21-11-2025",
    day: 10,
    activity:
      "Menghadiri meeting mingguan dengan mentor untuk membahas progress magang.",
    lesson:
      "Belajar membuat laporan mingguan dengan terstruktur dan profesional.",
    issue: "Kesulitan merangkum aktivitas mingguan secara ringkas.",
    documentation: [],
  },
];

export default function TrackDetailPage() {
  const { id } = useParams();
  const data = logs[id];

  if (!data) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center text-gray-600">
        <p className="text-lg italic">Data tidak ditemukan...</p>
      </section>
    );
  }

  return (
    <section className="relative bg-white text-gray-900 py-32 px-6 overflow-hidden">

      {/* Blue orb decorative */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 1.8 }}
        className="absolute right-[-200px] top-[100px] w-[460px] h-[460px] 
        bg-blue-500 blur-[200px] rounded-full pointer-events-none"
      />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600"
        >
          <Link href="/track" className="hover:text-blue-600 transition">
            Track Harian
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Detail</span>
        </motion.div>

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold"
        >
          Detail Kegiatan Magang Hari ke-{data.day}
        </motion.h1>

        <p className="text-gray-600 mt-2 font-medium">
          Tanggal: <span className="text-gray-800">{data.date}</span>
        </p>

        {/* Detail Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          className="mt-10 p-8 rounded-2xl bg-white border border-blue-100 shadow-lg space-y-10"
        >
          <DetailItem title="Uraian Aktivitas" data={data.activity} />
          <DetailItem title="Pelajaran Hari Ini" data={data.lesson} />
          <DetailItem title="Kendala" data={data.issue} />

          {/* Dokumentasi */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-4">
              Dokumentasi
            </h3>

            {data.documentation.length === 0 ? (
              <p className="text-gray-600 italic">
                Tidak ada dokumentasi untuk hari ini.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.documentation.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="overflow-hidden rounded-xl border border-blue-200 
                    hover:border-blue-500 hover:shadow-blue-300/50
                    transition-all duration-300 shadow-md bg-white"
                  >
                    <img
                      src={img}
                      alt={`Dok-${index}`}
                      className="w-full h-40 object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Button Back */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-10"
        >
          <Link
            href="/track"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
            bg-gradient-to-r from-blue-600 to-sky-500 text-white font-medium
            hover:scale-[1.05] transition shadow-lg"
          >
            <ArrowLeft size={18} />
            Kembali Ke Riwayat
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

function DetailItem({ title, data }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-blue-700">{title}</h3>
      <p className="mt-2 text-gray-800 leading-relaxed">{data}</p>
    </div>
  );
}
