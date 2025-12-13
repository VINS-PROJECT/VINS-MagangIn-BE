"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, X, Pencil, Trash2 } from "lucide-react";
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
        setAgendaList(json.data);
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
    <div className="space-y-10 text-gray-800">

      {/* HEADER */}
      <div className="flex justify-between items-center gap-3">
        <button onClick={handlePrevMonth} className="btn-nav">{"<"}</button>

        <h2 className="text-2xl font-bold text-blue-700 flex-1 text-center">
          {monthNames[currentMonth]} {currentYear}
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/admin/kalender/tambah")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Plus size={16} /> Tambah
          </button>
          <button onClick={handleNextMonth} className="btn-nav">{">"}</button>
        </div>
      </div>

      {/* WEEKDAYS */}
      <div className="grid grid-cols-7 text-center font-semibold text-gray-600">
        {weekdays.map(d => <div key={d}>{d}</div>)}
      </div>

      {/* CALENDAR */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: monthOffset }).map((_, i) => (
          <div key={i} className="h-24" />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = i + 1;
          const dateStr = `${currentYear}-${String(currentMonth+1).padStart(2,"0")}-${String(date).padStart(2,"0")}`;
          const agendas = agendaList.filter(a => a.date === dateStr);

          return (
            <motion.div
              key={date}
              whileHover={{ scale: 1.03 }}
              onClick={() =>
                agendas.length && setShowDetail({ dateStr, agendas })
              }
              className="p-2 h-24 rounded-xl border bg-blue-50 cursor-pointer"
            >
              <p className="font-bold text-blue-700">{date}</p>
              {agendas.map(a => (
                <p key={a._id} className="text-xs bg-blue-600 text-white rounded px-1 mt-1 truncate">
                  {a.title}
                </p>
              ))}
            </motion.div>
          );
        })}
      </div>

      {/* DETAIL MODAL */}
      {showDetail && (
        <Modal onClose={() => setShowDetail(null)}>
          <h3 className="font-bold mb-3">Agenda {showDetail.dateStr}</h3>
          {showDetail.agendas.map(a => (
            <div key={a._id} className="p-3 bg-blue-50 rounded mb-3">
              <p className="font-medium">{a.title}</p>
              <p className="text-sm">Jam: {a.time || "-"}</p>
              <p className="text-sm">Lokasi: {a.location || "-"}</p>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => router.push(`/admin/kalender/edit/${a._id}`)}
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => deleteAgenda(a._id)}
                  className="text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </Modal>
      )}
    </div>
  );
}

/* ===== MODAL ===== */
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white p-6 rounded-xl w-full max-w-md"
      >
        <button onClick={onClose} className="absolute top-3 right-3">
          <X size={18} />
        </button>
        {children}
      </motion.div>
    </div>
  );
}
