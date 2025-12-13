"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function KalenderPage() {
  const router = useRouter();
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [agendaList, setAgendaList] = useState([]);
  const [showDetail, setShowDetail] = useState(null);

  /* ================= LOAD AGENDA ================= */
  useEffect(() => {
    async function loadAgenda() {
      const res = await fetch("/api/admin/calendar");
      if (res.ok) {
        const json = await res.json();
        setAgendaList(json.data || []);
      }
    }
    loadAgenda();
  }, []);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const monthOffset = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember",
  ];
  const weekdays = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];

  const handlePrevMonth = () => {
    currentMonth === 0
      ? (setCurrentMonth(11), setCurrentYear(y => y - 1))
      : setCurrentMonth(m => m - 1);
  };

  const handleNextMonth = () => {
    currentMonth === 11
      ? (setCurrentMonth(0), setCurrentYear(y => y + 1))
      : setCurrentMonth(m => m + 1);
  };

  const deleteAgenda = async (id) => {
    if (!confirm("Hapus agenda ini?")) return;

    const res = await fetch(`/api/admin/calendar/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setAgendaList(prev => prev.filter(a => a._id !== id));
      setShowDetail(null);
    }
  };

  return (
    <div className="space-y-10 text-slate-800">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-xl bg-white/60 backdrop-blur
          border border-white/40 hover:bg-white transition"
        >
          <ChevronLeft />
        </button>

        <h2
          className="text-3xl font-extrabold text-center flex-1
          bg-gradient-to-r from-blue-600 to-sky-500
          bg-clip-text text-transparent"
        >
          {monthNames[currentMonth]} {currentYear}
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/admin/kalender/tambah")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl
            bg-gradient-to-r from-blue-600 to-sky-500
            text-white font-semibold shadow hover:brightness-110 transition"
          >
            <Plus size={16} /> Tambah
          </button>

          <button
            onClick={handleNextMonth}
            className="p-2 rounded-xl bg-white/60 backdrop-blur
            border border-white/40 hover:bg-white transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* ================= WEEKDAYS ================= */}
      <div className="grid grid-cols-7 text-center text-sm font-semibold text-slate-500">
        {weekdays.map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* ================= CALENDAR GRID ================= */}
      <div
        className="grid grid-cols-7 gap-3
        bg-white/60 backdrop-blur-xl
        border border-white/40
        rounded-3xl p-4
        shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
      >
        {Array.from({ length: monthOffset }).map((_, i) => (
          <div key={i} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = i + 1;
          const dateStr = `${currentYear}-${String(currentMonth+1).padStart(2,"0")}-${String(date).padStart(2,"0")}`;
          const agendas = agendaList.filter(a => a.date === dateStr);
          const isToday =
            date === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          return (
            <motion.div
              key={date}
              whileHover={{ y: -4 }}
              onClick={() =>
                agendas.length && setShowDetail({ dateStr, agendas })
              }
              className={`
                relative h-28 p-2 rounded-2xl cursor-pointer
                border transition
                ${isToday
                  ? "border-blue-500 bg-blue-50"
                  : "border-white/40 bg-white/70 hover:bg-blue-50/60"}
              `}
            >
              <p className={`font-bold ${isToday ? "text-blue-700" : "text-slate-700"}`}>
                {date}
              </p>

              <div className="space-y-1 mt-1">
                {agendas.slice(0, 2).map(a => (
                  <p
                    key={a._id}
                    className="text-[11px] truncate rounded px-1 py-0.5
                    bg-blue-600 text-white"
                  >
                    {a.title}
                  </p>
                ))}

                {agendas.length > 2 && (
                  <p className="text-[11px] text-blue-600 font-medium">
                    +{agendas.length - 2} lainnya
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ================= DETAIL MODAL ================= */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm
            flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="
                relative w-full max-w-md p-6 rounded-2xl
                bg-white/80 backdrop-blur-xl
                border border-white/40
                shadow-[0_20px_40px_rgba(0,0,0,0.2)]
              "
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <button
                onClick={() => setShowDetail(null)}
                className="absolute top-3 right-3 text-slate-500 hover:text-slate-800"
              >
                <X size={18} />
              </button>

              <h3 className="text-lg font-bold text-blue-700 mb-4">
                Agenda {showDetail.dateStr}
              </h3>

              <div className="space-y-3">
                {showDetail.agendas.map(a => (
                  <div
                    key={a._id}
                    className="p-4 rounded-xl bg-blue-50 border border-blue-100"
                  >
                    <p className="font-semibold">{a.title}</p>
                    <p className="text-sm text-slate-600">Jam: {a.time || "-"}</p>
                    <p className="text-sm text-slate-600">Lokasi: {a.location || "-"}</p>

                    <div className="flex justify-end gap-3 mt-3">
                      <button
                        onClick={() => router.push(`/admin/kalender/edit/${a._id}`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => deleteAgenda(a._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
