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

  const handleFilesChange = (e) => {
    const list = Array.from(e.target.files || []);
    setFiles(list);
    setPreview(list.map((f) => URL.createObjectURL(f)));
  };

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
      } else {
        router.push("/admin/track");
      }
    } catch {
      setError("Error koneksi server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <h2
          className="text-3xl font-extrabold
          bg-gradient-to-r from-blue-600 to-sky-500
          bg-clip-text text-transparent"
        >
          Tambah Track Harian
        </h2>

        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
          bg-white/60 backdrop-blur border border-white/40
          text-slate-700 hover:bg-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>
      </div>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="
          relative rounded-3xl p-8 space-y-8
          bg-white/70 backdrop-blur-xl
          border border-white/40
          shadow-[0_30px_60px_rgba(0,0,0,0.08)]
        "
      >
        {/* soft glow */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none
          bg-gradient-to-br from-blue-500/5 to-sky-400/5"
        />

        <div className="relative space-y-8">

          {/* DAY & DATE */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-slate-600 mb-1 block">
                Day ke-
              </label>
              <input
                type="number"
                min="1"
                value={hari}
                onChange={(e) => setHari(e.target.value)}
                className="
                  w-full h-11 px-4 rounded-xl
                  bg-white border border-slate-300
                  focus:ring-2 focus:ring-blue-500/30 outline-none
                "
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600 mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                Tanggal
              </label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="
                  w-full h-11 px-4 rounded-xl
                  bg-white border border-slate-300
                  focus:ring-2 focus:ring-blue-500/30 outline-none
                "
                required
              />
            </div>
          </div>

          {/* AKTIVITAS */}
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1 block">
              Aktivitas
            </label>
            <textarea
              rows={3}
              value={aktivitas}
              onChange={(e) => setAktivitas(e.target.value)}
              placeholder="Tuliskan apa yang dikerjakan hari ini..."
              className="
                w-full px-4 py-3 rounded-xl
                bg-white border border-slate-300
                focus:ring-2 focus:ring-blue-500/30 outline-none
              "
              required
            />
          </div>

          {/* PELAJARAN */}
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1 block">
              Pelajaran
            </label>
            <textarea
              rows={2}
              value={pelajaran}
              onChange={(e) => setPelajaran(e.target.value)}
              placeholder="Insight / hal baru yang dipelajari"
              className="
                w-full px-4 py-3 rounded-xl
                bg-white border border-slate-300
                focus:ring-2 focus:ring-blue-500/30 outline-none
              "
              required
            />
          </div>

          {/* KENDALA */}
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1 block">
              Kendala (opsional)
            </label>
            <textarea
              rows={2}
              value={kendala}
              onChange={(e) => setKendala(e.target.value)}
              placeholder="Kendala / tantangan hari ini"
              className="
                w-full px-4 py-3 rounded-xl
                bg-white border border-slate-300
                focus:ring-2 focus:ring-blue-500/30 outline-none
              "
            />
          </div>

          {/* UPLOAD */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-500" />
              Dokumentasi
            </label>

            <label
              className="
                flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                bg-white border border-dashed border-blue-300
                hover:bg-blue-50 transition
              "
            >
              <Upload className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">
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

            {/* PREVIEW */}
            {preview.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                {preview.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="preview"
                    className="
                      h-28 w-full object-cover rounded-xl
                      border border-white/40 shadow-sm
                    "
                  />
                ))}
              </div>
            )}
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {/* SUBMIT */}
          <div className="flex justify-end pt-2">
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
              <Save className="w-5 h-5" />
              {loading ? "Menyimpan..." : "Simpan Track"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
