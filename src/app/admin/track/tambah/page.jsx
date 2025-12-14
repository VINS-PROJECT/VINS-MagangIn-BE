"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Save,
  Image as ImageIcon,
  ArrowLeft,
  Upload,
} from "lucide-react";

export default function TambahTrackPage() {
  const router = useRouter();

  const [hari, setHari] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [aktivitas, setAktivitas] = useState("");
  const [pelajaran, setPelajaran] = useState("");
  const [kendala, setKendala] = useState("");
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FILE HANDLER ================= */
  const handleFilesChange = (e) => {
    const list = Array.from(e.target.files || []);
    setFiles(list);
    setPreview(list.map((f) => URL.createObjectURL(f)));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const form = new FormData();
      form.append("hari", hari);
      form.append("tanggal", tanggal);
      form.append("aktivitas", aktivitas);
      form.append("pelajaran", pelajaran);
      form.append("kendala", kendala);
      files.forEach((f) => form.append("images", f));

      const res = await fetch("/api/admin/track", {
        method: "POST",
        body: form,
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Gagal menyimpan track");
        return;
      }

      router.push("/admin/track");
    } catch {
      setError("Terjadi kesalahan koneksi server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <h2
          className="
            text-3xl font-extrabold
            bg-gradient-to-r from-blue-600 to-sky-500
            bg-clip-text text-transparent
          "
        >
          Tambah Track Harian
        </h2>

        <button
          type="button"
          onClick={() => router.back()}
          className="
            inline-flex items-center gap-2
            px-4 py-2 rounded-xl
            bg-white/70 backdrop-blur
            border border-white/40
            text-slate-700
            hover:bg-white
            transition
          "
        >
          <ArrowLeft size={16} />
          Kembali
        </button>
      </div>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="
          relative rounded-3xl p-8 space-y-8
          bg-white/80 backdrop-blur-xl
          border border-white/40
          shadow-[0_30px_60px_rgba(0,0,0,0.08)]
        "
      >
        <div className="absolute inset-0 rounded-3xl pointer-events-none
          bg-gradient-to-br from-blue-500/5 to-sky-400/5" />

        <div className="relative space-y-8">

          {/* DAY & DATE */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-slate-600 mb-1 block">
                Hari ke-
              </label>
              <input
                type="number"
                min="1"
                value={hari}
                onChange={(e) => setHari(e.target.value)}
                required
                className="w-full h-11 px-4 rounded-xl bg-white
                border border-slate-300 focus:ring-2 focus:ring-blue-500/30 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600 mb-1 flex items-center gap-2">
                <Calendar size={16} className="text-blue-500" />
                Tanggal
              </label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                required
                className="w-full h-11 px-4 rounded-xl bg-white
                border border-slate-300 focus:ring-2 focus:ring-blue-500/30 outline-none"
              />
            </div>
          </div>

          {/* TEXTAREA */}
          {[
            ["aktivitas", aktivitas, setAktivitas, "Aktivitas", true],
            ["pelajaran", pelajaran, setPelajaran, "Pelajaran", true],
            ["kendala", kendala, setKendala, "Kendala (opsional)", false],
          ].map(([key, value, setter, label, required]) => (
            <div key={key}>
              <label className="text-sm font-medium text-slate-600 mb-1 block">
                {label}
              </label>
              <textarea
                rows={3}
                value={value}
                onChange={(e) => setter(e.target.value)}
                required={required}
                className="w-full px-4 py-3 rounded-xl bg-white
                border border-slate-300 focus:ring-2 focus:ring-blue-500/30 outline-none"
              />
            </div>
          ))}

          {/* UPLOAD */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <ImageIcon size={16} className="text-blue-500" />
              Dokumentasi
            </label>

            <label className="
              flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
              bg-white border border-dashed border-blue-300
              hover:bg-blue-50 transition
            ">
              <Upload size={18} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                Upload gambar (bisa lebih dari satu)
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFilesChange}
                className="hidden"
              />
            </label>

            {preview.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {preview.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="preview"
                    className="h-28 w-full object-cover rounded-xl border shadow-sm"
                  />
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* SUBMIT */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="
                inline-flex items-center gap-2 px-7 py-3 rounded-xl
                bg-gradient-to-r from-blue-600 to-sky-500
                text-white font-semibold
                shadow-md hover:brightness-110 transition
                disabled:opacity-60
              "
            >
              <Save size={18} />
              {loading ? "Menyimpan..." : "Simpan Track"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
