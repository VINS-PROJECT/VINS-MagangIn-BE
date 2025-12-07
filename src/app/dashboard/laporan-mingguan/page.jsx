"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Send, Clock, Upload } from "lucide-react";

export default function LaporanMingguan() {
  const [laporan, setLaporan] = useState([
    {
      id: 1,
      minggu: "Minggu 1",
      tanggalMulai: "2025-10-01",
      tanggalSelesai: "2025-10-07",
      file: "laporan_minggu1.pdf",
      status: "Dikirim",
    },
  ]);

  const [newReport, setNewReport] = useState({
    minggu: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    file: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReport.minggu || !newReport.tanggalMulai || !newReport.tanggalSelesai || !newReport.file)
      return alert("Harap isi semua field dan upload file laporan!");

    const newData = {
      id: laporan.length + 1,
      ...newReport,
      file: newReport.file.name,
      status: "Dikirim",
    };

    setLaporan([...laporan, newData]);
    setNewReport({ minggu: "", tanggalMulai: "", tanggalSelesai: "", file: null });
    e.target.reset();
  };

  return (
    <div className="space-y-10">
      {/* 🧾 Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <ClipboardList className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Laporan Mingguan Magang
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Upload laporan kegiatan magang kamu setiap minggu dalam bentuk file PDF atau DOCX.
        </p>
      </motion.div>

      {/* 📤 Form Upload Laporan */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white dark:bg-[#141a23] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md p-6 space-y-5"
      >
        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Minggu Ke
            </label>
            <input
              type="text"
              value={newReport.minggu}
              onChange={(e) => setNewReport({ ...newReport, minggu: e.target.value })}
              placeholder="Contoh: Minggu 3"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#0b0f15] text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Tanggal Mulai
            </label>
            <input
              type="date"
              value={newReport.tanggalMulai}
              onChange={(e) => setNewReport({ ...newReport, tanggalMulai: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#0b0f15] text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Tanggal Selesai
            </label>
            <input
              type="date"
              value={newReport.tanggalSelesai}
              onChange={(e) => setNewReport({ ...newReport, tanggalSelesai: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#0b0f15] text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Upload File Laporan Mingguan
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer bg-gray-50 dark:bg-[#0b0f15] hover:bg-gray-100 dark:hover:bg-white/5 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-blue-500" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Klik untuk memilih file atau tarik ke sini
                </p>
                <p className="text-xs text-gray-400">PDF, DOC, atau DOCX (max 10MB)</p>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) =>
                  setNewReport({ ...newReport, file: e.target.files[0] })
                }
              />
            </label>
          </div>
          {newReport.file && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              File terpilih: <span className="font-medium">{newReport.file.name}</span>
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2.5 rounded-lg font-medium shadow hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <Send className="w-4 h-4" />
            Kirim Laporan
          </button>
        </div>
      </motion.form>

      {/* 📋 Daftar Laporan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white dark:bg-[#141a23] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md p-6"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Daftar Laporan Terkirim
        </h2>
        {laporan.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada laporan dikirim.</p>
        ) : (
          <div className="space-y-4">
            {laporan.map((lap) => (
              <motion.div
                key={lap.id}
                whileHover={{ scale: 1.01 }}
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-[#0b0f15] flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400">
                    {lap.minggu}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">
                    {new Date(lap.tanggalMulai).toLocaleDateString("id-ID")} –{" "}
                    {new Date(lap.tanggalSelesai).toLocaleDateString("id-ID")}
                  </p>
                  <a
                    href="#"
                    className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                  >
                    <Upload className="w-4 h-4" /> {lap.file}
                  </a>
                </div>
                <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                  <Clock className="w-4 h-4" /> {lap.status}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
