import { useEffect, useRef } from "react";
import { drawMark, BRAND_CONFIGS } from "./orbEngine";

/**
 * Animated brand-logo particle orb (Instagram, LinkedIn) — samples the
 * real logo path into a dot field and animates it, adapted from the
 * brand-orbs particle engine. `mode` selects which brand config to use.
 */
export default function BrandOrb({ mode, size = 40, className = "" }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cfg = BRAND_CONFIGS[mode];
    if (!cfg) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    const ctx = canvas.getContext("2d");
    const mini = size < 32;

    const frame = (tSec) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      drawMark(ctx, size, tSec, mini, cfg);
    };

    if (reduced) {
      frame(1.2);
      return;
    }

    const tick = () => {
      frame(performance.now() / 1000);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mode, size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className={`inline-block align-middle ${className}`}
      role="img"
      aria-label={mode === "instagram" ? "Instagram" : "LinkedIn"}
    />
  );
}
