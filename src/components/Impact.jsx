"use client";
import { motion } from "framer-motion";

export default function Impact() {
  const stats = [
    { label: "Aktivitas Tercatat", value: "1.250+" },
    { label: "Dokumentasi Tersimpan", value: "3.400+" },
    { label: "Progres Proyek", value: "95%" },
    { label: "Hari Aktivitas Dipantau", value: "180+" },
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
        transition={{ duration: 2.2, ease: "easeOut" }}
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
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5">
            Dampak Penggunaan{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              VINSGawe
            </span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
            VINSGawe membantu meningkatkan produktivitas,
            memastikan setiap aktivitas terdokumentasi,
            dan progres kerja terpantau secara real-time.
          </p>
        </motion.div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="
                relative p-7 rounded-2xl
                bg-white/80 backdrop-blur
                border border-blue-100/60
                shadow-sm
                hover:shadow-xl hover:shadow-blue-500/10
                transition-all duration-300
              "
            >
              <h3 className="
                text-4xl font-bold
                bg-gradient-to-r from-blue-600 to-sky-500
                bg-clip-text text-transparent
              ">
                {item.value}
              </h3>
              <p className="mt-2 text-gray-700 text-sm md:text-base font-medium">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
