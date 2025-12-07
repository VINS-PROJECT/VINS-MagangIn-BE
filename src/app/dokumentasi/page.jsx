"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SAMPLE DATA — nanti bisa dari database
const dokumentasiData = [
  { img: "/docs/dashboard-ui.png", date: "23-11-2025", day: 12, category: "UI", trackId: 0 },
  { img: "/docs/track-input.png", date: "23-11-2025", day: 12, category: "Form", trackId: 0 },
  { img: "/docs/meeting-notes.png", date: "23-11-2025", day: 12, category: "Meeting", trackId: 0 },
  { img: "/docs/form-update.png", date: "22-11-2025", day: 11, category: "Update", trackId: 1 },
  { img: "/docs/hero-design.png", date: "20-11-2025", day: 9, category: "UI", trackId: 2 },
  // tambah lagi jika mau
];

export default function DokumentasiPage() {
  // FILTER STATES
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // PAGINATION STATES
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // LIGHTBOX STATE
  const [lightboxImg, setLightboxImg] = useState(null);

  // FILTERING LOGIC
  const filteredData = useMemo(() => {
    return dokumentasiData.filter((item) => {
      const matchDate = selectedDate ? item.date === selectedDate : true;
      const matchDay = selectedDay ? item.day === Number(selectedDay) : true;
      const matchCategory = selectedCategory ? item.category === selectedCategory : true;

      return matchDate && matchDay && matchCategory;
    });
  }, [selectedDate, selectedDay, selectedCategory]);

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <section className="min-h-screen bg-[#0b0f15] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-center">
          Dokumentasi{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text">
            Magang VINS
          </span>
        </h1>
        <p className="text-gray-400 text-center mt-3 mb-12">
          Kumpulan foto dokumentasi aktivitas magangmu.
        </p>

        {/* FILTER SECTION */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          
          {/* FILTER DATE */}
          <select
            value={selectedDate}
            onChange={(e) => { setSelectedDate(e.target.value); setPage(1); }}
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
          >
            <option value="">Filter Tanggal</option>
            {[...new Set(dokumentasiData.map((d) => d.date))].map((date, i) => (
              <option key={i} value={date}>{date}</option>
            ))}
          </select>

          {/* FILTER DAY */}
          <select
            value={selectedDay}
            onChange={(e) => { setSelectedDay(e.target.value); setPage(1); }}
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
          >
            <option value="">Filter Hari</option>
            {[...new Set(dokumentasiData.map((d) => d.day))].map((day, i) => (
              <option key={i} value={day}>Hari ke-{day}</option>
            ))}
          </select>

          {/* FILTER CATEGORY */}
          <select
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
          >
            <option value="">Kategori</option>
            {[...new Set(dokumentasiData.map((d) => d.category))].map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* GRID GALERI */}
        {paginatedData.length === 0 ? (
          <div className="text-center text-gray-400 mt-20 italic">
            Tidak ada dokumentasi ditemukan.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 }}
                className="
                  group relative overflow-hidden rounded-xl 
                  bg-white/5 border border-violet-500/30
                  hover:border-fuchsia-500/60 transition-all duration-300
                  shadow-md hover:shadow-fuchsia-500/20 cursor-pointer
                "
                onClick={() => setLightboxImg(item.img)}
              >
                <img
                  src={item.img}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-all duration-500"
                />

                <div className="p-3 border-t border-white/10">
                  <p className="text-sm text-gray-300">Hari ke-{item.day}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                  <p className="text-xs text-violet-300 mt-1 capitalize">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`px-4 py-2 rounded-lg border border-white/20 
                ${page === 1 ? "opacity-40" : "hover:bg-white/10"}
              `}
            >
              Prev
            </button>

            <span className="text-gray-300">
              Halaman {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className={`px-4 py-2 rounded-lg border border-white/20 
                ${page === totalPages ? "opacity-40" : "hover:bg-white/10"}
              `}
            >
              Next
            </button>
          </div>
        )}

      </div>

      {/* LIGHTBOX VIEWER */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 bg-black/70 backdrop-blur-lg 
              flex items-center justify-center z-50 p-4
            "
            onClick={() => setLightboxImg(null)}
          >
            <motion.img
              src={lightboxImg}
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              className="max-w-4xl w-full rounded-xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
