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
  Pencil,
} from "lucide-react";

export default function PengaturanAkunPage() {
  const [previewImage, setPreviewImage] = useState("/avatar.jpg");
  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    nama: "Admin VINS",
    email: "admin@vins.id",
    oldPass: "",
    newPass: "",
  });

  const handleImageUpload = (e) => {
    if (!isEdit) return;
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const saveData = () => {
    setIsEdit(false);
    alert("Data berhasil disimpan!");
  };

  return (
    <div className="space-y-10 text-gray-900">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-blue-600">
            Pengaturan Akun
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Atur informasi akun dan keamanan kata sandi.
          </p>
        </div>

        {!isEdit && (
          <button
            onClick={() => setIsEdit(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            <Pencil className="w-4 h-4" /> Edit
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* Foto Profil */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Foto Profil</h3>

          <div className="flex flex-col items-center text-center">
            <img
              src={previewImage}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />

            <label
              className={`mt-4 px-4 py-2 rounded-xl text-white flex items-center gap-2 transition
              ${isEdit ? "bg-blue-600 cursor-pointer hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}
            `}
            >
              <Upload className="w-4 h-4" />
              Ganti Foto
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={!isEdit}
                className="hidden"
              />
            </label>

            <p className="text-gray-600 text-xs mt-3">
              Hanya JPG/PNG. Maksimal 2MB.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 space-y-8">

          {/* Informasi Akun */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Informasi Akun
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="text-gray-600 text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" /> Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.nama}
                  disabled={!isEdit}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-4 py-2 mt-1 rounded-xl border bg-white disabled:bg-gray-100 disabled:text-gray-500 border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" /> Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled={!isEdit}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 mt-1 rounded-xl border bg-white disabled:bg-gray-100 disabled:text-gray-500 border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

            </div>
          </div>

          {/* Keamanan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Keamanan Akun
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="text-gray-600 text-sm">Kata Sandi Lama</label>
                <div className="relative mt-1">
                  <input
                    type={showPass ? "text" : "password"}
                    value={formData.oldPass}
                    disabled={!isEdit}
                    onChange={(e) => setFormData({ ...formData, oldPass: e.target.value })}
                    placeholder="••••••••••"
                    className="w-full px-4 py-2 rounded-xl border bg-white disabled:bg-gray-100 disabled:text-gray-500 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2 text-gray-600"
                    onClick={() => setShowPass(!showPass)}
                    disabled={!isEdit}
                  >
                    {showPass ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-gray-600 text-sm">Kata Sandi Baru</label>
                <div className="relative mt-1">
                  <input
                    type={showNewPass ? "text" : "password"}
                    value={formData.newPass}
                    disabled={!isEdit}
                    onChange={(e) => setFormData({ ...formData, newPass: e.target.value })}
                    placeholder="••••••••••"
                    className="w-full px-4 py-2 rounded-xl border bg-white disabled:bg-gray-100 disabled:text-gray-500 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2 text-gray-600"
                    onClick={() => setShowNewPass(!showNewPass)}
                    disabled={!isEdit}
                  >
                    {showNewPass ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Simpan */}
          {isEdit && (
            <div className="flex justify-end">
              <button
                onClick={saveData}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
              >
                <Save className="w-5 h-5" />
                Simpan Perubahan
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
