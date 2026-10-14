import { contact } from "../data";
import BlurCycle from "./BlurCycle";

const phrases = ["MERN Stack.", "Perfection.", "Creativity."];

/**
 * Each element fades + blurs + slides up in sequence once `ready` turns true
 * (i.e. when the splash screen finishes). The animation is CSS-driven via
 * a class toggle, so nothing runs until the exact right moment.
 */
export default function Hero({ ready }) {
  return (
    <header id="top" className="flex items-center relative overflow-x-hidden py-20 sm:py-28 lg:py-32">
      <div className="max-w-400 mx-auto px-6 sm:px-10 md:px-16 lg:px-30 relative z-1 w-full">

        {/* Status badge */}
        <div className={`hero-reveal ${ready ? "hero-reveal--in" : ""}`} style={{ "--delay": "0ms" }}>
          <div className="font-mono text-sm sm:text-[15px] text-accent flex items-center gap-2.5 mb-6 flex-wrap">
            <span
              className="w-2 h-2 rounded-full bg-accent eyebrow-dot shrink-0"
              style={{ boxShadow: "0 0 12px var(--color-accent)" }}
            />
            OPEN TO FULL-TIME OPPORTUNITIES · VADODARA, INDIA
          </div>
        </div>

        {/* Name line */}
        <div className={`hero-reveal ${ready ? "hero-reveal--in" : ""}`} style={{ "--delay": "120ms" }}>
          <div
            className="font-bold leading-[1.05] tracking-tight mb-5 overflow-hidden"
            style={{ fontSize: "clamp(34px,7vw,76px)", fontFamily: "var(--font-heading)" }}
          >
            <div className={`hero-line ${ready ? "hero-line--in" : ""}`} style={{ "--delay": "120ms" }}>
              Tanish Khemchandani
            </div>
          </div>
        </div>

        {/* "builds with" line */}
        <div className={`hero-reveal ${ready ? "hero-reveal--in" : ""}`} style={{ "--delay": "240ms" }}>
          <div
            className="font-medium text-ink-dim leading-[1.05] tracking-tight mb-5 overflow-hidden"
            style={{ fontSize: "clamp(28px,6vw,68px)", fontFamily: "var(--font-heading)" }}
          >
            <div className={`hero-line ${ready ? "hero-line--in" : ""}`} style={{ "--delay": "240ms" }}>
              builds with{" "}
              <span
                className="text-accent font-bold"
                style={{ fontFamily: "var(--font-splash)", letterSpacing: "0.03em" }}
              >
                <BlurCycle phrases={phrases} interval={2600} />
              </span>
            </div>
          </div>
        </div>

        {/* Bio paragraph */}
        <div className={`hero-reveal ${ready ? "hero-reveal--in" : ""}`} style={{ "--delay": "400ms" }}>
          <p className="text-ink-dim max-w-135 text-lg">
            Recent BCA graduate and Software Development Intern, currently working across MongoDB, Express,
            React and Node — turning academic foundations into real, working products.
          </p>
        </div>

        {/* CTA buttons */}
        <div className={`hero-reveal ${ready ? "hero-reveal--in" : ""}`} style={{ "--delay": "560ms" }}>
          <div className="flex gap-4 mt-9 flex-wrap items-center">
            <a
              href="#contact"
              className="glitch-btn font-mono text-base"
              data-text="Get in touch"
            >
              <span className="glitch-btn__top" aria-hidden="true">Get in touch</span>
              <span className="glitch-btn__bottom" aria-hidden="true">Get in touch</span>
              <span className="relative z-10">Get in touch</span>
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel font-mono text-base px-6 py-3.5 rounded-md inline-flex items-center gap-2 text-ink-dim hover:text-ink transition-all"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

      </div>
    </header>
  );
}
