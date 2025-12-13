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
    <section className="relative overflow-clip bg-white text-gray-900 py-28 md:py-36">

      {/* MASK – kontrol overflow glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* SOFT GLOWS – VINSGawe scale */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="
          absolute right-[-96px] top-[140px]
          w-[300px] h-[300px]
          bg-sky-400 rounded-full
          blur-[140px]
          pointer-events-none
        "
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 2.1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="
          absolute left-[-120px] bottom-[-120px]
          w-[320px] h-[320px]
          bg-blue-600 rounded-full
          blur-[150px]
          pointer-events-none
        "
      />

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold mb-6"
        >
          Cara Menggunakan{" "}
          <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            VINSGawe
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mb-16 leading-relaxed text-lg"
        >
          Tiga langkah sederhana untuk mengelola aktivitas,
          memantau progres, dan menyelesaikan pekerjaan
          secara profesional.
        </motion.p>

        {/* STEPS */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="
                group relative p-8 rounded-2xl
                bg-white/80 backdrop-blur
                border border-blue-100/60
                shadow-sm
                hover:shadow-xl hover:shadow-blue-500/10
                transition-all duration-300
              "
            >
              {/* NUMBER BADGE */}
              <div
                className="
                  absolute -top-6 left-6
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

              <h3 className="mt-8 text-lg md:text-xl font-semibold text-gray-900">
                {s.title}
              </h3>

              <p className="mt-3 text-gray-700 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
