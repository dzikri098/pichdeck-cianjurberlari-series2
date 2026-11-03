"use client";

import React from "react";
import { eventConfig } from "@/content/eventConfig";
import {
  RunnerIcon,
  QrCodeIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  WarningTriangleIcon,
  CameraIcon,
  MailIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  CheckIcon,
} from "@/components/ui/Icons";

export function FallbackMockupView({ slotId }: { slotId: string }) {
  switch (slotId) {
    case "landing-desktop":
      return <LandingDesktopFallback />;
    case "landing-mobile":
      return <LandingMobileFallback />;
    case "registration-form":
      return <RegistrationFormFallback />;
    case "registration-success":
      return <RegistrationSuccessFallback />;
    case "email-preview":
      return <EmailPreviewFallback />;
    case "participant-dashboard":
      return <ParticipantDashboardFallback />;
    case "participant-racepack-qr":
      return <ParticipantQrFallback />;
    case "admin-overview":
      return <AdminOverviewFallback />;
    case "admin-participants":
      return <AdminParticipantsFallback />;
    case "admin-analytics":
      return <AdminAnalyticsFallback />;
    case "scanner-idle":
      return <ScannerIdleFallback />;
    case "scanner-verified":
      return <ScannerVerifiedFallback />;
    case "scanner-proof-upload":
      return <ScannerProofUploadFallback />;
    case "scanner-success":
      return <ScannerSuccessFallback />;
    case "scanner-already-claimed":
      return <ScannerAlreadyClaimedFallback />;
    case "scanner-invalid":
      return <ScannerInvalidFallback />;
    default:
      return (
        <div className="p-8 text-center text-slate-500 text-xs font-mono">
          Fallback preview untuk slot {slotId} sedang disiapkan.
        </div>
      );
  }
}

/* 1. Landing Desktop Fallback */
function LandingDesktopFallback() {
  return (
    <div className="w-full text-left font-sans bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 p-6 md:p-8 space-y-8 transition-colors">
      {/* Event Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <RunnerIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase font-semibold text-emerald-700 dark:text-emerald-400">
              KONI KABUPATEN CIANJUR
            </div>
            <div className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
              Cianjur Berlari Bupati Series 2
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
          <span>Kategori</span>
          <span>Rute & Jadwal</span>
          <span>Race Pack</span>
          <span>FAQ</span>
          <span className="rounded-full px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold transition-all shadow-sm">
            Daftar Sekarang
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-6">
        <div className="md:col-span-7 space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30">
            01 / EVENT_PREVIEW_SEASON_2
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            Berlari Bersama, Bangkitkan Olahraga Cianjur
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Ajang lari resmi persembahan KONI Kabupaten Cianjur yang menyatukan
            antusiasme ribuan pelari, pelajar, komunitas, dan keluarga di rute
            ikonik kebanggaan daerah.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <span className="rounded-full px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              Registrasi Peserta
            </span>
            <span className="rounded-full px-5 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 text-xs font-medium">
              Lihat Kategori Lomba
            </span>
          </div>
        </div>

        {/* Hero Card / Key Info */}
        <div className="md:col-span-5 rounded-2xl p-6 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 space-y-4 shadow-sm transition-colors">
          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold block">
            EVENT_METRICS_INFO
          </span>
          <div className="space-y-3.5 text-xs">
            <div className="flex items-start gap-3">
              <CalendarIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Jadwal Acara</div>
                <div className="text-slate-600 dark:text-slate-400">
                  {eventConfig.eventDatePlaceholder}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPinIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Titik Start & Finish</div>
                <div className="text-slate-600 dark:text-slate-400">
                  {eventConfig.venuePlaceholder}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <UsersIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Target Kuota</div>
                <div className="text-slate-600 dark:text-slate-400">
                  {eventConfig.quotaPlaceholder}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Preview */}
      <div className="space-y-4 pt-4">
        <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold block">
          PILIHAN KATEGORI LOMBA
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {eventConfig.categories.map((cat) => (
            <div
              key={cat.id}
              className="rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 space-y-2.5 shadow-sm transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-slate-900 dark:text-white">{cat.name}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 font-mono">
                  {cat.distance}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {cat.description}
              </p>
              <div className="text-[11px] text-slate-500 font-mono pt-1">
                KUOTA: {cat.targetQuota} SLOT
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 2. Landing Mobile Fallback */
function LandingMobileFallback() {
  return (
    <div className="w-full text-left font-sans bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 p-4 space-y-4 transition-colors">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
        <img
          src="/branding/logo-koni-cianjurberlari.png"
          alt="KONI Cianjur Berlari"
          className="h-6 w-auto object-contain"
        />
        <span className="rounded-full px-3 py-0.5 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-[10px]">
          Daftar
        </span>
      </div>

      <div className="space-y-2 pt-2">
        <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
          KONI CIANJUR BUPATI SERIES
        </span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
          Berlari Bersama di Jantung Cianjur
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Kategori 5K, 10K, dan 21K dengan sistem race pack digital terpadu.
        </p>
      </div>

      <div className="rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 space-y-2 text-xs shadow-sm transition-colors">
        <div className="text-slate-500 font-mono text-[10px]">JADWAL & LOKASI:</div>
        <div className="text-slate-900 dark:text-white font-medium">
          {eventConfig.venuePlaceholder}
        </div>
        <div className="text-slate-600 dark:text-slate-400 text-[11px]">
          {eventConfig.eventDatePlaceholder}
        </div>
      </div>

      <div className="space-y-2 pt-1">
        <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 tracking-wider font-semibold">
          PILIHAN KATEGORI:
        </div>
        <div className="space-y-2">
          <div className="rounded-xl p-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/80 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900 dark:text-white">5K Fun Run</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-mono font-semibold">1.200 Slot</span>
          </div>
          <div className="rounded-xl p-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/80 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900 dark:text-white">10K Open</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-mono font-semibold">800 Slot</span>
          </div>
          <div className="rounded-xl p-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]/80 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900 dark:text-white">21K Half Marathon</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-mono font-semibold">500 Slot</span>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <div className="w-full rounded-full py-2.5 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 text-center text-xs font-bold text-white dark:text-slate-950 shadow-md">
          Mulai Registrasi Peserta
        </div>
      </div>
    </div>
  );
}

/* 3. Registration Form Fallback */
function RegistrationFormFallback() {
  return (
    <div className="w-full text-left font-sans bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 p-6 md:p-8 space-y-6 transition-colors">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800/80">
        <div>
          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
            FORMULIR PESERTA
          </span>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            Registrasi Cianjur Berlari Season 2
          </div>
        </div>
        <div className="rounded-full px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-mono">
          LANGKAH 1 DARI 2
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-slate-600 dark:text-slate-400 font-medium">Nama Lengkap</label>
          <div className="rounded-xl p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-medium">
            Rian Hidayat
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-slate-600 dark:text-slate-400 font-medium">Email</label>
          <div className="rounded-xl p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-medium">
            rian.hidayat@example.com
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-slate-600 dark:text-slate-400 font-medium">WhatsApp</label>
          <div className="rounded-xl p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-medium">
            0812-3456-7890
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-slate-600 dark:text-slate-400 font-medium">Kategori</label>
          <div className="rounded-xl p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-bold">
            5K Fun Run
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <span className="rounded-full px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 text-white dark:text-slate-950 text-xs font-bold shadow-md">
          Kirim Pendaftaran
        </span>
      </div>
    </div>
  );
}

/* 4. Registration Success Fallback */
function RegistrationSuccessFallback() {
  return (
    <div className="w-full text-left font-sans bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 p-6 md:p-8 space-y-6 transition-colors">
      <div className="flex flex-col items-center text-center space-y-3 py-4">
        <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <CheckCircleIcon className="w-8 h-8" />
        </div>
        <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
          REGISTRATION_CONFIRMED
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
          Pendaftaran Berhasil Diterima
        </h2>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
          Silakan cek email Anda untuk akses dashboard peserta. Tautan aktivasi dan
          informasi pengambilan race pack telah dikirimkan secara otomatis.
        </p>
      </div>

      <div className="rounded-2xl p-5 bg-white dark:bg-[#111827]/80 border border-slate-200 dark:border-slate-800/80 space-y-3 text-xs shadow-sm">
        <div className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
          RINCIAN AKSES PENDAFTARAN
        </div>
        <div className="grid grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">
          <div>
            <span className="text-slate-500 block text-[11px]">ID Registrasi:</span>
            <span className="font-mono text-slate-900 dark:text-white font-bold">CB2-5K-0104</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Email Terdaftar:</span>
            <span className="text-slate-900 dark:text-white">rian.hidayat@example.com</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <span className="rounded-full px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs shadow-md">
          Buka Dashboard Peserta
        </span>
      </div>
    </div>
  );
}

/* 5. Email Preview Fallback */
function EmailPreviewFallback() {
  return (
    <div className="w-full text-left font-sans bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 p-6 md:p-8 space-y-5 transition-colors">
      <div className="rounded-2xl p-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-mono font-bold text-xs">
            KONI
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">KONI Cianjur Berlari Season 2</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">notifikasi@link-domain-anda.com</div>
          </div>
        </div>
        <span className="rounded-full px-3 py-0.5 border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 font-mono text-[10px]">
          EMAIL TRANSAKSIONAL
        </span>
      </div>

      <div className="rounded-2xl p-6 bg-white dark:bg-[#111827]/80 border border-slate-200 dark:border-slate-800/80 space-y-4 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
        <div className="text-sm font-bold text-slate-900 dark:text-white">Halo, Rian Hidayat!</div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Pendaftaran Anda untuk ajang Cianjur Berlari Bupati Series Season 2 telah berhasil dicatat.
        </p>
        <div className="rounded-xl p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">ID Peserta:</span>
            <span className="text-slate-900 dark:text-white font-bold">CB2-5K-0104</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Nomor BIB:</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">5104</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 6. Participant Dashboard Fallback */
function ParticipantDashboardFallback() {
  return (
    <div className="w-full text-left font-sans bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 p-6 md:p-8 space-y-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800/80">
        <div>
          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
            DASHBOARD PESERTA
          </span>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">Selamat Datang, Rian Hidayat</div>
        </div>
        <span className="rounded-full px-3 py-1 text-xs font-mono font-bold bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
          STATUS : BELUM DIAMBIL
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl p-6 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 space-y-2 shadow-sm transition-colors">
          <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">NOMOR BIB ANDA</div>
          <div className="text-3xl font-black font-mono text-emerald-700 dark:text-emerald-400">5104</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Kategori 5K Fun Run</div>
        </div>

        <div className="rounded-2xl p-6 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 space-y-2 shadow-sm transition-colors">
          <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">PENGAMBILAN RACE PACK</div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">H-2 s/d H-1 Acara</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">09.00 - 17.00 WIB di Pendopo Cianjur</div>
        </div>

        <div className="rounded-2xl p-6 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 space-y-2 shadow-sm transition-colors">
          <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">FLAG-OFF WAKTU MULAI</div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">06.00 WIB</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Alun-alun Kabupaten Cianjur</div>
        </div>
      </div>
    </div>
  );
}

/* 7. Participant QR Fallback */
function ParticipantQrFallback() {
  return (
    <div className="w-full text-center font-sans bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 p-5 space-y-4 transition-colors">
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">
          KONI CIANJUR BERLARI S2
        </span>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Paspor Digital Race Pack
        </h3>
        <p className="text-[11px] text-slate-600 dark:text-slate-400">
          Tunjukkan kepada petugas di meja penyerahan race pack
        </p>
      </div>

      <div className="p-4 bg-white rounded-2xl inline-block shadow-xl border-2 border-emerald-500/30">
        <div className="w-44 h-44 bg-slate-950 rounded-xl flex flex-col items-center justify-center p-3 text-white space-y-2">
          <svg className="w-36 h-36" viewBox="0 0 100 100" fill="white">
            <rect x="5" y="5" width="25" height="25" rx="3" fill="none" stroke="white" strokeWidth="6" />
            <rect x="12" y="12" width="11" height="11" />
            <rect x="70" y="5" width="25" height="25" rx="3" fill="none" stroke="white" strokeWidth="6" />
            <rect x="77" y="12" width="11" height="11" />
            <rect x="5" y="70" width="25" height="25" rx="3" fill="none" stroke="white" strokeWidth="6" />
            <rect x="12" y="77" width="11" height="11" />
            <rect x="40" y="10" width="8" height="8" />
            <rect x="52" y="15" width="8" height="8" />
            <rect x="40" y="35" width="8" height="8" />
            <rect x="52" y="45" width="8" height="8" />
            <rect x="70" y="40" width="8" height="8" />
            <rect x="85" y="52" width="8" height="8" />
            <rect x="38" y="70" width="8" height="8" />
            <rect x="52" y="78" width="8" height="8" />
            <rect x="70" y="75" width="8" height="8" />
            <rect x="85" y="85" width="8" height="8" />
          </svg>
          <div className="text-[9px] font-mono tracking-widest text-emerald-400">
            CB2-QR-5K-0104
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-4 bg-white dark:bg-[#111827]/80 border border-slate-200 dark:border-slate-800/80 text-left space-y-1.5 text-xs shadow-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Nama:</span>
          <span className="text-slate-900 dark:text-white font-bold">Rian Hidayat</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Kategori:</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-bold">5K Fun Run</span>
        </div>
        <div className="flex justify-between items-center pt-1 border-t border-slate-200 dark:border-slate-800/80">
          <span className="text-slate-500">Status:</span>
          <span className="rounded-full px-2.5 py-0.5 bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 font-mono text-[11px] border border-amber-200 dark:border-amber-500/30">
            Belum Diambil
          </span>
        </div>
      </div>
    </div>
  );
}

/* 8. Admin Overview Fallback */
function AdminOverviewFallback() {
  return (
    <div className="w-full text-left font-sans bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 p-6 md:p-8 space-y-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800/80">
        <div>
          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
            COMMAND CENTER PANITIA
          </span>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">Monitoring Pendaftaran & Logistik</div>
        </div>
        <span className="rounded-full px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-mono">
          DATA SIMULASI
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div className="rounded-2xl p-6 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 space-y-1 shadow-sm transition-colors">
          <div className="text-xs text-slate-500 font-mono">TARGET KUOTA</div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">2.500</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Semua Kategori</div>
        </div>
        <div className="rounded-2xl p-6 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 space-y-1 shadow-sm transition-colors">
          <div className="text-xs text-slate-500 font-mono uppercase">TOTAL PESERTA TERDAFTAR</div>
          <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono">2.150</div>
          <div className="text-xs text-emerald-700 dark:text-emerald-400">86% Terisi</div>
        </div>
        <div className="rounded-2xl p-6 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 space-y-1 shadow-sm transition-colors">
          <div className="text-xs text-slate-500 font-mono uppercase">RACEPACK SUDAH DIAMBIL</div>
          <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono">1.420</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">66% Terdistribusi</div>
        </div>
        <div className="rounded-2xl p-6 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 space-y-1 shadow-sm transition-colors">
          <div className="text-xs text-slate-500 font-mono uppercase">RACEPACK BELUM DIAMBIL</div>
          <div className="text-3xl font-black text-amber-700 dark:text-amber-400 font-mono">730</div>
          <div className="text-xs text-amber-700 dark:text-amber-400">Menunggu Verifikasi</div>
        </div>
      </div>
    </div>
  );
}

/* 9. Admin Participants Fallback */
function AdminParticipantsFallback() {
  return (
    <div className="w-full text-left font-sans bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 p-6 md:p-8 space-y-5 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800/80">
        <div>
          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
            DATABASE PESERTA
          </span>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">Daftar Pelari & Status Logistik</div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 shadow-sm transition-colors">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 font-mono uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">ID Peserta</th>
              <th className="py-3 px-4">Nama</th>
              <th className="py-3 px-4">Kategori</th>
              <th className="py-3 px-4">BIB</th>
              <th className="py-3 px-4">Race Pack</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/60 font-mono">
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-bold">CB2-5K-0104</td>
              <td className="py-3 px-4 text-slate-900 dark:text-white font-sans font-medium">Rian Hidayat</td>
              <td className="py-3 px-4 text-slate-600 dark:text-slate-400">5K Fun Run</td>
              <td className="py-3 px-4 text-slate-900 dark:text-white font-bold">5104</td>
              <td className="py-3 px-4">
                <span className="rounded-full px-2.5 py-0.5 text-[10px] bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 font-semibold font-sans">
                  Belum Diambil
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 10. Admin Analytics Fallback */
function AdminAnalyticsFallback() {
  return (
    <div className="w-full text-left font-sans bg-slate-50 text-slate-900 p-6 md:p-8 space-y-6 transition-colors">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-mono text-emerald-700 tracking-widest uppercase font-semibold">
            VISUALISASI DATA & ANALITIK
          </span>
          <div className="text-xl font-bold text-slate-900 mt-1">
            Monitoring Kuota & Distribusi Logistik Racepack
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full px-3 py-1 bg-white border border-slate-200 text-xs text-slate-600 font-mono shadow-xs">
            DATA SIMULASI REALTIME
          </span>
        </div>
      </div>

      {/* 3 Metric Summary Cards: Total Peserta Terdaftar, Racepack Sudah Diambil, Racepack Belum Diambil */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Total Peserta Terdaftar */}
        <div className="rounded-2xl p-5 border border-slate-200 bg-white space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Total Peserta Terdaftar</span>
            <UsersIcon className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-slate-900">2.150</span>
            <span className="text-xs font-mono text-slate-500">/ 2.500 Kuota</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: "86%" }} />
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-500">
            <span className="text-emerald-700 font-semibold font-mono">86% Terisi</span>
            <span>Sisa Kuota: 350 Slot</span>
          </div>
        </div>

        {/* Card 2: Racepack Sudah Diambil */}
        <div className="rounded-2xl p-5 border border-slate-200 bg-white space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Racepack Sudah Diambil</span>
            <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-emerald-700">1.420</span>
            <span className="text-xs font-mono text-slate-500">Peserta</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: "66%" }} />
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-500">
            <span className="text-emerald-700 font-semibold font-mono">66% Terdistribusi</span>
            <span>Tervalidasi Foto Bukti</span>
          </div>
        </div>

        {/* Card 3: Racepack Belum Diambil */}
        <div className="rounded-2xl p-5 border border-slate-200 bg-white space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Racepack Belum Diambil</span>
            <AlertCircleIcon className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-amber-700">730</span>
            <span className="text-xs font-mono text-slate-500">Peserta</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "34%" }} />
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-500">
            <span className="text-amber-700 font-semibold font-mono">34% Tersisa di Posko</span>
            <span>Siap Pengambilan</span>
          </div>
        </div>
      </div>

      {/* Grid: Total Pendaftar dari Kuota (Race Lokal, Race Nasional, FunRun) + Tren Pendaftaran Harian */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Pendaftar dari Kuota Kategori */}
        <div className="rounded-2xl p-6 border border-slate-200 bg-white space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono text-emerald-700 font-semibold uppercase tracking-wider">
              TOTAL PENDAFTAR DARI KUOTA KATEGORI
            </div>
            <span className="text-[11px] font-mono text-slate-500">3 Kategori Lomba</span>
          </div>

          <div className="space-y-3.5 pt-1">
            {/* Race Lokal */}
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-bold text-slate-900">Race Lokal</div>
                  <div className="text-[11px] text-slate-500">Pelari Komunitas & Warga Daerah Cianjur</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black font-mono text-emerald-700">1.050 / 1.200</div>
                  <div className="text-[11px] font-mono text-slate-500 font-semibold">87,5% Kuota Terisi</div>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-600 h-2 rounded-full transition-all" style={{ width: "87.5%" }} />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>Terdaftar: 1.050 orang</span>
                <span>Sisa: 150 slot</span>
              </div>
            </div>

            {/* Race Nasional */}
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-bold text-slate-900">Race Nasional</div>
                  <div className="text-[11px] text-slate-500">Pelari Terbuka Luar Daerah & Atlet</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black font-mono text-sky-700">680 / 800</div>
                  <div className="text-[11px] font-mono text-slate-500 font-semibold">85,0% Kuota Terisi</div>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-sky-600 h-2 rounded-full transition-all" style={{ width: "85.0%" }} />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>Terdaftar: 680 orang</span>
                <span>Sisa: 120 slot</span>
              </div>
            </div>

            {/* FunRun */}
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-bold text-slate-900">FunRun</div>
                  <div className="text-[11px] text-slate-500">Kategori Rekreasi Pelajar & Keluarga</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black font-mono text-amber-700">420 / 500</div>
                  <div className="text-[11px] font-mono text-slate-500 font-semibold">84,0% Kuota Terisi</div>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: "84.0%" }} />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>Terdaftar: 420 orang</span>
                <span>Sisa: 80 slot</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tren Pendaftaran Harian & Kecepatan Distribusi */}
        <div className="rounded-2xl p-6 border border-slate-200 bg-white space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono text-emerald-700 font-semibold uppercase tracking-wider">
              TREN PENDAFTARAN HARIAN (AKUMULASI)
            </div>
            <span className="text-[11px] font-mono text-emerald-700 font-bold">+185 Hari Ini</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-2 pt-6 px-1">
            {[
              { label: "H-14", count: 180, pct: 15 },
              { label: "H-12", count: 320, pct: 25 },
              { label: "H-10", count: 490, pct: 36 },
              { label: "H-8", count: 780, pct: 52 },
              { label: "H-6", count: 1210, pct: 68 },
              { label: "H-4", count: 1840, pct: 86 },
              { label: "H-2", count: 2150, pct: 100 },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-mono text-slate-600 font-medium">{item.count}</span>
                <div
                  className="w-full rounded-t bg-emerald-600 transition-all shadow-xs"
                  style={{ height: `${item.pct}%` }}
                />
                <span className="text-[10px] text-slate-500 font-mono font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 inline-block" />
              <span>Volume Pendaftaran</span>
            </span>
            <span className="font-mono text-slate-500 text-[11px]">Lonjakan tertinggi H-6 s.d H-2</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 11. Scanner Idle Fallback */
function ScannerIdleFallback() {
  return (
    <div className="w-full text-center font-sans bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 p-6 space-y-4 transition-colors">
      <div className="space-y-1">
        <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold uppercase tracking-widest">
          SCANNER_STANDBY
        </div>
        <div className="text-sm font-bold text-slate-900 dark:text-white">Arahkan Kamera ke QR Peserta</div>
      </div>

      <div className="relative mx-auto w-56 h-56 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-4 shadow-sm transition-colors">
        <div className="text-center space-y-2">
          <CameraIcon className="w-10 h-10 text-emerald-600 dark:text-emerald-400/80 mx-auto" />
          <span className="text-[11px] text-slate-500 font-mono block">
            MENUNGGU PEMINDAIAN...
          </span>
        </div>
      </div>
    </div>
  );
}

/* 12. Scanner Verified Fallback */
function ScannerVerifiedFallback() {
  return (
    <div className="w-full text-left font-sans bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 p-5 space-y-4 transition-colors">
      <div className="rounded-xl p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-3">
        <CheckCircleIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <div>
          <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 font-mono">QR VALID & TERDAFTAR</div>
          <div className="text-[11px] text-slate-600 dark:text-slate-300">Status paket: Siap diserahkan</div>
        </div>
      </div>
    </div>
  );
}

/* 13. Scanner Proof Upload Fallback */
function ScannerProofUploadFallback() {
  return (
    <div className="w-full text-left font-sans bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 p-5 space-y-4 transition-colors">
      <div className="space-y-1">
        <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold uppercase tracking-wider">
          FOTO_BUKTI_PENYERAHAN
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-400">
          Ambil foto peserta/perwakilan yang menerima paket perlengkapan lomba
        </div>
      </div>
    </div>
  );
}

/* 14. Scanner Success Fallback */
function ScannerSuccessFallback() {
  return (
    <div className="w-full text-center font-sans bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 p-6 space-y-4 transition-colors">
      <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
        <CheckCircleIcon className="w-7 h-7" />
      </div>
      <div className="space-y-1">
        <h4 className="text-base font-bold text-slate-900 dark:text-white">
          Pengambilan Race Pack Berhasil
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Paket resmi telah diserahkan dan status terkunci.
        </p>
      </div>
    </div>
  );
}

/* 15. Scanner Already Claimed Fallback */
function ScannerAlreadyClaimedFallback() {
  return (
    <div className="w-full text-left font-sans bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 p-5 space-y-4 transition-colors">
      <div className="rounded-xl p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-start gap-3">
        <WarningTriangleIcon className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-bold text-amber-800 dark:text-amber-400 font-mono uppercase tracking-wider">
            PERINGATAN : PAKET SUDAH PERNAH DIAMBIL
          </div>
          <div className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed mt-0.5">
            Sistem menolak pengambilan ulang untuk mencegah duplikasi distribusi.
          </div>
        </div>
      </div>
    </div>
  );
}

/* 16. Scanner Invalid Fallback */
function ScannerInvalidFallback() {
  return (
    <div className="w-full text-center font-sans bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 p-6 space-y-4 transition-colors">
      <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center">
        <AlertCircleIcon className="w-7 h-7" />
      </div>
      <div className="space-y-1">
        <h4 className="text-base font-bold text-rose-600 dark:text-rose-400 font-mono">
          KODE TIDAK DITEMUKAN
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
          Kode QR tidak cocok dengan basis data peserta terdaftar.
        </p>
      </div>
    </div>
  );
}
