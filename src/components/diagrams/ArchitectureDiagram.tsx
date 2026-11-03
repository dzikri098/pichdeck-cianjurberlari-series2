"use client";

import React, { useState } from "react";
import {
  ShieldCheckIcon,
  UsersIcon,
  MailIcon,
  QrCodeIcon,
  CameraIcon,
  CheckCircleIcon,
} from "@/components/ui/Icons";

interface ArchitectureNode {
  id: string;
  title: string;
  subtitle: string;
  category: "frontend" | "services" | "storage" | "operations";
  description: string;
  securityNote: string;
}

export function ArchitectureDiagram() {
  const [activeNodeId, setActiveNodeId] = useState<string>("scanner");

  const nodes: ArchitectureNode[] = [
    {
      id: "landing",
      title: "Landing Page Publik",
      subtitle: "Web / Mobile Web",
      category: "frontend",
      description:
        "Menampilkan identitas lomba Cianjur Berlari, jadwal, rute, kategori, serta formulir pendaftaran yang responsif dan cepat.",
      securityNote: "Hanya menyajikan data publik tanpa mengekspos endpoint internal panitia.",
    },
    {
      id: "reg-api",
      title: "Registration Service",
      subtitle: "API Validasi & Kuota",
      category: "services",
      description:
        "Memvalidasi data input, mengecek batas kuota kategori secara atomik, mencegah duplikasi email, dan menerbitkan ID unik peserta.",
      securityNote: "Dilengkapi rate limiting dan validasi data server-side.",
    },
    {
      id: "email-svc",
      title: "Email Notification",
      subtitle: "Layanan Transaksional",
      category: "services",
      description:
        "Mengirim konfirmasi pendaftaran dan link login instan (magic link) tanpa menyertakan kata sandi terbuka.",
      securityNote: "Tautan akses memiliki batas masa kedaluwarsa 48 jam.",
    },
    {
      id: "participant-portal",
      title: "Dashboard Peserta",
      subtitle: "Portal Personal",
      category: "frontend",
      description:
        "Satu halaman khusus bagi pelari untuk melihat nomor BIB, jadwal race pack, data medis darurat, dan QR unik pengambilan.",
      securityNote: "QR berisi token terenkripsi, bukan biodata plaintext.",
    },
    {
      id: "scanner",
      title: "Petugas & Scanner QR",
      subtitle: "Operasional Meja Panitia",
      category: "operations",
      description:
        "Alat pemindai kamera bagi operator meja untuk mencocokkan identitas fisik, memotret bukti serah terima, dan mengunci status.",
      securityNote: "Verifikasi atomik mencegah klaim ganda bila dipindai di dua meja berbeda.",
    },
    {
      id: "storage",
      title: "Private Object Storage",
      subtitle: "Foto Bukti Terenkripsi",
      category: "storage",
      description:
        "Menyimpan foto dokumentasi penyerahan race pack secara privat dengan tautan berbatas waktu (signed URL).",
      securityNote: "Tidak dapat diakses publik, hanya dapat dibuka oleh role panitia berwenang.",
    },
    {
      id: "database",
      title: "Database & Audit Trail",
      subtitle: "Pangkalan Data Terpusat",
      category: "storage",
      description:
        "Menyimpan rekam jejak peserta, histori perubahan status, pencatatan petugas meja, dan timestamp setiap aksi.",
      securityNote: "Dukungan transaksi database ACID untuk konsistensi data absolut.",
    },
    {
      id: "admin-center",
      title: "Admin Command Center",
      subtitle: "Monitoring Pimpinan KONI",
      category: "operations",
      description:
        "Dashboard pemantau kuota real-time, visualisasi kecepatan distribusi race pack, dan ekspor data resmi.",
      securityNote: "Akses bertingkat (Super Admin, Koordinator Kategori, Petugas Meja).",
    },
  ];

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-left">
      <div className="rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-700 border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#111827]/80 space-y-6 shadow-xl transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800/80">
          <div>
            <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
              06 / ARCHITECTURE_TOPOLOGY
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Topologi Sistem Digital Modular
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            KLIK MODUL UNTUK MELIHAT PERAN & KEAMANAN
          </span>
        </div>

        {/* Modular Grid System (2 or 4 symmetric columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {nodes.map((node) => {
            const isSelected = node.id === activeNodeId;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNodeId(node.id)}
                className={`rounded-2xl p-5 text-left transition-all border ${
                  isSelected
                    ? "bg-emerald-50 dark:bg-slate-900 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                    : "bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                      isSelected
                        ? "border-emerald-300 dark:border-emerald-500/40 bg-emerald-100/80 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 font-bold"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {node.category.toUpperCase()}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                  )}
                </div>
                <div className="font-bold text-slate-900 dark:text-white text-sm">{node.title}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {node.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Node Details Card */}
        <div className="rounded-2xl p-6 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 space-y-3 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Rincian Peran: {activeNode.title}
              </h4>
            </div>
            <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-semibold">
              CATEGORY: {activeNode.category}
            </span>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {activeNode.description}
          </p>

          <div className="rounded-xl p-3.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-start gap-3 text-xs">
            <ShieldCheckIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Prinsip Keamanan: </span>
              <span className="text-slate-700 dark:text-slate-300">{activeNode.securityNote}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
