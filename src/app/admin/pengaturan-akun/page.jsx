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
  const [loading, setLoading] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    nama: "Admin VINS",
    email: "admin@vins.id",
    oldPass: "",
    newPass: "",
  });

  /* ================= FOTO PROFIL ================= */
  const handleImageUpload = (e) => {
    if (!isEdit) return;
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file maksimal 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  /* ================= SIMPAN DATA ================= */
  const saveData = async () => {
    if (!formData.oldPass || !formData.newPass) {
      alert("Password lama dan baru wajib diisi");
      return;
    }

    if (formData.newPass.length < 8) {
      alert("Password baru minimal 8 karakter");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: formData.oldPass,
          newPassword: formData.newPass,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Gagal mengubah password");
        return;
      }

      alert("Password berhasil diubah");

      setFormData({
        ...formData,
        oldPass: "",
        newPass: "",
      });

      setIsEdit(false);
    } catch (err) {
      alert("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
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
            className="flex items-center gap-2 px-5 py-3 rounded-xl
            bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            <Pencil className="w-4 h-4" /> Edit
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* FOTO PROFIL */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Foto Profil
          </h3>

          <div className="flex flex-col items-center text-center">
            <img
              src={previewImage}
              onError={(e) => (e.currentTarget.src = "/avatar.jpg")}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />

            <label
              className={`mt-4 px-4 py-2 rounded-xl text-white flex items-center gap-2 transition
              ${
                isEdit
                  ? "bg-blue-600 cursor-pointer hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
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
              JPG / PNG. Maksimal 2MB.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="lg:col-span-2 space-y-8">

          {/* INFO AKUN */}
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
                  disabled
                  className="w-full px-4 py-2 mt-1 rounded-xl border
                  bg-gray-100 text-gray-500 border-gray-300"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" /> Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-2 mt-1 rounded-xl border
                  bg-gray-100 text-gray-500 border-gray-300"
                />
              </div>
            </div>
          </div>

          {/* KEAMANAN */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Keamanan Akun
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-600 text-sm">
                  Kata Sandi Lama
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPass ? "text" : "password"}
                    value={formData.oldPass}
                    disabled={!isEdit}
                    onChange={(e) =>
                      setFormData({ ...formData, oldPass: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl border
                    bg-white disabled:bg-gray-100 border-gray-300"
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
                <label className="text-gray-600 text-sm">
                  Kata Sandi Baru
                </label>
                <div className="relative mt-1">
                  <input
                    type={showNewPass ? "text" : "password"}
                    value={formData.newPass}
                    disabled={!isEdit}
                    onChange={(e) =>
                      setFormData({ ...formData, newPass: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl border
                    bg-white disabled:bg-gray-100 border-gray-300"
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

          {/* SIMPAN */}
          {isEdit && (
            <div className="flex justify-end">
              <button
                onClick={saveData}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl
                bg-blue-600 text-white font-semibold shadow-md
                hover:bg-blue-700 disabled:opacity-50 transition"
              >
                <Save className="w-5 h-5" />
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
