"use client";

// Grain.tsx
import React, { useEffect, useRef } from "react";

type GrainOptions = {
  patternWidth?: number;
  patternHeight?: number;
  grainOpacity?: number;
  grainDensity?: number;
  grainWidth?: number;
  grainHeight?: number;
};

export const GrainProvider = ({
  grain_options,
}: {
  grain_options?: GrainOptions;
}) => {
  const providerRef = useRef<HTMLDivElement>(null);

  // Function to generate and apply grain effect
  const applyGrain = (ele: HTMLElement, opt: GrainOptions) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = opt.patternWidth ?? 100;
    canvas.height = opt.patternHeight ?? 100;

    for (let w = 0; w < canvas.width; w += opt.grainDensity ?? 1) {
      for (let h = 0; h < canvas.height; h += opt.grainDensity ?? 1) {
        const rgb = Math.floor(Math.random() * 256);
        ctx.fillStyle = `rgba(${rgb / 2}, ${rgb / 2}, ${rgb}, ${opt.grainOpacity ?? 0.1
          })`;
        ctx.fillRect(w, h, opt.grainWidth ?? 1, opt.grainHeight ?? 1);
      }
    }

    ele.style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;
  };

  useEffect(() => {
    const element = providerRef.current;
    if (!element) return;

    // Define options here
    const options: GrainOptions = {
      patternWidth: 240,
      patternHeight: 300,
      grainOpacity: 0.05,
      grainDensity: 1,
      grainWidth: 2,
      grainHeight: 2,
    };

    // Apply grain initially
    applyGrain(element, grain_options ?? options);

    // Set interval to update grain
    const intervalId = setInterval(() => {
      applyGrain(element, grain_options ?? options);
    }, 100);

    // Cleanup function
    return () => clearInterval(intervalId);
  }, [grain_options]);

  return (
    <div
      ref={providerRef}
      id="grained-bg"
      className="fixed left-0 top-0 inset-0 z-50 pointer-events-none w-full h-full"
    ></div>
  );
};

export default GrainProvider;
