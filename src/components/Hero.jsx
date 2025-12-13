"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-36 pb-40 overflow-clip bg-white">

      {/* MASK – kontrol overflow glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.14 },
            },
          }}
        >
          {/* TITLE */}
          <motion.h1
            variants={{ hidden: { y: 22 }, visible: { y: 0 } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="
              text-5xl md:text-6xl font-extrabold
              leading-tight tracking-tight
              text-gray-900
            "
          >
            Kelola Progres & Aktivitas
            <br />
            dengan{" "}
            <span className="relative inline-block bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              VINSGawe
              {/* shimmer */}
              <motion.span
                animate={{ x: ["-120%", "120%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
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
            variants={{ hidden: { y: 20 }, visible: { y: 0 } }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="
              mt-6 max-w-2xl
              text-lg leading-relaxed
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
            className="mt-10 flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="
                px-7 py-3.5 rounded-full
                bg-gradient-to-r from-blue-600 to-sky-500
                text-white font-semibold
                shadow-lg shadow-blue-500/25
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
                px-7 py-3.5 rounded-full
                border border-blue-400/60
                text-blue-600 font-semibold
                hover:bg-blue-50
                transition
              "
            >
              Lihat Cara Kerja
            </motion.button>
          </motion.div>

          {/* STATUS BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="
              mt-8 inline-flex items-center gap-2
              text-sm font-medium
              text-blue-700
              px-4 py-2 rounded-full
              bg-blue-50/80
              border border-blue-200/70
              backdrop-blur
            "
          >
            <Sparkles size={16} className="text-blue-500" />
            Productivity & progress tracking platform
          </motion.div>
        </motion.div>
      </div>

      {/* SOFT GLOWS – VINSGawe scale */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.06 }}
        transition={{ duration: 2 }}
        className="
          absolute right-[-120px] top-1/4
          w-[340px] h-[340px]
          bg-sky-400 rounded-full
          blur-[140px]
          pointer-events-none
        "
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.06 }}
        transition={{ duration: 2.4 }}
        className="
          absolute left-[-140px] bottom-[-120px]
          w-[360px] h-[360px]
          bg-blue-600 rounded-full
          blur-[140px]
          pointer-events-none
        "
      />
    </section>
  );
}
