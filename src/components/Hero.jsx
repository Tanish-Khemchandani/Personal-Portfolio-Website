import { contact } from "../data";
import Reveal from "./Reveal";
import Typewriter from "./Typewriter";

const phrases = ["MERN Stack.", "Perfection.", "Creativity."];

export default function Hero() {
  return (
    <header id="top" className="flex items-center relative overflow-x-hidden py-20 sm:py-28 lg:py-32">
      <div className="max-w-400 mx-auto px-6 sm:px-10 md:px-16 lg:px-30 relative z-1 w-full">
        <Reveal>
          <div className="font-mono text-sm sm:text-[15px] text-accent flex items-center gap-2.5 mb-6 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-accent eyebrow-dot shrink-0" style={{ boxShadow: "0 0 12px var(--color-accent)" }} />
            OPEN TO FULL-TIME OPPORTUNITIES · VADODARA, INDIA
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1
            className="font-bold leading-[1.05] tracking-tight mb-5"
            style={{
              fontSize: "clamp(34px,7vw,76px)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Tanish Khemchandani
            <br />
            <span className="text-ink-dim font-medium block" style={{ whiteSpace: "nowrap" }}>
              builds with{" "}
              <span
                className="text-accent font-bold"
                style={{ fontFamily: "var(--font-splash)", letterSpacing: "0.03em" }}
              >
                <Typewriter phrases={phrases} />
              </span>
            </span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-ink-dim max-w-135 text-lg">
            Recent BCA graduate and Software Development Intern, currently working across MongoDB, Express,
            React and Node — turning academic foundations into real, working products.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex gap-4 mt-9 flex-wrap items-center">
            <a
              href="#contact"
              className="font-mono text-base px-6 py-3.5 rounded-md inline-flex items-center gap-2 bg-accent text-white font-semibold hover:bg-accent-dim transition-all hover:-translate-y-0.5"
            >
              Get in touch
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
        </Reveal>
      </div>
    </header>
  );
}
