"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";

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
        setError(data?.message || "Username atau kata sandi salah");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        relative overflow-hidden
        bg-gradient-to-br from-slate-100 via-white to-slate-200
      "
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-blue-400/20 rounded-full blur-[140px]" />
      <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] bg-sky-300/30 rounded-full blur-[160px]" />

      {/* CARD */}
      <div
        className="
          relative w-full max-w-md p-9 rounded-3xl
          bg-white/70 backdrop-blur-2xl
          border border-white/50
          shadow-[0_30px_70px_rgba(0,0,0,0.12)]
          space-y-8
        "
      >
        {/* HEADER */}
        <div className="text-center space-y-2">
          <div
            className="
              mx-auto w-14 h-14 rounded-2xl
              bg-gradient-to-br from-blue-600 to-sky-500
              flex items-center justify-center
              shadow-lg shadow-blue-500/30
            "
          >
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>

          <h1
            className="
              text-3xl font-extrabold tracking-tight
              bg-gradient-to-r from-blue-600 to-sky-500
              bg-clip-text text-transparent
            "
          >
            VINSGawe
          </h1>
          <p className="text-sm text-slate-500">
            Admin Control Panel
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="
                w-full h-11 px-4 rounded-xl
                bg-white/80 border border-slate-300/70
                text-slate-900 outline-none
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                transition
              "
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
                className="
                  w-full h-11 px-4 pr-11 rounded-xl
                  bg-white/80 border border-slate-300/70
                  text-slate-900 outline-none
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                  transition
                "
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  text-slate-500 hover:text-slate-800 transition
                "
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div
              className="
                text-sm text-red-700
                bg-red-100/70 border border-red-200
                rounded-xl px-4 py-2
              "
            >
              {error}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full h-11 rounded-xl
              bg-gradient-to-r from-blue-600 to-sky-500
              text-white font-semibold
              shadow-[0_12px_30px_rgba(37,99,235,0.35)]
              hover:brightness-110 transition
              disabled:opacity-60
              flex items-center justify-center gap-2
            "
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Memproses..." : "Masuk ke Dashboard"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="text-center text-xs text-slate-400 pt-2">
          © {new Date().getFullYear()} VINSGawe · Secure Admin System
        </div>
      </div>
    </div>
  );
}
