"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, Pencil, Trash2 } from "lucide-react";

export default function KalenderPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [agendaList, setAgendaList] = useState([]);
  const [showDetail, setShowDetail] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    time: "",
    location: "",
    date: "",
  });

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const monthOffset = new Date(currentYear, currentMonth, 1).getDay();
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  const weekdays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const openAddAgenda = (date) => {
    setFormData({
      id: null,
      title: "",
      time: "",
      location: "",
      date,
    });
    setShowForm(true);
  };

  const openEditAgenda = (agenda) => {
    setFormData(agenda);
    setShowForm(true);
  };

  const saveAgenda = () => {
    if (!formData.title || !formData.date) return alert("Isi dulu semua field!");

    if (formData.id) {
      setAgendaList((prev) =>
        prev.map((a) => (a.id === formData.id ? formData : a))
      );
    } else {
      setAgendaList((prev) => [
        ...prev,
        {
          ...formData,
          id: Math.random().toString(36).substring(2, 9),
        },
      ]);
    }
    setShowForm(false);
  };

  const deleteAgenda = (id) => {
    setAgendaList((prev) => prev.filter((a) => a.id !== id));
    setShowDetail(null);
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
        >
          {"<"}
        </button>

        <h2 className="text-xl font-bold">
          {monthNames[currentMonth]} {currentYear}
        </h2>

        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
        >
          {">"}
        </button>
      </div>

      {/* weekdays */}
      <div className="grid grid-cols-7 gap-2 text-center text-violet-300 font-semibold">
        {weekdays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* dates */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: monthOffset }).map((_, i) => (
          <div key={`offset-${i}`} className="h-24 rounded-xl" />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = i + 1;
          const dateStr = `${currentYear}-${String(
            currentMonth + 1
          ).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

          const agendas = agendaList.filter((a) => a.date === dateStr);

          return (
            <motion.div
              key={date}
              whileHover={{ scale: 1.03 }}
              className="p-2 h-24 border border-white/10 rounded-xl
              bg-white/5 hover:bg-white/10 cursor-pointer overflow-y-auto"
              onClick={() => agendas.length === 0 ? openAddAgenda(dateStr) : setShowDetail({ dateStr, agendas })}
            >
              <p className="text-sm font-semibold text-violet-300">{date}</p>

              {agendas.map((a) => (
                <div
                  key={a.id}
                  className="mt-1 p-1 rounded bg-violet-600 text-[10px] text-white"
                >
                  {a.title}
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>

      {/* DETAIL MODAL */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-[420px] bg-[#131822] rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-bold text-violet-300 mb-4">
              Agenda {showDetail.dateStr}
            </h3>

            {showDetail.agendas.map((agenda) => (
              <div
                key={agenda.id}
                className="p-3 rounded-xl bg-white/10 mb-3"
              >
                <p><strong>{agenda.title}</strong></p>
                <p className="text-sm text-gray-300">Jam: {agenda.time || "-"}</p>
                <p className="text-sm text-gray-300">Lokasi: {agenda.location || "-"}</p>

                <div className="flex justify-end mt-3 gap-2">
                  <button
                    className="text-yellow-400 hover:text-yellow-300"
                    onClick={() => openEditAgenda(agenda)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => deleteAgenda(agenda.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => openAddAgenda(showDetail.dateStr)}
                className="px-3 py-2 bg-violet-600 rounded-lg hover:bg-violet-500 text-sm"
              >
                Tambah Agenda
              </button>
              <button
                onClick={() => setShowDetail(null)}
                className="px-3 py-2 border border-white/20 rounded-lg text-sm"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-[400px] bg-[#141922] rounded-xl p-6 border border-white/10 shadow-xl"
          >
            <h3 className="text-lg font-bold text-violet-300 mb-3">
              {formData.id ? "Edit Agenda" : "Tambah Agenda"}
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nama Kegiatan"
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <input
                type="time"
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Lokasi"
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>

            <div className="flex justify-between gap-2 mt-4">
              <button
                className="px-3 py-2 bg-violet-600 rounded-lg hover:bg-violet-500 text-sm"
                onClick={saveAgenda}
              >
                Simpan
              </button>
              <button
                className="px-3 py-2 border border-white/20 rounded-lg text-sm"
                onClick={() => setShowForm(false)}
              >
                Batal
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
