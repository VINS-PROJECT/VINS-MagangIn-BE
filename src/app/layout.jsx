import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export const metadata = {
  title: "MagangHub — Membangun Talenta Muda Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="relative bg-[#0b0f15] text-gray-100 overflow-x-hidden transition-colors duration-500">

        {/* 🌌 GLOBAL BACKGROUND */}
        <div className="fixed inset-0 -z-50 bg-[#0b0f15]" />

        {/* 🟣 Soft grid seluruh halaman */}
        <div className="fixed inset-0 -z-40 opacity-[0.05] bg-[url('/grid.svg')] bg-center" />

        {/* 💜 Gradient global menyatu dari atas ke bawah */}
        <div className="fixed inset-0 -z-30 bg-gradient-to-b from-violet-900/40 via-[#0b0f15]/40 to-[#0b0f15]" />

        {/* 🔮 Orbs global extremely soft */}
        <div className="fixed top-0 right-[-200px] w-[600px] h-[600px] bg-fuchsia-600/15 blur-[200px] -z-20" />
        <div className="fixed bottom-0 left-[-200px] w-[520px] h-[520px] bg-violet-600/15 blur-[190px] -z-20" />

        {/* CONTENT */}
        <ClientLayoutWrapper>
          <main>{children}</main> 
        </ClientLayoutWrapper>

      </body>
    </html>
  );
}
