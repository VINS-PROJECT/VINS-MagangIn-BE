"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function TambahAgendaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.date) {
      alert("Nama kegiatan dan tanggal wajib diisi");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Gagal menyimpan agenda");

      router.push("/admin/kalender");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto py-24 px-6 space-y-8">

      {/* BACK */}
      <Link
        href="/admin/kalender"
        className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm"
      >
        <ArrowLeft size={16} />
        Kembali ke Kalender
      </Link>

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-blue-700"
      >
        Tambah Agenda Baru
      </motion.h1>

      {/* FORM */}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm space-y-5"
      >
        {/* JUDUL */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Nama Kegiatan <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Contoh: Meeting dengan Mentor"
            className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-600"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
        </div>

        {/* TANGGAL */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Tanggal <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-600"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />
        </div>

        {/* JAM */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Jam (opsional)
          </label>
          <input
            type="time"
            className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-600"
            value={form.time}
            onChange={(e) =>
              setForm({ ...form, time: e.target.value })
            }
          />
        </div>

        {/* LOKASI */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Lokasi (opsional)
          </label>
          <input
            type="text"
            placeholder="Contoh: Ruang Rapat Lt. 3"
            className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-600"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
          >
            Batal
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-60 text-sm"
          >
            <Save size={16} />
            {loading ? "Menyimpan..." : "Simpan Agenda"}
          </button>
        </div>
      </motion.form>
    </section>
  );
}
