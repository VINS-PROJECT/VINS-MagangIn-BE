"use client";
import { motion } from "framer-motion";

export default function Impact() {
  const stats = [
    { label: "Aktivitas Tercatat", value: "1.250+" },
    { label: "Dokumentasi Tersimpan", value: "3.400+" },
    { label: "Progress Project", value: "95%" },
    { label: "Hari Magang Dipantau", value: "180+" },
  ];

  return (
    <section className="relative overflow-hidden text-white pt-28 pb-40 md:pt-32 md:pb-52">

      {/* 🌫 Orbs — lebih rendah + opacity halus */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        whileInView={{ opacity: 0.06, y: 0, scale: 1 }}
        transition={{ duration: 1.8 }}
        viewport={{ once: true }}
        className="absolute right-[-100px] top-[160px] w-[380px] h-[380px] bg-fuchsia-500 rounded-full blur-[180px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        whileInView={{ opacity: 0.06, y: 0, scale: 1 }}
        transition={{ duration: 2.2 }}
        viewport={{ once: true }}
        className="absolute left-[-180px] bottom-[-120px] w-[340px] h-[340px] bg-violet-600 rounded-full blur-[170px] pointer-events-none"
      />

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5">
            Dampak Penggunaan{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Magang VINS
            </span>
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto mb-16">
            Produktivitas meningkat, semua kegiatan tercatat, progres lebih terpantau.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-7 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10
              hover:bg-white/10 hover:scale-[1.06] transition duration-300"
            >
              <h3 className="text-4xl font-bold text-violet-400">{item.value}</h3>
              <p className="mt-2 text-gray-300 text-sm md:text-base">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
