"use client";

import React, { useEffect, useRef, useCallback } from "react";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  const createGrainPattern = (
    ctx: CanvasRenderingContext2D,
    opt: GrainOptions,
  ) => {
    const patternCanvas = document.createElement("canvas");
    const pctx = patternCanvas.getContext("2d");

    patternCanvas.width = opt.patternWidth ?? 200;
    patternCanvas.height = opt.patternHeight ?? 200;

    if (pctx) {
      for (let w = 0; w < patternCanvas.width; w += opt.grainDensity ?? 1) {
        for (let h = 0; h < patternCanvas.height; h += opt.grainDensity ?? 1) {
          const rgb = Math.floor(Math.random() * 256);
          pctx.fillStyle = `rgba(${rgb / 2}, ${rgb / 2}, ${rgb}, ${opt.grainOpacity ?? 0.1
            })`;
          pctx.fillRect(w, h, opt.grainWidth ?? 1, opt.grainHeight ?? 1);
        }
      }
    }

    return ctx.createPattern(patternCanvas, "repeat");
  };

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const options: GrainOptions = {
          patternWidth: 200,
          patternHeight: 200,
          grainOpacity: 0.05,
          grainDensity: 1,
          grainWidth: 1,
          grainHeight: 1,
        };

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const pattern = createGrainPattern(ctx, grain_options ?? options);
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        animationFrameId.current = requestAnimationFrame(animate);
      }
    }
  }, [grain_options]);

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      id="grained-canvas"
      className="fixed left-0 top-0 inset-0 z-50 pointer-events-none w-full h-full"
    />
  );
};
export default GrainProvider;
