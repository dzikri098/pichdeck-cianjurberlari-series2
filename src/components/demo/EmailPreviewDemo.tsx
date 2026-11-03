"use client";

import React from "react";
import { useDemoStore } from "@/state/demoStore";
import { eventConfig } from "@/content/eventConfig";
import {
  MailIcon,
  ShieldCheckIcon,
  CalendarIcon,
  MapPinIcon,
  CheckCircleIcon,
} from "@/components/ui/Icons";

interface EmailPreviewDemoProps {
  onGoToDashboard?: () => void;
}

export function EmailPreviewDemo({ onGoToDashboard }: EmailPreviewDemoProps) {
  const { lastRegisteredParticipant, currentParticipant } = useDemoStore();

  const participant = lastRegisteredParticipant || currentParticipant;

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 shadow-2xl text-left">
      {/* Email Client Shell Bar */}
      <div className="p-5 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <MailIcon className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-sm">Simulasi Email Transaksional</span>
          </div>
          <span className="rounded-full px-3 py-0.5 border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 text-[10px] font-mono">
            PREVIEW_MODE
          </span>
        </div>

        <div className="space-y-1.5 font-mono text-[11px] text-slate-600 dark:text-slate-400 pt-1">
          <div className="flex gap-3">
            <span className="text-slate-500 w-20">Pengirim:</span>
            <span className="text-slate-800 dark:text-white">notifikasi@link-domain-anda.com</span>
          </div>
          <div className="flex gap-3">
            <span className="text-slate-500 w-20">Penerima:</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{participant.email}</span>
          </div>
          <div className="flex gap-3">
            <span className="text-slate-500 w-20">Subjek:</span>
            <span className="text-slate-900 dark:text-white font-sans font-semibold">
              Konfirmasi Registrasi & Akses Dashboard: {eventConfig.eventName}
            </span>
          </div>
        </div>
      </div>

      {/* Email Body Content */}
      <div className="p-6 md:p-8 space-y-6 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950/60">
        {/* Brand Banner */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800/80">
          <div>
            <div className="text-[10px] uppercase font-mono font-bold text-emerald-700 dark:text-emerald-400 tracking-widest">
              {eventConfig.organizer}
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              {eventConfig.eventName}
            </div>
          </div>
          <img
            src="/branding/logo-koni-cianjurberlari.png"
            alt="KONI Cianjur Berlari"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Greeting & Main message */}
        <div className="space-y-2">
          <div className="text-base font-bold text-slate-900 dark:text-white">
            Halo, {participant.fullName}!
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
            Selamat, pendaftaran Anda untuk ajang lari kebanggaan Kabupaten Cianjur telah
            berhasil diverifikasi ke dalam sistem. Berikut adalah ringkasan data kepesertaan Anda:
          </p>
        </div>

        {/* Participant Data Box */}
        <div className="rounded-2xl p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-slate-800/80">
            <span className="text-slate-500 font-sans">Nomor BIB Peserta:</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold text-base">{participant.bibNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-sans">ID Registrasi:</span>
            <span className="text-slate-900 font-semibold">{participant.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-sans">Validasi NIK:</span>
            <span className="text-slate-900 font-semibold font-mono">
              {participant.nik ? `${participant.nik.slice(0, 6)}******${participant.nik.slice(-4)}` : "320301******0001"} (1 Tiket Sah)
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-sans">Kategori Lomba:</span>
            <span className="text-slate-900 dark:text-white font-sans font-semibold">{participant.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-sans">Ukuran Jersey:</span>
            <span className="text-slate-800 dark:text-white">{participant.tshirtSize} (Dewasa)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-sans">Status Race Pack:</span>
            <span
              className={`font-sans font-semibold ${
                participant.racePackStatus === "CLAIMED"
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-amber-700 dark:text-amber-400"
              }`}
            >
              {participant.racePackStatus === "CLAIMED" ? "Sudah Diambil" : "Belum Diambil"}
            </span>
          </div>
        </div>

        {/* Secure Access Model Callout */}
        <div className="rounded-xl p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold font-mono text-xs">
            <ShieldCheckIcon className="w-4 h-4" />
            <span>AKSES AMAN TANPA KATA SANDI TERBUKA</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
            Untuk menjaga keamanan akun Anda, email ini tidak memuat kata sandi teks terbuka.
            Gunakan tombol masuk sekali klik di bawah ini untuk membuka dashboard pribadi
            dan menampilkan QR pengambilan race pack Anda.
          </p>
        </div>

        {/* Pill CTA Button */}
        <div className="text-center pt-2 space-y-2">
          <button
            type="button"
            onClick={onGoToDashboard}
            className="w-full sm:w-auto rounded-full px-8 py-3 text-sm font-bold bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            Masuk ke Dashboard Peserta Sekarang
          </button>
          <div className="text-[10px] text-slate-500 font-mono">
            Tautan berlaku selama 48 jam khusus untuk {participant.email}
          </div>
        </div>

        {/* Pickup Notice */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2 text-xs">
          <div className="font-bold text-slate-900 dark:text-white">Panduan Pengambilan Race Pack:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-start gap-2">
              <CalendarIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>H-2 hingga H-1 sebelum lomba (09.00 - 17.00 WIB)</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPinIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Lokasi: {eventConfig.venuePlaceholder}</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 italic pt-1">
            * Wajib menunjukkan kode QR dari dashboard serta identitas diri asli (KTP/SIM/Kartu Pelajar).
          </p>
        </div>

        {/* Email Footer Brand */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>Platform Terintegrasi Cianjur Berlari Season 2</span>
          <a
            href="https://www.creadin.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-emerald-700 transition-colors"
          >
            <img src="/branding/logo-creadin.svg" alt="" className="w-3 h-3 object-contain" />
            <span>Powered by Creadin.co</span>
          </a>
        </div>
      </div>
    </div>
  );
}
