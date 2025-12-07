"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function LoginPage() {
  const [isDark, setIsDark] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem("theme") === "dark";
    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#0b0f15] px-6 overflow-hidden">

      {/* 🌌 Animated Background Gradient Aurora */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-br from-violet-700/30 via-fuchsia-600/20 to-indigo-700/30 blur-[90px]"
      />

      {/* ✨ Floating Particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scale: [0.8, 1.2, 0.8],
            y: [-30, 30, -30],
          }}
          transition={{
            duration: 6 + i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bg-violet-500/20 blur-xl rounded-full"
          style={{
            width: Math.random() * 40 + 20,
            height: Math.random() * 40 + 20,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        ></motion.div>
      ))}

      {/* 🟣 Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="
          w-full max-w-md p-10 rounded-3xl relative z-10
          bg-white/[0.06] dark:bg-white/[0.06]
          backdrop-blur-2xl border border-white/20
          shadow-[0_0_50px_rgba(139,92,246,0.25)]
        "
      >
        {/* Brand */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]"
          >
            Magang VINS
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-gray-400 text-sm mt-2"
          >
            Lanjutkan perjalanan magangmu dengan lebih profesional.
          </motion.p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="
                w-full px-4 py-3 rounded-xl 
                bg-white/10 border border-white/20 
                text-white placeholder-gray-400 
                outline-none
                focus:ring-2 focus:ring-violet-500/70
                shadow-[inset_0_0_12px_rgba(255,255,255,0.08)]
              "
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Kata Sandi
            </label>
            <input
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              className="
                w-full px-4 py-3 rounded-xl 
                bg-white/10 border border-white/20 
                text-white placeholder-gray-400
                outline-none
                focus:ring-2 focus:ring-violet-500/70
                shadow-[inset_0_0_12px_rgba(255,255,255,0.08)]
              "
              required
            />

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-[47px] text-gray-300 hover:text-white"
            >
              {showPass ? <HiEyeOff size={22} /> : <HiEye size={22} />}
            </button>
          </div>

          {/* Remember */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-400">
              <input type="checkbox" className="accent-violet-500" /> Ingat saya
            </label>
            <Link href="#" className="text-violet-400 hover:underline">
              Lupa password?
            </Link>
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="
              w-full py-3 rounded-xl font-semibold 
              bg-gradient-to-r from-violet-600 to-fuchsia-500 
              text-white shadow-lg 
              hover:shadow-violet-400/40
            "
          >
            Masuk
          </motion.button>
        </form>

        {/* Divider */}
        <div className="my-8 relative">
          <div className="border-t border-white/20" />
          <p className="absolute inset-0 -top-3 text-center text-xs text-gray-500">
            atau
          </p>
        </div>

        {/* Create Account */}
        <Link
          href="/register"
          className="
            block text-center py-3 rounded-xl 
            border border-violet-400/40 
            text-violet-300 font-medium 
            hover:bg-violet-500/20 transition
          "
        >
          Daftar Akun Baru
        </Link>
      </motion.div>
    </main>
  );
}
