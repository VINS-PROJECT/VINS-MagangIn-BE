"use client";
import { useParams } from "next/navigation";
import { Building2, MapPin, Briefcase, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DetailLowonganPage() {
  const { id } = useParams();

  // 🔹 Data dummy – bisa diganti dengan fetch API berdasarkan id
  const lowonganData = [
    {
      id: 1,
      posisi: "Frontend Developer Intern",
      perusahaan: "Telkom Indonesia",
      lokasi: "Jakarta",
      tipe: "Magang",
      tanggal: "15 Okt 2025",
      deskripsi:
        "Sebagai Frontend Developer Intern, kamu akan berkolaborasi dengan tim developer dan designer dalam mengembangkan tampilan aplikasi internal Telkom. Kamu akan belajar praktik terbaik React, Tailwind, dan desain responsif.",
      kualifikasi: [
        "Mahasiswa aktif semester akhir jurusan Informatika, SI, atau terkait.",
        "Menguasai dasar HTML, CSS, JavaScript, dan React.",
        "Memiliki pemahaman dasar tentang Git dan REST API.",
        "Mampu bekerja dalam tim dan memiliki komunikasi yang baik.",
      ],
      benefit: [
        "Sertifikat magang resmi dari Telkom Indonesia.",
        "Mentorship langsung dari engineer berpengalaman.",
        "Uang saku dan fasilitas coworking.",
        "Kesempatan karier setelah program berakhir.",
      ],
    },
    {
      id: 2,
      posisi: "Data Analyst Intern",
      perusahaan: "Bank Mandiri",
      lokasi: "Jakarta",
      tipe: "Magang",
      tanggal: "12 Okt 2025",
      deskripsi:
        "Sebagai Data Analyst Intern, kamu akan menganalisis data besar untuk mendukung keputusan strategis Bank Mandiri. Tugasmu mencakup pembersihan data, visualisasi, dan pembuatan laporan menggunakan alat analitik modern.",
      kualifikasi: [
        "Mahasiswa aktif jurusan Statistik, Matematika, Ekonomi, atau Teknik Industri.",
        "Menguasai SQL, Excel, dan Python (pandas, matplotlib).",
        "Teliti, analitis, dan berorientasi pada detail.",
      ],
      benefit: [
        "Sertifikat magang resmi.",
        "Akses ke pelatihan data analytics profesional.",
        "Fasilitas ruang kerja dan mentoring rutin.",
      ],
    },
    {
      id: 3,
      posisi: "UI/UX Designer Intern",
      perusahaan: "BRI Digital",
      lokasi: "Bandung",
      tipe: "Magang",
      tanggal: "8 Okt 2025",
      deskripsi:
        "Dalam posisi ini, kamu akan berkontribusi pada pengembangan antarmuka aplikasi digital banking BRI. Kamu akan membantu mendesain wireframe, prototype interaktif, dan meningkatkan user experience aplikasi digital.",
      kualifikasi: [
        "Mahasiswa jurusan DKV, Informatika, atau bidang terkait.",
        "Menguasai Figma dan prinsip desain UI/UX.",
        "Memiliki portofolio desain digital.",
      ],
      benefit: [
        "Sertifikat magang dari BRI Digital.",
        "Kesempatan networking dengan tim product & tech.",
        "Akses ke pelatihan UX Design profesional.",
      ],
    },
  ];

  const job = lowonganData.find((item) => item.id === Number(id));

  if (!job) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-400">
        <p>Lowongan tidak ditemukan.</p>
        <Link
          href="/dashboard/lowongan"
          className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Kembali ke Daftar Lowongan
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/dashboard/lowongan"
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
      </div>

      <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#141a23] shadow-sm">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
          {job.posisi}
        </h2>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <span className="flex items-center gap-1">
            <Building2 className="w-4 h-4" /> {job.perusahaan}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {job.lokasi}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" /> {job.tipe}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> Dibuka: {job.tanggal}
          </span>
        </div>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          {job.deskripsi}
        </p>

        <div className="space-y-6">
          <section>
            <h3 className="font-semibold text-lg mb-2">Kualifikasi</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              {job.kualifikasi.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">Benefit</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              {job.benefit.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-10 flex justify-end">
          <button className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition">
            Lamar Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
