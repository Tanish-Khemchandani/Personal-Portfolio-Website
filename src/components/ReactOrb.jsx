import { useEffect, useRef } from "react";

/**
 * Animated "React atom" particle orb — a self-contained canvas loop adapted
 * from the brand-orbs particle engine, tuned bigger/thicker/more saturated
 * for inline use in the footer credit line.
 */

const TAU = Math.PI * 2;
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

function proj(yaw, tilt, cx, cy, s) {
  const st = Math.sin(tilt), ct = Math.cos(tilt);
  const sy = Math.sin(yaw), cyw = Math.cos(yaw);
  return (x, y, z) => {
    const px = x * cyw + z * sy, pz = -x * sy + z * cyw;
    const py = y * ct - pz * st, z2 = y * st + pz * ct;
    return [cx + px * s, cy - py * s, z2];
  };
}

const rscale = (S) => Math.pow(S / 300, 0.6);

function paint(ctx, dots, accent, sat, rMin) {
  dots.sort((a, b) => a.z - b.z);
  for (const d of dots) {
    const al = d.a ?? 1;
    if (al < 0.02) continue;
    const v = clamp01(d.v);
    const g = v * 255;
    let r = g, gg = g, b = g;
    if (accent && sat) {
      const lift = Math.min(1, v * 1.12);
      r = g * (1 - sat) + accent[0] * lift * sat;
      gg = g * (1 - sat) + accent[1] * lift * sat;
      b = g * (1 - sat) + accent[2] * lift * sat;
    }
    if (v > 0.85) {
      const w = ((v - 0.85) / 0.15) * 0.45;
      r += (255 - r) * w;
      gg += (255 - gg) * w;
      b += (255 - b) * w;
    }
    ctx.fillStyle = `rgba(${r | 0},${gg | 0},${b | 0},${al})`;
    ctx.beginPath();
    ctx.arc(d.x, d.y, Math.max(rMin, d.r), 0, TAU);
    ctx.fill();
  }
}

// Tuned params: bigger dots, richer color, sharper saturation than the source spec.
const ACCENT = [97, 218, 251];
const THICK = 1.55; // dot-size multiplier — "thicker"
const SAT = 1.0; // full saturation — "sharper colours"
const R_MIN = 0.42;

function drawReact(ctx, S, t, mini) {
  const cx = S / 2, cy = S / 2, R = (S / 2) * 0.92;
  const rs = rscale(S) * (mini ? 1.8 : 1) * THICK;
  const p = proj(0.1 * Math.sin(t * 0.4), 0.12 * Math.sin(t * 0.33), cx, cy, R);
  const spin = t * 0.26, rx = 0.94, ry = 0.345;
  const per = mini ? 20 : 56;
  const dots = [];
  for (let k = 0; k < 3; k++) {
    const a0 = spin + (k * Math.PI) / 3;
    const ca = Math.cos(a0), sa = Math.sin(a0);
    const ring = (th) => {
      const ex = Math.cos(th) * rx, ey = Math.sin(th) * ry;
      return [ex * ca - ey * sa, ex * sa + ey * ca];
    };
    for (let i = 0; i < per; i++) {
      const th = (i / per) * TAU;
      const [gx, gy] = ring(th);
      const [x, y, z] = p(gx, gy, 0);
      const ph = (((th / TAU - t * 0.19 - k * 0.33) % 1) + 1) % 1;
      const crest = Math.exp(-Math.pow(ph - 0.5, 2) / 0.022);
      dots.push({ x, y, z: z + crest * 0.01, r: (0.95 + 0.6 * crest) * rs, v: 0.66 + 0.3 * crest, a: 0.85 + 0.15 * crest });
    }
    const eth = t * (k % 2 ? -1.15 : 1.3) + k * 2.1;
    const [ex2, ey2] = ring(eth);
    const [x2, y2, z2] = p(ex2, ey2, 0.04);
    dots.push({ x: x2, y: y2, z: z2 + 0.02, r: 1.9 * rs, v: 0.95 });
  }
  const nN = mini ? 3 : 7;
  for (let i = 0; i < nN; i++) {
    const a = (i / nN) * TAU, rr = i ? 0.085 : 0;
    const [x, y, z] = p(Math.cos(a) * rr, Math.sin(a) * rr, 0.05);
    dots.push({ x, y, z: z + 0.03, r: 1.5 * rs, v: 0.9 });
  }
  paint(ctx, dots, ACCENT, SAT, R_MIN);
}

export default function ReactOrb({ size = 40, className = "" }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    const ctx = canvas.getContext("2d");
    const mini = size < 32;

    const frame = (tSec) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      drawReact(ctx, size, tSec, mini);
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
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className={`inline-block align-middle ${className}`}
      role="img"
      aria-label="React.js"
    />
  );
}
