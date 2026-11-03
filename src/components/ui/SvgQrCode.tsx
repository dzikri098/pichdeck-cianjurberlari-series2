"use client";

import React, { useMemo } from "react";

interface SvgQrCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export function SvgQrCode({ value, size = 180, className = "" }: SvgQrCodeProps) {
  // Deterministic 21x21 grid pattern generated from value hash
  const matrix = useMemo(() => {
    const gridSize = 21;
    const grid: boolean[][] = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill(false)
    );

    // 1. Draw standard finder patterns (top-left, top-right, bottom-left)
    const drawFinder = (startRow: number, startCol: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (
            r === 0 ||
            r === 6 ||
            c === 0 ||
            c === 6 ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4)
          ) {
            grid[startRow + r][startCol + c] = true;
          }
        }
      }
    };

    drawFinder(0, 0);
    drawFinder(0, gridSize - 7);
    drawFinder(gridSize - 7, 0);

    // 2. Timing patterns
    for (let i = 8; i < gridSize - 8; i++) {
      grid[6][i] = i % 2 === 0;
      grid[i][6] = i % 2 === 0;
    }

    // 3. Fill data modules deterministically based on value
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }

    let seed = Math.abs(hash);
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        // Skip finder pattern zones
        const inTopLeft = r < 8 && c < 8;
        const inTopRight = r < 8 && c >= gridSize - 8;
        const inBottomLeft = r >= gridSize - 8 && c < 8;
        const isTiming = r === 6 || c === 6;

        if (!inTopLeft && !inTopRight && !inBottomLeft && !isTiming) {
          grid[r][c] = pseudoRandom() > 0.45;
        }
      }
    }

    return grid;
  }, [value]);

  return (
    <div
      className={`inline-block p-3 rounded-2xl bg-white shadow-xl ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 21 21"
        className="w-full h-full"
        shapeRendering="crispEdges"
        aria-label={`QR Code untuk token ${value}`}
      >
        <rect width="21" height="21" fill="white" />
        {matrix.map((row, r) =>
          row.map((filled, c) =>
            filled ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#071423" /> : null
          )
        )}
      </svg>
    </div>
  );
}

