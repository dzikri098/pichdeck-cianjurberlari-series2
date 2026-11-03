"use client";

import React, { useEffect } from "react";
import { scenes, SceneItem } from "@/content/scenes";
import { XMarkIcon } from "@/components/ui/Icons";

interface SceneDrawerProps {
  isOpen: boolean;
  currentIndex: number;
  onSelectScene: (index: number) => void;
  onClose: () => void;
}

export function SceneDrawer({
  isOpen,
  currentIndex,
  onSelectScene,
  onClose,
}: SceneDrawerProps) {
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Daftar Scene Presentasi"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl p-6 md:p-8 border border-slate-200 bg-white shadow-2xl flex flex-col text-left space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
          <div>
            <span className="text-xs font-mono text-emerald-700 tracking-widest uppercase font-semibold">
              INDEX_NAVIGASI_SCENE
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Daftar Isi Presentasi ({scenes.length} Scene)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup daftar scene"
            className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-100 flex items-center justify-center transition-all shadow-xs"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Scene Grid (Scrollable) in Clean 3-Column Layout */}
        <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {scenes.map((s, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  onSelectScene(idx);
                  onClose();
                }}
                className={`rounded-2xl p-4 text-left border transition-all ${
                  isActive
                    ? "bg-emerald-50/90 border-emerald-500 shadow-sm ring-1 ring-emerald-500/40"
                    : "bg-slate-50/90 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80 shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full border ${
                      isActive
                        ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    {s.number}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 truncate max-w-[110px]">
                    {s.category.toUpperCase()}
                  </span>
                </div>
                <div
                  className={`text-xs font-bold line-clamp-1 ${
                    isActive ? "text-emerald-950 font-bold" : "text-slate-900"
                  }`}
                >
                  {s.title}
                </div>
                <div className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                  {s.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Drawer Footer with Partner Branding */}
        <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="/branding/logo-koni-cianjurberlari.png"
              alt="KONI Cianjur Berlari"
              className="h-6 w-auto object-contain"
            />
            <span className="text-slate-300">·</span>
            <span className="text-[11px] font-mono text-slate-600">Bupati Series 2</span>
          </div>
          <a
            href="https://www.creadin.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors font-mono text-[11px] text-slate-500"
            title="Creative Digital Innovation (Creadin.co)"
          >
            <img src="/branding/logo-creadin.svg" alt="" className="w-3.5 h-3.5 object-contain" />
            <span>by Creadin.co ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
