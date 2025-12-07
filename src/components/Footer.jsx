"use client";
import { Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

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
    <footer className="relative text-gray-300 pt-28 pb-14 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-12 relative z-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center">
              <span className="font-bold text-white">M</span>
            </div>
            <span className="text-lg font-semibold text-white">
              Magang<span className="text-violet-400">In</span>
            </span>
          </div>

          <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
            Platform personal untuk mencatat aktivitas dan memonitor perjalanan magang secara profesional.
          </p>

          <p className="text-sm mt-4 text-gray-400">
            <span className="text-gray-300 font-medium">Email:</span> support@vins.id
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-white mb-4">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-violet-400 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold text-white mb-4">Terhubung</h4>
          <p className="text-sm mb-5 text-gray-400 max-w-xs">
            Ikuti perkembangan & informasi terbaru.
          </p>

          <div className="flex gap-3">
            {socials.map(({ icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-10 h-10 flex items-center justify-center rounded-xl
                  bg-white/5 border border-white/10
                  hover:bg-violet-600/20 hover:border-violet-500 hover:text-violet-400
                  transition-all duration-300 backdrop-blur-sm
                "
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom line */}
      <div className="mt-14 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-gray-300 font-semibold">MagangIn</span>. All rights reserved.
      </div>
    </footer>
  );
}
