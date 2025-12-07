"use client";

import { Award, FileText, Calendar, Building2, Trophy } from "lucide-react";

export default function PenghargaanPage() {
  // 🔹 Data contoh (bisa diganti dari database)
  const data = {
    sertifikasi: [
      {
        lembaga: "Google",
        nama: "Google Digital Garage – Fundamental of Digital Marketing",
        nilai: "100/100",
        tanggal: "2024-05",
        file: "/dokumen/google-digital-marketing.pdf",
      },
    ],
    pencapaian: [
      {
        nama: "Juara 1 Lomba Desain UI Nasional",
        penyelenggara: "Universitas Indonesia",
        tanggal: "2023-11",
        file: "/dokumen/ui-design-award.pdf",
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Penghargaan & Sertifikasi</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Informasi mengenai sertifikasi dan penghargaan yang telah kamu peroleh.
      </p>

      <div className="space-y-10">
        {/* === Sertifikasi === */}
        <Section title="Sertifikasi" icon={Award}>
          {data.sertifikasi.map((item, idx) => (
            <Card key={idx}>
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <h4 className="font-semibold text-lg">{item.nama}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Building2 className="w-4 h-4 text-blue-500" />
                    {item.lembaga}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    {formatBulan(item.tanggal)} • Nilai: {item.nilai}
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

        {/* === Pencapaian === */}
        <Section title="Pencapaian / Penghargaan" icon={Trophy}>
          {data.pencapaian.map((ach, idx) => (
            <Card key={idx}>
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <h4 className="font-semibold text-lg">{ach.nama}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Penyelenggara: {ach.penyelenggara}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    {formatBulan(ach.tanggal)}
                  </p>
                </div>
                {ach.file && (
                  <a
                    href={ach.file}
                    target="_blank"
                    className="mt-3 md:mt-0 inline-flex items-center gap-2 px-4 py-2 text-blue-600 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                  >
                    <FileText className="w-4 h-4" />
                    Lihat Dokumen
                  </a>
                )}
              </div>
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
  return (
    <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1f2b] mb-4">
      {children}
    </div>
  );
}

/* 🔹 Format Bulan */
function formatBulan(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", { year: "numeric", month: "long" });
}
