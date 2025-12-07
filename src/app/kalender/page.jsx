"use client";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock,
  Bookmark,
} from "lucide-react";

// SAMPLE EVENTS (API ready)
const calendarEvents = [
  {
    date: "2025-11-19",
    type: "Logbook",
    title: "Update logbook minggu ke-2",
    time: "18.00",
    description: "Lengkapi logbook harian dan upload file PDF.",
  },
  {
    date: "2025-11-20",
    type: "Meeting",
    title: "Meeting dengan Mentor",
    time: "10.00",
    description: "Bahas progress landing page dan halaman track.",
  },
  {
    date: "2025-11-21",
    type: "Deadline",
    title: "Deadline UI Track History",
    time: "23.59",
    description: "Finalisasi UI Track History dan commit ke repo.",
  },
  {
    date: "2025-11-23",
    type: "Review",
    title: "Review Logbook Mingguan",
    time: "19.30",
    description: "Cek semua entri logbook minggu ini sebelum dikirim.",
  },
];

// Format date -> YYYY-MM-DD
function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Generate monthly grid
function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  let currentDay = 1;
  let nextDay = 1;
  const matrix = [];

  for (let w = 0; w < 6; w++) {
    const row = [];
    for (let d = 0; d < 7; d++) {
      const index = w * 7 + d;
      let cellDate;
      let inCurrent = true;

      if (index < startDay) {
        cellDate = new Date(year, month - 1, daysInPrevMonth - (startDay - index - 1));
        inCurrent = false;
      } else if (currentDay > daysInMonth) {
        cellDate = new Date(year, month + 1, nextDay++);
        inCurrent = false;
      } else {
        cellDate = new Date(year, month, currentDay++);
      }

      row.push({ date: cellDate, inCurrent });
    }
    matrix.push(row);
  }

  return matrix;
}

export default function KalenderPage() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(formatDateKey(today));

  const monthMatrix = useMemo(
    () => getMonthMatrix(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const eventsByDate = useMemo(() => {
    const map = {};
    calendarEvents.forEach((ev) => {
      if (!map[ev.date]) map[ev.date] = [];
      map[ev.date].push(ev);
    });
    return map;
  }, []);

  const selectedEvents = eventsByDate[selectedDate] || [];

  const monthText = new Date(currentYear, currentMonth).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

  const weekDays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const goPrevMonth = () => {
    setSelectedDate("");
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else setCurrentMonth((m) => m - 1);
  };

  const goNextMonth = () => {
    setSelectedDate("");
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else setCurrentMonth((m) => m + 1);
  };

  return (
    <section className="relative text-white py-32 px-6 overflow-hidden">

      {/* Soft glowing orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute left-[-200px] top-[120px] w-[420px] h-[420px] bg-violet-600 rounded-full blur-[190px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-extrabold flex items-center gap-2"
            >
              <CalendarDays className="w-8 h-8 text-violet-400" />
              Kalender{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Magang
              </span>
            </motion.h1>

            <LiveClock />
          </div>

          {/* month selector */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 self-start md:self-auto"
          >
            <button onClick={goPrevMonth} className="p-2 rounded-xl border border-white/20 hover:bg-white/10 transition">
              <ChevronLeft size={18} />
            </button>

            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium">
              {monthText}
            </div>

            <button onClick={goNextMonth} className="p-2 rounded-xl border border-white/20 hover:bg-white/10 transition">
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>

        {/* --- MAIN AREA: CALENDAR + EVENT PANEL --- */}
        <div className="grid lg:grid-cols-[2fr,1.3fr] gap-8">

          {/* Calendar Grid */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-4 md:p-6 shadow-xl"
          >
            <div className="grid grid-cols-7 text-center text-xs md:text-sm text-gray-400 mb-3">
              {weekDays.map((d) => (
                <div key={d} className="py-1 uppercase tracking-wide">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {monthMatrix.map((week, wi) =>
                week.map((cell, ci) => {
                  const dateKey = formatDateKey(cell.date);
                  const hasEvents = !!eventsByDate[dateKey];
                  const isToday =
                    formatDateKey(today) === dateKey && cell.inCurrent;
                  const isSelected = selectedDate === dateKey;

                  return (
                    <button
                      key={`${wi}-${ci}`}
                      onClick={() => setSelectedDate(dateKey)}
                      className={`
                        flex flex-col items-center justify-center text-xs md:text-sm
                        rounded-xl px-1 py-2 md:px-2 md:py-3 transition
                        ${cell.inCurrent ? "text-gray-100" : "text-gray-600/40"}
                        ${isSelected ? "bg-gradient-to-br from-violet-600/90 to-fuchsia-500/80" : "hover:bg-white/10"}
                      `}
                    >
                      <span
                        className={`
                          w-6 h-6 flex items-center justify-center rounded-md
                          ${isToday ? "border border-violet-400/80" : ""}
                        `}
                      >
                        {cell.date.getDate()}
                      </span>

                      {hasEvents && (
                        <span className={`
                          w-1.5 h-1.5 rounded-full mt-1
                          ${isSelected ? "bg-white" : "bg-violet-400"}
                        `}/>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>

          {/* EVENT SIDE PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-5 shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between gap-2 mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-violet-400" />
                Agenda Harian
              </h2>
            </div>

            <p className="text-xs text-gray-300 mb-4">
              {selectedDate || "Pilih tanggal pada kalender"}
            </p>

            {selectedEvents.length === 0 ? (
              <p className="text-gray-400 italic text-sm mt-6 text-center">
                Tidak ada agenda.
              </p>
            ) : (
              <div className="space-y-4">
                {selectedEvents.map((ev, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <span className="text-[10px] px-2 py-1 rounded-full bg-violet-600/30 text-violet-200 font-medium">
                      {ev.type}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-300 mt-2">
                      <Clock size={12} /> <span>{ev.time}</span>
                    </div>
                    <h4 className="text-sm font-semibold mt-1 text-gray-100">{ev.title}</h4>
                    {ev.description && (
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        {ev.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            <p className="mt-6 text-[11px] text-gray-500 italic">
              *Event masih sample data → bisa disinkronkan dengan Track & Logbook.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* 🎯 LIVE CLOCK COMPONENT */
function LiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateString = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeString = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-xs md:text-sm text-violet-300 mt-1"
    >
      ⏱ {dateString} • {timeString}
    </motion.p>
  );
}
