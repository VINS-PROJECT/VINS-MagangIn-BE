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
    <footer className="relative bg-white text-gray-800 pt-24 pb-10 overflow-hidden border-t border-blue-100">

      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-12 relative z-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center">
              <span className="font-bold text-white">M</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">
              Magang<span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">In</span>
            </span>
          </div>

          <p className="text-sm leading-relaxed text-gray-600 max-w-xs">
            Platform personal untuk mencatat aktivitas dan memonitor perjalanan magang secara profesional.
          </p>

          <p className="text-sm mt-4 text-gray-600">
            <span className="font-medium text-gray-800">Email:</span> support@vins.id
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Terhubung</h4>
          <p className="text-sm mb-5 text-gray-600 max-w-xs">
            Ikuti perkembangan & informasi terbaru.
          </p>

          <div className="flex gap-3">
            {socials.map(({ icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl
                bg-gray-100 border border-gray-200
                hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600
                transition-all duration-300"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom line */}
      <div className="mt-14 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-900">MagangIn</span>. Semua hak cipta dilindungi.
      </div>
    </footer>
  );
}
