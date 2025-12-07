"use client";
import TrackLamaran from "@/components/TrackLamaran";
import { Users, Briefcase, CheckCircle, ShieldAlert } from "lucide-react";

export default function DashboardHome() {
  const akun = {
    nama: "Kevin",
    statusVerifikasi: true, // ubah ke false jika belum memenuhi syarat
    keterangan:
      "Akun telah diverifikasi dan memenuhi syarat untuk melamar magang.",
  };

  const stats = [
    {
      label: "Total Pendaftar",
      value: "1.254",
      icon: Users,
      color: "blue",
      desc: "Peserta yang terdaftar di MagangHub",
    },
    {
      label: "Lowongan Aktif",
      value: "86",
      icon: Briefcase,
      color: "green",
      desc: "Posisi magang yang masih terbuka",
    },
    {
      label: "Peserta Diterima",
      value: "312",
      icon: CheckCircle,
      color: "yellow",
      desc: "Peserta yang berhasil diterima magang",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Selamat Datang, {akun.nama} 👋
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Pantau perkembangan lamaranmu, lihat statistik terkini, dan temukan
          peluang magang terbaik di bawah ini.
        </p>
      </div>

      {/* Verifikasi Akun */}
      <div
        className={`p-5 rounded-xl border ${
          akun.statusVerifikasi
            ? "border-green-200 bg-green-50 dark:bg-green-900/20"
            : "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20"
        } flex items-start gap-4`}
      >
        <div
          className={`p-3 rounded-full ${
            akun.statusVerifikasi
              ? "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
              : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400"
          }`}
        >
          {akun.statusVerifikasi ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <ShieldAlert className="w-6 h-6" />
          )}
        </div>
        <div>
          <h4
            className={`font-semibold ${
              akun.statusVerifikasi
                ? "text-green-700 dark:text-green-300"
                : "text-yellow-700 dark:text-yellow-300"
            }`}
          >
            {akun.statusVerifikasi
              ? "Akun Terverifikasi ✅"
              : "Akun Belum Terverifikasi ⚠️"}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {akun.statusVerifikasi
              ? akun.keterangan
              : "Lengkapi data profil dan unggah dokumen untuk memverifikasi akunmu sebelum melamar."}
          </p>
        </div>
      </div>

      {/* Statistik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#141a23] shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-full ${
                  item.color === "blue"
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : item.color === "green"
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                }`}
              >
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.label}
                </p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {item.value}
                </h3>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Tracking Lamaran */}
      <TrackLamaran />

      {/* Pengumuman / Rekomendasi */}
      <div>
        <h3 className="text-lg font-semibold mb-3">📢 Pengumuman Terbaru</h3>
        <div className="space-y-4">
          {[
            {
              judul: "Batch 2 Magang Nasional Dibuka!",
              tanggal: "15 Oktober 2025",
              isi: "Segera daftarkan dirimu untuk mengikuti program magang nasional batch kedua!",
            },
            {
              judul: "Perubahan Jadwal Interview",
              tanggal: "18 Oktober 2025",
              isi: "Beberapa jadwal wawancara diundur karena maintenance sistem. Cek kembali jadwalmu.",
            },
            {
              judul: "Update Sistem Verifikasi Sertifikat",
              tanggal: "19 Oktober 2025",
              isi: "Kini sertifikat pelatihan dapat diverifikasi otomatis dalam 1x24 jam.",
            },
          ].map((p, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#141a23] hover:bg-gray-50 dark:hover:bg-white/5 transition"
            >
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                {p.judul}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {p.tanggal}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {p.isi}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
