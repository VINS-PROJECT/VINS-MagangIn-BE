"use client";

import {
  User,
  Mail,
  Phone,
  MapPin,
  IdCard,
  GraduationCap,
  Calendar,
  University,
  FileText,
  Languages,
} from "lucide-react";

export default function IdentitasPage() {
  // 🔹 Contoh data statis (bisa diganti nanti dari database)
  const data = {
    namaLengkap: "Kevin Simorangkir",
    jenisKelamin: "Laki-laki",
    email: "kevin.smr@example.com",
    telepon: "0812-3456-7890",
    alamat: "Jl. Melati No. 25, Medan, Sumatera Utara",
    nik: "1234567890123456",
    bahasa: [
      { nama: "Bahasa Indonesia", tingkat: "Aktif" },
      { nama: "Bahasa Inggris", tingkat: "Menengah" },
    ],
    jenjang: "Sarjana (S1)",
    universitas: "Universitas Sumatera Utara",
    tanggalLulus: "2024-08-12",
    ijazah: "/dokumen/ijazah-kevin.pdf",
    transkrip: "/dokumen/transkrip-kevin.pdf",
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Identitas Diri</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Berikut informasi pribadi dan pendidikan yang telah kamu simpan.
      </p>

      <div className="space-y-10">
        {/* --- Biodata Diri --- */}
        <section className="bg-white dark:bg-[#141a23] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-500" />
            Biodata Diri
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem label="Nama Lengkap" value={data.namaLengkap} />
            <InfoItem label="Jenis Kelamin" value={data.jenisKelamin} />
            <InfoItem label="Email" value={data.email} icon={Mail} />
            <InfoItem label="No. Telepon" value={data.telepon} icon={Phone} />
            <InfoItem label="Alamat" value={data.alamat} icon={MapPin} />
            <InfoItem label="NIK" value={data.nik} icon={IdCard} />
          </div>

          {/* --- Bahasa --- */}
          <div className="mt-6">
            <h4 className="flex items-center gap-2 text-base font-medium text-gray-800 dark:text-gray-100 mb-2">
              <Languages className="w-5 h-5 text-blue-500" />
              Bahasa
            </h4>

            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {data.bahasa.map((b, index) => (
                <li key={index}>
                  {b.nama} — <span className="text-gray-500">{b.tingkat}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- Pendidikan --- */}
        <section className="bg-white dark:bg-[#141a23] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-500" />
            Pendidikan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem label="Jenjang Pendidikan" value={data.jenjang} />
            <InfoItem label="Nama Universitas" value={data.universitas} icon={University} />
            <InfoItem
              label="Tanggal Kelulusan"
              value={new Date(data.tanggalLulus).toLocaleDateString("id-ID")}
              icon={Calendar}
            />
          </div>

          {/* Dokumen */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <a
              href={data.ijazah}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
            >
              <FileText className="w-4 h-4" />
              Lihat Ijazah
            </a>

            <a
              href={data.transkrip}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
            >
              <FileText className="w-4 h-4" />
              Lihat Transkrip Nilai
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

// 🔹 Komponen kecil untuk menampilkan field data
function InfoItem({ label, value, icon: Icon }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100 font-medium">
        {Icon && <Icon className="w-4 h-4 text-blue-500" />}
        <span>{value || "-"}</span>
      </div>
    </div>
  );
}
