"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-44 overflow-hidden bg-white">

      {/* MASK – bottom fade */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.16 } },
          }}
        >
          {/* EYEBROW / BADGE */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7 }}
            className="
              inline-flex items-center gap-2
              px-4 py-2 mb-6
              rounded-full
              bg-blue-50/80 backdrop-blur
              border border-blue-200/60
              text-sm font-medium text-blue-700
            "
          >
            <Sparkles size={16} className="text-blue-500" />
            Productivity & Progress Platform
          </motion.div>

          {/* TITLE */}
          <motion.h1
            variants={{ hidden: { y: 26, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="
              text-5xl md:text-6xl xl:text-7xl
              font-extrabold
              leading-[1.1]
              tracking-tight
              text-gray-900
            "
          >
            Kelola Progres & Aktivitas
            <br />
            dengan{" "}
            <span className="relative inline-block bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              VINSGawe
              {/* SHIMMER */}
              <motion.span
                aria-hidden
                animate={{ x: ["-120%", "120%"] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: "linear",
                }}
                className="
                  absolute inset-0
                  bg-gradient-to-r
                  from-transparent via-white/60 to-transparent
                "
                style={{ mixBlendMode: "overlay" }}
              />
            </span>
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            variants={{ hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="
              mt-7 max-w-2xl
              text-lg md:text-xl
              leading-relaxed
              text-gray-600
            "
          >
            VINSGawe membantu kamu mencatat aktivitas, memantau progres,
            dan mengelola perjalanan kerja atau magang
            secara terstruktur, rapi, dan profesional.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 1 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="
                px-8 py-4 rounded-full
                bg-gradient-to-r from-blue-600 to-sky-500
                text-white font-semibold
                shadow-[0_16px_40px_rgba(37,99,235,0.35)]
                flex items-center gap-2
                transition
              "
            >
              Mulai dengan VINSGawe
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="
                px-8 py-4 rounded-full
                border border-blue-300/70
                text-blue-600 font-semibold
                hover:bg-blue-50
                transition
              "
            >
              Lihat Cara Kerja
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* SOFT GLOWS */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.08 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="
          absolute right-[-140px] top-1/4
          w-[380px] h-[380px]
          bg-sky-400 rounded-full
          blur-[160px]
          pointer-events-none
        "
      />

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.08 }}
        transition={{ duration: 2.6, ease: "easeOut" }}
        className="
          absolute left-[-160px] bottom-[-140px]
          w-[420px] h-[420px]
          bg-blue-600 rounded-full
          blur-[160px]
          pointer-events-none
        "
      />
    </section>
  );
}
