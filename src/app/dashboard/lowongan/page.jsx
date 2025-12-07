"use client";
import { useState } from "react";
import Link from "next/link";

export default function LowonganPage() {
  const allLowongan = [
    { id: 1, posisi: "Frontend Developer Intern", perusahaan: "Telkom Indonesia", lokasi: "Jakarta", tipe: "Magang" },
    { id: 2, posisi: "Data Analyst Intern", perusahaan: "Bank Mandiri", lokasi: "Jakarta", tipe: "Magang" },
    { id: 3, posisi: "UI/UX Designer Intern", perusahaan: "BRI Digital", lokasi: "Bandung", tipe: "Magang" },
    { id: 4, posisi: "Software Engineer", perusahaan: "BNI Technology", lokasi: "Surabaya", tipe: "Full-time" },
    { id: 5, posisi: "Backend Developer", perusahaan: "Telkomsel", lokasi: "Jakarta", tipe: "Full-time" },
    { id: 6, posisi: "Product Manager Intern", perusahaan: "Indosat Ooredoo", lokasi: "Bandung", tipe: "Magang" },
    { id: 7, posisi: "Cloud Engineer", perusahaan: "XL Axiata", lokasi: "Surabaya", tipe: "Full-time" },
  ];

  const [search, setSearch] = useState("");
  const [filterLokasi, setFilterLokasi] = useState("Semua");
  const [filterTipe, setFilterTipe] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredLowongan = allLowongan.filter((job) => {
    const matchSearch =
      job.posisi.toLowerCase().includes(search.toLowerCase()) ||
      job.perusahaan.toLowerCase().includes(search.toLowerCase());
    const matchLokasi =
      filterLokasi === "Semua" || job.lokasi === filterLokasi;
    const matchTipe = filterTipe === "Semua" || job.tipe === filterTipe;
    return matchSearch && matchLokasi && matchTipe;
  });

  const totalPages = Math.ceil(filteredLowongan.length / itemsPerPage);
  const paginatedLowongan = filteredLowongan.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const lokasiList = ["Semua", "Jakarta", "Bandung", "Surabaya"];
  const tipeList = ["Semua", "Magang", "Full-time", "Part-time"];

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Lowongan Pekerjaan</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Jelajahi peluang magang dan pekerjaan sesuai minatmu.
      </p>

      {/* 🔍 Filter dan Pencarian */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Cari posisi atau perusahaan..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 min-w-[250px] px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#141a23] text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterLokasi}
          onChange={(e) => {
            setFilterLokasi(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#141a23] text-sm text-gray-800 dark:text-gray-200 focus:outline-none"
        >
          {lokasiList.map((lok) => (
            <option key={lok} value={lok}>
              {lok}
            </option>
          ))}
        </select>
        <select
          value={filterTipe}
          onChange={(e) => {
            setFilterTipe(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#141a23] text-sm text-gray-800 dark:text-gray-200 focus:outline-none"
        >
          {tipeList.map((tipe) => (
            <option key={tipe} value={tipe}>
              {tipe}
            </option>
          ))}
        </select>
      </div>

      {/* 🧾 Tabel */}
      <div className="overflow-x-auto bg-white dark:bg-[#141a23] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-[#1a1f2b] text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-6 py-3 border-b dark:border-gray-700 w-16">No</th>
              <th className="px-6 py-3 border-b dark:border-gray-700">
                Nama Perusahaan
              </th>
              <th className="px-6 py-3 border-b dark:border-gray-700">Posisi</th>
              <th className="px-6 py-3 border-b dark:border-gray-700">Lokasi</th>
              <th className="px-6 py-3 border-b dark:border-gray-700">Tipe</th>
              <th className="px-6 py-3 border-b dark:border-gray-700 text-center w-48">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedLowongan.length > 0 ? (
              paginatedLowongan.map((job, index) => (
                <tr
                  key={job.id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-white/5 dark:border-gray-800 transition"
                >
                  <td className="px-6 py-3">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-900 dark:text-gray-100">
                    {job.perusahaan}
                  </td>
                  <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                    {job.posisi}
                  </td>
                  <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                    {job.lokasi}
                  </td>
                  <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                    {job.tipe}
                  </td>
                  <td className="px-6 py-3 text-center flex justify-center gap-2">
                    <Link
                      href={`/dashboard/lowongan/${job.id}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition"
                    >
                      Lihat Detail
                    </Link>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-green-600 hover:bg-green-700 text-white transition">
                      Lamar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  Tidak ada lowongan yang cocok dengan pencarianmu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination di kiri */}
      {totalPages > 1 && (
        <div className="flex justify-start items-center gap-2 mt-6">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg text-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1f2b] text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-white/10 transition"
          >
            ‹ Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => changePage(i + 1)}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1f2b] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
              } transition`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg text-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1f2b] text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-white/10 transition"
          >
            Next ›
          </button>
        </div>
      )}
    </div>
  );
}
