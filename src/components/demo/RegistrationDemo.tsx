"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/state/demoStore";
import confetti from "canvas-confetti";
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  MailIcon,
  UsersIcon,
  CheckIcon,
} from "@/components/ui/Icons";

interface RegistrationDemoProps {
  onGoToDashboard?: () => void;
  onOpenEmailPreview?: () => void;
}

export function RegistrationDemo({
  onGoToDashboard,
  onOpenEmailPreview,
}: RegistrationDemoProps) {
  const { registerParticipant, lastRegisteredParticipant, checkNikAvailability } = useDemoStore();

  const [formData, setFormData] = useState({
    fullName: "Budi Santoso",
    nik: "3203011806950007",
    email: "budi.santoso@example.com",
    phone: "0812-9876-5432",
    category: "10K Open" as "5K Fun Run" | "10K Open" | "21K Half Marathon",
    tshirtSize: "L" as "S" | "M" | "L" | "XL" | "XXL",
    bloodType: "B" as "A" | "B" | "AB" | "O",
    emergencyContactName: "Ratna Sari (Istri)",
    emergencyContactPhone: "0812-1122-3344",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [nikStatus, setNikStatus] = useState<{
    type: "success" | "error" | "idle";
    message: string;
  }>({
    type: "success",
    message: "NIK valid & belum terdaftar (1 tiket teralokasi).",
  });

  const handleNikChange = (rawNik: string) => {
    const clean = rawNik.replace(/\D/g, "").slice(0, 16);
    setFormData((prev) => ({ ...prev, nik: clean }));

    if (clean.length === 0) {
      setNikStatus({
        type: "idle",
        message: "Masukkan 16 digit NIK kependudukan untuk validasi 1 tiket.",
      });
      return;
    }

    if (clean.length < 16) {
      setNikStatus({
        type: "error",
        message: `NIK baru ${clean.length} digit (wajib 16 digit sesuai KTP/KIA).`,
      });
      return;
    }

    const check = checkNikAvailability(clean);
    if (!check.isAvailable && check.existingParticipant) {
      setNikStatus({
        type: "error",
        message: `Perlindungan 1 Tiket 1 NIK: NIK telah terdaftar atas nama ${check.existingParticipant.fullName} (BIB ${check.existingParticipant.bibNumber}). Pendaftaran ganda ditolak sistem.`,
      });
    } else {
      setNikStatus({
        type: "success",
        message: "NIK unik & valid. Kuota 1 tiket siap diamankan.",
      });
    }
  };

  const handleApplyPresetNik = (preset: "valid" | "duplicate") => {
    if (preset === "valid") {
      handleNikChange("3203011806950007");
      setFormData((prev) => ({
        ...prev,
        fullName: "Budi Santoso",
        email: "budi.santoso@example.com",
      }));
    } else {
      handleNikChange("3203011205940001");
      setFormData((prev) => ({
        ...prev,
        fullName: "Rian Hidayat (Upaya Dobel)",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.nik) {
      alert("Mohon lengkapi seluruh kolom formulir.");
      return;
    }

    if (formData.nik.length !== 16) {
      alert("NIK wajib 16 digit numerik sesuai KTP/KIA.");
      return;
    }

    const check = checkNikAvailability(formData.nik);
    if (!check.isAvailable && check.existingParticipant) {
      alert(
        `Aturan 1 Tiket 1 NIK: NIK ${formData.nik} telah terdaftar atas nama ${check.existingParticipant.fullName}. Sistem menolak duplikasi pendaftaran.`
      );
      return;
    }

    try {
      registerParticipant(formData);
      setIsSuccess(true);
      setResendStatus(null);

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#34D399", "#10B981", "#059669"],
        });
      } catch {
        // no-op
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan pendaftaran.";
      alert(msg);
    }
  };

  const handleResendEmail = () => {
    setResendStatus("Email konfirmasi berhasil dikirim ulang ke alamat terdaftar.");
    setTimeout(() => setResendStatus(null), 4000);
  };

  const handleResetForm = () => {
    setIsSuccess(false);
    setResendStatus(null);
  };

  if (isSuccess && lastRegisteredParticipant) {
    return (
      <div className="w-full max-w-2xl mx-auto rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 shadow-2xl space-y-6 text-left">
        {/* Success Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircleIcon className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
              REGISTRATION_SUCCESS
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Pendaftaran Berhasil Diterima
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Silakan cek email Anda untuk akses dashboard peserta. Tautan aktivasi dan
              informasi pengambilan race pack telah dikirimkan secara otomatis.
            </p>
          </div>
        </div>

        {/* Access Information Box */}
        <div className="rounded-2xl p-5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-3 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800/80">
            <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest text-[11px]">
              RINCIAN_AKSES_KEPESERTAAN
            </span>
            <span className="rounded-full px-3 py-0.5 border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 text-[10px] font-mono">
              STATUS: TERVERIFIKASI
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-slate-500 block text-[11px]">Nama Peserta:</span>
              <span className="text-slate-900 dark:text-white font-bold">{lastRegisteredParticipant.fullName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Email Terdaftar:</span>
              <span className="text-slate-900 dark:text-white font-mono">{lastRegisteredParticipant.email}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Nomor BIB Sementara:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold text-sm">
                {lastRegisteredParticipant.bibNumber}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Kategori Lomba:</span>
              <span className="text-slate-900 dark:text-white font-semibold">
                {lastRegisteredParticipant.category}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Validasi Identitas (NIK):</span>
              <span className="text-slate-900 font-mono font-bold flex items-center gap-1.5 text-xs">
                <span>
                  {lastRegisteredParticipant.nik
                    ? `${lastRegisteredParticipant.nik.slice(0, 6)}******${lastRegisteredParticipant.nik.slice(-4)}`
                    : "320301******0007"}
                </span>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  1 NIK = 1 Tiket Terkunci
                </span>
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Ukuran Jersey:</span>
              <span className="text-slate-900 font-medium">{lastRegisteredParticipant.tshirtSize}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Waktu Pendaftaran:</span>
              <span className="text-slate-600 text-[11px]">
                {lastRegisteredParticipant.registrationDate}
              </span>
            </div>
          </div>
        </div>

        {/* Security Notice: 1 Tiket 1 NIK & No plain text password */}
        <div className="rounded-xl p-4 bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <ShieldCheckIcon className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Prinsip Keamanan & Integritas Pendaftaran</span>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed">
            Sistem mengunci NIK kependudukan Anda untuk memastikan <strong>1 NIK hanya berlaku bagi 1 tiket lomba</strong>.
            Akses dashboard dilindungi via email terotentikasi (magic link) tanpa pengiriman kata sandi terbuka.
          </p>
        </div>

        {/* Feedback message for email resend */}
        {resendStatus && (
          <div className="rounded-xl p-3 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs text-center flex items-center justify-center gap-2">
            <CheckIcon className="w-4 h-4" />
            <span>{resendStatus}</span>
          </div>
        )}

        {/* Actions in Pill Form */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleResetForm}
            className="rounded-full px-5 py-2 text-xs border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
          >
            Daftar Peserta Lain
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleResendEmail}
              className="rounded-full px-4 py-2 text-xs border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5"
            >
              <MailIcon className="w-3.5 h-3.5" />
              <span>Kirim Ulang Email</span>
            </button>

            {onOpenEmailPreview && (
              <button
                type="button"
                onClick={onOpenEmailPreview}
                className="rounded-full px-4 py-2 text-xs border border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors font-semibold"
              >
                Lihat Preview Email
              </button>
            )}

            {onGoToDashboard && (
              <button
                type="button"
                onClick={onGoToDashboard}
                className="rounded-full px-6 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                Buka Dashboard Peserta
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 shadow-2xl space-y-6 text-left"
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800/80">
        <div>
          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
            09 / REGISTRATION_SIMULATION
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Formulir Pendaftaran Peserta
          </h3>
        </div>
        <span className="rounded-full px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-emerald-800 dark:text-emerald-400 text-xs font-mono">
          DATA SIMULASI
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
        {/* Nama Lengkap */}
        <div className="space-y-1.5">
          <label htmlFor="reg-name" className="text-slate-700 font-medium">
            Nama Lengkap (Sesuai KTP) <span className="text-rose-500">*</span>
          </label>
          <input
            id="reg-name"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="Contoh: Budi Santoso"
          />
        </div>

        {/* NIK Input with 1 Tiket 1 NIK Protection */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="reg-nik" className="text-slate-700 font-medium">
              NIK (KTP / KIA 16 Digit) <span className="text-rose-500">*</span>
            </label>
            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
              1 TIKET 1 NIK
            </span>
          </div>
          <input
            id="reg-nik"
            type="text"
            required
            maxLength={16}
            value={formData.nik}
            onChange={(e) => handleNikChange(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 border font-mono transition-colors focus:outline-none ${
              nikStatus.type === "error"
                ? "border-rose-400 text-rose-900 focus:border-rose-500 bg-rose-50/30"
                : "border-slate-300 text-slate-900 focus:border-emerald-500"
            }`}
            placeholder="320301xxxxxxxxxx"
          />
          <div className="flex items-center justify-between text-[11px] pt-0.5">
            <span
              className={`font-medium ${
                nikStatus.type === "error"
                  ? "text-rose-600 font-semibold"
                  : nikStatus.type === "success"
                  ? "text-emerald-700 font-medium"
                  : "text-slate-500"
              }`}
            >
              {nikStatus.message}
            </span>
            <span className="text-slate-400 font-mono text-[10px]">
              {formData.nik.length}/16 Digit
            </span>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="reg-email" className="text-slate-700 font-medium">
            Alamat Email Aktif <span className="text-rose-500">*</span>
          </label>
          <input
            id="reg-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="nama@email.com"
          />
        </div>

        {/* No WhatsApp */}
        <div className="space-y-1.5">
          <label htmlFor="reg-phone" className="text-slate-700 font-medium">
            Nomor WhatsApp / Ponsel <span className="text-rose-500">*</span>
          </label>
          <input
            id="reg-phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="0812-xxxx-xxxx"
          />
        </div>

        {/* Kategori Lomba */}
        <div className="space-y-1.5">
          <label htmlFor="reg-cat" className="text-slate-700 dark:text-slate-300 font-medium">
            Kategori Lomba <span className="text-rose-500">*</span>
          </label>
          <select
            id="reg-cat"
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value as "5K Fun Run" | "10K Open" | "21K Half Marathon",
              })
            }
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-emerald-800 dark:text-emerald-400 font-semibold focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="5K Fun Run">5K Fun Run (Rekreasi / Pelajar)</option>
            <option value="10K Open">10K Open (Komunitas & Umum)</option>
            <option value="21K Half Marathon">21K Half Marathon (Prestasi)</option>
          </select>
        </div>

        {/* Ukuran Jersey */}
        <div className="space-y-1.5">
          <label htmlFor="reg-size" className="text-slate-700 dark:text-slate-300 font-medium">
            Ukuran Jersey Resmi
          </label>
          <select
            id="reg-size"
            value={formData.tshirtSize}
            onChange={(e) =>
              setFormData({
                ...formData,
                tshirtSize: e.target.value as "S" | "M" | "L" | "XL" | "XXL",
              })
            }
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="S">S (Small)</option>
            <option value="M">M (Medium)</option>
            <option value="L">L (Large)</option>
            <option value="XL">XL (Extra Large)</option>
            <option value="XXL">XXL (Double Extra Large)</option>
          </select>
        </div>

        {/* Golongan Darah */}
        <div className="space-y-1.5">
          <label htmlFor="reg-blood" className="text-slate-700 dark:text-slate-300 font-medium">
            Golongan Darah (Untuk Medis)
          </label>
          <select
            id="reg-blood"
            value={formData.bloodType}
            onChange={(e) =>
              setFormData({
                ...formData,
                bloodType: e.target.value as "A" | "B" | "AB" | "O",
              })
            }
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </select>
        </div>

        {/* Kontak Darurat Nama */}
        <div className="space-y-1.5">
          <label htmlFor="reg-emer-name" className="text-slate-700 dark:text-slate-300 font-medium">
            Nama Kontak Darurat
          </label>
          <input
            id="reg-emer-name"
            type="text"
            value={formData.emergencyContactName}
            onChange={(e) =>
              setFormData({ ...formData, emergencyContactName: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="Nama & hubungan"
          />
        </div>

        {/* Kontak Darurat Telepon */}
        <div className="space-y-1.5">
          <label htmlFor="reg-emer-phone" className="text-slate-700 dark:text-slate-300 font-medium">
            Nomor Telepon Darurat
          </label>
          <input
            id="reg-emer-phone"
            type="tel"
            value={formData.emergencyContactPhone}
            onChange={(e) =>
              setFormData({ ...formData, emergencyContactPhone: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="0812-xxxx-xxxx"
          />
        </div>
      </div>

      {/* 1 Tiket 1 NIK Tester Preset for Presenter */}
      <div className="rounded-xl p-4 bg-slate-50 border border-slate-200 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-900">Uji Langsung Validasi 1 Tiket 1 NIK:</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase">Preset Demo Presenter</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => handleApplyPresetNik("valid")}
            className="rounded-full px-3.5 py-1 text-xs border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-mono transition-colors font-medium shadow-xs"
          >
            Skenario A: NIK Baru Valid (Budi Santoso)
          </button>
          <button
            type="button"
            onClick={() => handleApplyPresetNik("duplicate")}
            className="rounded-full px-3.5 py-1 text-xs border border-rose-300 bg-rose-50 text-rose-800 hover:bg-rose-100 font-mono transition-colors font-medium shadow-xs"
          >
            Skenario B: Simulasi NIK Dobel (Rian Hidayat)
          </button>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Aturan ketat panitia: setiap 1 NIK hanya dapat mendaftar 1 kali. Jika ada peserta mencoba mendaftar ulang
          dengan NIK yang sama, sistem langsung memblokir pendaftaran demi transparansi dan keadilan kuota.
        </p>
      </div>

      <div className="rounded-xl p-4 bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
        <ShieldCheckIcon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <p className="text-xs leading-relaxed">
          Simulasi lokal: data yang Anda masukkan tidak disimpan ke server luar atau
          pangkalan data produksi. Data hanya tersimpan di memori peramban Anda untuk demo.
        </p>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-slate-500 font-mono">
          VALIDASI INSTAN CLIENT-SIDE
        </span>
        <button
          type="submit"
          disabled={nikStatus.type === "error"}
          className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all flex items-center gap-2 ${
            nikStatus.type === "error"
              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
          }`}
        >
          <span>Kirim Pendaftaran (Demo)</span>
        </button>
      </div>
    </form>
  );
}
