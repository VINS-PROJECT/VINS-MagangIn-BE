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
    if (!formData.title || !formData.date)
      return alert("Isi semua form terlebih dahulu!");

    if (formData.id) {
      setAgendaList((prev) =>
        prev.map((a) => (a.id === formData.id ? formData : a))
      );
    } else {
      setAgendaList((prev) => [
        ...prev,
        { ...formData, id: Math.random().toString(36).substring(2, 9) },
      ]);
    }
    setShowForm(false);
  };

  const deleteAgenda = (id) => {
    setAgendaList((prev) => prev.filter((a) => a.id !== id));
    setShowDetail(null);
  };

  return (
    <div className="space-y-10 text-gray-800">

      {/* Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition text-blue-700"
        >
          {"<"}
        </button>

        <h2 className="text-2xl font-bold text-blue-700">
          {monthNames[currentMonth]} {currentYear}
        </h2>

        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition text-blue-700"
        >
          {">"}
        </button>
      </div>

      {/* Weeknames */}
      <div className="grid grid-cols-7 gap-1 md:gap-2 text-center font-semibold text-gray-600">
        {weekdays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {Array.from({ length: monthOffset }).map((_, i) => (
          <div key={`offset-${i}`} className="h-24 rounded-xl" />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = i + 1;
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
            2,
            "0"
          )}-${String(date).padStart(2, "0")}`;

          const agendas = agendaList.filter((a) => a.date === dateStr);

          return (
            <motion.div
              key={date}
              whileHover={{ scale: 1.04 }}
              onClick={() =>
                agendas.length === 0
                  ? openAddAgenda(dateStr)
                  : setShowDetail({ dateStr, agendas })
              }
              className="p-2 h-24 rounded-xl cursor-pointer border border-blue-200
              bg-blue-50 hover:bg-blue-100 transition overflow-y-auto"
            >
              <p className="text-sm font-bold text-blue-700">{date}</p>

              {agendas.map((a) => (
                <p
                  key={a.id}
                  className="mt-1 p-1 rounded bg-blue-600 text-[10px] text-white truncate"
                >
                  {a.title}
                </p>
              ))}
            </motion.div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-xl p-6 border border-blue-200 shadow-lg"
          >
            <h3 className="text-lg font-bold text-blue-700 mb-4">
              Agenda {showDetail.dateStr}
            </h3>

            {showDetail.agendas.map((agenda) => (
              <div key={agenda.id} className="p-3 rounded-lg bg-blue-50 border border-blue-200 mb-3">
                <p className="font-medium">{agenda.title}</p>
                <p className="text-sm text-gray-600">
                  Jam: {agenda.time || "-"}
                </p>
                <p className="text-sm text-gray-600">
                  Lokasi: {agenda.location || "-"}
                </p>
                <div className="flex justify-end gap-2 mt-3">
                  <button className="text-blue-700 hover:text-blue-600" onClick={() => openEditAgenda(agenda)}>
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-500" onClick={() => deleteAgenda(agenda.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => openAddAgenda(showDetail.dateStr)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                + Tambah Agenda
              </button>
              <button
                onClick={() => setShowDetail(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white rounded-xl p-6 border border-blue-200 shadow-xl"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-blue-700">
                {formData.id ? "Edit Agenda" : "Tambah Agenda"}
              </h3>
              <button className="text-red-600 hover:text-red-500" onClick={() => setShowForm(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nama Kegiatan"
                className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white focus:ring-2 focus:ring-blue-600"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <input
                type="time"
                className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white focus:ring-2 focus:ring-blue-600"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Lokasi"
                className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white focus:ring-2 focus:ring-blue-600"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>

            <div className="flex justify-between gap-2 mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                onClick={saveAgenda}
              >
                Simpan
              </button>
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
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
