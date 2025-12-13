"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= CEK LOGIN ================= */
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) router.push("/admin");
      })
      .catch(() => {});
  }, [router]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      let data = null;

      // ⛑️ SAFE JSON PARSE
      try {
        data = await res.json();
      } catch {
        throw new Error("Response server bukan JSON");
      }

      if (!res.ok) {
        setError(data?.message || "Login gagal");
        return;
      }

      // ✅ LOGIN BERHASIL
      router.push("/admin");
    } catch (err) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200 space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 tracking-wide">
            MagangIn Admin
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Selamat datang kembali
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* USERNAME */}
          <div>
            <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              Username
            </label>
            <input
              type="text"
              className="mt-1 w-full h-11 px-3 rounded-xl border border-gray-300
              focus:ring-2 focus:ring-blue-500 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              Kata Sandi
            </label>
            <div className="relative mt-1">
              <input
                type={showPass ? "text" : "password"}
                className="w-full h-11 px-3 pr-10 rounded-xl border border-gray-300
                focus:ring-2 focus:ring-blue-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-blue-600 text-white font-semibold
            hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
