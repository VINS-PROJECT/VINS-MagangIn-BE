"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-44">

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
        >

          {/* TITLE */}
          <motion.h1
            variants={{ hidden: { y: 20 }, visible: { y: 0 } }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"
          >
            Kelola & Pantau Progres{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent relative">
              Magang
              <motion.span
                animate={{ x: ["-150%", "150%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                style={{ mixBlendMode: "overlay" }}
              />
            </span>
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            variants={{ hidden: { y: 20 }, visible: { y: 0 } }}
            transition={{ duration: 0.9 }}
            className="mt-6 text-gray-300 max-w-2xl text-lg leading-relaxed"
          >
            Pantau logbook, timeline, dan dokumentasi harian kamu dalam
            satu platform monitoring magang yang modern & profesional.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 1 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 
              font-semibold shadow-[0_0_20px_rgba(168,85,247,0.45)]
              flex items-center gap-2 transition"
            >
              Mulai Sekarang
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-full border border-violet-400/50 text-violet-300 
              hover:bg-violet-600/10 transition font-semibold"
            >
              Jelajahi Fitur
            </motion.button>
          </motion.div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8 inline-flex items-center gap-2 text-violet-300 text-sm px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <Sparkles size={16} className="text-fuchsia-300" />
            Dipakai untuk monitoring magang 💼
          </motion.div>
        </motion.div>
      </div>

      {/* 🔮 Soft Orbs — LOWERED */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.09 }}
        transition={{ duration: 2 }}
        className="absolute right-0 top-1/4 w-[450px] h-[450px] bg-fuchsia-500 rounded-full blur-[180px] pointer-events-none"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.08 }}
        transition={{ duration: 2.4 }}
        className="absolute left-[-200px] bottom-[-100px] w-[480px] h-[480px] bg-violet-600 rounded-full blur-[160px] pointer-events-none"
      />
    </section>
  );
}
