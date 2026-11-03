"use client";

import React, { useEffect } from "react";
import { XMarkIcon } from "@/components/ui/Icons";

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    { key: "→", desc: "Berpindah ke scene berikutnya" },
    { key: "Spasi", desc: "Maju ke scene berikutnya (Mode Presentasi)" },
    { key: "←", desc: "Kembali ke scene sebelumnya" },
    { key: "M", desc: "Buka / tutup daftar seluruh scene" },
    { key: "?", desc: "Tampilkan bantuan pintasan keyboard ini" },
    { key: "Esc", desc: "Tutup jendela bantuan atau modal popup" },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pintasan Keyboard Presentasi"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md rounded-2xl p-6 md:p-8 border border-slate-200 bg-white shadow-2xl text-left space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono text-emerald-700 tracking-widest uppercase font-semibold">
              KEYBOARD_SHORTCUTS
            </span>
            <div className="text-lg font-bold text-slate-900 mt-0.5">
              Pintasan Keyboard Presenter
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela pintasan"
            className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-100 flex items-center justify-center transition-all shadow-xs"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5 text-xs">
          {shortcuts.map((sc) => (
            <div
              key={sc.key}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200"
            >
              <span className="text-slate-700 font-medium">{sc.desc}</span>
              <kbd className="rounded-full px-3 py-1 bg-white border border-slate-200 text-emerald-700 font-mono font-bold text-xs shadow-xs">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="text-[11px] text-slate-500 font-mono pt-1 text-center">
          PINTASAN KEYBOARD AKTIF DI SELURUH SCENE
        </div>
      </div>
    </div>
  );
}
