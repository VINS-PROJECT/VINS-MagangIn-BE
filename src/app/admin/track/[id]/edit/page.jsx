"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Save, ArrowLeft, Trash2 } from "lucide-react";

export default function TrackEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/admin/track/${id}`, { cache: "no-store" });
      const json = await res.json();
      setForm(json.data);
    }
    load();
  }, [id]);

  if (!form) {
    return <div className="text-center py-20 text-gray-500">Memuat...</div>;
  }

  const save = async () => {
    await fetch(`/api/admin/track/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push(`/admin/track/${id}`);
  };

  const removeImage = (index) => {
    const next = [...form.dokumentasi];
    next.splice(index, 1);
    setForm({ ...form, dokumentasi: next });
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <Link
        href={`/admin/track/${id}`}
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <ArrowLeft size={16} /> Batal
      </Link>

      {/* FORM */}
      {["aktivitas", "pelajaran", "kendala"].map((key) => (
        <div key={key}>
          <label className="block text-sm font-semibold capitalize mb-2">
            {key}
          </label>
          <textarea
            rows={4}
            value={form[key] || ""}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            className="w-full p-4 rounded-xl border border-blue-200
            focus:ring-2 focus:ring-blue-500/30 outline-none"
          />
        </div>
      ))}

      {/* DOKUMENTASI */}
      <div>
        <p className="font-semibold mb-3">Dokumentasi</p>

        {form.dokumentasi?.length === 0 ? (
          <p className="italic text-gray-500">Belum ada dokumentasi</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {form.dokumentasi.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  className="h-40 w-full object-cover rounded-xl border"
                />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white
                  rounded-full hover:bg-red-700"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ACTION */}
      <button
        onClick={save}
        className="flex items-center gap-2 px-6 py-3 rounded-xl
        bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        <Save size={18} /> Simpan Perubahan
      </button>
    </div>
  );
}
