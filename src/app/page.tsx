"use client";

import React, { useState, useEffect, useCallback } from "react";
import { scenes } from "@/content/scenes";
import { PresentationNav } from "@/components/presentation/PresentationNav";
import { SceneShell } from "@/components/presentation/SceneShell";
import { SceneContent } from "@/components/presentation/SceneContent";
import { SceneDrawer } from "@/components/presentation/SceneDrawer";
import { ShortcutsModal } from "@/components/presentation/ShortcutsModal";
import { useDemoStore } from "@/state/demoStore";

export default function PitchDeckPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExploreMode, setIsExploreMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [scannerTokenTarget, setScannerTokenTarget] = useState<string | undefined>(undefined);

  const { resetDemo } = useDemoStore();

  // Synchronize hash on load and back/forward
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const foundIdx = scenes.findIndex((s) => s.id === hash);
        if (foundIdx !== -1) {
          setCurrentIndex(foundIdx);
        }
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  // Update hash when currentIndex changes
  const updateHash = useCallback((index: number) => {
    const scene = scenes[index];
    if (scene && window.location.hash !== scene.anchor) {
      window.history.replaceState(null, "", scene.anchor);
    }
  }, []);

  const goToIndex = useCallback(
    (index: number) => {
      const boundedIndex = Math.max(0, Math.min(scenes.length - 1, index));
      setCurrentIndex(boundedIndex);
      updateHash(boundedIndex);

      if (isExploreMode) {
        const targetEl = document.getElementById(scenes[boundedIndex].id);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [isExploreMode, updateHash]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < scenes.length - 1) {
      goToIndex(currentIndex + 1);
    }
  }, [currentIndex, goToIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      goToIndex(currentIndex - 1);
    }
  }, [currentIndex, goToIndex]);

  const handleNavigateToScene = useCallback(
    (sceneId: string, tokenForScanner?: string) => {
      const targetIdx = scenes.findIndex((s) => s.id === sceneId);
      if (targetIdx !== -1) {
        if (tokenForScanner) {
          setScannerTokenTarget(tokenForScanner);
        }
        goToIndex(targetIdx);
      }
    },
    [goToIndex]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === "input" || targetTag === "textarea" || targetTag === "select") {
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === " " && !isExploreMode) {
        e.preventDefault();
        handleNext();
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        setIsDrawerOpen((prev) => !prev);
      } else if (e.key === "?") {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsDrawerOpen(false);
        setIsShortcutsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isExploreMode]);

  const currentScene = scenes[currentIndex];

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col pt-16 selection:bg-emerald-500 selection:text-white font-sans">
      {/* Top Presentation Navigation Bar */}
      <PresentationNav
        scenes={scenes}
        currentIndex={currentIndex}
        isExploreMode={isExploreMode}
        onPrev={handlePrev}
        onNext={handleNext}
        onToggleMode={() => setIsExploreMode((prev) => !prev)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onResetDemo={resetDemo}
      />

      {/* Main Content Area */}
      {isExploreMode ? (
        /* Explore Mode: continuous vertical scroll with deep anchors */
        <div className="w-full flex flex-col">
          {scenes.map((scene, idx) => (
            <SceneShell
              key={scene.id}
              scene={scene}
              totalScenes={scenes.length}
              currentIndex={idx}
              isExploreMode={true}
            >
              <SceneContent
                scene={scene}
                isExploreMode={true}
                onNavigateToScene={handleNavigateToScene}
                scannerTokenTarget={scannerTokenTarget}
              />
            </SceneShell>
          ))}
        </div>
      ) : (
        /* Presentation Mode: focused single scene view */
        <div className="w-full flex-1 flex flex-col justify-center">
          <SceneShell
            scene={currentScene}
            totalScenes={scenes.length}
            currentIndex={currentIndex}
            isExploreMode={false}
          >
            <SceneContent
              scene={currentScene}
              isExploreMode={false}
              onNavigateToScene={handleNavigateToScene}
              scannerTokenTarget={scannerTokenTarget}
            />
          </SceneShell>
        </div>
      )}

      {/* Presenter Floating Quick Indicator (bottom right on desktop in pill shape) */}
      <div className="fixed bottom-5 right-5 z-30 hidden sm:flex items-center gap-2 rounded-full p-2 bg-white/95 border border-slate-200/90 backdrop-blur-md shadow-lg text-xs">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 transition-colors shadow-xs"
          title="Scene sebelumnya (←)"
        >
          ‹
        </button>

        <span className="font-mono text-xs text-emerald-700 px-3 font-bold select-none tracking-wider">
          {currentScene.number} / {String(scenes.length).padStart(2, "0")}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === scenes.length - 1}
          className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-bold transition-all shadow-xs"
          title="Scene berikutnya (→)"
        >
          ›
        </button>
      </div>

      {/* Modals */}
      <SceneDrawer
        isOpen={isDrawerOpen}
        currentIndex={currentIndex}
        onSelectScene={goToIndex}
        onClose={() => setIsDrawerOpen(false)}
      />

      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </main>
  );
}
