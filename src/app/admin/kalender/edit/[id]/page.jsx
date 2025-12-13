"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";

export default function EditAgendaPage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
  });

  /* ================= LOAD AGENDA ================= */
  useEffect(() => {
    if (!id) return;

    async function loadAgenda() {
      try {
        const res = await fetch(`/api/admin/calendar/${id}`);
        if (!res.ok) throw new Error("Gagal load agenda");

        const json = await res.json();
        setForm({
          title: json.data.title || "",
          date: json.data.date || "",
          time: json.data.time || "",
          location: json.data.location || "",
        });
      } catch (err) {
        console.error(err);
        alert("Agenda tidak ditemukan");
        router.push("/admin/kalender");
      } finally {
        setLoading(false);
      }
    }

    loadAgenda();
  }, [id, router]);

  /* ================= UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date) {
      return alert("Judul dan tanggal wajib diisi");
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/calendar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Gagal update agenda");

      alert("Agenda berhasil diperbarui");
      router.push("/admin/kalender");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus agenda ini?")) return;

    try {
      const res = await fetch(`/api/admin/calendar/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus agenda");

      alert("Agenda berhasil dihapus");
      router.push("/admin/kalender");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Memuat agenda...
      </div>
    );
  }

  return (
    <section className="max-w-xl mx-auto py-20 px-6 space-y-8">
      {/* Back */}
      <Link
        href="/admin/kalender"
        className="inline-flex items-center gap-2 text-blue-600 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Kalender
      </Link>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-blue-700"
      >
        Edit Agenda Kalender
      </motion.h1>

      {/* FORM */}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-xl border border-blue-200 shadow-sm"
      >
        {/* Judul */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Nama Kegiatan <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-600"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
        </div>

        {/* Tanggal */}
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

        {/* Jam */}
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

        {/* Lokasi */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Lokasi (opsional)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-600"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />
        </div>

        {/* ACTION */}
        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
          >
            <Trash2 size={16} />
            Hapus
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </motion.form>
    </section>
  );
}
