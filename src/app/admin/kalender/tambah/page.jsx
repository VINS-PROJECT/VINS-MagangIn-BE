"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";

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
    <div className="space-y-10">

      {/* ================= PAGE HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-3xl font-extrabold
            bg-gradient-to-r from-blue-600 to-sky-500
            bg-clip-text text-transparent"
          >
            Tambah Agenda
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Buat agenda baru untuk kalender magang
          </p>
        </div>

        <button
          onClick={() => router.back()}
          className="
            inline-flex items-center gap-2 px-4 py-2 rounded-xl
            bg-white/60 backdrop-blur
            border border-white/40
            text-slate-700 hover:bg-white transition
          "
        >
          <ArrowLeft size={16} />
          Kembali
        </button>
      </div>

      {/* ================= FORM CARD ================= */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
          relative max-w-3xl
          rounded-3xl p-10
          bg-white/70 backdrop-blur-xl
          border border-white/40
          shadow-[0_30px_60px_rgba(0,0,0,0.08)]
        "
      >
        {/* glow */}
        <div
          className="
            absolute inset-0 rounded-3xl pointer-events-none
            bg-gradient-to-br from-blue-500/5 to-sky-400/5
          "
        />

        <div className="relative space-y-8">

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Nama Kegiatan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: Meeting dengan Mentor"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="
                w-full h-12 px-4 rounded-xl
                bg-white border border-slate-300
                focus:ring-2 focus:ring-blue-500/30 outline-none
              "
            />
          </div>

          {/* DATE & TIME */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                Tanggal <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
                className="
                  w-full h-12 px-4 rounded-xl
                  bg-white border border-slate-300
                  focus:ring-2 focus:ring-blue-500/30 outline-none
                "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                Jam (opsional)
              </label>
              <input
                type="time"
                value={form.time}
                onChange={(e) =>
                  setForm({ ...form, time: e.target.value })
                }
                className="
                  w-full h-12 px-4 rounded-xl
                  bg-white border border-slate-300
                  focus:ring-2 focus:ring-blue-500/30 outline-none
                "
              />
            </div>
          </div>

          {/* LOCATION */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              Lokasi (opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Ruang Rapat Lt. 3"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
              className="
                w-full h-12 px-4 rounded-xl
                bg-white border border-slate-300
                focus:ring-2 focus:ring-blue-500/30 outline-none
              "
            />
          </div>

          {/* ACTION */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="
                px-6 py-3 rounded-xl
                bg-white border border-slate-300
                text-slate-700 hover:bg-slate-100 transition
              "
            >
              Batal
            </button>

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
              {loading ? "Menyimpan..." : "Simpan Agenda"}
            </button>
          </div>

        </div>
      </motion.form>
    </div>
  );
}
