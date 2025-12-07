"use client";
import { FileDown } from "lucide-react";
import jsPDF from "jspdf";

export default function PratayangIDPage() {
  // 🔹 Semua data digabung dari menu identitas, keahlian, dan penghargaan
  const data = {
    identitas: {
      namaLengkap: "Kevin Simorangkir",
      jenisKelamin: "Laki-laki",
      email: "kevin.smr@example.com",
      telepon: "0812-3456-7890",
      alamat: "Jl. Melati No. 25, Medan, Sumatera Utara",
      nik: "1234567890123456",
      jenjang: "Sarjana (S1)",
      universitas: "Universitas Sumatera Utara",
      tanggalLulus: "2024-08-12",
      bahasa: "Indonesia, Inggris",
      ijazah: "/dokumen/ijazah-kevin.pdf",
      transkrip: "/dokumen/transkrip-kevin.pdf",
    },
    keahlian: [
      { nama: "React", level: "Lanjut" },
      { nama: "Next.js", level: "Menengah" },
      { nama: "Tailwind CSS", level: "Menengah" },
      { nama: "UI/UX Design", level: "Lanjut" },
    ],
    penghargaan: [
      {
        nama: "UI/UX Competition Winner",
        penyelenggara: "Telkom University",
        tanggal: "Agustus 2024",
        nilai: "Juara 1",
        dokumen: "/dokumen/uiux-winner.pdf",
      },
      {
        nama: "Frontend Challenge Finalist",
        penyelenggara: "Dicoding Indonesia",
        tanggal: "Juli 2023",
        nilai: "Finalis",
        dokumen: "/dokumen/frontend-finalist.pdf",
      },
    ],
  };

  // 🔹 Fungsi untuk membuat dan mengunduh PDF
  const handleDownload = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    // === HEADER ===
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 25, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Pratayang ID — MagangHub", 20, 16);

    // Reset teks
    doc.setTextColor(33, 33, 33);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    let y = 40;

    // === IDENTITAS DIRI ===
    doc.setFont("helvetica", "bold");
    doc.text("🪪 Identitas Diri", 20, y);
    doc.setFont("helvetica", "normal");
    y += 10;
    doc.text(`Nama Lengkap: ${data.identitas.namaLengkap}`, 25, y);
    doc.text(`Jenis Kelamin: ${data.identitas.jenisKelamin}`, 25, (y += 8));
    doc.text(`Email: ${data.identitas.email}`, 25, (y += 8));
    doc.text(`Telepon: ${data.identitas.telepon}`, 25, (y += 8));
    doc.text(`Alamat: ${data.identitas.alamat}`, 25, (y += 8));
    doc.text(`NIK: ${data.identitas.nik}`, 25, (y += 8));
    doc.text(`Jenjang: ${data.identitas.jenjang}`, 25, (y += 8));
    doc.text(`Universitas: ${data.identitas.universitas}`, 25, (y += 8));
    doc.text(
      `Tanggal Lulus: ${new Date(data.identitas.tanggalLulus).toLocaleDateString("id-ID")}`,
      25,
      (y += 8)
    );
    doc.text(`Bahasa: ${data.identitas.bahasa}`, 25, (y += 8));

    // Garis
    doc.setDrawColor(200);
    doc.line(20, (y += 6), 190, y);

    // === KEAHLIAN DIRI ===
    y += 15;
    doc.setFont("helvetica", "bold");
    doc.text("💡 Keahlian Diri", 20, y);
    doc.setFont("helvetica", "normal");
    y += 10;
    data.keahlian.forEach((k) => {
      doc.text(`• ${k.nama} — Level: ${k.level}`, 25, y);
      y += 8;
    });

    // Garis
    doc.line(20, (y += 4), 190, y);

    // === PENGHARGAAN ===
    y += 15;
    doc.setFont("helvetica", "bold");
    doc.text("🏆 Penghargaan", 20, y);
    doc.setFont("helvetica", "normal");
    y += 10;
    data.penghargaan.forEach((p) => {
      doc.text(`${p.nama}`, 25, y);
      doc.text(`Penyelenggara: ${p.penyelenggara}`, 25, (y += 8));
      doc.text(`Tanggal: ${p.tanggal}`, 25, (y += 8));
      doc.text(`Nilai: ${p.nilai}`, 25, (y += 8));
      y += 6;
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Dokumen: ${p.dokumen}`, 25, (y += 6));
      doc.setFontSize(12);
      doc.setTextColor(33, 33, 33);
      y += 10;
    });

    // === FOOTER ===
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(
      "Dokumen ini dihasilkan otomatis oleh MagangHub — https://maganghub.com",
      20,
      285
    );

    doc.save("Pratayang_ID_MagangHub.pdf");
  };

  // === TAMPILAN DI LAMAN ===
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Pratayang ID Lengkap
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Ringkasan lengkap dari Identitas Diri, Keahlian, dan Penghargaan.
        </p>
      </div>

      <div className="bg-white dark:bg-[#141a23] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-8">
        {/* Identitas */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Identitas Diri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300 text-sm">
            <p><strong>Nama Lengkap:</strong> {data.identitas.namaLengkap}</p>
            <p><strong>Jenis Kelamin:</strong> {data.identitas.jenisKelamin}</p>
            <p><strong>Email:</strong> {data.identitas.email}</p>
            <p><strong>Telepon:</strong> {data.identitas.telepon}</p>
            <p><strong>Alamat:</strong> {data.identitas.alamat}</p>
            <p><strong>NIK:</strong> {data.identitas.nik}</p>
            <p><strong>Jenjang:</strong> {data.identitas.jenjang}</p>
            <p><strong>Universitas:</strong> {data.identitas.universitas}</p>
            <p><strong>Tanggal Lulus:</strong> {new Date(data.identitas.tanggalLulus).toLocaleDateString("id-ID")}</p>
            <p><strong>Bahasa:</strong> {data.identitas.bahasa}</p>
          </div>
        </section>

        {/* Keahlian */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Keahlian Diri
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {data.keahlian.map((k, i) => (
              <li key={i}>
                {k.nama} — <span className="text-gray-500">{k.level}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Penghargaan */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Penghargaan
          </h3>
          <div className="space-y-3">
            {data.penghargaan.map((p, i) => (
              <div
                key={i}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition"
              >
                <p className="font-medium">{p.nama}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {p.penyelenggara} — {p.tanggal}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Nilai: {p.nilai}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition"
      >
        <FileDown className="w-5 h-5" /> Unduh sebagai PDF
      </button>
    </div>
  );
}
