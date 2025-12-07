"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🚫 Semua halaman ini tidak perlu Navbar & Footer
  const hideLayoutPrefixes = [
    "/login",
    "/register",
    "/lupa-kata-sandi",
    "/dashboard",     // dashboard peserta
    "/admin",         // dashboard admin
    "/perusahaan",    // dashboard perusahaan
  ];

  // 🔍 Cek apakah path sekarang termasuk salah satu prefix di atas
  const shouldHide = hideLayoutPrefixes.some((path) =>
    pathname.startsWith(path)
  );

  // ⏳ Hindari mismatch antara server & client
  if (!mounted) return null;

  return (
    <>
      {!shouldHide && <Navbar />}
      <main className={!shouldHide ? "pt-20" : ""}>{children}</main>
      {!shouldHide && <Footer />}
    </>
  );
}
