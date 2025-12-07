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
            className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900"
          >
            Kelola & Pantau Progres{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent relative">
              Magang
              <motion.span
                animate={{ x: ["-150%", "150%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/70 to-transparent"
                style={{ mixBlendMode: "overlay" }}
              />
            </span>
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            variants={{ hidden: { y: 20 }, visible: { y: 0 } }}
            transition={{ duration: 0.9 }}
            className="mt-6 text-gray-600 max-w-2xl text-lg leading-relaxed"
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r 
                from-blue-600 to-sky-500 text-white font-semibold shadow-lg
                flex items-center gap-2 transition"
            >
              Mulai Sekarang
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-full border border-blue-400 
                text-blue-600 hover:bg-blue-50 transition font-semibold"
            >
              Jelajahi Fitur
            </motion.button>
          </motion.div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8 inline-flex items-center gap-2 text-blue-700 text-sm 
            px-4 py-2 rounded-full bg-blue-50 border border-blue-200"
          >
            <Sparkles size={16} className="text-blue-500" />
            Digunakan untuk monitoring magang 💼
          </motion.div>
        </motion.div>
      </div>

      {/* Soft Orbs */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.07 }}
        transition={{ duration: 2 }}
        className="absolute right-0 top-1/4 w-[450px] h-[450px] 
        bg-sky-400 rounded-full blur-[180px] pointer-events-none"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.07 }}
        transition={{ duration: 2.4 }}
        className="absolute left-[-200px] bottom-[-100px] w-[480px] h-[480px] 
        bg-blue-600 rounded-full blur-[160px] pointer-events-none"
      />
    </section>
  );
}
