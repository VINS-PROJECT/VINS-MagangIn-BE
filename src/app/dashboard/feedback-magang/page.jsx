"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Star, MessageCircle, Send } from "lucide-react";

export default function FeedbackMagang() {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      perusahaan: "PT Telkom Indonesia",
      rating: 5,
      komentar: "Lingkungan kerja sangat baik dan mentor membantu sekali.",
      tanggal: "2025-10-18",
    },
  ]);

  const [newFeedback, setNewFeedback] = useState({
    perusahaan: "",
    rating: 0,
    komentar: "",
  });

  const perusahaanList = [
    "PT Telkom Indonesia",
    "PT Bank Rakyat Indonesia",
    "PT Pertamina",
    "PT Astra International",
    "PT Bukalapak",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newFeedback.perusahaan || newFeedback.rating === 0 || !newFeedback.komentar)
      return alert("Mohon isi semua kolom sebelum mengirim feedback.");

    const dataBaru = {
      id: feedbacks.length + 1,
      ...newFeedback,
      tanggal: new Date().toISOString().split("T")[0],
    };

    setFeedbacks([...feedbacks, dataBaru]);
    setNewFeedback({ perusahaan: "", rating: 0, komentar: "" });
    e.target.reset();
  };

  return (
    <div className="space-y-10">
      {/* 🧠 Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Building2 className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Feedback Program Magang
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Bagikan pengalaman dan penilaian kamu terhadap perusahaan tempat magang.
        </p>
      </motion.div>

      {/* 📋 Form Feedback */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white dark:bg-[#141a23] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md p-6 space-y-5"
      >
        {/* Pilih Perusahaan */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Perusahaan
          </label>
          <select
            value={newFeedback.perusahaan}
            onChange={(e) => setNewFeedback({ ...newFeedback, perusahaan: e.target.value })}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#0b0f15] text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Pilih perusahaan tempat magang</option>
            {perusahaanList.map((nama) => (
              <option key={nama} value={nama}>
                {nama}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Rating Perusahaan
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
                className="focus:outline-none"
              >
                <Star
                  className={`w-7 h-7 transition ${
                    newFeedback.rating >= star
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-400 hover:text-yellow-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Komentar */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Komentar / Masukan
          </label>
          <textarea
            rows="4"
            value={newFeedback.komentar}
            onChange={(e) => setNewFeedback({ ...newFeedback, komentar: e.target.value })}
            placeholder="Ceritakan pengalaman dan saran untuk perusahaan tempat magang..."
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#0b0f15] text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Tombol Kirim */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2.5 rounded-lg font-medium shadow hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <Send className="w-4 h-4" />
            Kirim Feedback
          </button>
        </div>
      </motion.form>

      {/* 💬 Riwayat Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-[#141a23] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md p-6"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Riwayat Feedback
        </h2>

        {feedbacks.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada feedback yang dikirim.</p>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((fb) => (
              <motion.div
                key={fb.id}
                whileHover={{ scale: 1.01 }}
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-[#0b0f15]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400">{fb.perusahaan}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(fb.tanggal).toLocaleDateString("id-ID")}
                  </p>
                </div>

                <div className="flex items-center mt-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= fb.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300">{fb.komentar}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
