"use client";
import { motion } from "framer-motion";

export default function Steps() {
  const steps = [
    {
      num: 1,
      title: "Mulai & Buat Profil",
      desc: "Lengkapi informasi dasar, tujuan kerja atau magang, serta fokus aktivitas yang ingin dicapai.",
    },
    {
      num: 2,
      title: "Catat Aktivitas Harian",
      desc: "Dokumentasikan pekerjaan, simpan detail tugas, unggah file pendukung, dan pantau progres.",
    },
    {
      num: 3,
      title: "Evaluasi & Selesaikan",
      desc: "Tinjau perkembangan, rangkum hasil kerja, dan selesaikan aktivitas dengan rapi dan terstruktur.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white text-gray-900 py-32 md:py-40">

      {/* MASK – bottom fade */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* SOFT GLOWS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="
          absolute right-[-120px] top-[140px]
          w-[360px] h-[360px]
          bg-sky-400 rounded-full
          blur-[160px]
          pointer-events-none
        "
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 2.3, ease: "easeOut" }}
        viewport={{ once: true }}
        className="
          absolute left-[-160px] bottom-[-140px]
          w-[420px] h-[420px]
          bg-blue-600 rounded-full
          blur-[170px]
          pointer-events-none
        "
      />

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl xl:text-5xl font-extrabold mb-6"
        >
          Cara Menggunakan{" "}
          <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            VINSGawe
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mb-20 leading-relaxed text-lg"
        >
          Tiga langkah sederhana untuk mengelola aktivitas,
          memantau progres, dan menyelesaikan pekerjaan
          secara profesional.
        </motion.p>

        {/* STEPS GRID */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="
                group relative p-9 rounded-2xl
                bg-white/85 backdrop-blur-xl
                border border-blue-200/50
                shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                hover:shadow-[0_20px_50px_rgba(37,99,235,0.18)]
                transition-all duration-300
              "
            >
              {/* TOP HIGHLIGHT */}
              <div className="
                absolute inset-x-0 top-0 h-px
                bg-gradient-to-r from-transparent via-blue-400/40 to-transparent
                opacity-0 group-hover:opacity-100
                transition
              " />

              {/* NUMBER BADGE */}
              <div
                className="
                  absolute -top-6 left-8
                  w-12 h-12 rounded-full
                  flex items-center justify-center
                  bg-gradient-to-r from-blue-600 to-sky-500
                  text-white font-bold text-lg
                  shadow-md
                  group-hover:scale-110
                  transition-transform duration-300
                "
              >
                {s.num}
              </div>

              <h3 className="mt-10 text-lg md:text-xl font-semibold text-gray-900">
                {s.title}
              </h3>

              <p className="mt-4 text-gray-700 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
