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
    const onScroll = () => setScrolled(window.scrollY > 14);
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
        backdrop-blur-2xl
        ${
          scrolled
            ? "bg-white/85 border-b border-gray-200/60 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
            : "bg-white/60"
        }
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">

        {/* ================= LOGO ================= */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="
              w-10 h-10 rounded-xl
              bg-white/90
              border border-gray-200/60
              backdrop-blur
              shadow-sm
              flex items-center justify-center
            "
          >
            <Image
              src="/VINS2.svg"
              alt="VINS Gawe"
              width={26}
              height={26}
              priority
              className="object-contain"
            />
          </motion.div>

          <span className="font-semibold text-lg tracking-tight">
            VINS
            <span className="ml-1 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Gawe
            </span>
          </span>
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  relative px-4 py-2 rounded-full transition-colors
                  ${
                    active
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }
                `}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="
                      absolute inset-0 -z-10
                      bg-gradient-to-r from-blue-500/15 to-cyan-400/15
                      border border-blue-500/20
                      rounded-full
                    "
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            md:hidden p-2.5 rounded-xl
            bg-gray-100/80 hover:bg-gray-200/80
            border border-gray-200/60
            transition
          "
          aria-label="Toggle menu"
        >
          <motion.svg
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-5 text-gray-900"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m0 6H4" />
            )}
          </motion.svg>
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="
              md:hidden mx-4 mb-4
              rounded-2xl
              bg-white/95 backdrop-blur-2xl
              border border-gray-200/60
              shadow-[0_20px_60px_rgba(0,0,0,0.12)]
              px-6 py-4
            "
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`
                      px-4 py-2.5 rounded-xl transition
                      ${
                        active
                          ? "bg-blue-500/10 text-blue-600 font-medium"
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
