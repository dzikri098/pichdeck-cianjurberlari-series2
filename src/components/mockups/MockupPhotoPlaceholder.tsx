"use client";

import React, { useState } from "react";
import { MockupSlot, mockupRegistry } from "@/content/mockups";
import { CameraIcon, CheckIcon, RefreshCwIcon } from "@/components/ui/Icons";

interface MockupPhotoPlaceholderProps {
  slot: MockupSlot;
  customImage?: string | null;
  onImageChange?: (imageDataUrl: string | null) => void;
  isCompact?: boolean;
}

export function MockupPhotoPlaceholder({
  slot,
  customImage,
  onImageChange,
  isCompact = false,
}: MockupPhotoPlaceholderProps) {
  const [internalImage, setInternalImage] = useState<string | null>(customImage || null);
  const currentImage = customImage !== undefined ? customImage : internalImage;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setInternalImage(dataUrl);
      if (onImageChange) {
        onImageChange(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setInternalImage(null);
    if (onImageChange) {
      onImageChange(null);
    }
  };

  const isMobile = slot.device === "mobile";
  const recommendedResolution = isMobile
    ? "1170 × 2532 px (Rasio 9:19.5 Smartphone)"
    : "1920 × 1080 px (Rasio 16:9 Desktop Full HD)";

  if (currentImage) {
    return (
      <div className="relative w-full h-full min-h-[360px] flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-[#0B0F19] transition-colors">
        <img
          src={currentImage}
          alt={slot.title}
          className="w-full h-auto max-h-[580px] object-contain rounded-xl shadow-md"
        />
        <div className="mt-3 flex items-center gap-3">
          <span className="text-xs font-mono text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold">
            <CheckIcon className="w-3.5 h-3.5" />
            <span>Foto Mockup Terpasang</span>
          </span>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors underline"
          >
            Hapus Pratinjau
          </button>
        </div>
      </div>
    );
  }

  if (isCompact) {
    return (
      <div className="w-full h-40 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-4 flex flex-col items-center justify-center text-center space-y-2 transition-colors">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <CameraIcon className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200 block truncate max-w-[200px]">
            {slot.id}
          </span>
          <span className="text-[10px] text-slate-500 font-mono block">
            {isMobile ? "Smartphone (9:19.5)" : "Desktop (16:9)"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[380px] md:min-h-[460px] p-6 md:p-10 flex flex-col items-center justify-center text-center bg-slate-50/70 dark:bg-[#0B0F19]/70 transition-colors">
      <div className="w-full max-w-lg rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 p-6 md:p-8 flex flex-col items-center space-y-4 shadow-sm transition-colors">
        {/* Camera Placeholder Badge */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
          <CameraIcon className="w-8 h-8" />
        </div>

        {/* Placeholder Info */}
        <div className="space-y-1.5 text-center">
          <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest block">
            TEMPAT FOTO MOCKUP DESAIN
          </span>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            {slot.title}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
            {slot.description}
          </p>
        </div>

        {/* Technical specs pill */}
        <div className="rounded-xl p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1 w-full text-left">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-500">Nama Slot:</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">{slot.id}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-500">Lokasi File Target:</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">{slot.imagePath}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-500">Rekomendasi Ukuran:</span>
            <span className="text-slate-700 dark:text-slate-300">{recommendedResolution}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-500">Format Gambar:</span>
            <span className="text-slate-700 dark:text-slate-300">PNG, JPG, WEBP, atau SVG</span>
          </div>
        </div>

        {/* Upload file trigger button to test local image */}
        <div className="pt-1 flex flex-col items-center gap-2">
          <label className="rounded-full px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2">
            <CameraIcon className="w-4 h-4" />
            <span>Uji Pasang Foto Mockup Lokal</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <span className="text-[11px] text-slate-500 font-mono">
            Pratinjau instan di peramban tanpa koneksi server
          </span>
        </div>
      </div>
    </div>
  );
}

