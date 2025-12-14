"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Track", href: "/track" },
    { label: "Logbook", href: "/logbook" },
    { label: "Kalender", href: "/kalender" },
  ];

  const socials = [
    {
      icon: <Linkedin size={18} />,
      url: "https://www.linkedin.com/in/kevinsimorangkir/",
    },
    {
      icon: <Instagram size={18} />,
      url: "https://instagram.com/vins.ch",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-white text-gray-800 pt-24 pb-10 border-t border-blue-100">

      {/* MASK – top fade */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white to-transparent" />
      </div>

      {/* SOFT GLOW */}
      <div
        className="
          absolute right-[-140px] bottom-[-140px]
          w-[360px] h-[360px]
          bg-sky-400/30
          rounded-full blur-[160px]
          pointer-events-none
        "
      />

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid gap-14 md:grid-cols-3 relative z-10">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div
              className="
                w-11 h-11 rounded-xl
                bg-white/85 backdrop-blur
                border border-gray-200/60
                shadow-sm
                flex items-center justify-center
              "
            >
              <Image
                src="/VINS2.svg"
                alt="VINSGawe"
                width={26}
                height={26}
                className="object-contain"
              />
            </div>

            <span className="text-lg font-semibold tracking-tight text-gray-900">
              VINS
              <span className="ml-1 bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                Gawe
              </span>
            </span>
          </div>

          <p className="text-sm leading-relaxed text-gray-600 max-w-sm">
            Platform produktivitas personal untuk mencatat aktivitas,
            memantau progres, dan mengelola pekerjaan atau magang
            secara terstruktur dan profesional.
          </p>

          <p className="text-sm mt-5 text-gray-600">
            <span className="font-medium text-gray-800">Email:</span>{" "}
            vin.simorangkir81@gmail.com
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-5">
            Navigasi
          </h4>
          <ul className="space-y-3 text-sm">
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
          <h4 className="font-semibold text-gray-900 mb-5">
            Terhubung
          </h4>
          <p className="text-sm mb-6 text-gray-600 max-w-xs">
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
                  w-11 h-11
                  flex items-center justify-center
                  rounded-xl
                  bg-white/85 backdrop-blur
                  border border-gray-200/60
                  shadow-sm
                  hover:shadow-lg hover:shadow-blue-500/10
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
      <div className="mt-14 pt-6 border-t border-gray-200 text-center text-sm text-gray-600 relative z-10">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-900">VINSGawe</span>{" "}
        by{" "}
        <a
          href="https://kvn-code.asia/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-blue-600 transition"
        >
          VINS
        </a>
        . Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}
