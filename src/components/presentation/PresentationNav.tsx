"use client";

import React from "react";
import { SceneItem } from "@/content/scenes";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RefreshCwIcon,
} from "@/components/ui/Icons";

interface PresentationNavProps {
  scenes: SceneItem[];
  currentIndex: number;
  isExploreMode: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleMode: () => void;
  onOpenDrawer: () => void;
  onOpenShortcuts: () => void;
  onResetDemo: () => void;
}

export function PresentationNav({
  scenes,
  currentIndex,
  isExploreMode,
  onPrev,
  onNext,
  onToggleMode,
  onOpenDrawer,
  onOpenShortcuts,
  onResetDemo,
}: PresentationNavProps) {
  const currentScene = scenes[currentIndex] || scenes[0];
  const progressPercent = Math.round(((currentIndex + 1) / scenes.length) * 100);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 select-none shadow-xs transition-colors duration-200">
      {/* Top Precision Emerald Progress Bar */}
      <div className="w-full h-0.5 bg-slate-100">
        <div
          className="h-full bg-emerald-600 transition-all duration-300 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 text-sm">
        {/* Brand / Event Logos */}
        <div className="flex items-center gap-3">
          <img
            src="/branding/logo-koni-cianjurberlari.png"
            alt="KONI Cianjur Berlari"
            className="h-8 sm:h-9 w-auto object-contain shrink-0"
          />
          <div className="hidden sm:block">
            <div className="text-[10px] font-mono text-emerald-700 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <span>Bupati Series 2</span>
              <span className="text-slate-300">·</span>
              <a
                href="https://www.creadin.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-emerald-800 text-slate-500 transition-colors inline-flex items-center gap-1"
                title="Dibuat & dikelola oleh Creative Digital Innovation (Creadin.co)"
              >
                <img
                  src="/branding/logo-creadin.svg"
                  alt="Creadin.co"
                  className="w-3.5 h-3.5 object-contain inline-block"
                />
                <span>by Creadin.co ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Current Scene Badge & Menu Trigger (Pill Shape) */}
        <button
          type="button"
          onClick={onOpenDrawer}
          className="flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-mono border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-700 transition-all max-w-[220px] sm:max-w-sm truncate text-left shadow-xs"
          title="Buka daftar scene (Pintasan: M)"
        >
          <span className="text-emerald-700 font-bold shrink-0">
            {currentScene.number} / {String(scenes.length).padStart(2, "0")}
          </span>
          <span className="text-slate-900 font-sans truncate font-medium">
            {currentScene.navLabel}
          </span>
          <span className="text-slate-400 text-[10px] hidden sm:inline shrink-0">
            [Index]
          </span>
        </button>

        {/* Action Controls in Clean Pill Style */}
        <div className="flex items-center gap-2">
          {/* Mode Toggle Pill */}
          <button
            type="button"
            onClick={onToggleMode}
            className={`rounded-full px-4 py-1.5 text-xs font-mono border transition-all hidden sm:flex items-center gap-1.5 shadow-xs ${
              isExploreMode
                ? "border-emerald-300 bg-emerald-50 text-emerald-800 font-semibold"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-100"
            }`}
            title="Ganti mode presentasi / explore"
          >
            <span>{isExploreMode ? "MODE: EXPLORE" : "MODE: PRESENTASI"}</span>
          </button>

          {/* Reset Demo Button */}
          <button
            type="button"
            onClick={onResetDemo}
            className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-600 hover:text-emerald-700 flex items-center justify-center transition-all shadow-xs"
            title="Reset seluruh simulasi pendaftaran & status demo"
            aria-label="Reset simulasi demo"
          >
            <RefreshCwIcon className="w-3.5 h-3.5" />
          </button>

          {/* Previous Scene Button */}
          <button
            type="button"
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 transition-all shadow-xs"
            title="Scene sebelumnya (←)"
            aria-label="Scene sebelumnya"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>

          {/* Next Scene Button (Emerald Action) */}
          <button
            type="button"
            onClick={onNext}
            disabled={currentIndex === scenes.length - 1}
            className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all font-bold shadow-xs"
            title="Scene berikutnya (→ atau Spasi)"
            aria-label="Scene berikutnya"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 hidden lg:flex items-center justify-center transition-all shadow-xs"
            title="Layar Penuh"
            aria-label="Layar Penuh"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </button>

          {/* Help Button */}
          <button
            type="button"
            onClick={onOpenShortcuts}
            className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-emerald-700 font-mono text-xs flex items-center justify-center transition-all shadow-xs font-bold"
            title="Bantuan Pintasan Keyboard (?)"
            aria-label="Bantuan pintasan keyboard"
          >
            ?
          </button>
        </div>
      </div>
    </header>
  );
}
