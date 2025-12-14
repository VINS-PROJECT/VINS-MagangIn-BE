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
          absolute right-[-120px] top-[120px]
          w-[360px] h-[360px]
          bg-sky-400 rounded-full
          blur-[160px]
          pointer-events-none
        "
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-extrabold mb-6">
            Dampak Penggunaan{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              VINSGawe
            </span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-20 text-lg leading-relaxed">
            VINSGawe membantu meningkatkan produktivitas,
            memastikan setiap aktivitas terdokumentasi,
            serta memantau progres kerja secara konsisten
            dan real-time.
          </p>
        </motion.div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="
                group relative p-8 rounded-2xl
                bg-white/85 backdrop-blur-xl
                border border-blue-200/50
                shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                hover:shadow-[0_20px_50px_rgba(37,99,235,0.18)]
                transition-all duration-300
              "
            >
              {/* subtle top highlight */}
              <div className="
                absolute inset-x-0 top-0 h-px
                bg-gradient-to-r from-transparent via-blue-400/40 to-transparent
                opacity-0 group-hover:opacity-100
                transition
              " />

              <h3
                className="
                  text-4xl md:text-5xl font-extrabold
                  bg-gradient-to-r from-blue-600 to-sky-500
                  bg-clip-text text-transparent
                "
              >
                {item.value}
              </h3>

              <p className="mt-3 text-gray-700 text-sm md:text-base font-medium">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
