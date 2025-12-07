"use client";

import { useState, useEffect } from "react";
import { Mail, Key, Calendar, Activity, Shield } from "lucide-react";

export default function AkunPage() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const current = localStorage.getItem("theme") || "light";
    setTheme(current);
    document.documentElement.classList.toggle("dark", current === "dark");
  }, []);

  // 🔹 Data akun (bisa diganti dari backend nanti)
  const akun = {
    nama: "Kevin Simorangkir",
    email: "kevin@example.com",
    password: "••••••••",
    role: "Peserta", // ✅ Role baru (Peserta/Admin/Perusahaan)
    status: "Aktif",
    lastLogin: "20 Oktober 2025, 10:32",
    joined: "12 September 2025",
  };

  return (
    <div className="space-y-8">
      {/* 🏷️ Judul halaman */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Informasi Akun
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Lihat detail akun, peran, dan aktivitas login kamu di bawah ini.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* 👤 Profil singkat */}
        <div className="bg-white dark:bg-[#1a1f2b] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
          <img
            src="/avatar.jpg"
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500 mb-3"
          />
          <h3 className="text-lg font-semibold">{akun.nama}</h3>
          <p className="text-sm text-gray-500">{akun.email}</p>

          {/* 🛡️ Role */}
          <div className="flex flex-col items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
              <Shield className="w-4 h-4" />
              {akun.role}
            </span>
            <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full">
              {akun.status}
            </span>
          </div>
        </div>

        {/* 📄 Detail akun */}
        <div className="md:col-span-2 bg-white dark:bg-[#1a1f2b] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm space-y-6">
          {/* 📧 Email & Password */}
          <section>
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase mb-4">
              Detail Akun
            </h4>

            <div className="space-y-4">
              {/* Email */}
              <InfoItem
                icon={Mail}
                label="Email"
                value={akun.email}
                action="Ubah Email"
                color="text-blue-500"
              />

              {/* Password */}
              <InfoItem
                icon={Key}
                label="Password"
                value={akun.password}
                action="Ubah Password"
                color="text-yellow-500"
              />
            </div>
          </section>

          {/* 🕒 Aktivitas akun */}
          <section>
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase mb-4">
              Aktivitas Akun
            </h4>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
              <InfoRow
                icon={Calendar}
                color="text-green-500"
                label="Tanggal Bergabung"
                value={akun.joined}
              />
              <InfoRow
                icon={Activity}
                color="text-purple-500"
                label="Terakhir Login"
                value={akun.lastLogin}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* 🔸 Komponen kecil untuk bagian detail akun */
function InfoItem({ icon: Icon, label, value, action, color }) {
  return (
    <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition">
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${color}`} />
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
          <p className="font-medium text-gray-800 dark:text-gray-100">{value}</p>
        </div>
      </div>
      <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
        {action}
      </button>
    </div>
  );
}

/* 🔸 Komponen kecil untuk bagian aktivitas akun */
function InfoRow({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3 p-4">
      <Icon className={`w-5 h-5 ${color}`} />
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-gray-800 dark:text-gray-100 font-medium">{value}</p>
      </div>
    </div>
  );
}
