"use client";

import {
  Briefcase,
  Award,
  Calendar,
  MapPin,
  FileText,
  Users,
  Star,
  ClipboardList,
} from "lucide-react";

export default function KeahlianPage() {
  // 📘 Data contoh (nanti bisa diganti dengan data dari database)
  const data = {
    pelatihan: [
      {
        nama: "Pelatihan Digital Marketing",
        mulai: "2024-02",
        selesai: "2024-04",
        golongan: "Pemasaran Digital",
        lokasi: "Jakarta",
        file: "/dokumen/pelatihan-digitalmarketing.pdf",
      },
    ],
    keahlian: [
      { golongan: "Desain Grafis (Canva, Figma)" },
      { golongan: "Frontend Development (React, Tailwind CSS)" },
      { golongan: "Digital Marketing (SEO, Ads, Copywriting)" },
    ],
    organisasi: [
      {
        nama: "BEM Fakultas Ilmu Komputer",
        acara: "Tech Conference 2023",
        jabatan: "Koordinator Acara",
        periode: "Feb 2023 - Des 2023",
      },
    ],
    pengalaman: [
      {
        perusahaan: "PT Kreatif Digital",
        jenis: "Magang",
        mulai: "2024-01",
        selesai: "2024-06",
        deskripsi:
          "Membantu tim frontend dalam pengembangan dashboard internal perusahaan menggunakan React.js dan Tailwind.",
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Keahlian Diri</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Berikut rangkuman pelatihan, keahlian, pengalaman organisasi, dan pekerjaanmu.
      </p>

      <div className="space-y-10">
        {/* === Pelatihan === */}
        <Section title="Pelatihan" icon={Award}>
          {data.pelatihan.map((item, idx) => (
            <Card key={idx}>
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <h4 className="font-semibold text-lg">{item.nama}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.golongan} • {item.lokasi}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    {formatBulan(item.mulai)} - {formatBulan(item.selesai)}
                  </p>
                </div>
                {item.file && (
                  <a
                    href={item.file}
                    target="_blank"
                    className="mt-3 md:mt-0 inline-flex items-center gap-2 px-4 py-2 text-blue-600 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                  >
                    <FileText className="w-4 h-4" />
                    Lihat Sertifikat
                  </a>
                )}
              </div>
            </Card>
          ))}
        </Section>

        {/* === Keahlian === */}
        <Section title="Keahlian" icon={Star}>
          <div className="flex flex-wrap gap-3">
            {data.keahlian.map((skill, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium border border-blue-100 dark:border-blue-800"
              >
                {skill.golongan}
              </span>
            ))}
          </div>
        </Section>

        {/* === Pengalaman Organisasi === */}
        <Section title="Pengalaman Organisasi" icon={Users}>
          {data.organisasi.map((org, idx) => (
            <Card key={idx}>
              <h4 className="font-semibold text-lg">{org.nama}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {org.acara} — {org.jabatan}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                <Calendar className="w-4 h-4 text-blue-500" />
                {org.periode}
              </p>
            </Card>
          ))}
        </Section>

        {/* === Pengalaman Pekerjaan === */}
        <Section title="Pengalaman Pekerjaan" icon={Briefcase}>
          {data.pengalaman.map((exp, idx) => (
            <Card key={idx}>
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <h4 className="font-semibold text-lg">{exp.perusahaan}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {exp.jenis}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    {formatBulan(exp.mulai)} - {formatBulan(exp.selesai)}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-3 leading-relaxed">
                {exp.deskripsi}
              </p>
            </Card>
          ))}
        </Section>
      </div>
    </div>
  );
}

/* 🔹 Komponen Section */
function Section({ title, icon: Icon, children }) {
  return (
    <section className="bg-white dark:bg-[#141a23] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
        <Icon className="w-5 h-5 text-blue-500" />
        {title}
      </h3>
      {children}
    </section>
  );
}

/* 🔹 Komponen Card */
function Card({ children }) {
  return <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1f2b] mb-4">{children}</div>;
}

/* 🔹 Format Bulan */
function formatBulan(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", { year: "numeric", month: "long" });
}
