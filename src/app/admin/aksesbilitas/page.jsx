"use client";
import { useEffect, useState } from "react";
import { Type, Contrast, TextCursorInput, Accessibility, Pencil } from "lucide-react";
import Link from "next/link";

export default function AksesibilitasView() {
  const [textSize, setTextSize] = useState("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [spacing, setSpacing] = useState(false);

  useEffect(() => {
    setTextSize(localStorage.getItem("textSize") || "normal");
    setHighContrast(localStorage.getItem("highContrast") === "true");
    setDyslexicFont(localStorage.getItem("dyslexicFont") === "true");
    setSpacing(localStorage.getItem("spacing") === "true");
  }, []);

  return (
    <div className="space-y-10 text-gray-900">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-blue-600">
            Aksesibilitas (View)
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Lihat pengaturan aksesibilitas yang sedang aktif.
          </p>
        </div>

        <Link
          href="/admin/aksesbilitas"
          className="flex items-center gap-2 px-6 py-3 rounded-xl
          bg-blue-600 text-white shadow-lg font-semibold
          hover:bg-blue-700 transition"
        >
          <Pencil className="w-5 h-5" />
          Edit Pengaturan
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 space-y-8">

        {/* TEXT SIZE */}
        <ViewItem
          label="Ukuran Teks"
          value={
            textSize === "normal"
              ? "Normal"
              : textSize === "medium"
              ? "Sedang"
              : "Besar"
          }
          icon={<Type className="w-5 h-5 text-blue-600" />}
        />

        {/* HIGH CONTRAST */}
        <ViewItem
          label="Mode Kontras Tinggi"
          value={highContrast ? "Aktif" : "Nonaktif"}
          icon={<Contrast className="w-5 h-5 text-yellow-500" />}
        />

        {/* DYSLEXIC FONT */}
        <ViewItem
          label="Font Ramah Disleksia"
          value={dyslexicFont ? "Aktif" : "Nonaktif"}
          icon={<TextCursorInput className="w-5 h-5 text-blue-600" />}
        />

        {/* SPACING */}
        <ViewItem
          label="Spasi Lebih Lebar"
          value={spacing ? "Aktif" : "Nonaktif"}
          icon={<Accessibility className="w-5 h-5 text-green-600" />}
        />

      </div>
    </div>
  );
}

function ViewItem({ label, value, icon }) {
  return (
    <div className="flex justify-between border-b pb-4 last:border-none">
      <div className="flex items-center gap-3 text-gray-800 font-medium">
        {icon}
        {label}
      </div>
      <span className={`font-semibold ${
        value === "Aktif"
          ? "text-blue-600"
          : "text-gray-600"
      }`}>
        {value}
      </span>
    </div>
  );
}
