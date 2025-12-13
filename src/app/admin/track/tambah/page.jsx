"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Save, Image as ImageIcon, ArrowLeft } from "lucide-react";

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

    const urls = list.map((f) => URL.createObjectURL(f));
    setPreview(urls);
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
    } catch (err) {
      console.error(err);
      setError("Error koneksi server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 text-transparent bg-clip-text">
          Tambah Track Harian
        </h2>

        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-blue-100 rounded-2xl shadow-md p-6 space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-5">
          {/* Hari ke- */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Day ke-
            </label>
            <input
              type="number"
              min="1"
              value={hari}
              onChange={(e) => setHari(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>

          {/* Tanggal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              Tanggal
            </label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>
        </div>

        {/* Aktivitas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Aktivitas
          </label>
          <textarea
            rows={3}
            value={aktivitas}
            onChange={(e) => setAktivitas(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-600 outline-none"
            placeholder="Tuliskan apa yang dikerjakan hari ini..."
            required
          />
        </div>

        {/* Pelajaran */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pelajaran
          </label>
          <textarea
            rows={2}
            value={pelajaran}
            onChange={(e) => setPelajaran(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-600 outline-none"
            placeholder="Apa yang dipelajari / insight hari ini?"
            required
          />
        </div>

        {/* Kendala */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kendala (opsional)
          </label>
          <textarea
            rows={2}
            value={kendala}
            onChange={(e) => setKendala(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-600 outline-none"
            placeholder="Tulis tantangan / kendala hari ini (jika ada)"
          />
        </div>

        {/* Upload dokumentasi */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-blue-500" />
            Dokumentasi (bisa lebih dari satu)
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesChange}
            className="block w-full text-sm text-gray-600
            file:mr-4 file:py-2 file:px-4
            file:rounded-xl file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          />

          {/* Preview */}
          {preview.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              {preview.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="w-full h-24 object-cover rounded-xl border border-blue-100"
                  alt="preview"
                />
              ))}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            <Save className="w-5 h-5" />
            {loading ? "Menyimpan..." : "Simpan Track"}
          </button>
        </div>
      </form>
    </div>
  );
}
