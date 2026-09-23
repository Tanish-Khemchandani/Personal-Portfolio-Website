import { useEffect, useRef, useState } from "react";
import tkLogo from "../assets/tk-logo.png";

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const el = document.createElement("script");
    el.src = src;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(el);
  });
}

/**
 * Full-screen gate shown before anything else. The site (splash + main
 * content) only mounts once the visitor clicks this button. The background
 * is an animated red Vanta.NET particle network, loaded dynamically from
 * CDN so the main app bundle stays untouched by it.
 */
export default function EntryGate({ onEnter }) {
  const vantaHostRef = useRef(null);
  const vantaEffectRef = useRef(null);
  const [vantaReady, setVantaReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function initVanta() {
      try {
        await loadScriptOnce("https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js");
        await loadScriptOnce("https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js");
        if (cancelled || !vantaHostRef.current || !window.VANTA) return;
        vantaEffectRef.current = window.VANTA.NET({
          el: vantaHostRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xff0000,
          backgroundColor: 0x000000,
          maxDistance: 24.0,
        });
        // Let the canvas draw a couple of frames before revealing it, so the
        // fade-in never shows a blank/half-built first frame.
        requestAnimationFrame(() => requestAnimationFrame(() => {
          if (!cancelled) setVantaReady(true);
        }));
      } catch {
        // CDN blocked/unreachable — the gate still works, just without the
        // animated network background.
      }
    }

    initVanta();
    return () => {
      cancelled = true;
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black">
      <div
        ref={vantaHostRef}
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{ opacity: vantaReady ? 1 : 0 }}
      />
      <button
        type="button"
        onClick={onEnter}
        className="group isolate inline-flex cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_48px_10px_rgba(255,59,59,0.45)] rounded-full relative shadow-[0_8px_40px_rgba(255,59,59,0.3)]"
        style={{
          "--spread": "90deg",
          "--shimmer-color": "rgba(255,80,80,0.85)",
          "--speed": "4s",
          "--cut": "1px",
          "--bg": "rgba(255,59,59,0.08)",
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-[-200%] w-[400%] h-[400%] [animation:gate-rotate-gradient_var(--speed)_linear_infinite]">
            <div className="absolute inset-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
          </div>
        </div>
        <div className="absolute rounded-full [background:var(--bg)] [inset:var(--cut)] backdrop-blur" />
        <div className="z-10 flex gap-3 text-base font-medium text-white pt-4 pr-6 pb-4 pl-5 relative items-center rounded-full">
          <div
            className="absolute [animation:gate-border-beam_var(--speed)_infinite_linear]"
            style={{
              content: "' '",
              display: "block",
              width: "200%",
              height: "200%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,59,59,0.55), rgba(255,120,120,0.55), rgba(255,59,59,0.55), transparent)",
              top: "50%",
              left: "50%",
            }}
          />
          <div
            className="absolute rounded-full backdrop-blur-[8px]"
            style={{ inset: "1px", background: "rgba(10,4,4,0.85)" }}
          />
          <img
            src={tkLogo}
            alt=""
            className="z-10 w-9 h-9 p-1 object-contain relative rounded-full ring-2 ring-accent/40 bg-black/30"
          />
          <span className="whitespace-nowrap relative z-10 font-mono">Enter Site</span>
          <span className="inline-flex items-center justify-center z-10 bg-accent/15 w-7 h-7 rounded-full ml-1 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />
              <path d="m14 7 3 3" />
              <path d="M5 6v4" />
              <path d="M19 14v4" />
              <path d="M10 2v2" />
              <path d="M7 8H3" />
              <path d="M21 16h-4" />
              <path d="M11 3H9" />
            </svg>
          </span>
        </div>
      </button>
    </div>
  );
}
