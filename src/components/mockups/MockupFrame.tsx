"use client";

import React, { useState } from "react";
import { mockupRegistry } from "@/content/mockups";
import { FallbackMockupView } from "./FallbackMockups";
import { MockupPhotoPlaceholder } from "./MockupPhotoPlaceholder";

interface MockupFrameProps {
  slotId: string;
  isExploreMode?: boolean;
  className?: string;
  placeholderOnly?: boolean;
  customImage?: string | null;
  onImageChange?: (url: string | null) => void;
}

export function MockupFrame({
  slotId,
  isExploreMode = false,
  className = "",
  placeholderOnly = false,
  customImage,
  onImageChange,
}: MockupFrameProps) {
  const slot = mockupRegistry[slotId];
  const [imageError, setImageError] = useState(false);

  if (!slot) {
    return (
      <div className="p-6 rounded-2xl border border-rose-500/30 bg-rose-950/20 text-rose-300 text-xs font-mono">
        Slot mockup "{slotId}" tidak terdaftar di registry.
      </div>
    );
  }

  const renderContent = () => {
    // If a custom image or valid slot image exists, display it
    const activeImage = customImage || (!imageError && slot.imagePath ? slot.imagePath : null);

    if (activeImage) {
      if (slot.isScrollable) {
        return (
          <div className="relative w-full h-[580px] overflow-y-auto bg-slate-100 dark:bg-[#0B0F19] transition-colors p-2 rounded-lg">
            <div className="sticky top-2 right-2 z-10 flex justify-end">
              <span className="rounded-full px-3 py-1 bg-slate-900/80 backdrop-blur-sm text-white font-mono text-[10px] shadow-sm">
                Scroll untuk menjelajah seluruh halaman ↓
              </span>
            </div>
            <img
              src={activeImage}
              alt={slot.title}
              className="w-full h-auto object-cover rounded-lg"
              onError={() => setImageError(true)}
            />
          </div>
        );
      }

      return (
        <div className="relative w-full h-full min-h-[360px] flex flex-col items-center justify-center bg-slate-100 dark:bg-[#0B0F19] transition-colors p-2">
          <img
            src={activeImage}
            alt={slot.title}
            className="w-full h-auto max-h-[580px] object-contain rounded-lg"
            onError={() => setImageError(true)}
          />
          {placeholderOnly && customImage && (
            <button
              type="button"
              onClick={() => onImageChange && onImageChange(null)}
              className="mt-2 text-xs font-mono text-slate-500 hover:text-rose-500 underline"
            >
              Hapus Foto Pratinjau
            </button>
          )}
        </div>
      );
    }

    if (placeholderOnly) {
      return (
        <MockupPhotoPlaceholder
          slot={slot}
          customImage={customImage}
          onImageChange={onImageChange}
        />
      );
    }

    return <FallbackMockupView slotId={slotId} />;
  };

  if (slot.device === "mobile") {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        {/* Phone Frame */}
        <div className="relative w-full max-w-[340px] rounded-[44px] p-3 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 shadow-2xl border border-slate-300 dark:border-slate-700/60 transition-colors">
          {/* Dynamic Island / Speaker notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full z-20 flex items-center justify-end pr-2">
            <div className="w-2 h-2 rounded-full bg-slate-800 border border-slate-700" />
          </div>

          {/* Screen area */}
          <div className="relative w-full overflow-hidden rounded-[34px] bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 min-h-[580px] flex flex-col pt-6 border border-slate-200 dark:border-slate-800/80 transition-colors">
            {renderContent()}

            {/* Home indicator bar */}
            <div className="mt-auto py-2.5 flex justify-center bg-slate-100/90 dark:bg-[#0B0F19]/90 transition-colors">
              <div className="w-32 h-1 bg-slate-400 dark:bg-slate-700 rounded-full" />
            </div>
          </div>
        </div>

        {/* Slot info badge */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="rounded-full px-3 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-mono text-[11px] shadow-sm">
            SLOT: {slot.id}
          </span>
          {isExploreMode && (
            <span className="text-slate-500 text-[11px] font-mono">
              {slot.caption}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Desktop / Browser Frame
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-[#111827]/80 backdrop-blur-sm shadow-xl transition-colors">
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-100 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800/80 select-none transition-colors">
          {/* Window control dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          {/* Address Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-400 font-mono transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span className="truncate">
                link-domain-anda.com
              </span>
            </div>
          </div>

          {/* View status */}
          <div className="text-[11px] font-mono text-emerald-800 dark:text-emerald-400 px-3 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30">
            UI_PREVIEW
          </div>
        </div>

        {/* Browser Content */}
        <div className="w-full bg-slate-50 dark:bg-[#0B0F19] min-h-[420px] max-h-[640px] overflow-y-auto transition-colors">
          {renderContent()}
        </div>
      </div>

      {/* Caption & Slot Info */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs px-2">
        <div className="flex items-center gap-2.5">
          <span className="rounded-full px-3 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-mono text-[11px] shadow-sm">
            SLOT: {slot.id}
          </span>
          <span className="text-slate-700 dark:text-slate-400 font-medium">{slot.title}</span>
        </div>
        {isExploreMode && (
          <span className="text-slate-500 text-[11px] font-mono">
            {slot.caption}
          </span>
        )}
      </div>
    </div>
  );
}
