"use client";
import { useEffect, useState } from "react";
import {
  Type,
  Contrast,
  TextCursorInput,
  Accessibility,
  Check,
  Save,
} from "lucide-react";

export default function AksebilitasPage() {
  const [textSize, setTextSize] = useState("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [spacing, setSpacing] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    setTextSize(localStorage.getItem("textSize") || "normal");
    setHighContrast(localStorage.getItem("highContrast") === "true");
    setDyslexicFont(localStorage.getItem("dyslexicFont") === "true");
    setSpacing(localStorage.getItem("spacing") === "true");
  }, []);

  useEffect(() => {
    applySettings();
  }, [textSize, highContrast, dyslexicFont, spacing]);

  const applySettings = () => {
    document.documentElement.style.fontSize =
      textSize === "normal" ? "16px" : textSize === "medium" ? "18px" : "20px";

    document.body.classList.toggle("high-contrast", highContrast);
    document.body.classList.toggle("dyslexic-font", dyslexicFont);
    document.body.classList.toggle("extra-spacing", spacing);
  };

  const saveSettings = () => {
    localStorage.setItem("textSize", textSize);
    localStorage.setItem("highContrast", highContrast);
    localStorage.setItem("dyslexicFont", dyslexicFont);
    localStorage.setItem("spacing", spacing);

    showToast("Pengaturan berhasil disimpan!");
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="space-y-10 relative">

      {/* Toast */}
      {toast && (
        <div className="
          fixed top-24 right-8 
          bg-violet-600/90 backdrop-blur-lg text-white
          px-6 py-3 rounded-xl shadow-lg
          animate-fade-in-up z-50 flex items-center gap-2
        ">
          <Check size={18} /> {toast}
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text">
          Pengaturan Aksesibilitas
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Tingkatkan kenyamanan membaca sesuai kebutuhanmu.
        </p>
      </div>

      <div className="
        bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl
        p-8 shadow-xl space-y-8
      ">

        {/* Font Size */}
        <div>
          <label className="text-gray-200 text-lg font-semibold flex items-center gap-2">
            <Type className="w-5 h-5 text-violet-400" />
            Ukuran Teks
          </label>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {["normal", "medium", "large"].map((size) => (
              <button
                key={size}
                onClick={() => setTextSize(size)}
                className={`
                  px-4 py-3 rounded-xl border text-sm capitalize transition
                  ${textSize === size
                    ? "bg-violet-600 text-white border-violet-500 shadow-md scale-[1.03]"
                    : "bg-white/10 border-white/10 text-gray-200 hover:bg-white/20"
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* High Contrast */}
        <ToggleItem
          label="Mode Kontras Tinggi"
          active={highContrast}
          setActive={setHighContrast}
          icon={<Contrast className="w-5 h-5 text-yellow-400" />}
          activeColor="yellow"
        />

        {/* Dyslexic Font */}
        <ToggleItem
          label="Font Ramah Disleksia"
          active={dyslexicFont}
          setActive={setDyslexicFont}
          icon={<TextCursorInput className="w-5 h-5 text-blue-400" />}
          activeColor="blue"
        />

        {/* Extra Spacing */}
        <ToggleItem
          label="Mode Spasi Lebih Lebar"
          active={spacing}
          setActive={setSpacing}
          icon={<Accessibility className="w-5 h-5 text-green-400" />}
          activeColor="green"
        />

        {/* Save */}
        <div className="flex justify-end pt-4">
          <button
            onClick={saveSettings}
            className="flex items-center gap-2 px-6 py-3 rounded-xl
            bg-gradient-to-r from-violet-600 to-fuchsia-500
            text-white font-semibold shadow-lg
            hover:scale-[1.03] transition"
          >
            <Save className="w-5 h-5" />
            Simpan Pengaturan
          </button>
        </div>

      </div>
    </div>
  );
}

/* Reusable Toggle Component */
function ToggleItem({ label, active, setActive, icon, activeColor }) {
  return (
    <div>
      <label className="text-gray-200 text-lg font-semibold flex items-center gap-2">
        {icon}
        {label}
      </label>

      <button
        onClick={() => setActive(!active)}
        className={`mt-3 px-5 py-3 rounded-xl border transition flex items-center gap-3
        ${
          active
            ? `bg-${activeColor}-600 text-white border-${activeColor}-500 shadow-md`
            : "bg-white/10 text-gray-200 border-white/10 hover:bg-white/20"
        }`}
      >
        {active ? "Aktif" : "Nonaktif"}
      </button>
    </div>
  );
}
