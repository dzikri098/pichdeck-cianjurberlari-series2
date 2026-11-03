"use client";

import React, { useState } from "react";
import { useDemoStore } from "@/state/demoStore";
import { Participant } from "@/data/participants";
import confetti from "canvas-confetti";
import {
  QrCodeIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  WarningTriangleIcon,
  CameraIcon,
  RefreshCwIcon,
  CheckIcon,
  UsersIcon,
} from "@/components/ui/Icons";

interface QRScannerDemoProps {
  initialToken?: string;
  onGoToParticipant?: () => void;
  onGoToAdmin?: () => void;
}

type ScannerStep = "IDLE" | "RESULT";

export function QRScannerDemo({
  initialToken,
  onGoToParticipant,
  onGoToAdmin,
}: QRScannerDemoProps) {
  const {
    participants,
    lookupParticipantByToken,
    claimRacePack,
    lastRegisteredParticipant,
    resetDemo,
  } = useDemoStore();

  const [inputToken, setInputToken] = useState(initialToken || "CB2-QR-5K-0104");
  const [step, setStep] = useState<ScannerStep>("IDLE");
  const [scannedParticipant, setScannedParticipant] = useState<Participant | null>(null);
  const [isInvalidToken, setIsInvalidToken] = useState(false);
  const [officerName, setOfficerName] = useState("Petugas Meja 2 (Fahmi)");
  const [proofImage, setProofImage] = useState<string | null>(null);
  const [confirmationNotice, setConfirmationNotice] = useState<string | null>(null);

  // Quick select presets
  const handleSelectPreset = (token: string) => {
    setInputToken(token);
    setStep("IDLE");
    setProofImage(null);
    setConfirmationNotice(null);
    setIsInvalidToken(false);
  };

  const handleScan = (tokenToScan?: string) => {
    const token = tokenToScan || inputToken;
    setConfirmationNotice(null);
    const found = lookupParticipantByToken(token);

    if (!found) {
      setIsInvalidToken(true);
      setScannedParticipant(null);
      setStep("RESULT");
      return;
    }

    setIsInvalidToken(false);
    setScannedParticipant(found);
    setStep("RESULT");

    // If already claimed, load its proof
    if (found.racePackStatus === "CLAIMED") {
      setProofImage(found.proofImagePreview || "/mockups/proof-sample.svg");
    } else {
      setProofImage(null);
    }
  };

  const handleUseSamplePhoto = () => {
    const sampleSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%230B0F19"/><circle cx="200" cy="110" r="45" fill="%2334D399" opacity="0.3"/><circle cx="200" cy="100" r="35" fill="%2334D399"/><path d="M120 250 c0 -45 35 -70 80 -70 c45 0 80 25 80 70 Z" fill="%231E293B"/><rect x="140" y="180" width="120" height="90" rx="8" fill="%2334D399"/><text x="200" y="225" font-family="sans-serif" font-weight="bold" font-size="14" fill="%230B0F19" text-anchor="middle">RACE PACK S2</text><text x="200" y="245" font-family="monospace" font-size="11" fill="%230B0F19" text-anchor="middle">BIB: ${scannedParticipant?.bibNumber || "5104"}</text><text x="200" y="285" font-family="sans-serif" font-size="11" fill="%2394A3B8" text-anchor="middle">DOKUMENTASI PENYERAHAN RESMI</text></svg>`;
    setProofImage(sampleSvg);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProofImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmClaim = () => {
    if (!scannedParticipant) return;
    if (!proofImage) {
      alert("Harap lampirkan foto bukti penerimaan terlebih dahulu.");
      return;
    }

    const res = claimRacePack(
      scannedParticipant.qrToken,
      officerName,
      proofImage
    );

    if (res.success && res.participant) {
      setScannedParticipant(res.participant);
      setConfirmationNotice(
        `Berhasil! Race pack telah diserahkan dan status peserta telah diperbarui ke sistem.`
      );

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#34D399", "#10B981", "#059669"],
        });
      } catch {
        // no-op
      }
    } else {
      alert(res.message);
    }
  };

  const handleResetScanner = () => {
    setStep("IDLE");
    setScannedParticipant(null);
    setIsInvalidToken(false);
    setProofImage(null);
    setConfirmationNotice(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-left">
      {/* Quick Presets Bar for Presenter in Dark Tech Pill Format */}
      <div className="rounded-2xl p-5 md:p-6 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 space-y-3 text-xs transition-colors">
        <div className="flex items-center justify-between">
          <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
            <QrCodeIcon className="w-4 h-4" />
            <span>PINTASAN_SKENARIO_UJI_COBA</span>
          </span>
          <button
            type="button"
            onClick={resetDemo}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 font-mono text-xs"
            title="Reset semua data demo"
          >
            <RefreshCwIcon className="w-3.5 h-3.5" />
            <span>RESET DEMO</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => handleSelectPreset("CB2-QR-5K-0104")}
            className={`rounded-full px-4 py-1.5 text-xs font-mono transition-all border ${
              inputToken === "CB2-QR-5K-0104"
                ? "border-emerald-500/50 bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 font-bold shadow-sm"
                : "border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-700"
            }`}
          >
            1. Belum Diambil (Rian Hidayat - 5K)
          </button>

          <button
            type="button"
            onClick={() => handleSelectPreset("CB2-QR-10K-0042")}
            className={`rounded-full px-4 py-1.5 text-xs font-mono transition-all border ${
              inputToken === "CB2-QR-10K-0042"
                ? "border-amber-500/50 bg-amber-50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold shadow-sm"
                : "border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-700"
            }`}
          >
            2. Scan Ulang / Sudah Diambil (Nadia Safitri - 10K)
          </button>

          <button
            type="button"
            onClick={() => handleSelectPreset("CB2-QR-INVALID-999")}
            className={`rounded-full px-4 py-1.5 text-xs font-mono transition-all border ${
              inputToken === "CB2-QR-INVALID-999"
                ? "border-rose-500/50 bg-rose-50 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 font-bold shadow-sm"
                : "border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-700"
            }`}
          >
            3. QR Tidak Valid (Simulasi Error)
          </button>

          {lastRegisteredParticipant && (
            <button
              type="button"
              onClick={() => handleSelectPreset(lastRegisteredParticipant.qrToken)}
              className="rounded-full px-4 py-1.5 text-xs font-mono border border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 font-bold"
            >
              Peserta Baru ({lastRegisteredParticipant.fullName})
            </button>
          )}
        </div>
      </div>

      {/* Main Scanner Workbench Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Side: Scanner Device Viewfinder */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="w-full rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 shadow-2xl space-y-4 text-center transition-colors">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-700 dark:text-emerald-400 text-[11px] tracking-wider uppercase font-semibold">
                POSKO_LOGISTIK_SCANNER
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
            </div>

            {/* Viewfinder Graphic */}
            <div className="relative mx-auto w-full aspect-square max-w-[260px] rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col items-center justify-center p-4 transition-colors">
              {/* Corner crosshairs in emerald */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-emerald-500 dark:border-emerald-400" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-emerald-500 dark:border-emerald-400" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-emerald-500 dark:border-emerald-400" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-emerald-500 dark:border-emerald-400" />

              {/* Laser scanning line */}
              <div className="w-full h-0.5 bg-emerald-500/80 dark:bg-emerald-400/80 shadow-[0_0_10px_rgba(16,185,129,0.8)] absolute top-1/2 -translate-y-1/2" />

              <div className="space-y-2 z-10">
                <CameraIcon className="w-10 h-10 text-emerald-600 dark:text-emerald-400/80 mx-auto" />
                <span className="text-xs text-slate-600 dark:text-slate-400 font-mono block">
                  SENSOR OPTIK AKTIF
                </span>
              </div>
            </div>

            {/* Token Input Field & Trigger */}
            <div className="space-y-2 text-xs text-left">
              <label htmlFor="token-input" className="text-slate-600 dark:text-slate-400 block text-[11px] font-mono">
                TOKEN_TERDETEKSI:
              </label>
              <div className="flex gap-2">
                <input
                  id="token-input"
                  type="text"
                  value={inputToken}
                  onChange={(e) => setInputToken(e.target.value)}
                  placeholder="CB2-QR-..."
                  className="flex-1 px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => handleScan()}
                  className="rounded-full px-5 py-2 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all shrink-0"
                >
                  Scan
                </button>
              </div>
            </div>

            {/* Operator Identifier */}
            <div className="rounded-xl p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 text-left flex justify-between items-center font-mono">
              <span>OPERATOR:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold font-sans">
                {officerName}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Verification, Proof, and Confirmation Panels */}
        <div className="md:col-span-7 space-y-4">
          {step === "IDLE" && (
            <div className="h-full min-h-[360px] rounded-2xl p-8 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 flex flex-col items-center justify-center text-center space-y-4 shadow-xl transition-colors">
              <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <QrCodeIcon className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Siap Memindai Kode Peserta
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
                Pilih salah satu tombol pintasan di bagian atas atau klik tombol{" "}
                <strong className="text-emerald-700 dark:text-emerald-400">Scan</strong> untuk mensimulasikan
                tahapan verifikasi fisik di posko penyerahan perlengkapan lomba.
              </p>
            </div>
          )}

          {step === "RESULT" && isInvalidToken && (
            <div className="rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-rose-300 dark:border-rose-500/40 bg-white/95 dark:bg-[#111827]/80 shadow-2xl space-y-5 text-left transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <AlertCircleIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-rose-600 dark:text-rose-400 tracking-widest uppercase font-semibold">
                    ERROR_TOKEN_NOT_FOUND
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                    Kode Tidak Ditemukan
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Token <span className="font-mono text-slate-900 dark:text-white font-bold">{inputToken}</span> tidak
                    terdaftar pada basis data peserta resmi Cianjur Berlari S2.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl p-5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 text-xs space-y-2">
                <div className="font-bold text-slate-900 dark:text-white font-mono uppercase text-[11px]">
                  SOP PANITIA UNTUK KODE TIDAK COCOK:
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 text-xs">
                  <li>Minta peserta membuka ulang email konfirmasi resmi dari ponsel.</li>
                  <li>Pastikan kecerahan layar ponsel peserta disetel maksimal.</li>
                  <li>Lakukan pengecekan manual nama peserta pada Dashboard Admin.</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={handleResetScanner}
                className="rounded-full px-5 py-2 text-xs border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-colors"
              >
                Kembali ke Scanner
              </button>
            </div>
          )}

          {step === "RESULT" && scannedParticipant && (
            <div className="rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 shadow-2xl space-y-5 text-left transition-colors">
              {/* Status Header Banner */}
              {scannedParticipant.racePackStatus === "CLAIMED" ? (
                <div className="rounded-xl p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-start gap-3">
                  <WarningTriangleIcon className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-amber-800 dark:text-amber-300 font-mono uppercase tracking-wider">
                      PERINGATAN : RACE PACK SUDAH PERNAH DIAMBIL
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mt-0.5">
                      Sistem mengunci status untuk mencegah klaim ganda.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 font-mono uppercase tracking-wider">
                      PESERTA VALID & BELUM DIAMBIL
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                      Cocokkan identitas fisik pelari sebelum menyerahkan paket.
                    </div>
                  </div>
                </div>
              )}

              {/* Participant Details Box */}
              <div className="rounded-2xl p-5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-3 text-xs">
                <div className="flex justify-between items-start pb-3 border-b border-slate-200 dark:border-slate-800/80">
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-emerald-700 dark:text-emerald-400 tracking-widest">
                      IDENTITAS PELARI
                    </span>
                    <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      {scannedParticipant.fullName}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block font-mono">NOMOR BIB:</span>
                    <span className="text-2xl font-black font-mono text-emerald-700 dark:text-emerald-400">
                      {scannedParticipant.bibNumber}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">Kategori: </span>
                    <span className="text-slate-900 dark:text-white font-bold">
                      {scannedParticipant.category}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Ukuran Jersey: </span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                      {scannedParticipant.tshirtSize}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Gol. Darah: </span>
                    <span className="text-slate-900 dark:text-white">{scannedParticipant.bloodType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Kontak: </span>
                    <span className="text-slate-900 dark:text-white">{scannedParticipant.phone}</span>
                  </div>
                </div>
              </div>

              {/* Photo Proof Section */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white font-mono uppercase text-[11px] tracking-wider">
                    DOKUMENTASI FOTO BUKTI:
                  </span>
                  {scannedParticipant.racePackStatus !== "CLAIMED" && (
                    <button
                      type="button"
                      onClick={handleUseSamplePhoto}
                      className="text-emerald-700 dark:text-emerald-400 hover:underline text-xs font-mono"
                    >
                      Gunakan Foto Contoh Panitia
                    </button>
                  )}
                </div>

                {proofImage ? (
                  <div className="relative rounded-2xl overflow-hidden border border-emerald-300 dark:border-emerald-500/40 bg-slate-50 dark:bg-slate-950 p-3 flex flex-col items-center">
                    <img
                      src={proofImage}
                      alt="Bukti Dokumentasi"
                      className="max-h-40 w-auto rounded-xl object-contain"
                    />
                    <span className="text-xs text-emerald-800 dark:text-emerald-400 font-mono mt-2 flex items-center gap-1.5 font-semibold">
                      <CheckIcon className="w-3.5 h-3.5" />
                      <span>BUKTI FOTO TERLAMPIR & SIAP DIVERIFIKASI</span>
                    </span>
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-center space-y-3">
                    <CameraIcon className="w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto" />
                    <div className="text-slate-600 dark:text-slate-400 text-xs">
                      Ambil foto penerima memegang perlengkapan lomba (BIB & Jersey)
                    </div>
                    <label className="inline-block rounded-full px-5 py-2 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-emerald-800 dark:text-emerald-400 border border-slate-300 dark:border-slate-700 cursor-pointer text-xs font-mono transition-colors">
                      <span>PILIH FILE FOTO LOKAL</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Prior Claim Audit Log (If already claimed) */}
              {scannedParticipant.racePackStatus === "CLAIMED" && (
                <div className="rounded-2xl p-4 bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800/80 space-y-2 text-xs">
                  <div className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-xs uppercase tracking-wider">
                    REKAM JEJAK PENYERAHAN SEBELUMNYA
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 text-xs space-y-1">
                    <div>
                      Waktu Penyerahan:{" "}
                      <span className="text-slate-900 dark:text-white font-mono font-semibold">
                        {scannedParticipant.claimedAt || "24 Oktober 2026, 10:14 WIB"}
                      </span>
                    </div>
                    <div>
                      Petugas Meja:{" "}
                      <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                        {scannedParticipant.claimedBy || "Petugas Meja 3"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Message */}
              {confirmationNotice && (
                <div className="rounded-xl p-3.5 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 shrink-0" />
                  <span>{confirmationNotice}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetScanner}
                  className="rounded-full px-5 py-2 text-xs border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Scan Peserta Lain
                </button>

                {scannedParticipant.racePackStatus === "UNCLAIMED" ? (
                  <button
                    type="button"
                    disabled={!proofImage}
                    onClick={handleConfirmClaim}
                    className={`rounded-full px-6 py-2.5 text-xs font-bold transition-all shadow-lg ${
                      proofImage
                        ? "bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-50"
                    }`}
                  >
                    Konfirmasi Penyerahan Race Pack
                  </button>
                ) : (
                  <div className="text-xs text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1.5 font-mono">
                    <CheckIcon className="w-4 h-4" />
                    <span>STATUS : KLAIM TERKUNCI (SUDAH DIAMBIL)</span>
                  </div>
                )}
              </div>

              {/* Quick Jump Links */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-mono">
                <span>VERIFIKASI_SINKRONISASI:</span>
                <div className="flex items-center gap-4">
                  {onGoToParticipant && (
                    <button
                      type="button"
                      onClick={onGoToParticipant}
                      className="text-emerald-700 dark:text-emerald-400 hover:underline text-xs"
                    >
                      Buka Dashboard Peserta
                    </button>
                  )}
                  {onGoToAdmin && (
                    <button
                      type="button"
                      onClick={onGoToAdmin}
                      className="text-emerald-700 dark:text-emerald-400 hover:underline text-xs"
                    >
                      Buka Dashboard Admin (KPI)
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
