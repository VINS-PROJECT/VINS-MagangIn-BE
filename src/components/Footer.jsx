"use client";

import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Track", href: "/track" },
    { label: "Logbook", href: "/logbook" },
    { label: "Kalender", href: "/kalender" },
  ];

  const socials = [
    { icon: <Twitter size={18} />, url: "https://twitter.com" },
    { icon: <Linkedin size={18} />, url: "https://linkedin.com" },
    { icon: <Instagram size={18} />, url: "https://instagram.com" },
    { icon: <Youtube size={18} />, url: "https://youtube.com" },
  ];

  return (
    <footer className="relative overflow-clip bg-white text-gray-800 pt-20 pb-8 border-t border-blue-100">

      {/* MASK – kontrol glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
      </div>

      {/* SOFT GLOW – VINSGawe scale */}
      <div
        className="
          absolute right-[-120px] bottom-[-120px]
          w-[320px] h-[320px]
          bg-sky-400/30
          rounded-full blur-[140px]
          pointer-events-none
        "
      />

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid gap-12 md:grid-cols-3 relative z-10">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="
                w-10 h-10 rounded-xl
                bg-white/80 backdrop-blur
                border border-gray-200/60
                shadow-sm
                flex items-center justify-center
                overflow-hidden
              "
            >
              <Image
                src="/logo.svg"
                alt="VINSGawe"
                width={26}
                height={26}
                className="object-contain"
              />
            </div>

            <span className="text-lg font-semibold text-gray-900 tracking-tight">
              VINS
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                Gawe
              </span>
            </span>
          </div>

          <p className="text-sm leading-relaxed text-gray-600 max-w-xs">
            Platform produktivitas personal untuk mencatat aktivitas,
            memantau progres, dan mengelola pekerjaan atau magang
            secara terstruktur dan profesional.
          </p>

          <p className="text-sm mt-4 text-gray-600">
            <span className="font-medium text-gray-800">Email:</span>{" "}
            support@vins.id
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="
                    font-medium
                    text-gray-700
                    hover:text-blue-600
                    transition-colors
                  "
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Terhubung</h4>
          <p className="text-sm mb-5 text-gray-600 max-w-xs">
            Ikuti pembaruan dan informasi terbaru dari VINSGawe.
          </p>

          <div className="flex gap-3">
            {socials.map(({ icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-xl
                  bg-white/80 backdrop-blur
                  border border-gray-200/60
                  shadow-sm
                  hover:shadow-md
                  hover:border-blue-400
                  hover:text-blue-600
                  transition-all duration-300
                "
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-600 relative z-10">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-900">VINSGawe</span>.
        Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}
