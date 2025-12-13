"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= AUTO REDIRECT ================= */
  useEffect(() => {
    fetch("/api/auth/me").then((res) => {
      if (res.ok) router.push("/admin");
    });
  }, [router]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.message || "Login gagal");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden
      bg-gradient-to-br from-slate-100 via-white to-slate-200">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-sky-300/30 rounded-full blur-3xl" />

      {/* GLASS CARD */}
      <div
        className="relative w-full max-w-md p-8 rounded-2xl
        bg-white/60 backdrop-blur-xl
        border border-white/40
        shadow-[0_20px_40px_rgba(0,0,0,0.08)]
        space-y-7"
      >

        {/* HEADER */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-extrabold tracking-wide
            bg-gradient-to-r from-blue-600 to-sky-500
            bg-clip-text text-transparent">
            VINSGawe
          </h1>
          <p className="text-sm text-slate-500">
            Admin Control Panel
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* USERNAME */}
          <div>
            <label className="text-xs font-medium text-slate-600 flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-blue-600" />
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full h-11 px-4 rounded-xl
              bg-white/70 border border-slate-300/70
              text-slate-900 outline-none
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
              transition"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-xs font-medium text-slate-600 flex items-center gap-2 mb-1">
              <Lock className="w-4 h-4 text-blue-600" />
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-11 px-4 pr-11 rounded-xl
                bg-white/70 border border-slate-300/70
                text-slate-900 outline-none
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                transition"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                text-slate-500 hover:text-slate-800 transition"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="text-sm text-red-700
              bg-red-100/60 border border-red-200
              rounded-xl px-4 py-2">
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl
            bg-gradient-to-r from-blue-600 to-sky-500
            text-white font-semibold
            shadow-lg hover:brightness-110 transition
            disabled:opacity-60
            flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="text-center text-xs text-slate-400 pt-2">
          © {new Date().getFullYear()} VINSGawe · Secure System
        </div>
      </div>
    </div>
  );
}
