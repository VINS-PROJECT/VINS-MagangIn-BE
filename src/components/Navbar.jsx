"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/track", label: "Track" },
    { href: "/logbook", label: "Logbook" },
    { href: "/kalender", label: "Kalendar" },
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        backdrop-blur-xl
        ${
          scrolled
            ? "bg-white/80 border-b border-gray-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            : "bg-white/50"
        }
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">

        {/* ================= LOGO ================= */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="
              w-10 h-10 rounded-xl
              bg-white/90
              border border-gray-200/60
              backdrop-blur
              shadow-sm
              flex items-center justify-center
              overflow-hidden
            "
          >
            <Image
              src="/logo.svg"       // 🔁 ganti ke logo external kapan saja
              alt="VINS Gawe"
              width={28}
              height={28}
              priority
              className="object-contain"
            />
          </motion.div>

          <span className="font-semibold text-lg tracking-tight">
            VINS
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Gawe
            </span>
          </span>
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  relative px-4 py-2 rounded-full transition
                  ${
                    active
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }
                `}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="
                      absolute inset-0 -z-10
                      bg-blue-500/10
                      rounded-full
                    "
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            md:hidden p-2 rounded-xl
            bg-gray-100/70 hover:bg-gray-200/70
            transition
          "
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5 text-gray-900"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m0 6H4"
              />
            )}
          </svg>
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="
              md:hidden mx-4 mb-4
              rounded-2xl
              bg-white/90 backdrop-blur-xl
              shadow-xl
              border border-gray-200/60
              px-6 py-4
            "
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`
                      px-4 py-2 rounded-lg transition
                      ${
                        active
                          ? "bg-blue-500/10 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
