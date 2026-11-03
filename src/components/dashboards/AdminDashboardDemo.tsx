"use client";

import React, { useState, useMemo } from "react";
import { useDemoStore } from "@/state/demoStore";
import {
  UsersIcon,
  SearchIcon,
  FilterIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  RefreshCwIcon,
  QrCodeIcon,
} from "@/components/ui/Icons";

interface AdminDashboardDemoProps {
  onGoToScanner?: (token: string) => void;
}

export function AdminDashboardDemo({ onGoToScanner }: AdminDashboardDemoProps) {
  const {
    participants,
    kpis,
    resetDemo,
  } = useDemoStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const filteredParticipants = useMemo(() => {
    return participants.filter((p) => {
      const matchSearch =
        searchQuery === "" ||
        p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.bibNumber.includes(searchQuery) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === "ALL" || p.category === selectedCategory;

      const matchStatus =
        selectedStatus === "ALL" || p.racePackStatus === selectedStatus;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [participants, searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-left">
      {/* Top Bar with KPI Header & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800/80">
        <div>
          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
            13 / COMMAND_CENTER
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Dashboard Kendali & Logistik Acara
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full px-3.5 py-1 border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 font-mono text-xs">
            DATA SIMULASI REALTIME
          </span>
          <button
            type="button"
            onClick={resetDemo}
            className="rounded-full px-4 py-1.5 text-xs font-mono border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5"
            title="Kembalikan data demo ke kondisi awal"
          >
            <RefreshCwIcon className="w-3.5 h-3.5" />
            <span>RESET DEMO</span>
          </button>
        </div>
      </div>

      {/* Symmetric 4-Column Grid for Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Registered */}
        <div className="rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 border border-slate-200/90 bg-white/95 space-y-2 shadow-sm transition-colors">
          <div className="flex justify-between items-center text-xs font-mono text-slate-600">
            <span className="uppercase font-semibold">TOTAL PESERTA TERDAFTAR</span>
            <UsersIcon className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-bold font-mono text-slate-900">
            {kpis.totalRegistered}
          </div>
          <div className="text-xs text-slate-600">
            Target Kuota: 2.500
          </div>
        </div>

        {/* Claimed */}
        <div className="rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 border border-slate-200/90 bg-white/95 space-y-2 shadow-sm transition-colors">
          <div className="flex justify-between items-center text-xs font-mono text-slate-600">
            <span className="uppercase font-semibold">RACEPACK SUDAH DIAMBIL</span>
            <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-bold font-mono text-emerald-700">
            {kpis.totalClaimed}
          </div>
          <div className="text-xs text-emerald-700">
            {kpis.claimRatePercent}% Terdistribusi
          </div>
        </div>

        {/* Unclaimed */}
        <div className="rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 border border-slate-200/90 bg-white/95 space-y-2 shadow-sm transition-colors">
          <div className="flex justify-between items-center text-xs font-mono text-slate-600">
            <span className="uppercase font-semibold">RACEPACK BELUM DIAMBIL</span>
            <AlertCircleIcon className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-bold font-mono text-amber-700">
            {kpis.totalUnclaimed}
          </div>
          <div className="text-xs text-slate-600">
            Siap Verifikasi di Meja
          </div>
        </div>

        {/* Active Desks */}
        <div className="rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 space-y-2 shadow-sm transition-colors">
          <div className="flex justify-between items-center text-xs font-mono text-slate-600 dark:text-slate-400">
            <span>POSKO LOGISTIK</span>
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-3xl font-bold font-mono text-slate-900 dark:text-white">
            4 Meja
          </div>
          <div className="text-xs text-emerald-700 dark:text-emerald-400">
            Status: Aktif & Terhubung
          </div>
        </div>
      </div>

      {/* Filter and Search Bar in Clean Layout */}
      <div className="rounded-2xl p-5 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 space-y-3 transition-colors">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <SearchIcon className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, nomor BIB, atau ID peserta..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="ALL">Semua Kategori ({participants.length})</option>
              <option value="5K Fun Run">5K Fun Run</option>
              <option value="10K Open">10K Open</option>
              <option value="21K Half Marathon">21K Half Marathon</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="ALL">Semua Status Race Pack</option>
              <option value="UNCLAIMED">Belum Diambil</option>
              <option value="CLAIMED">Sudah Diambil</option>
            </select>
          </div>
        </div>
      </div>

      {/* Participants Table */}
      <div className="rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 shadow-2xl transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-5">ID Registrasi</th>
                <th className="py-3.5 px-5">Nama Peserta</th>
                <th className="py-3.5 px-5">Kategori</th>
                <th className="py-3.5 px-5">BIB</th>
                <th className="py-3.5 px-5">Jersey</th>
                <th className="py-3.5 px-5">Status Race Pack</th>
                <th className="py-3.5 px-5 text-right">Aksi Demo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/60 font-mono">
              {filteredParticipants.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 font-sans">
                    Tidak ada peserta yang cocok dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredParticipants.map((p) => {
                  const claimed = p.racePackStatus === "CLAIMED";
                  return (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-5 text-emerald-700 dark:text-emerald-400 font-bold">{p.id}</td>
                      <td className="py-3.5 px-5 font-sans">
                        <div className="text-slate-900 font-semibold">{p.fullName}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{p.email}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          NIK: {p.nik ? `${p.nik.slice(0, 6)}******${p.nik.slice(-4)}` : "320301******0001"}
                        </div>
                      </td>
                      <td className="py-3.5 px-5 font-sans text-slate-600 dark:text-slate-400">
                        {p.category}
                      </td>
                      <td className="py-3.5 px-5 text-slate-900 dark:text-white font-bold text-sm">
                        {p.bibNumber}
                      </td>
                      <td className="py-3.5 px-5 font-sans text-slate-600 dark:text-slate-400">
                        {p.tshirtSize}
                      </td>
                      <td className="py-3.5 px-5 font-sans">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[10px] font-mono font-bold border ${
                            claimed
                              ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30"
                              : "bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-200 dark:border-amber-500/30"
                          }`}
                        >
                          {claimed ? (
                            <>
                              <CheckCircleIcon className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              <span>SUDAH DIAMBIL</span>
                            </>
                          ) : (
                            <>
                              <AlertCircleIcon className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                              <span>BELUM DIAMBIL</span>
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 font-sans text-right">
                        {onGoToScanner && (
                          <button
                            type="button"
                            onClick={() => onGoToScanner(p.qrToken)}
                            className="rounded-full px-3 py-1 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-emerald-700 dark:text-emerald-400 border border-slate-300 dark:border-slate-700 text-[11px] font-mono flex items-center gap-1.5 ml-auto transition-colors"
                            title="Simulasikan scan QR peserta ini"
                          >
                            <QrCodeIcon className="w-3 h-3" />
                            <span>Scan QR</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
