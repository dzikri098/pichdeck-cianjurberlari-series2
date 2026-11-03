"use client";

import React from "react";
import { useDemoStore } from "@/state/demoStore";
import { eventConfig } from "@/content/eventConfig";
import { SvgQrCode } from "@/components/ui/SvgQrCode";
import {
  RunnerIcon,
  CalendarIcon,
  MapPinIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  QrCodeIcon,
  ShieldCheckIcon,
} from "@/components/ui/Icons";

interface ParticipantDashboardDemoProps {
  onGoToScanner?: (token: string) => void;
}

export function ParticipantDashboardDemo({
  onGoToScanner,
}: ParticipantDashboardDemoProps) {
  const { participants, currentParticipant, setCurrentParticipantById } =
    useDemoStore();

  const isClaimed = currentParticipant.racePackStatus === "CLAIMED";

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-left">
      {/* Participant Switcher Toolbar in Dark Tech Pill Format */}
      <div className="rounded-2xl p-4 md:p-5 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 flex flex-wrap items-center justify-between gap-4 text-xs transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-slate-600 dark:text-slate-400 font-mono font-medium">PILIH_AKUN_DEMO:</span>
          <select
            value={currentParticipant.id}
            onChange={(e) => setCurrentParticipantById(e.target.value)}
            className="rounded-full px-4 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-emerald-500"
          >
            {participants.map((p) => (
              <option key={p.id} value={p.id}>
                {p.fullName} ({p.category}) - {p.racePackStatus === "CLAIMED" ? "Sudah Diambil" : "Belum Diambil"}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">
            ID: {currentParticipant.id}
          </span>
          <span
            className={`rounded-full px-3.5 py-1 text-xs font-mono font-bold border ${
              isClaimed
                ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30"
                : "bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-200 dark:border-amber-500/30"
            }`}
          >
            {isClaimed ? "RACE PACK : SUDAH DIAMBIL" : "RACE PACK : BELUM DIAMBIL"}
          </span>
        </div>
      </div>

      {/* Main Grid: Details (7 cols) + QR Pass (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Participant Details & Event Info */}
        <div className="lg:col-span-7 space-y-6">
          {/* Welcome Card */}
          <div className="rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 space-y-5 shadow-xl transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
                  11 / PARTICIPANT_PROFILE
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {currentParticipant.fullName}
                </h3>
                <div className="text-xs text-slate-600 font-mono mt-0.5">
                  {currentParticipant.email} | {currentParticipant.phone}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2 pt-1 border-t border-slate-100">
                  <span className="text-[11px] font-mono text-slate-500">
                    NIK: {currentParticipant.nik ? `${currentParticipant.nik.slice(0, 6)}******${currentParticipant.nik.slice(-4)}` : "320301******0001"}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    1 Tiket Terverifikasi
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                <RunnerIcon className="w-6 h-6" />
              </div>
            </div>

            {/* BIB & Category Highlight */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl p-5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-1">
                <span className="text-[11px] text-slate-500 font-mono uppercase tracking-widest block">
                  NOMOR BIB ANDA
                </span>
                <span className="text-3xl font-black font-mono tracking-wider text-emerald-700 dark:text-emerald-400">
                  {currentParticipant.bibNumber}
                </span>
              </div>
              <div className="rounded-2xl p-5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-1">
                <span className="text-[11px] text-slate-500 font-mono uppercase tracking-widest block">
                  KATEGORI PERLOMBAAN
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white block pt-1">
                  {currentParticipant.category}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  Jersey: Ukuran {currentParticipant.tshirtSize}
                </span>
              </div>
            </div>

            {/* Medical & Emergency Info */}
            <div className="rounded-2xl p-5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-xs space-y-2 text-slate-600 dark:text-slate-400">
              <div className="font-bold text-emerald-700 dark:text-emerald-400 font-mono uppercase tracking-wider text-[11px]">
                DATA MEDIS & DARURAT
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500">Golongan Darah: </span>
                  <span className="text-slate-900 dark:text-white font-bold">{currentParticipant.bloodType}</span>
                </div>
                <div>
                  <span className="text-slate-500">Kontak Darurat: </span>
                  <span className="text-slate-800 dark:text-white">{currentParticipant.emergencyContactName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Event Schedule & Location */}
          <div className="rounded-2xl p-6 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 space-y-4 text-xs shadow-xl transition-colors">
            <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
              EVENT_SCHEDULE_VENUE
            </span>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CalendarIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Jadwal Pengambilan Race Pack</div>
                  <div className="text-slate-600 dark:text-slate-400">
                    H-2 dan H-1 sebelum lomba (Pukul 09.00 - 17.00 WIB)
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Lokasi Pengambilan & Lomba</div>
                  <div className="text-slate-600 dark:text-slate-400">{eventConfig.venuePlaceholder}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: QR Race Pack Pass */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 shadow-2xl text-center space-y-5 transition-colors">
            <div className="flex justify-center pb-1">
              <img
                src="/branding/logo-koni-cianjurberlari.png"
                alt="KONI Cianjur Berlari"
                className="h-8 w-auto object-contain"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
                OFFICIAL_RACEPACK_PASS
              </span>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                Paspor Digital QR
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Tunjukkan layar ini langsung kepada petugas di meja penyerahan logistik.
              </p>
            </div>

            {/* Real SVG QR code container */}
            <div className="py-2 flex justify-center">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                <SvgQrCode value={currentParticipant.qrToken} size={190} />
              </div>
            </div>

            {/* Token details */}
            <div className="rounded-xl p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1 font-mono">
              <span className="text-slate-500 block text-[10px] tracking-wider">
                TOKEN_IDENTIFIER:
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                {currentParticipant.qrToken}
              </span>
            </div>

            {/* Status Information */}
            {isClaimed ? (
              <div className="rounded-xl p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-xs text-left space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold font-mono">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>PAKET TELAH DIAMBIL</span>
                </div>
                <div className="text-slate-700 dark:text-slate-300 text-xs">
                  Waktu: <span className="font-mono text-slate-900 dark:text-white">{currentParticipant.claimedAt}</span>
                </div>
                <div className="text-slate-700 dark:text-slate-300 text-xs">
                  Petugas: <span className="text-emerald-700 dark:text-emerald-400 font-medium">{currentParticipant.claimedBy}</span>
                </div>
              </div>
            ) : (
              <div className="rounded-xl p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-xs text-left space-y-1">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold font-mono">
                  <AlertCircleIcon className="w-4 h-4" />
                  <span>STATUS: SIAP DIAMBIL</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                  Paket race pack Anda belum diserahkan. Kunjungi posko verifikasi sesuai jadwal.
                </p>
              </div>
            )}

            {/* Interactive Demo Action: Test Scan in Table */}
            {onGoToScanner && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onGoToScanner(currentParticipant.qrToken)}
                  className="w-full rounded-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <QrCodeIcon className="w-4 h-4" />
                  <span>Uji Scan QR Ini di Scanner Panitia</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
