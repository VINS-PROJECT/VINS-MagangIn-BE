"use client";
import { useState, useMemo, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock,
  Bookmark,
} from "lucide-react";

/* ================= UTIL ================= */
function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

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
        cellDate = new Date(
          year,
          month - 1,
          daysInPrevMonth - (startDay - index - 1)
        );
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

/* ================= PAGE ================= */
export default function KalenderPage() {
  const today = new Date();
  const todayKey = formatDateKey(today);

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(todayKey);

  const [eventsByDate, setEventsByDate] = useState({});
  const [loading, setLoading] = useState(true);

  /* ================= LOAD AGENDA ================= */
  useEffect(() => {
    async function loadAgenda() {
      try {
        const res = await fetch("/api/calendar", { cache: "no-store" });
        if (!res.ok) return;

        const json = await res.json();
        const map = {};

        json.data.forEach((a) => {
          if (!map[a.date]) map[a.date] = [];
          map[a.date].push({
            type: a.source === "track" ? "Logbook" : "Agenda",
            title: a.title,
            time: a.time || "-",
            description: a.location || "",
          });
        });

        Object.keys(map).forEach((k) =>
          map[k].sort((x, y) => (x.time || "").localeCompare(y.time || ""))
        );

        setEventsByDate(map);
      } catch (err) {
        console.error("Gagal load kalender", err);
      } finally {
        setLoading(false);
      }
    }

    loadAgenda();
  }, []);

  const monthMatrix = useMemo(
    () => getMonthMatrix(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const selectedEvents = eventsByDate[selectedDate] || [];

  const monthText = new Date(currentYear, currentMonth).toLocaleDateString(
    "id-ID",
    { month: "long", year: "numeric" }
  );

  const weekDays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const goPrevMonth = () => {
    setSelectedDate("");
    currentMonth === 0
      ? (setCurrentMonth(11), setCurrentYear((y) => y - 1))
      : setCurrentMonth((m) => m - 1);
  };

  const goNextMonth = () => {
    setSelectedDate("");
    currentMonth === 11
      ? (setCurrentMonth(0), setCurrentYear((y) => y + 1))
      : setCurrentMonth((m) => m + 1);
  };

  /* ================= RENDER ================= */
  return (
    <section className="relative overflow-hidden bg-white py-32 px-6">

      {/* SOFT GLOW */}
      <div className="absolute -right-48 top-40 w-[420px] h-[420px] bg-sky-300/30 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-14">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3">
              <CalendarDays className="w-8 h-8 text-blue-600" />
              Kalender{" "}
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                VINSGawe
              </span>
            </h1>
            <LiveClock />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={goPrevMonth}
              className="p-2.5 rounded-xl border border-blue-200 hover:bg-blue-50 transition"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="px-5 py-2.5 rounded-xl bg-blue-50 text-sm font-semibold text-blue-700 border border-blue-200/60">
              {monthText}
            </div>

            <button
              onClick={goNextMonth}
              className="p-2.5 rounded-xl border border-blue-200 hover:bg-blue-50 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-[2fr,1.2fr] gap-8">

          {/* CALENDAR */}
          <div className="rounded-2xl bg-white/85 backdrop-blur-xl border border-blue-200/50 shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6">
            <div className="grid grid-cols-7 text-center text-sm text-gray-600 mb-4 font-medium">
              {weekDays.map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {monthMatrix.map((week, wi) =>
                week.map((cell, ci) => {
                  const dateKey = formatDateKey(cell.date);
                  const hasEvents = !!eventsByDate[dateKey];
                  const isSelected = selectedDate === dateKey;
                  const isToday = dateKey === todayKey;

                  return (
                    <button
                      key={`${wi}-${ci}`}
                      onClick={() => setSelectedDate(dateKey)}
                      className={`
                        relative rounded-xl py-2.5 text-sm font-medium transition
                        ${cell.inCurrent ? "text-gray-900" : "text-gray-400"}
                        ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-md"
                            : "hover:bg-blue-50"
                        }
                        ${isToday && !isSelected ? "ring-2 ring-blue-400/40" : ""}
                      `}
                    >
                      {cell.date.getDate()}
                      {hasEvents && (
                        <span
                          className={`absolute bottom-1.5 left-1/2 -translate-x-1/2
                            w-1.5 h-1.5 rounded-full
                            ${isSelected ? "bg-white" : "bg-blue-500"}
                          `}
                        />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* EVENT PANEL */}
          <div className="rounded-2xl bg-white/85 backdrop-blur-xl border border-blue-200/50 shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-1">
              <Bookmark size={18} className="text-blue-600" />
              Agenda Harian
            </h2>

            <p className="text-xs text-gray-500 mb-5">
              {selectedDate || "Pilih tanggal"}
            </p>

            {loading ? (
              <p className="text-sm text-gray-500">Memuat agenda...</p>
            ) : selectedEvents.length === 0 ? (
              <p className="text-gray-500 italic text-sm">
                Tidak ada agenda.
              </p>
            ) : (
              <div className="space-y-4">
                {selectedEvents.map((ev, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/50"
                  >
                    <span
                      className={`text-[11px] px-2.5 py-1 rounded-full text-white ${
                        ev.type === "Logbook"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {ev.type}
                    </span>

                    <div className="flex items-center gap-1 text-xs text-gray-700 mt-2">
                      <Clock size={12} /> {ev.time}
                    </div>

                    <h4 className="text-sm font-semibold mt-1">
                      {ev.title}
                    </h4>

                    {ev.description && (
                      <p className="text-xs text-gray-600 mt-1">
                        {ev.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= CLOCK ================= */
function LiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <p className="text-sm text-blue-600 mt-2">
      ⏱ {now.toLocaleString("id-ID")}
    </p>
  );
}
