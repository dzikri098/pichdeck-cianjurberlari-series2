"use client";

import React, { useState } from "react";
import {
  UsersIcon,
  ShieldCheckIcon,
  MailIcon,
  QrCodeIcon,
  CameraIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from "@/components/ui/Icons";

interface JourneyStep {
  stepNumber: string;
  title: string;
  pesertaRole: string;
  panitiaRole: string;
  techCheck: string;
}

export function JourneyFlow() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps: JourneyStep[] = [
    {
      stepNumber: "01",
      title: "Landing Page & Pilihan Kategori",
      pesertaRole:
        "Membaca informasi resmi acara, mempelajari rute lari, dan memilih kategori (5K / 10K / 21K) sesuai kesiapan fisik.",
      panitiaRole:
        "Menyampaikan brand event secara berkelas dan mengumumkan kapasitas kuota masing-masing kategori secara transparan.",
      techCheck: "Halaman ringan, cepat di ponsel, dan ramah SEO tanpa login terlebih dahulu.",
    },
    {
      stepNumber: "02",
      title: "Pengisian Formulir Registrasi",
      pesertaRole:
        "Memasukkan data pribadi, nomor kontak WhatsApp, ukuran jersey, serta kontak darurat keluarga untuk keselamatan.",
      panitiaRole:
        "Menerima data pendaftaran yang terstruktur, tervalidasi, dan bebas dari data ganda atau format nomor keliru.",
      techCheck: "Pengecekan kuota atomik server-side mencegah pendaftaran melebihi kuota saat lonjakan trafik.",
    },
    {
      stepNumber: "03",
      title: "Konfirmasi & Akses via Email",
      pesertaRole:
        "Menerima email resmi berisi ID registrasi dan tautan masuk sekali klik (magic link) tanpa perlu menghafal kata sandi.",
      panitiaRole:
        "Memiliki rekam jejak notifikasi yang terkirim rapi dengan log pengiriman email transaksional.",
      techCheck: "Zero plaintext password: tautan terotentikasi berbatas waktu menjaga akun dari kebocoran.",
    },
    {
      stepNumber: "04",
      title: "Dashboard & Paspor QR Pribadi",
      pesertaRole:
        "Mengecek nomor BIB, detail jadwal lomba, titik pengambilan, dan menyimpan kode QR di ponsel untuk ditunjukkan di posko.",
      panitiaRole:
        "Mengurangi antrean pertanyaan informasi dasar karena seluruh panduan dapat dibaca mandiri oleh pelari.",
      techCheck: "Kode QR berisi token acak terenkripsi, bukan nomor induk kependudukan atau nomor telepon mentah.",
    },
    {
      stepNumber: "05",
      title: "Pengambilan Race Pack di Posko",
      pesertaRole:
        "Menunjukkan QR kepada petugas meja, mencocokkan ukuran jersey, dan berfoto sejenak sebagai tanda terima paket.",
      panitiaRole:
        "Memindai QR dalam hitungan detik, memverifikasi kesesuaian fisik, melampirkan foto bukti, dan mengunci status secara instan.",
      techCheck: "Status langsung terupdate ke cloud, mencegah klaim ulang di meja lain dan memperbarui KPI panitia.",
    },
  ];

  const current = steps[activeStepIndex];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-left">
      <div className="rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 space-y-6 shadow-xl transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800/80">
          <div>
            <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
              05 / END_TO_END_JOURNEY
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              5 Tahapan Perjalanan Peserta & Panitia
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            PILIH TAHAP UNTUK MELIHAT PERAN
          </span>
        </div>

        {/* Stepper Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          {steps.map((s, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={s.stepNumber}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`rounded-2xl p-4 text-left border transition-all ${
                  isActive
                    ? "bg-emerald-50 dark:bg-slate-900 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                    : "bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-slate-500"
                    }`}
                  >
                    TAHAP {s.stepNumber}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                  )}
                </div>
                <div
                  className={`mt-1 font-semibold line-clamp-2 text-xs ${
                    isActive
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Roles Card (Symmetric 2 Columns) */}
        <div className="rounded-2xl p-6 md:p-8 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-5 transition-colors">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 flex items-center justify-center font-bold text-xs font-mono">
              {current.stepNumber}
            </span>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              {current.title}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Peserta Role */}
            <div className="rounded-2xl p-5 border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#111827]/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-mono text-xs tracking-wider uppercase font-semibold">
                <UsersIcon className="w-4 h-4" />
                <span>PENGALAMAN PESERTA</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                {current.pesertaRole}
              </p>
            </div>

            {/* Panitia Role */}
            <div className="rounded-2xl p-5 border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#111827]/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-mono text-xs tracking-wider uppercase font-semibold">
                <ShieldCheckIcon className="w-4 h-4" />
                <span>KONTROL PANITIA KONI</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                {current.panitiaRole}
              </p>
            </div>
          </div>

          {/* Technical Assurance */}
          <div className="rounded-xl p-3.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-xs flex items-start gap-3">
            <CheckCircleIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Jaminan Sistem: </span>
              <span className="text-slate-700 dark:text-slate-300">{current.techCheck}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
