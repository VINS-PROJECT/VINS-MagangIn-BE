"use client";
import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Upload,
  Save,
} from "lucide-react";

export default function PengaturanAkunPage() {
  const [previewImage, setPreviewImage] = useState("/avatar.jpg");
  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text">
          Pengaturan Akun
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Atur informasi akun dan keamanan kata sandi.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* Foto Profil */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl h-fit">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Foto Profil</h3>

          <div className="flex flex-col items-center text-center">
            <img
              src={previewImage}
              className="w-32 h-32 rounded-full object-cover border-2 border-violet-400 shadow-md"
            />

            <label className="mt-4 px-4 py-2 rounded-xl bg-violet-600/40 border border-violet-400 text-white flex items-center gap-2 cursor-pointer hover:bg-violet-600/60 transition">
              <Upload className="w-4 h-4" />
              Ganti Foto
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <p className="text-gray-400 text-xs mt-3">
              Hanya JPG/PNG. Maksimal 2MB.
            </p>
          </div>
        </div>

        {/* FORM INPUT */}
        <div className="lg:col-span-2 space-y-8">

          {/* Informasi Akun */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-200 mb-6">
              Informasi Akun
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Nama */}
              <div>
                <label className="text-gray-300 text-sm flex items-center gap-2">
                  <User className="w-4 h-4" /> Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Nama Kamu"
                  className="w-full px-4 py-2 mt-1 rounded-xl bg-white/10 border border-white/10 text-gray-200 outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-300 text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-4 py-2 mt-1 rounded-xl bg-white/10 border border-white/10 text-gray-200 outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>

            </div>
          </div>

          {/* Keamanan */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-200 mb-6">
              Keamanan Akun
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Password Lama */}
              <div>
                <label className="text-gray-300 text-sm">Kata Sandi Lama</label>
                <div className="relative mt-1">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••••"
                    className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-gray-200"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2 text-gray-300"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Password Baru */}
              <div>
                <label className="text-gray-300 text-sm">Kata Sandi Baru</label>
                <div className="relative mt-1">
                  <input
                    type={showNewPass ? "text" : "password"}
                    placeholder="••••••••••"
                    className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-gray-200"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2 text-gray-300"
                    onClick={() => setShowNewPass(!showNewPass)}
                  >
                    {showNewPass ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Tombol Simpan */}
          <div className="flex justify-end">
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold shadow-lg hover:scale-[1.03] transition"
            >
              <Save className="w-5 h-5" />
              Simpan Perubahan
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
