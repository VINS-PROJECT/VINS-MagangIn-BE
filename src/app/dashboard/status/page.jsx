"use client";
import { motion } from "framer-motion";
import { Briefcase, CalendarDays, Building2 } from "lucide-react";

export default function StatusPage() {
  const lamaran = [
    {
      id: 1,
      posisi: "Frontend Developer",
      perusahaan: "Telkom Indonesia",
      status: "Diproses",
      tanggal: "10 Oktober 2025",
      logo: "/logos/telkom.png",
    },
    {
      id: 2,
      posisi: "UI/UX Designer",
      perusahaan: "Bank Mandiri",
      status: "Diterima",
      tanggal: "2 Oktober 2025",
      logo: "/logos/mandiri.png",
    },
    {
      id: 3,
      posisi: "Data Analyst",
      perusahaan: "Bank BRI",
      status: "Ditolak",
      tanggal: "29 September 2025",
      logo: "/logos/bri.png",
    },
  ];

  // 🔹 warna status dinamis
  const statusStyle = (status) => {
    switch (status) {
      case "Diterima":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Diproses":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
        Status Lamaran Saya
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Pantau perkembangan lamaranmu secara real-time di bawah ini 👇
      </p>

      <div className="space-y-5">
        {lamaran.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-white dark:bg-[#141a23] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {job.logo ? (
                  <img
                    src={job.logo}
                    alt={job.perusahaan}
                    className="w-10 h-10 object-contain rounded-md"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gray-500" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {job.posisi}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {job.perusahaan}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${statusStyle(
                  job.status
                )}`}
              >
                {job.status}
              </span>
            </div>

            <div className="flex items-center justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                <span>{job.tanggal}</span>
              </div>

              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                <span>
                  {job.status === "Diterima"
                    ? "Selamat! Kamu lolos seleksi 🎉"
                    : job.status === "Diproses"
                    ? "Menunggu hasil seleksi..."
                    : "Terima kasih sudah melamar 🙏"}
                </span>
              </div>
            </div>

            {/* Bar status */}
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mt-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width:
                    job.status === "Diterima"
                      ? "100%"
                      : job.status === "Diproses"
                      ? "60%"
                      : "100%",
                }}
                transition={{ duration: 0.8 }}
                className={`h-full ${
                  job.status === "Diterima"
                    ? "bg-green-500"
                    : job.status === "Diproses"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
