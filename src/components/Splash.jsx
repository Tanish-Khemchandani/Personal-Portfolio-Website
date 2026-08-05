import { useEffect, useRef } from "react";
import tkLogo from "../assets/tk-logo.png";

// Builds a short, original ascending 3-note chime from scratch using the
// Web Audio API — no sampled or external audio is used.
function playOriginalChime() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const now = ctx.currentTime;

    const master = ctx.createGain();
    master.gain.value = 0.18;
    master.connect(ctx.destination);

    // Three ascending notes, each a soft sine + triangle blend with its own
    // short envelope, spaced to land alongside the zoom/settle of the text.
    const notes = [
      { freq: 523.25, start: 0.0, dur: 0.5 }, // C5
      { freq: 659.25, start: 0.18, dur: 0.5 }, // E5
      { freq: 783.99, start: 0.36, dur: 0.9 }, // G5
    ];

    notes.forEach(({ freq, start, dur }) => {
      const t0 = now + start;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = "sine";
      osc2.type = "triangle";
      osc1.frequency.value = freq;
      osc2.frequency.value = freq;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(0.9, t0 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(master);

      osc1.start(t0);
      osc2.start(t0);
      osc1.stop(t0 + dur + 0.05);
      osc2.stop(t0 + dur + 0.05);
    });

    // Auto-close the context once the chime has finished playing.
    setTimeout(() => ctx.close(), 1800);
  } catch {
    // Web Audio unavailable or blocked by autoplay policy — fail silently.
  }
}

export default function Splash() {
  const playedRef = useRef(false);

  useEffect(() => {
    if (playedRef.current) return;
    playedRef.current = true;
    playOriginalChime();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden animate-splash-out"
      style={{
        background: "#000000",
        perspective: "800px",
      }}
    >
      <img src={tkLogo} alt="" className="splash-logo w-20 h-20 sm:w-28 sm:h-28 absolute" />
      <div className="splash-name-wrap">
        <div className="splash-name">
          TANISH KHEMCHANDANI
          <span className="splash-shine" aria-hidden="true">TANISH KHEMCHANDANI</span>
        </div>
      </div>
    </div>
  );
}
