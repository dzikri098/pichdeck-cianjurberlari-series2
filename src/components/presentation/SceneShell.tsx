"use client";

import React, { ReactNode } from "react";
import { SceneItem } from "@/content/scenes";

interface SceneShellProps {
  scene: SceneItem;
  totalScenes: number;
  currentIndex: number;
  isExploreMode?: boolean;
  children: ReactNode;
}

export function SceneShell({
  scene,
  totalScenes,
  currentIndex,
  isExploreMode = false,
  children,
}: SceneShellProps) {
  return (
    <section
      id={scene.id}
      data-scene-id={scene.id}
      className={`relative w-full text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center transition-colors duration-200 ${
        isExploreMode
          ? "py-16 md:py-24 border-b border-slate-200 dark:border-slate-800/80 scroll-mt-20"
          : "min-h-screen py-16 px-4 md:px-8 lg:px-12 snap-start flex-shrink-0"
      }`}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col justify-center space-y-8 md:space-y-10">
        {/* Section Header System */}
        <div className="space-y-3.5 text-center md:text-left max-w-3xl">
          {/* Section Identifier Pattern */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 tracking-widest uppercase font-semibold">
              {scene.number} / {scene.navLabel.toUpperCase()}
            </span>
            {scene.badge && (
              <span className="text-[11px] font-mono px-3 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400">
                {scene.badge}
              </span>
            )}
            <span className="text-xs text-slate-500 dark:text-slate-500 font-mono hidden sm:inline">
              [{scene.category.toUpperCase()}]
            </span>
          </div>

          {/* Heading Scale */}
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            {scene.title}
          </h2>

          {/* Body/Description */}
          {scene.subtitle && (
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              {scene.subtitle}
            </p>
          )}
        </div>

        {/* Scene Interactive & Visual Content Area */}
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
}
