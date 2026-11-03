"use client";

import React, { useState } from "react";
import { SceneItem } from "@/content/scenes";
import { eventConfig } from "@/content/eventConfig";
import { MockupFrame } from "@/components/mockups/MockupFrame";
import { RegistrationDemo } from "@/components/demo/RegistrationDemo";
import { EmailPreviewDemo } from "@/components/demo/EmailPreviewDemo";
import { ParticipantDashboardDemo } from "@/components/dashboards/ParticipantDashboardDemo";
import { AdminDashboardDemo } from "@/components/dashboards/AdminDashboardDemo";
import { QRScannerDemo } from "@/components/demo/QRScannerDemo";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { JourneyFlow } from "@/components/diagrams/JourneyFlow";
import { mockupRegistry, mediaMockupKeys } from "@/content/mockups";
import {
  RunnerIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  WarningTriangleIcon,
  UsersIcon,
  CalendarIcon,
  MapPinIcon,
  QrCodeIcon,
  CameraIcon,
  MailIcon,
  ChevronRightIcon,
  CheckIcon,
} from "@/components/ui/Icons";

interface SceneContentProps {
  scene: SceneItem;
  isExploreMode?: boolean;
  onNavigateToScene: (sceneId: string) => void;
  scannerTokenTarget?: string;
}

export function SceneContent({
  scene,
  isExploreMode = false,
  onNavigateToScene,
  scannerTokenTarget,
}: SceneContentProps) {
  switch (scene.id) {
    case "opening":
      return (
        <SceneOpening
          onStart={() => onNavigateToScene("vision")}
          onExploreDemo={() => onNavigateToScene("registration")}
        />
      );
    case "vision":
      return <SceneVision onNext={() => onNavigateToScene("challenge")} />;
    case "challenge":
      return <SceneChallenge onNext={() => onNavigateToScene("solution")} />;
    case "solution":
      return <SceneSolution onNext={() => onNavigateToScene("journey")} />;
    case "journey":
      return <JourneyFlow />;
    case "architecture":
      return <ArchitectureDiagram />;
    case "landing":
      return (
        <SceneLandingMockup
          isExploreMode={isExploreMode}
          onNext={() => onNavigateToScene("landing-anatomy")}
        />
      );
    case "landing-anatomy":
      return <SceneLandingAnatomy onNext={() => onNavigateToScene("registration")} />;
    case "registration":
      return (
        <RegistrationDemo
          onGoToDashboard={() => onNavigateToScene("participant")}
          onOpenEmailPreview={() => onNavigateToScene("access")}
        />
      );
    case "access":
      return (
        <EmailPreviewDemo
          onGoToDashboard={() => onNavigateToScene("participant")}
        />
      );
    case "participant":
      return (
        <ParticipantDashboardDemo
          onGoToScanner={(token) => {
            onNavigateToScene("pickup");
          }}
        />
      );
    case "participant-qr":
      return <SceneParticipantQr onTestScanner={() => onNavigateToScene("pickup")} />;
    case "admin":
      return (
        <AdminDashboardDemo
          onGoToScanner={(token) => {
            onNavigateToScene("pickup");
          }}
        />
      );
    case "analytics":
      return (
        <div className="space-y-4">
          <MockupFrame slotId="admin-analytics" isExploreMode={isExploreMode} />
          {!isExploreMode && (
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => onNavigateToScene("pickup")}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-mono font-semibold bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 transition-colors shadow-xs"
              >
                <span>Lanjut ke Demo Scan Pickup</span>
                <ChevronRightIcon className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          )}
        </div>
      );
    case "pickup":
      return (
        <QRScannerDemo
          initialToken={scannerTokenTarget || "CB2-QR-5K-0104"}
          onGoToParticipant={() => onNavigateToScene("participant")}
          onGoToAdmin={() => onNavigateToScene("admin")}
        />
      );
    case "duplicate":
      return (
        <div className="space-y-6">
          <QRScannerDemo
            initialToken="CB2-QR-10K-0042"
            onGoToParticipant={() => onNavigateToScene("participant")}
            onGoToAdmin={() => onNavigateToScene("admin")}
          />
        </div>
      );
    case "security":
      return <SceneSecurity onNext={() => onNavigateToScene("roadmap")} />;
    case "roadmap":
      return <SceneRoadmap onNext={() => onNavigateToScene("closing")} />;
    case "closing":
      return <SceneClosing />;
    case "appendix":
      return <SceneAppendix isExploreMode={isExploreMode} />;
    default:
      return (
        <div className="p-8 text-center text-slate-500">
          Konten scene sedang disiapkan.
        </div>
      );
  }
}

/* Scene 01: Cover */
function SceneOpening({
  onStart,
  onExploreDemo,
}: {
  onStart: () => void;
  onExploreDemo: () => void;
}) {
  return (
    <div className="w-full text-center space-y-8 py-8">
      {/* Official Partner & Event Logos */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pb-1">
        <img
          src="/branding/logo-koni-cianjurberlari.png"
          alt="KONI Cianjur Berlari"
          className="h-12 sm:h-14 w-auto object-contain"
        />
        <div className="h-6 w-px bg-slate-300 hidden sm:block" />
        <a
          href="https://www.creadin.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-xs group"
          title="Creative Digital Innovation (Creadin.co)"
        >
          <img
            src="/branding/logo-creadin.svg"
            alt="Creadin.co"
            className="w-5 h-5 object-contain"
          />
          <div className="text-left text-xs font-mono">
            <span className="text-[9px] text-slate-500 block leading-none">DIGITAL PARTNER</span>
            <span className="font-bold text-slate-900 group-hover:text-emerald-700 leading-tight">Creadin.co ↗</span>
          </div>
        </a>
      </div>

      {/* Central Tech Badge */}
      <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 text-xs font-mono tracking-widest uppercase">
        <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
        <span>KONI KABUPATEN CIANJUR : BUPATI SERIES 2026</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
          Cianjur Berlari Bupati Series 2
        </h1>

        <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-medium">
          One Integrated Digital Race Platform Architecture
        </p>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Arsitektur terpadu yang menghubungkan halaman publik, registrasi tervalidasi,
          portal peserta dengan paspor QR, serta operasional posko penyerahan race pack bebas antrean.
        </p>
      </div>

      {/* 3 Pillars Grid Component */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4 text-left">
        <div className="rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-[#111827]/80 shadow-sm dark:shadow-none space-y-2">
          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest block uppercase font-semibold">
            01 / PUBLIC EXPERIENCE
          </span>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Portal Informasi & Registrasi</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Landing page modern dengan alur pemilihan kategori 5K, 10K, dan 21K yang tervalidasi instan.
          </p>
        </div>

        <div className="rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-[#111827]/80 shadow-sm dark:shadow-none space-y-2">
          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest block uppercase font-semibold">
            02 / PARTICIPANT PORTAL
          </span>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Dashboard & Paspor QR</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Akses aman via email terverifikasi untuk melihat nomor BIB, jadwal acara, dan kode QR unik.
          </p>
        </div>

        <div className="rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-[#111827]/80 shadow-sm dark:shadow-none space-y-2">
          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest block uppercase font-semibold">
            03 / FIELD OPERATIONS
          </span>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Scanner & Kunci Atomik</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Verifikasi fisik di meja posko dengan dokumentasi foto bukti dan pencegahan klaim ganda otomatis.
          </p>
        </div>
      </div>

      {/* Pill Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          type="button"
          onClick={onStart}
          className="rounded-full px-6 py-2.5 text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2"
        >
          <span>Mulai Presentasi</span>
          <ChevronRightIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onExploreDemo}
          className="rounded-full px-5 py-2.5 text-sm border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          Uji Coba Demo Langsung
        </button>
      </div>

      {/* Creator Attribution */}
      <div className="pt-2">
        <a
          href="https://www.creadin.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs border border-slate-200 bg-white hover:border-emerald-300 hover:text-emerald-800 text-slate-600 transition-all shadow-xs group"
        >
          <img src="/branding/logo-creadin.svg" alt="Creadin" className="w-3.5 h-3.5 object-contain" />
          <span className="text-slate-500">Dikonsep & Dikelola oleh</span>
          <span className="font-bold text-slate-900 group-hover:text-emerald-700 underline decoration-emerald-500 underline-offset-2">
            Creative Digital Innovation (Creadin.co)
          </span>
          <span className="text-emerald-600 font-semibold">↗</span>
        </a>
      </div>
    </div>
  );
}

/* Scene 02: Vision */
function SceneVision({ onNext }: { onNext: () => void }) {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Before Card */}
        <div className="rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-[#111827]/80 space-y-4">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-mono tracking-widest uppercase font-semibold">
            <AlertCircleIcon className="w-4 h-4" />
            <span>01 / POLA TERPISAH KONVENSIONAL</span>
          </div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">
            Touchpoint Terfragmentasi
          </h4>
          <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold shrink-0">✕</span>
              <span>Formulir online generik tanpa integrasi langsung ke posko logistik lomba.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold shrink-0">✕</span>
              <span>Peserta bingung memeriksa nomor BIB dan status konfirmasi pendaftaran.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold shrink-0">✕</span>
              <span>Pengambilan race pack menggunakan berkas manual yang rawan klaim ganda.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold shrink-0">✕</span>
              <span>Panitia tidak dapat memantau keterisian kuota kategori secara akurat.</span>
            </li>
          </ul>
        </div>

        {/* After Card */}
        <div className="rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50/40 dark:bg-[#111827]/90 space-y-4 shadow-sm dark:shadow-xl">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-mono tracking-widest uppercase font-semibold">
            <CheckCircleIcon className="w-4 h-4" />
            <span>02 / EKOSISTEM TERPADU S2</span>
          </div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">
            Satu Siklus Terhubung Penuh
          </h4>
          <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-200">
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">✓</span>
              <span>Landing page modern yang mencerminkan martabat olahraga Kabupaten Cianjur.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">✓</span>
              <span>Akses dashboard mandiri via email terotentikasi tanpa kata sandi terbuka.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">✓</span>
              <span>QR Code unik sebagai paspor pengambilan dengan validasi foto bukti fisik.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">✓</span>
              <span>Admin command center dengan monitoring kuota dan deteksi instan klaim ganda.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onNext}
          className="rounded-full px-5 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-colors flex items-center gap-2"
        >
          <span>Lanjut ke Analisis Tantangan</span>
          <ChevronRightIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </button>
      </div>
    </div>
  );
}

/* Scene 03: Challenge */
function SceneChallenge({ onNext }: { onNext: () => void }) {
  const challenges = [
    {
      num: "01",
      title: "Risiko Calo Kuota & Pendaftaran Dobel",
      desc: "Antusiasme pelari yang tinggi berisiko memicu praktik calo, pendaftaran akun ganda, atau penimbunan kuota jika sistem tidak menerapkan proteksi ketat 1 Tiket 1 NIK kependudukan.",
      impact: "Risiko: Kuota habis tidak merata, calon peserta asli kecewa, dan komplain massal kepada panitia.",
    },
    {
      num: "02",
      title: "Kepastian Informasi & Notifikasi Akses",
      desc: "Banyak pelari merasa ragu apakah pendaftarannya sah jika tidak segera menerima tanda bukti yang jelas dan akses melihat nomor BIB pribadinya.",
      impact: "Risiko: Kanal WhatsApp panitia dibanjiri ribuan pertanyaan berulang yang menyita waktu.",
    },
    {
      num: "03",
      title: "Penumpukan Antrean & Kerawanan Klaim Ganda",
      desc: "Distribusi perlengkapan lomba di venue sering diwarnai antrean panjang, kesulitan pencocokan berkas KTP, dan celah pengambilan lebih dari satu kali oleh perwakilan.",
      impact: "Risiko: Paket tertukar, perselisihan di meja penyerahan, dan kerugian logistik.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map((c, idx) => (
          <div
            key={idx}
            className="rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-[#111827]/80 space-y-3"
          >
            <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest block uppercase font-semibold">
              {c.num} / OPERATIONAL_RISK
            </span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">{c.title}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{c.desc}</p>
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 text-[11px] text-amber-700 dark:text-amber-300 font-medium">
              {c.impact}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onNext}
          className="rounded-full px-5 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-colors flex items-center gap-2"
        >
          <span>Buka Solusi 3 Pilar</span>
          <ChevronRightIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </button>
      </div>
    </div>
  );
}

/* Scene 04: Solution 3 Pillars */
function SceneSolution({ onNext }: { onNext: () => void }) {
  const pillars = [
    {
      num: "01",
      title: "Public Experience",
      tagline: "Kesan Pertama & Konversi Tertib",
      points: [
        "Landing page sinematik yang memvisualisasikan keindahan Cianjur.",
        "Informasi rute, kategori, rundown, dan FAQ tersaji transparan.",
        "Proteksi 1 Tiket 1 NIK untuk cegah calo dan memastikan keadilan kuota.",
        "Formulir registrasi multi-step ramah ponsel dengan validasi data instan.",
      ],
    },
    {
      num: "02",
      title: "Participant Portal",
      tagline: "Akses Mandiri & Identitas QR",
      points: [
        "Email konfirmasi transaksional otomatis dengan tautan masuk aman.",
        "Dashboard pribadi untuk memeriksa nomor BIB dan jadwal lomba.",
        "QR Code unik sebagai paspor digital pengambilan race pack.",
      ],
    },
    {
      num: "03",
      title: "Admin Operations",
      tagline: "Kendali Penuh & Penguncian Atomik",
      points: [
        "Command center untuk memantau kapasitas kuota secara real-time.",
        "Scanner meja panitia dengan perekaman foto bukti penyerahan fisik.",
        "Sistem kunci anti double-claim yang menolak scan ulang otomatis.",
      ],
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p, idx) => (
          <div
            key={idx}
            className="rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-[#111827]/80 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
                {p.num} / PILLAR_CORE
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">{p.title}</h4>
              <div className="text-xs text-slate-500 mt-0.5 font-mono">{p.tagline}</div>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 pt-1">
              {p.points.map((pt, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onNext}
          className="rounded-full px-5 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-colors flex items-center gap-2"
        >
          <span>Lihat Visualisasi Alur Lengkap</span>
          <ChevronRightIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </button>
      </div>
    </div>
  );
}

/* Scene 07: Landing Mockup */
function SceneLandingMockup({
  isExploreMode,
  onNext,
}: {
  isExploreMode?: boolean;
  onNext?: () => void;
}) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [customImage, setCustomImage] = useState<string | null>(null);

  const slotId = device === "desktop" ? "landing-desktop" : "landing-mobile";

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 text-left">
      {/* Device Switcher Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
        <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
          07 / MOCKUP_LANDING_PAGE
        </span>
        <div className="flex items-center rounded-full p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono">
          <button
            type="button"
            onClick={() => {
              setDevice("desktop");
              setCustomImage(null);
            }}
            className={`rounded-full px-4 py-1.5 transition-all ${
              device === "desktop"
                ? "bg-emerald-600 text-white font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Desktop (16:9)
          </button>
          <button
            type="button"
            onClick={() => {
              setDevice("mobile");
              setCustomImage(null);
            }}
            className={`rounded-full px-4 py-1.5 transition-all ${
              device === "mobile"
                ? "bg-emerald-600 text-white font-bold shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Smartphone (9:19.5)
          </button>
        </div>
      </div>

      {/* Frame Prepared for Photo Mockup */}
      <MockupFrame
        slotId={slotId}
        isExploreMode={isExploreMode}
        placeholderOnly={true}
        customImage={customImage}
        onImageChange={setCustomImage}
      />

      {onNext && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onNext}
            className="rounded-full px-5 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-colors flex items-center gap-2"
          >
            <span>Lihat Anatomi Struktur Halaman</span>
            <ChevronRightIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </button>
        </div>
      )}
    </div>
  );
}

/* Scene 08: Landing Anatomy */
function SceneLandingAnatomy({ onNext }: { onNext: () => void }) {
  const [activeTab, setActiveTab] = useState(0);

  const sections = [
    {
      num: "01",
      title: "Hero Section & Brand Identitas",
      detail:
        "Menampilkan tema resmi lari Bupati Series S2, hitung mundur menuju hari lomba, dan dua tombol aksi: 'Daftar Sekarang' serta 'Lihat Detail Event'.",
    },
    {
      num: "02",
      title: "Kategori & Aturan Wajib 1 Tiket 1 NIK",
      detail:
        "Kartu perbandingan jarak, target kuota, syarat kepesertaan, serta penegasan aturan wajib 1 NIK untuk 1 tiket demi ketertiban pendaftaran dan asuransi pelari.",
    },
    {
      num: "03",
      title: "Peta Rute & Titik Water Station",
      detail:
        "Peta rute lari melewati ikon sejarah dan keindahan Kabupaten Cianjur, lengkap dengan titik pos medis dan pos hidrasi.",
    },
    {
      num: "04",
      title: "Jadwal & Panduan Pengambilan Race Pack",
      detail:
        "Instruksi rinci mengenai tanggal, jam operasional meja panitia di Pendopo Cianjur, dan syarat dokumen yang wajib dibawa.",
    },
    {
      num: "05",
      title: "FAQ & Pusat Bantuan Resmi",
      detail:
        "Daftar jawaban pertanyaan regulasi kesehatan, penitipan tas, dan kontak saluran bantuan resmi panitia KONI.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-left">
      <div className="rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-[#111827]/80 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800/80">
          <div>
            <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
              08 / LANDING_STRUCTURE
            </span>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Anatomi 5 Blok Kunci Landing Page
            </h4>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            PILIH BLOK UNTUK MEMBACA FOKUS KONTEN
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 space-y-2">
            {sections.map((sec, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`w-full p-3.5 rounded-xl text-left text-xs font-medium transition-all border ${
                  activeTab === idx
                    ? "bg-slate-100 dark:bg-slate-900 border-emerald-500/50 text-slate-900 dark:text-white shadow-sm"
                    : "bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-700"
                }`}
              >
                <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold mr-2">{sec.num}</span>
                <span>{sec.title}</span>
              </button>
            ))}
          </div>

          <div className="md:col-span-7 rounded-2xl p-6 md:p-8 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 flex flex-col justify-center space-y-3">
            <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
              {sections[activeTab].num} / DETAIL_KOMPONEN
            </span>
            <h5 className="text-lg font-bold text-slate-900 dark:text-white">
              {sections[activeTab].title}
            </h5>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {sections[activeTab].detail}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onNext}
            className="rounded-full px-5 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-colors flex items-center gap-2"
          >
            <span>Lanjut ke Simulasi Registrasi</span>
            <ChevronRightIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* Scene 12: Participant QR */
function SceneParticipantQr({ onTestScanner }: { onTestScanner: () => void }) {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 space-y-5">
          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
            12 / DIGITAL_PASSPORT
          </span>

          <h3 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">
            Satu Kode Unik, Transaksi Cepat Tanpa Salah Sasaran
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Kode QR di ponsel peserta memuat token kriptografi acak yang ditautkan langsung
            dengan pangkalan data verifikasi panitia.
          </p>

          <div className="space-y-3 text-xs">
            <div className="rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-[#111827]/80 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Tidak Membocorkan NIK / Data Pribadi</span>
              <span className="text-slate-600 dark:text-slate-400 text-xs block">
                QR hanya memuat token identifikasi logistik, bukan biodata teks mentah.
              </span>
            </div>

            <div className="rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-[#111827]/80 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Dukungan Mode Luar Jaringan (Fallback)</span>
              <span className="text-slate-600 dark:text-slate-400 text-xs block">
                Peserta dapat menyimpan tangkapan layar (screenshot) kode QR di galeri ponselnya.
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onTestScanner}
              className="rounded-full px-6 py-2.5 text-sm font-bold bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2"
            >
              <QrCodeIcon className="w-4 h-4" />
              <span>Simulasikan Scan QR di Meja Panitia</span>
            </button>
          </div>
        </div>

        <div className="md:col-span-6 flex justify-center">
          <MockupFrame slotId="participant-racepack-qr" />
        </div>
      </div>
    </div>
  );
}

/* Scene 17: Security */
function SceneSecurity({ onNext }: { onNext: () => void }) {
  const policies = [
    {
      num: "01",
      title: "Integritas Pendaftaran: Kebijakan 1 Tiket 1 NIK",
      desc: "Sistem menerapkan validasi unik berbasis NIK kependudukan (16 digit) saat formulir dikirim. Satu NIK hanya berhak atas 1 tiket lomba untuk seluruh kategori, mencegah calo dan penimbunan slot. Data NIK dilindungi enkripsi hash searah sesuai regulasi UU Pelindungan Data Pribadi (UU PDP).",
      featured: true,
    },
    {
      num: "02",
      title: "Otorisasi Akses Berjenjang (RBAC)",
      desc: "Petugas meja race pack hanya memiliki hak membaca data minim dan mengonfirmasi penyerahan, tanpa akses mengubah kuota atau mengekspor basis data penuh.",
    },
    {
      num: "03",
      title: "Perlindungan Foto Bukti Fisik",
      desc: "Foto dokumentasi penerimaan disimpan di private storage terenkripsi dan hanya dapat diakses melalui link berbatas waktu (signed URLs) oleh koordinator berwenang.",
    },
    {
      num: "04",
      title: "Jejak Audit Mutlak (Audit Trail)",
      desc: "Setiap transaksi penyerahan mencatat nama petugas, ID perangkat scanner, waktu persis, dan foto lampiran untuk mencegah perselisihan klaim.",
    },
    {
      num: "05",
      title: "Zero Plaintext Password",
      desc: "Sistem autentikasi peserta memanfaatkan login berbasis email terverifikasi (magic link) demi mencegah risiko kebocoran kata sandi umum.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {policies.map((p, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-300 border bg-white space-y-2.5 shadow-sm ${
              p.featured
                ? "md:col-span-2 border-emerald-300 bg-emerald-50/40"
                : "border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono text-emerald-700">
              <span className="tracking-widest uppercase font-semibold">{p.num} / SECURITY_CONTROL</span>
              <ShieldCheckIcon className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-slate-900">{p.title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onNext}
          className="rounded-full px-5 py-2 text-sm border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center gap-2"
        >
          <span>Buka Timeline Implementasi</span>
          <ChevronRightIcon className="w-4 h-4 text-emerald-600" />
        </button>
      </div>
    </div>
  );
}

/* Scene 18: Roadmap */
function SceneRoadmap({ onNext }: { onNext: () => void }) {
  const phases = [
    {
      phase: "01",
      title: "Penajaman Kebutuhan & Regulasi Panitia",
      items: "Finalisasi kategori resmi, kuota pelari, dan penetapan SOP verifikasi pengambilan race pack.",
    },
    {
      phase: "02",
      title: "Desain UI/UX & Brand Asset Resmi",
      items: "Pemasangan mockup visual final dari panitia KONI ke dalam sistem dan penyelarasan tema warna.",
    },
    {
      phase: "03",
      title: "Pembangunan Sistem & Integrasi Layanan",
      items: "Implementasi backend API, database peserta, email transaksional, portal peserta, dan modul scanner meja.",
    },
    {
      phase: "04",
      title: "Uji Coba Beban & Pelatihan Operator Posko",
      items: "Stress test simulasi lonjakan pendaftaran massal dan pelatihan perangkat scanner bagi relawan meja.",
    },
    {
      phase: "05",
      title: "Peluncuran Publik & Operasional Hari H",
      items: "Pembukaan registrasi resmi, monitoring kuota, dan pendampingan lapangan saat hari lomba.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-left">
      <div className="space-y-4">
        {phases.map((p, idx) => (
          <div
            key={idx}
            className="rounded-2xl p-5 md:p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-[#111827]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
          >
            <div className="flex items-start sm:items-center gap-4">
              <span className="rounded-full px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-emerald-700 dark:text-emerald-400 font-bold shrink-0 text-xs">
                FASE {p.phase}
              </span>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">{p.title}</h5>
                <div className="text-slate-600 dark:text-slate-400 text-xs mt-0.5">
                  {p.items}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onNext}
          className="rounded-full px-5 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-colors flex items-center gap-2"
        >
          <span>Lanjut ke Penutup & Rekomendasi</span>
          <ChevronRightIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </button>
      </div>
    </div>
  );
}

/* Scene 19: Closing */
function SceneClosing() {
  return (
    <div className="w-full max-w-4xl mx-auto text-center space-y-8 py-8">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto shadow-sm dark:shadow-2xl">
        <CheckCircleIcon className="w-8 h-8" />
      </div>

      <div className="space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
          19 / SUMMARY_RECOMMENDATION
        </span>
        <h3 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
          Menyatukan Pengalaman Peserta dan Ketertiban Panitia
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Dengan platform terintegrasi, ajang Cianjur Berlari Bupati Series Season 2
          akan menjadi pelopor penyelenggaraan event lari daerah yang profesional, modern,
          dan akuntabel.
        </p>
      </div>

      <div className="rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-[#111827]/80 max-w-xl mx-auto text-left text-xs space-y-3 shadow-sm dark:shadow-none">
        <div className="font-mono font-bold uppercase text-[11px] text-emerald-700 dark:text-emerald-400 tracking-widest">
          LANGKAH TINDAK LANJUT BERIKUTNYA:
        </div>
        <div className="space-y-2 text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">1.</span>
            <span>Persetujuan konsep alur pendaftaran dan pengambilan race pack.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">2.</span>
            <span>Konfirmasi kategori resmi, kuota peserta, dan tanggal pelaksanaan.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">3.</span>
            <span>Pengesahan timeline pengerjaan menuju tahap implementasi sistem.</span>
          </div>
        </div>
      </div>

      {/* Creator Attribution & Link Card */}
      <div className="rounded-2xl p-6 md:p-7 border border-slate-200 bg-white max-w-xl mx-auto text-center space-y-4 shadow-xs">
        <div className="flex items-center justify-center gap-4">
          <img
            src="/branding/logo-koni-cianjurberlari.png"
            alt="KONI Cianjur Berlari"
            className="h-8 w-auto object-contain"
          />
          <div className="h-6 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <img
              src="/branding/logo-creadin.svg"
              alt="Creadin"
              className="w-6 h-6 object-contain"
            />
            <span className="text-xs font-bold text-slate-900 font-mono">Creadin.co</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-mono text-emerald-700 tracking-widest uppercase font-semibold block">
            KREATOR & PENGELOLA PLATFORM
          </span>
          <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
            Pitch deck dan arsitektur platform digital ini dibuat serta dikelola oleh{" "}
            <strong className="text-slate-900 font-semibold">Creative Digital Innovation (Creadin.co)</strong> sebagai mitra perancang ekosistem event olahraga daerah.
          </p>
        </div>

        <div className="pt-1">
          <a
            href="https://www.creadin.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold bg-slate-900 hover:bg-emerald-700 text-white transition-all shadow-xs"
          >
            <img src="/branding/logo-creadin.svg" alt="" className="w-3.5 h-3.5 brightness-0 invert" />
            <span>Kunjungi creadin.co</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* Scene 20: Appendix */
function SceneAppendix({ isExploreMode }: { isExploreMode?: boolean }) {
  const [selectedSlot, setSelectedSlot] = useState("hero-section");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const currentSlot = mockupRegistry[selectedSlot] || mockupRegistry["hero-section"];

  const categories = [
    { id: "ALL", label: "Semua Mockup (8)" },
    { id: "landing", label: "Landing Page (3)" },
    { id: "registration", label: "Registrasi (1)" },
    { id: "participant", label: "Portal Peserta (2)" },
    { id: "admin", label: "Portal Panitia (2)" },
  ];

  const filteredSlots = mediaMockupKeys.filter((key) => {
    if (selectedCategory === "ALL") return true;
    return mockupRegistry[key].category === selectedCategory;
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-left">
      <div className="rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-slate-200/90 bg-white/95 space-y-6 shadow-xl transition-colors">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="space-y-1">
            <span className="text-xs font-mono text-emerald-700 tracking-widest uppercase font-semibold">
              20 / LAMPIRAN_TEKNIS : MEDIA_MOCKUP
            </span>
            <h4 className="text-xl md:text-2xl font-bold text-slate-900">
              Galeri Mockup Desain Platform Digital
            </h4>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Pratinjau media mockup visual antarmuka Cianjur Berlari Bupati Series 2 dalam format WebP resolusi tinggi dari folder <code className="text-emerald-700 font-mono font-bold">public/mockups/</code>.
            </p>
          </div>
          <span className="rounded-full px-3.5 py-1 text-xs font-mono font-bold border border-emerald-200 bg-emerald-50 text-emerald-800 shrink-0">
            8 MEDIA WEBP AKTIF
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                const matches = mediaMockupKeys.filter(
                  (k) => cat.id === "ALL" || mockupRegistry[k].category === cat.id
                );
                if (matches.length > 0 && !matches.includes(selectedSlot)) {
                  setSelectedSlot(matches[0]);
                }
              }}
              className={`rounded-full px-3.5 py-1 text-xs font-mono transition-all border ${
                selectedCategory === cat.id
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800 font-bold"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-400 hover:text-slate-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Media Mockup Selector Cards */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest block font-semibold">
            PILIH MEDIA MOCKUP:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {filteredSlots.map((key) => {
              const slot = mockupRegistry[key];
              const isSelected = selectedSlot === key;
              const isMobile = slot.device === "mobile";
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedSlot(key)}
                  className={`rounded-xl p-3 text-left transition-all border flex items-center justify-between gap-3 ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow-xs ring-1 ring-emerald-500"
                      : "border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="space-y-0.5 truncate">
                    <div className="text-xs font-semibold truncate text-slate-900">
                      {slot.title}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                      <span>{isMobile ? "Smartphone" : "Desktop"}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-medium">{slot.fileSize || "WebP"}</span>
                    </div>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isSelected ? "bg-emerald-600" : "bg-slate-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Mockup Specification Card & Action Link */}
        <div className="rounded-2xl p-4 bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">
                {currentSlot.title}
              </span>
              <span className="rounded-full px-2.5 py-0.5 text-[10px] font-mono bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold uppercase">
                {currentSlot.device}
              </span>
              {currentSlot.resolution && (
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 text-slate-600 font-medium">
                  {currentSlot.resolution}
                </span>
              )}
            </div>
            <p className="text-slate-600 text-xs max-w-xl">
              {currentSlot.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={currentSlot.imagePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-mono font-semibold bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 shadow-xs transition-colors"
            >
              <span>Buka Resolusi Penuh</span>
              <span className="text-emerald-600">↗</span>
            </a>
          </div>
        </div>

        {/* Mockup Display inside Frame */}
        <div className="pt-2">
          <MockupFrame
            slotId={selectedSlot}
            isExploreMode={isExploreMode}
          />
        </div>

        {/* Footer Specification Note */}
        <div className="rounded-2xl p-4 bg-slate-50 border border-slate-200 text-xs space-y-1">
          <div className="font-mono font-bold text-emerald-700 uppercase tracking-widest text-[11px]">
            INFORMASI ASET MEDIA MOCKUP:
          </div>
          <p className="text-slate-600 text-xs leading-relaxed">
            Seluruh 8 media mockup di atas telah terkompresi dengan format WebP High Resolution berukuran ringan (~1,8 MB total), menjaga kecepatan muat presentasi tanpa mengorbankan ketajaman tampilan pada layar panggung maupun laptop pemangku kepentingan.
          </p>
        </div>
      </div>
    </div>
  );
}
