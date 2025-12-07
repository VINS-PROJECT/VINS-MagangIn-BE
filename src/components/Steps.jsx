"use client";
import { motion } from "framer-motion";

export default function Steps() {
  const steps = [
    {
      num: 1,
      title: "Mulai & Buat Profil Magang",
      desc: "Lengkapi informasi pribadi, tujuan magang, dan fokus kegiatan yang ingin kamu capai.",
    },
    {
      num: 2,
      title: "Catat Aktivitas Harian",
      desc: "Isi log harian, simpan detail pekerjaan, upload dokumentasi, dan pantau progres.",
    },
    {
      num: 3,
      title: "Evaluasi & Selesaikan Magang",
      desc: "Review perkembangan, ekspor laporan, dan selesaikan perjalanan magang dengan rapi.",
    },
  ];

  return (
    <section className="relative overflow-hidden text-white py-32 md:py-44">

      {/* Orbs — sangat halus & lebih turun */}
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 0.05, y: 0 }}
        transition={{ duration: 1.8 }}
        viewport={{ once: true }}
        className="absolute right-[-140px] top-[140px] w-[380px] h-[380px] bg-fuchsia-500 rounded-full blur-[180px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 0.05, y: 0 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
        className="absolute left-[-180px] bottom-[-120px] w-[360px] h-[360px] bg-violet-600 rounded-full blur-[180px] pointer-events-none"
      />

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold mb-6"
        >
          Langkah Menggunakan{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Magang VINS
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-300 max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Tiga tahap mudah untuk memulai perjalanan magang secara terstruktur dan profesional.
        </motion.p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group p-8 rounded-2xl bg-white/5 backdrop-blur-md
              border border-white/10 hover:bg-white/10 hover:scale-[1.03]
              transition-all duration-300 shadow-lg"
            >
              {/* Number badge */}
              <div className="absolute -top-6 left-6 w-12 h-12 rounded-full
              flex items-center justify-center
              bg-gradient-to-r from-violet-600 to-fuchsia-500
              text-white font-bold text-xl shadow-md
              group-hover:scale-110 transition-transform duration-300">
                {s.num}
              </div>

              <h3 className="mt-8 text-lg md:text-xl font-semibold text-white">
                {s.title}
              </h3>

              <p className="mt-3 text-gray-300 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
